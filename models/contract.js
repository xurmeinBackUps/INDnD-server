module.exports = function(sequelize, DataType){
    const Contract = sequelize.define('contract', {
        DM:{
            type: DataType.STRING,
            allowNull: false,
            validate:{
                isEmail : true
            }
        },
        title:{
           type: DataType.STRING,
           allowNull: false,
        },
        description:{
            type: DataType.TEXT,
            allowNull: true
        },
        maxPartySize:{ 
            type:DataType.INTEGER,
            allowNull: false
        }
    });
    Contract.associate = user => {
        Contract.belongsTo(user, {
            foreignKey : 'DM',
            sourceKey : 'email'
        })
    },
    Contract.associate = characters => {
        Contract.hasMany(characters, {
            foreignKey : 'pcName',
            sourceKey : 'title'
        })
    }
    return Contract
};