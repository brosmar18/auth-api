'use strict';

module.exports = (Sequelize, DataTypes) => {
    const Criminal = Sequelize.define('Criminal', {
        alias: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        realName: {
            type: DataTypes.STRING,
            allowNull: true, 
        },
        crimes: {
            type: DataTypes.ARRAY(DataTypes.STRING), // Assuming PostgreSQL
            allowNull: true,
        },
        status: {
            type: DataTypes.ENUM('at large', 'captured'),
            defaultValue: 'at large',
        }
    });

    return Criminal;
};