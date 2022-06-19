import { Component, OnInit } from '@angular/core';
import {Product} from "../../shared/models/product";
import {ProductService} from "../../shared/service/product.service";

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {

  isLoadProducts: boolean = false
  products: Product[] = []

  constructor(private productService:ProductService) { }

  ngOnInit(): void {
    this.getAllProducts()

  }

  getAllProducts() {
    this.productService.listProductsInCart().subscribe(
      (resp) => {
        this.products = resp
        this.isLoadProducts = true
      }
    )
  }
}
