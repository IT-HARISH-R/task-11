const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../utlis/config")

const auth = {
    verifyUser: async (request, response, next) => {

        console.log(SECRET_KEY);
        const token = request.headers.authorization.substring(7)

        if (!token) {
            return response.status(401).json({ message: 'Access denied' });
        }

        try {
            const verfied = jwt.verify(token,SECRET_KEY);
            request.userid = verfied.id;
        }
        catch {
            return response.status(400).json({ message: 'Invalid token' });
        }
        next()
    }
}

module.exports = auth;