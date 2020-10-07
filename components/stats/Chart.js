import * as React from "react";
import * as Constants from "~/common/constants";

import { css } from "@emotion/react";

const STYLES_GRAPH_CONTAINER = css`
  display: flex;
`;

const STYLES_GRAPH = css`
  margin: auto;
  background-image: linear-gradient(${Constants.system.pitchBlack}, ${Constants.system.slate});
`;

const STYLES_AXIS_LINE = css`
  stroke: ${Constants.system.wall};
  stroke-width: 2px;
`;

const STYLES_GRID_LINE = css `
  stroke: url(#linear-gradient);
`

const STYLES_CHART_CIRCLE = css`
  stroke: none;
  fill: ${Constants.system.blue};
`;

const STYLES_CHART_LINE = css`
  stroke: ${Constants.system.blue};
  fill: none;
  stroke-width: 2px;
`;

const STYLES_CHART_TEXT = css`
  font-size: 12px;
  fill: ${Constants.system.white};
  font-family: ${Constants.font.code};
  text-transform: uppercase;
`;

const STYLES_CHART_TEXT_Y = css`
  font-size: 12px;
  fill: ${Constants.system.white};
  font-family: ${Constants.font.code};
  writing-mode:   vertical-rl;
  text-transform: uppercase;
`;

