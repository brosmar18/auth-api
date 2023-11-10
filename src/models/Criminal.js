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
        status: {
            type: DataTypes.ENUM('at large', 'captured'),
            defaultValue: 'at large',
        }
    });

    Criminal.associate = (models) => {
        Criminal.hasMany(models.crimeModel, { foreignKey: 'criminalId', as: 'crimes' });
    };

    return Criminal;
};