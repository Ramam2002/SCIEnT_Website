"use strict"
module.exports = function(sequelize, DataTypes) {
    var Donations = sequelize.define("Donations", {
        id: {
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        contactNumber: {
            type: DataTypes.STRING,
            allowNull: false
        },
        emailID: {
            type: DataTypes.STRING,
            allowNull: false
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        remarks: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        payment_request_id: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        paid: {
            type: DataTypes.ENUM('Yes', 'No'),
            allowNull: false,
            defaultValue: 'No'
        },
        payment_id: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },{
    freezeTableName: true
  });
    return Donations;
};