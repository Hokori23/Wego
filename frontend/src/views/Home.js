import React, { useState, useEffect, Fragment } from "react";

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from "@material-ui/core/Paper";
import { Portal } from "@material-ui/core";

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from '@material-ui/core/styles';

import { Home as HOME } from "../components";
import api from "../api";
import func from "../func";





// 解构component
const { SchoolList, MajorList, TextField, Snackbar } = HOME;

export default function Home() {
	/**
	 * Style
	 */
	const isSmallSize = useMediaQuery(useTheme().breakpoints.down('sm'));
	const classes = makeStyles((theme) => ({
		container: {
			position: isSmallSize ? "static" : "absolute",
			top:'50%',
			left:'50%',
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			width: isSmallSize ? '100%' : '80%',
			height: isSmallSize ? "100%" : "auto",
			padding: isSmallSize ? "10% 0" : "5% 0",
			margin: 0,
			transform: isSmallSize ? 'none' : 'translate(-50%, -52%)',
			boxSizing: 'border-box',
			overflow: "auto",
			"& > .Home__content": {
				width: "100%",
				"& > .Home__content__body": {
					display: isSmallSize ? "block" : "flex",
					flexDirection: isSmallSize ? "column" : "row",
					justifyContent: isSmallSize ? "normal" : "center",
					marginTop: isSmallSize ? 0 : "30px",
					"& > .Home__content__left, & > .Home__content__right": {
						margin: isSmallSize ? 0 : "0 10%"
					},
					"& > .Home__content__right": {
						display: isSmallSize ? "block" : "flex",
						flexDirection: isSmallSize ? "row" : "column",
						justifyContent: isSmallSize ? "normal" : "center"
					},
					"& .Home__content__row": {
						display: "flex",
						justifyContent: "center"
					}
				},
			},
			"& > .Home__footer" : {
				marginTop: '5%',
				backgroundColor: '#ffffff'
			},
		},
		textField: {
			marginBottom: theme.spacing(isSmallSize ? 1.5 : 3),
			width: isSmallSize ? "60%" : 220,
		}
	}))();





	/**
	 * State
	 */
	const [schoolAndMajorList, setSchoolAndMajorList] = useState([]);

	/** newApply */
	const [newApply, setNewApply] = useState({
		name: "",
		school: "",
		major: "",
		student_num: "",
		email: "",
		qq: "",
		site: "",
		bio: ""
	});
	// newApply 解构
	const { name, school, major, student_num, email, qq, site, bio } = newApply;

	/** error */
	const [error, setError] = useState({
		name_error: false,
		school_error: false,
		major_error: false,
		student_num_error: false,
		email_error: false,
		qq_error: false,
		name_errno: 0,
		student_num_errno: 0,
		email_errno: 0,
		qq_errno: 0,
	});
	// error 解构
	const {
		name_error,
		school_error,
		major_error,
		student_num_error,
		email_error,
		qq_error,
		name_errno,
		student_num_errno,
		email_errno,
		qq_errno,
	} = error;

	/** snackBar */
	const [snackBar, setSnackBar] = useState({
		code: 0,
		message: '',
		open: false,
	})






	/**
	 * 用来遍历DOM的数组
	 */
	const textFieldList = [
		{
			label: "姓名*",
			value: name,
			name: "name",
			error: name_error,
			errno: name_errno
		},
		{
			label: "学号*",
			value: student_num,
			name: "student_num",
			error: student_num_error,
			errno: student_num_errno
		},
		{
			label: "邮箱*",
			value: email,
			name: "email",
			error: email_error,
			errno: email_errno
		},
		{
			label: "QQ*",
			value: qq,
			name: "qq",
			error: qq_error,
			errno: qq_errno
		},
		{
			label: "简介",
			value: bio,
			name: "bio",
			multiline: true
		},
		{
			label: "个人博客 or 网站",
			value: site,
			name: "site"
		}
	].map((item, index) => {
		const { label, name, value, multiline, error, errno } = item;
		let node = index === 1 ? (
		<Fragment key={name}>
			<div className="Home__content__row">
				<SchoolList
					data={schoolAndMajorList}
					school={school}
					onSchoolChange={handleSchoolChange}
					error={school_error}
					className={classes.textField}
				/>
			</div>
			<div className="Home__content__row">
				<MajorList
					data={schoolAndMajorList}
					school={school}
					major={major}
					onMajorChange={handleMajorChange}
					error={major_error}
					className={classes.textField}
				/>
			</div>
			<div className="Home__content__row">
				<TextField
					label={label}
					name={name}
					value={value}
					error={error}
					errno={errno}
					multiline={multiline}
					onTextFieldChange={handleTextFieldChange}
					onTextFieldBlur={handleTextFieldValidate}
				></TextField>
			</div>
		</Fragment>
		) :
		(
			<div className="Home__content__row" key={name}>
				<TextField
					label={label}
					name={name}
					value={value}
					error={error}
					errno={errno}
					multiline={multiline}
					onTextFieldChange={handleTextFieldChange}
					onTextFieldBlur={handleTextFieldValidate}
				></TextField>
			</div>
		);
		return node;
	});

	const contentRight = textFieldList.splice(4)
	const contentLeft = textFieldList






	/**
	 * Function
	 */
	function handleSchoolChange(val) {
		setError((state) => ({
			...state,
			school_error: !val
		}));
		setNewApply((state) => ({
			...state,
			school: val,
			// 重置major字段
			major: ""
		}));
	}
	function handleMajorChange(val) {
		setError((state) => ({
			...state,
			major_error: !val
		}));
		setNewApply((state) => ({
			...state,
			major: val
		}));
	}
	function handleTextFieldChange(val, name, isRequired) {
		isRequired && setError((state) => ({
			...state,
			[`${name}_error`]: !val
		}));
		
		setNewApply((state) => ({
			...state,
			[name]: val
		}));
	}
	function handleTextFieldValidate(val, name, isRequired) {
		const REG_RULES = {
			name: /^[\u4e00-\u9fa5]{2,10}$/,
			student_num: /^\d{10}$/,
			qq: /^\d{5,}$/,
			email: /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/,
		}
		// 检查必填字段是否为空
		let error = isRequired ? !val : false;
		// 已填字段是否通过验证规则
		const errno = val && func.isDef(REG_RULES[name]) && !REG_RULES[name].test(val) ? 1 : 0;
		error = errno === 1 ? true : error;
		setError((state) => ({
			...state,
			[`${name}_errno`]: errno,
			[`${name}_error`]: error
		}));
	}
	function isValid() {
		let flag = true;
		// 检查必填字段是否为空
		for(let i in newApply) {
			const errorState = error[`${i}_error`];
			if (!newApply[i] && func.isDef(errorState)) {
				flag = false;
				setError((state)=> ({
					...state,
					[`${i}_error`]: true
				}))
			}
		}
		!flag && setSnackBar((state) => ({
			code: 1,
			message: '请正确填写表单必填字段',
			open: true
		}))
		return flag;
	}
	function handleSnackBarClose() {
		setSnackBar((state)=>({
			...state,
			open: false,
		}))
	}
	async function handleApply() {
		if (!isValid())  return;
		try {
			const payload = JSON.parse(JSON.stringify(newApply));
			payload.site = `https://${payload.site}/`;
			const { code, message } = await api.apply(payload);
			const newSnackBar = {
				open: true,
				message: message
			}
			code ? newSnackBar.code = 1 : newSnackBar.code = 0;
			setSnackBar(()=>newSnackBar);
		} catch (e) {
			setSnackBar(()=>({
				code: 2,
				open: true,
				message: e.message
			}))
		}
	}
	async function getData() {
		try {
			const { code, data } = await api.getSchoolList();
			if (code) {
				return;
			}
			data && setSchoolAndMajorList(data);
		} catch (e) {
			setSnackBar(()=>({
				code: 2,
				open: true,
				message: e.message
			}))
		}
	}






	/**
	 * Hook
	 */
	useEffect(() => {
		// 初始化列表
		getData();
	}, []);

	return (
		<Paper className={classes.container} elevation={9}>
			<div className="Home__content">
				<Typography variant={isSmallSize ? "subtitle1" : "h6"} component="header" color="primary" gutterBottom style={
					{
						userSelect: 'none',
						textAlign: 'center'
					}
				}>
					Wego 前端社团申请
				</Typography>
				<Typography variant={"caption"} component="div" color="textPrimary" style={
					{
						userSelect: 'none',
						textAlign: 'center'
					}
				}>
					在这下面提交你的申请哦
				</Typography>
				<div className="Home__content__body">
					<div className="Home__content__left">
						{contentLeft}
					</div>
					<div className="Home__content__right">
						{contentRight}
					</div>
				</div>
			</div>
			<div className="Home__footer">
				<Button variant="outlined" color="primary" onClick={handleApply}>提交申请</Button>
			</div>
			<Portal>
				<Snackbar
					code={snackBar.code}
					message={snackBar.message}
					open={snackBar.open}
					handleClose={handleSnackBarClose}
				></Snackbar>
			</Portal>
		</Paper>
	);
}
