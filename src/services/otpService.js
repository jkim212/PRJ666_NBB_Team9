const otpGenerator = require('otp-generator');
module.exports.getOtp=()=>{

  return otpGenerator.generate(6,{upperCase:false,specialChars:false});
}
  