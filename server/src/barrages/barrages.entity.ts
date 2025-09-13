import {
  IsOptional,
  IsUUID,
  IsInt,
  IsDate,
  IsString,
  IsLongitude,
  IsLatitude,
  Min,
  Max,
} from "class-validator";
import { Transform } from "class-transformer";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { convertDates } from "@services";
import { MissileCategory, MissileType, SourceName, SourceCountry } from "./barrages.enums";

@Entity("barrages")
export class Barrage {
  @PrimaryGeneratedColumn("uuid")
  @IsOptional()
  @IsUUID()
  uid: string;

  @Column({ type: "timestamp with time zone" })
  @Transform(convertDates)
  @IsDate()
  sendTimeScheduledAt: Date;

  @Column("numeric")
  @IsLongitude()
  longitude: number;

  @Column("numeric")
  @IsLatitude()
  latitude: number;

  @Column({ default: 0 })
  @Transform(({ value }) => Number(value))
  @IsInt()
  radius1: number;

  @Column({ default: 0 })
  @Transform(({ value }) => Number(value))
  @IsInt()
  radius2: number;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  district?: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  subDistrict?: string;

  @Column({ default: 0 })
  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(0)
  @Max(360)
  azimut: number;

  @ManyToOne(() => SourceName)
  @JoinColumn({ name: "sourceName" })
  @Column()
  sourceName: SourceName;

  @ManyToOne(() => MissileCategory)
  @JoinColumn({ name: "missileCategory" })
  @Column()
  missileCategory: MissileCategory;

  @ManyToOne(() => MissileType)
  @JoinColumn({ name: "missileType" })
  @Column()
  missileType: MissileType;

  @ManyToOne(() => SourceCountry)
  @JoinColumn({ name: "sourceCountry" })
  @Column()
  sourceCountry: MissileType;

  @Column({ default: 0 })
  @Transform(({ value }) => Number(value))
  @IsInt()
  barrageRadius: number;

  @Column({ default: 0 })
  @Transform(({ value }) => Number(value))
  @IsInt()
  vibeEllipsesNumber: number;

  @Column({ default: 0 })
  @Transform(({ value }) => Number(value))
  @IsInt()
  vibeEventsNumber: number;

  @Column({ type: "timestamp with time zone", nullable: true })
  @Transform(convertDates)
  @IsOptional()
  @IsDate()
  acceptedByDestinationAt?: Date | null;

  @Column()
  @IsInt()
  workEnvironmentId: number;

  @CreateDateColumn({ type: "timestamp with time zone", update: false })
  createdAt?: Date;
  @UpdateDateColumn({ type: "timestamp with time zone", update: false })
  updatedAt?: Date;
  @DeleteDateColumn({
    type: "timestamp with time zone",
    update: false,
    select: false,
  })
  deletedAt?: Date | null;
}

export default Barrage;
