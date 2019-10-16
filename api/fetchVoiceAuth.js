const { API_KEY, SECRET_KEY, ACCESS_BASE_URL } = require("../config");
const { fetch } = require("./fetch");
const { resolve } = require("../util");
const fs = require("fs");

const params = {
  grant_type: "client_credentials",
  client_id: API_KEY,
  client_secret: SECRET_KEY
};

module.exports = async () => {
  const tokenPath = resolve("./api/token.json");
  let token;
  if (fs.existsSync(tokenPath)) {
    let token = JSON.parse(fs.readFileSync(tokenPath));
    return new Promise(resolve => resolve(token.access_token));
  } else {
    token = await fetch({
      url: ACCESS_BASE_URL,
      params,
      method: "get"
    });
    fs.writeFile(tokenPath, JSON.stringify(token), err => {
      if (err) throw new Error("500102:获取百度API access_token 失败");
    });
    return token.access_token;
  }
};
