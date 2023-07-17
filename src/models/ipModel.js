const { sequelize, DataTypes } = require("../database/database");

const IpList = sequelize.define(
  "ipList",
  {
    ipData: {
      type: DataTypes.JSON,
      allowNull: false,
      ipAddress: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isoCode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      countryName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      regionName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cityName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      latitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      longitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      countryFlag: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      currency: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    isFavourited: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isBanned: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = IpList;
