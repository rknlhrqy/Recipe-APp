import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { NgModule } from '@angular/core';

import { HomeComponent } from './components/core/home/home.component';
import { AuthGuardService } from './components/shared/auth-guard.service';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'recipes', loadChildren: './components/recipes/recipes.module#RecipesModule', canLoad: [AuthGuardService]},
  {path: 'shopping-list', loadChildren: './components/shopping-list/shopping-list.module#ShoppingListModule', canLoad: [AuthGuardService]},
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules}),
  ],
exports: [
    RouterModule,
  ],
})

export class AppRoutingModule {}
