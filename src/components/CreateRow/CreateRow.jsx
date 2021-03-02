import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
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
            <TableRow>
                <TableCell>{data.title}</TableCell>
                <TableCell>{data.japanese}</TableCell>
                <TableCell>{data.english}</TableCell>
                <TableCell>{data.key}</TableCell>
                <TableCell><button onClick={() => {
                    dispatch({ type: 'REMOVE_DATA', payload: data.id });
                    dispatch({ type: 'FORM_DATA' });
                }}>Delete</button></TableCell>

                {!edit ?
                <TableCell><button  onClick={event => handleEdit()}>Edit</button></TableCell>:
                <TableCell>
                        <label for="title">Title:</label>
                        <input id = "title" name = "title" value={titles} onChange={event => setEditTitle(event.target.value)}/>

                        <label for="Japanese">Japanese:</label>
                        <input id="Japanese" name="Japanese" value={japaneses} onChange={event => setEditJapanese(event.target.value)} />

                        <label for="English">English:</label>
                        <input id="English" name="English" value={englishs} onChange={event => setEditEnglish(event.target.value)} />

                        <label for="Key">Key:</label>
                        <input id="Key" name="Key"value={keys} onChange={event => setEditKey(event.target.value)} />

                        <button onClick={handleExit}>Exit</button>
                        <button onClick={editSubmit}>Save</button></TableCell>
                }
            </TableRow>
            
        </>
    )
}

export default CreateRow;