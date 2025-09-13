import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import {
  IsBoolean,
  IsDate,
  IsInt,
  IsOptional,
  IsString,
  IsLatitude,
  IsLongitude,
  Min,
  Max,
  IsUUID,
  Matches,
  IsNumber,
} from "class-validator";
import { Transform } from "class-transformer";
import { DEFAULT_EVENT_CALENDER } from "@environment";
import { authorizedCalenderRegex, eventManagerCalenderRegex } from "@data";
import { convertDates, removeNulls } from "@services";
import {
  DamageLevel,
  EventStatus,
  EventType,
  Generator,
  LifeSavingPotential,
  ReportingSource,
  StructureType,
  TreatmentStatus,
} from "./events.enums";

@Entity({
  name: "events",
  orderBy: { simulatorId: "ASC", sendTimeScheduledAt: "ASC", createdAt: "ASC" },
})
export class Event {
  @PrimaryGeneratedColumn("uuid")
  @IsOptional()
  @IsUUID()
  uid: string;

  @Column({ update: false })
  @IsOptional()
  @IsInt()
  simulatorId: number;

  @Column()
  @IsString()
  name: string;

  @ManyToOne(() => EventType)
  @JoinColumn({ name: "type" })
  @Column()
  type: EventType;

  @ManyToOne(() => Generator)
  @JoinColumn({ name: "generator" })
  @Column()
  generator: Generator;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @ManyToOne(() => EventStatus)
  @JoinColumn({ name: "status" })
  @Column()
  status: EventStatus;

  @Column({ default: 0 })
  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(0)
  @Max(5)
  importance: number;

  @Column("timestamp with time zone")
  @Transform(convertDates)
  @IsDate()
  eventTakesPlaceAt: Date;

  @Column({ type: "timestamp with time zone", nullable: true })
  @Transform(convertDates)
  @IsOptional()
  @IsDate()
  eventEndsAt?: Date;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  district?: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  subDistrict?: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  city?: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  street?: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  appartmentNumber?: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  quarter?: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  neighborhood?: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  site?: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  parentEvent?: string;

  @Column({ default: false })
  @Transform(removeNulls)
  @IsOptional()
  @IsBoolean()
  isExactLocation: boolean;

  @Column({ default: false })
  @Transform(removeNulls)
  @IsOptional()
  @IsBoolean()
  isBattalionCenter: boolean;

  @Column({ default: false })
  @Transform(removeNulls)
  @IsOptional()
  @IsBoolean()
  isShownOnMain: boolean;

  @Column({ default: false })
  @Transform(removeNulls)
  @IsOptional()
  @IsBoolean()
  isBuiltArea: boolean;

  @Column({ default: false })
  @Transform(removeNulls)
  @IsOptional()
  @IsBoolean()
  centralCommand: boolean;

  @Column({ default: false })
  @Transform(removeNulls)
  @IsOptional()
  @IsBoolean()
  districtCommand: boolean;

  @Column({ default: false })
  @Transform(removeNulls)
  @IsOptional()
  @IsBoolean()
  subDistrictCommand: boolean;

  @Column({ default: DEFAULT_EVENT_CALENDER })
  @Transform(removeNulls)
  @IsOptional()
  @Matches(eventManagerCalenderRegex)
  eventManagerCalender: string;

  @Column({ default: DEFAULT_EVENT_CALENDER })
  @Transform(removeNulls)
  @IsOptional()
  @Matches(authorizedCalenderRegex)
  authorizedCalender: string;

  @Column({ default: DEFAULT_EVENT_CALENDER })
  @Transform(removeNulls)
  @IsOptional()
  @Matches(authorizedCalenderRegex)
  authorizedCalenderForEdit: string;

  @Column({ default: 0 })
  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsNumber()
  lightInjured: number;

  @Column({ default: 0 })
  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsNumber()
  mediumInjured: number;

  @Column({ default: 0 })
  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsNumber()
  severeInjured: number;

  @Column({ default: 0 })
  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsNumber()
  trapped: number;

  @Column({ default: 0 })
  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsNumber()
  casualties: number;

  @Column({ default: 0 })
  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsNumber()
  anxietyVictims: number;

  @Column("numeric")
  @IsLongitude()
  longitude: number;

  @Column("numeric")
  @IsLatitude()
  latitude: number;

  @ManyToOne(() => ReportingSource)
  @JoinColumn({ name: "reportingSource" })
  @Column()
  reportingSource: ReportingSource;

  @ManyToOne(() => DamageLevel, { nullable: true })
  @JoinColumn({ name: "damageLevel" })
  @Column({ nullable: true })
  damageLevel?: DamageLevel | null;

  @ManyToOne(() => LifeSavingPotential, { nullable: true })
  @JoinColumn({ name: "lifeSavingPotential" })
  @Column({ nullable: true })
  lifeSavingPotential?: LifeSavingPotential | null;

  @ManyToOne(() => TreatmentStatus, { nullable: true })
  @JoinColumn({ name: "treatmentStatus" })
  @Column({ nullable: true })
  treatmentStatus?: TreatmentStatus | null;

  @ManyToOne(() => StructureType, { nullable: true })
  @JoinColumn({ name: "structureType" })
  @Column({ nullable: true })
  structureType?: StructureType | null;

  @Column("timestamp with time zone")
  @Transform(convertDates)
  @IsDate()
  sendTimeScheduledAt: Date;

  @Column({ type: "timestamp with time zone", nullable: true })
  @Transform(convertDates)
  @IsOptional()
  @IsDate()
  acceptedByDestinationAt?: Date | null;

  @Column({ nullable: true })
  @IsOptional()
  @IsInt()
  shualId?: number;

  @Column({ default: false })
  @Transform(removeNulls)
  @IsOptional()
  @IsBoolean()
  isDisabled: boolean;

  @Column({ default: false, update: false })
  @Transform(removeNulls)
  @IsOptional()
  @IsBoolean()
  isVibe: boolean;

  @Column()
  @IsInt()
  workEnvironmentId: number;

  @CreateDateColumn({ type: "timestamp with time zone", update: false })
  createdAt?: Date | null;
  @UpdateDateColumn({ type: "timestamp with time zone", update: false })
  updatedAt?: Date | null;
  @DeleteDateColumn({
    type: "timestamp with time zone",
    update: false,
    select: false,
  })
  deletedAt?: Date | null;
}

export default Event;
