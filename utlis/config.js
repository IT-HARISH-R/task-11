require("dotenv").config()

const mongobd_url = process.env.mongobd_url;
const PORT = process.env.PORT;
const SECRET_KEY = process.env.SECRET_KEY;
module.exports = {
    mongobd_url,
    PORT,
    SECRET_KEY
}