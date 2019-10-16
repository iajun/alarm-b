const { VOICE_URL } = require("../config");
const { fetch } = require("./fetch");
const getToken = require("./fetchVoiceAuth");

module.exports = async params => {
  const token = await getToken();
  const res = await fetch({
    url: VOICE_URL,
    method: "post",
    headers: {
      "Content-Type": "audio/wav;rate=16000"
    },
    data: {
      ...token,
      token:
        "24.f338f2cc8249848a301605293f0f3e73.2592000.1573790241.282335-17528095",
      format: "wav",
      rate: 16000,
      channel: 1,
      cuid: "9a:00:12:43:d1:20"
    }
  });
  if (res.err_no !== 0) {
    throw new Error(`${res.err_no}: ${res.err_msg}`);
  } else {
    return new Promise(resolve => resolve(res.result));
  }
};
