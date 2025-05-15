import mongoose from "mongoose";
const Schema = mongoose.Schema;
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return;
  const hashPassword = await bcrypt.hash(user.password, 10);
  user.password = hashPassword;
  next();
})


export default mongoose.model(`Users`, userSchema);