export default class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  state = {
    minX: {},
    maxX: {},
    minY: {},
    maxY: {},
    ticks: [],
    organizedData: [],
    circles: [],
    gridX: [],
    gridY: [],
  };

  componentDidMount() {
    this.getMinX(); 
    this.getMaxX();
    this.getMinY();
    this.getMaxY();
    this.sepCategories();
    this.getTicks();
    this.createGridLines();
  }

  //Reference used by createTicks to display shorter month names
  monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  //Get Min & Max X
  getMinX() {
    const { data } = this.props;
    let dates = data;
    this.setState({
      minX: dates[0].date,
    });
    return dates[0].date;
  }

  getMaxX() {
    const { data } = this.props;
    let dates = data;
    this.setState({
      maxX: dates[data.length - 1].date,
    });
    return dates[data.length - 1].date;
  }

  //Get Min & Max Y Values
  getMinY() {
    const { data } = this.props;
    let y = {};
    let values = data.map((x) => {
      y = x.value;
      return y;
    });

    this.setState({
      minY: Math.min(...values),
    });
    return Math.min(...values);
  }

  getMaxY() {
    const { data } = this.props;
    let y = {};
    let values = data.map((x) => {
      y = x.value;
      return y;
    });
    this.setState({
      maxY: Math.max(...values),
    });
    return Math.max(...values);
  }

  getTicks() {
    const { maxTicks } = this.props;
    const { width } = this.props
    const maxX = Date.parse(this.getMaxX());
    const minX = Date.parse(this.getMinX());
    let displayWidth = width * .8;
    let rangeX = maxX - minX;
    let scaleX = displayWidth / rangeX;
    let bufferX = (width - displayWidth) / 2;
    const allTicks = [];
    let dateIncrement = Math.ceil(rangeX / maxTicks);
    let dateCounter = minX
    allTicks.push({ date: new Date(dateCounter), x: Math.floor(scaleX + bufferX)});
    for (let i = 0; i < maxTicks; i++) {
      let t = {
        date: "",
        x: "",
      }
      dateCounter += dateIncrement;
      t.date = new Date(dateCounter);
      t.x = Math.floor((dateCounter - minX) * scaleX + bufferX);
      allTicks.push(t);
    } 
    this.setState((prevState) => ({
      ticks: [...prevState.ticks, allTicks],
    }));
  }

  //Organize Categories Into Seperate Arrays within a Larger Array
  sepCategories() {
    const { data } = this.props;
    const oData = [];
    const category1 = [];
    const category2 = [];
    const category3 = [];

    data.forEach((obj) => {
      if (obj.category == "1") {
        category1.push(obj);
      }
      if (obj.category == "2") {
        category2.push(obj);
      }
      if (obj.category == "3") {
        category3.push(obj);
      }
    });

    oData.push(category1);
    oData.push(category2);
    oData.push(category3);

    this.setState((prevState) => ({
      organizedData: [...prevState.organizedData, oData],
    }));
    this.createCoordinates(oData);
  }

  //Map through arrays of arrays of an array of objects and add x and y key/value pairs to each object.
  createCoordinates(z) {
    const { width } = this.props;
    const { height } = this.props;
    const oData = z;
    const maxX = Date.parse(this.getMaxX());
    const minX = Date.parse(this.getMinX());
    const maxY = this.getMaxY();
    const minY = this.getMinY();
    let displayWidth = width * .8;
    let displayHeight = height * .75;
    let rangeX = maxX - minX;
    let rangeY = maxY - minY;
    let scaleX = displayWidth / rangeX;
    let scaleY = displayHeight / rangeY;

    for (let group of oData) {
      for (let i = 0; i < group.length; i++) {
        if (group[i].category) {
          let yPoints = group.map((y) => {
            let yValue = Math.floor((y.value - minY) * scaleY);
            y["y"] = displayHeight - yValue + (height - displayHeight)/2;
          });

          let xPoints = group.map((x) => {
            let xValue = Math.floor((Date.parse(x.date) - minX) * scaleX);
            x["x"] = xValue + (width - displayWidth)/2;
          });
        }
      }
    }
  }

  createGridLines = () => {
    const { gridLineCount } = this.props;
    const { width } = this.props;
    const { height } = this.props;
    let displayWidth = width * .9;
    let displayHeight = height * .9
    let spacerX = displayWidth / gridLineCount;
    let spacerY = displayHeight/ gridLineCount;
    let gridXLines = []
    let gridYLines = []
    for(let i = 2; i < gridLineCount; i++) {
      gridXLines.push(spacerX * i);
      gridYLines.push(spacerY * i);
    }
    this.setState((prevState) => ({
      gridX: [...prevState.gridX, gridXLines],
    }));
    this.setState((prevState) => ({
      gridY: [...prevState.gridY, gridYLines],
    }));
  }

  drawPoints = (a) => {
    const c = a.toString();
    const regex = /([0-9]+),\s([0-9]+),\s/g;
    const cOrganized = c.replace(regex, "$1,$2 ");
    return cOrganized;
  };


  render() {
    const { data } = this.props;
    const { showTicks } = this.props;
    const { width } = this.props;
    const { height } = this.props;

    return (
      <div id="graphContainer" css={STYLES_GRAPH_CONTAINER}>
        <svg css={STYLES_GRAPH} viewBox={ (`0 0 ${width} ${height}`) }>
          <defs>
          <linearGradient id="linear-gradient" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="100%" >
            <stop offset="14%" stopColor={Constants.system.white}  stopOpacity="0%"/>
            <stop offset="79%" stopColor={Constants.system.moonstone} stopOpacity="85%"/>        
          </linearGradient>
          </defs>
          <g id="grid">
          {this.state.gridX.flat().map( g => {
            return (
              <line css={STYLES_GRID_LINE} x1={g} y1="90%" x2={g} y2="10%" />
            )
          })}
          {this.state.gridY.flat().map( g => {
            return (
              <line css={STYLES_GRID_LINE} x1="8%" y1={g} x2="92%" y2={g} />
            )
          })}
          </g>
          <g id="tickContainer">         
            {this.state.ticks.flat().map((tick, index) => {
              const { tickIncrement } = this.props
              const tDate = new Date(tick.date);
              const month = this.monthNames[tDate.getMonth()];
              const hours = tDate.getHours();
              const minutes = tDate.getMinutes();
              const seconds = tDate.getSeconds();
              const year = tDate.getUTCFullYear();
              switch(tickIncrement) {
              case "monthYear":
              return (
                <g>
                <line css={STYLES_AXIS_LINE} x1={tick.x} y1="90%" x2={tick.x} y2="92%" />
                <text css={STYLES_CHART_TEXT} textAnchor="middle" x={tick.x} y="95%">
                  {`${month} ${year}`}
                </text>
              </g>
              )
              case "month":
              return (
                <g>
                <line css={STYLES_AXIS_LINE} x1={tick.x} y1="90%" x2={tick.x} y2="92%" />
                <text css={STYLES_CHART_TEXT} textAnchor="middle" x={tick.x} y="95%">
                  {`${month}`}
                </text>
              </g>
              )
              case "year":
                return (
                  <g>
                  <line css={STYLES_AXIS_LINE} x1={tick.x} y1="90%" x2={tick.x} y2="92%" />
                  <text css={STYLES_CHART_TEXT} textAnchor="middle" x={tick.x} y="95%">
                    {`${year}`}
                  </text>
                </g>
                )
              case "hour":
                return (
                  <g>
                  <line css={STYLES_AXIS_LINE} x1={tick.x} y1="90%" x2={tick.x} y2="92%" />
                  <text css={STYLES_CHART_TEXT} textAnchor="middle" x={tick.x} y="95%">
                    { hours < 10 ? `0${hours}:` : `${hours}:`}
                    { minutes < 10 ? `0${minutes}:` : `${minutes}:`}
                    { seconds < 10 ? `0${seconds}` : `${seconds}`}
                  </text>
                </g>
                )
              default:
                return (
                <g id="labels">
                <text css={STYLES_CHART_TEXT} x="8%" y="95%">
                {Object.keys(data[0])[1]} 
              </text>
              <text css={STYLES_CHART_TEXT_Y} x="5%" y="82%">
                {Object.keys(data[0])[3]}
              </text>
                </g>)
              }
            })}
          </g>
          <g id="circles">
          {this.state.organizedData.flat(2).map((g, index) => {
            return (
              <circle key={index} cx={g.x} cy={g.y} r="3" css={STYLES_CHART_CIRCLE} />
            );
          })}
          </g>
          <g id="lines">
            {this.state.organizedData.flat().map( lines => {
              let coordinates = []; 
              let i = {};
              for (let line of lines) {
                  coordinates.push(line.x);
                  coordinates.push(line.y);
                  i[`id`] = line.id;
                };
              return (
                <polyline
                css={STYLES_CHART_LINE}
                key={i.id}
                points={this.drawPoints(coordinates)}
              />
              )
              })}
          </g>      
          <g>
            <line css={STYLES_AXIS_LINE} x1="8%" y1="90%" x2="8%" y2="10%" />
            <line css={STYLES_AXIS_LINE} x1="8%" y1="90%" x2="92%" y2="90%" />
          </g>
        </svg>
      </div>
    );
  }           
}
