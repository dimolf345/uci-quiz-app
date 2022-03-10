const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username è un campo obbligatorio"],
    trim: true,
    lowercase: true,
    minlength: [4, "Il campo username deve contenere almeno 4 caratteri"],
    maxlength: [20, "Il campo username non può contenere oltre 20 caratteri"],
    default: "Guest",
  },
  email: {
    type: String,
    required: [true, "Il campo email è obbligatorio"],
    default: "guest@marina.difesa.it",
    trim: true,
  },
  ship: {
    type: String,
    enum: [
      "bergamini",
      "fasan",
      "margottini",
      "carabiniere",
      "alpino",
      "rizzo",
      "martinengo",
      "marceglia",
    ],
    default: "martinengo",
  },
  last_access: {
    type: Date,
    default: Date.now(),
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    required: [true, "Un utente dev'essere classificato come user o admin"],
    select: false,
  },
  hashed_password: {
    type: String,
    required: [true, "hashed password is mandatory"],
    select: false,
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

//hides the __v field when usermodel is sent as JSON
userSchema.set("toJSON", { versionKey: false });

//virtual field password is used to set the encrypted password or to compare the password sent with the hashed value when retrieving for login
userSchema
  .virtual("password")
  .set(function (password) {
    //this._password is used for custom validation (see below)
    this._password = password;
  })
  .get(function () {
    return this._password;
  });

userSchema.virtual("passwordConfirm").set(function (passwordConfirm) {
  this._passwordConfirm = passwordConfirm;
});

userSchema.methods = {
  //checkpwd: methods for comparing pwds
  checkPassword: async function (sentPassword) {
    await bcrypt.compare(sentPassword, this.hashed_password);
  },
  //encrypt: method for storing the hashed_password
  encryptPassword: async function (password) {
    this.hashed_password = await bcrypt.hash(password, 12);
  },
};

//this pre validation hook checks if virtuals fields password and passwordConfirm are correct and then it saves the encrypted password
userSchema.pre("validate", async function (next) {
  if (this._passwordConfirm !== this._password) {
    this.invalidate("passwordConfirm", "Le password non corrispondono");
  }
  if (this._password && this._password.length < 6) {
    this.invalidate(
      "password",
      "Il campo password deve contenere almeno 6 caratteri"
    );
  }
  if (this.isNew && !this._password) {
    this.invalidate("password", "Il campo password è obbligatorio");
  }
  await this.encryptPassword(this._password);
  next();
});

//model declaration
const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
