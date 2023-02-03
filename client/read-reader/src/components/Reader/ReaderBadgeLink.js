import { Link } from "react-router-dom";

import ReaderBadge from "./ReaderBadge";

const linkStyle = {
  textDecoration: "none",
  color: "black",
};

const ReaderBadgeLink = (props) => {
  const linkPath = "/reader/" + props.id;

  return (
    <Link to={linkPath} style={linkStyle}>
      <ReaderBadge
        // minutesRead={props.minutesRead}
        // coinsEarned={props.coinsEarned}
        readerName={props.readerName}
        themeColor={props.themeColor}
      />
    </Link>
  );
};

export default ReaderBadgeLink;
