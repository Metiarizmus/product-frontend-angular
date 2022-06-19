import {Component, OnInit} from '@angular/core';
import {Product} from "../../shared/models/product";
import {ProductService} from "../../shared/service/product.service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  isLoadProducts: boolean = false
  products: Product[] = []

  constructor(private productService:ProductService) { }

  ngOnInit(): void {
    this.getAllProducts()
  }


  getAllProducts() {
    this.productService.listProducts().subscribe(
      (resp) => {
        this.products = resp
        this.isLoadProducts = true
      }
    )
  }


}
