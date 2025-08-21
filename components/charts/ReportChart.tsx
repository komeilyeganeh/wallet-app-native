import { FC } from "react";
import { BarChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

const chartConfig = {
  backgroundColor: "#ffffff",
  backgroundGradientFrom: "#ffffff",
  backgroundGradientTo: "#ffffff",
  color: (opacity = 1) => `#FF4267`,
  labelColor: (opacity = 1) => `#989898`,
  strokeWidth: 1, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
  propsForBackgroundLines:{
    stroke: "#EBECF1"
  },
};

const ReportChart: FC = () => {
  // **** jsx ****
  return (
    <BarChart
      chartConfig={chartConfig}
      data={{
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            data: [20, 45, 28, 80, 99, 43],
          },
        ],
      }}
      showBarTops={false}
      width={screenWidth - 60}
      yAxisLabel="$"
      yAxisSuffix="S"
      height={180}
      fromZero
      withHorizontalLabels={false}
    />
  );
};

export default ReportChart;
