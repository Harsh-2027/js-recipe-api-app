const button = document.querySelector(".search-btn")
const searhcBox = document.querySelector(".search-box")
const container = document.querySelector(".recipe-container")
const recipeHeading = document.querySelector(".recipe-heading")
const recipeContent = document.querySelector(".recipe-details-content")
const recipeclosebtn = document.querySelector(".recipe-close")
const preimg = document.querySelector(".pre-info")

const fetchRecipe = async (input)=>{
    recipeHeading.innerHTML = "<h2> Fetching Recipes ... </h2>"
 const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`);
 const response = await data.json();
 //console.log(response);
 
//  console.log(response);
recipeHeading.innerHTML = ""
preimg.style.display = "none";
response.meals.forEach((meal) =>{
   const recipeDiv = document.createElement('div');
   recipeDiv.classList.add('recipe');
   recipeDiv.innerHTML =  `
   <img src="${meal.strMealThumb}">
   <h3>${meal.strMeal}</h3>
   <p>${meal.strArea}</p>
   <p>${meal.strCategory}</p>
   `
   const recipebutton = document.createElement("button") 
   recipebutton.classList.add('recipebutton');
   recipebutton.textContent = "View Recipe";
   recipeDiv.appendChild(recipebutton);
   container.appendChild(recipeDiv);
   
    //   js of view recipe button
    recipebutton.addEventListener('click',()=>{
        popuprecipe(meal);
    })
})

}
// close buton
recipeclosebtn.addEventListener('click',(e)=>{
  recipeContent.parentElement.style.display = "none"
});


// search button
button.addEventListener('click',(e)=>{
  // to prevent page refresh while clicking the button
  e.preventDefault();
  const searchInput = searhcBox.value.trim();
  fetchRecipe(searchInput);
   
  console.log("button clicked")
})

// ingredients function

const fetchingredients = (meal) => {
    let ingredientlist = ""
    for(let i=1;i<=20;i++){
        const ingredient = meal[`strIngredient${i}`];
        if(ingredient){
            const measure = meal[`strMeasure${i}`];
            ingredientlist += `<li>${measure} ${
            ingredient}</li>`
        }
        else {
            break;
        }
    }
    return ingredientlist;
}


// open recipe content

const popuprecipe = (meal)=>{
    recipeContent.innerHTML = `
    <h2 class="recipeName"> ${meal.strMeal}</h2>
    <h3>Ingredents</h3>
    <div class="recipeInstructions">
<ul class="ingredientList">${fetchingredients(meal)}</ul>
    <h3>Instructions:</h3>
    <p>${meal.strInstructions}</p>
</div>
   
    `
    
    recipeContent.parentElement.style.display = "block";
}

