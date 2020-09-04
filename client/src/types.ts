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

export interface ITodoTable {
  data: Todo[];
  header: TodosTableHeader[];
  stickyHeader: boolean;
  placeHolder?: string;
  headerStyle?: HeaderStyle;
  rowStyle?: RowStyle;
  isLoading: boolean;
  onCompleteTodo: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean,
    id: string
  ) => void;
  onDeleteTodo: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ) => void;
}
