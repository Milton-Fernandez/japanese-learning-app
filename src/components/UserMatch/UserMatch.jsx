import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';

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


function UserMatch(){
    return(
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
        </>
    )
}

export default UserMatch;