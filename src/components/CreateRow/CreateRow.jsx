
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';


function CreateRow({data}){
    const [edit, setEdit] = useState(false);
    const dispatch = useDispatch();
 
    const handleEdit = () =>{
        setEdit(true);
    }
    const [editData,setEditData] = useState(data)
    const [titles, setEditTitle] = useState(data.title)
    const [japaneses, setEditJapanese] = useState(data.japanese)
    const [englishs, setEditEnglish] = useState(data.english)
    const [keys, setEditKey] = useState(data.key);



    const editSubmit = () =>{
        setEdit(false);
        console.log(titles);
        console.log(japaneses);
        console.log(englishs);
        console.log(keys);


        const dataObj = {
            id: data.id,
            title: titles,
            japanese: japaneses,
            english: englishs,
            key: keys
        }
        dispatch({type: 'UPDATE_DATA', payload: dataObj});
     
    }
    const handleExit = () =>{
        setEdit(false);
    }

    return (
        <>
            <tr>
                <td>{data.title}</td>
                <td>{data.japanese}</td>
                <td>{data.english}</td>
                <td>{data.key}</td>
                <td><button onClick={() => {
                    dispatch({ type: 'REMOVE_DATA', payload: data.id });
                    dispatch({ type: 'FORM_DATA' });
                }}>Delete</button></td>

                {!edit ?
                <td><button  onClick={event => handleEdit()}>Edit</button></td>:
                <td><input value={titles} onChange={event => setEditTitle(event.target.value)}/>
                        <input value={japaneses} onChange={event => setEditJapanese(event.target.value)} />
                        <input value={englishs} onChange={event => setEditEnglish(event.target.value)} />
                        <input value={keys} onChange={event => setEditKey(event.target.value)} />
                        <button onClick={handleExit}>Exit</button>
                        <button onClick={editSubmit}>Save</button></td>
                }

            </tr>
        </>
    )
}

export default CreateRow;