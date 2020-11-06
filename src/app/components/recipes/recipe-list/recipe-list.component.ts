import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../model/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is a simply a test', 'https://www.tasteofhome.com/wp-content/uploads/2018/01/Scrum-Delicious-Burgers_EXPS_CHMZ19_824_B10_30_2b-1.jpg'),
    new Recipe('A Test Recipe1', 'This is a simply a test1', 'https://www.tasteofhome.com/wp-content/uploads/2018/01/Scrum-Delicious-Burgers_EXPS_CHMZ19_824_B10_30_2b-1.jpg')
  ];
  constructor() { }

  ngOnInit(): void {
  }

  onRecipeSelected(recipe: Recipe): void {
    this.recipeWasSelected.emit(recipe);
  }

}
