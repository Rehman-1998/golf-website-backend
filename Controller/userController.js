const User = require("../models/userModal");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");
const helper = require("../helper/helper");

/**
 * @method authUser
 * @desc auth user
 * @route POST user/login
 * @access Public
 */

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (helper.isValid(email)) {
    if (helper.checkPassword(password)) {
      const user = await User.findOne({ email });
      if (user) {
        if (await user.matchPassword(password)) {
          res.json({
            data: {
              _id: user._id,
              name: user.name,
              email: user.email,
              role: user.role,
            },
            authToken: generateToken(user._id),
            success: true,
            error: false,
          });
        } else {
          res.status(404);
          throw new Error("Password not matched");
        }
      } else {
        throw new Error("Email not Found");
      }
    } else {
      throw new Error(
        "min 6 letter, a symbol, upper and lower case letters and a number"
      );
    }
  } else {
    throw new Error("Email is not correct");
  }
});

// @desc    Register User
// @route   POST /user
// @access  Public
/**
 *
 */

const registerUser = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    password,
    role,
    age,
    image,
    gender,
    state,
    city,
    country,
    zipCode,
    phone,
    about,
    skillLevel,
    currentHandicap,
    oftenPlay,
    availability,
    distance,
    purpose,
    matirialStatus,
    drinker,
    linkdinProfile,
    companyName,
    positionInCompany,
    industry,
    smoker,
    race,
    religion,
    politicalView,
    favouriteCourse,
  } = req.body;
  if (!helper.isValid(email)) {
    throw new Error("Email is not correct");
  }
  if (role != "client" && role != "businness" && role !== "admin") {
    res.status(400);
    throw new Error("Invalid user role");
  }
  if (!helper.checkPassword(password)) {
    throw new Error(
      "min 6 letter, a symbol, upper and lower case letters and a number"
    );
  }

  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name: name,
    email: email,
    password: password,
    role: role,
    age: age,
    image: image,
    gender: gender.toLowerCase(),
    state: state.toLowerCase(),
    city: city.toLowerCase(),
    country: country.toLowerCase(),
    zipCode: zipCode,
    phone: phone,
    about: about,
    skillLevel: skillLevel.toLowerCase(),
    currentHandicap: currentHandicap,
    oftenPlay: oftenPlay.toLowerCase(),
    availability: availability.toLowerCase(),
    distance: distance,
    purpose: purpose.toLowerCase(),
    matirialStatus: matirialStatus.toLowerCase(),
    drinker: drinker.toLowerCase(),
    linkdinProfile: linkdinProfile,
    companyName: companyName.toLowerCase(),
    positionInCompany: positionInCompany.toLowerCase(),
    industry: industry.toLowerCase(),
    smoker: smoker.toLowerCase(),
    race: race.toLowerCase(),
    religion: religion.toLowerCase(),
    politicalView: politicalView.toLowerCase(),
    favouriteCourse: favouriteCourse.toLowerCase(),
  });

  if (user) {
    res.json({
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        age: user.age,
        image: user.image,
        gender: user.gender,
        state: user.state,
        city: user.city,
        country: user.country,
        zipCode: user.zipCode,
        phone: user.phone,
        about: user.about,
        skillLevel: user.skillLevel,
        currentHandicap: user.currentHandicap,
        oftenPlay: user.oftenPlay,
        availability: user.availability,
        distance: user.distance,
        purpose: user.purpose,
        matirialStatus: user.matirialStatus,
        drinker: user.drinker,
        linkdinProfile: user.linkdinProfile,
        companyName: user.companyName,
        positionInCompany: user.positionInCompany,
        industry: user.industry,
        smoker: user.smoker,
        race: user.race,
        religion: user.religion,
        politicalView: user.politicalView,
        favouriteCourse: user.favouriteCourse,
      },
      authToken: generateToken(user._id),
      success: true,
      error: false,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Get Users
// @route   Get /user
// @access  Public

const users = asyncHandler(async (req, res) => {
  const allUser = await User.find({ role: { $ne: "admin" } });
  if (allUser) {
    res.json({ data: allUser, success: true });
  } else {
    res.status(404);
    throw new Error("Users Not Found");
  }
});

// @desc    Get User by ID
// @route   Get /user
// @access  Public

const getUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  if (user) {
    res.json({ data: user, success: true });
  } else {
    res.status(400);
    throw new Error("user not found");
  }
});

// @desc    Filter Users
// @route   post /filter
// @access  Public

const filterUsers = asyncHandler(async (req, res) => {
  const minAge = req.body.age?.split("-")[0];
  const maxAge = req.body.age?.split("-")[1];
  const minDistance = req.body.distance?.split("-")[0];
  const maxDistance = req.body.distance?.split("-")[1];
  const users = await User.find({
    ...req.body,
    age: { $lte: parseInt(maxAge), $gte: parseInt(minAge) },
    distance: { $lte: parseInt(maxDistance), $gte: parseInt(minDistance) },
    // purpose: { $in: req.body.purpose },
  });
  if (users) {
    res.json({ data: users, success: true });
  } else {
    res.status(400);
    throw new Error("users not found");
  }
});

module.exports = { authUser, registerUser, getUser, users, filterUsers };
