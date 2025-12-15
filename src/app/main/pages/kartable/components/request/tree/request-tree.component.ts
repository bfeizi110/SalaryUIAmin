import { BreakpointObserver } from '@angular/cdk/layout';
import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, EventEmitter, HostListener, Output, ViewChild } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service';

interface RequestNode {
  CodeDesc_Fld: string;
  Icon_Fld?: string;
  Child?: RequestNode[];
}

const Controller = 'PersonHghRequest'

@Component({
  selector: 'request-tree',
  templateUrl: './request-tree.component.html',
  styleUrls: ['./request-tree.component.scss'],
})
export class RequestTreeComponent {
  @Output() done = new EventEmitter()
  @Output() isMobile = new EventEmitter<boolean>();
  treeControl = new NestedTreeControl<RequestNode>((node) => node.Child);
  dataSource = new MatTreeNestedDataSource<RequestNode>();
  showIconsAndMenu: boolean = false;
  public activeNode = 2;
  isExpanded:boolean;
  constructor(private service: GridFormService,private observer: BreakpointObserver) {
    let TREE_DATA: any
    this.service.get(`${Controller}/GetTree`).subscribe((res: any) =>
    {
      TREE_DATA = res.Data
      this.dataSource.data = TREE_DATA;
    }
      )
    // this.treeControl.expandAll();
    this.checkScreenSize(window.innerWidth);
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.checkScreenSize(event.target.innerWidth);
  }
isMobail:boolean=false;
showimg:boolean=true
  checkScreenSize(width: number) {
    if (width< 1138) {
      this.isExpanded = true;
      this.showimg=true;
    } else {
      this.isExpanded = false;
      this.showimg=true;
    }
    if (width <717) {
      this.isMobail = true;
      this.showimg=false;
    } else {
      this.isMobail = false;
    }
    if(width <576){
      this.isMobail = false;
      this.isExpanded = false;
      this.showimg=true;
    }
  }

  ngOnInit() {
  //  this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
  //     if (screenSize.matches) {
  //       this.isExpanded=false;
  //       this.isMobile.emit(true);
  //     } else {
  //       this.isExpanded=true;
  //       this.isMobile.emit(false);
  //     }
  //   });
  }

  hasChild = (_: number, node: RequestNode) => !!node.Child && node.Child.length > 0;

  @ViewChild('tree') tree

  ngAfterViewInit() {
    // this.tree.treeControl.expandAll();
  }
  menuEnter() {
    console.log('enter-menu');
    this.showIconsAndMenu = true;
  }

  submit($event){
    this.activeNode = $event.Code_Fld
    this.done.emit($event.Code_Fld)
  }
  menuLeave() {
    console.log('leave-menu');
    this.showIconsAndMenu = this.showIconsAndMenu!;
  }

  clickItem() {
    this.showIconsAndMenu = false;
  }
}

