import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const html=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const code=fs.readFileSync(new URL('../buyer-inquiry.js',import.meta.url),'utf8');
const src=html.match(/<iframe src="([^"]+)" id="inline-Ex2VsTEBognqEcHUP05y"/)[1].replaceAll('&amp;','&');
function run(search='') {
  const frame={src,getAttribute:()=>src};
  const fallback={href:src};
  vm.runInNewContext(code,{URL,URLSearchParams,location:{search},document:{
    getElementById:()=>frame,
    querySelectorAll:selector=>selector==='[data-buyer-form-link]'?[fallback]:[]
  }});
  return {url:new URL(frame.src),fallback};
}
test('one approved Bull Point form, with property context even without JavaScript',()=>{
  assert.equal((html.match(/<iframe /g)||[]).length,1);
  const url=new URL(src);
  assert.equal(url.origin,'https://api.leadconnectorhq.com');
  assert.equal(url.pathname,'/widget/form/Ex2VsTEBognqEcHUP05y');
  assert.equal(url.searchParams.get('source'),'Bull Point — 14 Barnaby Bluff');
  assert.match(url.searchParams.get('multi_line_3pmc'),/14 Barnaby Bluff.*MLS 197994/);
  assert.match(url.searchParams.get('multi_line_3pmc'),/Source: https:\/\/14barnabybluff.osprealestate.com\//);
  assert.ok(html.includes('data-buyer-form-link href="'+src.replaceAll('&','&amp;')+'"'));
});
test('bounded campaign attribution reaches both native entry points',()=>{
  const {url,fallback}=run('?utm_source=google&utm_campaign=fall_2026&utm_content=home');
  assert.equal(url.searchParams.get('utm_source'),'google');
  assert.match(url.searchParams.get('multi_line_3pmc'),/utm_campaign: fall_2026/);
  assert.equal(fallback.href,url.href);
});
test('contact details, consent, alternate property and arbitrary URLs cannot prefill native form',()=>{
  const {url}=run('?name=Private&email=private@example.com&phone=8435550123&consent=true&source=evil&property=elsewhere&listing_url=https://evil.example&utm_medium=%3Cscript%3E&utm_term='+('a'.repeat(101)));
  assert.deepEqual([...url.searchParams.keys()].sort(),['multi_line_3pmc','source']);
  assert.doesNotMatch(url.href,/Private|private|8435550123|evil|elsewhere|script|consent/);
});
test('concierge and direct contact routes are preserved and form has accessible mobile fallback',()=>{
  for(const value of ['id="concierge"','id="close-concierge"','data-topic="home"',
    'sms:+18432524383','sms:+18432523559','mailto:stacey@gavigangroup.com,billy@gavigangroup.com',
    'id="buyer-inquiry"','aria-labelledby="buyer-inquiry-title"',
    'title="Bull Point buyer inquiry form — 14 Barnaby Bluff"','data-concierge-inquiry'])assert.ok(html.includes(value),value);
  const css=fs.readFileSync(new URL('../buyer-inquiry.css',import.meta.url),'utf8');
  assert.match(css,/@media\(max-width:900px\)/);
  assert.match(css,/max-width:100%/);
  assert.doesNotMatch(code,/\bfetch\(|localStorage|sessionStorage|postMessage/);
});
