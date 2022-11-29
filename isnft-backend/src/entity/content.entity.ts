import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 't_content' })
export class Content {
  @PrimaryGeneratedColumn('uuid')
  content_id: string;

  @Column()
  content_title: string;

  @Column()
  content_desc: string;

  @Column()
  event_list: string;

  @Column()
  content_url: string;

  @Column()
  isNFT: Boolean;

  @Column()
  content_width: number;

  @Column()
  content_height: number;

  @Column()
  nft_address: string;

  @Column()
  isVerify: Boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  modified_at: Date;

  @Column()
  user_id: string;

  @ManyToOne(() => User, (user) => user.user_id)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
