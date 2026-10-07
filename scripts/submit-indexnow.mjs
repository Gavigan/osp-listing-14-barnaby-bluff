import { readFile } from 'node:fs/promises';

const OSP_DOMAIN_SUFFIX='.osprealestate.com';
const host=(await readFile('CNAME','utf8')).trim().toLowerCase();
const propertyLabel=host.endsWith(OSP_DOMAIN_SUFFIX) ? host.slice(0,-OSP_DOMAIN_SUFFIX.length) : '';
const validPropertyLabel=
  propertyLabel.length>0 &&
  propertyLabel.length<=63 &&
  !propertyLabel.includes('.') &&
  /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(propertyLabel);

if(!validPropertyLabel) throw new Error(`Unexpected property host: ${host || '(empty)'}`);

const key=(await readFile('indexnow-key.txt','utf8')).trim();
const keyLocation=`https://${host}/indexnow-key.txt`;
let ready=false;
for(let attempt=0;attempt<12;attempt++){
  try {const r=await fetch(keyLocation,{signal:AbortSignal.timeout(10000),cache:'no-store'});ready=r.ok&&(await r.text()).trim()===key;} catch {}
  if(ready)break;
  await new Promise(resolve=>setTimeout(resolve,10000));
}
if(!ready)throw new Error('The live ownership file is not available yet; no URLs submitted.');
const home=await fetch(`https://${host}/`,{signal:AbortSignal.timeout(20000)});
if(!home.ok)throw new Error(`Live home returned ${home.status}`);
const response=await fetch('https://api.indexnow.org/indexnow',{method:'POST',headers:{'Content-Type':'application/json; charset=utf-8'},body:JSON.stringify({host,key,keyLocation,urlList:[`https://${host}/`]}),signal:AbortSignal.timeout(20000)});
if(!response.ok)throw new Error(`IndexNow returned ${response.status}: ${await response.text()}`);
console.log(`IndexNow received https://${host}/ — HTTP ${response.status}. Receipt is not a guarantee of indexing.`);
