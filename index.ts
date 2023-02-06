import './style.css';

import { AsyncSubject, BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
// subject与observable
//region
//多播与单播
const observable = new Observable(observer => {
  observer.next(Math.random());
})

observable.subscribe(observer => {
  // console.log('订阅者 A '+observer);
})

observable.subscribe(observer => {
  // console.log('订阅者 B '+observer);
});

const subject$ = new Subject();

subject$.subscribe(subject => {
  // console.log('订阅者A' + subject);
});

subject$.subscribe(subject => {
  console.log('订阅者B' + subject);
});

// subject$.next(Math.random());
// 转换
observable.subscribe(subject$);

//endregion

//BehaviorSubject
//region
const behaviorSubject$ = new BehaviorSubject(0);
behaviorSubject$.next(1);

behaviorSubject$.subscribe(behaviorSubject => {
  // console.log('订阅者A ' + behaviorSubject);
})

behaviorSubject$.next(2);

behaviorSubject$.subscribe(behaviorSubject => {
  // console.log('订阅者B ' + behaviorSubject);
})

behaviorSubject$.next(3);


// console.log(behaviorSubject$.value);
//endregion

//ReplaySubject
//region
const replaySubject$ = new ReplaySubject(3);
replaySubject$.next(1);
replaySubject$.next(2);
replaySubject$.next(3);
replaySubject$.next(4);
replaySubject$.subscribe(replaySubject => {
  // console.log('订阅者A', replaySubject);
});

replaySubject$.next(5);
replaySubject$.subscribe(replaySubject => {
  // console.log('订阅者B', replaySubject);
});
replaySubject$.next(6);

const replay2$ = new ReplaySubject(100, 500);

replay2$.next('4.1');
replay2$.next('5.1');
replay2$.next('6.1');
replay2$.next('7.1');

setTimeout(()=> {
  replay2$.next('8.1');
},401)

replay2$.subscribe(replay => {
  // console.log('订阅者A ', replay);
})

setTimeout(()=> {
  replay2$.subscribe(replay => {
    // console.log('订阅者B ', replay);
  });
}, 900)
//endregion

//AsyncSubject
//region
const asyncSubject$ = new AsyncSubject();
asyncSubject$.next(1);
asyncSubject$.next(2);
asyncSubject$.next(3);
asyncSubject$.next(4);
asyncSubject$.next(5);
asyncSubject$.next(6);
asyncSubject$.next(9);
asyncSubject$.complete();

asyncSubject$.subscribe(asyncSubject => {
  console.log('订阅者A', asyncSubject);
})

asyncSubject$.next(8);
asyncSubject$.complete();

//endregion