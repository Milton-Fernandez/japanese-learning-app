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
    function getByTitle(){
        let title = 'hiragana';
        let newQuiz = [];
        for(let i = 0; i < dataStore.length; i++){
            if(dataStore[i].title == title){
                newQuiz.push(dataStore[i]);
            } 
        }
       setNewQuiz(newQuiz); 
       setNewNum(loopQuiz(quiz));
        return ;
    }
    //loop through quiz and display on DOM
    function loopQuiz(quiz) {
        let n = quiz.length;
        let x = Math.floor((Math.random() * n) + 0);
        return x;
    }

    useEffect(()=>{
        dispatch({type:'FETCH_DATA'});
    },[]);
    return(
        <>
        <button onClick={getByTitle}>Start Quiz</button>
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


        </>
    )
}

export default Quiz