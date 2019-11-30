const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const common = {
  type: String,
  required: true,
  trim: true
};

const userSchema = new Schema({
  name: {
    ...common
  },
  email: {
    ...common
  },
  password: {
    ...common
  },
  accountStatus: String,
  isActivated: Boolean,
  activateToken: String,
  history: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'History'
    }
  ],
});

userSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'history',
    select: '-__v'
  })

  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
