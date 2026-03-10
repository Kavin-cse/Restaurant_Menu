import { Pipe, PipeTransform } from '@angular/core';
import { MenuItem } from '../models/models';

/** Filters menu items by category and optionally by price range */
@Pipe({
  name: 'filterMenu',
  standalone: true,
  pure: false
})
export class FilterMenuPipe implements PipeTransform {
  transform(items: MenuItem[], category: string, maxPrice?: number, searchTerm?: string): MenuItem[] {
    if (!items) return [];

    let filtered = items;

    // Category filter
    if (category && category !== 'all') {
      filtered = filtered.filter(item => item.category === category);
    }

    // Price filter
    if (maxPrice && maxPrice > 0) {
      filtered = filtered.filter(item => item.price <= maxPrice);
    }

    // Search filter
    if (searchTerm && searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term) ||
        item.ingredients.some(ing => ing.toLowerCase().includes(term))
      );
    }

    return filtered;
  }
}
