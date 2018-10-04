import { OnInit, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';


export class ShoppingListService implements OnInit {

  private ingredients: Ingredient[];
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing: Subject<number>;

  constructor() {
    this.ingredients = [
      new Ingredient('Apple', 5),
      new Ingredient('Peach', 10),
    ];
    this.startedEditing = new Subject<number>();
  }

  ngOnInit() {}

  getIngredients(): Ingredient[] {
    // Thie returns a copy of the array.
    // So the outsider cannot directly acecss the array.
    return this.ingredients.slice();
  }

  getIngredient(index: number): Ingredient{
    return this.ingredients[index];
  }

  updateIngredient(index: number, ingredient: Ingredient) {
    this.ingredients[index] = ingredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

}
