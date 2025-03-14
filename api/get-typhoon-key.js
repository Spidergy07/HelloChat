export default function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Verify request origin
    const allowedDomains = (process.env.ALLOWED_DOMAIN || 'localhost').split(',');
    const origin = req.headers.origin || '';

    const isAllowed = allowedDomains.some(domain => 
        origin.includes(domain) || domain.includes(origin)
    );

    if (!isAllowed) {
        return res.status(403).json({ 
            error: 'Unauthorized origin',
            origin: origin,
            allowed: allowedDomains 
        });
    }

    // ตรวจสอบว่ามี API key และ format ถูกต้อง
    const apiKey = process.env.TYPHOON_API_KEY;
    if (!apiKey || typeof apiKey !== 'string' || !apiKey.startsWith('sk-')) {
        return res.status(500).json({ error: 'Invalid API key configuration' });
    }

    return res.status(200).json({ 
        key: apiKey.trim()
    });
} 