module.exports = (sequelize, DataType) => {
    const User = sequelize.define('user', {
        email:{
            type: DataType.STRING,
            unique: true,
            foreignKey: true,
            validate:{
                isEmail : true
            }
        },
        username:{
            type: DataType.STRING,
            allowNull: false,
            unique: true,
            primaryKey: true,  
        },
        password:{
            type: DataType.STRING,
            allowNull: false,
            foreignKey: true,
            validate:{
                min : 8
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