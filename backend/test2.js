const dns = require("dns");

console.log(dns.getServers());

dns.resolveSrv(
  "_mongodb._tcp.cluster0.nac7o2o.mongodb.net",
  (err, records) => {
    console.log(err);
    console.log(records);
  }
);