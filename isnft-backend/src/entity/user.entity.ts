import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum USER_TPYE {
  METAMASK = 'METAMASK',
  EMAIL = 'EMAIL',
}

@Entity({ name: 't_user' })
export class User {
  @PrimaryColumn()
  user_id: string;

  @Column()
  user_nm: string;

  @Column()
  user_pw?: string;

  @Column({
    type: 'enum',
    enum: USER_TPYE,
    default: USER_TPYE.METAMASK,
  })
  user_type: USER_TPYE;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  modified_at: Date;
}
