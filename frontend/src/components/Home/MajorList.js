import React from "react";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	formControl: {
		marginBottom: theme.spacing(1),
		width: 200
	},
}));

export default function MajorList(props) {
	const classes = useStyles();
	function handleMajorChange(e) {
		props.onMajorChange(e.target.value);
	}

    /**
     * Paint
     */
	const { school, data } = props;
	let majorList;
	for (let i = 0; i < data.length; i++) {
		if (data[i]["school"] === school) {
			majorList = [
				<MenuItem value="" key="请选择专业">
					<em>请选择专业</em>
				</MenuItem>
			].concat(
				...data[i]["major"].map((val) => (
					<MenuItem value={val} key={val}>
						{val}
					</MenuItem>
				))
			);
			break;
		}
	}
	return (
		<FormControl error={props.isError} className={classes.formControl}>
			<InputLabel id="selector__major">专业*</InputLabel>
			<Select
				value={props.major}
				labelId="selector__major"
				onChange={handleMajorChange}
				disabled={!props.school}
			>
				{majorList || null}
			</Select>
			{props.isError && <FormHelperText>请选择专业</FormHelperText>}
		</FormControl>
	);
}
