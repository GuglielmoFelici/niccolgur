import {Niccolgur, Season, TypeObject, User} from './domain';
import {ranks} from "../../environments/environment";
export const niccolgursCount = (seasons: Season[]) => seasons.reduce(
    (tot, current) => tot + current.length,
    0);

export const totalPresences = (id: string, seasons: Season[]) =>
    seasons.reduce(
        (presences: number, current: Niccolgur[]) =>
            presences +
            current.filter(nicc => nicc.members.includes(id)).length,
        0);

export const presencesPercentage = (id: string, seasons: Season[]) =>
    Math.round((totalPresences(id, seasons) * 100)
        / niccolgursCount(seasons));


export const totalMastered = (id: string, seasons: Season[]) =>
    seasons.reduce(
        (presences: number, current: Niccolgur[]) =>
            presences +
            current.filter(nicc => nicc.master === id).length,
        0);

export const masteredPercentage = (id: string, seasons: Season[]) =>
    Math.round((totalMastered(id, seasons) * 100)
        / niccolgursCount(seasons));

export const getUserSR = (id: string, seasons: Season[]) =>
    Math.round((presencesPercentage(id, seasons) + masteredPercentage(id, seasons)) / 2);

export const getUserRank = (id: string, users: User[], seasons: Season[], userSR?: number) => {
    const userScore = userSR || getUserSR(id, seasons);
    return users
        .map(user => getUserSR(user.id, seasons))
        .filter(score => score > userScore)
        .length + 1;
};

const tiers = [
    new TypeObject('bronze', 'bronze.png', 30),
    new TypeObject('silver', 'silver.png', 35),
    new TypeObject('gold', 'gold.png', 40),
    new TypeObject('platinum', 'platinum.png', 45),
    new TypeObject('diamond', 'diamond.png', 50),
    new TypeObject('master', 'master.png', 55),
    new TypeObject('grandmaster', 'grandmaster.png', Infinity),
];

export const getSRImage = (sr: number) =>
    ranks + tiers.find(tier => sr < tier.data).desc;
