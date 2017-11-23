"use strict"
module.exports = function(sequelize, DataTypes){
	var RemarksByLevelTwo = sequelize.define("RemarksByLevelTwo", {
		remark: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		remarker: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
	freezeTableName: true
	});
	RemarksByLevelTwo.associate = function(models) {
		RemarksByLevelTwo.belongsTo(models.Projects, {
			onDelete: "CASCADE",
			foreignKey: {
				allowNull: false
			}
		});
	}
	return RemarksByLevelTwo;
};