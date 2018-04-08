"use strict"
module.exports = function(sequelize,DataTypes){
	var inventory = sequelize.define("inventory",{
		id: {
			type: DataTypes.INTEGER,
			unique: true,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true

		},
		productCode: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false

		},
		descriptionInventory: {
			type: DataTypes.STRING,
			allowNull: false
		},
		unit: {
			type: DataTypes.STRING,
			allowNull: false
		},
		quantity:{
			type: DataTypes.INTEGER,
			allowNull: false
		},
		price :{
			type: DataTypes.FLOAT,
			allowNull: false

		},
		vendorName :{
			type: DataTypes.STRING,
			allowNull: false,
			unique: true

		},
		billNumber:{
			type: DataTypes.STRING,
			unique: true,
			allowNull: false


		},
		billDate: {
			type: DataTypes.DATE,
			allowNull: false
		},
		billDescription: {
			type: DataTypes.STRING,
			allowNull: false
		},
		billUnit: {
			type: DataTypes.STRING,
			allowNull: false

		},
		billQuantity: {
			type: DataTypes.INTEGER,
			allowNull: false

		},
		billAmount: {
			type: DataTypes.DOUBLE,
			allowNull: false
		},
		remarks :{
			type: DataTypes.STRING,
			allowNull: false
		},
    }, {
    freezeTableName: true
    });
    return inventory;
};