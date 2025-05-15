import mongoose from "mongoose";
const Schema = mongoose.Schema;

const TodoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(`Todos`, TodoSchema);
