import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import './Quiz.css';

function Quiz(){
    const dispatch = useDispatch();
    const dataStore = useSelector(store => store.data);
    const user = useSelector((store) => store.user);
    console.log(user);
    const [quiz, setNewQuiz] = useState([]);
    const [num, setNewNum] = useState(0);
    const [answer, setAnswer] = useState('');
    const [correct, setCorrect] = useState(0);
    const [incorrect,setIncorrect] = useState(0);
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
        setCorrect(0);
        setIncorrect(0);
        setNewNum(0);
        dispatch({ type: 'FETCH_DATA' });
        return ;
    }

    //loop through quiz and display on DOM
    function handleSubmit(event) {
        event.preventDefault();
            if(quiz.length == 0){
                setNewQuiz({english:'english'});
            }
            if(quiz[num].english == answer){
                console.log('Hey your correct');
                setCorrect(correct+1);
                setNewNum(num+1);
            }
            else{
                console.log('incorrect');
                setIncorrect(incorrect+1);
                setNewNum(num + 1);
        }
            setAnswer('');
        if((quiz.length-1) == num){
            alert('finished quiz: your score:  '+ correct + "/"+incorrect);
            console.log(correct);
            console.log(incorrect);
            dispatch({
                type: 'ADD_RESULT',
                payload: {
                    correct: correct,
                    incorrect: incorrect,
                    user: user.id,
                    name: user.username    
                }
            });
            setNewNum(0);
            setCorrect(0);
            setIncorrect(0);

        }



    }

    useEffect(()=>{
        dispatch({type:'FETCH_DATA'});
    },[]);
    return(
        <>
        <div class="center">
        <h2>Select Quiz</h2>
            <h3>Alphabet</h3>
            <button value="hiragana" onClick={(e) => getByTitle(e.target.value)}>Hiragana</button>
            <button value="katakana" onClick={(e) => getByTitle(e.target.value)}>Katakana</button>
        {quiz.length == 0?<p></p>:
        <div>
        <div>
            {quiz.length == 0 ?
            <p></p>:
            <p class="font_size">{quiz[num].japanese}</p>

            }
           <form onSubmit={handleSubmit}>
            <input type="text" value={answer} onChange={event => setAnswer(event.target.value)}placeholder="Answer"></input>
            <button>Submit</button>
            </form>
        </div>

        <div>
            <p>Correct:{correct}</p> <p>Incorrect:{incorrect}</p>
        </div>
        </div>
}


        </div>

        </>
    )
}

export default Quiz