import axios from "axios";
axios.defaults.baseURL = "https://api.hokori.online/wego";
export default {
	/**
	 * 获取申请列表接口
	 */
	getApplicationList: () => {
		return new Promise((resolve, reject) => {
			axios
				.get("/get-applicationlist")
				.then((res) => {
					resolve(res.data);
				})
				.catch((e) => {
					reject(e);
				});
		});
	},
	/**
	 * 处理申请接口
	 */
	handleApplication: (payload) => {
		return new Promise((resolve, reject) => {
			axios
				.post("/handle", payload)
				.then((res) => {
					resolve(res.data);
				})
				.catch((e) => {
					reject(e);
				});
		});
	},
	/**
	 * 申请接口
	 */
	apply: (payload) => {
		return new Promise((resolve, reject) => {
			axios
				.post("/apply", payload)
				.then((res) => {
					resolve(res.data);
				})
				.catch((e) => {
					reject(e);
				});
		});
	},
	/**
	 * 学院专业信息列表接口
	 */
	getSchoolList: () => {
		return new Promise((resolve, reject) => {
			axios
				.get("/get-schoollist")
				.then((res) => {
					resolve(res.data);
				})
				.catch((e) => {
					reject(e);
				});
		});
	}
};
