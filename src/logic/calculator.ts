/**
 * @class Calculator
 */

class Calculator {
   private chosenTimeWake: Array<number>;
   private chosenTimeSleep: Array<number>;

   private selectsWake: NodeListOf<HTMLSelectElement>;
   private selectsSleep: NodeListOf<HTMLSelectElement>;

   private sendWake: HTMLInputElement;
   private sendSleep: HTMLInputElement;

   private resetWake: HTMLInputElement;
   private resetSleep: HTMLInputElement;

   private switch: HTMLInputElement;

   private cycles;

   private bestTimes: Array<any>;

   private activate: boolean;

   constructor() {
      this.chosenTimeWake = [];
      this.chosenTimeSleep = [];

      this.selectsWake = document.querySelectorAll('#wake > select');
      this.selectsSleep = document.querySelectorAll('#sleep > select');
      this.switch = document.querySelector('input[type="checkbox"]');

      this.sendWake = document.querySelector('#sendWake');
      this.sendSleep = document.querySelector('#sendSleep');

      this.resetWake = document.querySelector('#resetWake');
      this.resetSleep = document.querySelector('#resetSleep');

      this.activate = false;

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

   private init() {
      this.selectsWake[0].value = this.selectsSleep[0].value = 'hours';
      this.selectsWake[1].value = this.selectsSleep[1].value = 'minutes';
   }

   private checkValue(
      selects: NodeListOf<HTMLSelectElement>,
      arrayToFill: Array<number>
   ): void {
      selects.forEach((element) => {
         if (element.value === ('hours' || 'minutes')) {
            alert('choose a time');
         } else {
            arrayToFill.push(parseInt(element.value));
         }
      });
   }

   private retrieveEachValue(): void {
      this.chosenTimeWake = [];
      this.chosenTimeSleep = [];

      if (!this.activate) {
         this.checkValue(this.selectsWake, this.chosenTimeWake);
      } else {
         this.checkValue(this.selectsSleep, this.chosenTimeSleep);
      }
   }

   private insertAfter(newNode: HTMLElement, referenceNode: Element) {
      referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
   }

   private times(h: number, m: number) {
      const wake = moment();
      const sleep = moment();

      const hoursWake = this.chosenTimeWake[0];
      const minutesWake = this.chosenTimeWake[1];

      const hoursSleep = this.chosenTimeSleep[0];
      const minutesSleep = this.chosenTimeSleep[1];

      const timesWake = (wake.hours(hoursWake), wake.minute(minutesWake));
      const timesSleep = (sleep.hours(hoursSleep), sleep.minute(minutesSleep));

      /** time to get to sleep */
      if (this.chosenTimeWake.length !== 0) {
         let timeWake = (timesWake.subtract(h, 'hour'),
         timesWake.subtract(m, 'minute'));
         timeWake = timeWake.format('HH:mm');
         this.bestTimes.push(timeWake);
      }

      /** time sto wake up */
      if (this.chosenTimeSleep.length !== 0) {
         let timeSleep = (timesSleep.add(h, 'hour'),
         timesSleep.subtract(m, 'minute'));
         timeSleep = timeSleep.format('HH:mm');
         this.bestTimes.push(timeSleep);
      }
   }

   private sendTimes(button: Element, ...cycles: Array<number>): void {
      button.addEventListener('click', () => {
         this.retrieveEachValue();

         this.bestTimes = [];

         this.times(cycles[0], cycles[1]);
         this.times(cycles[2], cycles[3]);
         this.times(cycles[4], cycles[5]);
         this.times(cycles[6], cycles[7]);

         const form: Element = document.querySelector('.row');
         const ul: HTMLElement = document.createElement('ul');

         ul.classList.add('bestTimes');

         for (let i = 0; i < this.bestTimes.length; i++) {
            const li = document.createElement('li');
            li.innerHTML = this.bestTimes[i];
            ul.append(li);
         }

         this.insertAfter(ul, form);
      });
   }

   private resetTimes(...button: Array<Element>): void {
      button.forEach((b) => {
         b.addEventListener('click', () => this.init());
      });
   }

   private switchActive() {
      this.switch.addEventListener('change', () => {
         if (this.switch.checked) {
            this.selectsSleep.forEach((element) => (element.disabled = false));
            this.sendSleep.disabled = this.resetSleep.disabled = false;

            this.selectsWake.forEach(
               (element) => ((element.disabled = true), this.init())
            );
            this.sendWake.disabled = this.resetWake.disabled = true;

            this.activate = true;

            document.querySelector('ul').remove();
         } else {
            this.selectsSleep.forEach(
               (element) => ((element.disabled = true), this.init())
            ),
            (this.sendSleep.disabled = this.resetSleep.disabled = true);

            this.selectsWake.forEach((element) => (element.disabled = false));
            this.sendWake.disabled = this.resetWake.disabled = false;

            this.activate = false;

            document.querySelector('ul').remove();
         }
      });
   }

   public calc(): void {
      this.bestTimes = [];

      this.switchActive();

      this.resetTimes(this.resetSleep, this.resetWake);

      this.sendTimes(
         this.sendWake,
         this.cycles.best.hours,
         this.cycles.best.minutes,
         this.cycles.better.hours,
         this.cycles.better.minutes,
         this.cycles.middle.hours,
         this.cycles.middle.minutes,
         this.cycles.bad.hours,
         this.cycles.bad.minutes
      );

      this.sendTimes(
         this.sendSleep,
         this.cycles.best.hours,
         this.cycles.best.minutes,
         this.cycles.better.hours,
         this.cycles.better.minutes,
         this.cycles.middle.hours,
         this.cycles.middle.minutes,
         this.cycles.bad.hours,
         this.cycles.bad.minutes
      );
   }
}

const test = new Calculator();
test.calc();
