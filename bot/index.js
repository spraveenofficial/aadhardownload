const WizardScene = require("telegraf/scenes/wizard");
const Stage = require("telegraf/stage");
const session = require("telegraf/session");
const { Telegraf } = require("telegraf");
const getCaptcha = require("../getCaptcha");
const sendOtp = require("../getOtp");
const download = require("../download");
const bot = new Telegraf("1355460659:AAG1MSRKsnSiYSW_h6DCxq_kqGqE9XEsKG8");
bot.use(session());

let tnxId;
const userDetails = new WizardScene(
  "get-user-details",
  async (ctx) => {
    await ctx.reply("Please Enter Aadhaar Number");
    return ctx.wizard.next();
  },
  async (ctx) => {
    ctx.wizard.state.aadhar = ctx.message.text;
    await getCaptcha()
      .then(async (res) => {
        tnxId = res;
        await ctx.replyWithPhoto(
          { source: "./captcha.png" },
          { caption: "Please Enter Captcha Code:" }
        );
        return ctx.wizard.next();
      })
      .catch((err) => {
        return ctx.reply("Server hanged! Please try again later.");
      });
  },
  async (ctx) => {
    ctx.wizard.state.captcha = ctx.message.text;
    await sendOtp(ctx.wizard.state.aadhar, tnxId, ctx.wizard.state.captcha)
      .then((res) => {
        console.log(res);
        if (res.message == "Invalid Captcha") {
          ctx.reply("Invalid Captcha.");
          //   return ctx.scene.leave();
        } else if (res.message == "Invalid Aadhaar Number.") {
          ctx.reply("Invalid Aadhaar Number.");
          return ctx.scene.leave();
        } else if (res.status == "Success") {
          ctx.reply("Otp Requested Successfully. Please Enter Otp!");
          return ctx.wizard.next();
        } else if (
          res.message ==
          "We are unable to reach authentication service to serve you OTP. Please try again later"
        ) {
          ctx.reply(
            "May be you have exchausted the limit of requesting otp. Please try again later."
          );
          return ctx.wizard.next();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  async (ctx) => {
    ctx.wizard.state.otp = ctx.message.text;
    try {
      await download(ctx.wizard.state.otp, ctx.wizard.aadhar, tnxId).then(
        (res) => {
          console.log(res);
        }
      );
      console.log(ctx.wizard.state);
    } catch (error) {
      ctx.reply("Something Went Wrong!");
      console.error(error);
      return ctx.scene.leave();
    }
  }
);

const userData = new Stage([userDetails]);
bot.use(userData.middleware());
bot.command("start", async (ctx) => {
  let user = new Object();
  user.id = ctx.chat.id;
  ctx.scene.enter("get-user-details");
});

bot.launch();
