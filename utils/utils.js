require("dotenv").config();
const axios = require("axios");
const modelApiUri = `${process.env.MODEL_API_URI}/generate_json/`;
const Fuse = require("fuse.js");
const fs = require("fs/promises");

const searchingFoodRecom = (arr, words) => {
  const options = {
    includeScore: true,
    keys: [
      "name",
      "description",
      "Category",
      "Ingredients.ingredient",
      "Instructions.instruction",
    ],
    threshold: 0.6,
  };

  const myIndex = Fuse.createIndex(options.keys, arr);

  const fuse = new Fuse(arr, options, myIndex);

  const result = fuse.search(words);

  return result;
};

const searchingArticle = (arr, words) => {
  const options = {
    includeScore: true,
    keys: [
      "title",
      "content",
    ],
    // threshold: 0.7,
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

const paginateFoodRecom = (array, limit) => {
  const shuffled = [...array];
  let paginated;

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  if (!limit) {
    return shuffled;
  }

  paginated = shuffled.slice(0, limit);

  return paginated;
};
module.exports = {
  paginateFoodRecom,
  datafromML,
  searchingFoodRecom,
  searchingArticle,
};
