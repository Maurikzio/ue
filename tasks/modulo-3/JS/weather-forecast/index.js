document.addEventListener('DOMContentLoaded', function () {
  const typesOfWeather = {
    0: {
      name: "Parcialmente nublado",
      img: "./images/partly_cloudy.png"
    },
    1: {
      name: "Chaparrones dispersos",
      img: "./images/rain_s_cloudy.png"
    },
    2: {
      name: "Lluvia",
      img: "./images/rain.png"
    },
    3: {
      name: "Lluvias",
      img: "./images/rain_light.png"
    }
  };

  const daysOfWeek = {
    0: {
      name: "Domingo",
      shortName: "dom"
    },
    1: {
      name: "Lunes",
      shortName: "lun"
    },
    2: {
      name: "Martes",
      shortName: "mar"
    },
    3: {
      name: "Miercoles",
      shortName: "mier"
    },
    4: {
      name: "Jueves",
      shortName: "jue"
    },
    5: {
      name: "Viernes",
      shortName: "vie"
    },
    6: {
      name: "Sabado",
      shortName: "sab"
    },
  };

  const weekWeatherData = [
    {
      dow: 6,
      type: 0,
      maxTemperature: 26,
      minTemperature: 17,
      probabilityOfPrecipitation: 75,
      humidity: 89,
      windSpeed: 3,
      temperaturesDuringDay: [
        {
          temperature: 19,
          time: "10 pm",
        },
        {
          temperature: 18,
          time: "1 am",
        },
        {
          temperature: 18,
          time: "4 am",
        },
        {
          temperature: 17,
          time: "7 am",
        },
        {
          temperature: 22,
          time: "10 am",
        },
        {
          temperature: 26,
          time: "1 pm",
        },
        {
          temperature: 26,
          time: "4 pm",
        },
        {
          temperature: 23,
          time: "7 pm",
        }
      ],
      id: "001",
    },
    {
      dow: 0,
      type: 1,
      maxTemperature: 27,
      minTemperature: 19,
      probabilityOfPrecipitation: 35,
      humidity: 63,
      windSpeed: 13,
      temperaturesDuringDay: [
        {
          temperature: 18,
          time: "10 pm",
        },
        {
          temperature: 18,
          time: "1 am",
        },
        {
          temperature: 17,
          time: "4 am",
        },
        {
          temperature: 22,
          time: "7 am",
        },
        {
          temperature: 26,
          time: "10 am",
        },
        {
          temperature: 26,
          time: "1 pm",
        },
        {
          temperature: 23,
          time: "4 pm",
        },
        {
          temperature: 19,
          time: "7 pm",
        }
      ],
      id: "002",
    },
    {
      dow: 1,
      type: 0,
      maxTemperature: 26,
      minTemperature: 18,
      probabilityOfPrecipitation: 35,
      humidity: 69,
      windSpeed: 11,
      temperaturesDuringDay: [
        {
          temperature: 19,
          time: "10 pm",
        },
        {
          temperature: 19,
          time: "1 am",
        },
        {
          temperature: 19,
          time: "4 am",
        },
        {
          temperature: 23,
          time: "7 am",
        },
        {
          temperature: 26,
          time: "10 am",
        },
        {
          temperature: 25,
          time: "1 pm",
        },
        {
          temperature: 22,
          time: "4 pm",
        },
        {
          temperature: 20,
          time: "7 pm",
        }
      ],
      id: "003",
    },
    {
      dow: 2,
      type: 2,
      maxTemperature: 26,
      minTemperature: 18,
      probabilityOfPrecipitation: 45,
      humidity: 69,
      windSpeed: 13,
      temperaturesDuringDay: [
        {
          temperature: 19,
          time: "10 pm",
        },
        {
          temperature: 18,
          time: "1 am",
        },
        {
          temperature: 18,
          time: "4 am",
        },
        {
          temperature: 20,
          time: "7 am",
        },
        {
          temperature: 24,
          time: "10 am",
        },
        {
          temperature: 26,
          time: "1 pm",
        },
        {
          temperature: 22,
          time: "4 pm",
        },
        {
          temperature: 20,
          time: "7 pm",
        }
      ],
      id: "004",
    },
    {
      dow: 3,
      type: 0,
      maxTemperature: 27,
      minTemperature: 16,
      probabilityOfPrecipitation: 40,
      humidity: 61,
      windSpeed: 14,
      temperaturesDuringDay: [
        {
          temperature: 19,
          time: "10 pm",
        },
        {
          temperature: 18,
          time: "1 am",
        },
        {
          temperature: 18,
          time: "4 am",
        },
        {
          temperature: 19,
          time: "7 am",
        },
        {
          temperature: 26,
          time: "10 am",
        },
        {
          temperature: 26,
          time: "1 pm",
        },
        {
          temperature: 22,
          time: "4 pm",
        },
        {
          temperature: 20,
          time: "7 pm",
        }
      ],
      id: "005"
    },
    {
      dow: 4,
      type: 0,
      maxTemperature: 26,
      minTemperature: 16,
      probabilityOfPrecipitation: 25,
      humidity: 62,
      windSpeed: 11,
      temperaturesDuringDay: [
        {
          temperature: 18,
          time: "10 pm",
        },
        {
          temperature: 17,
          time: "1 am",
        },
        {
          temperature: 16,
          time: "4 am",
        },
        {
          temperature: 21,
          time: "7 am",
        },
        {
          temperature: 26,
          time: "10 am",
        },
        {
          temperature: 26,
          time: "1 pm",
        },
        {
          temperature: 22,
          time: "4 pm",
        },
        {
          temperature: 19,
          time: "7 pm",
        }
      ],
      id: "006"
    },
    {
      dow: 5,
      type: 3,
      maxTemperature: 23,
      minTemperature: 17,
      probabilityOfPrecipitation: 20,
      humidity: 73,
      windSpeed: 6,
      temperaturesDuringDay: [
        {
          temperature: 18,
          time: "10 pm",
        },
        {
          temperature: 17,
          time: "1 am",
        },
        {
          temperature: 16,
          time: "4 am",
        },
        {
          temperature: 19,
          time: "7 am",
        },
        {
          temperature: 23,
          time: "10 am",
        },
        {
          temperature: 23,
          time: "1 pm",
        },
        {
          temperature: 21,
          time: "4 pm",
        },
        {
          temperature: 19,
          time: "7 pm",
        }
      ],
      id: "007"
    }
  ];

  function createDayMainInfo(dayId) {
    const dayInfo = weekWeatherData.find(itemData => itemData.id === dayId);

    const dayInfoContainer = document.getElementById("dayInfo");
    const dayInfoContent = document.createElement('div');
    dayInfoContent.classList.add('day-info-content');
    const dayStats = document.createElement('div');
    dayStats.classList.add('day-stats');

    const temperatureContainer = document.createElement('div');
    const dayWeatherImg = document.createElement('img');
    dayWeatherImg.setAttribute("src", typesOfWeather[dayInfo.type].img);
    const temperatureParagraph = document.createElement('p');
    temperatureParagraph.innerHTML = `${dayInfo.maxTemperature} <sup>°C<sup>`;
    temperatureContainer.appendChild(dayWeatherImg);
    temperatureContainer.appendChild(temperatureParagraph);

    const precipitationsParagraph = document.createElement('p');
    precipitationsParagraph.textContent = `Prob. de precipitaciones: ${dayInfo.probabilityOfPrecipitation}%`;
    const humidityParagraph = document.createElement('p');
    humidityParagraph.textContent = `Humedad: ${dayInfo.humidity}%`;
    const windParagraph = document.createElement('p');
    windParagraph.textContent = `Viento: a ${dayInfo.windSpeed} km/h`;

    dayStats.appendChild(temperatureContainer);
    dayStats.appendChild(precipitationsParagraph);
    dayStats.appendChild(humidityParagraph);
    dayStats.appendChild(windParagraph);

    const dayData = document.createElement('div');
    dayData.classList.add('day-data');
    const titleParagraph = document.createElement('p');
    titleParagraph.textContent = "Clima";
    const dayParagraph = document.createElement('p');
    dayParagraph.textContent = daysOfWeek[dayInfo.dow].name;
    const typeOfWeatherParagraph = document.createElement('p');
    typeOfWeatherParagraph.textContent = typesOfWeather[dayInfo.type].name;
    dayData.appendChild(titleParagraph);
    dayData.appendChild(dayParagraph);
    dayData.appendChild(typeOfWeatherParagraph);

    dayInfoContent.appendChild(dayStats);
    dayInfoContent.appendChild(dayData);

    dayInfoContainer.replaceChildren(dayInfoContent);
  }

  function createTemperatureChart(dayId) {
    const dayInfo = weekWeatherData.find(itemData => itemData.id === dayId);
    const temperatureChart = document.getElementById("temperatureChart");
    const chartContent = document.createElement('div');
    chartContent.classList.add("chart-content");

    const { temperaturesDuringDay } = dayInfo;

    const visiblePoints = [];
    const chartPoints = ["-10, 100", `-10, ${100 - (temperaturesDuringDay[0].temperature * 3)}`];

    for (let i = 0; i < temperaturesDuringDay.length; i++) {
      const x = 75 * i;
      const y = 100 - (temperaturesDuringDay[i].temperature * 3);
      chartPoints.push(`${x},${y}`);
      visiblePoints.push({ x, y, temperature: temperaturesDuringDay[i].temperature });
    }
    chartPoints.push(`${temperaturesDuringDay.length * 75},100`);

    const circles = visiblePoints.map(point =>
      `<circle
          cx="${point.x}"
          cy="${point.y}"
          r="3"
          fill="rgb(255, 204, 0)"
      />`
    ).join('');

    const temperatures = visiblePoints.map(point =>
      `<text
          x="${point.x}"
          y="${point.y - 10}"
          text-anchor="middle"
          fill="rgb(255, 204, 0)"
          font-size="12px"
      >${point.temperature}°</text>`
    ).join("");

    chartContent.innerHTML = `
      <svg width="540" height="99" overflow="hidden" viewBox="-7 0 540 99">
        <polygon
          points="${chartPoints}"
          fill="rgba(255, 204, 0, 0.2)"
          stroke="rgb(255, 204, 0)"
          stroke-width="2"
        />
        ${circles}
        ${temperatures}
      </svg>
    `;

    const times = document.createElement('div');
    temperaturesDuringDay.forEach((item) => {
      const timeSpan = document.createElement('span');
      timeSpan.textContent = item.time;
      times.appendChild(timeSpan);
    });

    chartContent.appendChild(times);
    temperatureChart.replaceChildren(chartContent);
  }

  function createForecastDaysContent() {
    const forecastDays = document.getElementById("forecastDays");
    weekWeatherData.forEach(function (dataItem) {
      const dayWrapper = document.createElement("div");
      dayWrapper.classList.add("day-wrapper");

      dayWrapper.addEventListener('click', function () {
        const previousSelected = document.querySelector('.selected');
        if (previousSelected) {
          previousSelected.classList.remove('selected');
        }
        dayWrapper.classList.add("selected");
        createDayMainInfo(dataItem.id);
        createTemperatureChart(dataItem.id);
      });


      const dayName = document.createElement('p');
      dayName.textContent = daysOfWeek[dataItem.dow].shortName;

      const dayWeatherImg = document.createElement('img');
      dayWeatherImg.setAttribute("src", typesOfWeather[dataItem.type].img);

      const dayTemperatures = document.createElement("div");
      dayTemperatures.classList.add('day-temperatures');
      const maxTemperature = document.createElement("span");
      maxTemperature.classList.add("max-temperature");
      maxTemperature.textContent = `${dataItem.maxTemperature}°.`;
      const minTemperature = document.createElement("span");
      minTemperature.classList.add("max-temperature");
      minTemperature.textContent = `${dataItem.minTemperature}°.`;
      dayTemperatures.appendChild(maxTemperature);
      dayTemperatures.appendChild(minTemperature);


      dayWrapper.appendChild(dayName);
      dayWrapper.appendChild(dayWeatherImg);
      dayWrapper.appendChild(dayTemperatures);
      forecastDays.appendChild(dayWrapper);
    });
  }

  createDayMainInfo("001");
  createTemperatureChart("001");
  createForecastDaysContent();
});

