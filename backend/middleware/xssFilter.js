const { xssParamsFilter } = require("../func");
const xssFilter = (req, res, next) => {
	const method = req.method;
	const queryMethods = ["GET", "DELETE"];
	const bodyMethods = ["POST", "PUT"];

	if (bodyMethods.indexOf(method) !== -1) {
		xssParamsFilter(req.body);
		next();
		return;
	}
	if (queryMethods.indexOf(method) !== -1) {
		xssParamsFilter(req.query);
		next();
		return;
	}
	// 其他请求方法
	xssParamsFilter(req.query);
	xssParamsFilter(req.body);
	next();
};

module.exports = xssFilter;
