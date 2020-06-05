import { Params, Data } from '@angular/router';
import { RouterReducerState } from '@ngrx/router-store';
import { routerReducer } from '@ngrx/router-store';

interface MergedRouter {
  url: string;
  queryParams: Params;
  params: Params;
  data: Data;
}

export type RouterState = RouterReducerState<MergedRouter>;

export const reducer = routerReducer;
