import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table
export class StorageModel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @PrimaryKey
  @Column
  docId: number;

  @Column
  title: string;

  @Column
  content: string;
}
