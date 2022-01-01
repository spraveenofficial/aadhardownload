const axios = require("axios");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const getCaptcha = async () => {
  try {
    const response = await axios({
      url: "https://tathya.uidai.gov.in/unifiedAppAuthService/api/v2/get/captcha",
      method: "POST",
      headers: {
        Accept: "application/json, text/plain",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "en_IN",
        appid: "MYAADHAAR",
        Connection: "keep-alive",
        "Content-Type": "application/json",
        Host: "tathya.uidai.gov.in",
        Origin: "https://myaadhaar.uidai.gov.in",
        Referer: "https://myaadhaar.uidai.gov.in/",
        "sec-ch-ua-mobile": "?1",
        "sec-ch-ua-platform": "Android",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-site",
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Mobile Safari/537.36",
      },
      data: { langCode: "en", captchaLength: "3", captchaType: "2" },
    });
    const imageBuffer = Buffer.from(
      response.data.captchaBase64String,
      "base64"
    );
    const path = "captcha.png";
    fs.writeFileSync(path, imageBuffer);
    console.log("Captcha Generated.");
    return response.data.captchaTxnId;
  } catch (error) {
    console.log(error);
    return console.log("Error while generating QR");
  }
};

module.exports = getCaptcha;
