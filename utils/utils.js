require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const axios = require("axios");
const modelApiUri = `${process.env.MODEL_API_URI}/generate_json/`;
const Fuse = require("fuse.js");
const prisma = new PrismaClient();
const schedule = require("node-schedule");
let dataRecipe;

const job = schedule.scheduleJob("1 30 9 * * *", async () => {
  dataRecipe = await prisma.foodRecom.findMany();

  for (let i = dataRecipe.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [dataRecipe[i], dataRecipe[j]] = [dataRecipe[j], dataRecipe[i]];
  }

});

const getRecipe = () => {
  return dataRecipe;
};

const searchingFoodRecom = (arr, words) => {
  const options = {
    includeScore: true,
    keys: [
      { name: "name", weight: 2 },
      "description",
      { name: "Category", weight: 2 },
      "Ingredients.ingredient",
      "Instructions.instruction",
    ],
    threshold: 0.5,
  };

  const myIndex = Fuse.createIndex(options.keys, arr);

  const fuse = new Fuse(arr, options, myIndex);

  const result = fuse.search(words);

  return result;
};

const searchingArticle = (arr, words) => {
  const options = {
    includeScore: true,
    keys: ["title", "content"],
  };

  const myIndex = Fuse.createIndex(options.keys, arr);

  const fuse = new Fuse(arr, options, myIndex);

  const result = fuse.search(words);

  return result;
};

const datafromML = async (ageCategory) => {
  const mlApiResponse = await axios
    .get(modelApiUri + ageCategory, {
      headers: {
        Accept: "application/json",
      },
    })
    .then((data) => {
      return data.data.recommendations;
    });

  const data = await mlApiResponse;

  const cleanOutput = data.map((val) => {
    const ingredient = val.Ingredient.map((item) => {
      return {
        ingredient: item.replace(/"([^"]+)"/g, "$1"),
      };
    });
    const instruction = val.Instructions.map((item, index) => {
      return {
        stepOrder: index + 1,
        instruction: item.replace(/^"|"$/g, ""),
      };
    });

    return {
      foodRecom: {
        name: val.Name,
        description: val.Description,
        img: val.Images,
        Category: val.Category,
        agregateRating: val.AggregatedRating,
        reviewCount: val.ReviewCount,
      },
      nutritionInfo: {
        calories: val.Calories,
        fat: val.Fat,
        saturatedFat: val.SaturatedFat,
        cholesterol: val.Cholesterol,
        sodium: val.Sodium,
        carbohydrates: val.Carbohydrate,
        fiber: val.Fiber,
        sugar: val.Sugar,
        protein: val.Protein,
      },
      Ingredient: ingredient,
      Instruction: instruction,
    };
  });

  return cleanOutput;
};

const paginateFoodRecom = async (foodRecom, childId, ageCategory, limit) => {
  let paginated;
  let recipes
  const data = await getRecipe();

  if (!data) {
    recipes = foodRecom
  } else {
    recipes = data.filter((val) => val.childId === childId && val.ageCategory === ageCategory);
  }

  if (!limit) {
    paginated = recipes;
  } else {
    paginated = recipes.slice(0, limit);
  }

  return paginated;
};

module.exports = {
  paginateFoodRecom,
  datafromML,
  searchingFoodRecom,
  searchingArticle,
};
