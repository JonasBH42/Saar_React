import L from "leaflet";
import { iconStyleNames } from "@constants";

export const createClusterIcon = (
  icon,
  className = iconStyleNames.cluster.clusterRed
) => {
  return function (cluster) {
    return L.divIcon({
      html: `
        <div style="width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        font-size: small;
        color: white;">
        <span>${cluster.getChildCount()}</span>
          ${icon.options.html}
          </div>`,
      className: className,
      iconSize: null,
      iconAnchor: [20, 20],
    });
  };
};
