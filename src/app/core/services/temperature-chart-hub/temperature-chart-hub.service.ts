import { Inject, Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { ENV } from 'src/environments/environment.provider';
import { IEnvironment } from 'src/environments/ienvironment';
import { Scope, Temperature } from '@models';
import { TemperatureChartHubService } from './temperature-chart-hub-service';


@Injectable()
export class TemperatureChartHubServiceImpl extends TemperatureChartHubService {

  private hubContext?: HubConnection;
  private onUpdateTemperature = false;

  constructor(@Inject(ENV) private environment: IEnvironment) { 
    super();
  }

  public getTemperatureData(scope: Scope): Observable<Temperature[]> {
    const subject = new Subject<Temperature[]>();
    
    this.startHub().subscribe(isConnected => {
      if(!isConnected) {
        return;
      }
      
      if(!this.onUpdateTemperature) {
        this.hubContext!.on('UpdateTemperature', data => {
          subject.next(data);
        })
        this.onUpdateTemperature = true;
      }
  
      this.hubContext!.send("Temperature", scope)
        .catch(err => console.log(err))
    })

    return subject;
  }

  public destroy() {
    this.hubContext!
      .stop()
      .then(() => {
        this.hubContext = undefined;
        this.onUpdateTemperature = false;
      })
      .catch(err => console.log(err));
  }

  private startHub(): Observable<boolean> {
    const subject = new BehaviorSubject<boolean>(false);
    
    if (this.hubContext && this.hubContext.state === HubConnectionState.Connected) {
      subject.next(true);
      return subject;
    } else {
      this.hubContext = this.getHubContext();
      this.hubContext
      .start()
      .then(() => {
        subject.next(true);
      })
      .catch(err => console.log(err));
    }
    return subject;
  }

  private getHubContext() {
    return new HubConnectionBuilder()
      .withUrl(`${this.environment.signalrHub}/temperature`)
      .build();
  }

}
