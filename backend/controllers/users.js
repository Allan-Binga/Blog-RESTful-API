const User = require("../models/users");

//Fetch all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found." });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Error getting all users." });
  }
};

//Fetch single user
const getSingleUser = async (req, res) => {
  try {
    const name = req.params.name; // Get user ID from URL
    const [firstName, lastName] = name.split("-"); // Exclude password field

    if (!firstName || !lastName) {
      return res.status(400).json({ message: "Invalid name format." });
    }

    //Find user by firstName and lastName
    const user = await User.findOne({
      firstName: { $regex: new RegExp(`^${firstName}$`, "i") },
      lastName: { $regex: new RegExp(`^${lastName}$`, "i") },
    }).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error occurred while getting user." });
  }
};

//Update personal information
const updateInformation = async (req, res) => {
  try {
    const { name } = req.params;
    const [firstName, lastName] = name.split("-");

    // Fix: Ensure proper casing for consistency
    const formattedFirstName =
      firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
    const formattedLastName =
      lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase();

    const { newFirstName, newLastName } = req.body;
    const profilePic = req.file ? req.file.path : null;

    // Update user information directly with findOneAndUpdate
    const updatedUser = await User.findOneAndUpdate(
      {
        firstName: { $regex: `^${formattedFirstName}$`, $options: "i" },
        lastName: { $regex: `^${formattedLastName}$`, $options: "i" },
      },
      {
        firstName: newFirstName
          ? newFirstName.charAt(0).toUpperCase() +
            newFirstName.slice(1).toLowerCase()
          : formattedFirstName,
        lastName: newLastName
          ? newLastName.charAt(0).toUpperCase() +
            newLastName.slice(1).toLowerCase()
          : formattedLastName,
        profilePic: profilePic || undefined, // Only update if provided
      },
      { new: true, runValidators: true } // Return updated doc, run schema validators
    ).select("-password");

    // if (!updatedUser) {
    //   return res.status(404).json({ message: "User not found" });
    // }

    return res
      .status(200)
      .json({ message: "Information updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating profile:", error);
    return res
      .status(500)
      .json({ message: "Error updating profile", error: error.message });
  }
};
//---------TO BE FURTHER IMPLEMENTED------------\\

module.exports = { getUsers, getSingleUser, updateInformation };
