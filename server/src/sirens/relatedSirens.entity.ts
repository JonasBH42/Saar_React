import { IsInt, Min, Max, IsString } from "class-validator";
import {
  Entity,
  UpdateDateColumn,
  CreateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
  Column,
} from "typeorm";
import SirenEvent from "./sirenEvents.entity";

@Entity("relatedSirens")
export class RelatedSiren {
  @PrimaryColumn()
  @IsInt()
  @Min(1)
  @Max(65535)
  mdlc: number;

  @Column()
  @IsString()
  name: string;

  @PrimaryColumn()
  @ManyToOne(() => SirenEvent, (sirenEvent) => sirenEvent.relatedSirens, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "sirenEventId" })
  sirenEventId: string;

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

export default RelatedSiren;
