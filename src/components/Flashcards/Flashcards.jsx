import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import './Flashcards.css';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';



const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1),
            },
        },
    }),
);

//material ui for grids
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

//material ui for cards
const useStyles3 = makeStyles({
    root: {
        width: 275,
        height: 200
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 28,
    },
    pos: {
        marginBottom: 12,
    },

});
//material ui for arrow button
const useStyles4 = makeStyles((theme: Theme) =>
    createStyles({
        margin: {
            margin: theme.spacing(1),
        },
        extendedIcon: {
            marginRight: theme.spacing(1),
        },
    }),
);

//material ui for table
const useStyles5 = makeStyles({
    root: {
        width: '90%',
    },
    container: {
        maxHeight: 440,
    },
});

function Flashcards(){
    const dispatch = useDispatch();
    const classes = useStyles();
    const classes2 = useStyles2();
    const classes3 = useStyles3();
    const classes4 = useStyles4();
    const classes5 = useStyles5();

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
        dispatch({ type: 'FLASHCARD_DATA' });
        setTitles(sortArray(dataStore));
    }, []);
   //declared vairables
    const dataStore = useSelector(store => store.flashcard);
    const [flashcard, setNewFlashcard] = useState([]);
    const [num, setNewNum] = useState(0);
    const [word, setNewWord] = useState('');
    const [cardFlip, setNewCardFlip] = useState(true);
    const [titles, setTitles] = useState([]);
    const flashcardTitle = sortArray(dataStore);
//get the titles from the dataStore and puts in into an array
    function sortArray(flashcards) {
        let array = [];
        for (let i = 0; i < flashcards.length; i++) {
            array.push(flashcards[i].title);
        }
        return array.filter((value, index) => array.indexOf(value) === index);
    } 
    //function to pick a quiz by its title
    function getByTitle(title_name) {
        
        let title = title_name;
        let newFlashcard = [];
        setNewNum(0);
        for (let i = 0; i < dataStore.length; i++) {
            if (dataStore[i].title == title) {
                newFlashcard.push(dataStore[i]);
            }
        }
        setNewFlashcard(newFlashcard);
        return;
    }
    console.log(flashcard);
//handles the arrows key to traverse the array
function handleDecrease(number,flashcards){
 
    setNewNum(num - 1);
    console.log(number);
    console.log(flashcards.length)
    if(number <= 0){
        setNewNum(flashcards.length-1);
    }
}

//handles the arrows key to traverse the array
    function handleIncrease(number, flashcards) {

        setNewNum(num + 1);
        console.log(number);
        console.log(flashcards.length)
        if (number > flashcards.length - 2) {
            setNewNum(0);
        }

    }

    return(
        <>
        <div className={classes2.root}>
            <Grid container spacing={4} justify="center" alignItems="center">
                <Grid item xs={3}>
                    <Typography variant="h4" align="left" gutterBottom>
                        Select  Flashcard 
                    </Typography>
            


                        <Paper className={classes5.root}>
                            <TableContainer className={classes5.container}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>
                                                Flashcard Sets
                                                </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
      
                                        {flashcardTitle.map((titleName) =>
                                            <TableRow>
                                                <TableCell>
                                            <div className={classes.root}> 
                      
                                                <Button value={titleName} 
                                                     onClick={(e) => getByTitle(e.currentTarget.getAttribute('value'))}>{titleName}
                                                </Button>
                  
                                            </div>
                                                </TableCell>
                                            </TableRow>
                                                       
                                        )}
                
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={([10, 25, 100])}
                                component="div"
                                count={flashcardTitle.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}>
                            </TablePagination>
                        </Paper>


            </Grid>
                <Grid item xs={8} align="center">
     
  
        {/* 
        <button value = "hiragana" onClick={(e) => getByTitle(e.target.value)}>Hiragana</button>
        <button value = "katakana" onClick={(e) => getByTitle(e.target.value)}>Katakana</button>
        */}
                    {flashcard.length == 0 ?
                        <p> </p> : 
                        cardFlip == true ?
                         
                                    <Card boxShadow={3} className={classes3.root}>
                                        <CardContent>
                                            <Typography>
                                                Click Me:
                                            </Typography>
                                            <Typography variant = "h3" onClick={() => setNewCardFlip(false)}>
                                                {flashcard[num].japanese}
                                            </Typography>
                                           
                                         
                                        </CardContent>
                                    </Card>
                                    :           
                                    <Card boxShadow={3} className={classes3.root}>
                                        <CardContent>
                                            <Typography>
                                                Click Me:
                                            </Typography>
                                            <Typography variant="h3" onClick={() => setNewCardFlip(true)}>
                                                {flashcard[num].english}
                                            </Typography>
                                        </CardContent>
                                    </Card>
            
                    }

                             {flashcard.length == 0 ? <p></p>: 
                             <div>
                            
                                        <IconButton aria-label="delete" className={classes4.margin} size="medium" >
                                            <ArrowBackIosIcon onClick={(e) => handleDecrease(num, flashcard)} fontSize="inherit" />
                                        </IconButton>
                                                             
                                        <p> {num + 1 }/{flashcard.length} </p>
                            
                                        <IconButton aria-label="delete" className={classes4.margin} size="medium">
                                            <ArrowForwardIosIcon onClick={(e) => handleIncrease(num, flashcard)} fontSize="inherit" />
                                        </IconButton>
                                
                            </div>
                        }
                </Grid>
            </Grid>
        </div>
        </>
    )
}

export default Flashcards;