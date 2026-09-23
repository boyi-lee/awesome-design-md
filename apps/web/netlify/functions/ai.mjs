const json = (statusCode, body) => ({
  statusCode,
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify(body),
});

const model = process.env.OPENAI_MODEL || 'gpt-5.6-terra';

async function openai(body) {
  const key = process.env.OPENAI_API_KEY;
  if (!key) throw new Error('OPENAI_API_KEY 尚未設定');
  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`OpenAI API ${response.status}: ${detail.slice(0, 500)}`);
  }
  return response.json();
}

function schemaFor(action) {
  if (action === 'research') {
    return {
      type: 'object', additionalProperties: false,
      properties: {
        productResearch: { type: 'array', items: { type: 'string' } },
        brandResearch: { type: 'array', items: { type: 'string' } },
        competitorResearch: { type: 'array', items: { type: 'string' } },
        packagingPatterns: { type: 'array', items: { type: 'string' } },
        opportunities: { type: 'array', items: { type: 'string' } },
        sourceNotes: { type: 'array', items: { type: 'string' } },
      },
      required: ['productResearch','brandResearch','competitorResearch','packagingPatterns','opportunities','sourceNotes'],
    };
  }
  if (action === 'cis') {
    return {
      type: 'object', additionalProperties: false,
      properties: {
        brandName: { type: 'string' },
        positioning: { type: 'string' },
        audience: { type: 'string' },
        personality: { type: 'array', items: { type: 'string' } },
        voice: { type: 'array', items: { type: 'string' } },
        visualKeywords: { type: 'array', items: { type: 'string' } },
        colors: { type: 'array', items: { type: 'object', additionalProperties: false, properties: { name:{type:'string'}, hex:{type:'string'}, use:{type:'string'} }, required:['name','hex','use'] } },
        typography: { type: 'array', items: { type: 'string' } },
        logoRules: { type: 'array', items: { type: 'string' } },
        do: { type: 'array', items: { type: 'string' } },
        dont: { type: 'array', items: { type: 'string' } },
      },
      required: ['brandName','positioning','audience','personality','voice','visualKeywords','colors','typography','logoRules','do','dont'],
    };
  }
  if (action === 'design') {
    return {
      type: 'object', additionalProperties: false,
      properties: {
        conceptName: { type: 'string' },
        rationale: { type: 'string' },
        packageFamily: { type: 'string' },
        engineeringDeliverable: { type: 'string' },
        front: { type: 'object', additionalProperties: false, properties: { headline:{type:'string'}, subline:{type:'string'}, badges:{type:'array',items:{type:'string'}}, features:{type:'array',items:{type:'string'}} }, required:['headline','subline','badges','features'] },
        back: { type: 'array', items: { type: 'object', additionalProperties: false, properties: { title:{type:'string'}, content:{type:'string'} }, required:['title','content'] } },
        visualDirection: { type: 'array', items: { type: 'string' } },
        imageBrief: { type: 'string' },
        requiredProductionInputs: { type: 'array', items: { type: 'string' } },
        missingProductionInputs: { type: 'array', items: { type: 'string' } },
        productionStatus: { type: 'string', enum: ['CONCEPT','DESIGN_READY','ENGINEERING_BLOCKED','PRODUCTION_READY'] },
      },
      required: ['conceptName','rationale','packageFamily','engineeringDeliverable','front','back','visualDirection','imageBrief','requiredProductionInputs','missingProductionInputs','productionStatus'],
    };
  }
  return {
    type: 'object', additionalProperties: false,
    properties: {
      passed: { type: 'array', items: { type: 'string' } },
      warnings: { type: 'array', items: { type: 'string' } },
      blockers: { type: 'array', items: { type: 'string' } },
      nextActions: { type: 'array', items: { type: 'string' } },
      status: { type: 'string', enum: ['READY','NEEDS_INFO','BLOCKED'] },
    },
    required: ['passed','warnings','blockers','nextActions','status'],
  };
}

function systemFor(action) {
  const common = '你是 Packaging Design OS。使用繁體中文、台灣語感、直白好懂。禁止虛構尺寸、認證、法規或產品功能。所有設計決策都要保留修改彈性，不把單一視覺風格當成固定模板。';
  if (action === 'research') return `${common} 你先做功課再提案。使用 web_search 查產品品類、品牌、競品與包裝案例。競品只做策略與視覺拆解，不抄版。sourceNotes 要列出實際查到的網站/來源名稱與用途。`;
  if (action === 'cis') return `${common} 你是品牌策略與 CIS 整理助手。根據品牌資料、官網、產品線與研究結果整理一套可編輯 CIS 草案。若資料不足，保守表述，不自行發明品牌歷史。`;
  if (action === 'design') return `${common} 你是包裝設計與工程 Router。先尊重使用者自訂 CIS、競品參考與手動修改，再產設計。包裝不限紙卡：紙盒/吊卡/Sleeve 可用 dieline；OPP/CPP/Pouch 用 Bag Specification Drawing；Label 用 Cutline/Label Spec；Bottle/Jar 用 Container + Label Area Spec；Blister 用 Blister + Backing Card Spec。缺工程資料時標記 ENGINEERING_BLOCKED。`;
  return `${common} 你是 QA Reviewer。用人話檢查資料真實性、CIS 一致性、競品借鑑是否過度、結構分流、Artwork Lock 與 production readiness。`;
}

export async function handler(event) {
  if (event.httpMethod !== 'POST') return json(405, { error: 'Method not allowed' });
  try {
    const payload = JSON.parse(event.body || '{}');
    const action = payload.action;
    if (!['research','cis','design','review'].includes(action)) return json(400, { error: '未知 action' });
    const request = {
      model,
      input: [
        { role: 'system', content: systemFor(action) },
        { role: 'user', content: JSON.stringify(payload.data || {}) },
      ],
      text: {
        format: {
          type: 'json_schema',
          name: `packaging_${action}`,
          strict: true,
          schema: schemaFor(action),
        },
      },
    };
    if (action === 'research') request.tools = [{ type: 'web_search', search_context_size: 'medium' }];
    const result = await openai(request);
    const parsed = JSON.parse(result.output_text || '{}');
    return json(200, { result: parsed });
  } catch (error) {
    console.error(error);
    return json(500, { error: error instanceof Error ? error.message : 'AI 執行失敗' });
  }
}
