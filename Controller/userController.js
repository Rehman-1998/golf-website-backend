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

const filter = asyncHandler(async (req, res) => {
  console.log("req body", req.body);

  const users = await User.find({
    $and: [
      {
        age: {
          $lte: req.body.maxAge,
          $gte: req.body.minAge,
        },
      },
      {
        gender: req.body.gender,
      },
    ],
  });

  if (users) {
    res.json({ data: users, success: true });
  } else {
    res.status(400);
    throw new Error("users not found");
  }
});

// @desc    Update Profile
// @route   POST /updateProfile
// @access  Public

const updateProfile = asyncHandler(async (req, res) => {
  const {
    user_id,
    name,
    gender,
    dob,
    age,
    about,
    matirialStatus,
    state,
    city,
    zipCode,
    skillLevel,
    currentHandicap,
    oftenPlay,
    availability,
    distance,
    purpose,
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

  console.log("data====>", req.body);

  let user = await User.findById(user_id);

  if (user) {
    if (name != "") {
      user = await User.findByIdAndUpdate(
        user_id,
        {
          $set: { name: name },
        },
        {
          new: true,
        }
      );
    }
    if (about != "") {
      user = await User.findByIdAndUpdate(
        user_id,
        {
          $set: { about: about },
        },
        {
          new: true,
        }
      );
    }
    if (age != "") {
      user = await User.findByIdAndUpdate(
        user_id,
        {
          $set: { age: age },
        },
        {
          new: true,
        }
      );
    }
    if (matirialStatus != "") {
      user = await User.findByIdAndUpdate(
        user_id,
        {
          $set: { matirialStatus: matirialStatus },
        },
        {
          new: true,
        }
      );
    }
    if (dob != "") {
      user = await User.findByIdAndUpdate(
        user_id,
        {
          $set: { dob: dob },
        },
        {
          new: true,
        }
      );
    }
    if (gender != "") {
      user = await User.findByIdAndUpdate(
        user_id,
        {
          $set: { gender: gender },
        },
        {
          new: true,
        }
      );
    }
    if (state != "") {
      user = await User.findByIdAndUpdate(
        user_id,
        {
          $set: { state: state },
        },
        {
          new: true,
        }
      );
    }
    if (city != "") {
      user = await User.findByIdAndUpdate(
        user_id,
        {
          $set: { city: city },
        },
        {
          new: true,
        }
      );
    }
    if (zipCode != "") {
      user = await User.findByIdAndUpdate(
        user_id,
        {
          $set: { zipCode: zipCode },
        },
        {
          new: true,
        }
      );
    }
    if (about != "") {
      user = await User.findByIdAndUpdate(
        user_id,
        {
          $set: { about: about },
        },
        {
          new: true,
        }
      );
    }
    if (skillLevel != "") {
      user = await User.findByIdAndUpdate(
        user_id,
        {
          $set: { skillLevel: skillLevel },
        },
        {
          new: true,
        }
      );
    }
    if (currentHandicap != "") {
      user = await User.findByIdAndUpdate(
        user_id,
        {
          $set: { currentHandicap: currentHandicap },
        },
        {
          new: true,
        }
      );
    }
    if (oftenPlay != "") {
      user = await User.findByIdAndUpdate(
        user_id,
        {
          $set: { oftenPlay: oftenPlay },
        },
        {
          new: true,
        }
      );
    }
    if (distance != "") {
      user = await User.findByIdAndUpdate(
        user_id,
        {
          $set: { distance: distance },
        },
        {
          new: true,
        }
      );
    }
    if (favouriteCourse != "") {
      user = await User.findByIdAndUpdate(
        user_id,
        {
          $set: { favouriteCourse: favouriteCourse?.toString() },
        },
        {
          new: true,
        }
      );
    }
    if (availability != "") {
      user = await User.findByIdAndUpdate(
        user_id,
        {
          $set: { availability: availability?.toString() },
        },
        {
          new: true,
        }
      );
    }
    if (purpose != "") {
      user = await User.findByIdAndUpdate(
        user_id,
        {
          $set: { purpose: purpose?.toString() },
        },
        {
          new: true,
        }
      );
    }
    if (drinker != "") {
      user = await User.findByIdAndUpdate(
        user_id,
        {
          $set: { drinker: drinker },
        },
        {
          new: true,
        }
      );
    }
    if (race != "") {
      user = await User.findByIdAndUpdate(
        user_id,
        {
          $set: { race: race },
        },
        {
          new: true,
        }
      );
    }
    if (religion != "") {
      user = await User.findByIdAndUpdate(
        user_id,
        {
          $set: { religion: religion },
        },
        {
          new: true,
        }
      );
    }

    if (smoker != "") {
      user = await User.findByIdAndUpdate(
        user_id,
        {
          $set: { smoker: smoker?.toString() },
        },
        {
          new: true,
        }
      );
    }
    if (politicalView != "") {
      user = await User.findByIdAndUpdate(
        user_id,
        {
          $set: { politicalView: politicalView },
        },
        {
          new: true,
        }
      );
    }
    if (linkdinProfile === "") {
      user = await User.findByIdAndUpdate(
        user_id,
        {
          $set: { linkdinProfile: linkdinProfile },
        },
        {
          new: true,
        }
      );
    }
    if (companyName === "") {
      user = await User.findByIdAndUpdate(
        user_id,
        {
          $set: { companyName: companyName },
        },
        {
          new: true,
        }
      );
    }
    if (positionInCompany === "") {
      user = await User.findByIdAndUpdate(
        user_id,
        {
          $set: { positionInCompany: positionInCompany },
        },
        {
          new: true,
        }
      );
    }
    if (industry === "") {
      user = await User.findByIdAndUpdate(
        user_id,
        {
          $set: { industry: industry },
        },
        {
          new: true,
        }
      );
    }

    res.json({
      data: user,
      success: true,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

module.exports = {
  authUser,
  registerUser,
  getUser,
  users,
  filterUsers,
  filter,
  updateProfile,
};
