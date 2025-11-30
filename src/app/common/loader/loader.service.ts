import { Injectable } from '@angular/core'
import { NgxSpinnerService } from 'ngx-spinner'
import { BehaviorSubject } from 'rxjs'

@Injectable()
export class LoaderService {

  requests: string[] = []
  public isLoading = new BehaviorSubject(false)

  show() {
    this.spinner.show()
  }

  hide() {
    this.spinner.hide()
  }

  constructor(private spinner: NgxSpinnerService) { }
}
