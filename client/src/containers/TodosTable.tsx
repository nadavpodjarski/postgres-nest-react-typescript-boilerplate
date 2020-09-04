import React, { FC } from 'react';
import { Paper, Table, TableContainer, TableBody } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { ITodoTable } from '../types';
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
const TodosTable: FC<ITodoTable> = ({
  data,
  header,
  headerStyle,
  rowStyle,
  placeHolder,
  isLoading,
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
              {data.length ? (
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
              ) : (
                /**
                 *
                 *
                 */
                <RowPlaceHolder
                  placeHolder={
                    isLoading
                      ? 'Loading...'
                      : placeHolder || 'Put your place holder here'
                  }
                  colSpan={header.length}
                  rowStyle={rowStyle}
                />
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default TodosTable;
