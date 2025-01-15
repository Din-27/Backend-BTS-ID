const jwt = require("jsonwebtoken");
const { ServerError, Unauthorized } = require("../helper/responseHttp");

exports.authMiddleware = (req, res, next) => {
    const authHeader = req.header("Authorization")
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        return Unauthorized('Token Not Found !', res)
    }

    try {
        const verified = jwt.verify(token, process.env.TOKEN_KEY)
        req.user = verified
        next()

    } catch (error) {
        console.error(error);
        return ServerError(res)
    }
};