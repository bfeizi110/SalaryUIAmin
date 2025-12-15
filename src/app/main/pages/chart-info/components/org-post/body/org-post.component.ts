import { Component, OnInit } from '@angular/core'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { FlatTreeControl } from '@angular/cdk/tree'
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree'
import { OrgPostAttr, setOrgPostAttr } from 'src/app/main/pages/global-attr'
import { CustomGridOption } from 'src/app/main/main-body/common/custom-ag-grid/interfaces/ag-grid-option.interface'
import { AlertClass } from 'src/app/main/main-body/common/alert/alert-functions'
import { TreeConverter } from 'src/app/main/pages/detail-info/components/cost-center-info/cost-center-group/tree/tree/body/TreeConverter'

interface ExampleFlatNode {
  expandable: boolean
  name: string
  level: number
  Id
}

const Controller = 'Post'

@Component({
  templateUrl: './org-post.component.html',
  styleUrls: ['./org-post.component.scss']
})

export class OrgPostComponent implements OnInit {

  chartArray = []
  AllInfo: boolean = false
  clickEmp() { this.chartArray.length == 0 ? this.service.getCombo('OrgStructure').subscribe((res: any) => this.chartArray = res.Data) : null }

  changeCheckbox(checked){
    this.AllInfo = checked
    this.gridOption = this.AllInfo ? this.gridOptionWithoutAdd : this.gridOptionWithAdd
    this.getAttr()
    this.getSelect()
  }

  transformer = (node, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.CodeDesc_Fld,
      level: level,
      Id: node.Id,
      ParentId: node.ParentID
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(node => node.level, node => node.expandable)

  treeFlattener = new MatTreeFlattener(this.transformer, node => node.level, node => node.expandable, node => node.children)

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  showTree: boolean = false
  chartId: number = -1
  getTree() {
    this.showGrid = false
    this.showTree = false
    this.service.getSelect(`ChartTree`, this.chartId).subscribe((res: any) => {
      this.dataSource.data = TreeConverter.setNodeByParentIdOrg(res.Data)
      this.treeControl.expandAll()
      this.showTree = true
    })
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  activeNode: number = 0

  showForm: boolean = false
  clickNode(node) {
    this.activeNode = node.Id
    this.getAttr()
  }

  showGrid: boolean = false

  formType: string = ''
  gridOptionWithAdd = <CustomGridOption>{
    actions: [
      {
        label: 'Edit',
        callback: this.edit.bind(this),
      },
      {
        label: 'Delete',
        callback: this.delete.bind(this)
      },
      {
        label: 'Add',
        callback: this.add.bind(this),
      }
    ],
    controllerName: Controller,
    rowClicked: this.view.bind(this)
  }
  gridOptionWithoutAdd= <CustomGridOption>{
    actions: [
      {
        label: 'Edit',
        callback: this.edit.bind(this),
      },
      {
        label: 'Delete',
        callback: this.delete.bind(this)
      },
    ],
    controllerName: Controller,
    rowClicked: this.view.bind(this)
  }
  gridOption: any = this.gridOptionWithAdd

  formObj: any
  getAttr() {
    !OrgPostAttr
      ? this.service.getAttr(Controller).subscribe((res: any) => this.setAttr(res.Data, 'toLocal'))
      : this.setAttr(OrgPostAttr)
  }

  setAttr(attr, type?) {
    this.gridOption.columnDefs = attr
    this.formObj = attr.EntityAttribute
    type == 'toLocal' ? setOrgPostAttr(attr) : null
    this.getSelect()
  }

  getSelect() {
    this.showGrid = false
    this.service.getSelect(Controller, this.AllInfo ? "0" : this.activeNode, this.chartId.toString()).subscribe((res: any) => {
      this.gridOption.rowData = res.Data
      setTimeout(() => {
        this.showGrid = true
      }, 400);
    })
  }

  add() {
    this.showForm = true
    this.formType = 'Add'
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
        setTimeout(() => this.showGrid = true, 100)
      })
    })
  }

  submited(newData) {
    this.closeForm()
    if (!newData) return
    this.showGrid = false
    this.gridOption.rowData = newData
    setTimeout(() => this.showGrid = true, 100)
  }

  closeForm() {
    this.formType = ''
    this.showForm = false
  }

  constructor(private service: GridFormService) { }

  ngOnInit(): void {
  }

}
