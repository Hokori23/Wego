const DB = require("../database");
module.export = () => {
	return new Promise(async (resolve, reject) => {
		const sql = `
            SELECT * FROM application
        `;
		const db = await DB();
		db.query(sql, (err, res) => {
			if (err) {
				reject(err);
			}
			resolve(res);
		});
	});
};
