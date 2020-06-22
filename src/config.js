require("dotenv").config();

const WEBHOOK_URL = process.env.WEBHOOK_URL;
const LIVE_URL = process.env.LIVE_URL;
const SOURCE_URL = process.env.SOURCE_URL;
const DNS_NAME = process.env.DNS_NAME;
const LIVE_LINK = process.env.LIVE_LINK;
const REPO_LINK = process.env.REPO_LINK;
const INTERVAL = process.env.INTERVAL || 5 * 60 * 1000;

module.exports = {
  WEBHOOK_URL,
  LIVE_URL,
  SOURCE_URL,
  DNS_NAME,
  LIVE_LINK,
  REPO_LINK,
  INTERVAL,
};
