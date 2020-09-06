import React, { FC, useState, useEffect } from 'react';

import { Snackbar, SnackbarOrigin } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

import { IStore, AlertType } from '../../types';
import { useSelector, useDispatch } from 'react-redux';
import { clearSnackBar } from '../../redux/actions/ui/actions';

const Toast: FC<{ position: SnackbarOrigin; duration: number }> = ({
  position: { vertical, horizontal },
  duration
}) => {
  const snackBarState = useSelector((state: IStore) => state.ui.snackbar);

  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>(snackBarState.msg);
  const [type, setType] = useState<AlertType>(snackBarState.type);

  const onCloseHandler = () => {
    dispatch(clearSnackBar());
  };

  useEffect(() => {
    if (!snackBarState.msg) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
      setType(snackBarState.type);
      setMsg(snackBarState.msg);
    }
  }, [snackBarState]);

  return (
    <Snackbar
      onClose={onCloseHandler}
      open={isOpen}
      autoHideDuration={duration}
      anchorOrigin={{ vertical, horizontal }}
    >
      <MuiAlert elevation={6} variant="filled" severity={type}>
        {msg}
      </MuiAlert>
    </Snackbar>
  );
};

export default Toast;
