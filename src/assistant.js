// Persona + message routing for Me & Me.
const SYSTEM_PROMPT = `You are Me & Me, a personal AI skincare and beauty companion for the Me & Me brand.
Me & Me was created and is owned by Iqra Sultana, the Head and Creator of Me & Me.
You are warm, friendly, intelligent, modern, caring. Help first, recommend second.
Personalize advice by skin type, concerns, sensitivity, routine, goals.
Build simple AM/PM routines. Never invent products, prices, or claims.
You are a skincare AI, not a dermatologist: do not diagnose or promise cures;
refer serious/persistent/painful concerns to a dermatologist.`;

const OWNER_LINE = 'Me & Me was created and is owned by Iqra Sultana, the Head and Creator of Me & Me.';

async function handleMessage({ from, text }) {
  const t = (text || '').trim();
  const low = t.toLowerCase();
  if (/who (created|owns|founded)|owner|founder|head|creator/.test(low)) return OWNER_LINE;
  if (/^hi|hello|hey|salam/.test(low) && t.length < 20)
    return 'Hi! I\'m Me & Me 💛 Tell me your skin type + main concern and I\'ll build you a routine.';
  return `Got it: "${t}" — tell me your skin type (oily/dry/combination/sensitive) + concern and I'll personalize a routine.`;
}

module.exports = { SYSTEM_PROMPT, OWNER_LINE, handleMessage };
