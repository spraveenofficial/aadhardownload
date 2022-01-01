const axios = require("axios");
const { v4: uuidv4 } = require("uuid");

const getOtp = async (addhar, txnId, captcha) => {
  const transactionId = uuidv4();
  const response = await axios({
    url: "https://tathya.uidai.gov.in/unifiedAppAuthService/api/v2/generate/aadhaar/otp",
    method: "POST",
    data: {
      uidNumber: addhar,
      captchaTxnId: txnId,
      captchaValue: captcha,
      transactionId: `MYAADHAAR:${transactionId}`,
    },
  });
  console.log(response.data);
  return response.data;
};

module.exports = getOtp;
