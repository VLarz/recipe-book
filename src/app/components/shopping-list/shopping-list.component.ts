import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Ingredient } from '../../shared/models/ingredient.model';
import * as fromApp from '../store/app.reducer';
import { ShoppingListService } from './services/shopping-list.service';
import * as ShoppingListActions from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],

})
export class ShoppingListComponent implements OnInit {
  ingredients: Observable<{ ingredients: Ingredient[] }>;

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');
    // this.ingredients = this.shoppingListService.getIngredients();
    // this.igChangeSub = this.shoppingListService.ingredientChanged.
    //   subscribe(
    //   (ingredients: Ingredient[]) => this.ingredients = ingredients
    // );
  }

  onEditItem(index: number): void {
    // this.shoppingListService.startedEditting.next(index);
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }
}
