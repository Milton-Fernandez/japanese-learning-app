import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';

function Results(){
    const dispatch = useDispatch();
   
    const dataStore = useSelector(store => store.result);
    const user = useSelector((store) => store.user);
    useEffect(() => {
        dispatch({ type: 'FETCH_RESULT' });
    }, []);
    console.log(dataStore);
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
                  
                    {dataStore.map((data) =>
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