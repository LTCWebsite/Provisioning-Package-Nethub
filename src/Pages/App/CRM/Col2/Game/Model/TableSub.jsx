import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function TableSub({tData}) {

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>gameName</TableCell>
            <TableCell align="">header</TableCell>
            <TableCell align="">userName</TableCell>
            <TableCell align="">msisdn</TableCell>
            <TableCell align="center">operator</TableCell>
            <TableCell align="">registerDate</TableCell>
            <TableCell align="center">resultCode</TableCell>
            <TableCell align="center">resultDesc</TableCell>
            <TableCell align="center">status</TableCell>
            <TableCell align="">cancleDate</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tData?.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{row.gameName}</TableCell>
              <TableCell align="">{row.header}</TableCell>
              <TableCell align="">{row.userName}</TableCell>
              <TableCell align="">{row.msisdn}</TableCell>
              <TableCell align="center">{row.operator}</TableCell>
              <TableCell align="">{row.registerDate}</TableCell>
              <TableCell align="center">{row.resultCode}</TableCell>
              <TableCell align="center">{row.resultDesc}</TableCell>
              <TableCell align="center">{row.status ? <u style={{color: "green"}}>{"True"}</u> : 'False'}</TableCell>
              <TableCell align="">{row.cancleDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
