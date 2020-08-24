import api from "../api";

import React, { Component } from "react";
import { ApplicationItem } from "../components";
class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			applicationList: []
		};
	}
	async componentDidMount() {
		try {
			const { code, data } = await api.getApplicationList();
			if (data.data) {
				this.setState({ applicationList: data });
			}
		} catch (e) {
			console.log(e);
		}
	}
	render() {
		return (
			<div>
				{this.state.applicationList.map((item) => (
					<ul>
						<ApplicationItem applicationList={this.state.applicationList} />
					</ul>
				))}
			</div>
		);
	}
}
export default Home;
