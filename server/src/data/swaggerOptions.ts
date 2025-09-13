import { SIMULATOR_API_URLS } from "@environment";

const getServers = () => {
  return SIMULATOR_API_URLS.map((url) => ({
    url: url + "/api",
  }));
};

export const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Saar Simulator API",
      version: "1.0.0",
      description: "This is a REST API for Saar Simulator.",
    },
    servers: getServers(),
  },

  apis: ["./src/router.ts"],
};
