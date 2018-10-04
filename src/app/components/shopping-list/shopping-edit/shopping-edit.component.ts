import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../../shared/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') ingredientToEdit: NgForm;
  subscription: Subscription;
  editMode: boolean;
  editedItemIndex: number;
  editedIngredient: Ingredient;
  ingredients: Ingredient[];

  constructor(private shoppingListService: ShoppingListService) {
    this.editMode = false;
    this.editedItemIndex = 0;
    this.editedIngredient = new Ingredient('', 0);
    this.ingredients = this.shoppingListService.getIngredients();
  }

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedIngredient = this.shoppingListService.getIngredient(index);
        this.ingredientToEdit.setValue({
          name: this.editedIngredient.name,
          amount: this.editedIngredient.amount,
        });
      }
    );
  }

  onAddItem() {
    const ingredient = new Ingredient(
      this.ingredientToEdit.value.name.trim(),
      this.ingredientToEdit.value.amount,
    );
    if (this.editMode === true) {
      this.UpdateIngredient(this.editedItemIndex, ingredient);
    } else {
      this.shoppingListService.addIngredient(ingredient);
    }
    this.editMode = false;
    this.ingredientToEdit.reset();
  }

  onClear() {
    this.ingredientToEdit.reset();
    this.editMode = false;
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  UpdateIngredient(index: number, ingredient: Ingredient) {
    this.shoppingListService.updateIngredient(index, ingredient);
  }
}
