"use strict"
module.exports = function(sequelize,DataTypes){
	var Vendors = sequelize.define("Vendors",{
		id: {
			type: DataTypes.INTEGER,
			unique: true,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true

		},
		vendorName :{
			type: DataTypes.STRING,
			allowNull: false

		},
		vendorEmail :{
			type: DataTypes.STRING,
			allowNull: false

		},
		vendorAddress :{
			type: DataTypes.STRING,
			allowNull: false

		},
		vendorPhone :{
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		}
		
    }, {
    freezeTableName: true
    });
    return Vendors;
};