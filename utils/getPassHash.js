// import sha256 from 'crypto-js/sha256';
var sha256 = require("crypto-js/sha256");

const genPassHash = (provider, email) => {
    return sha256(`zerolife:${provider}:${email}`).toString().slice(0, 16);
}

module.exports = genPassHash;
// export default genPassHash;