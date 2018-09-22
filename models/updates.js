"use strict"
module.exports = function(sequelize,DataTypes){
	var updates = sequelize.define("updates",{
		id:{
			type:DataTypes.INTEGER,
			unique:true,
			autoIncrement:true,
			allowNull:false,
			primaryKey:true
		},
		updateDetails:{
			type:DataTypes.STRING,
			unique: true,
			allowNull: false
		}
	},{
    freezeTableName: true
  });
	return updates;

};