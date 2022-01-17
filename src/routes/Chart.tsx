import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

interface IHistori {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
}

function Chart({coinId}: ChartProps) {
  const {isLoading, data} = useQuery<IHistori[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
  );

  return <div>{isLoading ? "Loading chart.." : (
    // <ApexChart 
    //   series={[
    //     {
    //       name: "Price",
    //       data: data?.map(price => price.close),
    //     },
    //   ]}
    //   options={{
    //     theme: {
    //       mode:"dark",
    //     },
    //     chart: {
    //       type: "line",
    //       height: 300,
    //       width: 500,
    //       toolbar: {
    //         show: false,
    //       },
    //       background: "transparent",
    //     },
    //     grid: {
    //       show: false,
    //     },
    //     yaxis: {
    //       show: false,
    //     },
    //     xaxis: {
    //       labels: {show: false},
    //       axisTicks: {show: false},
    //       axisBorder: {show: false},
    //       type: "datetime",
    //       categories: data?.map((data) => data.time_close),
    //     },
    //     stroke: {
    //       curve: "smooth",
    //       width: 4,
    //     },
    //     fill: {
    //       type:"gradient", 
    //       gradient: {gradientToColors: ["#0be881"], stops: [0, 100], },
    //     },
    //     colors: ["#0fbcf9"],
    //     tooltip: {
    //       y: {
    //         formatter: (value) => `$ ${value.toFixed(3)}`,
    //       }
    //     }
    //   }}
    // />
        <ApexChart 
          type= "candlestick"
          series={[
            {
              data: data?.map(data => {
                return {x:data.time_close, y:[data.open, data.high, data.low, data.close]}
              })
            },
          ]}
          options={{
            theme: {
              mode:"dark",
            },
            chart: {
              height: 350,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            xaxis: {
              labels: {show: false},
              axisTicks: {show: false},
              axisBorder: {show: false},
              type: "datetime",
            },
            yaxis: {
              show: false,
              tooltip: {
                enabled: true,
              }
            }
          }}
      />
    )}
  </div>
}
export default Chart;