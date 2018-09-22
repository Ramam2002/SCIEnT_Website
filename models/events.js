"use strict"
module.exports = function(sequelize,DataTypes){
	var events = sequelize.define("events",{
		id:{
			type:DataTypes.INTEGER,
			unique:true,
			autoIncrement:true,
			allowNull:false,
			primaryKey:true
		},
		eventDetails:{
			type:DataTypes.STRING,
			unique: true,
			allowNull: false
		}
	},{
    freezeTableName: true
  });
	return events;

};