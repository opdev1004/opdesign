const CSSFactory = require("@opdev1004/cssfactory");
const path = require('path');


const configpath = path.resolve(__dirname, "./cssfactory-config.json");
const cssfactory = new CSSFactory.CSSFactory(configpath);
cssfactory.combineCSS();