import './common.css';

class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = selector;
    this.targetDate = targetDate;
  }

  setTimer() {
    const refs = {
      daysEl: document.querySelector(
        `div${this.selector} span[data-value="days"]`,
      ),
      hoursEl: document.querySelector(
        `div${this.selector} span[data-value="hours"]`,
      ),
      minsEl: document.querySelector(
        `div${this.selector} span[data-value="mins"]`,
      ),
      secsEl: document.querySelector(
        `div${this.selector} span[data-value="secs"]`,
      ),
    };

    setInterval(() => {
      let currentDate = new Date();
      let time = this.targetDate - currentDate;
      let timeComponents = getTimeComponents(time);

      refs.daysEl.textContent = pad(timeComponents.days);
      refs.hoursEl.textContent = pad(timeComponents.hours);
      refs.minsEl.textContent = pad(timeComponents.mins);
      refs.secsEl.textContent = pad(timeComponents.secs);
    }, 1000);
  }
}

const timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Jan 1, 2021'),
});

timer.setTimer();

function getTimeComponents(time) {
  /*
   * Оставшиеся дни: делим значение UTC на 1000 * 60 * 60 * 24, количество
   * миллисекунд в одном дне (миллисекунды * секунды * минуты * часы)
   */
  const days = Math.floor(time / (1000 * 60 * 60 * 24));

  /*
   * Оставшиеся часы: получаем остаток от предыдущего расчета с помощью оператора
   * остатка % и делим его на количество миллисекунд в одном часе
   * (1000 * 60 * 60 = миллисекунды * минуты * секунды)
   */
  const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  /*
   * Оставшиеся минуты: получаем оставшиеся минуты и делим их на количество
   * миллисекунд в одной минуте (1000 * 60 = миллисекунды * секунды)
   */
  const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));

  /*
   * Оставшиеся секунды: получаем оставшиеся секунды и делим их на количество
   * миллисекунд в одной секунде (1000)
   */
  const secs = Math.floor((time % (1000 * 60)) / 1000);

  return { days, hours, mins, secs };
}

function pad(value) {
  return String(value).padStart(2, '0');
}
