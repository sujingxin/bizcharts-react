import React, { forwardRef, useImperativeHandle, Ref, useState } from 'react';
import ReactDOM from 'react-dom';

import {
    G2, Chart, Geom, Axis, Tooltip, Coord, Label, Legend, View, Guide, Shape, Facet, Util
} from "bizcharts"; import { Spin } from 'antd';

const numeral = require('numeral')
const DataSet = require('@antv/data-set');

interface BarProps {
    title?: React.ReactNode;
    data: Array<{
        [propName: string]: string | number;
    }>;
    titleMap: {
        [propName: string]: string | number;
    };
    alias?: {
        x?: string;
        y?: string;
    };
    lineSize?: number;
    height?: number;
    padding?: [number, number, number, number];
    // 图表宽度自适应开关
    // forceFit: true 时宽度 width 配置不生效。
    forceFit?: boolean;
    shape?: 'line' | 'smooth' | 'dot' | 'dash' | 'dotsmooth' | 'spline';
    style?: React.CSSProperties;
}

function BarFc(props: BarProps, ref: Ref<any>) {
    const {
        title,
        data,
        titleMap,
        lineSize = 1,
        height = 300,
        forceFit = true,
        shape = 'line',
        padding = 'auto',
        style = {},
        alias = {},
    } = props;
    const [loading, setLoading] = useState<boolean>(false);
    const changeLoadingState = (status: boolean) => {
        setLoading(status);
    };
    useImperativeHandle(ref, () => ({
        showLoading: () => changeLoadingState(true),
        hideLoading: () => changeLoadingState(false),
    }));
    // 配置数据比例尺，该配置会影响数据在图表中的展示方式
    // alias: string, // 数据字段的别名，会影响到轴的标题内容
    const scale = {
        x: {
            range: [0, 1],
            alias: alias.x,
        },
        value: {
            min: 0,
            alias: alias.y,
        },
    };

    const tooltip = [
        'key*value',
        (key, value) => ({
            name: key,
            value: numeral(value).format('0,0'),
            //   var string = numeral(1000).format('0,0');
            // '1,000'
        }),
    ] as [string, (...args: any[]) => { name?: string; value: string }];

    const ds = new DataSet();
    const dv = ds.createView();
    console.log('====', dv)
    dv.source(data)
        .transform({
            type: 'map',
            callback(row: { [propName: string]: string | number }) {
                const newRow = { ...row };
                Object.keys(titleMap).forEach(key => {
                    newRow[titleMap[key]] = row[key];
                });
                return newRow;
            },
        })
        .transform({
            type: 'fold',
            fields: Object.keys(titleMap).map(key => titleMap[key]),
            key: 'key',
            value: 'value',
        });

    return (
        <Chart height={400} data={dv} scale={scale} forceFit>
            <Axis title name="month" />
            <Axis title name="count" />
            <Legend />
            <Tooltip crosshairs={{ type: 'rect' }} />
            <Geom type="interval" position="month*count" color="month" />
        </Chart>
    );
}

const Bar = forwardRef(BarFc)

export default Bar;




