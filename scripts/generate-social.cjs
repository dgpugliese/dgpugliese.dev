// Run with sharp available in NODE_PATH: node scripts/generate-social.cjs
const sharp = require('sharp');
const path = require('node:path');
const cards = [
  ['og-v2.png', 'DAVID PUGLIESE / SYSTEMS BUILDER', ['I build systems', 'end to end'], 'Infrastructure, security, and software.'],
  ['build-og-v2.png', 'BUILD SERVICES / DAVID PUGLIESE', ['Your next product', 'built to run'], 'From the first conversation to production.'],
  ['dorothy-og-v2.png', 'CASE STUDY / DOROTHY', ['Read the storm', 'before it hits'], 'Salesforce monitoring. Built for the signals that matter.'],
];
(async () => {
  for (const [file, label, lines, sub] of cards) {
    const dotX = file === 'og-v2.png' ? 493 : file === 'build-og-v2.png' ? 498 : 560;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
      <rect width="1200" height="630" fill="#0a0a0c"/>
      <path d="M64 58H1136" stroke="#b91c1c" stroke-width="2"/>
      <text x="64" y="105" fill="#b4b0ad" font-family="monospace" font-size="16" letter-spacing="2">${label}</text>
      <text x="60" y="265" fill="#f0ede7" font-family="Arial, sans-serif" font-weight="700" font-size="92" letter-spacing="-5">${lines[0]}</text>
      <text x="60" y="365" fill="#96918d" font-family="Arial, sans-serif" font-weight="700" font-size="92" letter-spacing="-5">${lines[1]}</text><circle cx="${dotX}" cy="358" r="7" fill="#b91c1c"/>
      <text x="64" y="445" fill="#b4b0ad" font-family="Arial, sans-serif" font-size="26">${sub}</text>
      <path d="M64 526H1136" stroke="#333330"/>
      <text x="64" y="572" fill="#f0ede7" font-family="monospace" font-size="18">dgpugliese.dev</text>
      <text x="1136" y="572" fill="#f07165" font-family="Arial, sans-serif" font-size="28" text-anchor="end">↗</text>
    </svg>`;
    await sharp(Buffer.from(svg)).png().toFile(path.join(__dirname, '..', 'public', file));
    console.log(file);
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
