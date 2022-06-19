import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import Swal from 'sweetalert2';
import {Product} from "../../shared/models/product";
import {ProductService} from "../../shared/service/product.service";
import {CreateProductComponent} from "../../modal-windows/create-product/create-product.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {EditProductComponent} from "../../modal-windows/edit-product/edit-product.component";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input() product!: Product
  @Output() updateEmitter = new EventEmitter<any>()
  role!: string

  constructor(
    private productService: ProductService,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    // @ts-ignore
    this.role = localStorage.getItem("roles")
  }

  confirmBox() {
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this course!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {

        if (this.product.id != null) {
          this.deleteProduct(this.product.id)
        }

        Swal.fire(
          'Deleted!',
          'Your course has been deleted.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your course is safe :)',
          'error'
        )
      }
    })
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe(
      (idResponse) => {

        this.updateEmitter.emit(idResponse)

      }, error => {

      }
    )
  }

  edit() {
    const modalRef = this.modalService.open(EditProductComponent);
    modalRef.componentInstance.modal_title = 'Edit product';
    modalRef.componentInstance.product = this.product;

  }

  addToCart() {
    if (this.product.id != null) {
      this.productService.changeStatus("ORDERING", this.product.id).subscribe(
        (resp) => {
          this.toastr.success("product was add to cart")
        },error => {
          this.toastr.error("cannot add product to cart")
        }
      )
    }
  }
}
