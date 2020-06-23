import { ActionCreator } from '@ngrx/store';
import { NotAllowedCheck, TypedAction } from '@ngrx/store/src/models';

export type InjectAction<T extends string, P extends object> =
ActionCreator<T, (props: P & NotAllowedCheck<P>) => P & TypedAction<T>>;
