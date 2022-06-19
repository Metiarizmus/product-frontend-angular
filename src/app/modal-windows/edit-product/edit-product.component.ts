import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../shared/models/product";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ProductService} from "../../shared/service/product.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  @Input() modal_title!: string
  @Input() product!: Product

  constructor(
    public activeModal: NgbActiveModal,
    private productService: ProductService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
  }


  updateProduct(value: any) {
    this.product.productName = value.productName
    this.product.price = value.price
    this.product.measureName = value.measureName
    this.product.typeName = value.typeName

    this.productService.editProduct(this.product).subscribe(
      (resp) => {
        this.product = resp
        this.toastr.success("product was edit")
      }, error => [
        this.toastr.error("smth went wrong")

      ]
    )

  }


}
