"use strict"
module.exports = function(sequelize,DataTypes){
    var Announcements = sequelize.define("Announcements",{
        id:{
            type:DataTypes.INTEGER,
            unique:true,
            autoIncrement:true,
            allowNull:false,
            primaryKey:true
        },
        Text:{
            type:DataTypes.STRING,
            unique: false,
            allowNull: false
        }

    },{
    freezeTableName: true
  });
    return Announcements;

};