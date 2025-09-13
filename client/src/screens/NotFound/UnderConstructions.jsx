import { Icon } from "@iconify/react/dist/offline";
import "./NotFound.css";

function UnderConstructions() {
  return (
    <div className="container">
      <span className="title">בקרוב...</span>
      <span className="subtitle">אנחנו עובדים על זה</span>
      <span className="title" style={{ marginTop: "35px", color: "slategrey" }}>
        <Icon icon="ion:construct-outline" />
      </span>
    </div>
  );
}

export default UnderConstructions;
