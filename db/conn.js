const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("toughts", "root", "", {
  host: "localhost",
  dialect: "mysql",
});
try {
  sequelize.authenticate();
  console.log("Conectado com sucesso");
} catch (error) {
  console.log(`Erro ao conectar: ${error}`);
}
module.exports = sequelize;
