const moment = require("moment");
const isUndef = (v) => {
	return v === undefined || v === null;
};
const sad = require("../../static/sadBase64");

/**
 * @description 传入一个含有title: string(用于标题), name: string(申请人名字)
 */
module.exports = ({ title = "", name = "" }) => {
	if (isUndef(title) || isUndef(name)) {
		throw new ReferenceError();
	}
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
                            position: relative !important;
                            display: inline-block !important;
                            overflow: hidden !important;
                            text-decoration: none !important;
                            vertical-align: top !important;
                            outline: 0 !important;
                            background-color: transparent !important;
                            margin: 0 3px !important;
                        }
                
                        a:before {
                            position: absolute !important;
                            top: auto !important;
                            bottom: 0px !important;
                            left: 0 !important;
                            width: 100% !important;
                            height: 1px !important;
                            content: ' ' !important;
                            background-color: #536dfe !important;
                            -webkit-transition: all .2s !important;
                            transition: all .2s !important;
                            -webkit-transform: scaleX(0) !important;
                            transform: scaleX(0) !important;
                            -webkit-backface-visibility: hidden !important;
                            backface-visibility: hidden !important;
                        }
                
                        a:hover:before {
                            -webkit-transform: scaleX(1) !important;
                            transform: scaleX(1) !important;
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

                        .mail__content {
                            position: relative;
                        }
                
                        .mail__content p {
                            color: #666666;
                        }

                        .mail__content__img {
                            position: absolute;
                            right: 10px;
                            bottom: 5px;
                            border: 2px solid #666666;
                            border-radius: 50%;
                            max-width: 70px;
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
                            align-items: center;
                            font-weight: normal;
                        }
                
                        .mail__footer span {
                            font-size: 12px;
                            font-weight: normal;
                            align-self: flex-end;
                        }
                
                        .mail__footer a {
                            font-size:15px !important;
                            color: #FFFFFF !important;
                            font-weight: bold !important;
                        }
                
                        .mail__footer a:before {
                            background-color: #FFFFFF !important;
                            color: #FFFFFF !important;
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
                            <header class="mail__header">天津工业大学Wego社团</header>
                            <article class="mail__content">
                                你好，${name}：
                                <p>很抱歉你的社团申请没有被通过QAQ</p>
                                <p>但这不代表我们不认可你的能力哦，我们相信每个人都是一匹具有无限潜力的黑马！</p>
                                <p>希望下一次见面可以遇到更好的你！</p>
                                <img class="mail__content__img" src="${sad}" />
                            </article>
                            <footer class="mail__footer">
                                <span>此信息由系统发送，请勿回复</span>
                                <span>${moment().format("lll")}</span>
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
