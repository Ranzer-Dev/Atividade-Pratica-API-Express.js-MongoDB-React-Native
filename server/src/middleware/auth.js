const jwt = require('jsonwebtoken');

function requireAuth(req, res, next) {
    const header = req.get('authorization') || '';
    const [scheme, token] = header.split(' ');
    if (scheme !== 'Bearer' || !token) {
        return res.status(401).json({ message: 'Autenticação necessária.' });
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = payload.sub;
        return next();
    } catch {
        return res.status(401).json({ message: 'Sessão inválida ou expirada.' });
    }
}

module.exports = requireAuth;
