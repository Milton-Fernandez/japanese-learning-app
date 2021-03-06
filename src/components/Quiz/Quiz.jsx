import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import './Quiz.css';
import React from 'react';
import Typography from '@material-ui/core/Typography';
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
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import swal from 'sweetalert';


let correction = 0;
let incorrection = 0;


//black border
const defaultProps = {
    bgcolor: 'background.paper',
    m: 1,
    style: { width: '5rem', height: '5rem' },
    borderColor: 'text.primary',
};
//material const for title
const useStyles = makeStyles({
    root: {
        width: '100%',
        maxWidth: 500,
    },
});
//materiual function style for list
const useStyles2 = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            height: 400,
            maxWidth: 300,
            backgroundColor: theme.palette.background.paper,
        },
    }),
);
//material ui function for input box
const useStyles3 = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
                width: '25ch',
            },
        },
    }),
);

//material ui button 
const useStyles4 = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1),
            },
        },
    }),
);
//material ui for grids
const useStyles5 = makeStyles((theme: Theme) =>
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
const useStyles6 = makeStyles({
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

//material ui for list
const useStyles7 = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            height: 400,
            maxWidth: 300,
            backgroundColor: theme.palette.background.paper,
        },
    }),
);

//material ui for table
const useStyles8 = makeStyles({
    root: {
        width: '90%',
    },
    container: {
        maxHeight: 440,
    },
});


function renderRow(props: ListChildComponentProps) {
    const { index, style } = props;

    return (
        <ListItem button style={style} key={index}>
            <ListItemText primary={`Item ${index + 1}`} />
        </ListItem>
    );
}

