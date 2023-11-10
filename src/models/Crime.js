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
            type: DataTypes.INTEGER,
            allowNull: true, // This can be null if the case is not yet assigned
            references: {
                model: 'Users',
                key: 'id',
            },
        },
        criminalId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Criminals',
                key: 'id',
            }
        },
    });

    Crime.associate = (models) => {
        Crime.belongsTo(models.criminalModel, { foreignKey: 'criminalId', as: 'suspect' });
        Crime.belongsTo(models.userModel, { foreignKey: 'assignedTo', as: 'vigilante' }); 
    };

    return Crime;
};
