const mongooose = require("mongoose");

const connectDB = async () => {
  try {
    const connect = await mongooose.connect(process.env.MONGO_URI);
    console.log(
      `MongoDB Connected: ${connect.connection.host} and ${connect.connection.name}`
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;