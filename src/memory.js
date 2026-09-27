// Persistent memory (JSON store). Survives restarts.
const fs = require('fs');
const path = require('path');

const FILE = process.env.MEMORY_FILE || path.join(__dirname, '..', 'data', 'memory.json');
let store = {};

function loadMemory() {
  try {
    if (fs.existsSync(FILE)) store = JSON.parse(fs.readFileSync(FILE, 'utf8'));
  } catch { store = {}; }
  return store;
}

function saveMemory() {
  try {
    fs.mkdirSync(path.dirname(FILE), { recursive: true });
    fs.writeFileSync(FILE, JSON.stringify(store, null, 2));
  } catch (e) { console.error('memory save failed', e.message); }
}

function remember(key, value) { store[key] = value; saveMemory(); }
function recall(key, fallback = null) { return key in store ? store[key] : fallback; }

module.exports = { loadMemory, saveMemory, remember, recall };
