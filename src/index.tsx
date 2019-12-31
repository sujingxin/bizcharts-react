import React, { forwardRef, useImperativeHandle, Ref, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Chart, Geom, Axis, Tooltip, Legend, Coord } from 'bizcharts';
import { Spin } from 'antd';
import Line from './line';
import Bar from './bar';

const numeral = require('numeral')
const DataSet = require('@antv/data-set');

const scData = [];
// const xhData = []
for (let i = 0; i < 30; i += 1) {
    scData.push({
        x: i + 1,
        A1: Math.floor(Math.random() * 1000) + 200,
        // A2: Math.floor(Math.random() * 1000) + 200,
        // A3: Math.floor(Math.random() * 1000) + 200,
    })
    console.log(scData)
    // xhData.push({
    //     x: i + 1,
    //     T1: Math.floor(Math.random() * 1000) + 200,
    //     T2: Math.floor(Math.random() * 1000) + 200,
    //     T3: Math.floor(Math.random() * 1000) + 200,
    //     T4: Math.floor(Math.random() * 1000) + 200,
    // });
}


ReactDOM.render(<Line title="生成统计" data={scData} titleMap={{ A1: '机器人1', A2: '机器人2', A3: '机器人3' }} />
    , document.getElementById('root'));

const data = [
    { month: 'Jan.', count: 69, city: 'tokyo' },
    { month: 'feb.', count: 45, city: 'fff' },
    { month: 'mar.', count: 4, city: 'tokyo' },
    { month: 'apr.', count: 65, city: 'tokyo' },
    { month: 'may.', count: 36, city: 'tokyo' },
    { month: 'jun.', count: 99, city: 'tokyo' },
    { month: 'jul.', count: 81, city: 'tokyo' },
    { month: 'aug.', count: 45, city: 'tokyo' },
    { month: 'sep.', count: 69, city: 'tokyo' },
    { month: 'oct.', count: 27, city: 'tokyo' },
    { month: 'nov.', count: 4, city: 'tokyo' },
    { month: 'dec.', count: 85, city: 'tokyo' }
];


ReactDOM.render(<Bar data={data} titleMap={{ month: '月份' }} />
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
