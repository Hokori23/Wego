import React from "react";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";


export default function MajorList(props) {
	function handleMajorChange(e) {
		props.onMajorChange(e.target.value);
	}

    /**
     * Paint
     */
	const { school, data, className, error, major } = props;
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
		<FormControl error={error} className={className}>
			<InputLabel id="selector__major">专业*</InputLabel>
			<Select
				value={major}
				labelId="selector__major"
				onChange={handleMajorChange}
				disabled={!school}
			>
				{majorList || null}
			</Select>
			{error && <FormHelperText>请选择专业</FormHelperText>}
		</FormControl>
	);
}
