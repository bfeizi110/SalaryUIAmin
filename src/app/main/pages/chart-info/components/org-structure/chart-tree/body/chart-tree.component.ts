import { FlatTreeControl } from '@angular/cdk/tree'
import { Component, EventEmitter, Input, Output } from '@angular/core'
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree'

import { AlertClass } from 'src/app/main/main-body/common/alert/alert-functions'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { TreeConverter } from 'src/app/main/pages/detail-info/components/cost-center-info/cost-center-group/tree/tree/body/TreeConverter'

const Controller = 'ChartTree'

interface ExampleFlatNode {
  expandable: boolean
  name: string
  level: number
  Id
  Sort: number
}
@Component({
  selector: 'chart-tree',
  templateUrl: './chart-tree.component.html',
  styleUrls: ['./chart-tree.component.scss']
})
export class ChartTreeComponent {

  @Input() chartId: number
  @Output() closed = new EventEmitter()

  transformer = (node, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.CodeDesc_Fld,
      level: level,
      Id: node.Id,
      ParentId: node.ParentID,
      Sort: node.Sort
    }
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(node => node.level, node => node.expandable)

  treeFlattener = new MatTreeFlattener(this.transformer, node => node.level, node => node.expandable, node => node.children)

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener)

  showTree: boolean = false
  EmptyList: boolean = false
  getTree() {
    this.showTree = false
    this.service.getSelect(Controller, this.chartId).subscribe((res: any) => {
      this.EmptyList = res.Data.length == 0
      this.dataSource.data = TreeConverter.setNodeByParentIdOrg(res.Data)
      this.treeControl.expandAll()
      this.showTree = true
      setTimeout(() => {
        this.service.scrollToElement('form')        
      }, 200);
    })
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  close() { this.closed.emit() }

  activeNode: number
  delete() {
    AlertClass.deleteAlert(_ => {
      this.service.delete(Controller, this.activeNode).subscribe((event: any) => {
        this.closeForm()
        this.showTree = false
        this.dataSource.data = TreeConverter.setNodeByParentIdOrg(event.Data)
        this.EmptyList = this.dataSource.data[0].Id == 0
        this.treeControl.expandAll()
        setTimeout(() => this.showTree = true)
      })
    })
  }

  closeForm() {
    this.showForm = false
    this.activeNode = null
    this.parentId = null
    this.formType = ""
  }

  submited(newData) {
    this.closeForm()
    this.showTree = false
    this.dataSource.data = TreeConverter.setNodeByParentIdOrg(newData)
    this.treeControl.expandAll()
    this.EmptyList = this.dataSource.data[0].Id == 0
    setTimeout(() => this.showTree = true)
  }

  showForm: boolean = false
  parentId: number
  sort: number

  formType: string = ''
  clickNode(node) {
    this.parentId = node.ParentId
    this.activeNode = node.Id
    this.sort = node.Sort
  }

  addNode() {
    this.parentId = this.activeNode
    this.showForm = true
    this.formType = "Add"
  }

  editNode() {
    this.showForm = true
    this.formType = "Edit"
  }

  constructor(private service: GridFormService) { }

  ngOnChanges(UpdatedValue: string): void {
    this.activeNode = null
    this.EmptyList = false
    this.getTree()
  }

}
