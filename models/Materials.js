"use strict"
module.exports = function(sequelize, DataTypes){
	var Materials = sequelize.define("Materials", {
		materialName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		specification: {
			type: DataTypes.STRING,
			allowNull: true
		},
		quantity: {
			type: DataTypes.INTEGER,
			default: 1
		},
		price: {
			type: DataTypes.INTEGER
		},
		purpose: {
			type: DataTypes.STRING
		},
		vendor: {
			type: DataTypes.STRING
		}
	}, {
	freezeTableName: true
	});
	Materials.associate = function(models) {
		Materials.belongsTo(models.Projects, {
			onDelete: "CASCADE",
			foreignKey: {
				allowNull: false
			}
		});
	}
	return Materials;
};