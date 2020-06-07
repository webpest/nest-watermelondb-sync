import { BeforeInsert, BeforeUpdate, Column, PrimaryColumn } from 'typeorm';
import { v4 as uuid4 } from 'uuid';

export abstract class AbstractSynchronizable {
  @PrimaryColumn()
  id: string;

  @Column()
  deleted: boolean;

  @Column({ type: 'datetime' })
  lastModifiedAt: Date;

  @Column({ type: 'datetime' })
  serverCreatedAt: Date;

  constructor() {
    this.id = uuid4();
    this.deleted = false;
  }

  @BeforeInsert()
  beforeInsert() {
    if (!this.lastModifiedAt) {
      this.lastModifiedAt = new Date();
    }
  }

  @BeforeUpdate()
  beforeUpdate() {
    this.lastModifiedAt = new Date();
  }
}