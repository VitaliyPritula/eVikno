const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);
//for Firebase
config.resolver.sourceExts.push("cjs");
config.resolver.unstable_enablePackageExports = false;

module.exports = withNativeWind(config, { input: "./global.css" });
