import { Entity } from "typeorm";
import { Enum } from "@types";

@Entity("enum_force_forceType")
export class ForceType extends Enum {
  static key = "FORCE_TYPE";
  static data: ForceType[] = [
    { ID: 1, Name: "אוטובוס" },
    { ID: 2, Name: "אמבולנס" },
    { ID: 3, Name: "בעל תפקיד" },
    { ID: 4, Name: 'חפ"ק' },
    { ID: 5, Name: "טרקטור" },
    { ID: 6, Name: "כבאית" },
    { ID: 7, Name: "פיקוד העורף" },
    { ID: 8, Name: "תובלה" },
    { ID: 9, Name: "ניידת משטרה" },
    { ID: 10, Name: "סייר בטחון" },
    { ID: 11, Name: "סייר חינוך" },
    { ID: 12, Name: "פקח" },
    { ID: 13, Name: 'קב"ט' },
    { ID: 14, Name: "קטנוע בטחון" },
    { ID: 15, Name: "קטנוע חינוך" },
    { ID: 16, Name: "תברואה" },
    { ID: 17, Name: "מתנדב" },
    { ID: 18, Name: "עוקב מים" },
    { ID: 19, Name: "מאבטח" },
    { ID: 20, Name: "רחפן" },
    { ID: 21, Name: "עובד רווחה" },
    { ID: 22, Name: "אחר" },
  ];
}
