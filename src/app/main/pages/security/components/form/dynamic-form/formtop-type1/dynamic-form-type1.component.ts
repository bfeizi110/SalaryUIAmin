import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

export class DetailFormDto {
  constructor(
    public FormID_Fld?: number,
    public FormType_Fld?: number,
    public TabName_Fld?: string,
    public IndexStr_Fld?: string,
    public Level_Fld?: number,
    public MasterDetailID_Fld?: number,
    public TabDetailFormDto: DetailFormDto[] = []
  ) {}
}
const Controller = 'Form'
@Component({
  selector: 'dynamic-form-type1',
  templateUrl: './dynamic-form-type1.component.html',
  styleUrls: ['./dynamic-form-type1.component.scss']
})
export class DynamicFormType1Component implements OnInit {
  @Input() FormID: number
  @Input() WorkFlowID: number
  @Input() RequestEntryInfo: any
  @Input() FormType: string = 'View'
  @Input() ID: number
  @Input() ButtonList: any[]
  @Output() closed = new EventEmitter()
  @Output() done = new EventEmitter()
  @Output() buttonListDone = new EventEmitter()
  // @Output() clicked = new EventEmitter()

  ParentID: number

  clickButtonList(code: number){
    this.buttonListDone.emit(code)
  }

  cloneDetailFormDto(original: DetailFormDto) {
    return new DetailFormDto(
      original.FormID_Fld,
      original.FormType_Fld,
      original.TabName_Fld,
      original.IndexStr_Fld,
      original.Level_Fld,
      original.MasterDetailID_Fld,
      original.TabDetailFormDto && original.TabDetailFormDto.length>0 ? original.TabDetailFormDto.map(child => this.cloneDetailFormDto(child)) : original.TabDetailFormDto // recursive clone
    );
  }
  
  addChildrenAtPath(root: any, path: number[], newNode: any) 
  {
    let currentNode: any;
    let Idx: number = 0

    for (const index of path) {
      if (index == 0 && Idx == 0)
        currentNode = root
      else
      {
        if (
          currentNode.TabDetailFormDto &&
          currentNode.TabDetailFormDto.length > index
        ) {
          currentNode = currentNode.TabDetailFormDto[index];
        } else {
          // If the path is invalid, stop and return original tree
          return root;
        }
      }
      ++Idx
    }
  
    if (!currentNode.TabDetailFormDto) 
    {
      currentNode.TabDetailFormDto = [];
    }
  
    currentNode.TabDetailFormDto = newNode;
  
    return root; // Return updated tree
  }

  deleteAllDescendants(root: any, path: number[]): void {
    let currentNode: any ;
    let Idx: number = 0

    for (const index of path) {
      if (index == 0 && Idx == 0)
        currentNode = root
      else
      {
        if (currentNode.TabDetailFormDto && currentNode.TabDetailFormDto.length > index) 
        {
          currentNode = currentNode.TabDetailFormDto[index];
        } else {
          return; // Invalid path, do nothing
        }
      }
      ++Idx
    }
  
    // Clear all children of the target node
    currentNode.TabDetailFormDto = null;
    return root;
  }
  getNodeWithDescendants(root: any, path: number[]){
    let currentNode: any = root;
    let Idx: number = 0

    for (const index of path) {
      if (index == 0 && Idx == 0)
      {
        currentNode = root
      }
      else
      {
        if (
          currentNode.TabDetailFormDto &&
          currentNode.TabDetailFormDto.length > index
        ) {
          currentNode = currentNode.TabDetailFormDto[index];
        } else {
          return null; // Invalid path
        }
      }
      ++Idx
    }
  
    return currentNode.TabDetailFormDto;
  } 
  
  getNodeWithOneLevel(root: any, path: number[]): any[] {
    let currentNode: any ;
    let Idx: number = 0

    for (const index of path) {
      if (index == 0 && Idx == 0)
        currentNode = this.cloneDetailFormDto(root)
      else
        if (
          currentNode.TabDetailFormDto &&
          currentNode.TabDetailFormDto.length > index
        ) {
          currentNode = currentNode.TabDetailFormDto[index];
        } else {
          return null; // Invalid path
        }
      ++Idx
    }
    
    if (currentNode.TabDetailFormDto)
    {
      currentNode.TabDetailFormDto.forEach(element => {
        element.TabDetailFormDto = null
      });
      return currentNode.TabDetailFormDto || null;
    }
    else
      return null;
  }

  rowclicked(newData:any)
  {
    if (!newData) return
    if (newData.FormID)
    {
      let path: number[] = []
      if (newData.IndexStr != '0')
      {
      path = newData.IndexStr.split(',').map(str => Number(str.trim())).filter(num => !isNaN(num));
      //path.shift();
      }
      else
        path.push(0)

      this.TabDetailForm = this.deleteAllDescendants(this.TabDetailForm, path)
      let TabDetailFormTemp = this.getNodeWithOneLevel(this.TabDetailFormMain, path)
      if (!TabDetailFormTemp)
        return 

      if (newData.data && newData.data.Id)
        this.ParentID = newData.data.Id

        of(null).pipe(
          delay(0)
        ).subscribe(() => {
          TabDetailFormTemp = this.addChildrenAtPath(this.TabDetailForm, path, TabDetailFormTemp)
          this.TabDetailForm = TabDetailFormTemp
        });
    }
  }

  submited(newData:any) {
    this.closeForm()
    this.done.emit(newData)
    if (!newData) return
    setTimeout(() => {
      this.IsMaster = true
    })
  }

  closeForm() {
    // this.IsMaster = false
    // this.IsDetail = false
    this.closed.emit()
  }

  IsMaster: boolean = false
  MasterFormID: number
  DynamicMasterFormType: number
  TabDetailForm: any
  TabDetailFormMain: any

  data: any
  setForm(){
    this.service.get(`${Controller}/GetMasterDetail/${this.FormID}`).toPromise().then((res: any) => {
      if (res)
      {
        this.MasterFormID = res.Data.FormID_Fld
        this.DynamicMasterFormType = res.Data.FormType_Fld
        this.IsMaster = true
        this.TabDetailFormMain = res.Data
        let TabDetailFormTemp = this.cloneDetailFormDto(this.TabDetailFormMain)
        TabDetailFormTemp.TabDetailFormDto = null
        this.TabDetailForm = TabDetailFormTemp 
      }
    })
  }
  constructor(private service: GridFormService) { }
  
  ngOnInit() { 
    this.setForm()
  }
}
