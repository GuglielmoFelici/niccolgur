import {Component, Input, OnInit} from '@angular/core';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {Context} from 'chartjs-plugin-datalabels/types/context';
import {Season, User} from '../../ts/domain';
import {
    getSRImage,
    getUserRank,
    getUserSR,
    masteredPercentage,
    niccolgursCount,
    totalMastered,
    totalPresences
} from '../../ts/stats';
import {BaseChartDirective} from 'ng2-charts';

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
        srImage,
        present,
        absent,
        total,
        ratio,
        mastered,
        masteredRatio,
    };
    userRank;
    userSR;

    IChart: {
        data?,
        labels?,
        colors?,
        options?,
    };

    barChart = {
        ...this.IChart,
        options: {
            legend: {
                display: false,
            },
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
        }
    };

    horizontalChart = {
        ...this.IChart,
        labels: [''],
        options: {
            legend: {
                display: false,
            },
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
        }
    };

    doughnutChart = {
        ...this.IChart,
        options: {
            plugins: {
                datalabels: {
                    color: 'white'
                }
            }
        }
    };

    constructor() {
        BaseChartDirective.unregisterPlugin(ChartDataLabels);
    }

    ngOnInit() {
        this.userSR = getUserSR(this.user.id, this.seasons);
        this.userRank = getUserRank(this.user.id, this.users, this.seasons, this.userSR);
        this.initUserStatsData();
        this.initBarChart();
        this.initHorizontalChart();
        this.initDoughnutChart();
        this.loading = false;
    }

    initUserStatsData() {
        const present = totalPresences(this.user.id, this.seasons);
        const total = niccolgursCount(this.seasons);
        this.userStatsData = {
            srImage: getSRImage(this.userSR),
            present,
            absent: total - present,
            total,
            ratio: Math.round((present * 100) / total),
            mastered: totalMastered(this.user.id, this.seasons),
            masteredRatio: masteredPercentage(this.user.id, this.seasons),
        };
    }

    initBarChart() {
        this.barChart.data =
            this.users.map(user => {
                const presences = this.seasons.reduce(
                    (total, current) =>
                        total +
                        current.filter(nicc => nicc.master === user.id && nicc.members.includes(this.user.id)).length
                    , 0
                );
                return Math.round((presences * 100) / totalMastered(user.id, this.seasons));
            });
        this.barChart.labels = this.users.map(user => user.nickname);
        this.barChart.colors = this.randomColorPerUser();
    }

    randomColorPerUser() {
        return this.users.map(user => {
            const hex = '0123456789ABCDEF';
            let color = '#';
            for (let i = 1; i <= 6; i++) {
                color += hex[Math.floor(Math.random() * 16)];
            }
            return color;
        });

    }

    getPartecipationColor(ratio) {
        if (ratio < 33) {
            return '#F75D59';
        } else if (ratio >= 33 && ratio < 66) {
            return '#FBB917';
        } else {
            return '#4AA02C';
        }
    }

    getMasteringColor(ratio) {
        if (ratio < 7) {
            return '#F75D59';
        } else if (ratio >= 7 && ratio < 14) {
            return '#FBB917';
        } else {
            return '#4AA02C';
        }
    }

    private initHorizontalChart() {
        this.horizontalChart.data = [this.userStatsData.ratio];
        this.horizontalChart.colors = [this.getPartecipationColor(this.horizontalChart.data)];
    }

    private initDoughnutChart() {
        this.doughnutChart.data = [this.userStatsData.present, this.userStatsData.absent];
        this.doughnutChart.labels = ['Presente', 'Assente'];
        this.doughnutChart.colors = ['#2B60DE', '#F75D59'];
    }
}
