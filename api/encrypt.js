import CryptoJS from 'crypto-js';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url, token } = req.body;

  if (!url || !token) {
    return res.status(400).json({ error: 'Missing url or token in request body' });
  }

  try {
    const key = CryptoJS.enc.Hex.parse(token);
    const iv = CryptoJS.enc.Hex.parse('afc4e290725a3bf0ac4d3ff826c43c10');
    const encrypted = CryptoJS.AES.encrypt(url, key, {
      iv: iv,
      padding: CryptoJS.pad.ZeroPadding
    });
    const urlhash = encrypted.toString();

    res.status(200).json({ urlhash });
  } catch (error) {
    res.status(500).json({ error: 'Encryption failed' });
  }
}
