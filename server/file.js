const fs = require("fs");
const { resolve } = require("../util");
const { md5, base64encode } = require("utility");

const handleJsonMap = async (flag = "get", object = {}, key) => {
  const jsonPath = resolve("./upload/manifest.json");
  return new Promise((resolve, reject) => {
    fs.exists(jsonPath, isExisit => {
      let obj = isExisit ? JSON.parse(fs.readFileSync(jsonPath)) : {};
      if (flag === "get") {
        return resolve(key === void 0 ? obj : obj[key] || {});
      }
      const hash = md5(JSON.stringify(object));

      if (flag === "add") {
        obj[hash] = { ...object, hash };
      }
      if (flag === "delete") {
        delete obj[hash];
      }

      fs.writeFile(jsonPath, JSON.stringify(obj), err => {
        if (err) reject(err);
        resolve(obj[hash]);
      });
    });
  });
};

const getWavReqData = async wavId => {
  const { path, size } = await handleJsonMap("get", null, wavId);
  if (path === void 0) {
    throw new Error("404001: 您的请求ID不存在");
  } else {
    return { speech: base64encode(fs.readFileSync(path)), len: size };
  }
};

module.exports = {
  handleJsonMap,
  getWavReqData
};
