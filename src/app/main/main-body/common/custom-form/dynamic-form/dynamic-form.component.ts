import { Component, Input, OnInit } from '@angular/core'
import { UntypedFormGroup } from '@angular/forms'

@Component({
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {

  @Input() formlist
  @Input() parentFormGroup: UntypedFormGroup

  constructor() { }

  ngOnInit(): void {
  }

}
