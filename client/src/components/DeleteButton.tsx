import React, { Dispatch, FC } from 'react';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const DeleteButton: FC<{
  onClick: Dispatch<React.MouseEvent<HTMLButtonElement, MouseEvent>>;
}> = ({ onClick }) => {
  //
  //
  return (
    <IconButton onClick={(e) => onClick(e)}>
      <DeleteIcon />
    </IconButton>
  );
};

export default DeleteButton;
