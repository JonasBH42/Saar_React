import { Entity } from "typeorm";
import { Enum } from "@types";

@Entity("enum_sirenEvents_status")
export class SirenEventsStatus extends Enum {
  static key = "status";
  static data: SirenEventsStatus[] = [
    { ID: 1, Name: "תקין" },
    { ID: 4, Name: "מושבת" },
    { ID: 7, Name: "תקלת מתח" },
  ];
}
