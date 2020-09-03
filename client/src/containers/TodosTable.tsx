import React, { FC } from 'react';
import { Paper, Table, TableContainer, TableBody } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Todo, TodosTableHeader, HeaderStyle, RowStyle } from '../types';

import TableHeader from '../components/header/Header';
import RowPlaceHolder from '../components/row/RowPlaceHolder';
import Row from '../components/row/Row';

const useStyles = makeStyles({
  root: {
    width: '100%'
  },
  container: {
    maxHeight: 550,
    scrollBehavior: 'smooth'
  }
});
const TodosTable: FC<{
  data: Todo[];
  header: TodosTableHeader[];
  stickyHeader: boolean;
  placeHolder?: string;
  headerStyle?: HeaderStyle;
  rowStyle?: RowStyle;
  onCompleteTodo: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean,
    id: string
  ) => void;
  onDeleteTodo: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ) => void;
}> = ({
  data,
  header,
  headerStyle,
  rowStyle,
  placeHolder,
  onDeleteTodo,
  onCompleteTodo,
  stickyHeader = true
}) => {
  //
  //
  const classes = useStyles();
  //
  //
  return (
    <div className="table-wrapper">
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader={stickyHeader} aria-label="sticky table">
            {/**
             *
             *
             */}
            <TableHeader data={header} headerStyle={headerStyle} />
            {/**
             *
             *
             */}
            <TableBody>
              {!data.length ? (
                /**
                 *
                 *
                 */
                <RowPlaceHolder
                  placeHolder={placeHolder || 'Put your place holder here'}
                  colSpan={header.length}
                  rowStyle={rowStyle}
                />
              ) : (
                /**
                 *
                 *
                 */
                data.map((todo) => {
                  return (
                    <Row
                      data={todo}
                      rowStyle={rowStyle}
                      onDeleteTodo={(e, id) => onDeleteTodo(e, id)}
                      onCompleteTodo={(e, checked, id) =>
                        onCompleteTodo(e, checked, id)
                      }
                    />
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default TodosTable;
