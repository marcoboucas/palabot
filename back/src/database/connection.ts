// La variable mongoose nous permettra d'utiliser les fonctionnalités du module mongoose.
import mongoose from "mongoose";
// Ces options sont recommandées par mLab pour une connexion à la base
var options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

//URL de notre base
var urlmongo = `mongodb://${process.env.BDD_URL}:27017/${process.env.BDD_DATABASE}`;

// Nous connectons l'API à notre base de données
mongoose.connect(urlmongo, options);

var db = mongoose.connection;
db.on("error", console.error.bind(console, "Erreur lors de la connexion"));
db.once("open", function() {
  console.log("Connexion à la base OK");
});

export default db;
