import mongoose from "mongoose";
import validator from "validator";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      lowercase: true,
    },
    firstName: {
      type: String,
      required: [true, "First name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    isAdmin: {
      type: String,
      default: false,
    },
    profilePic: {
      type: String,
      required: [true, "Profile Picture is required"],
    },
    role: {
      type: String,
      required: [true, "User role is required"],
      default: "user",
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 8,
      select: false,
    },
    confirmPassword: {
      type: String,
      required: [true, "Please confirm your password"],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "Passwords did not match!",
      },
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
        type: Boolean,
        default: true,
        select: false
    }
  },
  {
    timestamps: true,
    toJSON: true,
    toObject: true,
  }
);

const User = mongoose.model("User", UserSchema);
export default User;
