import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import './Flashcards.css';
function Flashcards(){
    useEffect(() => {
        dispatch({ type: 'FETCH_DATA' });
    }, []);
    const dispatch = useDispatch();
    const dataStore = useSelector(store => store.data);
    const [flashcard, setNewFlashcard] = useState([]);
    const [num, setNewNum] = useState(0);

    //function to pick a quiz by its title
    function getByTitle(title_name) {
        let title = title_name;
        console.log(title);
        let newFlashcard = [];
        for (let i = 0; i < dataStore.length; i++) {
            if (dataStore[i].title == title) {
                newFlashcard.push(dataStore[i]);
            }
        }
        setNewFlashcard(newFlashcard);
        setNewNum(flashcardPosition);
        return;
    }

    function flashcardPosition(){
        let num = 0
        return num;
        
    }
    function increment(param){
        let num = param;
        num = num + 1;
        return num;

    }

console.log(flashcard);




    return(
        <>
        <div class="center">
        <button value = "hiragana" onClick={(e) => getByTitle(e.target.value)}>Hiragana</button>
        <button value = "katakana" onClick={(e) => getByTitle(e.target.value)}>Katakana</button>
        {flashcard.length == 0 ?
            <p></p> :
            <p class="font_size">{flashcard[num].japanese}</p>
         }
        <button onClick={() => setNewNum(num - 1)}> <p> <i class="arrow left"></i></p> </button>
        <p>This is the number in the position:{num} </p>
        <button onClick={() => setNewNum(num+1) }> <p> <i class="arrow right"></i></p> </button>
       
        </div>
   
        </>
    )
}

export default Flashcards;