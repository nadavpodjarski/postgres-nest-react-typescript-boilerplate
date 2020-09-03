import React, { FC } from 'react';
import { TableRow, TableCell } from '@material-ui/core';
import { RowStyle } from '../../types';

const PlaceHolder: FC<{
  placeHolder: string;
  colSpan: number;
  rowStyle?: RowStyle;
}> = ({ placeHolder, colSpan = 3, rowStyle = {} }) => {
  return (
    <TableRow hover>
      <TableCell colSpan={colSpan}>
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            ...rowStyle
          }}
        >
          {placeHolder}
        </div>
      </TableCell>
    </TableRow>
  );
};

export default PlaceHolder;
