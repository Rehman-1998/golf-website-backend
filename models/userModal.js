const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
    },
    age: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    zipCode: {
      type: Number,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    skillLevel: {
      type: String,
      required: true,
    },
    currentHandicap: {
      type: String,
      required: true,
    },
    oftenPlay: {
      type: String,
      required: true,
    },
    availability: {
      type: String,
      required: true,
    },
    distance: {
      type: String,
      required: true,
    },
    purpose: {
      type: String,
      required: true,
    },
    matirialStatus: {
      type: String,
      required: true,
    },
    drinker: {
      type: String,
      required: true,
    },
    linkdinProfile: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    positionInCompany: {
      type: String,
      required: true,
    },
    industry: {
      type: String,
      required: true,
    },
    smoker: {
      type: String,
      required: true,
    },
    race: {
      type: String,
      required: true,
    },
    religion: {
      type: String,
      required: true,
    },
    politicalView: {
      type: String,
      required: true,
    },
    favouriteCourse: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("users", userSchema);

module.exports = User;
