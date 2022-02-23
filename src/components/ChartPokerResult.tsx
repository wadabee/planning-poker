import React, { useMemo } from "react";
import _ from "lodash";

import ReactECharts from "echarts-for-react";
import { EChartsOption } from "echarts";
import { Card, CardContent } from "@mui/material";
import usePoker from "../hooks/usePoker";
import { useParams } from "react-router-dom";
import { RoomPathParams } from "../@types/Params";

const ChartPokerResult: React.FC = () => {
  const { roomId } = useParams<RoomPathParams>();
  const { result } = usePoker(roomId ?? "");

  const pieresult = useMemo(() => {
    return Object.keys(result).map((key) => ({
      name: key,
      value: result[key],
    }));
  }, [result]);

  const mean = useMemo(() => {
    const values: number[] = [];
    Object.keys(result).forEach((key) => {
      values.push(..._.fill(Array(result[key]), Number.parseInt(key)));
    });
    return _.mean(values);
  }, [result]);

  const options: EChartsOption = {
    title: {
      text: "結果",
    },
    grid: [{ right: "55%" }],
    yAxis: [
      {
        type: "category",
        data: Object.keys(result),
        name: "ポイント",
      },
    ],
    xAxis: [
      {
        name: "選択者数",
        type: "value",
        nameLocation: "middle",
        nameGap: 20,
        splitNumber: 1,
      },
    ],
    series: [
      {
        data: Object.values(result),
        type: "bar",
        showBackground: true,
        backgroundStyle: {
          color: "rgba(180, 180, 180, 0.2)",
        },
      },
      {
        type: "pie",
        radius: [0, "30%"],
        center: ["75%", "50%"],
        label: {
          position: "center",
          fontSize: 25,
        },
        labelLine: {
          show: false,
        },
        silent: true,
        data: [
          {
            value: 0,
            name: `平均値\n${mean}`,
            itemStyle: {
              color: "rgba(255, 255, 255, 1)",
            },
          },
        ],
      },
      {
        name: "Access From",
        type: "pie",
        radius: ["40%", "70%"],
        center: ["75%", "50%"],
        data: pieresult,
        label: {
          position: "inside",
          formatter: "{b}\n{per|{d}%}",
          rich: {
            per: {
              color: "#fff",
              backgroundColor: "#4C5058",
              padding: [3, 4],
              borderRadius: 4,
            },
          },
        },
      },
    ],
  };

  return (
    <Card sx={{ minWidth: "700px" }}>
      <CardContent>
        <ReactECharts
          option={options}
          style={{ height: "300px", width: "100%" }}
        />
      </CardContent>
    </Card>
  );
};

export default ChartPokerResult;
