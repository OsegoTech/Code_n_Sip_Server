import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import crypto from "crypto";

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
    emailConfirmationToken: String,
      emailConfirmed: {
        type: Boolean,
          default: false
      },
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

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')){
        return next();
    }

    const salt = await bcrypt.getSalt(10)
    this.password = await bcrypt.hash(this.password, salt)

//     set passwordChangedAt to current time
    this.passwordChangedAt = new Date(); - 1000
    next()
})

UserSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

UserSchema.methods.changedPasswordAfter = function (JWTTimestamp){
    if (this.passwordChangedAt){
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10)
        return JWTTimestamp < changedTimestamp
    }
    return false
}

UserSchema.methods.createPasswordResetToken = function(){
    const resetToken = crypto.randomBytes(32).toString("hex")
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000 //10 mins
    return resetToken
}

UserSchema.methods.createEmailConfirmationToken =  function () {
    const confirmationToken = crypto.randomBytes(32).toString("hex")
    this.emailConfirmationToken = crypto.createHash('sha256').update(confirmationToken).digest('hex')
    return confirmationToken
}

const User = mongoose.model("User", UserSchema);
export default User;
