import { Component } from '@angular/core'
import { resolve } from 'dns'
import { AlertClass } from 'src/app/main/main-body/common/alert/alert-functions'
import { CustomGridOption } from 'src/app/main/main-body/common/custom-ag-grid/interfaces/ag-grid-option.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { setTadrisAttr, TadrisAttr } from 'src/app/main/pages/global-attr'
import { ToastrService } from 'ngx-toastr'
import { LoaderService } from 'src/app/common/loader/loader.service'

const Controller = 'Tadris'

@Component({
  templateUrl: './tadris.component.html',
  styleUrls: ['./tadris.component.scss']
})
export class TadrisComponent {

  controller = Controller
  filterDto: any
  filterAllMonthDto: any
  showSelectPerson: boolean = false
  personData = []
  showGrid: boolean = false
  selectedPersonelNF: any
  TermEdu: any
  AllInfo: boolean = false

  changeCheckbox(checked){
    this.AllInfo = checked
    this.getSelect()
  }

  async onFilter(dto) {
    !this.formObj ? await this.getAttr() : null
    this.service.post(`Person/GetFilterSelect`, dto).subscribe((res: any) => {
      this.personData = res.Data
      this.filterDto = dto
      const filteredColumnKey = Object.keys(dto).reduce((obj, key) => {
        obj[key] = dto[key]
        return obj
      }, {})      

      this.filterAllMonthDto = filteredColumnKey
      this.filterAllMonthDto.AllMonthOfThisYear = true
      this.showSelectPerson = true
    })
  }

  PID: number
  async onSelectPersonnel(id) {
    this.PID = id
    this.getSelect()
    this.showGrid = false
    this.showForm = false
    this.selectedPersonList = []    
  }

  showForm: boolean = false
  formType: string = ''
  gridOption = <CustomGridOption>{
    actions: [
      {
        label: 'Edit',
        callback: this.edit.bind(this)
      },
      {
        label: 'Delete',
        callback: this.delete.bind(this)
      },
      {
        label: 'Add',
        callback: this.add.bind(this)
      }
    ],
    controllerName: Controller,
    rowClicked: this.view.bind(this)
  }

  async calcTadris(){
    if (this.canCalc)
    {
      let calcOut = (await this.service.post(`${Controller}/CalcTadris`, null).toPromise()) as any;
      if (calcOut.Data != "")
        this.toastr.info(calcOut.Data);
    }
  }

  formObj: any
  getAttr() {
    let Attr = TadrisAttr()
    return new Promise(resolve => {
      if (!Attr) {
        this.showGrid = false
        this.service.getAttr(Controller).subscribe((res: any) => {
          this.setAttr(res.Data, 'toLocal')
          return resolve(true)
        })
      }
      else {
        this.setAttr(Attr)
        return resolve(true)
      }
    })
  }

  selectedPersonList = []
  async rowSelectedList(idArray) {
    this.showForm = false
    this.selectedPersonList = idArray.toString()
    if (idArray.length > 0) {
      this.showGrid = false
      this.formType = 'Add'
      this.showForm = true
    }
  }  

  cardexOptions
  canEdit: boolean = false
  canDelete: boolean = false
  canAdd: boolean = false
  canCalc: boolean = false
  setAttr(attr, type?) {
    this.gridOption.columnDefs = attr
    this.formObj = attr.EntityAttribute

    let accesses: string[] = attr.EntityAccess
    this.canEdit = accesses.includes('EditPolicy')
    this.canDelete = accesses.includes('DeletePolicy')
    this.canAdd = accesses.includes('AddPolicy')
    this.canCalc = accesses.includes('CalcPolicy')
    type == 'toLocal' ? setTadrisAttr(attr) : null
  }

  getSelect() {
    this.showGrid = false
    this.service.getSelect(Controller, this.PID, this.AllInfo ? '1' : '0').subscribe((res: any) => {
      this.gridOption.rowData = res.Data
      this.showGrid = true
      setTimeout(() => {
        this.service.scrollToElement('tadris-tab')
      }, 200); 
    })
  }

  add() {
    this.showForm = true
    this.formType = 'Add'
  }

  selectedIdList = []
  onMultiEdit(ids) {
    this.selectedIdList = ids.toString()
    if (ids.length > 0) {
      this.formType = 'Edit'
      this.showForm = true
    }
  }

  ID
  edit(event) {
    this.ID = event.rowData.Id
    this.showForm = true
    this.formType = 'Edit'
  }

  view(event) {
    this.ID = event.data.Id
    this.showForm = true
    this.formType = 'View'
  }

  delete(event) {
    AlertClass.deleteAlert(_ => {
      this.service.delete(Controller, event.rowData.Id).subscribe((res: any) => {
        this.showGrid = false
        this.showForm = false
        this.gridOption.rowData = res.Data
        setTimeout(() => {this.showGrid = true}, 200)
      })
    })
  }

  TermEduChanged(event: any){
    this.TermEdu = event
  }
  showGeneralPerson: boolean = true
  submited(type) {
    this.closeForm()
    if (type === false) return
    if (type == 'multi') {
      this.showSelectPerson = false
      this.showGeneralPerson = false
      setTimeout(() => {
        this.showSelectPerson = true
        this.showGeneralPerson = true
      })
    }
    else this.getSelect()
  }

  taxFileOut() {
    let fakeFormValue = { PayStatusID : 100572, PayTypeID : "100308", Id : 62, CatID : "100323", IsTadris: true}
    this.service.post(`ReportDesignView/GetFile`, fakeFormValue).subscribe((res: any) => {
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

  taxFileInp(event) {

    let model = { Id: 0, FileName: null, FileContent: null, AcceptID: null, CatID: null };
    this.loaderService.show();
    var file = event.target.files[0];
    let fileName = file.name;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (ـ) => {
      let fileContent = reader.result;
      this.loaderService.hide();
      model = {
        Id: 0,
        FileName: fileName,
        FileContent: fileContent,
        CatID: '100323',
        AcceptID: '-1',
      };
      this.service
        .post(`Accept/ImportTaxFile`, model)
        .subscribe();          
    };
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

  closeForm() {
    this.selectedIdList = []
    this.selectedPersonList = []
    this.formType = ''
    this.showForm = false
  }

  constructor(private service: GridFormService, private toastr: ToastrService, private loaderService: LoaderService) { }

}
