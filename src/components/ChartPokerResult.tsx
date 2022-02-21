import React from "react";

import ReactECharts from "echarts-for-react";
import { EChartsOption } from "echarts";
import { Card, CardContent } from "@mui/material";

type Props = {
  data: {
    [point: string]: number;
  };
};

const ChartPokerResult: React.FC<Props> = ({ data }) => {
  const options: EChartsOption = {
    title: {
      text: "結果",
    },
    yAxis: {
      type: "category",
      data: Object.keys(data),
      name: "ポイント",
    },
    xAxis: {
      name: "選択者数",
      type: "value",
      nameLocation: "middle",
      nameGap: 20,
    },
    series: [
      {
        data: Object.values(data),
        type: "bar",
        showBackground: true,
        backgroundStyle: {
          color: "rgba(180, 180, 180, 0.2)",
        },
      },
    ],
  };

  return (
    <Card sx={{ minWidth: "500px" }}>
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
