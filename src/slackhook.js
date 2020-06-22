const { LIVE_LINK, REPO_LINK, DNS_NAME } = require("./config");

const slackWebhook = (
  hashChanged,
  oldHash,
  newHash,
  liveChanged,
  dnsChanged,
  oldDns,
  newDns
) => {
  const rootBlock = {
    type: "section",
    text: {
      type: "mrkdwn",
      text: `@channel ${DNS_NAME} has been updated.`,
    },
  };

  const dividerBlock = {
    type: "divider",
  };

  const hashSameBlock = {
    type: "context",
    elements: [
      {
        type: "mrkdwn",
        text: `The hash is still \`${oldHash}\`.`,
      },
    ],
  };

  const hashChangedBlock = {
    type: "context",
    elements: [
      {
        type: "mrkdwn",
        text: `The hash has changed from \`${oldHash}\` to \`${newHash}\`.`,
      },
    ],
  };

  const liveSameBlock = {
    type: "context",
    elements: [
      {
        type: "mrkdwn",
        text: `The live and source data sill match.`,
      },
    ],
  };

  const liveChangedBlock = {
    type: "context",
    elements: [
      {
        type: "mrkdwn",
        text: `The live and source data don't match.`,
      },
    ],
  };

  const dnsSameBlock = {
    type: "context",
    elements: [
      {
        type: "mrkdwn",
        text: `The DNS records are still \`${oldDns}\`.`,
      },
    ],
  };

  const dnsChangedBlock = {
    type: "context",
    elements: [
      {
        type: "mrkdwn",
        text: `The DNS records have changed from \`${oldDns}\` to \`${newDns}\`.`,
      },
    ],
  };

  const actions = {
    type: "actions",
    elements: [
      {
        type: "button",
        text: {
          type: "plain_text",
          text: "Checke the live site",
        },
        url: LIVE_LINK,
      },
      {
        type: "button",
        text: {
          type: "plain_text",
          text: "Checke the repo",
        },
        url: REPO_LINK,
      },
    ],
  };

  const blocks = [];

  blocks.push(rootBlock);
  blocks.push(dividerBlock);
  blocks.push(hashChanged ? hashChangedBlock : hashSameBlock);
  blocks.push(liveChanged ? liveChangedBlock : liveSameBlock);
  blocks.push(dnsChanged ? dnsChangedBlock : dnsSameBlock);
  blocks.push(dividerBlock);
  blocks.push(actions);

  return { blocks };
};

module.exports = slackWebhook;
