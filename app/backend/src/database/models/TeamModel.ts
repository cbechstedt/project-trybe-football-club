import { DataTypes, Model } from 'sequelize';
import db from '.';
// import OtherModel from './OtherModel';

class TeamModel extends Model {
  declare id: number;
  declare teamName: string;
}

TeamModel.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  team_name: {
    allowNull: false,
    type: DataTypes.STRING,
  }
}, {
  tableName: 'teams',
  underscored: true,
  sequelize: db,
  timestamps: false,
});

export default TeamModel;
