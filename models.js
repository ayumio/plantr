const Sequelize = require('sequelize')


const db  = new Sequelize('postgres://localhost:5432/plantr')

module.exports = db

//When you create a belongsToMany relationship, you must specify an extra second parameter with an options object. In this object, you use "through" to specify the name of the join table that will contain their foreign keys, and Sequelize will automatically create it for you!

const Gardener = db.define('gardner', {
  name: Sequelize.STRING,
  age: Sequelize.INTEGER
})

const Plot = db.define('plot', {
  size: Sequelize.INTEGER,
  shaded: Sequelize.STRING
})

const Vegetable = db.define('vegetable', {
  name: Sequelize.STRING,
  color: Sequelize.STRING,
  planted_on: Sequelize.DATE
})

Vegetable.belongsToMany(Plot, {through: 'vegetable_plot'})
Plot.belongsToMany(Vegetable, {through: 'vegetable_plot'})
Gardener.belongsTo(Vegetable, {as: 'favorite_vegetable'})
