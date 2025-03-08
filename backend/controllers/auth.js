const User = require("../models/users");
const bcrypt = require("bcrypt");

//Register new user.
const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const profilePic = req.file ? req.file.path : null; //Image path

    //Check if fields exist:
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        message:
          "All fields are required: firstName, lastName, email, and password.",
      });
    }

    //Validate email format.
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format." });
    }

    //Validate password strength.
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character.",
      });
    }

    //Check if user exists.
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User already exists with this email." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Register a new user
    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
      profilePic,
    });

    const savedUser = await newUser.save();
    res.status(201).json({
      message: "User registered successfully.",
    });
  } catch (error) {
    console.error("Error registering user.:", error);
    res
      .status(500)
      .json({ message: "Something went wrong!", error: error.message });
  }
};

//Login registered user.
const loginUser = async (req, res) => {
  try {
    // Check if user is already logged in
    if (req.cookies.blogSession) {
      return res
        .status(400)
        .json({
          message: "You are currently logged in, please logout to proceed.",
        });
    }
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    //Find user in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    //Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    //Set session cookie
    res.cookie("blogSession", user._id.toString(), {
      httpOnly: true,
      secure: true, // Ensure HTTPS is used in production
      sameSite: "Strict", // CSRF protection
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    res.status(200).json({ message: "Login successful." });
  } catch (error) {
    console.error("Error logging in:", error);
    res
      .status(500)
      .json({ message: "Something went wrong!", error: error.message });
  }
};

module.exports = { registerUser, loginUser };
