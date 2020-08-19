// Dependencies
const express = require("express");
const moment = require("moment");
const fs = require("fs");

// 模块
const mailer = require("./mailer");
const action = require("./action");

// 中间件
const { setHeaders, xssFilter } = require("./middleware");

// 邮件模板
const wegoApplication = require("./mailer/template/wegoApplication");
const wegoSuccess = require("./mailer/template/wegoSuccess");
const wegoFailed = require("./mailer/template/wegoFailed");

const app = express();
const port = 8002;

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
// xss攻击过滤
app.use(xssFilter);

/**
 * 获取学院专业信息
 */
app.get("/wego/get-schoollist", (req, res) => {
	try {
		const data = JSON.parse(fs.readFileSync("./static/schoollist.json"));
		res.status(200).json(data);
	} catch (e) {
		res.status(500).end();
	}
});

/**
 * 申请社团
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
	let flag = true;
	necessaryParams.forEach((key) => {
		const params = req.body[key];
		if (isUndef(params)) {
			flag = false;
		}
	});
	// 参数类型检测
	Object.keys(req.body).forEach((key) => {
		if (typeof req.body[key] !== "string") {
			flag = false;
		}
	});
	if (!flag) {
		res.status(200).json({
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
				title: "天津工业大学Wego社团申请邮件",
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
		console.log(e);
		res.status(500).json(e);
	}
});

/**
 * 申请处理
 * @param { number } status    申请结果	0:未处理；1:已通过；2:未通过
 * @param { string } student_num    学号
 * @param { string } password   密码
 */
app.post("/wego/handle", async (req, res) => {
	// 必选参数检验和参数类型检测
	const necessaryParams = {
		status: "number",
		student_num: "string",
		password: "string"
	};

	// 判断参数合法标记
	let flag = true;

	Object.keys(necessaryParams).forEach((key) => {
		if (
			isUndef(req.body[key]) ||
			typeof req.body[key] !== necessaryParams[key]
		) {
			flag = false;
		}
	});

	if (!flag) {
		res.status(200).json({
			code: 1,
			message: "参数错误"
		});
		return;
	}
	const { status, password } = req.body;

	// 固定密码
	if (password !== "wego2020") {
		res.status(200).json({
			code: 2,
			message: "密码错误"
		});
		return;
	}

	// 进行业务处理
	try {
		const mayInfo = await action.query(req.body);
		if (!mayInfo.length) {
			res.status(200).json({
				code: 3,
				message: "该申请记录不存在"
			});
			return;
		}

		if (mayInfo[0].status !== 0) {
			if (status === 0) {
				res.status(200).json({
					code: 4,
					message: "该申请记录未审批，请检查传入status"
				});
			}
			res.status(200).json({
				code: 5,
				message: "该申请记录已审批，请勿重复操作"
			});
			return;
		}

		await action.update(req.body);

		// 发送给申请人邮件
		if (status !== 0) {
			mailer.send(
				{
					title: "天津工业大学Wego社团申请结果反馈",
					name: mayInfo[0].name
				},
				{
					to: {
						name: mayInfo[0].name,
						address: mayInfo[0].email
					}
				},
				status === 1 ? wegoSuccess : wegoFailed,
				0
			);
		}

		res.status(200).json({
			code: 0,
			message: "处理成功"
		});
	} catch (e) {
		console.log(e);
		res.status(500).json(e);
	}
});

/**
 * 获取申请列表
 */
app.get("/wego/get-applicationlist", async (req, res) => {
	const result = await action.queryAll();
	if (!result.length) {
		res.status(200).json({
			code: 0,
			message: "暂无申请"
		});
		return;
	}
	result.forEach((v) => {
		v.submit_at = moment(v.submit_at).fromNow();
		return v;
	});
	res.status(200).json({
		code: 0,
		data: result,
		message: "查询成功"
	});
});

app.listen(port, () => console.log(`Example APP listening on port ${port}!`));
