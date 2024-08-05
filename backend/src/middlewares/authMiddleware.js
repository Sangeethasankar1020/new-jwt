import jwt from 'jsonwebtoken';

const verifyUser = (req, res, next) => {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
        return res.status(401).json({ valid: false, message: "No access token" });
    }

    jwt.verify(accessToken, 'jwt-access-token-secret-key', (err, decoded) => {
        if (err) {
            // Try to renew token if expired
            if (err.name === 'TokenExpiredError') {
                return renewToken(req, res, next);
            } else {
                return res.status(403).json({ valid: false, message: "Invalid access token" });
            }
        }
        req.email = decoded.email;
        next();

    });
};

const renewToken = (req, res, next) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({ valid: false, message: "No refresh token" });
    }

    jwt.verify(refreshToken, 'jwt-refresh-token-secret-key', (err, decoded) => {
        if (err) {
            return res.status(403).json({ valid: false, message: "Invalid refresh token" });
        }
        const newAccessToken = jwt.sign({ email: decoded.email }, 'jwt-access-token-secret-key', { expiresIn: '1m' });
        res.cookie('accessToken', newAccessToken, { maxAge: 60000, httpOnly: true, secure: true, sameSite: 'strict' });
        req.email = decoded.email;
        next();

    });
};
export { verifyUser };
