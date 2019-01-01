module.exports = function(sequelize, DataType){
    const Character = sequelize.define('character', {
        player:{
            type: DataType.STRING,
            allowNull: false,
        },
        pcName:{
            type: DataType.STRING,
            allowNull: false
        },
        level:{
            type: DataType.INTEGER,
            allowNull: false,
        },
        class:{
            type: DataType.ENUM,
            values:[
                'Barbarian',
                'Bard',
                'Cleric',
                'Druid',
                'Fighter',
                'Monk',
                'Paladin',
                'Ranger',
                'Rogue',
                'Sorcerer',
                'Warlock',
                'Wizard'
            ],
            allowNull: false
        },
        subclass:{
            type: DataType.STRING
        }
    });
    Character.associate = user => {
        Character.belongsTo(user, {
            foreignKey : 'player',
            sourceKey : 'username'
        })
    },
    Character.associate = contracts => {
        Character.hasMany(contracts, {
            foreignKey : 'pcName',
            sourceKey : 'title'
        })
    }
    return Character
};