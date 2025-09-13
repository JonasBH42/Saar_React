import { IsOptional, IsInt, IsString } from "class-validator";
import { Transform } from "class-transformer";
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
import { removeNulls } from "@services";
import RefuaReport from "./refuaReport.entity";

@Entity("edSnapshots")
export class EdSnapshot {
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
  severelyInjuredCivics: number;

  @Column({ default: 0 })
  @IsOptional()
  @Transform(removeNulls)
  moderatelyInjuredCivics: number;

  @Column({ default: 0 })
  @IsOptional()
  @Transform(removeNulls)
  slightlyInjuredCivics: number;

  @Column({ default: 0 })
  @IsOptional()
  @Transform(removeNulls)
  anxietyInjuredCivics: number;

  @Column({ default: 0 })
  @IsOptional()
  @Transform(removeNulls)
  casualtiesCivics: number;

  @Column({ default: 0 })
  @IsOptional()
  @Transform(removeNulls)
  severelyInjuredMilitary: number;

  @Column({ default: 0 })
  @IsOptional()
  @Transform(removeNulls)
  moderatelyInjuredMilitary: number;

  @Column({ default: 0 })
  @IsOptional()
  @Transform(removeNulls)
  slightlyInjuredMilitary: number;

  @Column({ default: 0 })
  @IsOptional()
  @Transform(removeNulls)
  anxietyInjuredMilitary: number;

  @Column({ default: 0 })
  @IsOptional()
  @Transform(removeNulls)
  casualtiesMilitary: number;

  @PrimaryColumn()
  @ManyToOne(() => RefuaReport, (report) => report.edSnapshotsData, {
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

export default EdSnapshot;
