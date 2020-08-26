import React from "react";

import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    formControl: {
        marginBottom: theme.spacing(1),
        width: 200,
    }
}));

export default function CustomTextField(props) {
    const classes = useStyles();

    let { label, value, name, multiline } = props;
    
	const isRequired = /\*$/.test(label);
	function handleTextFieldChange(e) {
		props.onTextFieldChange(e.target.value, name, isRequired);
	}
	return (
		<TextField
			label={label}
			value={value}
			onChange={handleTextFieldChange}
            multiline={multiline}
            rows={3}
			className={classes.formControl}
		></TextField>
	);
}
