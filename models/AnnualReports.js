"use strict"
module.exports=function(sequelize,DataTypes){
    var AnnualReports = sequelize.define("AnnualReports",{
        id:{
            type:DataTypes.INTEGER,
            unique:true,
            autoIncrement:true,
            allowNull:false,
            primaryKey:true
        },
        fileName:{
            type:DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        year:{
            type:DataTypes.INTEGER,
            len:[1, 4],
            unique: true,
            allowNull: false
        },
        fileLocation: {
            type: DataTypes.STRING,
            // allowNull: false
        }
    },{
    freezeTableName: true
  });
    return AnnualReports;
};