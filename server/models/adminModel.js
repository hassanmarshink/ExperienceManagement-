import mongoose from "mongoose";
// import bcrypt from "bcrypt"; // For password hashing

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, // Remove leading/trailing whitespace
  },
  email: {
    type: String,
    required: true,
    trim: true, // Remove leading/trailing whitespace
  },
  password: {
    type: String,
    required: true,
    // minlength: 6, // Minimum password length for security
  },
});

// Hash password before saving the user
// userSchema.pre("save", async function (next) {
//   if (this.isModified("password")) {
//     const salt = await bcrypt.genSalt(10); // Generate a salt for hashing
//     this.password = await bcrypt.hash(this.password, salt); // Hash the password
//   }
//   next(); // Proceed with saving the user
// });

const User = mongoose.model("User", userSchema);

export default User;
