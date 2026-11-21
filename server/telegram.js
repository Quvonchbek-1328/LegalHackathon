import crypto from 'node:crypto';

// https://core.telegram.org/bots/webapps#validating-data-received-via-the-mini-app
export function verifyInitData(initData, botToken, maxAgeSec = 86400) {
  try {
    const params = new URLSearchParams(initData);
    const hash = params.get('hash');
    if (!hash) return null;
    params.delete('hash');
    const dataCheck = [...params.entries()].sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0)).map(([k, v]) => `${k}=${v}`).join('\n');
    const secret = crypto.createHmac('sha256', 'WebAppData').update(botToken).digest();
    const calc = crypto.createHmac('sha256', secret).update(dataCheck).digest('hex');
    const a = Buffer.from(calc, 'hex'), b = Buffer.from(hash, 'hex');
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
    const authDate = Number(params.get('auth_date') || 0);
    if (maxAgeSec && Date.now() / 1000 - authDate > maxAgeSec) return null;
    const user = params.get('user');
    return { user: user ? JSON.parse(user) : null, authDate };
  } catch (e) {
    return null;
  }
}

export async function setMenuButton(botToken, url) {
  const r = await fetch(`https://api.telegram.org/bot${botToken}/setChatMenuButton`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ menu_button: { type: 'web_app', text: 'LegalCheck AI', web_app: { url } } }),
  });
  const j = await r.json();
  if (!j.ok) throw new Error(j.description || 'Telegram xatosi');
}
