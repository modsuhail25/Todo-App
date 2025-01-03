import mongoose from "mongoose";

const connectDb = async () => {
  const conn = await mongoose.connect(
    "mongodb+srv://modsuhail25:12345@cluster0.ldjcg.mongodb.net/"
  );

  console.log(`MongoDb Connected : ${conn.connection.host}`);
};

export default connectDb;
