const tablea = require("./tablea/tablea.service.js");
// ~cb-add-require-service-name~

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(tablea);
    // ~cb-add-configure-service-name~
};
