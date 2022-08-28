import React, { useEffect, useState } from "react";
import { useRESAS } from "~/hooks/useRESAS/useRESAS";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Legend,
  YAxis,
  Tooltip,
} from "recharts";

interface GraphData {
  年度: number;
  [key: string]: number | string;
}

// 県名をクリックするたびにすべてのグラフの色が更新されてしまうため、prefCodeをシードに色を固定できるようにしたい
const randomColor = (): string => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

export const GraphView: React.FC = () => {
  const { populationData } = useRESAS();

  const [graphData, setGraphData] = useState<GraphData[]>([]);
  const [shownPrefectures, setShownPrefectures] = useState<string[]>([]);

  useEffect(() => {
    let tmpGraphData: GraphData[] = [];
    // ここでrecharts.js向けにデータを加工する
    populationData.forEach((pItem1) => {
      if (pItem1.isActive) {
        tmpGraphData = pItem1.data.map((pItem2) => {
          const tmpData = tmpGraphData.find(
            (item) => item.年度 === pItem2.year
          );
          if (tmpData === undefined) {
            return { 年度: pItem2.year, [pItem1.prefName]: pItem2.value };
          } else {
            tmpData[pItem1.prefName] = pItem2.value;
            return tmpData;
          }
        });
      }
    });
    setGraphData(tmpGraphData);
    if (tmpGraphData.length > 0) {
      // graphDataのプロパティから年度だけ除外した県名リストを作成
      setShownPrefectures(
        Object.keys(tmpGraphData[0]).filter((item) => item !== "年度")
      );
    }
  }, [populationData]);

  return (
    <div>
      <LineChart width={1400} height={800} data={graphData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="年度" interval="preserveStartEnd" />
        <YAxis interval="preserveStartEnd" />
        <Tooltip />
        <Legend />
        {shownPrefectures.map((prefName, i) => {
          return (
            <Line
              type="monotone"
              dataKey={prefName}
              activeDot={{ r: 8 }}
              stroke={randomColor()}
              strokeWidth={2}
              key={`graphData-${i}`}
            />
          );
        })}
      </LineChart>
    </div>
  );
};
