const DB = require("../database");
module.exports = ({
	name,
	school,
	majority,
	student_num,
	email,
	qq,
	bio,
	site,
	time
}) => {
	return new Promise(async (resolve, reject) => {
		const params = [
			undefined, // id 自增字段
			name,
			school,
			majority,
			student_num,
			email,
			qq,
			bio,
			site,
			time,
			0
		];
		const sql = `
            INSERT INTO application
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
		const db = await DB();
		db.query(sql, params, (err, res) => {
			if (err) {
				reject(err);
			}
			resolve({
				name,
				school,
				majority,
				student_num,
				email,
				qq,
				bio,
				site,
				time,
				status: 0
			});
		});
	});
};
