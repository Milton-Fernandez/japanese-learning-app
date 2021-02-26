import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import './Match.css';

function Match(){
    //declared dispatch
    const dispatch = useDispatch();
    //store used for quiz
    const dataStore = useSelector(store => store.data);
    const titleName = sortArray(dataStore);
    const [quiz, setNewQuiz] = useState([]);
    const [titles, setTitles] = useState([]);
    const [quizname, setQuizName] = useState('');
    const[randomNumber,setRandomNumber] = useState(0);
    const[randonArray, setRandonArray] = useState([]);
    let match = 0;
    let englishOutput = randomEnglishOutputFunction(randonArray[randomNumber]);
    function sortArray(quiz) {

        let array = [];

        for (let i = 0; i < quiz.length; i++) {
            array.push(quiz[i].title);
        }
        //filters array into unique titles
        let titleArray = array.filter((value, index) => array.indexOf(value) === index);
        //puts array in alphabetical order
        titleArray.sort(function (a, b) {
            return a.length - b.length;
        });
        console.log("titleArray", titleArray);
        return titleArray;

    } 


    function getByTitle(title_name) {
        setQuizName(title_name);


        let title = title_name;
        let newQuiz = [];
        let randomNumberArray = [];
        let randomQuizArray = [];
        let number = 0;
        //push all of the title names into newQuiz array
        for (let i = 0; i < dataStore.length; i++) {
            if (dataStore[i].title == title) {
                newQuiz.push(dataStore[i]);
            }
        }
       //set new quiz
        setNewQuiz(newQuiz); 
        console.log("quiz data",newQuiz);
       
        match = newQuiz.length;
        console.log("match length",match);
        //creates a random number from quiz length, pushes array indexes into new array 
        for(let i = 0; i < 3; i++){
            number = Math.floor((Math.random() * (match - 1)) + 0);
            randomNumberArray.push(number);
            randomQuizArray.push(newQuiz[number]);
        }
        console.log("random number",randomNumberArray);
        console.log("random array value", randomQuizArray);
        setRandonArray(randomQuizArray);

        console.log("randonArray",randonArray);

        setRandomNumber(Math.floor((Math.random() * (3)) + 0))
        console.log("randonNumber",randomNumber);
     
      
        return randomQuizArray;

    }
    
    function randomEnglishOutputFunction(array){
        let newArray = [];
        return newArray = array;
        
    }
    
 console.log("English output 3 test",englishOutput);
   
    useEffect(() => {
        dispatch({ type: 'FETCH_DATA' });
        setTitles(sortArray(dataStore));
    }, []);
    console.log("ransonArray",randonArray);


    
    return(
        <>
            <h2>Match Game</h2>
          


            {titleName.map((titleName) =>
                <button value={titleName} onClick={(e) => getByTitle(e.target.value)}>{titleName}</button>
            )}
       

            <div class="row">
            {randonArray.map((tiles) =>
                <div class="column">
                    <div class="card">
            <div class = "font_size">
            <p> {tiles.japanese} </p>
            </div>
            </div>
            </div>
                )}
                </div>

            <div class="row">
                
               {randonArray.length == 0? <div> </div>:

                    <div class="column">
                        <div class="card">
                            <div class="font_size">
                                <p>{englishOutput.english}</p>
                            </div>
                        </div>
                    </div>
                    }
            
            </div>

        </>
    )
}

export default Match;