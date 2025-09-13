import { IsOptional, IsInt, IsString } from "class-validator";
import {
  Entity,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
} from "typeorm";
import { Transform } from "class-transformer";
import { removeNulls } from "@services";
import RefuaReport from "./refuaReport.entity";

@Entity("criticalBeds")
export class CriticalBed {
  @PrimaryColumn()
  @IsInt()
  id: number;

  @Column()
  @IsString()
  hospitalName: string;

  @Column()
  @IsString()
  district: string;

  @Column({ default: 0 })
  @IsOptional()
  @Transform(removeNulls)
  totalNeurosurgery: number;

  @Column({ default: 0 })
  @IsOptional()
  @Transform(removeNulls)
  occupiedNeurosurgery: number;

  @Column({ default: 0 })
  @IsOptional()
  @Transform(removeNulls)
  totalOperatingRooms: number;

  @Column({ default: 0 })
  @IsOptional()
  @Transform(removeNulls)
  occupiedOperatingRooms: number;

  @Column({ default: 0 })
  @IsOptional()
  @Transform(removeNulls)
  totalIcuChildren: number;

  @Column({ default: 0 })
  @IsOptional()
  @Transform(removeNulls)
  occupiedIcuChildren: number;

  @Column({ default: 0 })
  @IsOptional()
  @Transform(removeNulls)
  totalIcuAdult: number;

  @Column({ default: 0 })
  @IsOptional()
  @Transform(removeNulls)
  occupiedIcuAdult: number;

  @Column({ default: 0 })
  @IsOptional()
  @Transform(removeNulls)
  totalTraumaBeds: number;

  @Column({ default: 0 })
  @IsOptional()
  @Transform(removeNulls)
  occupiedTraumaBeds: number;

  @Column({ default: 0 })
  @IsOptional()
  @Transform(removeNulls)
  totalEmergencyDepartments: number;

  @Column({ default: 0 })
  @IsOptional()
  @Transform(removeNulls)
  occupiedEmergencyDepartments: number;

  @Column({ default: 0 })
  @IsOptional()
  @Transform(removeNulls)
  totalOrthopedics: number;

  @Column({ default: 0 })
  @IsOptional()
  @Transform(removeNulls)
  occupiedOrthopedics: number;

  @Column({ default: 0 })
  @IsOptional()
  @Transform(removeNulls)
  totalSurgery: number;

  @Column({ default: 0 })
  @IsOptional()
  @Transform(removeNulls)
  occupiedSurgery: number;

  @PrimaryColumn()
  @ManyToOne(() => RefuaReport, (report) => report.criticalBedsData, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "reportUid" })
  reportUid: string;

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

export default CriticalBed;
