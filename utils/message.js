// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const client = require('twilio')(accountSid, authToken);

const notify_user_id=process.env.NOTIFY_USER_ID
const notify_api_key=process.env.NOTIFY_API_KEY
const notify_sender_id=process.env.NOTIFY_SENDER_ID
const axios = require('axios')

const sendMessage = async (message, receiver) => {
console.log(message)
  console.log(`${message}===${receiver}`);
  const msg = await axios
    .post("https://app.notify.lk/api/v1/send", {
      user_id: notify_user_id,
      api_key: notify_api_key,
      sender_id: notify_sender_id,
      to: receiver,
      message: message,
    })
    .then((res) => {
      console.log(`statusCode: ${res.status}`);
      console.log(res.data);
      return res.data
    })
    .catch((error) => {
      console.error(`ERROR OCCURED - ${error}`);
      return error
    });
    return msg
};
module.exports=sendMessage