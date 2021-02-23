import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import './Quiz.css';

function Quiz(){
    const dispatch = useDispatch();
    const dataStore = useSelector(store => store.data);
    const [quiz, setNewQuiz] = useState([]);
    const [num, setNewNum] = useState(0);
//function to pick a quiz by its title
    function getByTitle(title_name){
        let title = title_name;
        let newQuiz = [];
        for(let i = 0; i < dataStore.length; i++){
            if(dataStore[i].title == title){
                newQuiz.push(dataStore[i]);
            } 
        }
       setNewQuiz(newQuiz); 
     
        return ;
    }

    //loop through quiz and display on DOM
    function loopQuiz(quiz) {
        let n = quiz.length;
        let x = Math.floor((Math.random() * n) + 0);
        let newArray = quiz;


    }

    useEffect(()=>{
        dispatch({type:'FETCH_DATA'});
    },[]);
    return(
        <>
        <div class="center">
        <h2>Select Quiz</h2>
            <button value="hiragana" onClick={(e) => getByTitle(e.target.value)}>Hiragana</button>
            <button value="katakana" onClick={(e) => getByTitle(e.target.value)}>Katakana</button>
        <div>
            {quiz.length == 0 ?
            <p></p>:
            <p class="font_size">{quiz[num].japanese}</p>

            }
           
            <input placeholder="Answer"></input>
            <button onClick={loopQuiz}>Submit</button>

        </div>

        <div>
            <p>Correct:</p> <p>Incorrect:</p>
        </div>
        </div>

        </>
    )
}

export default Quiz