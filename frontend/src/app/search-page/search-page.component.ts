import { Component } from '@angular/core';
import { UpdateProductComponent } from '../../components/UpdateProduct/update-product.component';
import { AddProductService } from '../../services/add-product.service';
import { ProductServices } from '../../services/products.service';
import { SingleProductComponent } from '../../components/SingleProduct/single-product.component';
import { PaginationComponent } from '../../components/Pagination/pagination.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthServices } from '../../services/auth.services';
import { SearchComponent } from '../../components/SearchComponent/search.component';

@Component({
  selector: 'app-search-page',
  imports: [
    UpdateProductComponent,
    SingleProductComponent,
    PaginationComponent,
    RouterLink,
    SearchComponent,
  ],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css',
})
export class SearchPageComponent {
  page: number = 1;

  constructor(
    public addProductService: AddProductService,
    public productService: ProductServices,
    private route: ActivatedRoute,
    public authService: AuthServices
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const page = Number(params['page']) || 1;
      const query = params['query'] || '';
      this.page = page;
      this.productService.query = query;
      this.productService.searchProducts(this.page, query);
    });
  }
}
