require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = () => {
	// connect with DB
	console.log(process.env.MONGO_CONNECTION_URL);
	mongoose.connect(
		process.env.MONGO_CONNECTION_URL ||
			"mongodb://localhost/pmhacktoberfest",
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		},
	);

	const connection = mongoose.connection;

	connection.once("open", () => {
		console.log("Connected");
	});
	// .catch((err) => {
	// 	console.log("Connection Failed");
	// });
};

module.exports = connectDB;
