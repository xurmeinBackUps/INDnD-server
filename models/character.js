module.exports = function(sequelize, DataType){
    const Character = sequelize.define('character', {
        player:{
            type: DataType.STRING
        },    
        pcName:{
            type: DataType.STRING,
            allowNull: false,
            unique: true,
            foreignKey: true
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
    Character.associate = models => {
        Character.hasOne(models.user, {
            as: 'player',
            foreignKey : 'username'
        }); 
        Character.belongsToMany(models.contract, {
            as: 'PC',
            through: 'party_members',
            foreignKey: 'title'
        }); 
    }
    return Character
};