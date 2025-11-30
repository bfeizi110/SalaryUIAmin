import { Component, OnInit } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms'
import { ToastrService } from 'ngx-toastr'
import { LoaderService } from 'src/app/common/loader/loader.service'
import { CustomGridOption } from 'src/app/main/main-body/common/custom-ag-grid/interfaces/ag-grid-option.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'

const Controller = 'Accept'

@Component({
  templateUrl: './accept.component.html',
  styleUrls: ['./accept.component.scss']
})
export class AcceptComponent implements OnInit {

  // model = new Model()
  form: UntypedFormGroup
  setForm() {
    this.form = this.formBuilder.group({
      ListTypeID: [{ value: null, disabled: false }, null],
      PayStatusID: [{ value: null, disabled: false }, null],
      PayTypeID: [{ value: null, disabled: false }, null],
      HireTypeHghID: [{ value: null, disabled: false }, null],
      CostCenterID: [{ value: null, disabled: false }, null],
      PayCodeID: [{ value: null, disabled: false }, null],
      PersonMonthHistoryID: [{ value: null, disabled: false }, null],
      ListNo: [{ value: null, disabled: false }, null],
      YearMonthHgh: [{ value: null, disabled: false }, null],
      AcceptID: [{ value: null, disabled: false }, null],
      AcceptText: [{ value: null, disabled: false }, null],
      PersonID: [{ value: null, disabled: false }, null],
      SpecialCondID: [{ value: null, disabled: false }, null],
    })
    this.form.controls.PayTypeID.disable()
  }  

  payTypeList = []
  clickComboPayTypeList() { 
    this.payTypeList.length == 0 ? this.service.get(`${Controller}/GetPayTypes/${this.form.controls.ListTypeID.value}/${this.form.controls.PayStatusID.value}`).subscribe((res: any) => this.payTypeList = res.Data) : null 
  }

  showButtons: boolean = false
  listTypeChange(event) {
    this.payTypeList = []
    this.acceptID = null
    this.form.controls.PayTypeID.patchValue(null)
    this.form.controls.AcceptID.patchValue(null)

    if (!event || !this.form.controls.PayStatusID.value) {
      this.showButtons = false
      this.form.controls.PayTypeID.disable()
    }
    else 
    {
      this.form.controls.PayTypeID.enable()
      // this.clickComboPayTypeList()
      switch (this.form.controls.PayStatusID.value) {
        case 100571:
          this.acceptRejectTitle = 'تایید'
          this.service.get(`${Controller}/GetAcceptCode`).subscribe((res: any) => {
            this.acceptID = res.Data
          })        
          break;
        case 100572:
          this.acceptRejectTitle = 'برگشت از تایید'
          break;
        case 100573:
          this.acceptRejectTitle = 'برگشت از بایگانی'
          break;
        case 100574:
          this.acceptRejectTitle = 'بایگانی'
          break;
      }
      this.showButtons = true
    }
  }

  // HireTypeList: any
  // PayProgramList: any

  clickFilter(FController: string, ListName: string)
  {
    if (!this[ListName] || this[ListName].length == 0 || FController=='Accept')
      this.service.getCombo(FController).subscribe((res: any) => {
        this[ListName] = res.Data
      })
  }

  acceptRejectTitle: string
  acceptID: any 
  AcceptIDText: string

  gridOption = <CustomGridOption>{ controllerName: Controller }

  showGrid: boolean = false
  openGrid() {
    if (this.form.controls.PayStatusID && this.form.controls.PayStatusID.value != 100573) this.form.controls.YearMonthHgh.patchValue(null)
    if (this.form.controls.PayStatusID && this.form.controls.PayStatusID.value != 100572) this.form.controls.AcceptID.patchValue(null)
    this.showGrid = false
    let fakeFormValue = this.form.getRawValue()
    this.fixModel(fakeFormValue)
    this.service.post(`${Controller}/GetSelect/${this.form.controls.PayStatusID.value}`, fakeFormValue).subscribe((res: any) => {
      this.gridOption.rowData = res.Data.Item1
      this.gridOption.columnDefs = res.Data.Item2
      this.showGrid = true
    })
  }

  fixModel(model: any) {
    if (model.PayTypeID) model.PayTypeID = model.PayTypeID.toString()
    if (model.PersonID) model.PersonID = model.PersonID.toString()
    if (model.HireTypeHghID) model.HireTypeHghID = model.HireTypeHghID.toString()
    if (model.PayCodeID) model.PayCodeID = model.PayCodeID.toString()
    if (model.PersonMonthHistoryID) model.PersonMonthHistoryID = model.PersonMonthHistoryID.toString()
    if (model.ListNo) model.ListNo = model.ListNo.toString()
    if (model.YearMonthHgh) model.YearMonthHgh = model.YearMonthHgh.toString()
    if (model.AcceptID) model.AcceptID = model.AcceptID.toString()
    if (model.SpecialCondID) model.SpecialCondID = model.SpecialCondID.toString()
  }

