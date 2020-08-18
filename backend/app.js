const express = require("express");
const app = express();
const moment = require("moment");
const fs = require("fs");
const port = 8888;
const { setHeaders } = require("./middleware");
const mailer = require("./mailer");
const action = require("./action");
// 邮件模板
const wegoApplication = require("./mailer/template/wegoApplication");
const wegoSuccess = require("./mailer/template/wegoSuccess");
const wegoFailed = require("./mailer/template/wegoFailed");

const isUndef = (v) => {
	return v === undefined || v === null;
};
app.set("env", "production");

// 请求体编译
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// parse application/json
app.use(express.json());

// 设置响应头
app.use(setHeaders);

/**
 * 获取学院专业信息
 */
app.get("/wego/get-schoollist", (req, res) => {
	try {
		const data = JSON.parse(fs.readFileSync("./public/schoollist.json"));
		res.status(200).json(data);
	} catch (e) {
		res.status(500).end();
	}
});

/**
 * 申请社团接口
 */
app.post("/wego/apply", async (req, res) => {
	// 必选参数检验
	const necessaryParams = [
		"name",
		"school",
		"majority",
		"student_num",
		"email",
		"qq"
	];
	// 判断参数合法标记
	const flag = true;
	necessaryParams.map((key) => {
		const params = req.body[key];
		if (isUndef(params)) {
			flag = true;
		}
	});
	if (!flag) {
		res.status(400).json({
			code: 1,
			message: "参数错误"
		});
		return;
	}

	// 进行业务处理
	try {
		req.body.time = moment().format("YYYY-MM-DD HH:mm:ss");
		const mayInfo = await action.query(req.body);
		if (mayInfo.length) {
			res.status(200).json({
				code: 2,
				message: "该学号已申请，请勿重复申请"
			});
			return;
		}
		const info = await action.create(req.body);
		mailer.broadcast(
			{
				title: "Wego社团申请邮件",
				info,
				detailURL: "#"
			},
			wegoApplication
		);
		res.status(200).json({
			code: 0,
			message: "提交成功"
		});
	} catch (e) {
		console.log(e)
		res.status(500).json(e);
	}
});

/**
 * 申请处理
 * @param { boolean } stauts    申请结果
 * @param { string } student_num    学号
 * @param { string } password   密码
 */
app.post("/wego/handle", async (req, res) => {
	// 必选参数检验
	const necessaryParams = [status, student_num, password];
	const flag = true;
	necessaryParams.map((key) => {
		const params = req.body[key];
		if (isUndef(params)) {
			flag = true;
		}
	});
	if (!flag) {
		res.status(400).json({
			code: 1,
			message: "参数错误"
		});
		return;
	}
    const { student_num, password } = req.body;
    
	// 固定密码
	if (password !== "wego2020") {
		res.status(200).json({
			code: 2,
			message: "密码错误"
		});
	}

	// 进行业务处理
	try {
		const mayInfo = await action.query(req.body);
		if (!mayInfo.length) {
			res.status(200).json({
				code: 3,
				message: "该申请记录不存在"
			});
		}
		await action.update(req.body);

		// 发送给申请人邮件
		mailer.send(
			{
				title: "Wego社团申请结果",
				to: {
					name: mayInfo[0].name,
					address: mayInfo[0].email
				},
				detailURL: "#"
			},
			req.body.status ? wegoSuccess : wegoFailed
		);
		res.status(200).json({
			code: 0,
			message: "提交成功"
		});
	} catch (e) {
		res.status(500).json(e);
	}
});
app.listen(port, () => console.log(`Example APP listening on port ${port}!`));
