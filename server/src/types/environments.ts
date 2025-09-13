export type logOptions = Readonly<{
  filename: string;
  errorsFileName: string;
  level: string;
  maxsize: number;
  maxFiles: number;
  toFile: boolean;
}>;

export type ormConfig = Readonly<{
  username: string;
  password: string | undefined;
  database: string;
  schema: string;
  host: string;
  type: any;
  synchronize: boolean;
  ssl: boolean;
}>;

export type nodeEnv = "development" | "test" | "production";
