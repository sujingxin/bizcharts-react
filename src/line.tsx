import React, { forwardRef, useImperativeHandle, Ref, useState } from 'react';
import { Chart, Axis, Tooltip, Geom, Legend } from 'bizcharts';
import { Spin } from 'antd';

const numeral = require('numeral')
const DataSet = require('@antv/data-set');

interface LineProps {
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

function Line(props: LineProps, ref: Ref<any>) {
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

    // scale 配置数据比例尺，该配置会影响数据在图表中的展示方式。
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
        <div style={{ height, ...style }} ref={ref}>
            {title && <h4 style={{ marginBottom: 20 }}>{title}</h4>}
            <Spin spinning={loading} tip="加载中...">
                <Chart
                    scale={scale}
                    height={title ? height - 41 : height}
                    data={dv}
                    padding={padding}
                    forceFit={forceFit}
                >
                    <Axis name="x" title={alias.x} />
                    <Axis name="value" title={alias.y} />
                    <Legend name="key" position="top" />
                    <Tooltip crosshairs={{ type: 'y' }} />
                    <Geom
                        type="line"
                        shape={shape}
                        position="x*value"
                        color="key"
                        size={lineSize}
                        tooltip={tooltip}
                    />
                </Chart>
            </Spin>
        </div>
    );
}

const LineFC = forwardRef(Line);

export default LineFC;
