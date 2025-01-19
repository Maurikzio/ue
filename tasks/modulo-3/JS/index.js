// 1
const Weather = {
  minTemperature: 15,
  maxTemperature: 25,
  type: "soleado",
  windSpeed: 10,
};

// 2
Weather['averageTemperatureOfTheDay'] = function () {
  return (this.minTemperature + this.maxTemperature) / 2;
};

console.log(`La temperatura media del dia es: ${Weather.averageTemperatureOfTheDay()}`);

// 3
const weekData = [
  {
    minTemperature: 14,
    maxTemperature: 24,
    type: "soleado",
    windSpeed: 10,
  },
  {
    minTemperature: 20,
    maxTemperature: 24,
    type: "soleado",
    windSpeed: 18,
  },
  {
    minTemperature: 16,
    maxTemperature: 27,
    type: "soleado",
    windSpeed: 12,
  },
  {
    minTemperature: 13,
    maxTemperature: 22,
    type: "parcialmente nublado",
    windSpeed: 20,
  },
  {
    minTemperature: 5,
    maxTemperature: 15,
    type: "nieve",
    windSpeed: 25,
  },
  {
    minTemperature: 17,
    maxTemperature: 28,
    type: "soleado",
    windSpeed: 5,
  },
  {
    minTemperature: 8,
    maxTemperature: 10,
    type: "nieve",
    windSpeed: 15,
  }
];

function calculateAverageTemperatureOfTheWeek(weekTemperatureData) {
  if (!Array.isArray(weekTemperatureData) || weekTemperatureData.length === 0) {
    return {};
  }

  const averageTemperatures = weekTemperatureData.reduce((acc, curr) => {
    const { minTemperature, maxTemperature } = curr;
    acc.totalOfMinTemperature += minTemperature;
    acc.totalOfMaxTemperature += maxTemperature;
    return acc;
  }, { totalOfMinTemperature: 0, totalOfMaxTemperature: 0 });

  const { totalOfMinTemperature, totalOfMaxTemperature } = averageTemperatures;

  return {
    averageMinTemperature: (totalOfMinTemperature / weekTemperatureData.length).toFixed(2),
    averageMaxTemperature: (totalOfMaxTemperature / weekTemperatureData.length).toFixed(2),
  };
}

const { averageMinTemperature, averageMaxTemperature } = calculateAverageTemperatureOfTheWeek(weekData);

console.log(`La media de las temperaturas minimas es: ${averageMinTemperature}`);
console.log(`La media de las temperaturas maximas es: ${averageMaxTemperature}`);