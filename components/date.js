import { parseISO, format } from "date-fns";

export default function BlogDate({ dateString }) {
  const date = parseISO(dateString);
  if (date == null) {
    return console.log("error dans date");
  } else {
    return (
      <time dateTime={dateString}>
        Written the {format(date, "dd  MMMM  yyyy")}
      </time>
    );
  }
}
