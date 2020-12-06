import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/core/service/alert.service';
import { Alert, AlertType } from '../../core/models/alert.model';


@Component({ selector: 'alert', templateUrl: 'alert.component.html', styleUrls: ['./alert.component.scss'] })

export class AlertComponent implements OnInit, OnDestroy {
    @Input() id: string;
    visible = false;
    alerts: Alert[] = [];
    subscription: Subscription;
    type: number
    constructor(private alertService: AlertService) { }

    ngOnInit() {
        this.subscription = this.alertService.onAlert(this.id)
            .subscribe(alert => {
                if (!alert.message) {
                    // clear alerts when an empty alert is received
                    this.alerts = [];
                    this.visible = false;
                    return;
                }
                // add alert to array
                this.alerts = [];
                this.visible = true;
                this.alerts.push(alert);
            });
    }

    ngOnDestroy() {
        // unsubscribe to avoid memory leaks
        this.subscription.unsubscribe();
    }

    removeAlert(alert: Alert) {
        // remove specified alert from array
        this.alerts = this.alerts.filter(x => x !== alert);
    }


    cssClass(alert: Alert) {
        if (!alert) {
            return;
        }

        // return css class based on alert type
        switch (alert.type) {
            case AlertType.Success:
                this.type = 0;
                return 'alert alert-success w-100';
            case AlertType.Error:
                this.type = 1;
                return 'alert alert-danger w-100';
            case AlertType.Info:
                this.type = 2;
                return 'alert alert-info w-100';
            case AlertType.Warning:
                this.type = 2;
                return 'alert alert-warning w-100';
        }
    }
}