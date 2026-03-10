import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { MenuItem, Category } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private readonly menuUrl = 'data/menu.json';

  // Signals for reactive state
  menuItems = signal<MenuItem[]>([]);
  isLoading = signal<boolean>(false);
  error = signal<string | null>(null);

  readonly categories: Category[] = [
    { id: 'all', name: 'All', icon: 'restaurant_menu' },
    { id: 'breakfast', name: 'Breakfast', icon: 'free_breakfast' },
    { id: 'mains', name: 'Mains', icon: 'lunch_dining' },
    { id: 'desserts', name: 'Desserts', icon: 'cake' },
    { id: 'beverages', name: 'Beverages', icon: 'local_cafe' },
  ];

  constructor(private http: HttpClient) {}

  loadMenuItems(): Observable<MenuItem[]> {
    this.isLoading.set(true);
    this.error.set(null);
    return this.http.get<MenuItem[]>(this.menuUrl).pipe(
      tap(items => {
        this.menuItems.set(items);
        this.isLoading.set(false);
      }),
      catchError(err => {
        this.isLoading.set(false);
        this.error.set('Failed to load menu. Please try again.');
        return throwError(() => err);
      })
    );
  }

  getMenuItemById(id: number): MenuItem | undefined {
    return this.menuItems().find(item => item.id === id);
  }

  getItemsByCategory(categoryId: string): MenuItem[] {
    if (categoryId === 'all') return this.menuItems();
    return this.menuItems().filter(item => item.category === categoryId);
  }

  getRecommended(): MenuItem[] {
    return this.menuItems().filter(item => item.isRecommended);
  }
}
