import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';

import { Ingredient } from '../../../shared/models/ingredient.model';
import * as fromApp from '../../store/app.reducer';
import * as ShoppingListActions from '../store/shopping-list.actions';

@Injectable()

export class ShoppingListService {
  ingredientChanged = new Subject<Ingredient[]>();
  startedEditting = new Subject<number>();

  constructor(private store: Store<fromApp.AppState>) {}

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];

  getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  getIngredient(index: number): Ingredient {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);
    this.ingredientChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]): void {
    // this.ingredients.push(...ingredients);
    // this.ingredientChanged.next(this.ingredients.slice());
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
  }

  updateIngredient(index: number, newIngredient: Ingredient): void {
    // this.ingredients[index] = newIngredient;
    // this.ingredientChanged.next(this.ingredients.slice());
    // this.store.dispatch(new ShoppingListActions.)
    // this.store.dispatch(new ShoppingListActions.UpdateIngredient(index, newIngredient));
  }

  deleteIngredient(index: number): void {
    this.ingredients.splice(index, 1);
    this.ingredientChanged.next(this.ingredients.slice());
  }
}
