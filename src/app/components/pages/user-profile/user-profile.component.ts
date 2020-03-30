import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NiccolgurManagerService} from '../../../services/niccolgur-manager.service';
import {Niccolgur, Season, User} from '../../../ts/domain';
import {images} from 'src/app/ts/env';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {Context} from 'chartjs-plugin-datalabels/types/context';
import {totalMastered, totalPresences} from '../../../ts/util';
import {findIndex} from 'rxjs/operators';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

    notFound = false;
    user: User;
    images = images;
    seasons: Season[];
    users: User[];
    chartLabels = ChartDataLabels;

    userStatsData: {
        present,
        absent,
        total,
        ratio,
    };
    userRank;

    barGraphData = [];
    barGraphLabels = [];

    horizontalChartOptions = {
        legend: undefined,
        scales: {
            xAxes: [{
                ticks: {
                    min: 0,
                    max: 100,
                    display: false,
                },
            }],
        },
        plugins: {
            datalabels: {
                color: 'white',
                formatter: (value: any, context: Context) => value + '%',
            }
        }
    };

    doughnutChartOptions = {
        plugins: {
            datalabels: {
                color: 'white'
            }
        }
    };

    barChartOptions = {
        legend: undefined,
        scales: {
            yAxes: [{
                ticks: {
                    min: 0,
                    display: false,
                },
                gridLines: {
                    display: false,
                }
            }],
        },
        plugins: {
            datalabels: {
                color: 'white',
            }
        }
    };

    barChartColors = [];

    constructor(private route: ActivatedRoute,
                private manager: NiccolgurManagerService) {
    }

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        if (!id) {
            this.notFound = true;
            return;
        }
        this.manager.getUser(id)
            .then(user => {
                this.user = user;
                this.notFound = !!user;
                return this.manager.getSeasons();
            })
            .then(seasons => {
                this.seasons = seasons;
                this.initUserStatsData(seasons);
                return this.manager.getUsers();
            })
            .then(users => {
                this.users = users;
                this.initUserRank(this.user, users, this.seasons);
                this.initBarGraphData(this.seasons, users);
                this.initBarGraphLabels(users);
                this.initBarGraphColors(users);
            });
    }

    initUserStatsData(seasons: Season[]) {
        const present = totalPresences(this.user.id, seasons);
        const total = this.seasons.reduce(
            (tot, current) => tot + current.length,
            0);
        this.userStatsData = {
            present,
            absent: total - present,
            total,
            ratio: Math.round((present * 100) / total),
        };
    }

    initUserRank(user: User, users: User[], seasons: Season[]) {
        const userScore = totalPresences(user.id, seasons);
        this.userRank = this.users.map(usr =>
            totalPresences(usr.id, seasons)
        ).filter(score => score > userScore).length + 1;
    }

    initBarGraphData(seasons: Season[], users: User[]) {
        this.barGraphData =
            users.map(user => {
                const presences = seasons.reduce(
                    (total, current) =>
                        total +
                        current.filter(nicc => nicc.master === user.id && nicc.members.includes(this.user.id)).length
                    , 0
                );
                return Math.round((presences * 100) / totalMastered(user.id, seasons));
            });
    }

    initBarGraphLabels(users: User[]) {
        this.barGraphLabels = users.map(user => user.nickname);
    }

    initBarGraphColors(users) {
        // RANDOM
        this.barChartColors = users.map(user => {
            const hex = '0123456789ABCDEF';
            let color = '#';
            for (let i = 1; i <= 6; i++) {
                color += hex[Math.floor(Math.random() * 16)];
            }
            return color;
        });

    }

    getPercentageColor(ratio) {
        if (ratio < 33) {
            return '#F75D59';
        } else if (ratio >= 33 && ratio < 66) {
            return '#FBB917';
        } else {
            return '#4AA02C';
        }
    }
}
