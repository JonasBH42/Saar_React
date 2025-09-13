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
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { convertDates } from "@services";
import RelatedSiren from "./relatedSirens.entity";
import { SirenEventsStatus } from "./sirens.enums";

@Entity("sirensEvents")
export class SirenEvent {
  @PrimaryGeneratedColumn("uuid")
  @IsOptional()
  @IsUUID()
  uid: string;

  @Column()
  @IsString()
  name: string;

  @Column({ type: "timestamp with time zone" })
  @Transform(convertDates)
  @IsDate()
  sendTimeScheduledAt: Date;

  @ManyToOne(() => SirenEventsStatus, { nullable: true })
  @JoinColumn({ name: "status" })
  @Column({ nullable: true })
  status?: SirenEventsStatus | null;

  @Column({ type: "timestamp with time zone", nullable: true })
  @Transform(convertDates)
  @IsOptional()
  @IsDate()
  acceptedByDestinationAt?: Date | null;

  @Column()
  @IsInt()
  workEnvironmentId: number;

  @OneToMany(() => RelatedSiren, (RelatedSiren) => RelatedSiren.sirenEventId, {
    cascade: true,
  })
  relatedSirens: RelatedSiren[];

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

export default SirenEvent;
