// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

export const apiKey = '8dd0d0ce432b75b532e9fb563fa8fded';

/******************************************* Endpoints *************************************************/
// export const main = 'http://192.168.1.185/api'
// export const main = 'http://localhost:8000'
export const main = 'https://api.guglielmofelici.com/niccolgur'

/* Niccolgur */
export const queue = main + '/queue';
export const users = main + '/users';
// TODO restanti
export const seasons = main + '/seasons';
// export const niccolgurs = 'https://guglielmofelici.github.io/niccolgur/data/niccolgurs.json';
export const images = main + '/images';
export const ranks = '../assets/images/ranks';
export const badges = '../assets/images/badges';
/* TMDB */
export const config = 'https://api.themoviedb.org/3/configuration';
export const movie = 'https://api.themoviedb.org/3/movie';
export const movieTMDBPage = 'https://www.themoviedb.org/movie';
