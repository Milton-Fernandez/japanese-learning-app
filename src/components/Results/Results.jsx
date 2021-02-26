import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import './Results.css';

function Results(){
    const dispatch = useDispatch();
   
    const result = useSelector(store => store.result);
    const user = useSelector((store) => store.user);
    //const [table,setTable] = useState([]);
    const table = resultTable(result);
    useEffect(() => {
        dispatch({ type: 'FETCH_RESULT' });
       
    }, []);
    console.log(result);
    console.log(user.username);


    function resultTable(array){
        let newTable = [];
        for(let i = 0; i < array.length; i++){
            if(user.username == array[i].name){
                newTable.push(array[i]);
            }
        }
        console.log(newTable)
        return newTable
    }
    resultTable(result);
    return(
        <>
        <div class = "move_right">
            <h2>Results For: {user.username}!</h2>
            
            <table>
                <thead>
                    <tr>
                        <th>Quiz Name</th>
                        <th>Correct</th>
                        <th>Incorrect</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                  
                    {table.map((data) =>
                        <tr>
                            <td>{data.quizname}</td>
                            <td>{data.correct}</td>
                            <td>{data.incorrect}</td>
                            <td>{data.date}</td>

                        </tr>
                    )}
                </tbody>
            </table>
            </div>
        </>
    )
}

export default Results;