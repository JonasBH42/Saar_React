import { Entity } from "typeorm";
import { Enum } from "@types";

@Entity("enum_event_type")
export class EventType extends Enum {
  static key = "type";
  static data: EventType[] = [
    { ID: 1, Name: 'אג"ם/חומ"ס' },
    { ID: 2, Name: 'אג"ם/כימי עמיד' },
    { ID: 3, Name: 'אג"ם/כימי נדיף' },
    { ID: 4, Name: 'אג"ם/הרס' },
    { ID: 5, Name: 'אג"ם/נזק היקפי' },
    { ID: 6, Name: 'אג"ם/שריפה' },
    { ID: 7, Name: 'אג"ם/רציפות תפקודית' },
    { ID: 8, Name: 'אג"ם/ביולוגי' },
    { ID: 9, Name: 'אג"ם/רדיולוגי' },
    { ID: 10, Name: 'אג"ם/הפסד' },
  ];
}

@Entity("enum_event_status")
export class EventStatus extends Enum {
  static key = "status";
  static data: EventStatus[] = [
    { ID: 1, Name: "פתוח" },
    { ID: 2, Name: "סגור" },
    { ID: 3, Name: "מבוטל" },
  ];
}

@Entity("enum_event_generator")
export class Generator extends Enum {
  static key = "generator";
  static data: Generator[] = [
    { ID: 1, Name: 'טק"ק' },
    { ID: 2, Name: 'רק"ק' },
    { ID: 3, Name: "טרור" },
    { ID: 4, Name: "תאונה" },
    { ID: 5, Name: "אסון טבע" },
    { ID: 6, Name: "שברי ירוט" },
    { ID: 7, Name: "לא ידוע" },
    { ID: 8, Name: "אחר" },
    { ID: 9, Name: "רב מוקדי" },
  ];
}

@Entity("enum_event_reportingSource")
export class ReportingSource extends Enum {
  static key = "reportingSource";
  static data: ReportingSource[] = [
    { ID: 1, Name: "פיקוד" },
    { ID: 2, Name: "רשות מקומית" },
    { ID: 3, Name: 'כב"ה' },
    { ID: 4, Name: 'מד"א' },
    { ID: 5, Name: "משטרה" },
  ];
}

@Entity("enum_event_damageLevel")
export class DamageLevel extends Enum {
  static key = "damageLevel";
  static data: DamageLevel[] = [
    { ID: 1, Name: "לא ידוע" },
    { ID: 2, Name: "קל מאד" },
    { ID: 3, Name: "קל" },
    { ID: 4, Name: "בינוני" },
    { ID: 5, Name: "כבד" },
    { ID: 6, Name: "כבד מאד" },
  ];
}

@Entity("enum_event_lifeSavingPotential")
export class LifeSavingPotential extends Enum {
  static key = "lifeSavingPotential";
  static data: LifeSavingPotential[] = [
    { ID: 1, Name: "לא ידוע" },
    { ID: 2, Name: "אפסי" },
    { ID: 3, Name: "נמוך" },
    { ID: 4, Name: "בינוני" },
    { ID: 5, Name: "גבוה" },
  ];
}

@Entity("enum_event_treatmentStatus")
export class TreatmentStatus extends Enum {
  static key = "treatmentStatus";
  static data: TreatmentStatus[] = [
    { ID: 1, Name: "טרם טופל" },
    { ID: 2, Name: "צוות" },
    { ID: 3, Name: "בטיפול" },
    { ID: 4, Name: "טיפול הסתיים" },
  ];
}

@Entity("enum_event_structureType")
export class StructureType extends Enum {
  static key = "structureType";
  static data: StructureType[] = [
    { ID: 1, Name: "בתי חולים" },
    { ID: 2, Name: "לא ידוע" },
    { ID: 3, Name: "מוסד חינוכי" },
    { ID: 4, Name: "מוסד מיוחד" },
    { ID: 5, Name: "פרטי" },
    { ID: 6, Name: "ציבורי" },
    { ID: 7, Name: "תשתית אנרגיה" },
    { ID: 8, Name: "תשתית לאומית אחרת" },
    { ID: 9, Name: "תשתית תחבורה" },
    { ID: 10, Name: "תשתית תקשורת" },
  ];
}
