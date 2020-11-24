
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Recipe } from '../model/recipe.model';


export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe(
      'Hamburger',
      'Cheesy Burger',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/RedDot_Burger.jpg/1200px-RedDot_Burger.jpg',
    [
      new Ingredient('Buns', 1),
      new Ingredient('Meat', 1),
      new Ingredient('Cheese', 1)
    ]),
    new Recipe(
      'Spaghetti',
      'Filipino Style',
      'https://pinoybites.com/wp-content/uploads/2020/01/filipino_spaghetti-scaled.jpg',
      [
        new Ingredient('Pasta', 1),
        new Ingredient('Spaghetti Sauce', 1),
      ])
  ];

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  getRecipe(index: number): Recipe {
    return this.recipes[index];
  }
}
