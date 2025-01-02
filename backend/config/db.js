import mongoose from "mongoose";

const connectDb = async () => {
  const conn = await mongoose.connect(
    ""
  );

  console.log(`MongoDb Connected : ${conn.connection.host}`);
};

export default connectDb;
