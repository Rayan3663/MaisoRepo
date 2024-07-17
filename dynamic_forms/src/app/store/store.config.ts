// // src/app/store/store.config.ts
// import { ActionReducerMap, MetaReducer } from '@ngrx/store';
// import { formReducer } from './form.reducer';
// import { ContractDetails } from '../form.models';
// import { localStorageSync } from 'ngrx-store-localstorage';

// export interface AppState {
//   contractDetails: ContractDetails;
// }

// export const reducers: ActionReducerMap<AppState> = {
//   contractDetails: formReducer
// };

// export const metaReducers: MetaReducer<AppState>[] = [localStorageSyncReducer];

// export function localStorageSyncReducer(reducer: any): any {
//   return localStorageSync({ keys: ['contractDetails'], rehydrate: true })(reducer);
// }