import {Component, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CreateProductComponent} from "../../modal-windows/create-product/create-product.component";

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {

  constructor(private modalService: NgbModal) {
  }

  ngOnInit(): void {
  }


  open() {
    const modalRef = this.modalService.open(CreateProductComponent);
    modalRef.componentInstance.modal_title = 'Create product';
  }
}
