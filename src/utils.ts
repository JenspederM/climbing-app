import { COLOR_MAP } from "./constants";

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

export const getColor = (color: string) => {
  const lowerColor = color.toLowerCase();
  if (lowerColor in COLOR_MAP) {
    const color = COLOR_MAP[lowerColor].background;
    return color;
  } else {
    return "bg-white";
  }
};
