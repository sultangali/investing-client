import React from "react";
import { Container, Row, Col, Table, Stack } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { interval, timer } from 'rxjs';
import { useTranslation } from 'react-i18next';
import { switchMap, startWith, map } from 'rxjs/operators';
import * as fetches from '../redux/slices/index.js';
import populationData from "../populationData.js";
import TableRow from "./TableRow.jsx";
import One from "./One.jsx";

const Main = ({ currentYear, currentTime, currentLanguage }) => {
  const navigate = useNavigate();

  const [YEAR, setYEAR] = React.useState(currentYear?.toString() || '2024');
  const [time, setTime] = React.useState('live');
  const [selectedData, setSelectedData] = React.useState(null);
  const [hourlyData, setHourlyData] = React.useState([]);
  const [updatedIndices, setUpdatedIndices] = React.useState([])

  const { t } = useTranslation();

  const CRITERION_AT_THE_BORDER = { 1: 0.398697444288481, 2: 0.579463019350998, 3: 0.733398295088505 };
  const CRITERION_FOR_THE_EQUATION = { 1: 120.290460903314, 2: 72.3935839196748, 3: 42.1493997425231 };
  const EQUILIBRIUM_CRITERION = { 1: 0.809522966400431, 2: 1.1823122974944, 3: 1.5174732854438 };
  const FORECASTING_CRITERION = { 1: 1.01706456620769, 2: 1.00962213784764, 3: 1.01314381597942 };

  const dispatch = useDispatch();
  const investing = useSelector((state) => state.investing);

  React.useEffect(() => {
    setYEAR(currentYear?.toString() || '2024')
  }, [currentYear || '2024'])

  React.useEffect(() => {
    setTime(currentTime ? currentTime : 'live')
  }, [currentTime || 'live'])

  React.useEffect(() => {
    if (!investing.isLoaded) {
      dispatch(fetches.fetchAll());
    }
  }, [dispatch, investing.isLoaded]);

  const memoizedData = React.useMemo(() => {
    if (investing.isLoaded) {
      return investing.items.map(item => ({ ...item }));
    }
    return [];
  }, [investing.items, investing.isLoaded]);

  // memoizedData?.forEach((data, i) => {
  //   console.log(i, data?.name) 
  // })

  const switchTime = (output, currentTime) => {
    switch (currentTime) {
      case 'live':
        return output / 365 / 24 / 60; // Примерное значение для минуты (при 365 днях в году)
      case '15sec':
        return output / (365 * 24 * 60 * 60 / 15); // Примерное значение для 15 секунд
      case '1min':
        return output / (365 * 24 * 60); // Значение для 1 минуты
      case '1hour':
        return output / 365 / 24; // Значение для часа
      case '1day':
        return output / 365; // Значение для одного дня
      case '1week':
        return output / 52; // Значение для одной недели (52 недели в году)
      case '1month':
        return output / 12; // Значение для одного месяца (12 месяцев в году)
      case '3month':
        return output / 4; // Значение для трёх месяцев (4 квартала в году)
      case '6month':
        return output / 2; // Значение для шести месяцев (полгода)
      case '1year':
        return output; // Годовое значение, без изменений
      default:
        return output; // Если ни один из случаев не подходит, возвращаем оригинальные данные
    }
  }

  const getTimeName = (currentTime) => {
    switch (currentTime) {
        case 'live':
            return t('live'); // Примерное значение для минуты (при 365 днях в году)
        case '15sec':
            return t('15sec'); // Значение для часа
        case '1min':
            return t('1min'); // Значение для одного дня
        case '1hour':
            return t('1hour'); // Значение для часа
        case '1day':
            return t('1day'); // Значение для одного дня
        case '1week':
            return t('1week'); // Значение для одной недели (52 недели в году)
        case '1month':
            return t('1month'); // Значение для одного месяца (12 месяцев в году)
        case '3month':
            return t('3month'); // Значение для трёх месяцев (4 квартала в году)
        case '6month':
            return t('6month'); // Значение для шести месяцев (полгода)
        case '1year':
            return t('1year'); // Годовое значение, без изменений
        default:
            return t('1year'); // Если ни один из случаев не подходит, возвращаем оригинальные данные
    }
}

  const getTimeInterval = (currentTime) => {
    switch (currentTime) {
      case 'live':
        return 1300; // 1.3 секунды
      case '15sec':
        return 15000; // 15 секунд
      case '1min':
        return 60000; // 1 минута
      case '1hour':
        return 3600 * 1000; // 1 час
      case '1day':
        return 24 * 3600 * 1000; // 1 день
      case '1week':
        return 7 * 24 * 3600 * 1000; // 1 неделя
      case '1month':
        return 30 * 24 * 3600 * 1000; // 1 месяц (30 дней)
      case '3month':
        return 90 * 24 * 3600 * 1000; // 3 месяца (90 дней)
      case '6month':
        return 180 * 24 * 3600 * 1000; // 6 месяцев (180 дней)
      case '1year':
        return 365 * 24 * 3600 * 1000; // 1 год (365 дней)
      default:
        return 1300; // По умолчанию 1.3 секунды
    }
  };

  const getOneData = (name, inputYear, previousYear = false) => {
    const sortedData = [];
    memoizedData?.forEach((data) => {
      if (data?.name === name) {
        data?.years?.forEach(arr => {
          if ((previousYear && arr.year === inputYear - 1) || (!previousYear && arr.year === inputYear)) {
            sortedData.push(arr);
          }
        });
      }
    });
    return sortedData[0];
  };


  const getCurrentPopulation = (year) => {
    // console.log("Checking population for year:", year);
    let number = 0;
    populationData.forEach(item => {
      if (item.year === year) {
        number = item.population;
      }
    });
    // console.log("Found population:", number);
    return number;
  };

  const getMaxWithSum = (name, year) => {
    let jSum = [];
    let total = 0;
    const length = (parseInt(year) - 1995) + 1;

    if (memoizedData && memoizedData.length > 0) {
      memoizedData.forEach((item) => {
        if (item?.name === name) {
          item.years.forEach((yearData) => {
            if (parseInt(yearData.year) <= parseInt(year)) {
              const one = getOneData(name, yearData.year);
              const observation = {
                population: getCurrentPopulation(yearData.year) / 1000000,
                output: one?.data?.slice(0, 53).reduce((acc, num) => acc + num, 0)
              };
              jSum.push(parseFloat((observation.output / observation.population).toFixed(1)));
            }
          });
        }
      });

      if (jSum.length >= length) {
        for (let i = 0; i < length; i++) {
          if (!isNaN(jSum[i])) {
            total += jSum[i];
          } else {
            return undefined;
          }
        }
      }
    }
    return total;
  };



  const getPreviousObservation = (name, year) => {
    // Получаем данные за предыдущий год, используя параметр previousYear
    const previousData = getOneData(name, year, false);
    if (previousData) {
      const previousOutput = previousData.data.slice(0, 53).reduce((acc, num) => acc + num, 0) / 365;
      const previousPopulation = getCurrentPopulation((parseInt(year) - 1).toString()) / 1000000;
      return previousOutput / previousPopulation;
    }
    return null;
  };


  const getKvalue = (name, criterion) => {
    const sorted = [];
    let number = 0;
    memoizedData?.forEach((item) => {
      if (item?.name === name) {
        item?.years?.forEach(yearData => {
          const one = getOneData(name, yearData.year);
          const observation = {
            population: getCurrentPopulation(yearData.year) / 1000000,
            output: one?.data?.slice(0, 53).reduce((acc, num) => acc + num, 0)
          };
          number += parseFloat((observation.output / observation.population).toFixed(1));
          sorted.push(number);
        });
      }
    });
    return Math.max(...sorted) / criterion;
  };

  const getKcell = (name, year) => {
    let number = 0;
    for (let y = 1995; y <= year; y++) {
      const one = getOneData(name, y.toString());
      const observation = {
        population: getCurrentPopulation(y.toString()) / 1000000,
        output: one?.data?.slice(0, 53).reduce((acc, num) => acc + num, 0)
      };
      number += parseFloat((observation.output / observation.population).toFixed(1));
    }
    return number;
  };



  const calculateData = (item) => {
    const one = getOneData(item?.name, YEAR)
    const currentPopulation = getCurrentPopulation(YEAR) / 1000000
    const output = switchTime(one?.data?.slice(0, 53).reduce((acc, num) => acc + num, 0), time)
    const randomFactor = 1 + (Math.random() - 0.5) / 10
    const adjustedOutput = output * randomFactor

    const calculateSlope = (currentK) => {
      const yValues = [];
      const xValues = [];
      let count = 1;

      for (let y = 1995; y <= 2024; y++) {
        const currentCellValue = getKcell(item?.name, y.toString());
        yValues.push(Math.log(currentCellValue) - Math.log(currentK - currentCellValue));
        xValues.push(count);
        count++;
      }

      const mean = arr => arr.reduce((acc, val) => acc + val, 0) / arr.length;

      const xMean = mean(xValues);
      const yMean = mean(yValues);

      const numerator = xValues.reduce((acc, x, i) => acc + ((x - xMean) * (yValues[i] - yMean)), 0);
      const denominator = xValues.reduce((acc, x) => acc + ((x - xMean) ** 2), 0);

      const slope = numerator / denominator;

      return slope;
    };

    const previousObservation = getPreviousObservation(item?.name, YEAR);

    let observation1 = {
      root: ((adjustedOutput) / currentPopulation)
    }

    // Increased, Balanced, Decreased мәндерін есептеу
    if (YEAR === 1995 || previousObservation === null) {
      observation1.increased = parseFloat(Math.abs(1).toFixed(3))
      observation1.balanced = parseFloat(Math.abs(0).toFixed(3))
      observation1.decreased = 0

    } else {
      let change = (observation1.root - previousObservation) / previousObservation;
      // console.log("observation1.root", observation1.root);
      // console.log("previousObservation", previousObservation);
      // console.log("change", change);

      if (change > 0) {

        observation1.increased = parseFloat((Math.abs(change)).toFixed(3));
        observation1.balanced = 1 - parseFloat((observation1.increased).toFixed(3));
        observation1.decreased = 0;
      } else if (change < 0) {
        observation1.increased = 0;
        observation1.balanced = parseFloat((1 - Math.abs(change)).toFixed(3));
        observation1.decreased = parseFloat(Math.abs(change).toFixed(3));
      } else {
        observation1.increased = 0;
        observation1.balanced = 1; // Мұнда change 0-ге тең болғандықтан, balanced мәні 1-ге тең.
        observation1.decreased = 0;
      }
    }

    let observation2 = {
      root: (observation1.increased * observation1.root +
        observation1.balanced * observation1.root + observation1.decreased * observation1.root)
    }

    let K = { 1: parseFloat(getKvalue(item?.name, CRITERION_AT_THE_BORDER['1']).toFixed(1)) }

    let cell = getKcell(item?.name, YEAR)

    let logarithm = { 1: parseFloat((Math.log(cell) - Math.log(K['1'] - cell)).toFixed(2)) }

    const aIndex = parseInt(YEAR) - 1995

    let slope = { 1: parseFloat(calculateSlope(K['1']).toFixed(4)) }

    let postObserv = parseFloat(((CRITERION_FOR_THE_EQUATION['1'] * K['1'] * Math.exp(slope['1'] * aIndex)) /
      K['1'] - CRITERION_FOR_THE_EQUATION['1'] + CRITERION_FOR_THE_EQUATION['1'] * Math.exp(slope['1'] * aIndex) * randomFactor).toFixed(2))

    let equilibrium1 = {
      root: EQUILIBRIUM_CRITERION['1'] * (postObserv - parseFloat(((CRITERION_FOR_THE_EQUATION['1'] * K['1'] * Math.exp(slope['1'] * (aIndex - 1))) /
        K['1'] - CRITERION_FOR_THE_EQUATION['1'] + CRITERION_FOR_THE_EQUATION['1'] * Math.exp(slope['1'] * (aIndex - 1))).toFixed(2)))
    }

    equilibrium1['root'] = parseFloat(equilibrium1['root'].toFixed(7))


    // Increased, Balanced, Decreased мәндерін есептеу
    if (YEAR === `1995` || previousObservation === null) {
      equilibrium1.increased = parseFloat(Math.abs(1).toFixed(3))
      equilibrium1.balanced = parseFloat(Math.abs(0).toFixed(3))
      equilibrium1.decreased = 0
    } else {
      const change = (equilibrium1.root - previousObservation) / previousObservation;
      if (change > 0) {
        equilibrium1.increased = parseFloat(Math.abs(change).toFixed(3));
        equilibrium1.balanced = parseFloat((1 - equilibrium1.increased).toFixed(3));
        equilibrium1.decreased = 0;
      } else if (change < 0) {
        equilibrium1.increased = 0;
        equilibrium1.balanced = parseFloat((1 - Math.abs(change)).toFixed(3));
        equilibrium1.decreased = parseFloat(Math.abs(change).toFixed(3));
      } else {
        equilibrium1.increased = 0;
        equilibrium1.balanced = 1; // Мұнда change 0-ге тең болғандықтан, balanced мәні 1-ге тең.
        equilibrium1.decreased = 0;
      }
    }

    let forecasting1 = { pre: (Math.pow(FORECASTING_CRITERION['1'], aIndex - 1)) * randomFactor }


    forecasting1.root = parseFloat((forecasting1.pre *
      (equilibrium1.increased * observation1.root +
        equilibrium1.balanced * observation1.root +
        equilibrium1.decreased * observation1.root)).toFixed(8))

    //  console.log(observation1)
    // console.log("--------------------------------------------------")

    let fModuleNumber = { 1: parseFloat((observation1.root - equilibrium1.root).toFixed(1)) }


    const getNextEquilibrium = () => {

      const postObservation = parseFloat(((CRITERION_FOR_THE_EQUATION['1'] * K['1'] * Math.exp(slope['1'] * (aIndex + 1))) /
        K['1'] - CRITERION_FOR_THE_EQUATION['1'] + CRITERION_FOR_THE_EQUATION['1'] * Math.exp(slope['1'] * (aIndex + 1))).toFixed(2))

      const result = EQUILIBRIUM_CRITERION['1'] * (postObservation - ((CRITERION_FOR_THE_EQUATION['1'] * K['1'] * Math.exp(slope['1'] * (aIndex))) /
        K['1'] - CRITERION_FOR_THE_EQUATION['1'] + CRITERION_FOR_THE_EQUATION['1'] * Math.exp(slope['1'] * (aIndex))))

      return parseFloat(result.toFixed(1))
    }

    let rModuleNumber = { 1: parseFloat(((getNextEquilibrium() - equilibrium1.root) / equilibrium1.root).toFixed(3)) }

    let rNextNumber = { 1: parseFloat((Math.random() * (0.399 - 0.100) + 0.100).toFixed(3)) }

    const getCurrentPostObserv = parseFloat(((CRITERION_FOR_THE_EQUATION['1'] * K['1'] * Math.exp(slope['1'] * (aIndex - 1))) /
      K['1'] - CRITERION_FOR_THE_EQUATION['1'] + CRITERION_FOR_THE_EQUATION['1'] * Math.exp(slope['1'] * (aIndex - 1))).toFixed(2))

    const currentEquilibrium = {
      root: EQUILIBRIUM_CRITERION['1'] * (getCurrentPostObserv - parseFloat(((CRITERION_FOR_THE_EQUATION['1'] * K['1'] * Math.exp(slope['1'] * (aIndex - 2))) /
        K['1'] - CRITERION_FOR_THE_EQUATION['1'] + CRITERION_FOR_THE_EQUATION['1'] * Math.exp(slope['1'] * (aIndex - 2))).toFixed(2)))
    }

    currentEquilibrium['root'] = parseFloat(currentEquilibrium['root'].toFixed(1))

    const getNextEquilibriumZERO1 = () => {
      const postObservation = parseFloat(((CRITERION_FOR_THE_EQUATION['1'] * K['1'] * Math.exp(slope['1'] * (2))) /
        K['1'] - CRITERION_FOR_THE_EQUATION['1'] + CRITERION_FOR_THE_EQUATION['1'] * Math.exp(slope['1'] * (2))).toFixed(2))

      const result = EQUILIBRIUM_CRITERION['1'] * (postObservation - ((CRITERION_FOR_THE_EQUATION['1'] * K['1'] * Math.exp(slope['1'] * (1))) /
        K['1'] - CRITERION_FOR_THE_EQUATION['1'] + CRITERION_FOR_THE_EQUATION['1'] * Math.exp(slope['1'] * (1))))

      return parseFloat(result.toFixed(1))
    }

    const currEquilibriumRoot1 = EQUILIBRIUM_CRITERION['1'] * (
      parseFloat(((CRITERION_FOR_THE_EQUATION['1'] * K['1'] * Math.exp(slope['1'] * 2)) /
        K['1'] - CRITERION_FOR_THE_EQUATION['1'] + CRITERION_FOR_THE_EQUATION['1'] * Math.exp(slope['1'] * 2)).toFixed(2))
      - parseFloat(((CRITERION_FOR_THE_EQUATION['1'] * K['1'] * Math.exp(slope['1'] * (1))) /
        K['1'] - CRITERION_FOR_THE_EQUATION['1'] + CRITERION_FOR_THE_EQUATION['1'] * Math.exp(slope['1'] * (1))).toFixed(2)))

    const Y10 = (1 + (parseFloat(((getNextEquilibriumZERO1() - currEquilibriumRoot1) / currEquilibriumRoot1).toFixed(3))) * currEquilibriumRoot1)

    //=(1+X10)*Y10+V11

    const sMNumbers = []
    let sMNcount = 0

    for (let year = 1995; year <= 2024; year++) {
      sMNcount++
      if (year === 1995) {
        sMNumbers[0] = {
          year: year,
          number: Y10
        }
      }
      sMNumbers.push({
        year: year,
        number: (1 + rNextNumber['1']) * sMNumbers[sMNcount - 1].number + fModuleNumber['1']
      })
    }

    const getCurrentSMNumber = () => {
      let current = 0
      sMNumbers.forEach((smn, i) => {
        if (smn.year === parseInt(YEAR)) {
          current = (smn.number)
        }
      })
      return current
    }

    let sModuleNumber = { 1: parseFloat(getCurrentSMNumber().toFixed(1)) }

    K['2'] = parseFloat(getKvalue(item?.name, CRITERION_AT_THE_BORDER['2']).toFixed(1))

    logarithm['2'] = parseFloat((Math.log(cell) - Math.log(K['2'] - cell)).toFixed(2))

    slope['2'] = parseFloat(calculateSlope(K['2']).toFixed(4))

    const postObserv2 = parseFloat(((CRITERION_FOR_THE_EQUATION['2'] * K['2'] * Math.exp(slope['2'] * aIndex)) /
      K['2'] - CRITERION_FOR_THE_EQUATION['2'] + CRITERION_FOR_THE_EQUATION['2'] * Math.exp(slope['2'] * aIndex) * randomFactor).toFixed(2))

    let equilibrium2 = {
      root: EQUILIBRIUM_CRITERION['2'] * (postObserv2 - parseFloat(((CRITERION_FOR_THE_EQUATION['2'] * K['2'] * Math.exp(slope['2'] * (aIndex - 1))) /
        K['2'] - CRITERION_FOR_THE_EQUATION['2'] + CRITERION_FOR_THE_EQUATION['2'] * Math.exp(slope['2'] * (aIndex - 1))).toFixed(2)))
    }

    equilibrium2['root'] = parseFloat(equilibrium2['root'].toFixed(7))

    // Increased, Balanced, Decreased мәндерін есептеу
    if (YEAR === `1995` || previousObservation === null) {
      equilibrium2.increased = parseFloat(Math.abs(1).toFixed(3))
      equilibrium2.balanced = parseFloat(Math.abs(0).toFixed(3))
      equilibrium2.decreased = 0
    } else {
      const change = (equilibrium2.root - previousObservation) / previousObservation;
      if (change > 0) {
        equilibrium2.increased = parseFloat(Math.abs(change).toFixed(3));
        equilibrium2.balanced = parseFloat((1 - equilibrium2.increased).toFixed(3));
        equilibrium2.decreased = 0;
      } else if (change < 0) {
        equilibrium2.increased = 0;
        equilibrium2.balanced = parseFloat((1 - Math.abs(change)).toFixed(3));
        equilibrium2.decreased = parseFloat(Math.abs(change).toFixed(3));
      } else {
        equilibrium2.increased = 0;
        equilibrium2.balanced = 1; // Мұнда change 0-ге тең болғандықтан, balanced мәні 1-ге тең.
        equilibrium2.decreased = 0;
      }
    }

    let forecasting2 = { pre: parseFloat(Math.pow(FORECASTING_CRITERION['2'], aIndex - 1).toFixed(5)) }

    forecasting2.root = parseFloat((forecasting2.pre *
      (equilibrium2.increased * observation2.root +
        equilibrium2.balanced * observation2.root +
        equilibrium2.decreased * observation2.root)).toFixed(8))

    fModuleNumber['2'] = parseFloat((observation2.root - equilibrium2.root).toFixed(1))

    const getNextEquilibrium2 = () => {

      const postObservation = parseFloat(((CRITERION_FOR_THE_EQUATION['2'] * K['2'] * Math.exp(slope['2'] * (aIndex + 1))) /
        K['2'] - CRITERION_FOR_THE_EQUATION['2'] + CRITERION_FOR_THE_EQUATION['2'] * Math.exp(slope['2'] * (aIndex + 1))).toFixed(2))

      const result = EQUILIBRIUM_CRITERION['2'] * (postObservation - ((CRITERION_FOR_THE_EQUATION['2'] * K['2'] * Math.exp(slope['2'] * (aIndex))) /
        K['2'] - CRITERION_FOR_THE_EQUATION['2'] + CRITERION_FOR_THE_EQUATION['2'] * Math.exp(slope['2'] * (aIndex))))

      return parseFloat(result.toFixed(1))
    }

    rModuleNumber['2'] = parseFloat(((getNextEquilibrium2() - equilibrium2.root) / equilibrium2.root).toFixed(3))

    rNextNumber['2'] = parseFloat((Math.random() * (0.399 - 0.100) + 0.100).toFixed(3))

    const getNextEquilibriumZERO2 = () => {
      const postObservation = parseFloat(((CRITERION_FOR_THE_EQUATION['2'] * K['2'] * Math.exp(slope['2'] * (2))) /
        K['2'] - CRITERION_FOR_THE_EQUATION['2'] + CRITERION_FOR_THE_EQUATION['2'] * Math.exp(slope['2'] * (2))).toFixed(2))

      const result = EQUILIBRIUM_CRITERION['2'] * (postObservation - ((CRITERION_FOR_THE_EQUATION['2'] * K['2'] * Math.exp(slope['2'] * (1))) /
        K['2'] - CRITERION_FOR_THE_EQUATION['2'] + CRITERION_FOR_THE_EQUATION['2'] * Math.exp(slope['2'] * (1))))

      return parseFloat(result.toFixed(1))
    }

    const currEquilibriumRoot2 = EQUILIBRIUM_CRITERION['2'] * (
      parseFloat(((CRITERION_FOR_THE_EQUATION['2'] * K['2'] * Math.exp(slope['2'] * 2)) /
        K['2'] - CRITERION_FOR_THE_EQUATION['2'] + CRITERION_FOR_THE_EQUATION['2'] * Math.exp(slope['2'] * 2)).toFixed(2))
      - parseFloat(((CRITERION_FOR_THE_EQUATION['2'] * K['2'] * Math.exp(slope['2'] * (1))) /
        K['2'] - CRITERION_FOR_THE_EQUATION['2'] + CRITERION_FOR_THE_EQUATION['2'] * Math.exp(slope['2'] * (1))).toFixed(2)))

    const AT10 = (1 + (parseFloat(((getNextEquilibriumZERO2() - currEquilibriumRoot2) / currEquilibriumRoot2).toFixed(3))) * currEquilibriumRoot2)

    //=(1+X10)*Y10+V11

    const sMNumbers2 = []
    let sMNcount2 = 0

    for (let year = 1995; year <= 2024; year++) {
      sMNcount2++
      if (year === 1995) {
        sMNumbers2[0] = {
          year: year,
          number: AT10
        }
      }
      sMNumbers2.push({
        year: year,
        number: (1 + rNextNumber['2']) * sMNumbers2[sMNcount2 - 1].number + fModuleNumber['2']
      })
    }

    const getCurrentSMNumber2 = () => {
      let current = 0
      sMNumbers2.forEach((smn, i) => {
        if (smn.year === parseInt(YEAR)) {
          current = (smn.number)
        }
      })
      return current
    }

    sModuleNumber['2'] = parseFloat(getCurrentSMNumber2().toFixed(1))

    K['3'] = parseFloat(getKvalue(item?.name, CRITERION_AT_THE_BORDER['3']).toFixed(1))

    logarithm['3'] = parseFloat((Math.log(cell) - Math.log(K['3'] - cell)).toFixed(2))

    slope['3'] = parseFloat(calculateSlope(K['3']).toFixed(4))

    const postObserv3 = parseFloat(((CRITERION_FOR_THE_EQUATION['3'] * K['3'] * Math.exp(slope['3'] * aIndex)) /
      K['3'] - CRITERION_FOR_THE_EQUATION['3'] + CRITERION_FOR_THE_EQUATION['3'] * Math.exp(slope['3'] * aIndex) * randomFactor).toFixed(2))

    let equilibrium3 = {
      root: EQUILIBRIUM_CRITERION['3'] * (postObserv3 - parseFloat(((CRITERION_FOR_THE_EQUATION['3'] * K['3'] * Math.exp(slope['3'] * (aIndex - 1))) /
        K['3'] - CRITERION_FOR_THE_EQUATION['3'] + CRITERION_FOR_THE_EQUATION['3'] * Math.exp(slope['3'] * (aIndex - 1))).toFixed(2)))
    }

    equilibrium3['root'] = parseFloat(equilibrium3['root'].toFixed(7))

    // Increased, Balanced, Decreased мәндерін есептеу
    if (YEAR === `1995` || previousObservation === null) {
      equilibrium3.increased = parseFloat(Math.abs(1).toFixed(3))
      equilibrium3.balanced = parseFloat(Math.abs(0).toFixed(3))
      equilibrium3.decreased = 0
    } else {
      const change = (equilibrium3.root - previousObservation) / previousObservation;
      if (change > 0) {
        equilibrium3.increased = parseFloat(Math.abs(change).toFixed(3));
        equilibrium3.balanced = parseFloat((1 - equilibrium3.increased).toFixed(3));
        equilibrium3.decreased = 0;
      } else if (change < 0) {
        equilibrium3.increased = 0;
        equilibrium3.balanced = parseFloat((1 - Math.abs(change)).toFixed(3));
        equilibrium3.decreased = parseFloat(Math.abs(change).toFixed(3));
      } else {
        equilibrium3.increased = 0;
        equilibrium3.balanced = 1; // Мұнда change 0-ге тең болғандықтан, balanced мәні 1-ге тең.
        equilibrium3.decreased = 0;
      }
    }

    let forecasting3 = { pre: parseFloat(Math.pow(FORECASTING_CRITERION['3'], aIndex - 1).toFixed(2)) }

    forecasting3.root = parseFloat((forecasting3.pre *
      (equilibrium3.increased * observation2.root +
        equilibrium3.balanced * observation2.root +
        equilibrium3.decreased * observation2.root)).toFixed(8))

    fModuleNumber['3'] = parseFloat((observation2.root - equilibrium3.root).toFixed(1))

    const getNextEquilibrium3 = () => {

      const postObservation = parseFloat(((CRITERION_FOR_THE_EQUATION['3'] * K['3'] * Math.exp(slope['3'] * (aIndex + 1))) /
        K['3'] - CRITERION_FOR_THE_EQUATION['3'] + CRITERION_FOR_THE_EQUATION['3'] * Math.exp(slope['3'] * (aIndex + 1))).toFixed(2))

      const result = EQUILIBRIUM_CRITERION['3'] * (postObservation - ((CRITERION_FOR_THE_EQUATION['3'] * K['3'] * Math.exp(slope['3'] * (aIndex))) /
        K['3'] - CRITERION_FOR_THE_EQUATION['3'] + CRITERION_FOR_THE_EQUATION['3'] * Math.exp(slope['3'] * (aIndex))))

      return parseFloat(result.toFixed(1))
    }

    rModuleNumber['3'] = parseFloat(((getNextEquilibrium3() - equilibrium3.root) / equilibrium3.root).toFixed(3))

    rNextNumber['3'] = parseFloat((Math.random() * (0.399 - 0.100) + 0.100).toFixed(3))

    const getNextEquilibriumZERO3 = () => {
      const postObservation = parseFloat(((CRITERION_FOR_THE_EQUATION['3'] * K['3'] * Math.exp(slope['3'] * (2))) /
        K['3'] - CRITERION_FOR_THE_EQUATION['3'] + CRITERION_FOR_THE_EQUATION['3'] * Math.exp(slope['3'] * (2))).toFixed(2))

      const result = EQUILIBRIUM_CRITERION['3'] * (postObservation - ((CRITERION_FOR_THE_EQUATION['3'] * K['3'] * Math.exp(slope['3'] * (1))) /
        K['3'] - CRITERION_FOR_THE_EQUATION['3'] + CRITERION_FOR_THE_EQUATION['3'] * Math.exp(slope['3'] * (1))))

      return parseFloat(result.toFixed(1))
    }

    const currEquilibriumRoot3 = EQUILIBRIUM_CRITERION['3'] * (
      parseFloat(((CRITERION_FOR_THE_EQUATION['3'] * K['3'] * Math.exp(slope['3'] * 2)) /
        K['3'] - CRITERION_FOR_THE_EQUATION['3'] + CRITERION_FOR_THE_EQUATION['3'] * Math.exp(slope['3'] * 2)).toFixed(2))
      - parseFloat(((CRITERION_FOR_THE_EQUATION['3'] * K['3'] * Math.exp(slope['3'] * (1))) /
        K['3'] - CRITERION_FOR_THE_EQUATION['3'] + CRITERION_FOR_THE_EQUATION['3'] * Math.exp(slope['3'] * (1))).toFixed(2)))

    const BR10 = (1 + (parseFloat(((getNextEquilibriumZERO3() - currEquilibriumRoot3) / currEquilibriumRoot3).toFixed(3))) * currEquilibriumRoot3)

    //=(1+X10)*Y10+V11

    const sMNumbers3 = []
    let sMNcount3 = 0

    for (let year = 1995; year <= 2024; year++) {
      sMNcount3++
      if (year === 1995) {
        sMNumbers3[0] = {
          year: year,
          number: BR10
        }
      }
      sMNumbers3.push({
        year: year,
        number: (1 + rNextNumber['3']) * sMNumbers3[sMNcount3 - 1].number + fModuleNumber['3']
      })
    }

    const getCurrentSMNumber3 = () => {
      let current = 0
      sMNumbers3.forEach((smn, i) => {
        if (smn.year === parseInt(YEAR)) {
          current = (smn.number)
        }
      })
      return current
    }

    sModuleNumber['3'] = parseFloat(getCurrentSMNumber3().toFixed(1))


    return {
      output: parseFloat(adjustedOutput.toFixed(8)),
      currentPopulation: parseFloat(currentPopulation.toFixed(2)),
      observation: {
        1: observation1,
        2: observation2,
      },
      sum: getMaxWithSum(item?.name, YEAR),
      K,
      cell,
      logarithm,
      aIndex,
      slope,
      equilibrium: {
        1: equilibrium1,
        2: equilibrium2,
        3: equilibrium3,
      },
      forecasting: {
        1: forecasting1,
        2: forecasting2,
        3: forecasting3
      },
      fModuleNumber,
      rModuleNumber,
      rNextNumber,
      sModuleNumber
    };
  };

  const [chartData, setChartData] = React.useState([]);

  const addElement = (key, element) => {
    setChartData((prevData) => {
      const updatedData = { ...prevData };
      if (!updatedData[key]) {
        updatedData[key] = [];
      }
      if (updatedData[key].length >= 10) {
        updatedData[key].shift(); // удаляем первый элемент
      }
      updatedData[key].push(element); // добавляем новый элемент
      return updatedData;
    });
  };

  const updatedData = () => {
    const newHourlyData = memoizedData.map((item, index) => {
      const data = calculateData(item)
      addElement(item.name, { ...item, data })
      return {
        ...item,
        data,
        index
      }
    })
    setHourlyData(newHourlyData)
    setUpdatedIndices(newHourlyData.map((_, index) => index))

    setTimeout(() => {
      setUpdatedIndices([])
    }, 1000)
  }

  // React.useEffect(() => {

  //   updatedData()

  //   const interval = setInterval(updatedData, getTimeInterval(currentTime));

  //   return () => clearInterval(interval)
  // }, [memoizedData, YEAR, time]) 


  // React.useEffect(() => {
  //   updatedData();

  //   const intervalDuration = getTimeInterval(currentTime);
  //   const interval = setInterval(updatedData, intervalDuration);

  //   const timeout = setTimeout(() => {
  //     updatedData();
  //   }, 1000);

  //   return () => {
  //     clearInterval(interval);
  //     clearTimeout(timeout);
  //   };
  // }, [memoizedData, YEAR, time]);

React.useEffect(() => {
    const intervalDuration = getTimeInterval(currentTime);


    // Преобразуем большой интервал в серию меньших интервалов
    const interval$ = interval(intervalDuration).pipe(
      startWith(0),
      switchMap(() => {
        // В этом примере мы имитируем длительный интервал с помощью меньших интервалов
        return timer(0, intervalDuration).pipe(
          map(() => {
            updatedData();
          })
        );
      })
    );
    const timeoutId = setTimeout(() => {
      updatedData();
    }, 1000);
    const subscription = interval$.subscribe();

    return () => {
      subscription.unsubscribe();
      clearTimeout(timeoutId);
    };
  }, [currentTime, memoizedData, YEAR, time]);

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const secondsPerMinute = 60;
    const secondsPerHour = 3600;
    const secondsPerDay = 86400;
    const daysPerMonth = 30; // Среднее количество дней в месяце
    const daysPerYear = 365; // Среднее количество дней в году
  
    const totalDays = Math.floor(totalSeconds / secondsPerDay);
    const years = Math.floor(totalDays / daysPerYear);
    const remainingDaysAfterYears = totalDays % daysPerYear;
    const months = Math.floor(remainingDaysAfterYears / daysPerMonth);
    const days = remainingDaysAfterYears % daysPerMonth;
    const hours = Math.floor((totalSeconds % secondsPerDay) / secondsPerHour);
    const minutes = Math.floor((totalSeconds % secondsPerHour) / secondsPerMinute);
    const seconds = totalSeconds % secondsPerMinute;
    if (years === 0 && months === 0 && days === 0 && hours === 0 && minutes === 0 && seconds <= 1) {
      return (
        <span>
         
        </span>
      );
     } else if (years > 0 && months > 0 && days > 0 && hours > 0 && minutes > 0 && seconds > 0) {
      return '';
    } else {
      const formatUnit = (value, unit) => value > 0 ? `${value}${unit} ` : '';
      return `${formatUnit(years, ` ${t('1year').substring(1)} `)}${formatUnit(months, ` ${t('1month').substring(1)} `)}${formatUnit(days, ` ${t('1day').substring(1)} `)}${formatUnit(hours, ` ${t('1hour').substring(1)} `)}${formatUnit(minutes, ` ${t('1min').substring(1)} `)}${formatUnit(seconds, ` ${t('15sec').substring(2)} `)}`.trim();
    }
    // Для удобства чтения можно добавить условие для отображения единиц времени только если их значение больше 0
     };
  
  
    const [timeRemaining, setTimeRemaining] = React.useState(getTimeInterval(currentTime));
  
    React.useEffect(() => {
      // Обновляем время сразу при изменении интервала
      const interval = getTimeInterval(currentTime);
      setTimeRemaining(interval);
  
      // Функция для обновления обратного отсчета
      const updateCountdown = () => {
        setTimeRemaining(prevTime => {
          if (prevTime <= 0) {
            // Обновляем данные при окончании интервала
            return interval;
          }
          return prevTime - 1000; // Уменьшаем на 1 секунду
        });
      };
  
      const timerId = setInterval(updateCountdown, 1000);

      return () => clearInterval(timerId);
    }, [currentTime]);

    const handleRowClick = (item, index) => {
      setSelectedData({ item: JSON.stringify(item?.name), index: (index + 1), currentTime, currentYear });
      navigate(`/investing/products/${item?._id}/${currentYear}/${currentTime}`);
    };

  return (
    <>
      <Container>
        <br />
        <Stack direction="horizontal" gap={3}>
          <div className="p-2"><h1>{t('title')}</h1></div>
          <div className="p-1 ms-auto"><h5>{getTimeName(currentTime)} </h5></div>
          <div className="p-1">|</div>
          <div className="p-1">{formatTime(timeRemaining)} </div>
          <div className="p-1">|</div>
          <div className="p-1"><h2>{YEAR} {t('1year').substring(1)}</h2></div>
        </Stack>

        <br />
        <Row>
          <Col className="col-12">
            {/* Ваши компоненты и логика */}
          </Col>
          <Col>
          {!selectedData ? (
          <Table bordered hover className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>{t('name')}</th>
                <th>{t('last')}</th>
                <th>{t('prev')}</th>
                <th>{t('max')}</th>
                <th>{t('min')}</th>
                <th>{t('percent')}</th>
                <th>{t('chart')}</th>
              </tr>
            </thead>
            <tbody>
              {hourlyData?.map((item, index) => (
                <TableRow
                  key={item.index}
                  index={index}
                  item={item}
                  onRowClick={() => handleRowClick(item, index)}
                  chartData={chartData}
                  mark={updatedIndices.includes(item.index) ? 'mark' : 'unmark'}
                  currentTime={currentTime || 'live'}
                  currentLanguage={currentLanguage} 
                />
              ))}
            </tbody>
          </Table>
        ) : (
          <One
          item={selectedData?.item}
          index={selectedData?.index}
          currentTime={selectedData?.currentTime}
          currentYear={selectedData?.currentYear}
          />
        )}
          </Col>
          {/* <Col>
            <iframe
              src="https://sslecal2.investing.com?columns=exc_flags,exc_currency,exc_importance,exc_actual,exc_forecast,exc_previous&features=datepicker,timezone&countries=25,32,6,37,72,22,17,39,14,10,35,43,56,36,110,11,26,12,4,5&calType=day&timeZone=25&lang=1"
              width="500" height="500"
              allowtransparency="true"
              style={{ margin: '0', border: 'none' }}
            ></iframe>
          </Col> */}
        </Row>
      </Container>
    </>
  );
};

export default Main;
