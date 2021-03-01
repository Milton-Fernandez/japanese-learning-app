import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import './Match.css';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1),
            },
        },
    }),
);

function Match(){
    const classes = useStyles();
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
    let eTarget = 0;
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
    
        return titleArray;

    } 


    function getByTitle(title_name) {
        console.log("title name",title_name);
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
        match = newQuiz.length;
        //creates a random number from quiz length, pushes array indexes into new array 
        for(let i = 0; i < 3; i++){
            number = Math.floor((Math.random() * (match - 1)) + 0);
            randomNumberArray.push(number);
            randomQuizArray.push(newQuiz[number]);
        }
        setRandonArray(randomQuizArray);
        setRandomNumber(Math.floor((Math.random() * (3)) + 0))
        return randomQuizArray;

    }

    function randomEnglishOutputFunction(array){
        let newArray = [];
        return newArray = array;
        
    }
    
    function handleClick(param){
    
        console.log("id", param);
        if(param == englishOutput.id){
            alert('match');
            console.log(quizname);
            getByTitle(quizname);
        }
        else{
            alert('not a match');
            console.log(quizname);
            getByTitle(quizname);
        }

    }
   
    useEffect(() => {
        dispatch({ type: 'FETCH_DATA' });
        setTitles(sortArray(dataStore));
    }, []);
    console.log("ransonArray",randonArray);


    
    return(
        <>
        <div class = "move_right">
            <aside>
            <Typography variant="h4" align="left" gutterBottom>
                Match Game
            </Typography>

            <ul class="list-group">
            {titleName.map((titleName) =>
                <li class="list-group-item"><div><button value={titleName} onClick={(e) => getByTitle(e.target.value)}>{titleName}</button></div></li>
            )}
            </ul>
            </aside>

            <section>




            <div class="row move_right">
            <div class = "top">
            <h2>Pick One:</h2>

             </div>
            {randonArray.map((tiles) =>
             <div>
                <div class="column" value={tiles.id} onClick={(event) => handleClick(event.currentTarget.getAttribute('value'))}>
                    <div class="card">
                        <div class = "font_size">
                            <p >  {tiles.japanese} </p>
                        </div>
                    </div>
                </div>
                </div>
                )}
            </div>
            

            <div class = "center">
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
            </div>
                </section>
            </div>
        </>
    )
}

export default Match;