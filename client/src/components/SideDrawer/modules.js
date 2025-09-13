import { Icon } from "@iconify/react/dist/offline";
import { MODULES_ROUTES } from "@constants";

export const modules = [
  {
    key: MODULES_ROUTES.events,
    tooltip: "ארועים",
    icon: <Icon icon="mdi:alert-box-outline" />,
  },
  {
    key: MODULES_ROUTES.forces,
    tooltip: "כוחות",
    icon: <Icon icon="fluent:vehicle" />,
  },
  {
    key: MODULES_ROUTES.sirens,
    tooltip: "צופרים",
    icon: <Icon icon="mdi:bullhorn-outline" />,
  },
  {
    key: MODULES_ROUTES.refua,
    tooltip: "רפואה",
    icon: <Icon icon="icon-park-outline:medicine-chest" />,
  },
  {
    key: MODULES_ROUTES.barrages,
    tooltip: "אליפסות",
    icon: <Icon icon="fluent:rocket-24-regular" />,
  },
];
