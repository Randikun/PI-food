const {DataTypes}= require('sequelize')

module.exports= sequelize =>{
  sequelize.define('diet', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
    },
    name: {
      type: DataTypes.ENUM('Gluten Free','Ketogenic','Vegetarian','Lacto-Vegetarian', 'Ovo-Vegetarian', 'Vegan', 'Pescetarian', 'Paleo', 'Primal', 'Whole30'),
      allowNull: false,
    }
})

}