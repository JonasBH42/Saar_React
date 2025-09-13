import { IsOptional, IsString, IsUUID, IsInt, IsDate } from "class-validator";
import { Transform } from "class-transformer";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from "typeorm";
import { convertDates } from "@services";
import CriticalBed from "./criticalBeds.entity";
import EdSnapshot from "./edSnapshot.entity";

enum typeEnums {
  criticalBeds = "beds",
  edSnapshots = "malrad",
}

@Entity("refuaReports")
export class RefuaReport {
  @PrimaryGeneratedColumn("uuid")
  @IsOptional()
  @IsUUID()
  uid: string;

  @Column()
  @IsString()
  reportName: string;

  @Column({ type: "enum", enum: typeEnums })
  type: string;

  @Column({ type: "timestamp with time zone" })
  @Transform(convertDates)
  @IsDate()
  sendTimeScheduledAt: Date;

  @Column({ type: "timestamp with time zone", nullable: true })
  @Transform(convertDates)
  @IsOptional()
  @IsDate()
  acceptedByDestinationAt?: Date | null;

  @Column()
  @IsInt()
  workEnvironmentId: number;

  @OneToMany(() => EdSnapshot, (edSnapshot) => edSnapshot.reportUid, {
    cascade: true,
  })
  edSnapshotsData: EdSnapshot[];

  @OneToMany(() => CriticalBed, (criticalBed) => criticalBed.reportUid, {
    cascade: true,
  })
  criticalBedsData: CriticalBed[];

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

export default RefuaReport;
