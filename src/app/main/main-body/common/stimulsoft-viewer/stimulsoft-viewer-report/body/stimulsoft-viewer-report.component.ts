import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalOptions } from '../../../custom-modal/modal-options.interface';
import { GridFormService } from '../../../grid-form.service';

@Component({
  selector: 'stimulsoft-viewer-report',
  templateUrl: './stimulsoft-viewer-report.component.html',
  styleUrls: ['./stimulsoft-viewer-report.component.scss']
})
export class StimulsoftViewerReportComponent implements OnInit {

  @Input() url: string
  @Input() data: any
  @Input() title: any
  @Input() isFish: boolean
  @Output() closeChange = new EventEmitter()

  comboData: any[]
  fishType: any = 0
  getCombo() {
    this.service.getCombo('*OtherDetail/GetCombo/0/100323, 100571, 100572').subscribe((res: any) => {
      this.comboData = res.Data
    })
  }

  ComboChange(event) {
    this.showReport = false
    event == 100323 ? this.fishType = 0 : this.fishType = event
    this.setReport()
  }


  modalOptions: ModalOptions = {
    //formType: this.formType,
    modatTitle: '',
    hideCallback: this.close.bind(this),
    maxWidth: 1500
  }

  stimulsoftData: any = { item2: null }
  showReport: boolean = false
  setReport() {
    this.service.get(this.url + (this.isFish ? '/' + this.fishType : '')).subscribe((res: any) => {
      this.stimulsoftData.Item2 = res.Data
      setTimeout(() => {
        let sidebar = document.getElementsByClassName('app-sidebar')[0] as HTMLElement
        sidebar.style.zIndex = '0'
      }, 1000);
      this.showReport = true
    })
  }

  setReportWithData() {
    this.stimulsoftData.Item2 = this.data
    setTimeout(() => {
      let sidebar = document.getElementsByClassName('app-sidebar')[0] as HTMLElement
      sidebar.style.zIndex = '0'
    }, 1000);
    this.showReport = true
  }

  close() {
    let sidebar = document.getElementsByClassName('app-sidebar')[0] as HTMLElement
    sidebar.style.zIndex = '3'
    this.closeChange.emit(null)
  }

  constructor(private service: GridFormService) { }

  ngOnInit(): void { 
    this.data ? this.setReportWithData() : this.setReport() 
    this.modalOptions.modatTitle= this.title
    this.getCombo()
  }

}
