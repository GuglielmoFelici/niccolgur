import {Niccolgur, Season} from './domain';

export const totalPresences = (id: string, seasons: Season[]) =>
    seasons.reduce(
        (presences: number, current: Niccolgur[]) =>
            presences +
            current.filter(nicc => nicc.members.includes(id)).length,
        0);

export const totalMastered = (id: string, seasons: Season[]) =>
    seasons.reduce(
        (presences: number, current: Niccolgur[]) =>
            presences +
            current.filter(nicc => nicc.master === id)  .length,
        0);
