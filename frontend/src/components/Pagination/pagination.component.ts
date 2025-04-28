import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ProductServices } from '../../services/products.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  imports: [CommonModule],
})
export class PaginationComponent {
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;
  @Input() navigationPath: string = '';

  constructor(private router: Router, public productService: ProductServices) {}

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.router.navigate([this.navigationPath], {
        queryParams: { page: page },
        queryParamsHandling: 'merge',
      });
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.router.navigate([this.navigationPath], {
        queryParams: { page: this.currentPage - 1 },
        queryParamsHandling: 'merge',
      });
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.router.navigate([this.navigationPath], {
        queryParams: { page: this.currentPage + 1 },
        queryParamsHandling: 'merge',
      });
    }
  }

  generatePages(): number[] {
    const pages: number[] = [];
    const maxPagesToShow = 5; // Show 5 pages maximum at a time
    let startPage = Math.max(
      this.currentPage - Math.floor(maxPagesToShow / 2),
      1
    );
    let endPage = startPage + maxPagesToShow - 1;

    if (endPage > this.totalPages) {
      endPage = this.totalPages;
      startPage = Math.max(endPage - maxPagesToShow + 1, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }
}
