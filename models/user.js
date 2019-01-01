module.exports = (sequelize, DataType) => {
    const User = sequelize.define('user', {
        username:{
            type: DataType.STRING,
            allowNull: false,
            unique: true,
            primaryKey: true,  
        },
        pin:{
            type: DataType.INTEGER,
            allowNull: false,
            validate:{
                min : 4,
                max : 6
            }
        },
        email:{
            type: DataType.STRING,
            allowNull: false,
            unique: true,
            foreignKey: true,
            validate:{
                isEmail : true
            }
        }
    });
    User.associate = characters => {
        User.hasMany(characters, {
            foreignKey : 'player',
            sourceKey : 'username'
        })
    },
    User.associate = contracts => {
        User.hasMany(contracts, {
            foreignKey : 'DM',
            sourceKey : 'email'
        })
    }
    return User
};