  taxFileInp(event) {
    if (!this.form.controls.AcceptID.value || this.form.controls.AcceptID.value.toString() == '' )
    {
      this.toastr.error('عنوان لیست تایید را انتخاب کنید', 'خطا')
      return         
    }
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
        CatID: this.form.controls.ListTypeID.value ? this.form.controls.ListTypeID.value.toString() : null,
        AcceptID: this.form.controls.AcceptID.value.toString(),
      };
      this.service
        .post(`${Controller}/ImportTaxFile`, model)
        .subscribe();          
    };
  } 
 
  taxFileOut(AcceptID: number) {
    if (AcceptID)
    {
      this.acceptID.Id = AcceptID
      if (this.acceptID)
        {
          let array = []
          array.push(this.acceptID.Id)

          this.form.controls.AcceptText.patchValue(this.acceptID.CodeDesc_Fld)
          this.form.controls.AcceptID.patchValue(array)
        }
    }
    if (this.form.controls.PayStatusID && this.form.controls.PayStatusID.value != 100573) this.form.controls.YearMonthHgh.patchValue(null)
    // if (this.form.controls.PayStatusID && this.form.controls.PayStatusID.value != 100572) this.form.controls.AcceptID.patchValue(null)
    let fakeFormValue = this.form.getRawValue()
    fakeFormValue.PayStatusID = 100572
    fakeFormValue.PayTypeID = ""
    this.fixModel(fakeFormValue)
    fakeFormValue.Id = 62
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

  acceptOrReject(type: any) {
    if (this.acceptID)
      {
        let array = []
        array.push(this.acceptID.Id)

        this.form.controls.AcceptText.patchValue(this.acceptID.CodeDesc_Fld)
        this.form.controls.AcceptID.patchValue(array)
      }
      if (this.form.controls.PayStatusID && this.form.controls.PayStatusID.value != 100573) this.form.controls.YearMonthHgh.patchValue(null)
        // if (this.form.controls.PayStatusID && this.form.controls.PayStatusID.value != 100572) this.form.controls.AcceptID.patchValue(null)

    this.showGrid = false
    let url: string
    switch (this.form.controls.PayStatusID.value) {
      case 100571: url = `${Controller}/AcceptPay`
        break;
      case 100572: url = `${Controller}/NotAcceptPay`
        break;
      case 100573: url = `${Controller}/NotArchivePay`
        break;
      case 100574: url = `${Controller}/ArchivePay`
        break;
    }
    let fakeFormValue = this.form.getRawValue()
    this.fixModel(fakeFormValue)
    this.service.post(url, fakeFormValue).subscribe((res: any) => {
      this.gridOption.rowData = res.Data.Item1
      this.gridOption.columnDefs = res.Data.Item2
      if (this.form.controls.PayStatusID && this.form.controls.PayStatusID.value == 100571) this.taxFileOut(res.Data.Item3)
      this.showGrid = true
    })
  }

  showPerson: boolean = false
  onShowPerson() {
    this.showPerson = true
  }

  clearPerson() {
    this.form.controls.PersonID.patchValue(null)
    this.personName = ''
  }

  onSelectPersonnel(person) {
    this.form.controls.PersonID.patchValue(person.Id)
    this.showPerson = false
  }

  rowSelectedList(obj) {
    this.form.controls.PersonID.patchValue(obj.ids)
    let namesArray = []
    obj.personData.forEach(person => obj.ids.forEach(id => id == person.Id ? namesArray.push(person.Name + ' ' + person.Family) : null))
    this.personName = namesArray.join()
    this.showPerson = false
  }

  closedCostCenterModal() { this.showCostCenterModal = false }

  personName: string
  nodeSelected(node) {
    this.form.controls.CostCenterID.patchValue(node.Id)
    this.costCenterName = node.name
    this.showCostCenterModal = false
  }

  showCostCenterModal: boolean = false
  costCenterName: string
  onShowCostCenterModal() { this.showCostCenterModal = true }
  clearCostCenter() {
    this.showCostCenterModal = false
    this.costCenterName = ''
  }

  constructor(private service: GridFormService, private loaderService: LoaderService, private toastr: ToastrService, private formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.setForm()
  }
}