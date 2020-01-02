import React, { forwardRef, useImperativeHandle, Ref, useState } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import Line from './line';
import Bar from './bar';

const scData = [];
for (let i = 0; i < 30; i += 1) {
  scData.push({
    x: i + 1,
    A1: Math.floor(Math.random() * 1000) + 200,
    A2: Math.floor(Math.random() * 1000) + 200,
    A3: Math.floor(Math.random() * 1000) + 200,
  })
}
// console.log(scData)

const data = [
  {
    name: "London",
    Jan: 18.9,
    Feb: 28.8,
    Mar: 39.3,
    Apr: 81.4,
    May: 47,
    Jun: 20.3,
    Jul: 24,
    Aug: 35.6
  },
  {
    name: "Berlin",
    Jan: 12.4,
    Feb: 23.2,
    Mar: 34.5,
    Apr: 99.7,
    May: 52.6,
    Jun: 35.5,
    Jul: 37.4,
    Aug: 42.4
  }
];
const titleMap = { Jan: "Jan", Feb: "Feb", Mar: "Mar", Apr: "Apr", May: "May", Aug: "Aug", Jul: "Jul", Jun: "Jun" }


ReactDOM.render(<div>
  <Line title="生成统计" data={scData} titleMap={{ A1: '机器人1', A2: '机器人2', A3: '机器人3' }} />
  <Bar title="降雨统计图" data={data} titleMap={titleMap} />
</div>, document.getElementById('root'));



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
