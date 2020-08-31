import React, { Component } from 'react';
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import LinearProgress from '@material-ui/core/LinearProgress';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

// Service
import { getNextFiveDays } from '../../services/openweathermap.js';


class Main extends Component {

  constructor(props) {
    super(props);

    this.state = {
        arrayTable: []
    };
  }

  componentDidMount(){

    getNextFiveDays()
    .then(
      response => {
        if (response){
            this.trasnformData(response.data.list)
        }
      }
    )
  }

  trasnformData = (data) =>{
    const paramSplit = [
        {
            initial: 0,
            final: 7,
            day: 1
        },
        {
            initial: 7,
            final: 15,
            day: 2
        },
        {
            initial: 15,
            final: 23,
            day: 3
        },
        {
            initial: 23,
            final: 31,
            day: 4
        },
        {
            initial: 31,
            final: 40,
            day: 5
        },
    ]
    const resultSplit = {}
    paramSplit.map(value => {
        return resultSplit[value.day] = data.slice(value.initial, value.final);
    })

    const arrayTable = []
    for (let index = 0; index < 5; index++) {

        const getMaxSum = (total, current)=> total + current.main.temp_max
        const getMinSum = (total, current)=> total + current.main.temp_min

        let max = resultSplit[index + 1].reduce(getMaxSum, 0)
        let max_temp_average = max / resultSplit[index + 1].length;
        
        
        let min = resultSplit[index + 1].reduce(getMinSum, 0)
        let min_temp_average = min / resultSplit[index + 1].length;

        const currentData = resultSplit[index + 1][0]
        
        let date = new Date(currentData.dt_txt);
        arrayTable.push({
            date: new Intl.DateTimeFormat('es-CL').format(date).toString(),
            min: Math.round(min_temp_average),
            max: Math.round(max_temp_average),
            description: currentData.weather[0].description,
            icon: "http://openweathermap.org/img/w/" + currentData.weather[0].icon + ".png",
            dataDay: resultSplit[index + 1]
        })
    }

    this.setState({arrayTable: arrayTable})
    
  }

  sendInfoToSearch = (row) =>{
    this.props.history.push({ pathname: `/search/${row.date}`, data: row})
  }

  render() {
    const { arrayTable } = this.state
    return (
        <Container maxWidth="md">
            <Box my={6}>
                <Typography variant="subtitle1" component="h6" paragraph>
                    Hola, que tal ? mi nombre es 
                        <Link
                        variant="inherit"
                        href="https://www.linkedin.com/in/jose-useche-9664b7152/"
                        target="_blank"
                        > Jose Useche
                        </Link>
                    ,&nbsp;puedes ver 
                    <Link
                        variant="inherit"
                        href="https://github.com/joseub71/weather-forecast"
                        target="_blank"
                        > aqui
                    </Link>
                    &nbsp; la informacion del proyecto y las librerias que utilice, me diverti mucho haciendo este proyecto gracias !!
                </Typography>
                <Typography variant="subtitle2" component="span" paragraph>
                    Ninguna hazaña sabe dulce sin esfuerzo
                </Typography>
            </Box>

            <Typography variant="h5" component="h5" align="left" gutterBottom>
                    Santiago de chile <span role="img" aria-label="Bandera de chile"> 🇨🇱 </span>
            </Typography>
            <Typography variant="subtitle1" component="span" align="justify" gutterBottom>
                    Mostrando datos de los proximos 5 dias del clima de Santiago de chile, haz click en un row para obtener mas informacion
            </Typography>

            {arrayTable.length > 0 ? 
            <TableContainer component={Paper}>
                <Table  aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell align="center">Fecha </TableCell>
                        <TableCell align="center"> Temp Min </TableCell>
                        <TableCell align="center">Temp Max </TableCell>
                        <TableCell align="center">Descripcion </TableCell>
                        <TableCell align="center">Icono </TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {arrayTable.map((row) => (
                        <TableRow key={row.date} onClick={()=> this.sendInfoToSearch(row)} >
                            <TableCell align="center">{row.date}</TableCell>
                            <TableCell align="center">{row.min}</TableCell>
                            <TableCell align="center">{row.max}</TableCell>
                            <TableCell align="center">{row.description}</TableCell>
                            <TableCell align="center"> <img src={row.icon} alt="icono del clima"/> </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            :
            <LinearProgress />}
        </Container>
    )
  }
}

export default Main;
