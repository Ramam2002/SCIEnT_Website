"use strict"
module.exports = function(sequelize, DataTypes){
    var AdminProjects = sequelize.define("AdminProjects", {
        id: {
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			allowNull: false,
			autoIncrement: true
        },
        projectImage: {
            type: DataTypes.STRING,
            allowNull: true
        },
        projectTitle: {
            type: DataTypes.STRING,
            allowNull: false
        },
        projectDesc: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        year: {
            type: DataTypes.DATE    ,
            allowNull: false
        }
    },{
        freezeTableName : true
    });
    return AdminProjects;
}