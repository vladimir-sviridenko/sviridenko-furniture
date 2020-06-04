import { createFeatureSelector } from '@ngrx/store';
import { RouterState } from './router.reducer';
import { AppState } from '@store/AppState';
import * as fromRouter from '@ngrx/router-store';

export const selectRouterState =  createFeatureSelector<AppState, RouterState>('router');

export const selectRouteParam = fromRouter.getSelectors(selectRouterState);

