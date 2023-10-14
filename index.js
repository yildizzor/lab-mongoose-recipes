const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://127.0.0.1:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    const myRecipe = {
      title: "Apple Tart",
      level: "Amateur Chef",
      ingredients: [
        "flour, for dusting",
        "375g/13oz block dessert pastry",
        "2 tbsp ground almonds",
        "3 tbsp golden caster sugar",
        "3 eating apples, peeled, cored and halved, then each half thinly sliced",
        "50g butter",
        "icing sugar, to serve (optional)",
        "vanilla ice cream, to serve",
      ],
      cuisine: "Turkish",
      dishType: "dessert",
      image:
        "https://rutgerbakt.nl/wp-content/uploads/2018/10/appelkruimeltaart-e1495794621103_600x900_acf_cropped-1024x0-c-default.jpg",
      duration: 90,
      creator: "Chef Yildiz",
    };

    return Recipe.create(myRecipe);
  })
  .then((recipe) => {
    // Run your code here, after you have insured that the connection was made

    console.log(`${recipe.title} is title of the recipe`);

    return Recipe.insertMany(data);
  })

  .then((recipes) => {
    recipes.forEach((recipe) => {
      console.log(`${recipe.title} is inserted into database.`);
    });

    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    );
  })

  .then(() => {
    console.log("Rigatoni alla Genovese recipe duration is updated.");

    return Recipe.deleteOne({ title: "Carrot Cake" });
  })

  .then(() => console.log("Carrot Cake is deleted."))
  .catch((error) => console.error(`There is an error`, error))
  .finally(
    mongoose.connection.close(() => {
      console.log(
        "Mongoose default connection disconnected through app termination"
      );
    })
  );
