export const guid = () => {
  const CHARS =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let autoId = "";

  for (let i = 0; i < 20; i++) {
    autoId += CHARS.charAt(Math.floor(Math.random() * CHARS.length));
  }
  return autoId;
};

export const toTitleCase = (str: String): String => {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};
