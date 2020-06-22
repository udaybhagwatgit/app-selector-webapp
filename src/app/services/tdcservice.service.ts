import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { DataService } from '../dynamictdcform/data.service';

@Injectable({
  providedIn: 'root'
})
export class TdcserviceService extends DataService {

  constructor(http: Http) {
    super('http://localhost:8085/api/v1/components', http);
  }
}
