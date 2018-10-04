import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../../shared/recipe.model';
import { Ingredient } from '../../shared/ingredient.model';
import { RecipeService } from '../../shared/recipe.service';
import { ShoppingListService } from '../../shared/shopping-list.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,
    private shoppingListService: ShoppingListService) {
    this.recipe = new Recipe('', '', '', []);
    this.id = -1;
  }

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.params.id);
    this.recipe = this.recipeService.getRecipe(this.id);
    this.route.params.subscribe((params: Params) => {
      this.recipe = this.recipeService.getRecipe(parseInt(params.id));
    });
  }

  ngDoChecks() {
    console.log('recipe-detail:', this.recipe);
  }

  onAddToShoppingList() {
    this.shoppingListService.addIngredients(this.recipe.ingredients);
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(["/recipes"]);
  }
}
