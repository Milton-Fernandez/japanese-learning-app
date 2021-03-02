import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import './Match.css';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
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
        height: 175
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
//material ui for table
const useStyles4 = makeStyles({
    root: {
        width: '90%',
    },
    container: {
        maxHeight: 440,
    },
});

function Match(){
    const classes = useStyles();
    const classes2 = useStyles2();
    const classes3 = useStyles3();
    const classes4 = useStyles4();
    //declared dispatch
    const dispatch = useDispatch();
    //store used for quiz
    const dataStore = useSelector(store => store.data);
    const titleName = sortArray(dataStore);
    const [quiz, setNewQuiz] = useState([]);
    const [titles, setTitles] = useState([]);
    const [quizname, setQuizName] = useState('');
    const[randomNumber,setRandomNumber] = useState(0);
    const[randonArray, setRandonArray] = useState([]);

    let match = 0;
    let englishOutput = randomEnglishOutputFunction(randonArray[randomNumber]);
    let eTarget = 0;
    function sortArray(quiz) {

        let array = [];

        for (let i = 0; i < quiz.length; i++) {
            array.push(quiz[i].title);
        }
        //filters array into unique titles
        let titleArray = array.filter((value, index) => array.indexOf(value) === index);
        //puts array in alphabetical order
        titleArray.sort(function (a, b) {
            return a.length - b.length;
        });
    
        return titleArray;

    } 


    function getByTitle(title_name) {
        console.log("title name",title_name);
        setQuizName(title_name);


        let title = title_name;
        let newQuiz = [];
        let randomNumberArray = [];
        let randomQuizArray = [];
        let number = 0;
        //push all of the title names into newQuiz array
        for (let i = 0; i < dataStore.length; i++) {
            if (dataStore[i].title == title) {
                newQuiz.push(dataStore[i]);
            }
        }
       //set new quiz
        setNewQuiz(newQuiz); 
        match = newQuiz.length;
        //creates a random number from quiz length, pushes array indexes into new array 
        for(let i = 0; i < 3; i++){
            number = Math.floor((Math.random() * (match - 1)) + 0);
            randomNumberArray.push(number);
            randomQuizArray.push(newQuiz[number]);
        }
        setRandonArray(randomQuizArray);
        setRandomNumber(Math.floor((Math.random() * (3)) + 0))
        return randomQuizArray;

    }

    function randomEnglishOutputFunction(array){
        let newArray = [];
        return newArray = array;
        
    }
    
    function handleClick(param){
    
        console.log("id", param);
        if(param == englishOutput.id){
            alert('match');
            console.log(quizname);
            getByTitle(quizname);
        }
        else{
            alert('not a match');
            console.log(quizname);
            getByTitle(quizname);
        }

    }
   
    useEffect(() => {
        dispatch({ type: 'FETCH_DATA' });
        setTitles(sortArray(dataStore));
    }, []);
    console.log("ransonArray",randonArray);



    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);


    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };


    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    return(
        <>
            <div className={classes2.root}>
                <Grid container spacing={8} justify="center" alignItems="center">
                    <Grid item xs={3}>
            
                        <Typography variant="h4" align="left" gutterBottom>
                            Match Game
                        </Typography>

                        <Paper className={classes4.root}>
                            <TableContainer className={classes4.container}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>
                                                Flashcard Sets
                                                </TableCell>
                                        </TableRow>
                                    </TableHead>
                                        <TableBody>
                                            {titleName.map((titleName) =>
                                            <TableRow>
                                                <TableCell>
                                                    <div>
                                                    <button value={titleName} onClick={(e) => getByTitle(e.target.value)}>{titleName}
                                                    </button>
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
                                count={titleName.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}>
                            </TablePagination>
                        </Paper>
       

                    </Grid>

                    <Grid item xs={9}>
                        <div class="row move_right">
                            <div class = "top">
                              

                            </div>
                    
                            {randonArray.map((tiles) =>
                                <div>                    
                                    <Card  className={classes3.root}>
                                        <CardContent value={tiles.id} 
                                        onClick={(event) => handleClick(event.currentTarget.getAttribute('value'))}>
                                            <Typography variant="h3" gutterBottom>

                                                {tiles.japanese} 

                                            </Typography>
                                            
                                  
                                        </CardContent>
                                    </Card>                                        
                                 
                                </div>
                            )}
                        </div>
            
                    <Grid item xs={6}>


                    </Grid>

                    <Grid item xs={6}>
                    <div class = "center">
                        <div class="row">
                
                        {randonArray.length == 0? <div> </div>:

                                        <Card boxShadow={3} className={classes3.root}>
                                            <CardContent >
                                                <Typography variant="h3" gutterBottom>

                                                    {englishOutput.english}

                                                </Typography>
                                         
                                        </CardContent>
                                        </Card>
                        }
            
                            </div>
                        </div>
                    </Grid>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

export default Match;