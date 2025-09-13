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
import {
  IsDateString,
  IsOptional,
  IsString,
  IsLatitude,
  IsLongitude,
  IsUUID,
  IsInt,
} from "class-validator";
import { ForceType } from "./forces.enums";

@Entity({
  name: "forces",
  orderBy: { FORCE_IP: "ASC", sendTimeScheduledAt: "ASC", createdAt: "ASC" },
})
export class Force {
  @PrimaryGeneratedColumn("uuid")
  @IsOptional()
  @IsUUID()
  uid: string;

  @Column()
  @IsString()
  FORCE_IP: string;

  @Column()
  @IsString()
  FORCE_UNIT: string;

  @Column()
  @IsString()
  VEHICLE_NUM: string;

  @ManyToOne(() => ForceType)
  @JoinColumn({ name: "FORCE_TYPE" })
  @Column()
  FORCE_TYPE: ForceType;

  @Column()
  @IsString()
  UNIT_TYPE: string;

  @Column("numeric")
  @IsLongitude()
  longitude: number;

  @Column("numeric")
  @IsLatitude()
  latitude: number;

  @Column("timestamp with time zone")
  @IsDateString()
  TIME: Date;

  @Column({ type: "character varying", nullable: true })
  @IsOptional()
  @IsString()
  EVENT_NUM?: string | null;

  @Column({ type: "character varying", nullable: true })
  @IsOptional()
  @IsString()
  DISTRICT_NAME?: string | null;

  @Column({ type: "character varying", nullable: true })
  @IsOptional()
  @IsString()
  MACHINE_TYPE?: string | null;

  @Column({ type: "character varying", nullable: true })
  @IsOptional()
  @IsString()
  STATION_NAME?: string | null;

  @Column({ type: "character varying", nullable: true })
  @IsOptional()
  @IsString()
  SUBDISTRICT_NAME?: string | null;

  @Column("timestamp with time zone")
  @IsDateString()
  sendTimeScheduledAt: Date;

  @Column({ type: "timestamp with time zone", nullable: true })
  @IsOptional()
  @IsDateString()
  acceptedByDestinationAt?: Date | null;

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

export default Force;
