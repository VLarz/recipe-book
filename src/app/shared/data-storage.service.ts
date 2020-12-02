import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { Recipe } from '../components/recipes/model/recipe.model';
import { RecipeService } from '../components/recipes/services/recipe.service';

@Injectable({
  providedIn: 'root'
})

export class DataStorageService {

  constructor(private http: HttpClient,
              private recipeService: RecipeService) { }

  storeRecipes(): void {
    const recipes = this.recipeService.getRecipes();
    this.http
    .put<Recipe>(
      'https://ng-course-recipe-book-99081.firebaseio.com/recipes.json',
      recipes
    )
    .subscribe(
      response => {
        console.log(response);
      }
    );
  }

  fetchRecipes(): void {
    this.http
    .get<Recipe[]>('https://ng-course-recipe-book-99081.firebaseio.com/recipes.json')
    .pipe(map(recipes => {
      return recipes.map(recipe => {
        return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
      });
    }))
    .subscribe(recipes => {
      this.recipeService.setRecipes(recipes);
      console.log(recipes);
    });
  }
}
