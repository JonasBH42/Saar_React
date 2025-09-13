import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
} from "typeorm";
import { IsString, IsInt } from "class-validator";

@Entity({
  name: "custom_filters",
})
export class CustomFilter {
  @PrimaryColumn()
  @IsInt()
  filterId: number;

  @PrimaryColumn()
  @IsInt()
  id: number;

  @Column()
  @IsString()
  name: string;

  @Column()
  @IsString()
  columnField: string;

  @Column()
  @IsString()
  operatorValue: string;

  @Column()
  @IsString()
  value: string;

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

export default CustomFilter;
