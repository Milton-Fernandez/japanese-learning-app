import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import './Quiz.css';

function Quiz(){
    //declared dispatch
    const dispatch = useDispatch();
    //store used for quiz
    const dataStore = useSelector(store => store.data);
  
    const user = useSelector((store) => store.user);
    console.log(user);

    //declard local state and variables
    const [quiz, setNewQuiz] = useState([]);
    const [num, setNewNum] = useState(0);
    const [answer, setAnswer] = useState('');
    const [correct, setCorrect] = useState(0);
    const [incorrect,setIncorrect] = useState(0);
    const [titles,setTitles] = useState([]);
    const titleName = sortArray(dataStore);
    const [quizname, setQuizName] = useState('');
 
    console.log("titleTest",titleName);

    //
    function sortArray(quiz){
      
        let array = [];
       
        for( let i = 0; i < quiz.length; i++){
            array.push(quiz[i].title);
        }
       console.log(array);
         return array.filter((value,index)=> array.indexOf(value) === index);        
        
    } 

    //function to pick a quiz by its title
    function getByTitle(title_name){
        setQuizName(title_name);
       
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
    console.log("quizname", quizname);

    //handles user input. If the user has correct answer, the correct variable will increase by one.
    // If they are incorrect, the incorrect variable will increase by one. If they reach the end of the quiz,
    //quiz result will dispatch and the quiz will restart. 
    function handleSubmit(event) {
        event.preventDefault();
        let correction = 0;
        let incorrection = 0;
        //increments correct variable by 1 if answer is correct
            if(quiz[num].english == answer){
                console.log('Hey your correct');
                setNewNum(num+1);
                correction = correction + 1;
                console.log(correction);
                
            }
        //decrements incorrect variable by 1 if answer is incorrect
            else{
                console.log('incorrect');
                setNewNum(num + 1);
                incorrection = incorrection + 1;
                console.log(incorrection);
        }
            setAnswer('');
     
        if((quiz.length-1) == num){
            console.log("quiz length",quiz.length);
       
            console.log(correction);
            console.log(incorrection);
     
            alert('finished quiz: your score:  ' + correction + "/" + incorrection);
            dispatch({
                type: 'ADD_RESULT',
                payload: {
                    correct: correction,
                    incorrect: incorrection,
                    user: user.id,
                    name: user.username,
                    quizname: quizname
                }
            });
            setNewNum(0);
            setCorrect(0);
            setIncorrect(0);
            correction = 0;
            incorrection = 0;

        }



    }
    console.log(titles);

    useEffect(()=>{
        dispatch({type:'FETCH_DATA'});
        setTitles(sortArray(dataStore));
    },[]);
    return(
        <>
        <div class="center">
        <h2>Select Quiz</h2>
            <h3>Alphabet</h3>

            
            {titleName.map((titleName) => 
                <button value={titleName} onClick={(e) => getByTitle(e.target.value)}>{titleName}</button>
            )}
            {/*
            <button value="hiragana" onClick={(e) => getByTitle(e.target.value)}>Hiragana</button>
            <button value="katakana" onClick={(e) => getByTitle(e.target.value)}>Katakana</button>
            */}
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