import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import './Flashcards.css';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1),
            },
        },
    }),
);


function Flashcards(){
    const dispatch = useDispatch();
    const classes = useStyles();


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
    
        <aside>
        <Typography variant="h4" align="left" gutterBottom>
            Select Flashcard Set
        </Typography>
        <ul class="list-group">
      
        {flashcardTitle.map((titleName) =>
            <div className={classes.root}> <li class="list-group-item"><Button value={titleName} 
                onClick={(e) => getByTitle(e.currentTarget.getAttribute('value'))}>{titleName}</Button></li></div>
        )}
        </ul>
        </aside>
            <div class="center">
        <side>
        {/* 
        <button value = "hiragana" onClick={(e) => getByTitle(e.target.value)}>Hiragana</button>
        <button value = "katakana" onClick={(e) => getByTitle(e.target.value)}>Katakana</button>
        */}
        {flashcard.length == 0 ?
            <p> </p> : cardFlip == true ?
            <div class= "margins">
            <div class="row">
            <div class="column">
            <div class="card">
                           
            <p>Click Me:</p>
            <p class="font_size" onClick={() => setNewCardFlip(false)} >{flashcard[num].japanese}</p> </div>
            </div>
            </div>
            </div>
            
            
            :
            <div class = "margins">
            <div class="row">
            <div class="column">
            <div class="card">
                            <p>Click Me:</p>
                            <p class="font_size" onClick={() => setNewCardFlip(true)}>{flashcard[num].english}</p>
            
            </div>
            </div>
            </div>              
            </div>

         }
                <button onClick={(e) => handleDecrease(num,flashcard)}> <p> <i class="arrow left"></i></p> </button>
        <p>This is the number in the position:</p>  {flashcard.length == 0 ? <p>0/0</p>:<p> {num + 1 }/{flashcard.length} </p>}
                <button onClick={(e) => handleIncrease(num, flashcard)}> <p> <i class="arrow right"></i></p> </button>
        </side>
            </div>
   
        </>
    )
}

export default Flashcards;