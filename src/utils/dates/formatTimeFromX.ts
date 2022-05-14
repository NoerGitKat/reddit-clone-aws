import dayjs from "./config";

const formatTimeFromX = (date: string) => {
  return dayjs().to(date);
};

export default formatTimeFromX;
