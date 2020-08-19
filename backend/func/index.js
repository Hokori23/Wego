const xss = require("xss");
/**
 * 参数xss过滤
 * @param { Object } obj req.body | req.query
 */
const xssParamsFilter = (obj) => {
	Object.keys(obj).forEach((key) => {
		const paramType = typeof obj[key];
		if (paramType === "number") {
			obj[key] = Number(xss(obj[key]));
			return;
		}
		obj[key] = xss(obj[key]);
	});
};
module.exports = {
	xssParamsFilter
};
