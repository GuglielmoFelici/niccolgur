import {Component, Input, OnInit} from '@angular/core';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {Context} from 'chartjs-plugin-datalabels/types/context';
import {Season, User} from '../../ts/domain';
import {totalMastered, totalPresences} from '../../ts/util';

@Component({
    selector: 'app-user-stats',
    templateUrl: './user-stats.component.html',
    styleUrls: ['./user-stats.component.css']
})
export class UserStatsComponent implements OnInit {

    @Input()
    user: User;
    @Input()
    seasons: Season[];
    @Input()
    users: User[];

    loading = true;

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
    barChartColors = [];

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

    constructor() {
    }

    ngOnInit() {
        this.initUserStatsData(this.seasons);
        this.initUserRank(this.user, this.users, this.seasons);
        this.initBarGraphData(this.seasons, this.users);
        this.initBarGraphLabels(this.users);
        this.initBarGraphColors(this.users);
        this.loading = false;
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
