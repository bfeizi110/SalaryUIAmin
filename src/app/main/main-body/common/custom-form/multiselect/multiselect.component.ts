import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { UntypedFormControl } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { take, takeUntil } from 'rxjs/operators';
//import { isArray } from 'rxjs/internal-compatibility';

export interface Combo {
  Id: number;
  CodeDesc_Fld: string;
}


@Component({
  selector: 'multiselect',
  templateUrl: 'multiselect.component.html',
  styleUrls: ['multiselect.component.css'],
})
export class MultiSelectComponent {
  showCombo: boolean = false

  @Input() comboList: Combo[]
  @Input() placeholder: string
  @Input() required: string
  @Input() multiple: boolean
  @Input() label: string
  @Input() labelColor: string
  @Input() control
  @Input() parentFormGroup
  @Input() disabled: boolean
  @Input() formtype: string
  @Input() descValue: string

  @Output() change = new EventEmitter()
  public comboCtrl: UntypedFormControl = new UntypedFormControl();

  public comboFilterCtrl: UntypedFormControl = new UntypedFormControl();

  public filteredCombos: ReplaySubject<Combo[]> = new ReplaySubject<Combo[]>(1);

  @ViewChild('singleSelect', { static: true }) singleSelect!: MatSelect;

  protected _onDestroy = new Subject<void>();

  isIndeterminate = false;
  isChecked = false;

  constructor() { }

  ngOnInit() {
    var selectedItem: Combo[] = []
    if (Array.isArray(this.control.value)) {
      this.control.value.forEach(e => {
        var item = this.comboList.filter(s => s.Id == e)[0]
        if (item)
          selectedItem.push(item)
      });
    }
    else
      selectedItem.push({ Id: this.control.value, CodeDesc_Fld: '' })

    this.comboCtrl.setValue(selectedItem);
    if (this.comboList != undefined)
      this.filteredCombos.next(this.comboList.slice());

    this.comboFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterCombos();
      });
    this.showCombo = true
  }

  changeValue(event) {
    if (event) {
      let exValue
      if (Array.isArray(event.value))
        exValue = event.value.map(x => x.Id)
      else
        exValue = event.value.Id
      this.control.patchValue(exValue)
      this.change.emit(exValue)
    }
  }

  ClickSelect(data) {
    if (this.comboList.length > 0) return;
    this.filteredCombos.next(data.slice());
  }

  ngAfterViewInit() {
    this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  protected setInitialValue() {
    this.filteredCombos
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        this.singleSelect.compareWith = (a: Combo, b: Combo) =>
          a && b && a.Id === b.Id;
      });
  }

  protected filterCombos() {
    if (!this.comboList) {
      return;
    }
    let search = this.comboFilterCtrl.value;
    if (!search) {
      this.filteredCombos.next(this.comboList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredCombos.next(
      this.comboList.filter((cbo) => cbo.CodeDesc_Fld.toLowerCase().indexOf(search) > -1)
    );
  }

  toggleSelectAll(selectAllValue: boolean) {
    this.filteredCombos
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe((val) => {
        if (selectAllValue) {
          this.comboCtrl.patchValue(val);
          this.control.patchValue(val.map(x => x.Id))
          this.change.emit(val.map(x => x.Id))
        } else {
          this.comboCtrl.patchValue([]);
          this.control.patchValue([])
          this.change.emit([])
        }
      });
  }
}