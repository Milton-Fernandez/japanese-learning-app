
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
    const [title, setEditTitle] = useState(data.title)
    const [japanese, setEditJapanese] = useState(data.japanese)
    const [english, setEditEnglish] = useState(data.english)
    const [key, setEditKey] = useState(data.key);

    
    const editSubmit = () =>{
        setEdit(false);
        const dataObj = {
            id: data.id,
            title: data.title,
            japanese: data.japanese,
            english: data.english,
            key: data.key
        }
        dispatch({type: 'UPDATE_DATA', payload: dataObj})
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
                <td><input value={data.title} onChange={(e)=> setEditData(data.title)}/>
                        <input value={data.japanese } onChange={(e) => setEditData(data.japanese)} />
                        <input value={data.english} onChange={(e) => setEditData(data.english)} />
                        <input value={data.key} onChange={(e) => setEditData(data.key)} />
                        <button onClick={editSubmit}>Save</button></td>
                }

            </tr>
        </>
    )
}

export default CreateRow;