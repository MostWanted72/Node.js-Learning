const path = require('path');

// require.main.filename is path of app.js 
module.exports = path.dirname(require.main.filename);