function Quiz(){
    const classes = useStyles();
    const classes2 = useStyles2();
    const classes3 = useStyles3();
    const classes4 = useStyles4();
    const classes5 = useStyles5();
    const classes6 = useStyles6();
    const classes7 = useStyles7();
    const classes8 = useStyles8();
    //declared dispatch
    const dispatch = useDispatch();


    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); 
    var yyyy = today.getFullYear();
    
  
    today = mm + '/' + dd + '/' + yyyy;

    var d = new Date(); // for now
    d.getHours(); // => 9
    d.getMinutes(); // =>  30
    d.getSeconds(); // => 51
    console.log('d',d);



    //store used for quiz
    const dataStore = useSelector(store => store.data);
  
    const user = useSelector((store) => store.user);
 

    //declard local state and variables
    const [quiz, setNewQuiz] = useState([]);
    const [num, setNewNum] = useState(0);
    const [answer, setAnswer] = useState('');
    const [correct, setCorrect] = useState(0);
    const [incorrect,setIncorrect] = useState(0);
    const [titles,setTitles] = useState([]);
    const titleName = sortArray(dataStore);
    console.log('titles',titles);
    const sortedtitlesName = titleName.sort();
    console.log('sorted',sortedtitlesName);
    const [quizname, setQuizName] = useState('');
 
    const [buttonTag, setButtonTag] = useState(false);
    const userCreated = useSelector((store) => store.usercreated);
    const newArray = sortTheArray();
    const sortedNewArray = sortArray(newArray);
    function sortTheArray() {
        let emptyArray = [];
        for (let i = 0; i < userCreated.length; i++) {
            if (userCreated[i].user == user.username) {
                emptyArray.push(userCreated[i]);
            }

        }

        return emptyArray;
    }
    //sorts an array by only its titles in alphabetical order.
    function sortArray(quiz){
      
        let array = [];
       
        for( let i = 0; i < quiz.length; i++){
            array.push(quiz[i].title);
        }
      //filters array into unique titles
         let titleArray = array.filter((value,index)=> array.indexOf(value) === index);   
       //puts array in alphabetical order
        titleArray.sort(function (a, b) {
            return a.length - b.length;
        });
    
         return titleArray;     
        
    } 

    //function to pick a quiz by its title
    function getByTitle(title_name){
        setQuizName(title_name);
        correction = 0;
        incorrection = 0;
        let title = title_name;
        let newQuiz = [];
        for(let i = 0; i < dataStore.length; i++){
            if(dataStore[i].title == title){
                newQuiz.push(dataStore[i]);
            } 
        }
        setNewQuiz(newQuiz); 
        setCorrect(0);
        setIncorrect(0);
        setNewNum(0);
        dispatch({ type: 'FETCH_DATA' });
        return ;
    }
 


    function getByTitle2(title_name) {
        setQuizName(title_name);
        correction = 0;
        incorrection = 0;
        let title = title_name;
        let newQuiz = [];
        for (let i = 0; i < newArray.length; i++) {
            if (newArray[i].title == title) {
                newQuiz.push(newArray[i]);
            }
        }
        setNewQuiz(newQuiz);
        setCorrect(0);
        setIncorrect(0);
        setNewNum(0);
        dispatch({ type: 'FETCH_USERCREATE_DATA' });
        return;
    }



    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);


    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };


    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    //handles user input. If the user has correct answer, the correct variable will increase by one.
    // If they are incorrect, the incorrect variable will increase by one. If they reach the end of the quiz,
    //quiz result will dispatch and the quiz will restart. 
    function handleSubmit(event) {
        event.preventDefault();
 
        //increments correct variable by 1 if answer is correct
            if(quiz[num].english == answer){
                
                setNewNum(num+1);
                
                correction = correction + 1;
                setCorrect(correct + 1);
                console.log("correction", correction);
                
            }
        //decrements incorrect variable by 1 if answer is incorrect
            else{
                
                setNewNum(num + 1);
               
                incorrection = incorrection + 1;
                setIncorrect(incorrect + 1);
             
                console.log("incorrection", incorrection);
        }
            setAnswer('');
     
        if((quiz.length-1) == num){
           
     
           swal({title:'Finished Quiz: ',
            text: "Score:  " + correction + "/" + incorrection,
            icon: "success"
            });
            dispatch({
                type: 'ADD_RESULT',
                payload: {
                    correct: correction,
                    incorrect: incorrection,
                    user: user.id,
                    name: user.username,
                    quizname: quizname,
                    date: today
                }
            });
           setNewNum(0);
            setCorrect(0);
            setIncorrect(0);
            correction = 0;
            incorrection = 0;

        }
    }
 

    useEffect(()=>{
        dispatch({type:'FETCH_DATA'});
        setTitles(sortArray(dataStore));
        dispatch({ type: 'FETCH_USERCREATE_DATA' });
    },[]);
    
    function handleFreeClick(){
        setButtonTag(false);
    }

    function handlePersonalClick(){
        setButtonTag(true);

    }

    return(
        <>
     
        <div className={classes5.root}>
            <Grid container spacing={4} justify="center" alignItems="center">
                <Grid item xs={3}>
                    <Typography variant="h4" align="left" gutterBottom>
                        Select Quiz
                    </Typography>
                        {user.id && (<>
                            { user.admin == true ?
                                <>
                                </>
                                :
                    <div>
                        <button onClick={(e) => handleFreeClick()}>
                        Free
                    </button>
                        <button onClick={(e) => handlePersonalClick()}>Personal</button>
                    </div>
                            }
                            </>
                        )}

                            
                        {buttonTag == false ?
                        <Paper align="center" className={classes8.root}>
                            <TableContainer className={classes8.container}>
                                    <Table stickyHeader aria-label="sticky table" >
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>
                                                   Free Quizzes
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {sortedtitlesName.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((titleName) =>
                                                <TableRow>
                                                    <TableCell>
                                                <div className={classes4.root}>
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
                                    count={titleName.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onChangePage={handleChangePage}
                                    onChangeRowsPerPage={handleChangeRowsPerPage}>
                                </TablePagination>
                            </Paper>
                                :
                                <>
                                <Paper align="center" className={classes8.root}>
                                    <TableContainer className={classes8.container}>
                                        <Table stickyHeader aria-label="sticky table" >
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>
                                                       Personal Quizzes
                                                </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {sortedNewArray.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((titleName) =>
                                                    <TableRow>
                                                        <TableCell>
                                                            <div className={classes4.root}>
                                                                <Button value={titleName}
                                                                    onClick={(e) => getByTitle2(e.currentTarget.getAttribute('value'))}>{titleName}
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
                                        count={sortedNewArray.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onChangePage={handleChangePage}
                                        onChangeRowsPerPage={handleChangeRowsPerPage}>
                                    </TablePagination>
                                </Paper>
                                
                                </>
                                            }
      
                </Grid>





                <Grid item xs={8} align="center">
                    {quiz.length == 0?<p></p>:
                        <div>
                            <div>
                                {quiz.length == 0 ?
                                    <p></p>:

                                        <Card className={classes6.root}>
                                             <CardContent>
                                                <Typography variant="h2" gutterBottom>
                                                  
                                                       {quiz[num].japanese}
                                                
                                                    </Typography>
                                            </CardContent>
                                        </Card>
                        }


                    <form onSubmit={handleSubmit}>
                        <TextField
                            //required
                            size="small"
                            id="outlined-required"
                            label="Required"
                            placeholder="Answer"
                            variant="outlined"
                            value={answer} 
                            onChange={event => setAnswer(event.target.value)}
                        />
                        <Button type="submit" variant="contained">Enter</Button> 

 
                    </form>
                </div>

            <div>
            <p>Correct:{correction}</p> <p>Incorrect:{incorrection}</p>
        </div>
        </div>
            }







        </Grid>
        </Grid>           
        </div>
        </>
    )
}

export default Quiz