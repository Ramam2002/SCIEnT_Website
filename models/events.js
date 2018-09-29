"use strict"
module.exports = function(sequelize,DataTypes){
	var OngoingEvents = sequelize.define("OngoingEvents",{
		id:{
			type:DataTypes.INTEGER,
			unique:true,
			autoIncrement:true,
			allowNull:false,
			primaryKey:true
		},
		OngoingEventsDetails:{
			type:DataTypes.STRING,
			unique: false,
			allowNull: false
		}
	},{
    freezeTableName: true
  });
	return OngoingEvents;

};