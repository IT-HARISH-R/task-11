const app = require("./app");
const mongoose = require("mongoose");
const { mongobd_url, PORT } = require("./utlis/config");

mongoose.connect(mongobd_url)
    .then(() => {
        console.log("Connecting database")
        app.listen(PORT, () => {
            console.log("server run at http://127.0.0.1:3000");
        })
    })
    .catch((error) => {
        console.log(error)
        console.log(mongobd_url)
    })
