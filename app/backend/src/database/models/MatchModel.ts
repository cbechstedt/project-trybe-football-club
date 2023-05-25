import { DataTypes, Model } from 'sequelize';
import db from '.';
// import OtherModel from './OtherModel';

class MatchModel extends Model {
  declare id: number;
  declare username: string;
  declare role: string;
  declare email: string;
  declare password: string;
}

MatchModel.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  username: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
}, {
  tableName: 'matches',
  // underscored: true,
  sequelize: db,
  timestamps: false,
  modelName: 'match',
});

export default MatchModel;
