const _BUTTON_BACKGROUND = (color) => {
  return `bg-${color}-400 hover:bg-${color}-600 active:bg-${color}-700 focus:outline-none focus:ring focus:ring-${color}-600`;
};

export const COLOR_MAP = {
  green: {
    background: _BUTTON_BACKGROUND("green"),
    grade: 1,
  },
  yellow: {
    background: _BUTTON_BACKGROUND("yellow"),
    grade: 2,
  },
  orange: {
    background: _BUTTON_BACKGROUND("orange"),
    grade: 3,
  },
  blue: {
    background: _BUTTON_BACKGROUND("blue"),
    grade: 4,
  },
  purple: {
    background: _BUTTON_BACKGROUND("purple"),
    grade: 5,
  },
  red: {
    background: _BUTTON_BACKGROUND("red"),
    grade: 6,
  },
  black: {
    background:
      "bg-gray-700 hover:bg-gray-800 active:bg-gray-900 focus:outline-none focus:ring focus:ring-gray-800",
    grade: 7,
  },
  pink: {
    background: _BUTTON_BACKGROUND("pink"),
    grade: 8,
  },
};

export const GRIP_TYPES = [
  "Jug/Bucket",
  "Edge/Ledge",
  "Crimp",
  "Pinch",
  "Sloper",
  "Pocket",
  "Undercling",
  "Horn",
  "Other",
];

export const ROUTE_TYPES = ["Static", "Dynamic", "Boulder"];
