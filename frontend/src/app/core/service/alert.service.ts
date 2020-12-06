import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Alert, AlertType } from '../models/alert.model';


@Injectable({ providedIn: 'root' })
export class AlertService {
  private subject = new Subject<Alert>();
  private keepAfterRouteChange = false;
  timeout;
  constructor(private router: Router) {
    // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterRouteChange) {
          // only keep for a single route change
          this.keepAfterRouteChange = false;
        } else {
          // clear alert messages
          this.clear();
        }
      }
    });
  }

  // enable subscribing to alerts observable
  onAlert(alertId?: string): Observable<Alert> {
    return this.subject.asObservable().pipe(filter(x => x && x.alertId === alertId));
  }

  clearByTime(alertId?: string) {
    this.timeout = setTimeout(() => {
      this.subject.next(new Alert({ alertId }));
    }, 5000);
  }

  // convenience methods
  success(message: string, alertId?: string) {
    this.clear();
    this.alert(new Alert({ message, type: AlertType.Success, alertId }));
    this.clearByTime(alertId);
  }

  error(message: string, alertId?: string) {
    this.clear();
    this.alert(new Alert({ message, type: AlertType.Error, alertId }));
    this.clearByTime(alertId);
  }

  info(message: string, alertId?: string) {
    this.clear();
    this.alert(new Alert({ message, type: AlertType.Info, alertId }));
    this.clearByTime(alertId);
  }

  warn(message: string, alertId?: string) {
    this.clear();
    this.alert(new Alert({ message, type: AlertType.Warning, alertId }));
    this.clearByTime(alertId);
  }

  // main alert method
  alert(alert: Alert) {
    this.clear();
    this.keepAfterRouteChange = alert.keepAfterRouteChange;
    this.subject.next(alert);
  }

  // clear alerts
  clear() {
    this.subject.next(null);
  }
}