import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function TableMember({ tData }) {

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {/* <TableCell align="right">transactionID</TableCell> */}
            <TableCell>userName</TableCell>
            <TableCell align="center">msisdn</TableCell>
            <TableCell align="center">operator</TableCell>
            <TableCell align="center">paidAmount</TableCell>
            <TableCell align="center">requestType</TableCell>
            <TableCell align="center">resultCode</TableCell>
            <TableCell align="center">resultDate</TableCell>
            <TableCell align="center">resultDesc</TableCell>
            <TableCell align="center">serviceType</TableCell>
            <TableCell align="center">status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tData?.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {/* <TableCell align="center">{row.transactionID}</TableCell> */}
              <TableCell component="th" scope="row">
                {row.userName}
              </TableCell>
              <TableCell align="center">{row.msisdn}</TableCell>
              <TableCell align="center">{row.operator}</TableCell>
              <TableCell align="center">{row.paidAmount}</TableCell>
              <TableCell align="center">{row.requestType}</TableCell>
              <TableCell align="center">{row.resultCode}</TableCell>
              <TableCell align="center">{row.resultDate}</TableCell>
              <TableCell align="center">{row.resultDesc}</TableCell>
              <TableCell align="center">{row.serviceType}</TableCell>
              <TableCell align="center">
                {row.status ? (
                  <u style={{ color: "green" }}>{"True"}</u>
                ) : (
                  "False"
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
