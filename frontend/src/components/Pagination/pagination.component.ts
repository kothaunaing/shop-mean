import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  imports: [CommonModule],
})
export class PaginationComponent {
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;

  constructor(private router: Router) {}

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.router.navigate([`/`], { queryParams: { page: page } });
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.router.navigate([`/`], {
        queryParams: { page: this.currentPage - 1 },
      });
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.router.navigate([`/`], {
        queryParams: { page: this.currentPage + 1 },
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
