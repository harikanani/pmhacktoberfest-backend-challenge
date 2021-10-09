const mongoose = require("mongoose");

const ContestantModelSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		costumeTitle: {
			type: String,
			required: true,
		},
		costumeImgUrl: {
			type: String,
			required: true,
		},
		city: {
			type: String,
			required: true,
		},
		country: {
			type: String,
			required: true,
		},
		votes: {
			type: Number,
			required: true,
			default: 0,
		},
	},
	{ timestamps: true },
);

module.exports = mongoose.model("Contestant", ContestantModelSchema);
