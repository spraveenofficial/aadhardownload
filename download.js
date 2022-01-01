const axios = require("axios");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

const downloadAddhar = async (otp, addhar, txnID) => {
  const response = await axios({
    url: "https://tathya.uidai.gov.in/downloadAadhaarService/api/aadhaar/download",
    method: "POST",
    data: {
      mask: false,
      otp: otp,
      otpTxnId: txnID,
      uid: addhar,
    },
    headers: {
      Accept: "application/json, text/plain",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "en_IN",
      appid: "MYAADHAAR",
      Connection: "keep-alive",
      "Content-Length": 109,
      "Content-Type": "application/json",
      Host: "tathya.uidai.gov.in",
      Origin: "https://myaadhaar.uidai.gov.in",
      Referer: "https://myaadhaar.uidai.gov.in/",
      "sec-ch-ua-mobile": "?1",
      "sec-ch-ua-platform": "Android",
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-site",
      token:
        "STD-x*x-eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdHVkZW50X2lkIjoiMjc4ODUiLCJjdXJyZW50X3NlbSI6IjUiLCJjdXJyZW50X3llYXIiOiIzIn0.Cv8C3--MG5MchNDYJw44iOOAbXDkH0UAWjxsZ_XblD0",
      transactionId: `${txnID}`,
      "User-Agent":
        "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Mobile Safari/537.36",
      "x-request-id": `MYAADHAAR:${uuidv4()}`,
    },
  });
  const pdfBuffer = Buffer.from(response.data.data.aadhaarPdf, "base64");
  const path = "addhar.pdf";
  fs.writeFileSync(path, pdfBuffer);
  console.log(response);
  return response;
};

module.exports = downloadAddhar;
