"use strict"
module.exports = function(sequelize, DataTypes){
	var Services = sequelize.define("Services", {
		serviceName: {
			type: DataTypes.STRING,
			allowNull: false
		},
		specification: {
			type: DataTypes.STRING
		},
		price: {
			type: DataTypes.INTEGER
		}
	}, {
	freezeTableName: true
	});
	Services.associate = function(models) {
		Services.belongsTo(models.Projects, {
			onDelete: "CASCADE",
			foreignKey: {
				allowNull: false
			}
		});
	}
	return Services;
};