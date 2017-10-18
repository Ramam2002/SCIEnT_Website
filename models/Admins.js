"use strict"
module.exports=function(sequelize,DataTypes){
	var Admins = sequelize.define("Admins",{
		id:{
			type:DataTypes.INTEGER,
			unique:true,
			autoIncrement:true,
			allowNull:false,
			primaryKey:true
		},
		adminName:{
			type:DataTypes.STRING,
			unique: true,
			allowNull: false
		},
		password:{
			type:DataTypes.STRING,
			allowNull: false
		},
		adminLevel: {
			type: DataTypes.STRING,
			allowNull: false
		}
	},{
    freezeTableName: true
  });
	return Admins;
};