import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { styled } from "@mui/material/styles";
import {
  Divider,
  Button,
  ButtonGroup,
  Drawer as MuiDrawer,
} from "@mui/material";
import { Icon } from "@iconify/react/dist/offline";
import { extractFromRoute } from "@services";
import { ExitWithDialog } from "@components";
import { formValuesState } from "@states";
import { FULL_WIDTH, IS_DRAWER_EXPANDED_ON_START } from "@constants";
import AppBottom from "./AppBottom";
import AppHeader from "./AppHeader";
import { modules } from "./modules";
import "./SideDrawer.css";

const MODULE_ROUTE_LOCATION = 2;

const drawerAnimation = (width = FULL_WIDTH) => ({
  width,
  transition: "width 200ms",
});

const DrawerHeader = styled("div")(() => ({
  display: "flex",
  flexDirection: "row-reverse",
  alignItems: "center",
  justifyContent: "flex-end",
  height: "6%",
  padding: 0,
  "@media(max-height: 750px)": {
    height: "10%",
  },
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "expanded",
})(({ expanded, width }) => ({
  width: width,
  ...(!expanded && {
    ...drawerAnimation(),
    "& .MuiDrawer-paper": drawerAnimation(width),
  }),
  ...(expanded && {
    ...drawerAnimation(),
    "& .MuiDrawer-paper": drawerAnimation(),
  }),
}));

const ButtonsContainer = styled("div")(() => ({
  display: "flex",
  height: "94%",
  "@media(maxHeight: 750px)": {
    height: "89%",
  },
  "@media(maxHeight: 350px)": {
    height: "auto",
  },
}));

function SideDrawer({ children, drawerWidth }) {
  const [isExpanded, setIsExpanded] = useState(IS_DRAWER_EXPANDED_ON_START);
  const { pathname } = useLocation();
  const selectedModule = extractFromRoute(pathname, MODULE_ROUTE_LOCATION);
  const { isDirty, isSubmitSuccessful } = useRecoilValue(formValuesState);
  

  const handleDrawerChange = () => {
    setIsExpanded((prev) => !prev);
  };

  const resetExpanded = () => {
    if (isExpanded) setIsExpanded(false);
  };

  return (
    <Drawer
      variant="permanent"
      expanded={isExpanded}
      anchor="right"
      width={drawerWidth}
    >
      <DrawerHeader>
        <AppHeader />
      </DrawerHeader>
      <Divider />

      <ButtonsContainer>
        <div className="flex-column">
          <ButtonGroup
            orientation="vertical"
            variant=""
            style={{ height: "100%" }}
          >
            <div
              className="flex-column"
              style={{ justifyContent: "space-between", height: "100%" }}
            >
              <div className="flex-column">
                {modules.map((module) => {
                  return (
                    <ExitWithDialog
                      key={module.key}
                      isDirty={isDirty}
                      isSubmitted={isSubmitSuccessful}
                      closeLink={module.key}
                      resetExpanded={resetExpanded}
                    >
                      {(onClick) => (
                        <Button
                          key={module.key}
                          onClick={onClick}
                          className={
                            module.key === selectedModule
                              ? "selected"
                              : "normal"
                          }
                        >
                          {module.icon}
                        </Button>
                      )}
                    </ExitWithDialog>
                  );
                })}
              </div>
            </div>
          </ButtonGroup>

          <Button onClick={handleDrawerChange} className="normal">
            <Icon
              icon={`radix-icons:double-arrow-${isExpanded ? "right" : "left"}`}
            />
          </Button>
        </div>
        <>
          <Divider variant="permanent" orientation="vertical" />
          <div
            className="flex-column"
            style={{ width: "100%", overflow: "auto" }}
          >
            {children}
            <AppBottom />
          </div>
        </>
      </ButtonsContainer>
    </Drawer>
  );
}

export default SideDrawer;
