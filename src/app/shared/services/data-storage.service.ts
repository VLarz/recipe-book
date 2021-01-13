import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { AuthService } from '../../components/auth/services/auth.service';
import { Recipe } from '../../components/recipes/model/recipe.model';
import { RecipeService } from '../../components/recipes/services/recipe.service';
import { ENDPOINT } from '../../shared/const/endpoint.const';

@Injectable({
  providedIn: 'root'
})

export class DataStorageService {

  constructor(private http: HttpClient,
              private recipeService: RecipeService,
              private authService: AuthService) { }

  storeRecipes(): void {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put<Recipe>(
        `${environment.apiUrl}${ENDPOINT.RECIPES}`,
        recipes
      )
      .subscribe(
        response => {
          console.log(response);
        }
      );
  }

  fetchRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(
      `${environment.apiUrl}${ENDPOINT.RECIPES}`
    )
    .pipe(
      map(recipes => {
        return recipes.map(recipe => {
          return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
        });
      }),
      tap(recipes => {
        this.recipeService.setRecipes(recipes);
        console.log(recipes);
      }));
  }

  // fetchRecipes(): Observable<Recipe[]> {
  //   return this.authService.user.pipe(take(1), exhaustMap(user => {
  //     return this.http.get<Recipe[]>(
  //       `${environment.apiUrl}${ENDPOINT.RECIPES}`,
  //       {
  //         params: new HttpParams().set('auth', user.token)
  //       }
  //     );
  //   }),
  //   map(recipes => {
  //     return recipes.map(recipe => {
  //       return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
  //     });
  //   }),
  //   tap(recipes => {
  //     this.recipeService.setRecipes(recipes);
  //     console.log(recipes);
  //   }));
  // }
}
