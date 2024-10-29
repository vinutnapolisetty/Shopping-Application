import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { importProvidersFrom } from '@angular/core';
import { ShoppingItemComponent } from './app/shopping-list/shopping-item.component';

bootstrapApplication(ShoppingItemComponent, {
  providers: [
    provideAnimations(),
    importProvidersFrom(FormsModule)
  ]
}).catch((err) => console.error(err));
