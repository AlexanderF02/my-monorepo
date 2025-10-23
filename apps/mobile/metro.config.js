const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const config = getDefaultConfig(__dirname);


config.watchFolders = [
  path.resolve(__dirname, "../../packages/ui"),
  path.resolve(__dirname, "../../packages/typescript-config"),
];

config.resolver.blacklistRE = /apps[\/\\]strapi[\/\\]dist[\/\\].*/;

module.exports = config;
