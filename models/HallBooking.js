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
		hallnumber: {
			type:DataTypes.STRING,
			allowNull: false
		},
		attendeesNumber: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		purpose: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		startDate: {
			type: DataTypes.DATE,
			allowNull: false
		},
		startTime: {
			type: DataTypes.TIME,
			allowNull: false
		},
		endDate: {
			type: DataTypes.DATE,
			allowNull: false
		},
		endTime: {
			type: DataTypes.TIME,
			allowNull: false
		},
		startTimestamp: {
			type: DataTypes.DATE,
			allowNull: false
		},
		endTimestamp: {
			type: DataTypes.DATE,
			allowNull: false
		},
		approvedStartTime: {
			type: DataTypes.TIME,
			allowNull: false
		},
		approvedEndTime: {
			type: DataTypes.TIME,
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