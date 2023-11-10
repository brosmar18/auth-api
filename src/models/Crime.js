'use strict';

module.exports = (Sequelize, DataTypes) => {
    const Crime = Sequelize.define('Crime', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        details: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('open', 'closed', 'investigating'),
            defaultValue: 'open',
        },
        assignedTo: {
            type: DataTypes.STRING,
            allowNull: true, // This can be null if the case is not yet assigned
        }
    });

    return Crime;
};
