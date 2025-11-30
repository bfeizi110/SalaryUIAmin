import { FlatTreeControl } from '@angular/cdk/tree'
import { Component, EventEmitter, Input, Output } from '@angular/core'
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree'

import { AlertClass } from 'src/app/main/main-body/common/alert/alert-functions'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { TreeConverter } from './TreeConverter'

const Controller = 'CostCenterTree'

interface ExampleFlatNode {
  expandable: boolean
  name: string
  level: number
  Id
}

@Component({
  selector: 'cost-center-tree',
  templateUrl: './cost-center-tree.component.html',
  styleUrls: ['./cost-center-tree.component.scss']
})

export class CostCenterTreeComponent {

  @Input() CostCenterGroupCode
  @Output() closed = new EventEmitter()

  showBank: boolean = false
  showUnit: boolean = false
  tabChange(index) {
    if (index == 1) this.showBank = true
    if (index == 2) this.showUnit = true
  }

  transformer = (node, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.CodeDesc_Fld,
      level: level,
      Id: node.Id,
      ParentId: node.ParentId_Fld
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(node => node.level, node => node.expandable)

  treeFlattener = new MatTreeFlattener(this.transformer, node => node.level, node => node.expandable, node => node.children)

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  EmptyList: boolean = false
  showTree: boolean = false
  getTree() {
    this.showTree = false
    this.service.getSelect(Controller, this.CostCenterGroupCode).subscribe((res: any) => {
      this.dataSource.data = TreeConverter.setNodeByParentId(res.Data)
      this.treeControl.expandAll()
      this.EmptyList = this.dataSource.data[0].Id == 0
      this.showTree = true
      setTimeout(() => {
        this.service.scrollToElement('form')
      }, 200); 
    })
  }

  activeNode: number
  delete() {
    AlertClass.deleteAlert(_ => {
      this.service.delete(Controller, this.activeNode).subscribe((event: any) => {
        this.closeTab()
        this.showTree = false
        this.dataSource.data = TreeConverter.setNodeByParentId(event.Data)
        this.treeControl.expandAll()
        this.EmptyList = this.dataSource.data[0].Id == 0
        setTimeout(() => this.showTree = true)
      })
    })
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  close() {
    this.closed.emit()
  }

  closeTab() {
    this.showTab = false
    this.activeNode = null
    this.parentId = null
    this.formType = ""
  }

  nodeId
  showTab: boolean = false
  dblClickNode(node) {
    this.nodeId = node.Id
    this.formType = "View"
    this.showTab = true
  }

  parentId: number
  formType: string = ''
  clickNode(node) {
    this.parentId = node.ParentId
    this.activeNode = node.Id
  }

  addNode() {
    this.parentId = this.activeNode
    this.showTab = true
    this.formType = "Add"
  }

  editNode() {
    this.nodeId = this.activeNode
    this.formType = "Edit"
    this.showTab = true
  }

  submited(newData) {
    this.closeTab()
    this.showTree = false
    this.dataSource.data = TreeConverter.setNodeByParentId(newData)
    this.treeControl.expandAll()
    this.EmptyList = this.dataSource.data[0].Id == 0
    setTimeout(() => this.showTree = true)
  }

  constructor(private service: GridFormService) { }

  ngOnChanges(UpdatedValue: string): void {
    this.activeNode = null
    this.EmptyList = false
    this.getTree()
  }

}
