

export const recipes = [
    {
      id: 1,
      title: "Spaghetti Carbonara",
      ingredients: ["spaghetti", "eggs", "parmesan", "pancetta", "garlic"],
      cookingTime: 20,
      rating: 4.5,
      image: "https://static01.nyt.com/images/2021/02/14/dining/carbonara-horizontal/carbonara-horizontal-videoSixteenByNineJumbo1600-v2.jpg",
    },
    {
      id: 2,
      title: "Chicken Curry",
      ingredients: ["chicken", "curry powder", "coconut milk", "garlic", "onions"],
      cookingTime: 30,
      rating: 4.2,
      image: "https://images.immediate.co.uk/production/volatile/sites/30/2024/06/Chargrilled-chicken-curry-c0759f9.jpg?quality=90&resize=556,505",
    },
    {
      id: 3,
      title: "Vegetable Stir-fry",
      ingredients: ["broccoli", "carrots", "bell peppers", "soy sauce", "garlic"],
      cookingTime: 15,
      rating: 4.0,
      image: "https://images.themodernproper.com/production/posts/VegetableStirFry_9.jpg?w=1200&h=1200&q=60&fm=jpg&fit=crop&dm=1703377301&s=79d95f7318643d92c30863f226d5eb8e",
    },
    {
      id: 4,
      title: "Beef Stew",
      ingredients: ["beef", "potatoes", "carrots", "onions", "beef broth"],
      cookingTime: 120,
      rating: 4.7,
      image: "https://www.skinnytaste.com/wp-content/uploads/2023/10/Beef-Stew-Recipe-10.jpg",
    },
    {
      id: 5,
      title: "Pancakes",
      ingredients: ["flour", "eggs", "milk", "butter", "maple syrup"],
      cookingTime: 15,
      rating: 4.6,
      image: "https://eggs.ca/wp-content/uploads/2024/06/fluffy-pancakes-1664x832-1.jpg",
    },
    {
      id: 6,
      title: "Caesar Salad",
      ingredients: ["romaine lettuce", "croutons", "parmesan", "Caesar dressing"],
      cookingTime: 10,
      rating: 4.3,
      image: "https://cdn.loveandlemons.com/wp-content/uploads/2024/12/caesar-salad.jpg",
    },
    {
      id: 7,
      title: "Grilled Cheese Sandwich",
      ingredients: ["bread", "cheese", "butter"],
      cookingTime: 10,
      rating: 4.5,
      image: "https://mayihavethatrecipe.com/wp-content/uploads/2014/04/The-best-grilled-cheese-sandwich-6-1-680x1027.jpg",
    },
    {
      id: 8,
      title: "Lamb Chops",
      ingredients: ["lamb", "garlic", "rosemary", "olive oil", "lemon"],
      cookingTime: 25,
      rating: 4.8,
      image: "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2012/2/22/0/EI1C01_grilled-lamb-chops_s4x3.jpg.rend.hgtvcom.1280.1280.suffix/1382541337420.webp",
    },
    {
      id: 9,
      title: "Vegetarian Pizza",
      ingredients: ["pizza dough", "tomato sauce", "cheese", "vegetables"],
      cookingTime: 25,
      rating: 4.4,
      image: "https://www.vegrecipesofindia.com/wp-content/uploads/2020/11/pizza-recipe-2-500x500.jpg",
    },
    {
      id: 10,
      title: "Salmon with Asparagus",
      ingredients: ["salmon", "asparagus", "lemon", "olive oil", "garlic"],
      cookingTime: 20,
      rating: 4.6,
      image: "https://natashaskitchen.com/wp-content/uploads/2017/06/Salmon-and-Asparagus-3.jpg",
    },
  ];
  
  
  
  export const initialRecipes = [
    {
      id: 1,
      title: "Spaghetti Bolognese",
      ingredients: ["spaghetti", "ground beef", "tomato sauce"],
      instructions: "Cook spaghetti. Make sauce with beef and tomato.",
      image: "https://example.com/spaghetti.jpg",
      cookingTime: 30,
      rating: 4.5,
    },
    
  ];
  
 
  export const initialUsers = [
    {
      id: 1,
      username: "john_doe",
      savedRecipes: [1],  
    },
    {
      id: 2,
      username: "jane_doe",
      savedRecipes: [1, 2],
    },
    
  ];
  
  
  export const addRecipe = (recipeData) => {
    const newRecipe = {
      ...recipeData,
      id: Math.floor(Math.random() * 10000), 
    };
    initialRecipes.push(newRecipe); 
    return newRecipe;
  };
 
  export const updateRecipe = (updatedRecipe) => {
    const index = initialRecipes.findIndex(recipe => recipe.id === updatedRecipe.id);
    if (index !== -1) {
      initialRecipes[index] = updatedRecipe; 
      return updatedRecipe;
    }
    return null;
  };
  
  
  export const deleteRecipe = (id) => {
    const index = initialRecipes.findIndex(recipe => recipe.id === id);
    if (index !== -1) {
      const deletedRecipe = initialRecipes.splice(index, 1); 
      return deletedRecipe[0]; 
    }
    return null;
  };
  

  export const fetchRecipes = () => {
    return initialRecipes; 
  };
  
 
  export const fetchRecipeById = (id) => {
    const recipe = initialRecipes.find((recipe) => recipe.id === id); 
    return recipe || null; 
  };
  