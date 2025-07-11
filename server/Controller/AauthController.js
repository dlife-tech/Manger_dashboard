const catchAsync = require("../Utils/catchAsync");
const User = require("../Model/User.js");
const generateOtp = require("../Utils/generateOtp");
const jwt = require("jsonwebtoken");
const sendEmail = require("../Utils/email");
const AppError = require("../Utils/appError");

// JWT Token creation
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Send token in cookie & response
const createSendToken = (user, statusCode, res, message) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() +
        Number(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
  };

  res.cookie("token", token, cookieOptions);

  user.password = undefined;
  user.passwordConfirm = undefined;

  res.status(statusCode).json({
    status: "success",
    message,
    token,
    data: {
      user,
    },
  });
};

// Signup with OTP generation
exports.signup = catchAsync(async (req, res, next) => {
  const { email, username, password, passwordConfirm } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new AppError("User already exists with this email", 400));
  }

  const otp = generateOtp();
  const otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

  const newUser = await User.create({
    email,
    username,
    password,
    passwordConfirm,
    otp,
    otpExpires,
  });

  try {
    await sendEmail({
      email: newUser.email,
      subject: "OTP for email verification",
      html: `<h1>Your OTP is ${otp}</h1>`,
    });

    createSendToken(newUser, 201, res, "Registration successful. OTP sent.");
  } catch (error) {
    await User.findByIdAndDelete(newUser._id);
    return next(
      new AppError("There is an error sending the email. Try again", 500)
    );
  }
});

// OTP verification after signup
exports.verifyAccount = catchAsync(async (req, res, next) => {
  const { otp } = req.body;
  const user = req.user;

  if (!otp) return next(new AppError("OTP is missing", 400));
  if (!user) return next(new AppError("User not found", 404));

  if (String(user.otp) !== String(otp))
    return next(new AppError("Invalid OTP", 400));

  if (Date.now() > user.otpExpires)
    return next(new AppError("OTP expired. Please request a new one", 400));

  user.isVerified = true;
  user.otp = undefined;
  user.otpExpires = undefined;

  await user.save({ validateBeforeSave: false });

  createSendToken(user, 200, res, "Email verified successfully");
});

// Resend OTP for verification
exports.resendOTP = catchAsync(async (req, res, next) => {
  const { email } = req.user;

  const user = await User.findOne({ email });
  if (!user) return next(new AppError("User not found", 404));
  if (user.isVerified)
    return next(new AppError("Account already verified", 400));

  const newOtp = generateOtp();
  const otpExpires = Date.now() + 10 * 60 * 1000;

  user.otp = newOtp;
  user.otpExpires = otpExpires;

  await user.save({ validateBeforeSave: false });

  try {
    await sendEmail({
      email: user.email,
      subject: "Resend OTP for email verification",
      html: `<h1>Your new OTP is ${newOtp}</h1>`,
    });

    res.status(200).json({
      status: "success",
      message: "OTP has been resent successfully",
    });
  } catch (error) {
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError("There is an error sending the email. Try again", 500)
    );
  }
});

// Login
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new AppError("Please provide email and password", 400));

  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  createSendToken(user, 200, res, "Login successful");
});

// Logout
exports.logout = catchAsync(async (req, res, next) => {
  res.cookie("token", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  res.status(200).json({
    status: "success",
    message: "Logged out successfully",
  });
});

// Forget Password - OTP sent to email
exports.forgetPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  if (!email) return next(new AppError("Email is required", 400));

  const user = await User.findOne({ email });
  if (!user) return next(new AppError("No user found with this email", 404));

  const otp = generateOtp();
  user.resetPasswordOTP = otp;
  user.resetPasswordOTPExpires = Date.now() + 5 * 60 * 1000;

  await user.save({ validateBeforeSave: false });

  try {
    await sendEmail({
      email: user.email,
      subject: "Reset Password OTP",
      html: `<h1>Your OTP is ${otp}</h1>`,
    });

    res.status(200).json({
      status: "success",
      message: "Password reset OTP sent to your email",
    });
  } catch (error) {
    user.resetPasswordOTP = undefined;
    user.resetPasswordOTPExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new AppError("Failed to send OTP. Try again later", 500));
  }
});

// Reset Password using OTP
exports.resetPassword = catchAsync(async (req, res, next) => {
  const { email, otp, password, passwordConfirm } = req.body;

  const user = await User.findOne({
    email,
    resetPasswordOTP: otp,
    resetPasswordOTPExpires: { $gt: Date.now() },
  });

  if (!user) return next(new AppError("Invalid OTP or expired", 400));

  user.password = password;
  user.passwordConfirm = passwordConfirm;
  user.resetPasswordOTP = undefined;
  user.resetPasswordOTPExpires = undefined;

  await user.save();

  createSendToken(user, 200, res, "Password reset successful");
});

// Optional: Check auth (for frontend session)
exports.checkAuth = catchAsync(async (req, res) => {
  res.status(200).json({
    status: "success",
    user: req.user,
    message: "Authenticated",
  });
});
