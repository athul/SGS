# SGS - Short GitHub SMSer
SGS is a method to connect your GitHub to Phone using Twilio SendMessage API. Get an SMS when something new happens on GitHub like a new Issue,PR

Made for the DEV.to - Twilio Hackathon

## What it Does
This action sends an SMS to from your twilio number to the other number using Twilio's `sendMessage` API. It only sends a message for a new Issue or PR Opened or Closed.

You should define the action to trigger when a PR/Issue is opened or closed. 
```yml
name: Build and Notify
on:
  push:
  pull_request:
    types: [opened,closed]
  issues:
    types: [opened, closed]
```

### Features
- Made with Node.js
- Fast
- Connect GitHub to SMS

### Requirements

- [Node.js](https://nodejs.org/)
- A Twilio account - [sign up](https://www.twilio.com/try-twilio)

### Required Secrets
You must add the following to your Repo Secrets
- FROM_NUM
- TO_NUM
- TWILIO_ACCOUNT_SID
- TWILIO_API_SECRET
- TWILIO_API_KEY

> Never got to test it since I couldn't get a number for SMS in India. It would be great if someone could test it and give feedback.