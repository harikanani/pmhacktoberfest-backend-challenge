module.exports = function (app) {
	/*
	 * Routes
	 */
	app.get("/", (req, res) => res.status(200).json({ status: "success" }));
	app.use("/contestants", require("./routes/contestants.route"));
	app.use("/root", require("./routes/root.route"));
};
