import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import localizedFormat from "dayjs/plugin/localizedFormat";
import utc from "dayjs/plugin/utc";

dayjs.extend(duration);
dayjs.extend(localizedFormat);
dayjs.extend(utc);

export default dayjs;
