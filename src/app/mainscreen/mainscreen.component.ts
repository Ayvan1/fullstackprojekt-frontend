import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductDTO } from '../model/productDTO';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-mainscreen',
  templateUrl: './mainscreen.component.html',
  styleUrls: ['./mainscreen.component.scss'],
})
export class MainscreenComponent implements OnInit {
  public product: ProductDTO;
  private productService: ProductService;
  public products: Observable<ProductDTO[]>;

  constructor(productService: ProductService) {
    this.product = new ProductDTO(0, 'Test', '123', 13.99);
    this.productService = productService;
    this.products = productService.listProducts();
  }

  ngOnInit() {}
}