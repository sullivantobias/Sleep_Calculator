/**
 * @class Calculator
 */

class Calculator {
  private chosenTime: Array<number>;
  private selects: NodeListOf<HTMLSelectElement>;
  private send: HTMLElement;

  private cycles;

  private bestTimes: Array<any>;

  constructor() {
    this.chosenTime = [];
    this.selects = document.querySelectorAll('select');
    this.send = document.querySelector('button');

    this.cycles = {
      best: {
        hours: 9,
        minutes: 0,
      },
      better: {
        hours: 7,
        minutes: 30,
      },
      middle: {
        hours: 6,
        minutes: 0,
      },
      bad: {
        hours: 4,
        minutes: 30,
      },
    };
    this.bestTimes = [];
  }

  private retrieveEachValue(): void {
    this.chosenTime = [];
    this.selects.forEach((el) => this.chosenTime.push(parseInt(el.value)));
  }

  private insertAfter(newNode: HTMLElement, referenceNode: Element) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  }

  private times(h: number, m: number) {
    const hours = this.chosenTime[0];
    const minutes = this.chosenTime[1];

    const mm = moment();

    const times = (mm.hours(hours), mm.minute(minutes));

    let time = (times.subtract(h, 'hour'), times.subtract(m, 'minute'));
    time = time.format('HH:mm');
    this.bestTimes.push(time);
  }

  public calc(): void {
    this.send.addEventListener('click', () => {
      this.retrieveEachValue();

      this.bestTimes = [];

      this.times(this.cycles.best.hours, this.cycles.best.minutes);
      this.times(this.cycles.better.hours, this.cycles.better.minutes);
      this.times(this.cycles.middle.hours, this.cycles.middle.minutes);
      this.times(this.cycles.bad.hours, this.cycles.bad.minutes);

      console.log(this.bestTimes);

      const form = document.querySelector('.form');
      const ul = document.createElement('ul');

      for (let i = 0; i < this.bestTimes.length; i++) {
        const li = document.createElement('li');
        li.innerHTML = this.bestTimes[i];
        ul.append(li);
      }

      this.insertAfter(ul, form);
    });
  }
}

const test = new Calculator();
test.calc();
