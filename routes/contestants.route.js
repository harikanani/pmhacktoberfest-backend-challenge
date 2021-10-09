const express = require("express");
const { v4: uuidv4 } = require("uuid");
const contestants = require("../services/contestants");
const router = new express.Router();

router.get("/", async (req, res, next) => {
	let options = {};

	try {
		const result = await contestants.getContestants(options);
		res.status(result.status || 200).send(result.data);
	} catch (err) {
		console.log(err);
		res.status(500).send({
			error: err || "Something went wrong.",
		});
		return;
	}
});

router.post("/", async (req, res, next) => {
	let { name, costumeTitle, costumeImgUrl, city, country } = req.body;
	if (!name || !costumeImgUrl || !costumeTitle || !city || !country) {
		return res.status(400).json({
			status: "error",
			message: "Must provide all data",
		});
	}
	let options = {
		name,
		costumeTitle,
		costumeImgUrl,
		city,
		country,
		status: "",
	};
	options.createContestantInlineReqJson = req.body;
	try {
		const result = await contestants.createContestant(options);
		console.log("result: ", result);
		res.status(result?.status || 200).send(result.data);
	} catch (err) {
		console.log("err: ", err);
		return res.status(500).send({
			error: err || "Something went wrong.",
		});
	}
});

router.get("/:id", async (req, res, next) => {
	let options = {
		id: req.params.id,
	};

	try {
		const result = await contestants.getContestant(options);
		res.status(result.status || 200).send(result.data);
	} catch (err) {
		return res.status(500).send({
			error: err || "Something went wrong.",
		});
	}
});

router.delete("/:id", async (req, res, next) => {
	let options = {
		id: req.params.id,
	};

	try {
		const result = await contestants.deleteContestant(options);
		res.status(result.status || 200).send(result.data);
	} catch (err) {
		return res.status(500).send({
			error: err || "Something went wrong.",
		});
	}
});

router.patch("/:id", async (req, res, next) => {
	let options = {
		id: req.params.id,
		name: req.body.name,
	};

	try {
		const result = await contestants.updateContestant(options);
		res.status(result.status || 200).send(result.data);
	} catch (err) {
		return res.status(500).send({
			error: err || "Something went wrong.",
		});
	}
});

router.patch("/:id/upvote", async (req, res, next) => {
	let options = {
		id: req.params.id,
	};

	try {
		const result = await contestants.upvoteContestant(options);
		res.status(result.status || 200).send(result.data);
	} catch (err) {
		console.log("err: ", err);
		return res.status(500).send({
			error: err || "Something went wrong.",
		});
	}
});

module.exports = router;
