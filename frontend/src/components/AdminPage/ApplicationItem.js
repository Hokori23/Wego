import React, { Component } from "react";
class ApplicationItem extends Component {
	renderList(application) {
		const arr = [];
		for (let i in application) {
			arr.push(application[i]);
		}
		return arr.map((attr) => {
			return <li>{attr}</li>;
		});
	}
	render() {
		return <ul>{this.renderList(this.props.application)}</ul>;
	}
}
export default ApplicationItem;
