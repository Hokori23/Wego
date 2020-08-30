import React from "react";

import TextField from "@material-ui/core/TextField";
import InputAdornment from '@material-ui/core/InputAdornment';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from '@material-ui/core/styles';


export default function CustomTextField(props) {
	const isSmallSize = useMediaQuery(useTheme().breakpoints.down('sm'));

    const { label, value, name, multiline, error, errno } = props;

	const useStyles = makeStyles((theme) => ({
		formControl: {
			marginBottom: theme.spacing(isSmallSize ? 1.5 : 3),
			width: isSmallSize
			? "60%"
			:
			(name === "site" || name === "bio")
			? 400
			: 220,
		}
	}));
    const classes = useStyles();

	const placeholderText = {
		// site: 'http(s)://',
		email: 'Example@site.com',
		bio: '简单介绍下你自己就好啦'
	}
	
	const isRequired = /\*$/.test(label);
	const helperText = isRequired ? label.slice(0, label.length - 1) : label;
	const formHelperText = {
		0: `请输入${helperText}`,
		1: `${helperText}格式错误，请检查`
	}

	
	
	function handleTextFieldChange(e) {
		props.onTextFieldChange(e.target.value, name, isRequired);
	}

	function handleTextFieldBlur(e) {
		props.onTextFieldBlur(e.target.value, name, isRequired);
	}

	return (
		<TextField
			label={label}
			value={value}
			onChange={handleTextFieldChange}
			onBlur={handleTextFieldBlur}
            multiline={multiline}
			rows={isSmallSize ? 3 : 5}
			error={error}
			className={classes.formControl}
			helperText={error ? formHelperText[errno] : ``}
			placeholder={name !== 'site' ? placeholderText[name] : ''}
			InputProps={name === 'site' ? {
			  startAdornment: <InputAdornment position="start">http(s)://</InputAdornment>,
			} : null}
		></TextField>
	);
}
