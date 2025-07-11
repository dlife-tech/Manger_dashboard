const jwt = require("jsonwebtoken");
const catchAsync = require("../Utils/catchAsync");
const AppError = require("../Utils/appError");
const User = require("../Model/User");

const isAuthenticated = catchAsync(async (req, res, next) => {
    // Fix typo: headers, not hearers
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
        return next(new AppError("You are not logged in! Please log in to get access", 401));
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
        return next(new AppError("The user belonging to this token no longer exists.", 401));
    }

    req.user = currentUser;
    next();
});

module.exports = isAuthenticated;