import {Component, OnInit} from '@angular/core';
import {Product} from "../../../shared/models/product";
import {ProductService} from "../../../shared/service/product.service";

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {

  products: Product[] = []
  isLoadProducts: boolean = false
  constructor(
    private productService: ProductService
  ) {
  }

  ngOnInit(): void {
    this.listProductsAdmin()

    this.productService.broadcastObservable$.subscribe(
      (product: Product) => {
        this.products?.push(product)
      }
    )
  }

  listProductsAdmin() {
    this.productService.listAdminsProducts().subscribe(
      (resp) => {
        this.products = resp
        this.isLoadProducts = true
      }
    )
  }

  updateListTasks(idProduct: any) {
    this.products = this.products?.filter(el => el.id !== idProduct)
  }
}
