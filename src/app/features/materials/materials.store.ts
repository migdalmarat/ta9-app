import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { MaterialItem } from '../../models/material-item';
import { computed, inject, Injector } from '@angular/core';
import { MaterialsService } from '../../services/materials.service';
import { debounceTime, distinctUntilChanged, pipe, switchMap, tap } from 'rxjs';

type MaterialsState = {
  items: MaterialItem[];
  currentItem: MaterialItem | undefined;
  isLoading: boolean;
  error: string | null;
  filter: { query: string; order: 'asc' | 'desc' };
};

const initialState: MaterialsState = {
  items: [],
  currentItem: undefined,
  isLoading: false,
  error: null,
  filter: { query: '', order: 'asc' },
};

export const MaterialsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ items, filter }) => ({
    itemsCount: computed(() => items().length),
    sortedItems: computed(() => {
      const direction = filter.order() === 'asc' ? 1 : -1;

      return items().toSorted(
        (a, b) => direction * a.name.localeCompare(b.name)
      );
    }),
  })),
  withMethods((store, materialsService = inject(MaterialsService)) => ({
    loadItems: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(() => {
          return materialsService.getItems().pipe(
            tapResponse<MaterialItem[]>({
              next: (items) => patchState(store, { items, isLoading: false }),
              error: (err) => {
                const errorMessage =
                  err instanceof Error ? err.message : String(err);
                patchState(store, { isLoading: false, error: errorMessage });
                console.error(err);
              },
            })
          );
        })
      )
    ),
    addItem: rxMethod<MaterialItem>(
      pipe(
        switchMap((item) => {
          return materialsService.addItem(item).pipe(
            tapResponse<MaterialItem>({
              next: (item) =>
                patchState(store, {
                  items: [...store.items(), item],
                }),
              error: (err) => {
                const errorMessage =
                  err instanceof Error ? err.message : String(err);
                patchState(store, { error: errorMessage });
                console.error(err);
              },
            })
          );
        })
      )
    ),
    updateItem: rxMethod<MaterialItem>(
      pipe(
        switchMap((updatedItem) => {
          return materialsService.updateItem(updatedItem).pipe(
            tapResponse<MaterialItem>({
              next: (updatedItem) =>
                patchState(store, {
                  items: store
                    .items()
                    .map((i) => (i.id === updatedItem.id ? updatedItem : i)),
                }),
              error: (err) => {
                const errorMessage =
                  err instanceof Error ? err.message : String(err);
                patchState(store, { error: errorMessage });
                console.error(err);
              },
            })
          );
        })
      )
    ),
    deleteItem: rxMethod<number>(
      pipe(
        switchMap((id) => {
          return materialsService.deleteItem(id).pipe(
            tapResponse<void>({
              next: () =>
                patchState(store, {
                  items: store.items().filter((item) => item.id !== id),
                }),
              error: (err) => {
                const errorMessage =
                  err instanceof Error ? err.message : String(err);
                patchState(store, { error: errorMessage });
                console.error(err);
              },
            })
          );
        })
      )
    ),
    loadByQuery: rxMethod<string>(
      pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => patchState(store, { isLoading: true })),
        switchMap((query) => {
          return materialsService.getByQuery(query).pipe(
            tapResponse({
              next: (items) => patchState(store, { items, isLoading: false }),
              error: (err) => {
                patchState(store, { isLoading: false });
                console.error(err);
              },
            })
          );
        })
      )
    ),
  }))
);
