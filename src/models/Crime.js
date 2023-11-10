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
        Crime.belongsTo(models.Criminal, { foreignKey: 'criminalId', as: 'suspect' });
        Crime.belongsTo(models.User, { foreignKey: 'assignedTo', as: 'vigilante' }); 
    };

    return Crime;
};
