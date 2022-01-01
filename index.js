const { question } = require("readline-sync");
const captcha = require("./getCaptcha");
const sendOtp = require("./getOtp");
const downloadAddhar = require("./download");


const getUserData = async () => {
  const transactionId = await captcha();
  // const userAddhar = "358008722067"
  const askingCaptcha = question("Enter captcha code \n");
  // console.log(transactionId);
  const sendingOtp = await sendOtp(userAddhar, transactionId, askingCaptcha);
  const otp = question("Enter otp \n");
  const download = await downloadAddhar(otp, userAddhar, sendingOtp);
};

getUserData();
