const config = require("../config");

module.exports = Object.freeze({
    "$APP_NAME": config.appName,
    "$FLAG": "Uh oh, you are trying to access the flag, but only *admins* can do it. Better ask for permission...",
    "$ORG_NAME": config.orgName,
});