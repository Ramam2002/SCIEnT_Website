"use strict"
module.exports = function(sequelize, DataTypes){
	var Projects = sequelize.define("Projects", {
		id: {
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			allowNull: false,
			autoIncrement: true
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		rollNo: {
			type: DataTypes.STRING,
			allowNull: false
		}
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
		visibility: {
			type: DataTypes.ENUM('open', 'closed'),
			allowNull: false
		},
		abstract: {
			type: DataTypes.STRING
		},
		timeline: {
			type: DataTypes.STRING
		}
	}, {
	freezeTableName: true
	});
	return Projects;
};
