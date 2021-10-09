var Contestant = require("../models/contestants.model");
module.exports = {
	/**
  *


  */
	getContestants: async (options) => {
		// Implement your business logic here...
		return await Contestant.find({}).then((contestants) => {
			console.log("contestants1: ", contestants);
			if (!contestants) {
				return {
					status: 500,
					data: {
						status: "error",
						message: "database error",
					},
				};
			} else {
				return {
					status: 200,
					data: contestants.map((contestant) => {
						return {
							id: contestant._id,
							name: contestant.name,
							costumeTitle: contestant.costumeTitle,
							costumeImgUrl: contestant.costumeImgUrl,
							city: contestant.city,
							country: contestant.country,
							votes: contestant.votes,
						};
					}),
				};
			}
		});
	},

	/**
  *

  * @param options.createContestantInlineReqJson.city required
  * @param options.createContestantInlineReqJson.costumeImgUrl required
  * @param options.createContestantInlineReqJson.costumeTitle required
  * @param options.createContestantInlineReqJson.country required
  * @param options.createContestantInlineReqJson.name required

  */
	createContestant: async (options) => {
		// Implement your business logic here...
		let contestant = new Contestant({
			name: options.name,
			costumeTitle: options.costumeTitle,
			costumeImgUrl: options.costumeImgUrl,
			city: options.city,
			country: options.country,
		});
		console.log(contestant);
		return await contestant.save().then((data) => {
			if (data === null || data === undefined) {
				return {
					status: "500",
					data: {
						status: "error",
						message: "database error",
					},
				};
			} else {
				return {
					status: "201",
					data: {
						id: data._id,
						status: "success",
					},
				};
			}
		});
	},

	/**
  *
  * @param options.id The id of a contestant

  */
	getContestant: async (options) => {
		// Implement your business logic here...
		return await Contestant.findOne({ _id: options.id }).then(
			(contestant) => {
				if (!contestant) {
					return {
						status: 404,
						data: {
							status: "error",
						},
					};
				} else {
					return {
						status: 200,
						data: {
							city: contestant.city,
							costumeImgUrl: contestant.costumeImgUrl,
							costumeTitle: contestant.costumeTitle,
							country: contestant.country,
							id: contestant._id,
							name: contestant.name,
							votes: contestant.votes,
						},
					};
				}
			},
		);
	},

	/**
  *
  * @param options.id The id of a contestant

  */
	deleteContestant: async (options) => {
		// Implement your business logic here...
		return await Contestant.findOneAndDelete({ _id: options.id }).then(
			(deletedContestant) => {
				if (!deletedContestant) {
					return {
						status: 404,
						data: {
							status: "error",
							message: "Contestant not found",
						},
					};
				}
				return {
					status: 200,
					data: {
						status: "ok",
					},
				};
			},
		);
	},

	/**
  *
  * @param options.id the id of a contestant

  */
	updateContestant: async (options) => {
		// Implement your business logic here...
		console.log(options);
		return await Contestant.findOneAndUpdate(
			{ _id: options.id },
			{ name: options.name },
			{ new: true },
		).then((updatedContestant) => {
			console.log(updatedContestant);
			if (!updatedContestant) {
				return {
					status: 500,
					data: {
						status: "error",
						message: "database error",
					},
				};
			} else {
				return {
					status: 200,
					data: {
						status: "ok",
					},
				};
			}
		});
		//
		// Return all 2xx and 4xx as follows:
		//
		// return {
		//   status: 'statusCode',
		//   data: 'response'
		// }

		// If an error happens during your business logic implementation,
		// you can throw it as follows:
		//
		// throw new Error('<Error message>'); // this will result in a 500

		var data = {
				status: "<string>",
			},
			status = "200";

		return {
			status: status,
			data: data,
		};
	},

	/**
  *
  * @param options.id The id of a contestant

  */
	upvoteContestant: async (options) => {
		// Implement your business logic here...
		let votes;
		await Contestant.findOne({ _id: options.id }).then(async (data) => {
			votes = data.votes;
		});
		return await Contestant.findOneAndUpdate(
			{ _id: options.id },
			{
				votes: votes + 1,
			},
			{ new: true },
		).then((updatedContestant) => {
			if (!updatedContestant) {
				return {
					status: 500,
					data: {
						status: "error",
						message: "database error",
					},
				};
			} else {
				return {
					status: 200,
					data: {
						status: "ok",
						votes: updatedContestant.votes,
					},
				};
			}
		});
	},
};
