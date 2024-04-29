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

// export const validate = (payload, setinvalidFields) => {
//   let invalids = 0
//   const formatPayload = Object.entries(payload)
//   for ( let arr of formatPayload){
//     if(arr[1].trim() === '')
//     invalids++
//     setinvalidFields(prev => [...prev, {name: arr[0], mes: 'Required this filed'}])
//   }
//   return invalids
// }
export const validate = (payload, setinvalidFields) => {
  let invalids = 0;
  const formatPayload = Object.entries(payload);
  for (let arr of formatPayload) {
    if (arr[1].trim() === "") {
      invalids++;
      setinvalidFields((prev) => [
        ...prev,
        { name: arr[0], mes: "Required this field" },
      ]);
    }
  }
  for (let arr of formatPayload) {
    switch (arr[0]) {
      case "email":
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!arr[1].match(regex)) {
          invalids++;
          setinvalidFields((prev) => [
            ...prev,
            { name: arr[0], mes: "Email invalid" },
          ]);
        }
        break;
      case "password":
        const regexpassword = /^(?=.*[A-Z])[A-Z0-9]+$/;
        if (!regexpassword.test(arr[1]) || arr[1].length < 10) {
          invalids++;
          setinvalidFields((prev) => [
            ...prev,
            {
              name: arr[0],
              mes: "Password must be at least 10 characters long and contain at least one uppercase letter.",
            },
          ]);
        }
        break;

      case "mobile":
        const regexMobile = /^[0-9 +\-()]+$/;
        if (!regexMobile.test(arr[1]) || arr[1].length < 10) {
          invalids++;
          setinvalidFields((prev) => [
            ...prev,
            {
              name: arr[0],
              mes: "Mobile number must be at least 10 digits long.",
            },
          ]);
        }
        break;

      default:
        break;
    }
  }
  return invalids;
};

export function getBase64(file) {
  if (!file) return "";
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
