const json = (statusCode, body) => ({
  statusCode,
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify(body),
});

export async function handler(event) {
  if (event.httpMethod !== 'POST') return json(405, { error: 'Method not allowed' });
  try {
    const key = process.env.OPENAI_API_KEY;
    if (!key) return json(500, { error: 'OPENAI_API_KEY 尚未設定' });
    const { design, cis, product, format = 'portrait' } = JSON.parse(event.body || '{}');
    if (!design) return json(400, { error: '缺少設計資料' });
    const size = format === 'landscape' ? '1536x1024' : '1024x1536';
    const prompt = [
      'Create a photorealistic studio product packaging mockup.',
      'Treat the approved artwork and package structure as locked. Do not redesign the layout, logo hierarchy, copy blocks, package family, transparent window, hanging hole, seals, or product form.',
      `Product: ${JSON.stringify(product || {})}`,
      `Approved CIS: ${JSON.stringify(cis || {})}`,
      `Approved packaging design: ${JSON.stringify(design)}`,
      'Show one finished retail package as if photographed for an ecommerce product page: clean neutral studio, realistic material reflections, believable folds/seams, soft shadow, no extra props unless explicitly present in the approved design.',
      'If exact text rendering is uncertain, preserve the intended zones and hierarchy rather than inventing new claims or logos.',
    ].join('\n');
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ model: 'gpt-image-2', prompt, size, quality: 'medium' }),
    });
    if (!response.ok) {
      const detail = await response.text();
      throw new Error(`Image API ${response.status}: ${detail.slice(0, 500)}`);
    }
    const result = await response.json();
    const b64 = result?.data?.[0]?.b64_json;
    if (!b64) throw new Error('Image API 沒有回傳圖片');
    return json(200, { imageDataUrl: `data:image/png;base64,${b64}` });
  } catch (error) {
    console.error(error);
    return json(500, { error: error instanceof Error ? error.message : '圖片生成失敗' });
  }
}
