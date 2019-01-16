module.exports = function(sequelize, DataType){
    const Contract = sequelize.define('contract', {
        DM:{
            type: DataType.STRING
        },    
        title:{
           type: DataType.STRING,
           allowNull: false,
           unique: true,
           foreignKey: true
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
    Contract.associate = models => {
        Contract.hasOne(models.user, {
            as: 'DM',
            foreignKey : 'email'
        });
        Contract.belongsToMany(models.character, {
            as: 'contract',
            through: 'party_members',
            foreignKey: 'pcName'
        })
    }
    return Contract
};