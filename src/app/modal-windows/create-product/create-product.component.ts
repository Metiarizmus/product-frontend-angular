import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {Product} from "../../shared/models/product";
import {ProductService} from "../../shared/service/product.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {


  product: Product;
  form!: FormGroup;
  @Input() modal_title!: string

  constructor(private builder: FormBuilder,
              private router: Router,
              private productService: ProductService,
              private toastr: ToastrService,
              public activeModal: NgbActiveModal
  ) {
    this.product = {
      productName: '',
      price: '',
      image: null,
      measureName: '',
      typeName: ''

    }
  }


  ngOnInit() {
    this.form = this.builder.group({
        productName: new FormControl('', [
          Validators.required
        ]),
        image: new FormControl('', [Validators.required]),
        price: new FormControl('', [
          Validators.required
        ]),
        measureName: new FormControl('', [
          Validators.required,
        ]),
        typeName: new FormControl('', [
          Validators.required,
        ]),
      }
    )

  }

  selectedFile = null;

  onSelectFile(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  createProduct() {
    const formData = {...this.form?.value}
    this.product.productName = formData.productName;
    this.product.price = formData.price;
    this.product.typeName = formData.typeName;
    this.product.measureName = formData.measureName;

    this.productService.createProduct(this.product, this.selectedFile).subscribe(
      (resp => {
        this.form.reset()
        this.toastr.success('Create product successful')

     //   this.product.image = this.selectedFile

        console.log(this.product.cardImageBase64)

        this.productService.broadcast(this.product)
      }), error => {
        this.toastr.error('Create failed! Please try again')
      }
    )


  }

  CreateBase64String(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          const imgBase64Path = e.target.result;
          this.product.cardImageBase64 = imgBase64Path;
        };
      };
      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }
}
