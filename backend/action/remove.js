const DB = require("../database");
module.exports = (student_num) => {
	return new Promise(async (resolve, reject) => {
		const sql = `
            DELETE FROM application WHERE student_num = ?
        `;
		const db = await DB();
		db.query(sql, [student_num], (err, res) => {
			if (err) {
				reject(err);
			}
			resolve(res);
		});
	});
};
