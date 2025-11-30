import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  templateUrl: './checkbox-renderer.component.html',
  styleUrls: ['./checkbox-renderer.component.scss']
})
export class CheckboxRendererComponent implements OnInit {

  @ViewChild('.checkbox', { static: false }) checkbox: ElementRef;

  public params: any;

  value: boolean = false
  agInit(params): void {
    this.value = params.value
  }

  public onChange(event) {
    this.params.data[this.params.colDef.field] = event.currentTarget.checked;
    if (this.params["onchange"] && this.params["onchange"] instanceof Function)
      this.params["onchange"](this.params, event);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
