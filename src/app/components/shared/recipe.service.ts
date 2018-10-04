import { OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from '../shared/recipe.model';
import { Ingredient } from '../shared/ingredient.model';

export class RecipeService implements OnInit {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[];

  constructor() {
    this.recipes = [
      new Recipe(
        'Recipe Sample',
        'This is a test recipe',
        'https://gutomna.com/wp-content/uploads/2014/08/Hungarian-Goulash-Eintopf-Recipe.jpg',
        [
          new Ingredient('Meat', 1),
          new Ingredient('Flour', 24),
          new Ingredient('Apple', 12),
        ],
      ),
      new Recipe(
        'Recipe Sample',
        'This is a test recipe',
        'https://gutomna.com/wp-content/uploads/2014/08/Hungarian-Goulash-Eintopf-Recipe.jpg',
        [
          new Ingredient('Peach', 3),
          new Ingredient('Bread', 5),
          new Ingredient('Fish', 7),
          new Ingredient('Crab', 2),
        ],
      )
    ];
  }

  ngOnInit() {}

  getRecipes(): Recipe[] {
    // slice() creates a copy of the array.
    // This following code makes sure that the recipes array
    // will not be accessed directly from outside.
    return this.recipes.slice();
  }

  getRecipe(index: number): Recipe {
    return this.recipes[index];
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
