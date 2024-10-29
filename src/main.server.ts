import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';
import { ShoppingItemComponent } from './app/shopping-list/shopping-item.component';

const bootstrap = () => bootstrapApplication(ShoppingItemComponent, config);

export default bootstrap;
