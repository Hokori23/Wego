const xss = require("xss");
/**
 * 参数xss过滤
 * @param { Object } obj req.body | req.query
 */
const xssParamsFilter = (obj) => {
	Object.keys(obj).forEach((key) => {
		obj[key] = xss(obj[key]);
	});
};
module.exports = {
	xssParamsFilter
};
