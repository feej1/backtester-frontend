

import React, { useRef, useEffect, useMemo } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import moment from "moment";
// import "moment-timezone";
import ExportingModule from "highcharts/modules/exporting";
import ExportDataModule from "highcharts/modules/export-data";

ExportingModule(Highcharts);
ExportDataModule(Highcharts);


// const data = convertToRechartData(SpyData["Time Series (Daily)"]);


function StockChart({ data, isLoading, seriesName }) {
    const chartRef = useRef();

    const options = useMemo(() => {
        return {
            chart: {
                backgroundColor: "#FFFFFF",
            },
            boost: {
                useGPUTranslations: true,
            },
            xAxis: {
                type: "datetime",
                title: {
                    text: "Date",
                    style: {
                    color: "#28282C",
                        fontSize: 12,
                        fontFamily: "Gill Sans, sans-serif",
                    },
                    categories: [],
                },
                labels: {
                    style: {
                    color: "#28282C",
                        fontSize: 12,
                        fontFamily: "Gill Sans, sans-serif",
                    },
                },
            },
            yAxis: {
                gridLineWidth: 0,
                title: {
                    text: "Dollars",
                    align: "high",
                    style: {
                    color: "#28282C",
                        fontSize: 12,
                        fontFamily: "Gill Sans, sans-serif",
                    },
                },
                labels: {
                    overflow: "justify",
                    style: {
                        color: "#28282C",
                        fontSize: 12,
                        fontFamily: "Gill Sans, sans-serif",
                    },
                },
            },
            navigator: {
                xAxis: {
                    labels: {
                        style: {
                            color: "#28282C",
                        },
                    },
                },
            },
            rangeSelector: {
                inputBoxBorderColor: "none",
                inputStyle: {
                    color: "#28282C",
                },
                labelStyle: {
                    color: "#28282C",
                },

                buttons: [
                    {
                        type: "day",
                        count: 1,
                        text: "1d",
                    },
                    {
                        type: "day",
                        count: 5,
                        text: "5d",
                    },
                    {
                        type: "month",
                        count: 1,
                        text: "1m",
                    },
                    {
                        type: "month",
                        count: 3,
                        text: "3m",
                    },
                    {
                        type: "month",
                        count: 6,
                        text: "6m",
                    },
                    {
                        type: "ytd",
                        text: "YTD",
                    },
                    {
                        type: "all",
                        text: "All",
                    },
                ],
            },
            legend: {
                enabled: true,
                itemStyle: {
                    color: "#28282C",
                    fontSize: 14,
                    fontFamily: "Gill Sans, sans-serif",
                },
            },
            tooltip: {
                formatter: function () {
                    const formattedDate = moment(this.x).format("D MMM YYYY, HH:mm");
                    return `<b>${formattedDate}</b><br />${this.series.name}: ${this.y}`;
                },
            },
            series: [
                {
                    name: seriesName,
                    showInNavigator: true,
                    data: data,
                    tooltip: {
                        valueDecimals: 2,
                    },
                },
            ],
            time: {
                useUTC: false,
            },
            exporting: {
                enabled: true,
                buttons: {
                    contextButton: {
                        symbolFill: "red",
                    },
                },
            },
        };
    }, [data, seriesName]);

    useEffect(() => {
        let chartObj = chartRef.current.chart;

        if (isLoading) {
            chartObj.showLoading();
        } else {
            chartObj.hideLoading();
        }
    }, [isLoading]);

    return (
        <div>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
                ref={chartRef}
                constructorType={"stockChart"}
            />
        </div>
    );
};

export default StockChart;

