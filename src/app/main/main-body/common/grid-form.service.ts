import { DOCUMENT } from '@angular/common'
import { HttpClient } from '@angular/common/http'
import { Inject, Injectable } from '@angular/core'
import { Observable, ReplaySubject, Subject } from 'rxjs'
import { environment } from 'src/environments/environment'

@Injectable()
export class GridFormService {

  subUrl: string = environment.API_URL

  getByIdSimple(controlerName: string, id: any) { return this.http.get(`${this.subUrl}${controlerName}/${id}`) }

  getById(controlerName: string, id: number, formType: string) { return this.http.get(`${this.subUrl}${controlerName}/${id}/${formType == 'Edit'}`) }

  getMiniLog(controlerName: string, id: number) { return this.http.get(`${this.subUrl}${controlerName}/${id}`) }

  get(controlerName: string) { return this.http.get(`${this.subUrl}${controlerName}`) }

  getAttr(controlerName: string) { return this.http.get(`${this.subUrl}${controlerName}/GetAttribute`) }

  getAttrById(controlerName: string, id: number) { return this.http.get(`${this.subUrl}${controlerName}/GetAttribute/${id}`) }

  getSelect(controlerName: string, parentid?: any, SelectWqInp?: string) { 
    let body ={ParentID: parentid, SelectWqInp:SelectWqInp}
    return this.http.post(`${this.subUrl}${controlerName}/GetSelect`, body) 
  }

  deleteWithoutId(controlerName: string) { return this.http.post(`${this.subUrl}${controlerName}`, null) }

  delete(controlerName: string, id) { return this.http.post(`${this.subUrl}${controlerName}/Delete`,{IDCollect_Fld : id}) }

  deleteByBody(controlerName: string, body) { return this.http.request('POST', `${this.subUrl}${controlerName}`, { body: body }) }

  post(controlerName: string, body, getLast: boolean = false) { return this.http.post(`${this.subUrl}${controlerName}` + (getLast ? '?GetLast=true' : ''), body) }

  getCombo(url: string) {
    if (url.includes('*')) return this.http.get(`${this.subUrl}${url.replace('*', '')}`)
    if (url.includes('/')) {
      let urlArray = url.split('/')
      return this.http.get(`${this.subUrl}${urlArray[0]}/GetCombo/${urlArray[1]}` + (urlArray.length == 3 && urlArray[2] !='' ? `/${urlArray[2]}` : ''))
    }
    return this.http.get(`${this.subUrl}${url}/GetCombo/null`)
  }

  getParameter(url: string, id) { return this.http.get(`${this.subUrl}${url}/${id}`) }

  scrollToElement(className) { setTimeout(() => document.getElementsByClassName(className)[0] ? document.getElementsByClassName(className)[0].scrollIntoView({ behavior: "smooth" }) : null, 250) }

  private messageSource = new Subject<any>()
  currentMessage = this.messageSource.asObservable()
  passDataSubject(message: string) { this.messageSource.next(message) }

  private messageSourceBack = new Subject<any>()
  currentMessageBack = this.messageSourceBack.asObservable()
  passDataSubjectBack(message: any) { this.messageSourceBack.next(message) }

  private messageSourceReport = new Subject<any>()
  currentMessageReport = this.messageSourceReport.asObservable()
  passDataSubjectReport(message: any) { this.messageSourceReport.next(message) }

  constructor(private http: HttpClient, @Inject(DOCUMENT) private readonly document: Document) { }

  menuList = []

  tag


  loadedLibraries: { [url: string]: ReplaySubject<void> } = {};
  loadScript(url: string): Observable<void> {
    this.loadedLibraries[url] = new ReplaySubject();

    const script = this.document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.onload = () => {
      this.loadedLibraries[url].next();
      this.loadedLibraries[url].complete();
    };

    this.document.body.appendChild(script);

    return this.loadedLibraries[url].asObservable();
  }
}
