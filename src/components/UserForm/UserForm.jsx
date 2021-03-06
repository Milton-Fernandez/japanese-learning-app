import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import CreateUserRow from '../CreateUserRow/CreateUserRow';
import React from 'react';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles({
    root: {
        width: '90%',
    },
    container: {
        maxHeight: 440,
    },
});

const useStyles2 = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
    }),
);
let array = [];
function UserForm(){
    const classes = useStyles();
    const classes2 = useStyles2();
    const [newTitle, setNewTitle] = useState('');
    const [newJapanese, setNewJapanese] = useState('');
    const [newEnglish, setNewEnglish] = useState('');
    const [newKey, setNewKey] = useState('');
    const [edit, setEdit] = useState(true)
    const user = useSelector((store) => store.user);
    const userCreated = useSelector((store) => store.usercreated);
    const dispatch = useDispatch();
    const newArray = sortTheArray();
   


  

    function sortTheArray(){
        let emptyArray =[];
        for(let i = 0; i < userCreated.length;i++){
            if(userCreated[i].user == user.username){
                emptyArray.push(userCreated[i]);
            }
            
        }
        
        return emptyArray;
    }

console.log('sorted' ,newArray);




    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);


    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };


    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        dispatch({ type: 'FETCH_USERCREATE_DATA'});
    }, []);


    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch({
            type: 'ADD_USERCREATE_DATA',
            payload: {
                title: newTitle,
                japanese: newJapanese,
                english: newEnglish,
                key: newKey,
                user: user.username
            }
        });
        dispatch({ type: 'FETCH_USERCREATE_DATA' });
        setNewTitle('');
        setNewJapanese('');
        setNewEnglish('');
        setNewKey('');
 
    }


  

    return(
        <>
            <div>
                <Grid
                    container spacing={4}
                    direction="column"
                    justify="center"
                >
                    <Grid item xs={12}>
                    <h2>Enter New Data:</h2>
                    <form onSubmit={handleSubmit}>


                        <TextField
                            required
                            size="small"
                            id="outlined-required"
                            label="Title"
                            placeholder="Title"
                            variant="outlined"
                            value={newTitle}
                            onChange={event => setNewTitle(event.target.value)}
                        />
                        <TextField
                            required
                            size="small"
                            id="outlined-required"
                            label="Japanese"
                            placeholder="Japanese"
                            variant="outlined"
                            value={newJapanese}
                            onChange={event => setNewJapanese(event.target.value)}
                        />
                        <TextField
                            required
                            size="small"
                            id="outlined-required"
                            label="English"
                            placeholder="English"
                            variant="outlined"
                            value={newEnglish}
                            onChange={event => setNewEnglish(event.target.value)}
                        />
                        <TextField
                            required
                            size="small"
                            id="outlined-basic"
                            label="Key"
                            placeholder="Key"
                            variant="outlined"
                            value={newKey}
                            onChange={event => setNewKey(event.target.value)}
                        />
                        <Button type="submit" variant="contained">Enter</Button>
                    </form>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={classes.root}>
                            <TableContainer className={classes.container}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Title</TableCell>
                                            <TableCell>Japanese</TableCell>
                                            <TableCell>English</TableCell>
                                            <TableCell>Key</TableCell>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>

                                        {newArray.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data) => {
                                            return (

                                                <CreateUserRow
                                                    key={data.id}
                                                    data={data}
                                                />
                                            )

                                        }

                                        )}

                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={([10, 25, 100])}
                                component="div"
                                count={newArray.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onChangePage={handleChangePage}    
                                onChangeRowsPerPage={handleChangeRowsPerPage}>
                            </TablePagination>
                        </Paper>
                </Grid>
            </Grid>
            </div>
        </>
    )
}

export default UserForm;