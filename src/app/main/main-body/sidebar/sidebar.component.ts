import { Component, OnInit, Output, EventEmitter } from '@angular/core'
import * as $ from "jquery"
import { GridFormService } from '../common/grid-form.service'
import { setMenuList } from 'src/app/main/pages/global-attr'
import { Router } from '@angular/router'
import { TreeConverter } from '../../pages/detail-info/components/cost-center-info/cost-center-group/tree/tree/body/TreeConverter'
import { ContextMenuService } from '../common/context-menu.service'
import { Toast, ToastrService } from 'ngx-toastr'

const Controller = 'Menu'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  public menuItems: any[]

  @Output() menuEmitted = new EventEmitter()

  onKey(value: string) { !value ? this.reportMode ? this.menuItems = this.menuItemsReportBackup : this.menuItems = this.menuItemsFilterdBackup : this.reportMode ? this.menuItems = this.menuItemsReportBackup.filter((option: any) => option.CodeDesc_Fld.includes(value)) : this.menuItems = this.menuItemsMainBackup.filter((option: any) => option.children.length == 0 && option.CodeDesc_Fld.includes(value)) }

  getMenu() {
      this.service.get(`${Controller}/GetMenuByUserID`).subscribe((res: any) => this.setMenu(res.Data, 'toLocal'))
  }

  LastSuccessLoginDate: string
  LastSuccessLoginTime: string
  LastUnSuccessLoginDate: string
  LastUnSuccessLoginTime: string
  LastUnSuccessLoginDesc: string

  getLastLoginInfo() {
    this.LastSuccessLoginDate = sessionStorage.getItem('LastSuccessLoginDate')
    this.LastSuccessLoginTime = sessionStorage.getItem('LastSuccessLoginTime')
    this.LastUnSuccessLoginDate = sessionStorage.getItem('LastUnSuccessLoginDate')
    this.LastUnSuccessLoginTime = sessionStorage.getItem('LastUnSuccessLoginTime')
    this.LastUnSuccessLoginDesc = sessionStorage.getItem('LastUnSuccessLoginDesc')
    if (this.LastUnSuccessLoginDate != "")
    {  
      // this.toastr.toastrConfig.oncl
      this.toastr.warning(`آخرین تلاش ناموفق جهت ورود : ${this.LastUnSuccessLoginDate} ساعت ${this.LastUnSuccessLoginTime} ${this.LastUnSuccessLoginDesc}`, '', 
        {
          tapToDismiss: true,
          disableTimeOut: true,
          positionClass : 'toast-top-right',
        }).onHidden.subscribe(_ => this.service.get(`Users/ClearUnSuccessLogin`).subscribe(_ => 
          {
            sessionStorage.setItem('LastUnSuccessLoginDate', '')
            sessionStorage.setItem('LastUnSuccessLoginTime', '')
            sessionStorage.setItem('LastUnSuccessLoginDesc', '')            
          }
        )); 
      }
  }

  menuItemsMainBackup = []
  menuItemsFilterdBackup = []
  setMenu(data, type?) {
    if (type == 'toLocal') {
      data.map(menu => menu.Path = `main/${menu.Path}`)
      setMenuList(data)
    }
    this.service.menuList = data
    this.menuItemsMainBackup = data
    this.menuItems = TreeConverter.menuConvertor(data)
    this.menuItemsFilterdBackup = this.menuItems
    this.menuEmitted.emit(data)
  }

  activeItem: any
  menuItemsReportBackup = []
  openTab(item) {
    if (this.reportMode) {
      this.service.get(`SystemReport/GetByID/${item.Id}/${item.Type_Fld}`).subscribe((res: any) => {
        res.Data.map(menuItem => menuItem.Path = `main/${menuItem.Path}/${menuItem.Id}`)
        this.service.passDataSubject(res.Data[0])
        sessionStorage.setItem('reportId', res.Data[0].Id)
      })
    }
    else {
      if (item.Path.includes('show-report')) {
        this.service.get('SystemReport/GetSelect/null').subscribe((res: any) => {
          this.reportMode = true
          this.menuItems = res.Data
          this.menuItemsReportBackup = res.Data
        })
      }
      else {
        this.contextMenuService.id = null
        if (item.children && item.children.length > 0) return
        this.activeItem = item
        this.service.passDataSubject(item)
        item.UseManualForm_Fld && item.FormID_Fld ? sessionStorage.setItem('formId', item.FormID_Fld) : null 
      }
    }
  }

  returnToNormal() {
    this.reportMode = false
    this.menuItems = this.menuItemsFilterdBackup
  }

  constructor(private service: GridFormService, private router: Router, private contextMenuService: ContextMenuService, private toastr: ToastrService) { }

  activeUrl: string
  ngOnInit() {
    $.getScript('./assets/js/app-sidebar.js')
    this.getMenu()
    this.getLastLoginInfo()
    this.activeUrl = this.router.url.replace('/', '')
    this.changeActiveTabByMain()
  }

  changeActiveTabByMain() { this.service.currentMessageBack.subscribe(menuItem => { this.activeUrl = menuItem.Path }) }

  reportMode: boolean = false
  sidebarWidth

}
