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
        fontSize: 14,
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



function Flashcards(){
    const dispatch = useDispatch();
    const classes = useStyles();
    const classes2 = useStyles2();
    const classes3 = useStyles3();
    const classes4 = useStyles4();


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
                <Grid item xs={2}>
                    <Typography variant="h4" align="left" gutterBottom>
                        Select Flashcard Set
                    </Typography>
                <ul class="list-group">
      
                {flashcardTitle.map((titleName) =>
                    <div className={classes.root}> 
                        <li class="list-group-item">
                            <Button value={titleName} 
                                    onClick={(e) => getByTitle(e.currentTarget.getAttribute('value'))}>{titleName}
                            </Button>
                        </li>
                    </div>
        )}
                </ul>
            </Grid>
                <Grid item xs={10} align="center">
     
  
        {/* 
        <button value = "hiragana" onClick={(e) => getByTitle(e.target.value)}>Hiragana</button>
        <button value = "katakana" onClick={(e) => getByTitle(e.target.value)}>Katakana</button>
        */}
                    {flashcard.length == 0 ?
                        <p> </p> : 
                        cardFlip == true ?
                         
                                    <Card boxShadow={3} className={classes3.root}>
                                        <CardContent>
                           
                                            <p>Click Me:</p>
                                                <p class="font_size" onClick={() => setNewCardFlip(false)} >
                                                {flashcard[num].japanese}</p> 
                                        </CardContent>
                                    </Card>
                       
                      
            
            
                        :
                         
                                    <Card boxShadow={3} className={classes3.root}>
                                        <CardContent>
                                            <p>Click Me:</p>
                                                <p class="font_size" onClick={() => setNewCardFlip(true)}>
                                                    {flashcard[num].english}</p>
                                        </CardContent>
                                    </Card>
            
                    }

                             {flashcard.length == 0 ? <p></p>: 
                             <div>
                                <div>
                                        <IconButton aria-label="delete" className={classes4.margin} size="medium">
                                            <ArrowBackIosIcon onClick={(e) => handleDecrease(num, flashcard)} fontSize="inherit" />
                                        </IconButton>
                                </div>                               
                                        <p> {num + 1 }/{flashcard.length} </p>
                                <div>
                                        <IconButton aria-label="delete" className={classes4.margin} size="medium">
                                            <ArrowForwardIosIcon onClick={(e) => handleIncrease(num, flashcard)} fontSize="inherit" />
                                        </IconButton>
                                </div>
                            </div>
                        }
                </Grid>
            </Grid>
        </div>
        </>
    )
}

export default Flashcards;