import { createFeatureSelector } from '@ngrx/store';
import { RouterState } from '../reducers/router.reducer';
import * as fromRouter from '@ngrx/router-store';
import { AppState } from '..';

export const selectRouterState =  createFeatureSelector<AppState, RouterState>('router');

export const selectRouteParam = fromRouter.getSelectors(selectRouterState);

