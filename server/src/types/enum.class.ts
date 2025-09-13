import { Column, PrimaryColumn } from "typeorm";

export default class Enum {
  @PrimaryColumn()
  ID: number;

  @Column({ unique: true })
  Name: string;

  static key: string;
  static data: Enum[];
}
