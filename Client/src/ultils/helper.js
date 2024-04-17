import icons from "./icons";

const { AiFillStar, AiOutlineStar } = icons;

export const createSlug = (string) =>
  string
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(" ")
    .join("-");
export const formatMoney = (number) =>
  Number(number?.toFixed(1)).toLocaleString();

export const renderStarFromNumber = (number) => {
  if (!Number(number)) return null; // Returning null if number is not a valid number

  const stars = [];
  for (let i = 0; i < number; i++) {
    stars.push(<AiFillStar key={i} color="orange" />);
  }
  for (let i = number; i < 5; i++) {
    stars.push(<AiOutlineStar key={i} color="orange" />);
  }
  return stars;
};

export const generateRage = (start, end) => {
  const length = end + 1 - start;
  return Array.from({ length }, (_, index) => start + index);
};
