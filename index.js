require("dotenv").config
const { Toolkit } = require('actions-toolkit')
const tools = new Toolkit()
const twilio = require('twilio')
// Run your GitHub Action!
const {
  INPUT_PR_TITLE: ptitle,
  INPUT_IU_TITLE: ititle,
  TWILIO_ACCOUNT_SID: accountSid,
  TWILIO_API_KEY: apiKey,
  TWILIO_API_SECRET: apiSecret,
  FROM_NUM: from,
  TO_NUM: to
} = process.env
const client = twilio(apiKey, apiSecret, { accountSid });
const isOpenedPr = tools.context.event == "pull_request" && ["opened",].includes(tools.context.payload.action);
const isClosedPR = tools.context.event == "pull_request" && ["closed"].includes(tools.context.payload.action);

const isIssuemade = tools.context.event == "issues" && ["opened"].includes(tools.context.payload.action)
const isIssueClosed = tools.context.event == "issues" && ["closed"].includes(tools.context.payload.action)
const ev_num = tools.context.payload.issue.number
//const ev_num=12
let prIssueName = (pr) => {
  if (pr.length > 30) {
    return truncateString(pr, 30)
  }
}

function responseRunner() {
  if (isOpenedPr) {
    let response =
      `New PR by ${tools.context.actor} #${ev_num} on ${tools.context.repo}.
Title: ${prIssueName(ptitle)}`
    return response
  } else if (isClosedPR) {
    let response = `The ${ev_num} PR on ${tools.context.repo} is closed by ${tools.context.actor}`
    return response
  } else if (isIssuemade) {
    let response =
      `New Issue by ${tools.context.actor} #${ev_num} on ${tools.context.repo}.
Title: ${prIssueName(ititle)}`
    return response
  } else if (isIssueClosed) {
    let response =
      `Issue #${ev_num} is closed by ${tools.context.actor} on ${tools.context.repo}`
    return response
  }
}
message = responseRunner()
tools.log.debug("Sending the SMS")
async function run() {
  const resultMessage = await client.messages.create({
    from,
    to,
    body: message,
  });
  tools.log.success("SMS Sent")
  return resultMessage
}
async function execute() {
  try {
    return await run();
  } catch ({ message }) {
    tools.log.error('Failed to send message', message);
    tools.log.fatal(message);
  }
}
execute();