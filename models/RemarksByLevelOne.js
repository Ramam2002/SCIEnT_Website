"use strict"
module.exports = function(sequelize, DataTypes){
	var RemarksByLevelOne = sequelize.define("RemarksByLevelOne", {
		remark: {
			type: DataTypes.TEXT,
			allowNull: false
		}
	}, {
	freezeTableName: true
	});
	RemarksByLevelOne.associate = function(models) {
		RemarksByLevelOne.belongsTo(models.Projects, {
			onDelete: "CASCADE",
			foreignKey: {
				allowNull: false
			}
		});
	}
	return RemarksByLevelOne;
};