"use strict"
module.exports=function(sequelize,DataTypes){
    var Gallery = sequelize.define("Gallery",{
        id:{
            type:DataTypes.INTEGER,
            unique:true,
            autoIncrement:true,
            allowNull:false,
            primaryKey:true
        },
        title:{
            type:DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        image: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    },{
    freezeTableName: true
  });
return Gallery;
};