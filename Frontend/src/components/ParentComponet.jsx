import React from 'react'

const ParentComponent = () => {
    const [recipes, setRecipes] = useState([]);
  
    useEffect(() => {
      const savedRecipes = localStorage.getItem('recipes');
      if (savedRecipes) {
        setRecipes(JSON.parse(savedRecipes));
      }
    }, []);
  
    useEffect(() => {
      localStorage.setItem('recipes', JSON.stringify(recipes));
    }, [recipes]);
  
    return (
      <>
        <RecipeApp recipes={recipes} setRecipes={setRecipes} />
        <RecipeFeed recipes={recipes} />
      </>
    );
  };
  

export default Parent
