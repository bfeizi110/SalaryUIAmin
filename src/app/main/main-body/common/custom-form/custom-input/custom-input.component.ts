import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core'
import { AbstractControl, FormControl, FormGroup } from '@angular/forms'
import { MatOption } from '@angular/material/core'
import { GridFormService } from '../../grid-form.service'
import { isArray } from 'rxjs/internal-compatibility'
import { MatSelect } from '@angular/material/select'
import { NgxMaterialTimepickerComponent } from 'ngx-material-timepicker';
import { Observable } from 'rxjs'
import { map, startWith } from 'rxjs/operators';
@Component({
  selector: 'custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
})

export class CustomInputComponent {
  public customPatterns = { '0': { pattern: new RegExp('/\d+\.?\d*/') } }

  @Input() label: string
  @Input() placeholder: string
  @Input() parentFormGroup: FormGroup
  @Input() valueName: string
  @Input() type: string
  @Input() multilineno: number = 2
  @Input() dateDisabled: boolean = false;
   
  @Input() comboUrl: string
  @Input() getCombo: boolean
  @Input() descValue: string
  @Input() multiple: boolean
  @Input() comboArray: any[]
  @Input() position: string
  @Input() ltr: boolean
  @Input() labelColor: string
  @Input() formObj: any

  @Output() change = new EventEmitter()
  @Output() changeCombo = new EventEmitter()
  @Output() changeComboDesc = new EventEmitter()

  formtype: string =''
  showStringNumber: boolean = false
  numberStringControl: any
  setDefault(){
    if (this.formObj && this.descValue == undefined && this.valueName && this.valueName != '' && (this.formtype == 'Add' || this.formtype == '' )
     && this.formObj[this.valueName] && this.formObj[this.valueName].defaultvalue){
      this.control.value = this.formObj[this.valueName].defaultvalue
      switch (this.type) {
        case 'combo':
          this.service.post('EntityProperty/GetComboDesc', {CodeDesc_Fld: this.formObj[this.valueName].cboquery, Id: this.formObj[this.valueName].defaultvalue}).subscribe((res: any) =>
          {
            this.descValue = res.Data ;
            this.changeCombo.emit(this.control.value) ;
            this.changeComboDesc.emit(this.descValue) ;
          }
          )
          break;
        default:
          break;
      }
    }
  }

  setNumberField() {
    this.showStringNumber = true
    this.numberStringControl = this.control
    if (this.numberStringControl.validator && this.numberStringControl.validator({} as AbstractControl)) this.required = true
    this.disabled = this.numberStringControl.disabled
  }

  keyUp(event) {
    if (event.key != '*') return
    this.numberStringControl.patchValue(+(this.numberStringControl.value.toString() + '000'))
  }

  changeNumberStringValue(event) {
    //this.control.patchValue(event)
  }

  refreshArray() {
    this.comboList = []
    this.clickCombo()
  }
  SelectedInAll: any[]=[]
  SelectedInFilter: any[]=[]
  changeValue(event) {
    if (event && !Array.isArray(event)) {
      // && event.length != undefined && event.length != 0
      // const index = event.indexOf(0, 0);
      // if (index > -1) {
      //   event.splice(index, 1);
      // }

      this.change.emit(event)
      if (this.comboList.length != 0) {
        if (event.length == 0 )
          this.changeComboDesc.emit('')
        else
          this.changeComboDesc.emit(this.comboList.find(a => a.Id == event).CodeDesc_Fld)
      }
    }
  }
  nowLenCombo: number = -1
  comboListFilterEq = []
  ComboListChaged(event){
    this.comboListFilterEq = []
    event.forEach(element => {
      if (this.comboList.find(a => a.Id == element.Id))
        this.comboListFilterEq.push(element)
    });

    this.nowLenCombo = event.length
    this.control.value = this.SelectedInAll.concat(this.SelectedInFilter)

    this.control.value = this.control.value.filter(function(elem, index, self) {
      return index === self.indexOf(elem);
    })
    const index = this.SelectedInAll.indexOf(0, 0);
    if (index > -1) {
      this.control.value.splice(index, 1);
    }

    this.changeComboByUser(this.control)
  }

  changeDate(event) { this.change.emit(event) }

  changeComboByUser(event) {
    if (event && event.value !== undefined) {

      if (this.nowLenCombo == -1 || this.comboList.length == this.nowLenCombo){
        this.SelectedInAll = event.value
        this.SelectedInFilter = []
      }
      else
        {
          this.SelectedInFilter = event.value
          this.comboListFilterEq.forEach(element => {
            if (this.SelectedInAll.find(a => a == element.Id) && !event.value.find(a => a == element.Id))
            {
              const index = this.SelectedInAll.indexOf(element.Id, 0);
              if (index > -1) {
                this.SelectedInAll.splice(index, 1);
              }
              // this.SelectedInAll.push(element)
            }
          });

        }
        if (event.value && Array.isArray(event.value) && event.value.length != undefined && event.value.length != 0)
        {
          const index = event.value.indexOf(0, 0);
          if (index > -1) {
            event.value.splice(index, 1);
          }
        }
        else
          this.SelectedInAll = []

        this.changeCombo.emit(event.value)
    }
}

