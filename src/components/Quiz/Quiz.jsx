import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import './Quiz.css';

import React from 'react';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
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
    //declared dispatch
    const dispatch = useDispatch();
    //store used for quiz
    const dataStore = useSelector(store => store.data);
  
    const user = useSelector((store) => store.user);
    console.log(user);

    //declard local state and variables
    const [quiz, setNewQuiz] = useState([]);
    const [num, setNewNum] = useState(0);
    const [answer, setAnswer] = useState('');
    const [correct, setCorrect] = useState(0);
    const [incorrect,setIncorrect] = useState(0);
    const [titles,setTitles] = useState([]);
    const titleName = sortArray(dataStore);
    const [quizname, setQuizName] = useState('');
 
    console.log("titleTest",titleName);

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
        console.log("titleArray", titleArray);
         return titleArray;     
        
    } 

    //function to pick a quiz by its title
    function getByTitle(title_name){
        setQuizName(title_name);
       
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
    console.log("quizname", quizname);

    //handles user input. If the user has correct answer, the correct variable will increase by one.
    // If they are incorrect, the incorrect variable will increase by one. If they reach the end of the quiz,
    //quiz result will dispatch and the quiz will restart. 
    function handleSubmit(event) {
        event.preventDefault();
        let correction = 0;
        let incorrection = 0;
        //increments correct variable by 1 if answer is correct
            if(quiz[num].english == answer){
                console.log('Hey your correct');
                setNewNum(num+1);
                setCorrect(correct+1);
                correction = correction + 1;
                console.log("correction", correction);
                
            }
        //decrements incorrect variable by 1 if answer is incorrect
            else{
                console.log('incorrect');
                setNewNum(num + 1);
                setIncorrect(incorrect + 1);
                incorrection = incorrection + 1;
                console.log(incorrection);
        }
            setAnswer('');
     
        if((quiz.length-1) == num){
            console.log("quiz length",quiz.length);
       
            console.log(correction);
            console.log(incorrection);
     
            alert('finished quiz: your score:  ' + correct + "/" + incorrect);
            dispatch({
                type: 'ADD_RESULT',
                payload: {
                    correct: correct,
                    incorrect: incorrect,
                    user: user.id,
                    name: user.username,
                    quizname: quizname
                }
            });
            setNewNum(0);
            setCorrect(0);
            setIncorrect(0);
            correction = 0;
            incorrection = 0;

        }



    }
    console.log(titles);

    useEffect(()=>{
        dispatch({type:'FETCH_DATA'});
        setTitles(sortArray(dataStore));
    },[]);
    return(
        <>
     
        <div className={classes5.root}>
            <Grid container spacing={4} justify="center" alignItems="center">
                <Grid item xs={2}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Select Quiz
                    </Typography>
        
                    <ul class="list-group">
                        {titleName.map((titleName) => 
                            <li class="list-group-item"> 
                                <div className={classes4.root}>
                                    <Button value={titleName} 
                                        onClick={(e) => getByTitle(e.currentTarget.getAttribute('value'))}>{titleName}
                                    </Button>
                                </div>
                            </li>
                        )}
                    </ul>
            
      
                </Grid>
                <Grid item xs={10} align="center">
                    {quiz.length == 0?<p></p>:
                        <div>
                            <div>
                                {quiz.length == 0 ?
                                    <p></p>:

                                        <div class= "margins">
                                            <div class="row">
                                                <div class="column">
                                                    <div class="card">
                                                        <p class="font_size">{quiz[num].japanese}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                        }


                    <form onSubmit={handleSubmit}>
                        <TextField
                            required
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
            <p>Correct:{correct}</p> <p>Incorrect:{incorrect}</p>
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