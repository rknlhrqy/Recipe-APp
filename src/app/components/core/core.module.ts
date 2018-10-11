import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../../app-routing.module';
import { ShoppingListService } from '../shared/shopping-list.service';
import { ValidatorsService } from '../shared/validators.server';
import { RecipeService } from '../shared/recipe.service';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../shared/auth.service';
import { AuthGuardService } from '../shared/auth-guard.service';

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
  ],
  imports: [
    SharedModule,
    AppRoutingModule,
  ],
  exports: [
    AppRoutingModule,
    HeaderComponent,
  ],
  providers: [
    ShoppingListService,
    ValidatorsService,
    RecipeService,
    DataStorageService,
    AuthService,
    AuthGuardService,
  ],
})
export class CoreModule {}
