import { Injectable } from '@nestjs/common';
import { Column, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'cars',
  timestamps: false,
})
export class Car extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    allowNull: false,
  })
  model: string;

  @Column({
    allowNull: false,
  })
  year: number;
}
