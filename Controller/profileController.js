const Profile = require("../models/profileModal");
const asyncHandler = require("express-async-handler");

// @desc    Register Profile
// @route   Post /profile/register
// @access  Public

const registerProfile = asyncHandler(async (req, res) => {
  const {
    userId,
    name,
    age,
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
  const getProfile = await Profile.create({
    userId,
    name,
    age,
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
  });
  if (getProfile) {
    res.json({ data: getProfile, success: true });
  } else {
    res.status(400);
    throw new Error("Register Profile is failed");
  }
});

// @desc    Get All Profile
// @route   Get /profile
// @access  Public

const getAllProfile = asyncHandler(async (req, res) => {
  const getAll = await Profile.find({}).populate("userId", "name email role");
  if (getAll) {
    res.json({ data: getAll, success: true });
  } else {
    res.status(400);
    throw new Error("Cannot get Profile");
  }
});

// @desc    Get  Profile By ID
// @route   Get /profile/:id
// @access  Public

const getProfileById = asyncHandler(async (req, res) => {
  const profile = await Profile.findById(req.params.id).populate(
    "userId",
    "name email"
  );
  if (profile) {
    res.json({ data: profile, success: true });
  } else {
    res.status(400);
    throw new Error("profile Not Found ");
  }
});

// @desc    Delete Profile
// @route   profile/delete
// @access  Private
const deleteProfile = asyncHandler(async (req, res) => {
  const profile = await Profile.findById(req.body.profileId);
  if (profile) {
    await agency.remove();
    res.json({
      message: "profile has been Delete sucessfully",
      succcess: true,
    });
  } else {
    res.status(404);
    throw new Error("Error while deleting the profile, profile is not found");
  }
});

module.exports = {
  registerProfile,
  getAllProfile,
  deleteProfile,
  getProfileById,
};
