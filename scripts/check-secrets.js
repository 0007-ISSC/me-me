// Pre-push secret scan: fails if likely secrets are staged/committed.
const { execSync } = require('child_process');

const PATTERNS = [
  /sk-[A-Za-z0-9]{10,}/, /(xox[bpas]-|ghp_|gho_|AKIA|AIza)/,
  /-----BEGIN (RSA )?PRIVATE KEY-----/,
  /api[_-]?key\s*[:=]\s*['"][^'"]{8,}['"]/i,
];

function filesToCheck() {
  try {
    const out = execSync('git diff --cached --name-only', { encoding: 'utf8' });
    return out.split('\n').map((s) => s.trim()).filter(Boolean);
  } catch { return []; }
}

const fs = require('fs');
let bad = 0;
for (const f of filesToCheck()) {
  let content = '';
  try { content = fs.readFileSync(f, 'utf8'); } catch { continue; }
  if (f === '.env' || f.endsWith('/.env')) { console.error(`BLOCKED: ${f} must never be committed`); bad++; continue; }
  for (const p of PATTERNS) if (p.test(content)) { console.error(`BLOCKED: possible secret in ${f}`); bad++; break; }
}
if (bad) process.exit(1);
console.log('secret check passed');
