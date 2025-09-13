import { IsInt, IsOptional, IsString, IsUUID } from "class-validator";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  DeleteDateColumn,
} from "typeorm";

@Entity("trafficJams")
export class TrafficJam {
  @PrimaryGeneratedColumn("uuid")
  @IsOptional()
  @IsUUID()
  uid: string;

  @Column()
  @IsString()
  name: string;

  @Column()
  @IsString()
  color: string;

  @Column()
  @IsString()
  positions: string;

  @Column({ type: "timestamp with time zone", nullable: true })
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

export default TrafficJam;
