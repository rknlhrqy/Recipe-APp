import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { RecipeService } from '../../shared/recipe.service';
import { ValidatorsService } from '../../shared/validators.server';
import { Recipe } from '../../shared/recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})

export class RecipeEditComponent implements OnInit {
  id: number;
  editMode: boolean;
  recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private validatorsService: ValidatorsService,
    private router: Router,
  ) {
    this.id = -1;
    this.editMode = false;
    this.initForm();
  }

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.params.id);
    this.route.params.subscribe((params: Params) => {
      this.id = parseInt(params.id);
      if (isNaN(this.id)) {
        this.editMode = false;
      } else {
        this.editMode = true;
      }
      this.initForm();
    });
  }

  private initForm() {
    let recipeName: string = null;
    let recipeImagePath: string = null;
    let recipeDescription: string = null;
    const recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe['ingredients']) {
        for ( const ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, [Validators.required, this.validatorsService.checkEmptyString]),
              'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
            })
          );
        }
      }
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, [Validators.required, this.validatorsService.checkEmptyString]),
      'imagePath': new FormControl(recipeImagePath, [Validators.required, this.validatorsService.checkEmptyString]),
      'description': new FormControl(recipeDescription, [Validators.required, this.validatorsService.checkEmptyString]),
      'ingredients': recipeIngredients,
    });
  }

  onSubmit() {
    const newRecipe = new Recipe(
      this.recipeForm.value.name,
      this.recipeForm.value.description,
      this.recipeForm.value.imagePath,
      this.recipeForm.value.ingredients
    );
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, newRecipe);
    } else {
      this.recipeService.addRecipe(newRecipe);
    }
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  getIngredientsControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, [Validators.required, this.validatorsService.checkEmptyString]),
        'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
      }),
    );
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
}
