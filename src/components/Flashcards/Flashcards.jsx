import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import './Flashcards.css';
function Flashcards(){
    const dispatch = useDispatch();



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
        <div class="center">
            <h2>Select Flashcard Set</h2>
        <h3>Alphabet</h3>
        {flashcardTitle.map((titleName) =>
            <button value={titleName} onClick={(e) => getByTitle(e.target.value)}>{titleName}</button>
        )}
        {/* 
        <button value = "hiragana" onClick={(e) => getByTitle(e.target.value)}>Hiragana</button>
        <button value = "katakana" onClick={(e) => getByTitle(e.target.value)}>Katakana</button>
        */}
        {flashcard.length == 0 ?
            <p> </p> : cardFlip == true ?
            <div>
            <p>Click Me:</p>
            <p class="font_size" onClick={() => setNewCardFlip(false)} >{flashcard[num].japanese}</p> </div>:
                        <div>
                            <p>Click Me:</p>
            <p class="font_size" onClick={() => setNewCardFlip(true)}>{flashcard[num].english}</p>
            </div>

         }
                <button onClick={(e) => handleDecrease(num,flashcard)}> <p> <i class="arrow left"></i></p> </button>
        <p>This is the number in the position:</p>  {flashcard.length == 0 ? <p>0/0</p>:<p> {num + 1 }/{flashcard.length} </p>}
                <button onClick={(e) => handleIncrease(num, flashcard)}> <p> <i class="arrow right"></i></p> </button>
       
        </div>
   
        </>
    )
}

export default Flashcards;