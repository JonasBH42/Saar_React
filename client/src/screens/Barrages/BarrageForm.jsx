import { useState } from "react";
import { Typography, Switch } from "@mui/material";
import { GenericForm } from "@components";
import { MODULES_ROUTES, SCREEN_ROUTES } from "@constants";
import { barrageFormSchema } from "@constants/formSchemas";

function BarrageForm() {
  const [creatingEvent, setCreatingEvent] = useState({
    isTransferringToOtherForm: false,
    path: "/home/events/new",
  });
  const transferList = [
    { valueName: "district", transfferingTo: ["district"] },
    { valueName: "subDistrict", transfferingTo: ["subDistrict"] },
    { valueName: "latitude", transfferingTo: ["latitude"] },
    { valueName: "longitude", transfferingTo: ["longitude"] },
    { valueName: "sourceName", transfferingTo: ["generator"] },
    {
      valueName: "sendTimeScheduledAt",
      transfferingTo: ["sendTimeScheduledAt", "eventTakesPlaceAt"],
    },
  ];

  return (
    <>
      <div>
        <GenericForm
          route={MODULES_ROUTES.barrages}
          formSchema={barrageFormSchema}
          title="יצירת מטח"
          closeLink={`/${SCREEN_ROUTES.home}/${MODULES_ROUTES.barrages}`}
          method={"POST"}
          transferOperationValues={creatingEvent}
          transferredValuesNames={transferList}
        />
        <Typography sx={{ padding: "0 80px" }}>
          האם ליצור אירוע?
          <Switch
            checked={creatingEvent.isTransferringToOtherForm}
            onChange={() =>
              setCreatingEvent((values) => ({
                ...values,
                isTransferringToOtherForm:
                  !creatingEvent.isTransferringToOtherForm,
              }))
            }
          />
        </Typography>
      </div>
    </>
  );
}
export default BarrageForm;
