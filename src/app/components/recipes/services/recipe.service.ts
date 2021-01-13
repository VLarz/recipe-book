import { Subject } from 'rxjs';

import { Recipe } from '../model/recipe.model';



export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Hamburger',
  //     'Cheesy Burger',
  //     'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/RedDot_Burger.jpg/1200px-RedDot_Burger.jpg',
  //   [
  //     new Ingredient('Buns', 1),
  //     new Ingredient('Meat', 1),
  //     new Ingredient('Cheese', 1)
  //   ]),
  //   new Recipe(
  //     'Spaghetti',
  //     'Filipino Style',
  //     'https://pinoybites.com/wp-content/uploads/2020/01/filipino_spaghetti-scaled.jpg',
  //     [
  //       new Ingredient('Pasta', 1),
  //       new Ingredient('Spaghetti Sauce', 1),
  //     ])
  // ];
  private recipes: Recipe[] = [];

  setRecipes(recipes: Recipe[]): void {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  getRecipe(index: number): Recipe {
    return this.recipes[index];
  }

  addRecipe(recipe: Recipe): void {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe): void {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number): void {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
