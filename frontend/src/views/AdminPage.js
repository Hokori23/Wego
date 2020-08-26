import api from "../api";

import React, { Component } from "react";
import { AdminPage as ADMIN_PAGE } from "../components";
const { ApplicationItem } = ADMIN_PAGE;

class AdminPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			applicationList: [],
			message: "",
			isLoading: false
		};
	}
	async componentDidMount() {
		try {
			const { code, data } = await api.getApplicationList();
			if (!code) {
				return;
			}
			if (data.data) {
				this.setState({ applicationList: data, message: data.message });
			}
		} catch (e) {
			console.log(e);
		}
	}
	render() {
		return (
			<div className="AdminPage__container">
				{this.state.applicationList.map((item) => (
					<ul>
						<ApplicationItem applicationList={this.state.applicationList} />
					</ul>
				))}
			</div>
		);
	}
}
export default AdminPage;
