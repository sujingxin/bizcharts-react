import React, { forwardRef, useImperativeHandle, Ref, useState } from 'react';
import ReactDOM from 'react-dom';
import {
    G2, Chart, Geom, Axis, Tooltip, Coord, Label, Legend, View, Guide, Facet, Util
} from "bizcharts";
import { Spin } from 'antd';

const DataSet = require('@antv/data-set');

// 全局图表主题切换
// const { Global } = G2;  // 获取 Global 全局对象
// Global.setTheme('dark');  // 传入值为 'default'、'dark'的一种，如果不是，那么使用 default 主题
// Global.animate = false;  // 关闭默认动画
// Global.colors=['red', 'blue', 'yellow']; // 更改默认颜色


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
    height?: number;
    padding?: [number, number, number, number];
    // 图表宽度自适应开关
    // forceFit: true 时宽度 width 配置不生效。
    forceFit?: boolean;
}

function BarFc(props: BarProps, ref: Ref<any>) {
    const {
        title,
        data,
        titleMap,
        height = 400,
        forceFit = true,
        padding = 'auto',
        alias = {
            x: 'x',
            y: 'value'
        }
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
        sales: {
            tickInterval: 20,   // 设置坐标轴上刻度点的个数
            alias, // 数据字段的别名，会影响到轴的标题内容
        }
    };

    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.source(data)
        .transform({
            type: 'fold',
            fields: Object.keys(titleMap).map((key) => titleMap[key]),
            key: 'x',
            value: 'value',

        });

    return (
        <div>
            <h4 style={{ textAlign: "center" }}>{title}</h4>
            <Spin spinning={loading} tip="加载中...">
                <Chart height={height} theme="default" data={dv} scale={scale} padding={padding} forceFit={forceFit}>
                    <Axis title={alias.x} name={alias.x} />
                    <Axis title={alias.y} name={alias.y} />
                    <Legend />
                    <Tooltip crosshairs={{ type: 'rect' }} />
                    <Geom type="interval" position="x*value" color="name" adjust={[
                        {
                            type: "dodge",
                            marginRatio: 1 / 32
                        }
                    ]} />
                </Chart>
            </Spin>
        </div>
    );
}

const Bar = forwardRef(BarFc)

export default Bar;




