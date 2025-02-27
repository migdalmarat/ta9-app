import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of, delay, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MaterialItem } from '../models/material-item';

@Injectable()
export class MockBackendInterceptor implements HttpInterceptor {
  private http = inject(HttpClient);
  private items: MaterialItem[] = [];
  private initialized = false;

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!this.initialized) {
      return this.http.get<MaterialItem[]>('/assets/mock-data.json').pipe(
        switchMap((data: MaterialItem[]) => {
          this.items = data;
          this.initialized = true;
          return of(this.handleRequest(request));
        })
      );
    }

    return of(this.handleRequest(request)).pipe(delay(500));
  }

  private handleRequest(request: HttpRequest<any>): HttpResponse<any> {
    const { url, method, body } = request;

    if (url.endsWith('api/items') && method === 'GET') {
      return new HttpResponse({ status: 200, body: this.items });
    }

    if (url.match(/\/api\/items\/\d+$/) && method === 'GET') {
      const id = parseInt(url.split('/').pop() || '0', 10);
      const item = this.items.find((i) => i.id === id);
      return new HttpResponse({ status: 200, body: item });
    }

    if (url.endsWith('/api/items') && method === 'POST') {
      const newItem = { ...body, id: this.getNextId() };
      this.items.push(newItem);
      return new HttpResponse({ status: 201, body: newItem });
    }

    if (url.match(/\/api\/items\/\d+$/) && method === 'PUT') {
      const id = parseInt(url.split('/').pop() || '0', 10);
      const itemIndex = this.items.findIndex((i) => i.id === id);
      if (itemIndex > -1) {
        this.items[itemIndex] = { ...body };
        return new HttpResponse({ status: 200, body: this.items[itemIndex] });
      }
    }

    if (url.match(/\/api\/items\/\d+$/) && method === 'DELETE') {
      const id = parseInt(url.split('/').pop() || '0', 10);
      const itemIndex = this.items.findIndex((i) => i.id === id);
      if (itemIndex > -1) {
        this.items.splice(itemIndex, 1);
        return new HttpResponse({ status: 200 });
      }
    }

    return new HttpResponse({ status: 404, body: { error: 'Not found' } });
  }

  private getNextId(): number {
    return Math.max(...this.items.map((item) => item.id), 0) + 1;
  }
}
