import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly dataUrl = 'data/products.json';

  constructor(private http: HttpClient) {}

  obtenerProductos(): Observable<Product[]> {
    return this.http.get<Product[]>(this.dataUrl);
  }
}