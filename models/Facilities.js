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
			allowNull: false
		},
		purpose: {
			type: DataTypes.STRING,
			allowNull: false
		},
		duration: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 6
		},
		heavyMachinery: {
			type: DataTypes.TEXT
		},
		approved: {
			type: DataTypes.ENUM('Yes', 'No'),
			allowNull: false,
			defaultValue: 'No' 
		},
		status: {
			type: DataTypes.ENUM('Access not given', 'Access given', 'Mail sent once', 'Mail sent twice', 'Blacklist', 'Expired'),
			allowNull: false,
			defaultValue: 'Access not given'
		}
	},{
    freezeTableName: true
  });
	return Facilities;
};



		// mailSent: {
		// 	type: DataTypes.ENUM('Yes', 'No'),
		// 	allowNull: false,
		// 	defaultValue: 'No'
		// },