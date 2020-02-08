"use strict"
module.exports = function(sequelize, Datatypes) {
    var Testimonials = sequelize.define("Testimonials", {
        id: {
            type: Datatypes.INTEGER,
            unique: true,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: Datatypes.STRING,
            allowNull: false
        },
        testimonial: {
            type: Datatypes.TEXT,
            allowNull: false
        }
    },{
        freezeTableName: true
    });
    return Testimonials;
}