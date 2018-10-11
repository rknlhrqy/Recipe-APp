import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from '../../shared/shopping-list.service';
import { DataStorageService } from '../../shared/data-storage.service';
import { RecipeService } from '../../shared/recipe.service';
import { AuthService } from '../../shared/auth.service';
import { Recipe } from '../../shared/recipe.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  recipes: Recipe[];

  constructor(private shoppingListService: ShoppingListService,
    private dataStorageService: DataStorageService,
    private recipeService: RecipeService,
    private authService: AuthService) {
      this.recipes = this.recipeService.getRecipes();
    }

  ngOnInit() {}

  /*
  onSaveData() {
    this.recipes = this.recipeService.getRecipes();
    this.dataStorageService.saveData(this.recipes).subscribe((error) => {
      console.log(error);
    });
  }

  onFetchData() {
    this.dataStorageService.fetchData().subscribe((data: Recipe[]) => {
      console.log(data);
      this.recipeService.setRecipes(data);
    }, (error) => { console.log(error); });
  }
  */
  async onSaveData() {
    try {
      this.recipes = this.recipeService.getRecipes();
      await this.dataStorageService.saveData(this.recipes);
    } catch (error) {
      console.log(error);
    }
  }

  async onFetchData() {
    try {
      const recipesData = await this.dataStorageService.fetchData();
      this.recipeService.setRecipes(recipesData);
    } catch (error) {
      console.log(error);
    }
  }

  onLogout() {
    this.authService.logout();
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }
}
