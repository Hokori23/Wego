import React from "react";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

export default function SchoolList(props) {
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
	// 解构props
	const { error, className, school } = props;
	
	return (
		<FormControl error={error} className={className}>
			<InputLabel id="selector__school">学院*</InputLabel>
			<Select
				value={school}
				labelId="selector__school"
				onChange={handleSchoolChange}
			>
				{schoolList || (
					<MenuItem value="">
						<em>暂无数据</em>
					</MenuItem>
				)}
			</Select>
			{error && <FormHelperText>请选择学院</FormHelperText>}
		</FormControl>
	);
}