const bcrypt = require('bcryptjs');

module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        username: { type: String, required: true, unique: true },
        passwordHash: { type: String },
        googleId:  { type: String },
        facebookId:  { type: String },
      },
    );
  
    schema.methods.comparePassword = function(password) {
        return bcrypt.compare(password, this.passwordHash);
    };
  
    const User = mongoose.model("user", schema);
    return User;
  };