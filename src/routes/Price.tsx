import { useQuery } from "react-query";
import { fetchCoinTickers } from "../api";
import styled from "styled-components";

interface PriceProps {
  coinId: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    }
  };
}

const Overview = styled.div`
  display: flex;
  flex-direction: column;
`;

const OverviwItem = styled.div`
  display: flex;
  margin-bottom: 10px;
  background-color: black;
  padding: 10px 20px;
  border-radius: 10px;
  
  justify-content: space-between;
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

interface IPercent {
  data?: number;
}

const Percent = styled.span<IPercent>`
  ${(props) => (props.data && props.data < 0 ? 'color: red' : 'color: green')};
`;

function Price({coinId}: PriceProps) {
  const {isLoading, data} = useQuery<PriceData>(
    ["tickers", coinId], 
    () => fetchCoinTickers(coinId),
    {
      refetchInterval: 5000,
    }
  );
  
  return (
    <>
      { isLoading ? <Loader>Loading...</Loader> : (
        <Overview>
          <OverviwItem>
            <span>Current Prices :</span>
            <span>${data?.quotes.USD.price.toFixed(2)}</span>
          </OverviwItem>
          <OverviwItem>
            <span>Percent Change 24 Hourss :</span>
            <Percent data={data?.quotes.USD.percent_change_24h}>{data?.quotes.USD.percent_change_24h}%</Percent> 
          </OverviwItem>
          <OverviwItem>
            <span>Percent Change 7 days :</span>
            <Percent data={data?.quotes.USD.percent_change_7d}>{data?.quotes.USD.percent_change_7d}%</Percent>
          </OverviwItem>
          <OverviwItem>
            <span>Maximum Price :</span>
            <span>${data?.quotes.USD.ath_price.toFixed(2)}</span>
          </OverviwItem>
          <OverviwItem>
            <span>Maximum Price Date :</span>
            <span>{data?.quotes.USD.ath_date.slice(0,10)}</span>
          </OverviwItem>
        </Overview>
      )}
  </>
  );
}
export default Price;