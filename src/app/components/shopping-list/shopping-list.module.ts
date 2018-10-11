import { NgModule } from '@angular/core';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ShoppingListRoutingModule } from './shopping-list-routing.module';

@NgModule({
  declarations: [
    ShoppingEditComponent,
    ShoppingListComponent,
  ],
  imports: [
    SharedModule,
    FormsModule,
    ShoppingListRoutingModule,
  ],
  exports: [
    ShoppingListComponent,
  ],
})
export class ShoppingListModule {}
