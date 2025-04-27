import { Component, effect } from '@angular/core';
import { AuthServices } from '../../services/auth.services';
import { SingleProductComponent } from '../../components/SingleProduct/single-product.component';
import { AddProductService } from '../../services/add-product.service';
import { UpdateProductComponent } from '../../components/UpdateProduct/update-product.component';
import { ProductServices } from '../../services/prouducts.service';
import { ActivatedRoute } from '@angular/router';
import { PaginationComponent } from '../../components/Pagination/pagination.component';

@Component({
  selector: 'app-home',
  imports: [
    SingleProductComponent,
    UpdateProductComponent,
    PaginationComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  page: number = 1;
  constructor(
    public authService: AuthServices,
    public addProductService: AddProductService,
    public productService: ProductServices,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const page = Number(params['page']) || 1;
      this.page = page;
      this.productService.fetchAllProducts(this.page);
    });
  }
}
