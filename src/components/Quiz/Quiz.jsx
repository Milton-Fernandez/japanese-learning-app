import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import './Quiz.css';

function Quiz(){
    const dispatch = useDispatch();
    const dataStore = useSelector(store => store.data);
    const [quiz, setNewQuiz] = useState([]);
//function to pick a quiz by its title
    function getByTitle(){
        let title = 'hiragana';
        let newQuiz = [];
        for(let i = 0; i < dataStore.length; i++){
            if(dataStore[i].title == title){
                newQuiz.push(dataStore[i]);
            } 
        }

    function loopQuiz(quiz){

    }
       setNewQuiz(newQuiz);
     
        return ;
    }

console.log(quiz);
    console.log(quiz[1]);
    useEffect(()=>{
        dispatch({type:'FETCH_DATA'});
    },[]);
    return(
        <>
        <button onClick={getByTitle}>Start Quiz</button>
        <div>
            {quiz.length == 0 ?
            <p></p>:
            <p class="font_size">{quiz[1].japanese}</p>

            }
           
            <input placeholder="Answer"></input>
            <button  >Submit</button>

        </div>

        <div>
            <p>Correct:</p> <p>Incorrect:</p>
        </div>


        </>
    )
}

export default Quiz