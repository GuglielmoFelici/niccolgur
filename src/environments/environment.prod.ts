export const environment = {
  production: true
};

export const apiKey = '8dd0d0ce432b75b532e9fb563fa8fded';

/******************************************* Endpoints *************************************************/
export const main = 'https://api.guglielmofelici.com/niccolgur'

/* Niccolgur */
export const queue = main + '/queue';
export const users = main + '/users';
export const niccolgurs = main + '/niccolgurs';
// TODO restanti
export const seasons = main + '/seasons';
/* Assets  */
export const assetsImages = "assets/images"
export const ranks = assetsImages + '/ranks';
export const badges = assetsImages + '/badges';
export const profile_pics = assetsImages + '/profile_pics';
/* TMDB */
export const config = 'https://api.themoviedb.org/3/configuration';
export const movie = 'https://api.themoviedb.org/3/movie';
export const movieTMDBPage = 'https://www.themoviedb.org/movie';
