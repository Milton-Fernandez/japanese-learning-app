import './Form.css';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';


function Form(){
    useEffect(() => {
        dispatch({ type: 'FORM_DATA' });
    }, []);
    const dataStore = useSelector(store => store.form);
    const [newTitle,setNewTitle] = useState('');
    const [newJapanese,setNewJapanese] = useState('');
    const [newEnglish,setNewEnglish] = useState('');
    const[newKey,setNewKey] = useState('');
    const[edit, setEdit] = useState(true)
    const dispatch = useDispatch();
    const handleSubmit = (event) =>{
        event.preventDefault();
        dispatch({
            type:'ADD_DATA',
            payload: {
                title: newTitle,
                japanese: newJapanese,
                english: newEnglish,
                key: newKey
            } 
        });
        setNewTitle('');
        setNewJapanese('');
        setNewEnglish('');
        setNewKey('');
        dispatch({ type: 'FORM_DATA' });
    }
    console.log('dataStore',dataStore);

    const handleEdit = (event) =>{
  
     
        console.log(event);
    }


    return(
       
        <>
        <h2>Here You Can Enter New Data:</h2>
        <form onSubmit={handleSubmit}> 
            <input type = "text" value={newTitle} onChange={event => setNewTitle(event.target.value)} placeholder="title"></input>
            <input type="text" value={newJapanese} onChange={event => setNewJapanese(event.target.value)} placeholder="Japanese"></input>
            <input type="text" value={newEnglish} onChange={event => setNewEnglish(event.target.value)} placeholder="English"></input>
            <input type="text" value={newKey} onChange={event => setNewKey(event.target.value)} placeholder="Key"></input>
            <button type="submit">Submit</button>
        </form>
     
        <table>
            <thead>
            <tr>
            <th>Title</th>
            <th>Japanese</th>
            <th>English</th>
            <th>Key</th>    
            <th>Delete</th>
            <th>Edit</th>
            </tr>
            </thead>
            <tbody>
            {dataStore.map((data) =>
                <tr>
                    <td>{data.title}</td>
                    <td>{data.japanese}</td>
                    <td>{data.english}</td>
                    <td>{data.key}</td>
                    <td><button onClick={() => { dispatch({ type: 'REMOVE_DATA', payload: data.id }); 
                    dispatch({ type: 'FORM_DATA' });}}>Delete</button></td>

                
                        <td><button value={data.id} onClick={event => handleEdit(event.target.value)}>Edit</button></td>
                  
                    

                </tr>
            )}
            </tbody>
        </table>

        </>
    )
}

export default Form;