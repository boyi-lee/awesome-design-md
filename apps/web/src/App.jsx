import { useEffect, useMemo, useState } from 'react';
import { Brain, Check, Download, Image, Package, Palette, Search, Sparkles, TriangleAlert } from 'lucide-react';
import './setupNotice.css';

const packageTypes = ['AI 自動判斷','Folding Carton 紙盒','Header Card 吊卡','Flexible Pouch / OPP / CPP 袋','Label 標籤','Sleeve 紙套','Bottle / Jar 瓶罐','Blister 泡殼','其他 / 自訂'];

async function callFunction(name, body) {
  const res = await fetch(`/.netlify/functions/${name}`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `服務暫時無法使用（HTTP ${res.status}）`);
  return data;
}

async function checkHealth() {
  const res = await fetch('/.netlify/functions/health');
  if (!res.ok) throw new Error(`health check HTTP ${res.status}`);
  return res.json();
}

function TextList({ value = [], onChange, placeholder }) {
  return <textarea value={value.join('\n')} onChange={e => onChange(e.target.value.split('\n').filter(Boolean))} placeholder={placeholder} />;
}

function download(filename, text, type = 'text/plain') {
  const blob = new Blob([text], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = filename; a.click(); URL.revokeObjectURL(url);
}

function svgFor(design, cis, product) {
  const primary = cis?.colors?.[0]?.hex || '#111111';
  const accent = cis?.colors?.[1]?.hex || '#f97316';
  const headline = design?.front?.headline || product?.name || 'Packaging Design';
  const features = (design?.front?.features || []).slice(0, 5);
  const esc = s => String(s || '').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" width="900" height="1300" viewBox="0 0 900 1300">\n<g id="BACKGROUND"><rect width="900" height="1300" fill="#ffffff"/></g>\n<g id="SAFE_AREA"><rect x="45" y="45" width="810" height="1210" fill="none" stroke="#999" stroke-dasharray="8 8"/></g>\n<g id="BRAND"><rect x="70" y="70" width="760" height="120" rx="20" fill="${esc(accent)}"/><text x="105" y="145" font-family="Arial, sans-serif" font-size="34" font-weight="700" fill="#fff">${esc(cis?.brandName || 'BRAND')}</text></g>\n<g id="HEADLINE"><text x="80" y="275" font-family="Arial, sans-serif" font-size="54" font-weight="700" fill="${esc(primary)}">${esc(headline)}</text><text x="80" y="330" font-family="Arial, sans-serif" font-size="26" fill="#555">${esc(design?.front?.subline || '')}</text></g>\n<g id="HERO_AREA"><rect x="80" y="390" width="740" height="470" rx="30" fill="#f5f5f5" stroke="#ddd"/><text x="450" y="630" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" fill="#aaa">HERO / PRODUCT IMAGE AREA</text></g>\n<g id="FEATURES">${features.map((f,i)=>`<circle cx="105" cy="${930+i*58}" r="8" fill="${esc(accent)}"/><text x="132" y="${938+i*58}" font-family="Arial, sans-serif" font-size="24" fill="#222">${esc(f)}</text>`).join('')}</g>\n<g id="NOTES"><text x="80" y="1240" font-family="Arial, sans-serif" font-size="18" fill="#777">Editable SVG exported by Packaging Design OS • Open in Adobe Illustrator</text></g>\n</svg>`;
}

export default function App() {
  const [tab, setTab] = useState('input');
  const [busy, setBusy] = useState('');
  const [error, setError] = useState('');
  const [product, setProduct] = useState({ name:'', sku:'', facts:'', category:'', packageType:'AI 自動判斷', notes:'' });
  const [brand, setBrand] = useState({ name:'', url:'', notes:'' });
  const [competitors, setCompetitors] = useState('');
  const [research, setResearch] = useState(null);
  const [cis, setCis] = useState(null);
  const [design, setDesign] = useState(null);
  const [mockup, setMockup] = useState('');
  const [review, setReview] = useState(null);
  const [serviceStatus, setServiceStatus] = useState(null);
  const [healthError, setHealthError] = useState('');
  const steps = useMemo(() => [
    ['input','01 資料'],['research','02 做功課'],['cis','03 CIS'],['design','04 包裝設計'],['review','05 Review / 交付']
  ], []);

  useEffect(() => {
    checkHealth().then(setServiceStatus).catch(() => setHealthError('目前無法確認 AI 服務狀態，請稍後重試。'));
  }, []);

  const aiReady = serviceStatus?.openaiConfigured ?? true;
  const aiDisabled = Boolean(busy) || !aiReady;

  const run = async (label, fn) => { setBusy(label); setError(''); try { await fn(); } catch(e) { setError(e.message); } finally { setBusy(''); } };

  const doResearch = () => run('research', async () => {
    const { result } = await callFunction('ai', { action:'research', data:{ product, brand, competitorUrls: competitors.split('\n').filter(Boolean) } });
    setResearch(result); setTab('research');
  });
  const doCis = () => run('cis', async () => {
    const { result } = await callFunction('ai', { action:'cis', data:{ brand, product, research } });
    setCis(result); setTab('cis');
  });
  const doDesign = () => run('design', async () => {
    const { result } = await callFunction('ai', { action:'design', data:{ product, brand, cis, research, competitorUrls: competitors.split('\n').filter(Boolean), packageTypeOverride: product.packageType } });
    setDesign(result); setTab('design');
  });
  const doMockup = () => run('image', async () => {
    const data = await callFunction('image', { product, cis, design }); setMockup(data.imageDataUrl);
  });
  const doReview = () => run('review', async () => {
    const { result } = await callFunction('ai', { action:'review', data:{ product, brand, cis, research, design } }); setReview(result); setTab('review');
  });

  return <div className="app">
    <header className="topbar"><div><div className="eyebrow">AI PACKAGING WORKBENCH</div><h1>Packaging Design OS</h1><p>先研究品牌、產品與競品，再進設計。每一步都能改，不把你鎖死在同一套視覺。</p></div><div className="pill">Netlify + OpenAI API</div></header>

    <nav className="stepper">{steps.map(([id,label]) => <button key={id} onClick={()=>setTab(id)} className={tab===id?'active':''}>{label}</button>)}</nav>
    {!aiReady && <div className="setupNotice"><TriangleAlert size={18}/><div><strong>AI 功能尚未啟用</strong><span>請在 Netlify 的 Environment variables 設定 <code>OPENAI_API_KEY</code>，再重新部署。設定後即可使用研究、CIS、設計、圖片與 Review。</span></div></div>}
    {healthError && <div className="error"><TriangleAlert size={18}/>{healthError}</div>}
    {error && <div className="error"><TriangleAlert size={18}/>{error}</div>}

    {tab==='input' && <main className="grid two">
      <section className="card"><div className="sectionTitle"><Package/>產品資料</div><label>產品名稱<input value={product.name} onChange={e=>setProduct({...product,name:e.target.value})} placeholder="例如：UD 透明雨衣"/></label><div className="row"><label>SKU<input value={product.sku} onChange={e=>setProduct({...product,sku:e.target.value})}/></label><label>品類<input value={product.category} onChange={e=>setProduct({...product,category:e.target.value})}/></label></div><label>產品資料 / 規格<textarea value={product.facts} onChange={e=>setProduct({...product,facts:e.target.value})} placeholder="把廠商規格、材質、尺寸、特色、注意事項直接貼進來"/></label><label>包裝結構<select value={product.packageType} onChange={e=>setProduct({...product,packageType:e.target.value})}>{packageTypes.map(x=><option key={x}>{x}</option>)}</select></label><label>額外要求<textarea value={product.notes} onChange={e=>setProduct({...product,notes:e.target.value})} placeholder="例如：要保留透明區、要能吊掛、通路是寶雅…"/></label></section>
      <section className="card"><div className="sectionTitle"><Palette/>品牌 + 競品</div><label>品牌名稱<input value={brand.name} onChange={e=>setBrand({...brand,name:e.target.value})}/></label><label>品牌官網 / 品牌頁<input value={brand.url} onChange={e=>setBrand({...brand,url:e.target.value})} placeholder="https://..."/></label><label>品牌現有規範 / 你知道的品牌個性<textarea value={brand.notes} onChange={e=>setBrand({...brand,notes:e.target.value})} placeholder="沒有也沒關係，AI 會先做功課再整理 CIS 草案"/></label><label>競品網址，一行一個<textarea value={competitors} onChange={e=>setCompetitors(e.target.value)} placeholder={'https://competitor-a.com/...\nhttps://competitor-b.com/...'}/></label><div className="hint">競品只拿來拆資訊層級、結構、通路語言與視覺策略，不直接照抄。</div><button className="primary" disabled={aiDisabled||!product.name} onClick={doResearch}><Search size={17}/>{busy==='research'?'正在做功課…':'AI 先做功課'}</button></section>
    </main>}

    {tab==='research' && <main className="grid two"><section className="card"><div className="sectionTitle"><Search/>研究結果</div>{research ? <>{[['產品 / 品類',research.productResearch],['品牌',research.brandResearch],['競品',research.competitorResearch],['包裝慣例',research.packagingPatterns],['機會點',research.opportunities]].map(([t,items])=><div className="block" key={t}><h3>{t}</h3><ul>{items.map(x=><li key={x}>{x}</li>)}</ul></div>)}</> : <Empty text="先回上一頁執行 AI 做功課"/>}</section><section className="card"><div className="sectionTitle"><Brain/>來源與下一步</div>{research?.sourceNotes?.map(x=><div className="source" key={x}>{x}</div>)}<div className="hint">這一步使用 OpenAI Responses API 的 web_search，品牌與競品 URL 也會一起作為研究線索。</div><button className="primary" disabled={aiDisabled||!research} onClick={doCis}><Sparkles size={17}/>{busy==='cis'?'整理 CIS…':'整理品牌 CIS'}</button></section></main>}

    {tab==='cis' && <main className="grid two"><section className="card"><div className="sectionTitle"><Palette/>可編輯 CIS</div>{cis ? <><label>品牌名<input value={cis.brandName} onChange={e=>setCis({...cis,brandName:e.target.value})}/></label><label>品牌定位<textarea value={cis.positioning} onChange={e=>setCis({...cis,positioning:e.target.value})}/></label><label>受眾<textarea value={cis.audience} onChange={e=>setCis({...cis,audience:e.target.value})}/></label><label>品牌個性<TextList value={cis.personality} onChange={v=>setCis({...cis,personality:v})}/></label><label>語氣<TextList value={cis.voice} onChange={v=>setCis({...cis,voice:v})}/></label><label>視覺關鍵字<TextList value={cis.visualKeywords} onChange={v=>setCis({...cis,visualKeywords:v})}/></label></> : <Empty text="先產出 CIS"/>}</section><section className="card"><div className="sectionTitle">色彩 / 字體 / Logo</div>{cis && <><div className="colors">{cis.colors.map((c,i)=><div className="color" key={i}><input type="color" value={/^#[0-9A-Fa-f]{6}$/.test(c.hex)?c.hex:'#111111'} onChange={e=>{const colors=[...cis.colors];colors[i]={...c,hex:e.target.value};setCis({...cis,colors})}}/><input value={c.name} onChange={e=>{const colors=[...cis.colors];colors[i]={...c,name:e.target.value};setCis({...cis,colors})}}/><input value={c.hex} onChange={e=>{const colors=[...cis.colors];colors[i]={...c,hex:e.target.value};setCis({...cis,colors})}}/></div>)}</div><label>字體規則<TextList value={cis.typography} onChange={v=>setCis({...cis,typography:v})}/></label><label>Logo 規則<TextList value={cis.logoRules} onChange={v=>setCis({...cis,logoRules:v})}/></label><label>可以做<TextList value={cis.do} onChange={v=>setCis({...cis,do:v})}/></label><label>不要做<TextList value={cis.dont} onChange={v=>setCis({...cis,dont:v})}/></label><button className="primary" disabled={aiDisabled} onClick={doDesign}><Package size={17}/>{busy==='design'?'正在設計…':'進入包裝設計'}</button></>}</section></main>}

    {tab==='design' && <main className="grid designGrid"><section className="card"><div className="sectionTitle">包裝結構</div>{design ? <><label>概念名稱<input value={design.conceptName} onChange={e=>setDesign({...design,conceptName:e.target.value})}/></label><label>包裝 family<input value={design.packageFamily} onChange={e=>setDesign({...design,packageFamily:e.target.value})}/></label><label>工程交付<input value={design.engineeringDeliverable} onChange={e=>setDesign({...design,engineeringDeliverable:e.target.value})}/></label><label>設計理由<textarea value={design.rationale} onChange={e=>setDesign({...design,rationale:e.target.value})}/></label><div className={`status ${design.productionStatus}`}>{design.productionStatus}</div></> : <Empty text="先產出設計"/>}</section><section className="card preview"><div className="sectionTitle">Artwork Preview</div>{design && <div className="pack"><div className="brandbar" style={{background:cis?.colors?.[1]?.hex||'#f97316'}}>{cis?.brandName||brand.name}</div><div className="sku">{product.sku}</div><h2>{design.front.headline}</h2><p>{design.front.subline}</p><div className="hero">PRODUCT / HERO AREA</div><div className="badges">{design.front.badges.map(x=><span key={x}>{x}</span>)}</div><ul>{design.front.features.map(x=><li key={x}><Check size={14}/>{x}</li>)}</ul></div>}</section><section className="card"><div className="sectionTitle">全部都能改</div>{design && <><label>正面主標<input value={design.front.headline} onChange={e=>setDesign({...design,front:{...design.front,headline:e.target.value}})}/></label><label>副標<input value={design.front.subline} onChange={e=>setDesign({...design,front:{...design.front,subline:e.target.value}})}/></label><label>Badge<TextList value={design.front.badges} onChange={v=>setDesign({...design,front:{...design.front,badges:v}})}/></label><label>Feature<TextList value={design.front.features} onChange={v=>setDesign({...design,front:{...design.front,features:v}})}/></label><label>攝影 / Mockup Brief<textarea value={design.imageBrief} onChange={e=>setDesign({...design,imageBrief:e.target.value})}/></label><button className="primary" disabled={aiDisabled} onClick={doMockup}><Image size={17}/>{busy==='image'?'生成商品照…':'生成擬真商品照'}</button><button className="secondary" disabled={aiDisabled} onClick={doReview}>AI Review</button></>}</section>{mockup && <section className="card wide"><div className="sectionTitle">Photoreal Mockup</div><img className="mockup" src={mockup}/></section>}</main>}

    {tab==='review' && <main className="grid two"><section className="card"><div className="sectionTitle">AI Review</div>{review ? <><div className={`reviewStatus ${review.status}`}>{review.status}</div>{[['已通過',review.passed],['注意',review.warnings],['卡住',review.blockers],['下一步',review.nextActions]].map(([t,x])=><div className="block" key={t}><h3>{t}</h3><ul>{x.map(i=><li key={i}>{i}</li>)}</ul></div>)}</> : <><Empty text="按下 Review 後會用人話告訴你目前能不能交付"/><button className="primary" disabled={aiDisabled||!design} onClick={doReview}>執行 AI Review</button></>}</section><section className="card"><div className="sectionTitle"><Download/>交付下載</div><p className="muted">SVG 是向量格式，可直接用 Adobe Illustrator 開啟後修改文字、色塊與群組。真正 .ai 原生檔需要 Adobe Illustrator/SDK 另行轉存，所以這裡不假裝產一個假的 .ai。</p><button className="primary" disabled={!design} onClick={()=>download(`${product.sku||'packaging'}-artwork.svg`,svgFor(design,cis,product),'image/svg+xml')}><Download size={17}/>下載 Illustrator 可編輯 SVG</button><button className="secondary" disabled={!design} onClick={()=>download(`${product.sku||'packaging'}-design.json`,JSON.stringify({product,brand,research,cis,design,review},null,2),'application/json')}>下載完整 Design JSON</button>{mockup && <a className="downloadLink" href={mockup} download={`${product.sku||'packaging'}-mockup.png`}>下載 PNG Mockup</a>}<div className="hint">Production-ready 刀模 / Bag Spec 仍要依工程尺寸生成；缺尺寸時系統會擋住，不亂猜。</div></section></main>}
  </div>;
}

function Empty({text}) { return <div className="empty">{text}</div>; }
