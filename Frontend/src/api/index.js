import { initialRecipes, initialUsers } from './mockData';


const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const initializeLocalStorage = () => {
  if (!localStorage.getItem('recipes')) {
    localStorage.setItem('recipes', JSON.stringify(initialRecipes));
  }
  if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify(initialUsers));
  }
};

initializeLocalStorage();


export const fetchRecipes = async () => {
  await delay(500); 
  const recipes = JSON.parse(localStorage.getItem('recipes'));
  return recipes;
};

export const fetchRecipeById = async (id) => {
  await delay(300);
  const recipes = JSON.parse(localStorage.getItem('recipes'));
  const recipe = recipes.find(r => r.id === id);
  if (!recipe) throw new Error('Recipe not found');
  return recipe;
};

export const addRecipe = async (recipeData) => {
  await delay(500);
  const recipes = JSON.parse(localStorage.getItem('recipes'));
  const newId = Math.max(...recipes.map(r => r.id)) + 1;
  const newRecipe = {
    ...recipeData,
    id: newId,
    rating: 0
  };
  const updatedRecipes = [...recipes, newRecipe];
  localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
  return newRecipe;
};

export const updateRecipe = async (updatedRecipe) => {
  await delay(500);
  const recipes = JSON.parse(localStorage.getItem('recipes'));
  const updatedRecipes = recipes.map(recipe => 
    recipe.id === updatedRecipe.id ? updatedRecipe : recipe
  );
  localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
  return updatedRecipe;
};

export const deleteRecipe = async (id) => {
  await delay(500);
  const recipes = JSON.parse(localStorage.getItem('recipes'));
  const updatedRecipes = recipes.filter(recipe => recipe.id !== id);
  localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
  return id;
};


export const loginUser = async (credentials) => {
  await delay(500);
  const users = JSON.parse(localStorage.getItem('users'));
  const user = users.find(
    u => u.email === credentials.email && u.password === credentials.password
  );
  if (!user) throw new Error('Invalid credentials');
  

  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

export const registerUser = async (userData) => {
  await delay(500);
  const users = JSON.parse(localStorage.getItem('users'));
  
  
  if (users.some(u => u.email === userData.email)) {
    throw new Error('User already exists');
  }
  
  const newUser = {
    ...userData,
    id: `user${users.length + 1}`,
    favorites: []
  };
  
  const updatedUsers = [...users, newUser];
  localStorage.setItem('users', JSON.stringify(updatedUsers));

  const { password, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
};

export const updateUserFavorites = async (userId, recipeId, addToFavorites = true) => {
  await delay(300);
  const users = JSON.parse(localStorage.getItem('users'));
  const updatedUsers = users.map(user => {
    if (user.id === userId) {
      let favorites = [...user.favorites];
      if (addToFavorites) {
        if (!favorites.includes(recipeId)) {
          favorites.push(recipeId);
        }
      } else {
        favorites = favorites.filter(id => id !== recipeId);
      }
      return { ...user, favorites };
    }
    return user;
  });
  
  localStorage.setItem('users', JSON.stringify(updatedUsers));
  const updatedUser = updatedUsers.find(u => u.id === userId);
  const { password, ...userWithoutPassword } = updatedUser;
  return userWithoutPassword;
};
