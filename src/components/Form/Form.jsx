import './Form.css';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
function Form(){
    const [newTitle,setNewTitle] = useState('');
    const [newJapanese,setNewJapanese] = useState('');
    const [newEnglish,setNewEnglish] = useState('');
    const[newKey,setNewKey] = useState('');
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
    }
    return(
       
        <>
        <h2>Here You Can Enter New Data:</h2>
        <form onSubmit={handleSubmit}> 
            <input type = "text" value={newTitle} onChange={event => setNewTitle(event.target.value)} placeholder="title"></input>
            <input type="text" value={newJapanese} onChange={event => setNewJapanese(event.target.value)} placeholder="Japanese"></input>
            <input ype="text" value={newEnglish} onChange={event => setNewEnglish(event.target.value)} placeholder="English"></input>
            <input ype="text" value={newKey} onChange={event => setNewKey(event.target.value)} placeholder="Key"></input>
            <button type="submit">Submit</button>
        </form>
        </>
    )
}

export default Form;