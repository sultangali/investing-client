import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as fetches from '../redux/slices/index.js';
import populationData from "../populationData.js";
import db from '../investingDB.products.json'

const Main = () => {
  const dispatch = useDispatch();
  const investing = useSelector((state) => state.investing);

  React.useEffect(() => {
    if (!investing.isLoaded) {
      dispatch(fetches.fetchAll());
    }
  }, [dispatch, investing.isLoaded]);

  const memoizedData = React.useMemo(() => {
    if (investing.isLoaded) {
      return investing.items.map(item => ({ ...item}));
    }
    return [];
  }, [investing.items, investing.isLoaded]);

  const getOneData = (name, inputYear) => {
    const sortedData = []
    memoizedData?.forEach((data) => {
        if (data?.name == name) {
            data?.years?.forEach(arr => {
                if (arr.year == inputYear) {
                    sortedData.push(arr)
                }  
            })
        }
    })
    return sortedData[0]
  }

  const getCurrentPopulation = (year) => {
    let number = 0
    populationData.forEach(item => {
      if (item.year == year) {
        number = item.population
      }
    })
    return number
  }

  const one = getOneData(memoizedData[9]?.name, '1995')

  const currentPopulation = getCurrentPopulation('1995') / 1000000
  
  const output = one?.data?.slice(0, 53).reduce((acc, num) => acc + num, 0)

  const observation = output / currentPopulation

  console.log('db', db)

  console.log( {
    'output': output / 1000,
    'currentPopulation': currentPopulation,
    'observation': observation
  })

  return (<>
  <h1>Main Page</h1>
  <ul>
    {
        one?.data?.map((item, i) => (
            <li key={i}>{item}</li>
        ))
    }
  </ul>
  </>);
};

export default Main;
