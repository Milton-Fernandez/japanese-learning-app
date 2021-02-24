import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';

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
            <h2>Results For: {user.username}!</h2>
            
            <table>
                <thead>
                    <tr>
                        <th>Correct</th>
                        <th>Incorrect</th>
                    </tr>
                </thead>
                <tbody>
                  
                    {table.map((data) =>
                        <tr>
                            <td>{data.correct}</td>
                            <td>{data.incorrect}</td>
                        </tr>
                    )}
                </tbody>
            </table>

        </>
    )
}

export default Results;