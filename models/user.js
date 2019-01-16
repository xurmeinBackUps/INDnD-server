module.exports = (sequelize, DataType) => {
    const User = sequelize.define('user', {
        username:{
            type: DataType.STRING,
            allowNull: false,
            unique: true,
            foreignKey: true,  
        },
        email:{
            type: DataType.STRING,
            unique: true,
            foreignKey: true,
            validate:{
                isEmail : true
            }
        },
        password:{
            type: DataType.STRING,
            allowNull: false,
            validate:{
                min : 8
            }
        }
    });
    User.associate = models => {
        User.hasMany(models.character, {
            targetKey : 'player',
            sourceKey : 'username'
        });    
    }
    return User
};