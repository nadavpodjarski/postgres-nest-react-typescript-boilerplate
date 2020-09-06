import React, { FC } from 'react';
import { TableRow, TableCell, Checkbox, makeStyles } from '@material-ui/core';
import DeleteButton from '../delete-button/DeleteButton';
import { Todo, RowStyle } from '../../types';

const useStyles = makeStyles(() => ({
  contentTableCell: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '1.2rem'
  },
  content: {
    textDecoration: ({ completed }: any) => (completed ? 'line-through' : '')
  },
  deleteButtonWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}));

const Row: FC<{
  data: Todo;
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
}> = ({ data, rowStyle = {}, onDeleteTodo, onCompleteTodo }) => {
  const { completed, content, createdOn } = data;
  const classes = useStyles({ completed });

  return (
    <TableRow
      style={rowStyle}
      hover
      tabIndex={-1}
      key={`${data.id}_${content}`}
    >
      <TableCell className={classes.contentTableCell}>
        <div className={classes.content}>{content}</div>
        <div className={classes.deleteButtonWrapper}>
          <DeleteButton onClick={(e) => onDeleteTodo(e, data.id)} />
        </div>
      </TableCell>
      <TableCell>{new Date(createdOn).toLocaleString('eu')}</TableCell>
      <TableCell style={{ textAlign: 'center' }}>
        <Checkbox
          checked={completed}
          onChange={(e, checked) => onCompleteTodo(e, checked, data.id)}
          id="completed"
        />
      </TableCell>
    </TableRow>
  );
};

export default Row;
