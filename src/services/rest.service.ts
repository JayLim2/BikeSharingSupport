import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

interface Options {
  headers?: HttpHeaders | {
    [header: string]: string | string[];
  };
  observe?: 'body';
  params?: HttpParams | {
    [param: string]: string | string[];
  };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class RestService {

  static HOST: string = "localhost:7777";
  static COMMON_URL: string = `http://${RestService.HOST}/`;

  constructor(
    private httpClient: HttpClient
  ) {
  }



  public get(url: string, options?: Options): Observable<any> {
    return this.httpClient.get(RestService.COMMON_URL + url, options);
  }

  public post(url: string, body: any, options?: Options): Observable<any> {
    return this.httpClient.post(RestService.COMMON_URL + url, body, options);
  }

  public put(url: string, body: any, options?: Options): Observable<any> {
    return this.httpClient.put(RestService.COMMON_URL + url, body, options);
  }

  public delete(url: string, options?: Options): Observable<any> {
    return this.httpClient.delete(RestService.COMMON_URL + url, options);
  }

}
