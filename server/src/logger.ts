import { createLogger, format, transports } from "winston";
import { Request } from "express";
import { NODE_ENV, LOG_OPTIONS } from "@environment";

export const reqLogPrefix = (req: Request): string => {
  const { ip, path, method } = req;

  return `${path} - ${method} request from IP '${ip}'`;
};

const { colorize } = format.colorize();

const loggerFormat = format.combine(
  format.timestamp({
    format: "DD-MM-YYYY HH:mm:ss",
  }),
  format.printf((info) => {
    return (
      colorize(
        info.level,
        `[${info.timestamp}] [${info.level.toUpperCase()}]: `
      ) + info.message
    );
  }),
  format.uncolorize({
    raw: NODE_ENV === "production",
  })
);

export const logger = createLogger({
  format: loggerFormat,
  level: LOG_OPTIONS.level,
  transports: new transports.Console(),
});

export const errorsStackLogger = createLogger({
  format: format.combine(
    format.errors({ stack: true }),
    format.printf((info) => info.stack)
  ),
  level: "error",
  transports: new transports.Console(),
});

if (LOG_OPTIONS.toFile) {
  logger.add(
    new transports.File({
      filename: LOG_OPTIONS.filename,
      maxsize: LOG_OPTIONS.maxsize,
      maxFiles: LOG_OPTIONS.maxFiles,
    })
  );

  errorsStackLogger.add(
    new transports.File({
      filename: LOG_OPTIONS.errorsFileName,
      maxsize: LOG_OPTIONS.maxsize,
      maxFiles: LOG_OPTIONS.maxFiles,
    })
  );
}

export default logger;
