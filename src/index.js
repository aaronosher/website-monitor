const nslookup = require("./nslookup");
const {
  DNS_NAME,
  LIVE_URL,
  SOURCE_URL,
  WEBHOOK_URL,
  INTERVAL,
} = require("./config");
const { sha256 } = require("hash.js");
const got = require("got");
const {
  updateDNS,
  updateHash,
  store: { dispatch, getState },
} = require("./store");
const slackHook = require("./slackhook");
const discordHook = require("./discordhook");

Array.equals = (_arr1, _arr2) => {
  const arr1 = _arr1.concat().sort();
  const arr2 = _arr2.concat().sort();

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }

  return true;
};

const runtime = async (init = false) => {
  const addr = await nslookup(DNS_NAME);
  const live_body = (await got(LIVE_URL)).body;
  const source_body = (await got(SOURCE_URL)).body;
  const hash = sha256().update(live_body).digest("hex");

  if (init) {
    dispatch(updateDNS(addr));
    dispatch(updateHash(hash));
  }

  const { records: oldAddr, hash: oldHash } = getState();

  const changed = (() => {
    if (!Array.equals(oldAddr, addr)) {
      dispatch(updateDNS(addr));
      return true;
    }

    if (hash !== oldHash) {
      dispatch(updateHash(hash));
      return true;
    }

    if (source_body !== live_body) {
      return true;
    }

    return false;
  })();

  if (changed) {
    if (WEBHOOK_URL.includes("discord")) {
      await got.post(WEBHOOK_URL, {
        json: discordHook(
          hash !== oldHash,
          oldHash,
          hash,
          live_body !== source_body,
          !Array.equals(addr, oldAddr),
          oldAddr.toString(),
          addr.toString()
        ),
      });
      return;
    }

    if (WEBHOOK_URL.includes("slack")) {
      await got.post(WEBHOOK_URL, {
        json: slackHook(
          hash !== oldHash,
          oldHash,
          hash,
          live_body !== source_body,
          !Array.equals(addr, oldAddr),
          oldAddr.toString(),
          addr.toString()
        ),
      });
      return;
    }
  }
};

const intverval = setInterval(runtime, INTERVAL);
console.log("Runtime started", intverval);
runtime(true);

process.on("SIGINT", function () {
  console.log("Caught interrupt signal");

  clearInterval(intverval);
  process.exit(0);
});
