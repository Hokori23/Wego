import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";

import { Home as HOME } from "../components";
import api from "../api";

// import "../style/Home.scss";

const useStyles = makeStyles((theme) => ({
	container: {
		display: "flex",
		flexDirection: "column",
		boxSizing: 'border-box',
		paddingTop: "10%",
		// justifyContent: "center",
		alignItems: "center",
		height: "100%"
	},
	content: {
		minHeight: 500,
		"&__row": {
			display: "flex"
		}
	},
	textField: {
		marginBottom: theme.spacing(1)
	}
}));

// 解构component
const { SchoolList, MajorList, TextField } = HOME;

export default function Home() {
	/**
	 * Style
	 */
	const classes = useStyles();

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
		qq_error: false
	});
	// error 解构
	const {
		name_error,
		school_error,
		major_error,
		student_num_error,
		email_error,
		qq_error
	} = error;

	/**
	 * 用来遍历DOM的数组
	 */
	const textFieldList = [
		// {
		// 	label: "姓名*",
		// 	value: name,
		// 	name: "name",
		// 	isError: { name_error }
		// },
		{
			label: "学号*",
			value: student_num,
			name: "student_num",
			isError: { student_num_error }
		},
		{
			label: "邮箱*",
			value: email,
			name: "email",
			isError: { email_error }
		},
		{
			label: "QQ*",
			value: qq,
			name: "qq",
			isError: { qq_error }
		},
		{
			label: "简介",
			value: bio,
			name: "bio",
			multiline: true
		},
		{
			label: "个人网站",
			value: site,
			name: "site"
		}
	].map((item) => {
		const { label, name, value, multiline, isError } = item;
		return (
			<div className="Home__content__row" key={name}>
				<TextField
					label={label}
					name={name}
					value={value}
					isError={isError}
					multiline={multiline}
					className={classes.textField}
					onTextFieldChange={handleTextFieldChange}
				></TextField>
			</div>
		);
	});

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
		isRequired &&
			setError((state) => ({
				...state,
				[`${name}_error`]: !val
			}));
		setNewApply((state) => ({
			...state,
			[name]: val
		}));
	}
	async function getData() {
		console.log("getData");
		try {
			const { code, data } = await api.getSchoolList();
			if (code) {
				return;
			}
			data && setSchoolAndMajorList(data);
		} catch (e) {}
	}

	/**
	 * Hook
	 */
	useEffect(() => {
		// 初始化列表
		getData();
	}, []);

	return (
		<div className={classes.container}>
			<div className={classes.content}>
				<div className="Home__content__row">
					<TextField
						label="姓名*"
						value={name}
						name="name"
						isError={name_error}
						className={classes.textField}
						onTextFieldChange={handleTextFieldChange}
					/>
				</div>
				<div className="Home__content__row">
					<SchoolList
						data={schoolAndMajorList}
						school={school}
						onSchoolChange={handleSchoolChange}
						isError={school_error}
					/>
				</div>
				<div className="Home__content__row">
					<MajorList
						data={schoolAndMajorList}
						school={school}
						major={major}
						onMajorChange={handleMajorChange}
						isError={major_error}
					/>
				</div>
				{textFieldList}
			</div>
		</div>
	);
}
