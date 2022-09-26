import { Observable, Subject } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';

console.clear();
const o1 = new Observable<number>((observer) => {
  let counter = 0;
  const eventClickListener = () => {
    counter++;
    console.warn('Esemély emittálás');
    observer.next(counter);
  };

  document
    .querySelector('#event-square')
    .addEventListener('click', eventClickListener);

  const errorClickListener = () => {
    console.warn('Error emittálás');
    observer.error('Hiba történt');
  };
  document
    .querySelector('#error')
    .addEventListener('click', errorClickListener);

  const completeClickListener = () => {
    console.warn('Complete emittálás');
    observer.complete();
  };
  document
    .querySelector('#complete')
    .addEventListener('click', completeClickListener);

  return () => {
    document
      .querySelector('#event-square')
      .removeEventListener('click', eventClickListener);
    document
      .querySelector('#error')
      .removeEventListener('click', errorClickListener);
    document
      .querySelector('#complete')
      .removeEventListener('click', completeClickListener);
  };
}).pipe(
  tap((e) => console.log('Tap into observable: ', e)),
  map((e) => e + 1)
);

const s = new Subject<number>();
o1.subscribe(s);

const subscription = s.pipe(filter((e) => e % 2 === 0)).subscribe(
  (res) => {
    console.warn('Observable emit', res);
    if (res === 5) {
      subscription.unsubscribe();
    }
  },
  (err) => console.warn('Observable error123', err),
  () => console.warn('Observable completed')
);

const subscription2 = s.subscribe(
  (res) => {
    console.warn('Observable emit', res);
    if (res === 5) {
      subscription.unsubscribe();
    }
  },
  (err) => console.warn('Observable error123', err),
  () => console.warn('Observable completed')
);
