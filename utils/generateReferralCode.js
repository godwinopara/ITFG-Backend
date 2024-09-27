export const generateCustomReferralCode = () => {
  const prefix = "ITFG"; // Fixed prefix
  const timestamp = Date.now().toString(36).slice(-4).toUpperCase(); // Last 4 characters of the base36 timestamp
  const randomString = Math.random().toString(36).substring(2, 4).toUpperCase(); // 2-character random string
  return `${prefix}${timestamp}${randomString}`;
};
