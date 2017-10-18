"use strict"
module.exports = function(sequelize, DataTypes){
	var Teams = sequelize.define("Teams", {
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		rollNo: {
			type: DataTypes.STRING
			allowNull: false
		}
	}, {
	freezeTableName: true
	});
	Teams.associate = function(models) {
		Teams.belongTo(models.Projects, {
			onDelete: "CASCADE",
			foreignKey: {
				allowNull: false
			}
		});
	}
	return Teams;
};