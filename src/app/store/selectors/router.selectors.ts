import { createFeatureSelector, MemoizedSelector } from '@ngrx/store';
import { RouterState } from '../reducers/router.reducer';
import { AppState, FeatureKey } from '..';

export const selectRouterState: MemoizedSelector<AppState, RouterState>
	= createFeatureSelector<AppState, RouterState>(FeatureKey.Router);
