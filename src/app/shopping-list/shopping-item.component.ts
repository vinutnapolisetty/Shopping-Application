import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShoppingItem } from '../shopping-list/shopping-list.types';

@Component({
  selector: 'shopping-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mt-5 p-4 bg-light rounded shadow-lg">
      <h2 class="text-center mb-4 display-6">Shopping List</h2>

      <div class="row">
        <!-- Main Shopping List Section -->
        <div class="col-md-8">
          <!-- Add Item Button -->
          <div class="d-grid gap-2 mb-4">
            <button *ngIf="!isAddingItem" class="btn btn-outline-primary" (click)="startAddingItem()">+ Add New Item</button>
          </div>

          <!-- Add Item Form -->
          <div *ngIf="isAddingItem" class="add-item-form mb-4 border p-3 rounded bg-light">
            <h5 class="mb-3">Add New Item</h5>
            <input type="text" [(ngModel)]="newItem.name" class="form-control mb-2" placeholder="Item Name" />
            <input type="number" [(ngModel)]="newItem.quantity" class="form-control mb-2" placeholder="Quantity" />
            <select [(ngModel)]="newItem.category" class="form-select mb-2">
              <option value="Groceries">Groceries</option>
              <option value="Household">Household</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
            </select>
            <div class="d-flex justify-content-between">
              <button class="btn btn-success me-2" (click)="addItem()">Add Item</button>
              <button class="btn btn-secondary" (click)="cancelAddingItem()">Cancel</button>
            </div>
          </div>

          <!-- Shopping List Cards -->
          <div *ngIf="items.length > 0" class="shopping-list mt-4 row row-cols-1 row-cols-md-2 g-4">
            <div *ngFor="let item of items" class="col">
              <div class="card h-100 shadow-sm item-card">
                <div class="card-body">
                  <h5 class="card-title">{{ item.name }}</h5>
                  <p class="card-text">Quantity: {{ item.quantity }}</p>
                  <p class="card-text text-muted">Category: {{ item.category }}</p>
                  <button 
                    class="btn w-100 add-btn" 
                    [ngClass]="item.isPurchased ? 'btn-success' : 'btn-outline-primary'" 
                    (click)="togglePurchased(item)">
                    {{ item.isPurchased ? 'Added to Cart' : 'Add to Cart' }}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- No Items Message -->
          <div *ngIf="items.length === 0" class="alert alert-info mt-3">
            No items added yet. Click "Add New Item" to start.
          </div>
        </div>

        <!-- Sidebar Cart Section -->
        <div class="col-md-4">
          <div class="cart-sidebar p-3 bg-light rounded shadow-sm">
            <h5 class="text-center">Cart</h5>
            <hr />
            <div *ngIf="cartItems.length > 0" class="cart-items">
              <div *ngFor="let item of cartItems" class="cart-item p-2 mb-2 border-bottom">
                <p class="m-0"><strong>{{ item.name }}</strong></p>
                <p class="m-0 text-muted">Quantity: {{ item.quantity }}</p>
              </div>
            </div>
            <div *ngIf="cartItems.length === 0" class="text-center text-muted">
              No items in cart.
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .add-item-form {
      background-color: #f8f9fa;
      padding: 15px;
      border-radius: 8px;
      border: 1px solid #dee2e6;
    }
    .item-card {
      border: none;
      border-radius: 10px;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    .item-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
    }
    .add-btn {
      transition: background-color 0.3s ease, color 0.3s ease;
    }
    .btn-outline-primary:hover {
      background-color: #0d6efd;
      color: #fff;
      border-color: #0d6efd;
    }
    .btn-success:hover {
      background-color: #218838;
      border-color: #1e7e34;
    }
    .cart-sidebar {
      max-height: 400px;
      overflow-y: auto;
      position: sticky;
      top: 10px;
    }
    .cart-item {
      background-color: #f8f9fa;
      border-radius: 5px;
    }
    .cart-items {
      max-height: 300px;
      overflow-y: auto;
    }
  `]
})
export class ShoppingItemComponent {
  items: ShoppingItem[] = [
    { id: 1, name: 'Milk', quantity: 2, category: 'Groceries', isPurchased: false },
    { id: 2, name: 'Bread', quantity: 1, category: 'Groceries', isPurchased: false },
    { id: 3, name: 'Eggs', quantity: 12, category: 'Groceries', isPurchased: false },
  ];

  cartItems: ShoppingItem[] = [];
  isAddingItem: boolean = false;
  newItem: Partial<ShoppingItem> = {
    name: '',
    quantity: 1,
    category: 'Groceries',
    isPurchased: false,
  };
  private nextItemId: number = 4;

  startAddingItem() {
    this.isAddingItem = true;
  }

  cancelAddingItem() {
    this.isAddingItem = false;
    this.resetNewItem();
  }

  resetNewItem() {
    this.newItem = {
      name: '',
      quantity: 1,
      category: 'Groceries',
      isPurchased: false,
    };
  }

  addItem() {
    if (!this.newItem.name || !this.newItem.quantity || !this.newItem.category) {
      return;
    }
    this.items.push({
      id: this.nextItemId++,
      name: this.newItem.name!,
      quantity: this.newItem.quantity!,
      category: this.newItem.category!,
      isPurchased: this.newItem.isPurchased ?? false
    });
    this.isAddingItem = false;
    this.resetNewItem();
  }

  togglePurchased(item: ShoppingItem) {
    item.isPurchased = !item.isPurchased;
    if (item.isPurchased) {
      this.cartItems.push(item);
    } else {
      this.cartItems = this.cartItems.filter(cartItem => cartItem.id !== item.id);
    }
  }
}
