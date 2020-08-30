import React, { Component } from 'react';

import { XYChart, PatternLines, AreaSeries, XAxis } from "@data-ui/xy-chart";
import { timeParse, timeFormat } from "d3-time-format";
import LinearProgress from '@material-ui/core/LinearProgress';
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

export const parseDate = timeParse("%Y%m%d");
export const formatHour = timeFormat("%I:%M");
export const formatDay = timeFormat("%b %d");
export const formatVerbose = timeFormat("%B %d, %Y");

class Search extends Component {

  constructor(props) {
    super(props);

    this.state = {
      timeSeriesData: []
    };
  }

  componentDidMount(){      
      if (this.props.location && this.props.location.data) {
        const current = this.props.location.data.dataDay
        const timeSeriesData = current.map(value => ({ x: new Date(value.dt_txt), y: value.main.temp }) )
        this.setState({timeSeriesData})
      }else{
        this.props.history.push({ pathname: '/'})
      }
  }

  render() {
    const {timeSeriesData} = this.state
    return (
      <Container maxWidth="md">
        <Box my={6}>
          <Typography variant="h5" component="h5" align="left" gutterBottom>
                  Clima en Santiago de chile <span role="img" aria-label="Bandera de chile"> 🇨🇱 </span>
          </Typography>
          <Typography variant="subtitle1" component="span" align="justify" gutterBottom>
                  Mostrando datos del {this.props.location.data && this.props.location.data.date} usa el mouse para ver la temperatura por cada hora
          </Typography>
        </Box>
        {timeSeriesData.length > 0 ?
        <XYChart
            ariaLabel="Description"
            xScale={{ type: "time" }}
            yScale={{ type: "linear" }}
            renderTooltip={({ datum }) => {
            return(
              <div style={{ width: 150 }}>
                <div>{formatHour(datum.x)}</div>
                <div>Temp: {datum.y}</div>
              </div>
            )}}
            width={1000}
            height={500}
            margin={{ left: 32, right: 32 }}
          >
            <PatternLines
              id="lines"
              height={8}
              width={8}
              stroke={'#0052aa'}
              strokeWidth={1.5}
              orientation={["diagonal"]}
            />
            <AreaSeries data={timeSeriesData} fill="url(#lines)" />
            <XAxis
              tickFormat={formatHour}
              tickLabelProps={(val, i) => ({
                // ...theme.xTickStyles.label.bottom,
                textAnchor: "start",
                dy: 0,
                angle: 45
              })}
            />
          </XYChart>
          :
          <LinearProgress />}
      </Container>
    )
  }
}

export default Search;
