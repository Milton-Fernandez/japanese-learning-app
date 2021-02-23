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
    
        return;
    }
console.log(flashcard);
    return(
        <>
        <div classname="center">
        <button value = "hiragana" onClick={(e) => getByTitle(e.target.value)}>Hiragana</button>
        <button value = "katakana" onClick={(e) => getByTitle(e.target.value)}>Katakana</button>
        </div>
        </>
    )
}

export default Flashcards;