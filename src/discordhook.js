const { LIVE_LINK, REPO_LINK, DNS_NAME } = require("./config");

const discordWebhook = (
  hashChanged,
  oldHash,
  newHash,
  liveChanged,
  dnsChanged,
  oldDns,
  newDns
) => {
  const hashSameString = `The hash is still \`${oldHash}\`.`;
  const hashChangedString = `The hash has changed from \`${oldHash}\` to \`${newHash}\`.`;

  const liveSameString = `The live and source data sill match.`;
  const liveChangedString = `The live and source data don't match.`;

  const dnsSameString = `The DNS records are still \`${oldDns}\`.`;
  const dnsChangedString = `The DNS records have changed from \`${oldDns}\` to \`${newDns}\`.`;

  let content = `@channel ${DNS_NAME} has been updated.`;
  content += "\n\n**Hash**\n";
  content += hashChanged ? hashChangedString : hashSameString;
  content += "\n\n**Live & Source**\n";
  content += liveChanged ? liveChangedString : liveSameString;
  content += "\n\n**DNS Records**\n";
  content += dnsChanged ? dnsChangedString : dnsSameString;

  const embeds = [
    {
      title: "Actions",
      fields: [
        {
          name: "Live Site",
          value: `[Check the live site](${LIVE_LINK})`,
          inline: true,
        },
        {
          name: "Repo",
          value: `[Check the repo](${REPO_LINK})`,
          inline: true,
        },
      ],
    },
  ];

  return {
    content,
    embeds,
  };
};

module.exports = discordWebhook;
