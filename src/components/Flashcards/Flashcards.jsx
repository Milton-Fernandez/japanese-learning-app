import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import './Flashcards.css';
function Flashcards(){
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: 'FLASHCARD_DATA' });
    }, []);
   
    const dataStore = useSelector(store => store.flashcard);
    const [flashcard, setNewFlashcard] = useState([]);
    const [num, setNewNum] = useState(0);
    const [word, setNewWord] = useState('');
    const [cardFlip, setNewCardFlip] = useState(true)
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
    return(
        <>
        <div class="center">
            <h2>Select Flashcard Set</h2>
        <button value = "hiragana" onClick={(e) => getByTitle(e.target.value)}>Hiragana</button>
        <button value = "katakana" onClick={(e) => getByTitle(e.target.value)}>Katakana</button>
        {flashcard.length == 0 ?
            <p> </p> : cardFlip == true ?
            <p class="font_size" onClick={() => setNewCardFlip(false)} >{flashcard[num].japanese}</p>:
            <p class="font_size" onClick={() => setNewCardFlip(true)}>{flashcard[num].english}</p>

         }
        <button onClick={() => {setNewNum(num - 1)}}> <p> <i class="arrow left"></i></p> </button>
        <p>This is the number in the position:</p>  {flashcard.length == 0 ? <p>0/0</p>:<p> {num + 1 }/{flashcard.length} </p>}
                <button onClick={() => { setNewNum(num + 1)}}> <p> <i class="arrow right"></i></p> </button>
       
        </div>
   
        </>
    )
}

export default Flashcards;