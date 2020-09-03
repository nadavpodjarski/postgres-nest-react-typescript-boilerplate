import { CSSProperties } from 'react';

export type Todo = {
  content: string;
  createdOn: string;
  completed: boolean;
  id: string;
};

export type TodosTableHeader = {
  id: string;
  label: string;
  minWidth: number;
};

export type HeaderStyle = CSSProperties;
export type RowStyle = CSSProperties;

export type Action = {
  type: string;
  payload: any;
};

export interface ITodoState {
  todos: Todo[];
  isLoading: boolean;
  err: any;
}

export interface IStore {
  todo: ITodoState;
  ui: IUiState;
}

export interface IUiState {
  snackbar: SnackBarAlert;
}

export type AlertType = 'success' | 'info' | 'warning' | 'error' | undefined;

export type SnackBarAlert = {
  type: AlertType;
  msg: string;
};
