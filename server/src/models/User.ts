import * as _ from 'lodash';
import {BeforeValidate, Column, Model, Table, Validate} from 'sequelize-typescript';

@Table({tableName: 'user'})
export default class User extends Model<User> {

  @Column({unique: true, allowNull: false})
  userName: string;

  @Validate({isEmail: true})
  @Column({unique: true, allowNull: false})
  email: string;

  @Column
  firstName: string;

  @Column
  lastName: string;

  // @HasMany(() => Passport, {foreignKey: {allowNull: false, name: 'userId'}, onDelete: 'CASCADE'})
  // passports: Passport[];

  @BeforeValidate
  static _beforeValidate(user: User) {
    if (_.isEmpty(user.userName)) {
      user.userName = user.email;
    }
  }
}
