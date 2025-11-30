import { SelectionModel } from '@angular/cdk/collections'
import { FlatTreeControl } from '@angular/cdk/tree'
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree'
import { TreeConverter } from 'src/app/main/pages/detail-info/components/cost-center-info/cost-center-group/tree/tree/body/TreeConverter'
import { ModalOptions } from '../custom-modal/modal-options.interface'
import { GridFormService } from '../grid-form.service'

interface ExampleFlatNode {
  expandable: boolean
  name: string
  level: number
  Id: number
}

@Component({
  selector: 'tree-modal',
  templateUrl: './tree-modal.component.html',
  styleUrls: ['./tree-modal.component.scss']
})

export class TreeModalComponent implements OnInit {

  @Output() closed = new EventEmitter()
  @Output() nodeSelected = new EventEmitter()

  @Input() multiple: boolean
  @Input() type: 'CostCenterTree' | 'OrgStructureTree'

  showModal: boolean = false

  close() {
    this.showModal = false
    this.closed.emit()
  }

  comboList = []
  activeComboId: number
  getCombo() {
    this.service.getCombo(this.type == 'CostCenterTree' ? 'CostCenterGroup' : 'OrgStructure').subscribe((res: any) => {
      this.comboList = res.Data
      this.activeComboId = this.comboList[0].Id
      this.changeCombo(this.comboList[0].Id)
      this.showModal = true
    })
  }

  transformer = (node, level: number) => { return { expandable: !!node.children && node.children.length > 0, name: node.CodeDesc_Fld, level: level, Id: node.Id } }

  treeControl = new FlatTreeControl<ExampleFlatNode>(node => node.level, node => node.expandable)

  treeFlattener = new MatTreeFlattener(this.transformer, node => node.level, node => node.expandable, node => node.children)

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener)

  showTree: boolean = false
  nodeArraybackup = []
  changeCombo(id) {
    this.showTree = false
    this.service.getSelect(this.type == 'OrgStructureTree' ? 'ChartTree' : this.type, id).subscribe((res: any) => {
      this.type == 'CostCenterTree' ? this.dataSource.data = TreeConverter.setNodeByParentId(res.Data) : this.dataSource.data = TreeConverter.setNodeByParentIdOrg(res.Data)
      this.treeControl.expandAll()
      this.showTree = true
      this.nodeArraybackup = res.Data
    })
  }

  dblclick(node) { !this.multiple ? this.nodeSelected.emit(node) : null }

  checklistSelection = new SelectionModel<ExampleFlatNode>(true /* multiple */);

  changeValue(node) {
    let nodeSelected = this.nodeArraybackup.filter(a => a.Id == node.Id)[0]
    let childs: any[] = nodeSelected.children
    if (childs.length > 0) {
      childs.forEach(node => {
        this.nodeIdSelectedArray.includes(node.Id) ? this.nodeIdSelectedArray = this.nodeIdSelectedArray.filter(a => a != node.Id) : this.nodeIdSelectedArray.push(node.Id)
        this.nodeNameSelectedArray.includes(node.name) ? this.nodeNameSelectedArray = this.nodeNameSelectedArray.filter(a => a != node.name) : this.nodeNameSelectedArray.push(node.name)
        //node.selected = true
      })
    }
    else {
      this.nodeIdSelectedArray.includes(node.Id) ? this.nodeIdSelectedArray = this.nodeIdSelectedArray.filter(a => a != node.Id) : this.nodeIdSelectedArray.push(node.Id)
      this.nodeNameSelectedArray.includes(node.name) ? this.nodeNameSelectedArray = this.nodeNameSelectedArray.filter(a => a != node.name) : this.nodeNameSelectedArray.push(node.name)
    }
  }

  /** Toggle the to-do item selection. Select/deselect all the descendants node */
  todoItemSelectionToggle(node): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node)
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants)

    // Force update for the parent
    descendants.forEach(child => this.checklistSelection.isSelected(child))
    this.checkAllParentsSelection(node)
    this.setSelectedNode()
  }

  todoLeafItemSelectionToggle(node): void {
    this.checklistSelection.toggle(node)
    // this.checkAllParentsSelection(node)

    this.setSelectedNode()
  }

  nodeIdSelectedArray = []
  nodeNameSelectedArray = []
  setSelectedNode() {
    this.nodeIdSelectedArray = []
    this.nodeNameSelectedArray = []
    this.checklistSelection.selected.forEach(element => {
      this.nodeIdSelectedArray.push(element.Id)
      this.nodeNameSelectedArray.push(element.name)
    })
    this.nodeSelected.emit({ ids: this.nodeIdSelectedArray, names: this.nodeNameSelectedArray })
  }

  checkAllParentsSelection(node): void {
    let parent: ExampleFlatNode | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent)
      parent = this.getParentNode(parent)
    }
  }

  descendantsAllSelected(node): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.length > 0 && descendants.every(child => {
      return this.checklistSelection.isSelected(child);
    });
    return descAllSelected;
  }

  descendantsPartiallySelected(node): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child => this.checklistSelection.isSelected(child));
    return result && !this.descendantsAllSelected(node);
  }

  checkRootNodeSelection(node): void {
    const nodeSelected = this.checklistSelection.isSelected(node);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.length > 0 && descendants.every(child => {
      return this.checklistSelection.isSelected(child);
    });
    if (nodeSelected && !descAllSelected) {
      this.checklistSelection.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node);
    }
  }


  getParentNode(node): ExampleFlatNode | null {
    const currentLevel = this.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }

  getLevel = (node) => node.level

  modalOptions: ModalOptions
  comboTitle: string
  setModalOption() {
    let modalTitle: string
    if (this.type == 'OrgStructureTree') { modalTitle = 'انتخاب واحد سازمانی'; this.comboTitle = 'انتخاب تشکیلات سازمانی' }
    else { modalTitle = 'انتخاب مرکز هزینه'; this.comboTitle = 'انتخاب گروه مرکز هزینه' }
    this.modalOptions = {
      modatTitle: modalTitle,
      hideCallback: this.close.bind(this),
    }
  }

  filterValue: string
  onKey() { 
    this.filterValue ? this.dataSource.data = this.dataSource.data.filter((option: any) => option.CodeDesc_Fld.includes(this.filterValue)) : this.dataSource.data = this.nodeArraybackup 
  }

  clearFilter() {
    this.filterValue = ''
    this.dataSource.data = this.nodeArraybackup
  }

  selectAllFlag: boolean = false
  selectAll() {
    if (!this.selectAllFlag) {
      for (let i = 0; i < this.treeControl.dataNodes.length; i++) {
        if (!this.checklistSelection.isSelected(this.treeControl.dataNodes[i]))
          this.checklistSelection.toggle(this.treeControl.dataNodes[i]);
        this.treeControl.expand(this.treeControl.dataNodes[i])
      }
      this.selectAllFlag = true
    }
    else {
      for (let i = 0; i < this.treeControl.dataNodes.length; i++) this.checklistSelection.toggle(this.treeControl.dataNodes[i])
      this.selectAllFlag = false
    }
  }

  constructor(private service: GridFormService) { }

  ngOnInit(): void {
    this.setModalOption()
    this.getCombo()
  }

}
