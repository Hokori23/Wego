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

export default function SchoolList(props) {
	const classes = useStyles();
	function handleSchoolChange(e) {
		props.onSchoolChange(e.target.value);
	}

	/**
	 * Paint
	 */
	const schoolList = [
		<MenuItem value="" key="请选择学院">
			<em>请选择学院</em>
		</MenuItem>
	].concat(
		...props.data.map((val) => (
			<MenuItem value={val.school} key={val.school}>
				{val.school}
			</MenuItem>
		))
	);
	return (
		<FormControl error={props.isError} className={classes.formControl}>
			<InputLabel id="selector__school">学院*</InputLabel>
			<Select
				value={props.school}
				labelId="selector__school"
				onChange={handleSchoolChange}
			>
				{schoolList || (
					<MenuItem value="">
						<em>暂无数据</em>
					</MenuItem>
				)}
			</Select>
			{props.isError && <FormHelperText>请选择学院</FormHelperText>}
		</FormControl>
	);
}