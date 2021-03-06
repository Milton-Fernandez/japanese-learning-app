import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import './Match.css';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';




const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1),
            },
        },
    }),
);
//material ui for grids
const useStyles2 = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
    }),
);

//material ui for cards
const useStyles3 = makeStyles({
    root: {
        width: 275,
        height: 200
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 28,
    },
    pos: {
        marginBottom: 12,
    },

});
//material ui for table
const useStyles4 = makeStyles({
    root: {
        width: '70%',
    },
    container: {
        maxHeight: 440,
    },
});

function Match(){
    const classes = useStyles();
    const classes2 = useStyles2();
    const classes3 = useStyles3();
    const classes4 = useStyles4();
    //declared dispatch
    const dispatch = useDispatch();
    //store used for quiz
    const dataStore = useSelector(store => store.data);
    const userCreated = useSelector((store) => store.usercreated);
    const user = useSelector((store) => store.user);
    const titleName = sortArray(dataStore);

    const sortedTitleName = titleName.sort();
  
    const [quiz, setNewQuiz] = useState([]);
    const [titles, setTitles] = useState([]);
    const [quizname, setQuizName] = useState('');
    const[randomNumber,setRandomNumber] = useState(0);
    const[randonArray, setRandonArray] = useState([]);
    const [color, setNewColor] = useState('white');
    const [color2, setNewColor2] = useState('white');
    const [color3, setNewColor3] = useState('white');
    const [buttonTag, setButtonTag] = useState(false);

    const newArray = sortTheArray();
    const sortedNewArray = sortArray(newArray);
    function sortTheArray() {
        let emptyArray = [];
        for (let i = 0; i < userCreated.length; i++) {
            if (userCreated[i].user == user.username) {
                emptyArray.push(userCreated[i]);
            }

        }

        return emptyArray;
    }
    console.log('usercreated',userCreated);

    console.log('sorted', newArray);

    console.log('sortedtitlename',sortedTitleName);

    console.log('sorted array names', sortedNewArray);

    let tagColor = '';
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
     
        setQuizName(title_name);
        setNewColor('white');
        setNewColor2('white');
        setNewColor3('white');
        //setNewColor('white');
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
        shuffle(newQuiz);
        match = newQuiz.length;
        //creates a random number from quiz length, pushes array indexes into new array 
        for(let i = 0; i < 3; i++){
            randomQuizArray.push(newQuiz[i]);   

        }
    
        setRandonArray(randomQuizArray);
        setRandomNumber(Math.floor((Math.random() * (3)) + 0))
        return randomQuizArray;

    }


    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }






    function randomEnglishOutputFunction(array){
        let newArray = [];
        return newArray = array;
        
    }
    
    function handleClick(param){

      
        if(param == englishOutput.id){
            //alert('match');
           
            setNewColor('lightgreen');
            //getByTitle(quizname);
            setTimeout(function(){getByTitle(quizname)},1000);
        }
        else{
            //alert('not a match');
         
            setNewColor('red');
            setTimeout(function () { getByTitle(quizname) }, 1000);
            //getByTitle(quizname);
            
        }

    }
    function handleClick2(param) {

      
        if (param == englishOutput.id) {
            //alert('match');
           
            setNewColor2('lightgreen');
            //getByTitle(quizname);
            setTimeout(function () { getByTitle(quizname) }, 1000);
        }
        else {
            //alert('not a match');
          
            setNewColor2('red');
            setTimeout(function () { getByTitle(quizname) }, 1000);
            //getByTitle(quizname);

        }

    }
    function handleClick3(param) {

 
        if (param == englishOutput.id) {
            //alert('match');
           
            setNewColor3('lightgreen');
            //getByTitle(quizname);
            setTimeout(function () { getByTitle(quizname) }, 1000);
        }
        else {
            //alert('not a match');
          
            setNewColor3('red');
            setTimeout(function () { getByTitle(quizname) }, 1000);
            //getByTitle(quizname);

        }

    }
   
    useEffect(() => {
        dispatch({ type: 'FETCH_DATA' });
        setTitles(sortArray(dataStore));
        dispatch({ type: 'FETCH_USERCREATE_DATA' });
    }, []);
  
  


    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);


    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };


    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    return(
        <>
            <div className={classes2.root}>
                <Grid container spacing={1} justify="center" alignItems="center">
                    <Grid item xs={4}>
            
                        <Typography variant="h4" align="left" gutterBottom>
                            Match Game:
                        </Typography>
                        <Typography variant="h6" align="left" gutterBottom>
                            Select one of the sets below, then pick from 
                            the following three
                            Japanese cards that 
                            appear on screen that
                            matches the Engish card equivalent.
                        </Typography>

                    {user.id &&(
                    <div>
                        <button onClick={(e) => setButtonTag(false)}>
                            Free
                        </button>
                                <button onClick={(e) => setButtonTag(true)}> 
                            Personal
                        </button>
                            </div>
            

                    )}









                    {buttonTag == false ?

                        <Paper className={classes4.root}>
                            <TableContainer className={classes4.container}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>
                                                 Selection
                                                </TableCell>
                                        </TableRow>
                                    </TableHead>
                                        <TableBody>
                                            {sortedTitleName.map((titleName) =>
                                            <TableRow>
                                                <TableCell>


                                                        <Button value={titleName}
                                                            onClick={(e) => getByTitle(e.currentTarget.getAttribute('value'))}>{titleName}
                                                        </Button>

       

                                                </TableCell>
                                            </TableRow>
                                            )}
                                        </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={([10, 25, 100])}
                                component="div"
                                count={titleName.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}>
                            </TablePagination>
                        </Paper>
                        :
                            <Paper className={classes4.root}>
                                <TableContainer className={classes4.container}>
                                    <Table stickyHeader aria-label="sticky table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>
                                                    Selection
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {sortedNewArray.map((titleName) =>
                                                <TableRow>
                                                    <TableCell>


                                                        <Button value={titleName}
                                                            onClick={(e) => getByTitle(e.currentTarget.getAttribute('value'))}>{titleName}
                                                        </Button>



                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <TablePagination
                                    rowsPerPageOptions={([10, 25, 100])}
                                    component="div"
                                    count={sortedNewArray.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onChangePage={handleChangePage}
                                    onChangeRowsPerPage={handleChangeRowsPerPage}>
                                </TablePagination>
                            </Paper>

                        }












                    </Grid>
                    {buttonTag == false ?
                    <>
                    <Grid item xs={2}>

                      
                                {randonArray.length == 0 ? <div> </div> :
                            <Card className={classes3.root} style={{ backgroundColor: color }}>
                                        <CardContent 
                                    value={randonArray[0].id}
                                            onClick={(event) => handleClick(event.currentTarget.getAttribute('value'))}>
                                    <Typography align="center"variant="h2" >

                                                {randonArray[0].japanese}

                                            </Typography>


                                        </CardContent>
                                    </Card>
                                    }
                               
                    </Grid>
                    <Grid item xs={2}>

                                {randonArray.length == 0 ? <div> </div> :
                            <Card className={classes3.root} style={{ backgroundColor: color2 }}>
                                        <CardContent
                                    value={randonArray[1].id}
                                            onClick={(event) => handleClick2(event.currentTarget.getAttribute('value'))}>
                                    <Typography align="center"variant="h2" gutterBottom>

                                                {randonArray[1].japanese}

                                            </Typography>


                                        </CardContent>
                                    </Card>
                                }
                        
                    </Grid>
                    <Grid item xs={3}>

               
                                {randonArray.length == 0 ? <div> </div> :
                            <Card className={classes3.root} style={{ backgroundColor: color3 }}>
                                        <CardContent
                                                value={randonArray[2].id}
                                            onClick={(event) => handleClick3(event.currentTarget.getAttribute('value'))}>
                                    <Typography align="center" variant="h2" gutterBottom>

                                                {randonArray[2].japanese}

                                            </Typography>


                                        </CardContent>
                                    </Card>
                                }
                         
                    </Grid>
                    
                    <Grid item xs={4}>
                                <div class = "margin">
                        {randonArray.length == 0? <div> </div>:

                                        <Card className={classes3.root}>
                                            <CardContent >
                                            <Typography align="center"variant="h2" gutterBottom>

                                                    {englishOutput.english}

                                                </Typography>
                                         
                                        </CardContent>
                                        </Card>
                        }
            </div>
                        
              
                    </Grid>
                    </>:
                    <div></div> 
                    }
                </Grid>
            </div>
        </>
    )
}

export default Match;