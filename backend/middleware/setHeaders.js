const setHeaders = (req, res, next) => {
	res.set({
		"Cache-Control": "no-cache",
		Connection: "keep-alive",
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "*",
		"Access-Control-Allow-Headers": "*"
	});
	if (req.method === "OPTIONS") {
		res.status(200).end(); // 让options预请求快速结束
	} else {
		next();
	}
};

module.exports = setHeaders;
