module.exports = (OPTIONS) => {
	OPTIONS.html = `
    <!DOCTYPE html>
    <html lang="zh">
    <head>
        <meta charset="UTF-8">
        <title>${OPTIONS.subject ? OPTIONS.subject : "title"}</title>
    </head>
    <body>
        <div class="mail__container">
        </div>
    </body>
    `;
	return OPTIONS;
};
