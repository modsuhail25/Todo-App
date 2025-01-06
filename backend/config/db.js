import mongoose from "mongoose";

const connectDb = async () => {
  const conn = await mongoose.connect(process.env.MONG0_URL);

  console.log(`MongoDb Connected : ${conn.connection.host}`);
};

export default connectDb;
