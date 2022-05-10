import dayjs from "./config";

const formatDate = (date: string, format: string) => {
  return dayjs(date).format(format);
};

export default formatDate;
