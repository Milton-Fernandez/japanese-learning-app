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
import DeleteIcon from '@material-ui/icons/Delete';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import Button from '@material-ui/core/Button';



const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        margin: {
            margin: theme.spacing(1),
        },
        extendedIcon: {
            marginRight: theme.spacing(1),
        },
    }),
);

//material ui text field
const useStyles2 = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
                width: '25ch',
            },
        },
    }),
);
//material ui button with icon
const useStyles3 = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            margin: theme.spacing(1),
        },
    }),
);


function CreateUserRow({ data }) {
    const classes = useStyles();
    const classes2 = useStyles2();
    const classes3 = useStyles3();

    const [edit, setEdit] = useState(false);
    const dispatch = useDispatch();

    const handleEdit = () => {
        setEdit(true);
    }
    const [editData, setEditData] = useState(data)
    const [titles, setEditTitle] = useState(data.title)
    const [japaneses, setEditJapanese] = useState(data.japanese)
    const [englishs, setEditEnglish] = useState(data.english)
    const [keys, setEditKey] = useState(data.key);



    const editSubmit = () => {
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
        dispatch({ type: 'UPDATE_USERCREATE_DATA', payload: dataObj });
        dispatch({ type: 'FETCH_USERCREATE_DATA' });

    }
    const handleExit = () => {
        setEdit(false);
    }

    return (
        <>
            <TableRow>
                <TableCell>{data.title}</TableCell>
                <TableCell>{data.japanese}</TableCell>
                <TableCell>{data.english}</TableCell>
                <TableCell>{data.key}</TableCell>
                <TableCell>
                    <div>
                        <IconButton aria-label="delete" className={classes.margin}>
                            <DeleteIcon onClick={() => {
                                dispatch({ type: 'REMOVE_USER_DATA', payload: data.id });
                                dispatch({ type: 'FETCH_USERCREATE_DATA' });
                            }} />
                        </IconButton>
                    </div>
                </TableCell>

                {!edit ?
                    <TableCell>
                        <IconButton aria-label="edit" className={classes.margin}>

                            <EditIcon onClick={event => handleEdit()}></EditIcon>
                        </IconButton>



                    </TableCell> :
                    <TableCell>
                        <TextField
                            required
                            size="small"
                            id="outlined-required"
                            label="Title"
                            placeholder="Title"
                            variant="outlined"
                            value={titles}
                            onChange={event => setEditTitle(event.target.value)}
                        />

                        <TextField
                            required
                            size="small"
                            id="outlined-required"
                            label="Japanese"
                            placeholder="Japanese"
                            variant="outlined"
                            value={japaneses}
                            onChange={event => setEditJapanese(event.target.value)}
                        />
                        <TextField
                            required
                            size="small"
                            id="outlined-required"
                            label="English"
                            placeholder="English"
                            variant="outlined"
                            value={englishs}
                            onChange={event => setEditEnglish(event.target.value)}
                        />
                        <TextField
                            required
                            size="small"
                            id="outlined-basic"
                            label="Key"
                            placeholder="Key"
                            variant="outlined"
                            value={keys}
                            onChange={event => setEditKey(event.target.value)}
                        />


                        <Button
                            variant="contained"


                            className={classes.button}
                            onClick={handleExit}
                            startIcon={<ExitToAppIcon />}
                        >
                            Exit
                        </Button>
                        <Button
                            variant="contained"
                            className={classes.button}
                            onClick={editSubmit}
                            startIcon={<SaveAltIcon />}
                        >
                            Save
                        </Button>


                    </TableCell>
                }
            </TableRow>

        </>
    )
}

export default CreateUserRow;