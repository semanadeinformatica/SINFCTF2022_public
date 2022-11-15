const config = require('../config');
const templates = require("./templates");

const parseTodoItem = (item) => {

    let { text } = item;

    for (const template in templates) {
        if (text.includes(template)) {
            if (template === "$FLAG" && item.admin)
                text = text.replace(template, config.flag);
            else
                text = text.replace(template, templates[template]);
        }
    }

    return { ...item, text };
};

module.exports = {
    parseTodoItem,
};