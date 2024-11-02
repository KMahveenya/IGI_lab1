const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.medicines = require("./medicine.model.js")(mongoose);
db.users = require("./user.model.js")(mongoose);
db.news = require("./new.model.js")(mongoose);
db.staffs = require("./staff.model.js")(mongoose);

module.exports = db;