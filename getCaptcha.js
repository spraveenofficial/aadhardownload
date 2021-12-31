const axios = require("axios");
const fs = require("fs");

const getCaptcha = async () => {
  try {
    const response = await axios({
      url: "https://tathya.uidai.gov.in/unifiedAppAuthService/api/v2/get/captcha",
      method: "POST",
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
    return console.log("Error while generating QR");
  }
};

module.exports = getCaptcha;
