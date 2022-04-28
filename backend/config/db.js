const mongoose = require("mongoose");
const MONGOURI = "mongodb://127.0.0.1:27018/golf-stats";
const InitiateMongoServer = async () => {
    try {
        await mongoose.connect(MONGOURI, {
            useNewUrlParser: true,
        });
        console.log("Connected to DB");
    } catch (e) {
        console.log(e);
        throw e;
    }
};

module.exports = InitiateMongoServer;
