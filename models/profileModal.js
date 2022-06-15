const mongoose = require("mongoose");

const agencySchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
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
      type: Number,
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
      type: Number,
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
    timestamp: true,
  }
);

const Agency = mongoose.model("profile", agencySchema);

module.exports = Agency;
