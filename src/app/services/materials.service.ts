import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { MaterialItem } from '../models/material-item';

export interface MaterialsListState {
  items: MaterialItem[];
  currentItem: MaterialItem | undefined;
  isLoading: boolean;
  error: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class MaterialsService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/items';

  private state = signal<MaterialsListState>({
    items: [],
    currentItem: undefined,
    isLoading: false,
    error: null,
  });

  items = computed(() => this.state().items);
  currentItem = computed(() => this.state().currentItem);
  isLoading = computed(() => this.state().isLoading);
  error = computed(() => this.state().error);

  private selectedItemIdSubject = new Subject<number>();
  private selectedItemId$ = this.selectedItemIdSubject.asObservable();

  constructor() {
    this.selectedItemId$
      .pipe
      // tap(() => this.setLoadingIndicator(true)),
      // tap((id) => this.setCurrentItem(id))
      ();
  }

  getItems(): Observable<MaterialItem[]> {
    return this.http.get<MaterialItem[]>(this.apiUrl);
  }

  getItem(id: number): Observable<MaterialItem> {
    return this.http.get<MaterialItem>(`${this.apiUrl}/${id}`);
  }

  addItem(item: MaterialItem): Observable<MaterialItem> {
    return this.http.post<MaterialItem>(this.apiUrl, item);
  }

  updateItem(item: MaterialItem): Observable<MaterialItem> {
    return this.http.put<MaterialItem>(`${this.apiUrl}/${item.id}`, item);
  }

  deleteItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getByQuery(query: string): Observable<MaterialItem[]> {
    return this.http.get<MaterialItem[]>(`${this.apiUrl}?q=${query}`);
  }
}
