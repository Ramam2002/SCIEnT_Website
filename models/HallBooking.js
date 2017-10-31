"use strict"
module.exports = function(sequelize, DataTypes) {
	var HallBooking = sequelize.define("HallBooking", {
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
			allowNull: false
		},
		attendeesNumber: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		date: {
			type: DataTypes.STRING,
			allowNull: false
		},
		startTime: {
			type: DataTypes.STRING,
			allowNull: false
		},
		endTime: {
			type: DataTypes.STRING,
			allowNull: false
		},
		approvedStartTime: {
			type: DataTypes.STRING,
			allowNull: false
		},
		approvedEndTime: {
			type: DataTypes.STRING,
			allowNull: false
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
	return HallBooking;
};