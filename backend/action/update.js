const DB = require("../database");
module.exports = ({ status, student_num }) => {
	return new Promise(async (resolve, reject) => {
		const sql = `
            UPDATE application
            SET status = ? 
            WHERE student_num = ?
        `;
		const db = await DB();
		db.query(sql, [status, student_num], (err, res) => {
			if (err) {
				reject(err);
			}
			resolve(res);
		});
	});
};
