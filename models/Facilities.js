"use strict"
module.exports = function(sequelize, DataTypes) {
	var Facilities = sequelize.define("Facilities", {
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
		roll: {
			type: DataTypes.STRING,
			allowNull: false
		},
		department: {
			type: DataTypes.STRING,
			allowNull: false
		},
		contactNumber: {
			type: DataTypes.STRING,
			allowNull: false
		},
		emailID: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false
		},
		purpose: {
			type: DataTypes.STRING,
			allowNull: false
		},
		duration: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		heavyMachinery: {
			type: DataTypes.TEXT
		},
		approved: {
			type: DataTypes.ENUM('Yes', 'No'),
			allowNull: false,
			defaultValue: 'No' 
		},
		mailSent: {
			type: DataTypes.ENUM('Yes', 'No'),
			allowNull: false,
			defaultValue: 'No'
		}
	},{
    freezeTableName: true
  });
	return Facilities;
};