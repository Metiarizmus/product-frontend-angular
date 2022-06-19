import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from "../models/product";
import {BehaviorSubject, Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiServerUrlAdmin = environment.apiBaseUrlAdmin;
  private apiServerUrlUser = environment.apiBaseUrlUser;

  productDataBroadcast = new BehaviorSubject<any>('')
  broadcastObservable$ = this.productDataBroadcast.asObservable()

  broadcast(data: Product) {
    if (data) {
      this.productDataBroadcast.next(data)
    }
  }

  constructor(
    private httpClient: HttpClient
  ) {
  }


  public createProduct(product: Product, file: any): Observable<any> {
    const payload = new FormData();

    payload.append("product", JSON.stringify(product));
    payload.append("file", file);

    return this.httpClient.post(`${this.apiServerUrlAdmin}/products`, payload, {responseType: 'text'})
  }

  public listAdminsProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.apiServerUrlAdmin}/products`)
  }


  public listProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.apiServerUrlUser}/products`)
  }

  public listProductsInCart(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.apiServerUrlUser}/cart/products`)
  }

  public editProduct(product: Product): Observable<any> {
    const payload = new FormData();

    payload.append("product", JSON.stringify(product));

    return this.httpClient.put(`${this.apiServerUrlAdmin}/products`, payload, {responseType: 'text'})
  }

  public changeStatus(status: String, id: number): Observable<any> {
    return this.httpClient.get<Product>(`${this.apiServerUrlUser}/change-status/${id}?status=${status}`)
  }

  public deleteProduct(id: number): Observable<number> {
    return this.httpClient.delete<number>(`${this.apiServerUrlAdmin}/products/${id}`)
  }


}
