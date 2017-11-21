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
		},
		department: {
			type: DataTypes.STRING,
			allowNull: false
		},
		projectTitle: {
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
		budget: {
			type: DataTypes.INTEGER
		},
		timeline: {
			type: DataTypes.TEXT
		},
		status: {
			type: DataTypes.ENUM('Completed', 'Ongoing', 'Approved by L1', 'Approved by L2', 'Not yet approved by L1', 'Rejected by L1', 'Rejected by L2'),
			allowNull: false
		},
		mailSent: {
			type: DataTypes.ENUM('No', 'Yes'),
			allowNull: false,
			default: 'No'
		}
	}, {
	freezeTableName: true
	});
	return Projects;
};
