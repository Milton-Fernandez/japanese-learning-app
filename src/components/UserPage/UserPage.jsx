import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

interface Column {
  id: 'quizname' | 'correct' | 'incorrect' | 'date';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}



const columns: Column[] = [
  { id: 'quizname', label: 'QuizName', minWidth: 100 },
  {
    id: 'correct',
    label: 'Correct',
    minWidth: 100,
    //align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'incorrect',
    label: 'Incorrect',
    minWidth: 100,
    //align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },

  { id: 'date', label: 'Date', minWidth: 100, },
];


const useStyles = makeStyles({
  root: {
    width: '90%',
  },
  container: {
    maxHeight: 440,
  },
});

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM


  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);


  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };


  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };



  const dispatch = useDispatch();

  const result = useSelector(store => store.result);
  const user = useSelector((store) => store.user);

  const table = resultTable(result).reverse();
  useEffect(() => {
    dispatch({ type: 'FETCH_RESULT' });

  }, []);
  console.log(result);
  console.log(user.username);


  function resultTable(array) {
    let newTable = [];
    for (let i = 0; i < array.length; i++) {
      if (user.username == array[i].name) {
        newTable.push(array[i]);
      }
    }
    console.log(newTable)
    return newTable
  }
  resultTable(result);
  return (
    <div className="container">
      <h1>Welcome, {user.username}!</h1>
      <br></br>
     
      <h3> Quiz Results </h3>
      <br></br>

      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {table.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value == 'number' ? column.format(value) : value}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={([10, 25, 100])}
          component="div"
          count={table.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}>
        </TablePagination>
      </Paper>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
