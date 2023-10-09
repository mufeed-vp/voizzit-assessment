import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// desc    Auth user & get token
// route   POST /api/users/auth
// access  Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) {
        if (!await user.matchPassword(password)) {
            
            return res.status(401).json({ success: false,name: 'pass', message: 'Invalid password' })
        } else {

            const token = generateToken(res, user._id);
            res.cookie('user', JSON.stringify(user), { httpOnly: true });
            return res.json({
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
                email: user.email,
                token

            })
        } 
    }else {
        return res.status(401).json({ success: false,name: "email", message: 'Invalid email' })
    }
});

// desc    Register a new user
// route   POST /signup
// access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email,age, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
    // return res.status(200).json({ success: false, message: 'Email already exists' })
  }

  const user = await User.create({
    firstName,
    lastName,
    age,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      laststName: user.lastName,
      age: user.age,
      email: user.email,
      role: user.role
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// desc    Logout user / clear cookie
// route   POST /api/users/logout
// access  Public
const logoutUser = (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

// desc    Get user profile
// route   GET /dashboard
// access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.aggregate([
    { $sort: {createdAt: -1} },
    { 
      $project: {
        _id: 1,
        firstName: 1,
        lastName: 1,
        email: 1,
        age: 1,
        salary:1,
        joiningDate: { $dateToString: { format: "%Y/%m/%d", date: "$createdAt" } },
      }
    }
  ])

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// desc    Update user profile
// route   PUT /dashboard
// access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.body._id);
  if (user) {
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;
    user.age = req.body.age || user.age;
    user.salary = req.body.salary || user.salary;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      age: updatedUser.age,
      salary: updatedUser.salary
      
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// desc    Delete user profile
// route   DELETE /dashboard
// access  Private
const deleteUserProfile = asyncHandler(async (req, res) => {
  try {
    const userId = req.body._id;
    const deletionResult = await User.deleteOne({ _id: userId });
    if (deletionResult.deletedCount === 1) {
      res.json({ message: 'User deleted' });
    } else {
      console.log("User not found");
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
};
