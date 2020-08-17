const MYSQL = require('mysql2');
const CONFIG = {
	host: "101.201.239.229",
	user: "wego",
	password: "AraFiZpRScZrZPMs",
	port: "3306",
	database: "wego",
	charset: "utf8mb4"
};

const DB = async() => {
    try {
        const connection = await MYSQL.createConnection(CONFIG);
        await connection.connect((err) => {
            if (err) {
                Promise.reject(err)
            }
            //  else {
            //     console.log('connected as id ' + connection.threadId)
            // }
        })
        return connection;
    } catch (e) {
        console.log('连接数据库失败')
    }
}
module.exports = DB