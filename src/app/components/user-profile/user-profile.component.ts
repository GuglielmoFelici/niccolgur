import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NiccolgurManagerService} from '../../services/niccolgur-manager.service';
import {User} from '../../ts/domain';
import {images} from 'src/app/ts/env';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {Context} from 'chartjs-plugin-datalabels/types/context';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

    notFound = false;
    user: User;
    images = images;
    presenceData: {
        present,
        absent,
        total,
        ratio,
    };
    chartLabels = ChartDataLabels;

    horizontalChartOptions = {
        legend: undefined,
        scales: {
            display: false,
            xAxes: [{
                ticks: {
                    min: 0,
                    max: 100,
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
            });
        this.manager.getUserPresence(id)
            .then(presence => {
                this.presenceData = {
                    present: presence.present,
                    absent: presence.total - presence.present,
                    total: presence.total,
                    ratio: Math.round((presence.present * 100) / presence.total)
                };
            });
    }

    getPercentageColor(ratio) {
        if (ratio < 33) {
            return [{backgroundColor: ['#F75D59']}];
        } else if (ratio >= 33 || ratio < 66) {
            return [{backgroundColor: ['#FBB917']}];
        } else {
            return [{backgroundColor: '#4AA02C'}];
        }
    }
}
