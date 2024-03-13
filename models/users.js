const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    NAME: { type: String, required: true },
    CITY: { type: String, required: true },
    EDUCATION: { type: String, required: true },
    YEAR: { type: String, required: true },
    AGE: { type: String, required: true }
});

const MemberModel = mongoose.model('log', UserSchema );

module.exports = MemberModel;
// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

// const memberSchema = new mongoose.Schema({
//   NAME: String,
//   CITY: String,
//   EDUCATION: String,
//   YEAR: Number,
//   AGE: Number,
//   username: { type: String, unique: true },
//   password: String,
// });

// // Hash and set the password
// memberSchema.methods.setPassword = function (password) {
//   const saltRounds = 10;
//   this.password = bcrypt.hashSync(password, saltRounds);
// };

// // Verify the provided password with the stored hashed password
// memberSchema.methods.verifyPassword = function (password) {
//   return bcrypt.compareSync(password, this.password);
// };

// const MemberModel = mongoose.model('Member', memberSchema);

// module.exports = MemberModel;
