import React, { forwardRef, useImperativeHandle, Ref, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
// import { Chart, Geom, Axis, Tooltip, Legend, Coord } from 'bizcharts';
// import { Spin } from 'antd';
import Line from './line';
import Bar from './bar';

// const numeral = require('numeral')
// const DataSet = require('@antv/data-set');

const scData = [];
// const xhData = []
for (let i = 0; i < 30; i += 1) {
    scData.push({
        x: i + 1,
        A1: Math.floor(Math.random() * 1000) + 200,
        A2: Math.floor(Math.random() * 1000) + 200,
        A3: Math.floor(Math.random() * 1000) + 200,
    })
}
console.log(scData)

const data = [
    {
      name: "London",
      "Jan": 18.9,
      "Feb": 28.8,
      "Mar": 39.3,
      "Apr": 81.4,
      'May': 47,
      "Jun": 20.3,
      "Jul": 24,
      "Aug": 35.6
    },
    {
      name: "Berlin",
      "Jan": 12.4,
      "Feb": 23.2,
      "Mar": 34.5,
      "Apr": 99.7,
      'May': 52.6,
      "Jun": 35.5,
      "Jul": 37.4,
      "Aug": 42.4
    }
  ];

ReactDOM.render(<Line title="生成统计" data={scData} titleMap={{ A1: '机器人1', A2: '机器人2', A3: '机器人3' }} />
    , document.getElementById('root'));

ReactDOM.render(<Bar title="降雨统计图" data={data} titleMap={{ Jan: 'Jan.', Feb: 'Feb.',Mar:"Mar.",Apr:"Apr.",May:'May',Jun:"Jun.",Jul:"Jul.",Aug:"Aug."}} />
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
