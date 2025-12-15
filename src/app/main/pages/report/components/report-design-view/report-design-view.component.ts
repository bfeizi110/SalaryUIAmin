import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core'
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms'
import { CustomGridOption } from 'src/app/main/main-body/common/custom-ag-grid/interfaces/ag-grid-option.interface'
import { ModalOptions } from 'src/app/main/main-body/common/custom-modal/modal-options.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { exportFile, showFile } from 'src/app/main/main-body/common/constants'

const Controller = 'ReportDesignView'
@Component({
  templateUrl: './report-design-view.component.html',
  styleUrls: ['./report-design-view.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class ReportDesignViewComponent implements OnInit {

  @ViewChild('pdfCheckbox') pdfCheckbox: ElementRef;

  tafkikList = []
  changeTafkik(filterId) { this.tafkikList.includes(filterId) ? this.tafkikList = this.tafkikList.filter(a => a != filterId) : this.tafkikList.push(filterId) }

  reportDesignDTO: any = {}
  ReportDesignFilterViewDto = []
  ReportDesignFileDto = []
  ReportDesignGridDto = []
  ReportDesignGridToggle = []
  ReportDesignStimulDto = []
  NothingByDefaultList= []
  getById() {
    this.service.getByIdSimple(Controller, this.Id).subscribe((res: any) => {
      this.reportDesignDTO = res.Data
      this.ReportDesignFilterViewDto = this.reportDesignDTO.ReportDesignFilterViewDto
      this.ReportDesignFilterLists = new Array<any>(this.ReportDesignFilterViewDto.length)
      this.ReportDesignFileDto = this.reportDesignDTO.ReportDesignFileDto
      this.ReportDesignGridDto = this.reportDesignDTO.ReportDesignGridDto
      this.ReportDesignStimulDto = this.reportDesignDTO.ReportDesignStimulDto
      let index = 0;
      for (let item of this.ReportDesignFilterViewDto) 
        if (item.NothingByDefault_Fld)
        {
          this.NothingByDefaultList[index] = item.FilterFldName_Fld
          ++index;
        }

      for (let index = 0; index < this.ReportDesignGridDto.length; index++) 
        this.ReportDesignGridDto[index].Toggle = false

      for (let index = 0; index < this.ReportDesignFileDto.length; index++) 
        this.ReportDesignFileDto[index].Toggle = false

      for (let index = 0; index < this.ReportDesignStimulDto.length; index++) 
        this.ReportDesignStimulDto[index].Toggle = false

      this.setForm()
    })
  }

  ReportDesignFilterLists = []
  showModal: boolean = false
  modalType: string = ''
  activeIndexModal: number
  clickReportDesignFilter(id: number, index: number, filterId: number, filterName) {
    switch (filterId) {
      case 100471:
        this.onShowPersonModal(index)
        break
      case 100478:
        this.onShowOrgStructureModal(index)
        break
      case 100476:
        this.onShowCostCenterModal(1, index)
        break
      case 100472:
        this.onShowCostCenterModal(2, index)
        break
      default:
        if (!this.ReportDesignFilterLists[index] || this.ReportDesignFilterLists[index].length == 0)
        this.service.getCombo(`${Controller}/${id}`).subscribe((res: any) => {
          const data = res.Data
          if (!data.Item2) this.ReportDesignFilterLists.splice(index, 1, data)
        })
    }
    this.activeFieldName = filterName
  }

  rowSelectedPersonList(obj) {
    let personDesc = []
    let ids = obj.ids
    this.model[this.activeFieldName] = ids
    this.modelToPost[this.activeFieldName] = ids
    let personData = obj.personData
    let persons = []
    ids.forEach(id => persons.push(personData.filter(a => a.Id == id)[0]))
    persons.forEach(a => personDesc.push(`${a.Name} ${a.Family}`))
    this.ReportDesignFilterViewDto[this.activeIndexModal].ReportDesignFilterLists = []
    let arr = []
    for (let index = 0; index < obj.ids.length; index++) arr.push({ CodeDesc_Fld: personDesc[index], Id: obj.ids[index] })
    this.ReportDesignFilterLists.splice(this.activeIndexModal, 1, arr)
    this.closedModal()
  }

  rowSelectedPerson(event) {
    if (this.ReportDesignFilterViewDto[this.activeIndexModal].MultiSelect_Fld) return true
    this.ReportDesignFilterViewDto[this.activeIndexModal].ReportDesignFilterLists = []
    this.ReportDesignFilterLists.splice(this.activeIndexModal, 1, [{ Id: event.Id, CodeDesc_Fld: event.Name + event.Family }])
    this.model[this.activeFieldName] = event.Id
    this.modelToPost[this.activeFieldName] = event.Id.toString()
    this.closedModal()
  }

  clearName(i) {
    this.model['PersonID'] = null
    this.modelToPost['PersonID'] = null
  }

  onShowOrgStructureModal(index: number) {
    this.activeIndexModal = index
    this.modalType = 'OrgStructureTree'
    this.showModal = true
  }

  costCenterType: number
  onShowCostCenterModal(type: number, index: number) {
    this.activeIndexModal = index
    this.costCenterType = type
    this.modalType = 'CostCenterTree'
    this.showModal = true
  }

  nodeSelected(obj) {
    this.ReportDesignFilterViewDto[this.activeIndexModal].ReportDesignFilterLists = []
    if (obj.ids) {
      this.ReportDesignFilterViewDto[this.activeIndexModal].ReportDesignFilterLists.push({ Id: obj.ids, CodeDesc_Fld: obj.names })
      let arr = []
      for (let index = 0; index < obj.ids.length; index++) arr.push({ CodeDesc_Fld: obj.names[index], Id: obj.ids[index] })
      this.ReportDesignFilterLists.splice(this.activeIndexModal, 1, arr)
      this.model[this.activeFieldName] = obj.ids
      this.modelToPost[this.activeFieldName] = obj.ids
    }
    else {
      this.ReportDesignFilterViewDto[this.activeIndexModal].ReportDesignFilterLists.push({ Id: obj.Id, CodeDesc_Fld: obj.name })
      this.ReportDesignFilterLists.splice(this.activeIndexModal, 1, [{ Id: obj.Id, CodeDesc_Fld: obj.name }])
      this.model[this.activeFieldName] = obj.Id
      this.modelToPost[this.activeFieldName] = obj.Id.toString()
      this.closedModal()
    }
  }

  onShowPersonModal(index: number) {
    this.activeIndexModal = index
    this.modalType = 'Person'
    this.showModal = true
  }

  closedModal() {
    this.activeIndexModal = null
    this.costCenterType = null
    this.modalType = null
    this.showModal = false
  }

  model: any = {}
  modelToPost: any = {}
  modelToPostTemp: any = {}
  activeFieldName: string
  reportDesignFilterViewChange(event,id, fieldName) {
    this.model[fieldName]= event
    for (let prop of Object.keys(this.model)) if (Array.isArray(this.model[prop])) { this.modelToPost[prop] = this.model[prop].toString() } else this.modelToPost[prop] = this.model[prop]
    this.activeFieldName = fieldName
  }

  reportDesignFilterViewDynamicNotComboChange(fieldName) {
    this.modelToPost[fieldName] = this.form.controls[fieldName].value
    this.activeFieldName = fieldName
  }  

  showGrid: boolean = false
  gridOption = <CustomGridOption>{}

  clickTable(item, idx) {
    let DynamicFilter: any = {}
    this.modelToPost.Id = item.Id
    this.ReportDesignGridDto[idx].Toggle = true
    this.modelToPost.DynamicFilter = null
    for (let prop in this.modelToPost) 
    {
      if (Array.isArray(this.modelToPost[prop])) 
        this.modelToPost[prop] = this.modelToPost[prop].toString() 
      if (prop.substring(0,4) == 'Dyna' && prop != 'DynamicFilter')
      {
        DynamicFilter[prop] = this.modelToPost[prop]
        this.modelToPost.DynamicFilter = DynamicFilter
      }
    }
    this.modelToPost.Tafkik = this.tafkikList.toString()

    this.setNothingByDefault()

    this.showGrid = false
    this.service.post(`${Controller}/GetSelect`, this.modelToPostTemp).subscribe((res: any) => {
      this.showGrid = true
      const data = res.Data
      this.gridOption.rowData = data.Item1
      this.gridOption.columnDefs = data.Item2
    })
  }

  clickFile(item, idx) {
    this.ReportDesignFileDto[idx].Toggle = true
    this.modelToPost.Id = item.Id

    for (let prop in this.modelToPost) if (Array.isArray(this.modelToPost[prop])) this.modelToPost[prop] = this.modelToPost[prop].toString()
    this.modelToPost.Tafkik = this.tafkikList.toString()

    this.setNothingByDefault()

    this.showGrid = false
    this.service.post(`${Controller}/GetFile`, this.modelToPostTemp).subscribe((res: any) => {
      const data = res.Data

      var element = document.createElement('a');
      if (data.Item1 == "text/plain") {
        element.setAttribute('href', 'data:text/plain;charset=utf-16le,' + encodeURIComponent(data.Item3));
        element.setAttribute('download', data.Item2);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
      }

      else {
        element.style.display = 'none';
        let url = window.URL.createObjectURL(this.base64ToBlob(data.Item3))
        element.href = url;
        element.download = data.Item2;
        element.click();
        window.URL.revokeObjectURL(url);
      }
    })
  }

  setNothingByDefault(){
    this.modelToPostTemp = this.modelToPost
    for (let index = 0; index < this.NothingByDefaultList.length; index++) 
      this.modelToPostTemp[this.NothingByDefaultList[index]] = this.modelToPost[this.NothingByDefaultList[index]] ? (this.modelToPost[this.NothingByDefaultList[index]].toString() ?? '') : '' +  '#'
  }

  base64ToBlob(b64Data, sliceSize = 512) {
    let byteCharacters = atob(b64Data); //data.file there
    let byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      let slice = byteCharacters.slice(offset, offset + sliceSize);

      let byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      let byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  }

  stimulsoftData: any
  modalOptions: ModalOptions
  clickStimul(item, idx) {
    this.ReportDesignStimulDto[idx].Toggle = true
    this.modalOptions = {
      modatTitle: item.CodeDesc_Fld,
      hideCallback: this.close.bind(this),
      maxWidth: 1500
    }
    this.showReport = false
    this.modelToPost.Id = item.Id
    this.modelToPost.PdfReport = this.pdfCheckbox.nativeElement.checked
    for (let prop in this.modelToPost) if (Array.isArray(this.modelToPost[prop])) this.modelToPost[prop] = this.modelToPost[prop].toString()
    this.modelToPost.Tafkik = this.tafkikList.toString()
    this.setNothingByDefault()

    this.service.post(`${Controller}/NewViewStimul`, this.modelToPostTemp).subscribe((res: any) => {
      if (this.pdfCheckbox.nativeElement.checked)
        exportFile(res.Data.Item2, item.CodeDesc_Fld);
      else
      {
        this.stimulsoftData = res.Data.Item2
        this.modalOptions.modatTitle = res.Data.Item4
        this.showReport = true
      }
    })
  }

  showReport: boolean = false
  close() {
    let sidebar = document.getElementsByClassName('app-sidebar')[0] as HTMLElement
    sidebar.style.zIndex = '3'
    this.showReport = false
  }

  clear(valueName, isMulti: boolean) {
    if (isMulti) {
      this.model[valueName] = []
      this.modelToPost[valueName] = []
    }
    else {
      this.model[valueName] = null
      this.modelToPost[valueName] = null
    }
  }

  form: UntypedFormGroup
  setForm() {
    this.form = new UntypedFormGroup({})
    for (let index = 0; index < this.ReportDesignFilterViewDto.length; index++) {
        this.form.addControl(
          this.ReportDesignFilterViewDto[index].FilterFldName_Fld,
          new UntypedFormControl('')
        );
      } 
  }

  constructor(private service: GridFormService, private fb: UntypedFormBuilder) { }

  Id: number
  ngOnInit(): void {
    this.Id = +sessionStorage.getItem('reportId')
    this.getById()

  }

}