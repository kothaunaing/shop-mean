import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { ProductServices } from '../../services/products.service';

@Component({
  selector: 'search-component',
  templateUrl: 'search.component.html',
  imports: [FontAwesomeModule],
})
export class SearchComponent {
  faSearch = faSearch;

  constructor(private router: Router, public productService: ProductServices) {}

  handleSearch(event: any, query: string) {
    if (!query.trim()) return;

    if (event?.key === 'Enter') {
      this.search(query);
    }
  }

  search(query: string) {
    this.router.navigate(['/search'], { queryParams: { query } });
  }
}
