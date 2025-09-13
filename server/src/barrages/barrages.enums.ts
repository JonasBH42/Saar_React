import { Entity } from "typeorm";
import { Enum } from "@types";

@Entity("enum_missile_category")
export class MissileCategory extends Enum {
  static key = "missileCategory";
  static data: MissileCategory[] = [{ ID: 1, Name: "אוויר" }];
}

@Entity("enum_missile_type")
export class MissileType extends Enum {
  static key = "missileType";
  static data: MissileType[] = [{ ID: 1, Name: "בליסטי" }];
}

@Entity("enum_missile_generator")
export class SourceName extends Enum {
  static key = "sourceName";
  static data: SourceName[] = [{ ID: 1, Name: 'טק"ק' }];
}

@Entity("enum_missile_source_country")
export class SourceCountry extends Enum {
  static key = "sourceCountry";
  static data: SourceCountry[] = [
    { ID: 2003, Name: "לבנון" },
    { ID: 2006, Name: "רצועת עזה" },
    { ID: 2004, Name: "סוריה" },
    { ID: 2016, Name: "איראן" },
    { ID: 2005, Name: "ירדן" },
  ];
}
