import { parseISO, format } from "date-fns";
import utilStyles from "../styles/utils.module.css";

export default function BlogDate({ dateString }) {
  const date = parseISO(dateString);
  if (date == null) {
    return console.log("error dans date");
  } else {
    return (
      <time className={utilStyles.small} dateTime={dateString}>
        {format(date, "dd  MMMM  yyyy")}
      </time>
    );
  }
}
