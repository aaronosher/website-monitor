const nslookup = require("nslookup");

const nslookupPromise = (fqdn, options = {}) =>
  new Promise((resolve, reject) =>
    nslookup(fqdn)
      .server(options.server || "1.1.1.1")
      .type(options.type || "a")
      .end((err, address) => {
        if (err) {
          return reject(err);
        }
        return resolve(address);
      })
  );

module.exports = nslookupPromise;
