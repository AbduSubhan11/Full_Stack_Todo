import mongoose from "mongoose";

const connections = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "Todos",
    });
    console.log("Connected to MongoDB");
  } catch (eror) {
    console.log(eror);
    process.exit(1);
  }
};
export default connections;
