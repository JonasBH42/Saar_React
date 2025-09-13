import { MODULES_ROUTES } from "@constants";
import RefuaReport from "./RefuaReport";
const MALRAD_TITLE = 'דוחות רפואה - מלר"ד';
const CRITBEDS_TITLE = "דוחות רפואה - מיטות קריטיות";

function RefuaStatusReport() {
    return (
      <div
        style={{
          paddingTop: "150px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          maxHeight: "80vh",
        }}
      >
        <RefuaReport API_ROUTE={MODULES_ROUTES.refua} title={MALRAD_TITLE} type={"malrad"} />
        <RefuaReport API_ROUTE={MODULES_ROUTES.refua} title={CRITBEDS_TITLE} type={"beds"} />
      </div>
    );
  }

  export default RefuaStatusReport;