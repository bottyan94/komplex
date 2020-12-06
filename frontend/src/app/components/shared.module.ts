import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert/alert.component';
import { FrequentlyListComponent } from './frequently-list/frequently-list.component';
import { ItemAddInputComponent } from './item-add-input/item-add-input.component';
import { MyListComponent } from './my-list/my-list.component';
import { ProfileDropdownComponent } from './profile-dropdown/profile-dropdown.component';
import { FormsModule } from '@angular/forms';
import { ItemCardComponent } from './item-card/item-card.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from './material.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    MaterialModule
  ],
  declarations: [
    ItemAddInputComponent,
    AlertComponent,
    MyListComponent,
    FrequentlyListComponent,
    ProfileDropdownComponent,
    ItemCardComponent

  ],
  exports: [
    ItemAddInputComponent,
    AlertComponent,
    MyListComponent,
    FrequentlyListComponent,
    ProfileDropdownComponent,
    ItemCardComponent,
    NgbModule,
    MaterialModule
  ],
  bootstrap: [ItemAddInputComponent]
})
export class SharedModule { }
