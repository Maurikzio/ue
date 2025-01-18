document.addEventListener("DOMContentLoaded", function () {

  // Gestionar contribuciones
  function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function removeCommas(str) {
    return str.replace(/,/g, '');
  }

  function showMessage(message) {
    const messageField = document.getElementById('contribution-message');
    messageField.textContent = message;
  }

  const contributeBtn = document.querySelector('.project-contribute button');

  function updateValues(contribution) {
    const progressBar = document.querySelector('progress');
    const collected = document.getElementById('collected');
    const total = document.getElementById('total');
    const funded = document.getElementById('funded');

    const currentCollected = parseInt(removeCommas(collected.textContent));
    const totalGoal = parseInt(removeCommas(total.textContent));

    let newCollected = currentCollected + contribution;
    const difference = totalGoal - newCollected;

    if (difference === 0) {
      showMessage("Hemos alcanzado exactamente la meta del proyecto. \n Gracias por tu contribución!");
      contributeBtn.disabled = true;
      clearInterval(clockInterval);
    } else if (difference < 0) {
      const excess = Math.abs(difference);
      const actualContribution = contribution - excess;
      newCollected = totalGoal;

      showMessage(`La meta del proyecto es: ${formatNumber(totalGoal)},
        Tu contribución de $${formatNumber(contribution)} excede la meta por $${formatNumber(excess)}.
        Aceptaremos solamente $${formatNumber(actualContribution)}.
        Gracias por tu contribución!
      `);
      contributeBtn.disabled = true;
      clearInterval(clockInterval);
    }

    const newPercentage = Math.round((newCollected / totalGoal) * 100);

    progressBar.value = newPercentage;
    collected.textContent = formatNumber(newCollected);
    funded.textContent = newPercentage;

    if (newPercentage >= 100) {
      contributeBtn.disabled = true;
      contributeBtn.textContent = "Meta alcanzada!"
    }
  }


  contributeBtn.addEventListener('click', function () {
    const input = document.querySelector('.project-contribute input');
    const contributeAmount = parseInt(input.value);

    if (!contributeAmount || contributeAmount <= 0) {
      alert('Por favor ingresa una cantidad valida');
      return;
    }

    updateValues(contributeAmount);

    input.value = '';
  })


  // Reloj de cuenta regresiva
  const timeElement = document.getElementById('time-remaining');
  function getTimeRemaining(endTime) {
    const total = Date.parse(endTime) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)));

    return { total, seconds, minutes, hours }
  }

  function initClock(daysRemaining) {
    const endTime = new Date(Date.now() + daysRemaining * 24 * 60 * 60 * 1000);

    function updateClock() {
      const rT = getTimeRemaining(endTime);

      if (rT.total <= 0) {
        clearInterval(timeInterval)
        return;
      }

      timeElement.textContent = `${rT.hours} horas
      ${rT.minutes} minutos
      ${rT.seconds} segundos
      `;

    }
    updateClock();
    const timeInterval = setInterval(updateClock, 1000);
    return timeInterval;
  }

  const clockInterval = initClock(2)
})