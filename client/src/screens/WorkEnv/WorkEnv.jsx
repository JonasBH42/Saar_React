import { useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { LoginTwoTone } from "@mui/icons-material";
import { Icon } from "@iconify/react/dist/offline";
import { ENV_COOKIE_NAME } from "@environment";
import Images from "./Images";

function WorkEnv() {
  const [env, setEnv] = useState(null);
  const [envType, setEnvType] = useState(null);

  const { data: workEnvs } = useQuery(
    ["work-envs", { withCredentials: false }],
    {
      placeholderData: [],
      select: (envs) => {
        envs.forEach((env) => {
          env.label = env.name;
          env.header = `${env.workenv} - ${env.name}`;
        });

        return envs;
      },
    }
  );

  const workEnvTypes = Array.from(
    new Set(workEnvs.map(({ workenv }) => workenv))
  );

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Images />
      <Box
        sx={{
          display: "grid",
          placeItems: "center",
          bgcolor: "#FDF4F5",
          opacity: 0.8,
          height: "80%",
          width: "50%",
          borderRadius: 10,
          boxShadow: 10,
          position: "absolute",
        }}
      >
        <Icon
          sx={{ fontSize: "30px", marginRight: "15px" }}
          color="#60c7d6"
          icon="bi:lightning-charge-fill"
        />
        <Box component="h1" sx={{ fontSize: 50, fontFamily: "AlmoniBold" }}>
          סימולטור
        </Box>
        <Box component="h2" sx={{ fontFamily: "AlmoniBold" }}>
          בחרו סוג סביבה
        </Box>
        <Autocomplete
          classes={{ clearIndicator: { float: "left" } }}
          sx={{
            width: "18vw",
          }}
          noOptionsText="לא נמצאו סוגי סביבה"
          clearText="נקה"
          openText="פתח"
          closeText="סגור"
          loadingText="טוען..."
          value={envType}
          onChange={(_event, newEnvType) => {
            setEnv(null);
            setEnvType(newEnvType);
          }}
          options={workEnvTypes}
          renderInput={(params) => (
            <TextField {...params} label="בחרו סוג סביבה" />
          )}
        />
        <Box component="h2" sx={{ fontFamily: "AlmoniBold" }}>
          בחרו סביבה
        </Box>
        <Autocomplete
          classes={{ clearIndicator: { float: "left" } }}
          sx={{
            width: "18vw",
          }}
          disabled={!envType}
          noOptionsText="לא נמצאו סביבות"
          clearText="נקה"
          openText="פתח"
          closeText="סגור"
          loadingText="טוען..."
          value={env}
          onChange={(_event, newEnv) => {
            setEnv(newEnv);
          }}
          options={workEnvs.filter(({ workenv }) => workenv === envType)}
          renderInput={(params) => <TextField {...params} label="בחרו סביבה" />}
        />
        <Box sx={{ paddingTop: 10 }}>
          <Link
            style={{
              pointerEvents: !env ? "none" : "auto",
              textDecoration: "none",
            }}
            to={`../home`}
          >
            <Button
              sx={{
                fontFamily: "AlmoniBold",
                fontSize: 20,
                bgcolor: "#AD230E",
                ":hover": {
                  bgcolor: "#AD230E",
                },
              }}
              onClick={() => {
                Cookies.set(ENV_COOKIE_NAME, JSON.stringify(env));
              }}
              disabled={!env}
              variant="contained"
              endIcon={<LoginTwoTone sx={{ paddingRight: 3 }} />}
            >
              כניסה
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}

export default WorkEnv;
