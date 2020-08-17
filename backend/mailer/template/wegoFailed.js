const moment = require("moment");
const isDef = (v) => {
	return v !== undefined && v !== null;
};

/**
 * 字段转中文
 * @param { object } obj
 */
const translateKeys = (obj) => {
	const dictionary = {
		name: "姓名",
		school: "学院",
		majority: "专业",
		student_num: "学号",
		email: "E-mail",
		qq: "QQ",
		bio: "简介",
		site: "个人网站",
		time: "提交时间"
	};
	Object.keys(obj).map((key) => {
		obj[dictionary[key]] = obj[key];
		delete obj[key];
	});
};

/**
 * @description 传入一个含有title: string(用于标题), info: Array(用于遍历出申请人信息), detailURL: string(用于查看详情的URL)
 */
module.exports = ({ title = "", info = {}, detailURL = "#" }) => {
	let html = `
    <!DOCTYPE html>
    <html lang="zh">
    <head>
        <meta charset="UTF-8">
        <title>${title}</title>
    </head>
    <body>
        <table style="width:100%;height:100%">
            <tbody>
                <tr>
                    <style>
                        a {
                            position: relative;
                            display: inline-block;
                            overflow: hidden;
                            text-decoration: none !important;
                            vertical-align: top;
                            outline: 0;
                            background-color: transparent;
                            margin: 0 3px;
                        }
                
                        a:before {
                            position: absolute;
                            top: auto;
                            bottom: 0px;
                            left: 0;
                            width: 100%;
                            height: 1px;
                            content: ' ';
                            background-color: #536dfe;
                            -webkit-transition: all .2s;
                            transition: all .2s;
                            -webkit-transform: scaleX(0);
                            transform: scaleX(0);
                            -webkit-backface-visibility: hidden;
                            backface-visibility: hidden;
                        }
                
                        a:hover:before {
                            -webkit-transform: scaleX(1);
                            transform: scaleX(1);
                        }
                
                        .mail__container {
                            font-size:16px;
                            background-image: radial-gradient(circle at 100% 150%, #f8f8f8 24%, #fff 24%, #fff 28%, #f8f8f8 28%, #f8f8f8 36%, #fff 36%, #fff 40%, transparent 40%, transparent), radial-gradient(circle at 0 150%, #f8f8f8 24%, #fff 24%, #fff 28%, #f8f8f8 28%, #f8f8f8 36%, #fff 36%, #fff 40%, transparent 40%, transparent), radial-gradient(circle at 50% 100%, #fff 10%, #f8f8f8 10%, #f8f8f8 23%, #fff 23%, #fff 30%, #f8f8f8 30%, #f8f8f8 43%, #fff 43%, #fff 50%, #f8f8f8 50%, #f8f8f8 63%, #fff 63%, #fff 71%, transparent 71%, transparent), radial-gradient(circle at 100% 50%, #fff 5%, #f8f8f8 5%, #f8f8f8 15%, #fff 15%, #fff 20%, #f8f8f8 20%, #f8f8f8 29%, #fff 29%, #fff 34%, #f8f8f8 34%, #f8f8f8 44%, #fff 44%, #fff 49%, transparent 49%, transparent), radial-gradient(circle at 0 50%, #fff 5%, #f8f8f8 5%, #f8f8f8 15%, #fff 15%, #fff 20%, #f8f8f8 20%, #f8f8f8 29%, #fff 29%, #fff 34%, #f8f8f8 34%, #f8f8f8 44%, #fff 44%, #fff 49%, transparent 49%, transparent);
                            background-size: 100px 50px;
                            width: 500px;
                            margin: 50px auto;
                            border-radius: 10px;
                            box-shadow: 0 1px 10px 2px rgba(0, 0, 0, .15);
                            overflow: hidden;
                            font-family :'Century Gothic','Trebuchet MS','Hiragino Sans GB','微软雅黑','Microsoft Yahei',Tahoma,Helvetica,Arial,SimSun,sans-serif;
                        }
                
                        .mail__header,
                        .mail__content {
                            padding: 20px 40px;
                        }
                
                        .mail__footer {
                            padding: 10px 20px;
                        }
                
                        .mail__header,
                        .mail__footer,
                        .mail__block {
                            box-sizing: border-box;
                            width: 100%;
                            background-color: #099CEC;
                            color: #FFFFFF;
                            font-weight: bold;
                        }
                
                        .mail__footer {
                            display: flex;
                            flex-direction: column;
                            align-items: flex-end;
                            font-weight: normal;
                        }
                
                        .mail__footer span {
                            font-size: 12px;
                            margin-top: 10px;
                            font-weight: normal;
                        }
                
                        .mail__footer a {
                            font-size:15px;
                            color: #FFFFFF;
                            font-weight: bold;
                        }
                
                        .mail__footer a:before {
                            background-color: #FFFFFF;
                            color: #FFFFFF;
                        }
                
                
                        .mail__block {
                            margin: 10px 0;
                            padding: 10px 20px;
                            border-radius: 5px;
                            font-weight: normal;
                        }
                
                        .mail__block li {
                            list-style: none;
                            line-height: calc(100% + 6px);
                            margin-bottom: 4px;
                            word-break: break-all;
                            border-bottom: 1px solid rgba(255, 255, 255, 0.7);
                        }
                
                        .mail__block li span {
                            font-weight: bold;
                            margin-right: 5px;
                        }
                    </style>
                    <td>
                        <div class="mail__container">
                            <header class="mail__header">Hello~ Wego社团有新人提交了一份入团申请！</header>
                            <article class="mail__content">
                                申请人信息：
                                <ul class="mail__block">`;
	translateKeys(info);
	Object.keys(info).map((key) => {
		const value = isDef(info[key]) ? info[key] : "";
		html += `
                                    <li><span>${key}: </span>${value}</li>`;
	});
	html += `
                                </ul>
                            </article>
                            <footer class="mail__footer">
                                <span>此信息由系统发送，请勿回复</span>
                            </footer>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </body>
    `;
	return html;
};