  changeCheckbox(event) { this.change.emit(event) }

  changeClient(event)
  {
    let t: any
  }
  comboList = []
  comboListBackup = []
  showFirstItem: boolean = false
  
  @ViewChild('selectPanel') selectPanel: MatSelect;
  clickCombo() {
    if (!this.comboUrl) {
      if (!this.comboArray) return
      this.comboList = this.comboArray
      this.comboListBackup = this.comboArray
      if (this.comboList[0].Id == 0) {
        this.comboListBackup = []
        this.comboList = []
      }
    }
    else if (this.comboList.length == 0) {
      this.service.getCombo(this.comboUrl).subscribe((res: any) => {
        if (res.Data.length > 0 && res.Data[0].Id != 0) {
          this.showFirstItem = false
          this.comboList = res.Data
          this.comboListBackup = res.Data
      }

        else {
          this.comboList = []
          this.comboListBackup = []
        }
        if (this.selectPanel) {
          setTimeout(() => {
            this.selectPanel.open();
           }, 0);
        }
      })
    }
  }

  control 
  required: boolean = false
  disabled: boolean = false
  start(): void {
    this.control = this.parentFormGroup.controls[this.valueName]
    if (this.parentFormGroup.controls["FormType"] && this.parentFormGroup.controls["FormType"].value && this.parentFormGroup.controls["FormType"].value.value) this.formtype = this.parentFormGroup.controls["FormType"].value.value
    if (this.parentFormGroup.controls["FormType"] && this.parentFormGroup.controls["FormType"].value && this.parentFormGroup.controls["FormType"].value !='' && this.formtype == '') this.formtype = this.parentFormGroup.controls["FormType"].value
    if (this.formtype['value'] == '') this.formtype = this.parentFormGroup.controls["FormType"].value.value
    if (this.control.validator && this.control.validator({} as AbstractControl)) this.required = true
    this.disabled = this.control.disabled
    this.setDefault()

    if (this.type == 'combo') setTimeout(() => this.comboList.length == 0 ? this.showFirstItem = true : null)

    if (this.getCombo) this.clickCombo()
  }

  direction: string = 'rtl'
  ngOnChanges(UpdatedValue: string): void {
    this.ltr ? this.direction = 'ltr' : null
    this.comboList = []
    this.showFirstItem = false
    this.start()
    this.type == 'int' || this.type == 'long' ? this.setNumberField() : this.showStringNumber = false
    }

    clearCombo() {
      this.control.value = null
      this.changeComboByUser(this.control)
    }

    clearText(val:any) {
      this.control.value = val
      this.changeValue(this.control)
    }

    @ViewChild('allSelected') private allSelected: MatOption;

  togglePerOne(all){
    if (this.allSelected.selected) {
     this.allSelected.deselect();
     return false;
 }
  //  if(this.parentFormGroup.controls[this.valueName].value.length==this.comboArray.length)
  //    this.allSelected.select();

 }
   toggleAllSelection() {
     if (this.allSelected.selected) {
      this.parentFormGroup.controls[this.valueName].patchValue([...this.comboArray.map(item => item.Id), 0]);
     }
     else {
      this.parentFormGroup.controls[this.valueName].patchValue([]);
     }
     this.changeComboByUser(this.parentFormGroup.controls[this.valueName])
   }
  formattime(event: any) {
    let value = event.target.value;
    value = value.replace(/[^0-9]/g, '');
    if (value.length > 4) {
        value = value.slice(0, 4);
    }
    const hour = value.match(/^(\d{0,2})/);
    const min = value.match(/^\d{2}(\d{0,2})/);
    let formattedValue = '';
    if (hour) {
        formattedValue += hour[1];
    }
    if (hour && hour[1].length === 2) {
        formattedValue += ':';
    }
    if (min) {
        formattedValue += min[1];
    }
    if (value.length < 3) {
        formattedValue = formattedValue.replace(':', '');
    }
    const parts = formattedValue.split(':');
    if (parts[0] && parseInt(parts[0]) > 23) {
        parts[0] = '23';
    }

    if (parts[1] && parseInt(parts[1]) > 59) {
        parts[1] = '59';
    }
    formattedValue = parts.join(':');
    event.target.value = formattedValue;
    this.change.emit(event);
}
  constructor(private service: GridFormService) {
  }

  updateTime(newTime: string, field: string): void {
  this.control.value=newTime
  }

}
