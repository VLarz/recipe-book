import { Injectable} from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Recipe } from './../model/recipe.model';
import { DataStorageService } from '../../../shared/data-storage.service';
import { Observable } from 'rxjs';
import { RecipeService } from './recipe.service';

@Injectable({
  providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(private dataStorageService: DataStorageService, private recipeService: RecipeService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe[]> | Recipe[]{
    const RECIPES = this.recipeService.getRecipes();

    if (RECIPES.length === 0) {
      return this.dataStorageService.fetchRecipes();
    } else {
      return RECIPES;
    }

  }
}
