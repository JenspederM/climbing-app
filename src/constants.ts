const _BUTTON_BACKGROUND = (color) => {
  const bg = `text-white bg-${color}-400 hover:bg-${color}-600 active:bg-${color}-700 focus:outline-none focus:ring focus:ring-${color}-600`;
  console.log(color, bg);
  return bg;
};

export const COLOR_MAP = {
  green: {
    background:
      "text-white bg-green-400 hover:bg-green-600 active:bg-green-700 focus:outline-none focus:ring focus:ring-green-600",
    grade: 1,
  },
  yellow: {
    background:
      "text-white bg-yellow-400 hover:bg-yellow-600 active:bg-yellow-700 focus:outline-none focus:ring focus:ring-yellow-600",
    grade: 2,
  },
  orange: {
    background:
      "text-white bg-orange-400 hover:bg-orange-600 active:bg-orange-700 focus:outline-none focus:ring focus:ring-orange-600",
    grade: 3,
  },
  blue: {
    background:
      "text-white bg-blue-400 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-600",
    grade: 4,
  },
  purple: {
    background:
      "text-white bg-purple-400 hover:bg-purple-600 active:bg-purple-700 focus:outline-none focus:ring focus:ring-purple-600",
    grade: 5,
  },
  red: {
    background:
      "text-white bg-red-400 hover:bg-red-600 active:bg-red-700 focus:outline-none focus:ring focus:ring-red-600",
    grade: 6,
  },
  black: {
    background:
      "text-white bg-gray-700 hover:bg-gray-800 active:bg-gray-900 focus:outline-none focus:ring focus:ring-gray-800",
    grade: 7,
  },
  pink: {
    background:
      "text-white bg-pink-400 hover:bg-pink-600 active:bg-pink-700 focus:outline-none focus:ring focus:ring-pink-600",
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
