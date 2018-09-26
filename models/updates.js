"use strict"
module.exports = function(sequelize,DataTypes){
	var UpcomingEvents = sequelize.define("UpcomingEvents",{
		id:{
			type:DataTypes.INTEGER,
			unique:true,
			autoIncrement:true,
			allowNull:false,
			primaryKey:true
		},
		UpcomingEventsDetails:{
			type:DataTypes.STRING,
			unique: true,
			allowNull: false
		}
	},{
    freezeTableName: true
  });
	return UpcomingEvents;

};