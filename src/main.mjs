// import { map, filter } from 'rxjs/operators';
// import { range } from 'rxjs';

import range from 'rxjs';
import from from 'rxjs';
import of from 'rxjs';
// import * as rxjs from 'rxjs';
import map from 'rxjs/operators';
import concatMap from 'rxjs/operators';
import mergeMap from 'rxjs/operators';
import filter from 'rxjs/operators';

// const { from } = require('rxjs');
// const { map, filter } = require('rxjs/operators');

// import { Lib } from './lib.mjs';


(function main() {
    console.log('start');
    let i = 0;
    from.from(['a', 'b', 'c'])
        .pipe(mergeMap.mergeMap((val) => {
            i++;
            return of.of({ val, i });
        }))
        .subscribe(
            (val) => {
                console.log(val);
            }
        );


    // range.range(1, 10).pipe(
    //     filter.filter(n => n % 2 !== 0),
    //     map.map(n => n * n)).subscribe(v => console.log(v));

    console.log('end');
})();

