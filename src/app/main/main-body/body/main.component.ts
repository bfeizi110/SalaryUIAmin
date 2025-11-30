import { Component, OnInit, Renderer2 } from '@angular/core'
import { Router } from '@angular/router'
import { Location } from '@angular/common'
import { ITab } from '../tab/ITab'
import { GridFormService } from '../common/grid-form.service'
import { ContextMenuService } from '../common/context-menu.service'
import { ToastrService } from 'ngx-toastr'
import { ModalOptions } from '../common/custom-modal/modal-options.interface'

@Component({
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent implements OnInit {

  tabList: ITab[] = []
  menuList: ITab[] = []
  activeTab: ITab
  activeTabIndex: number
  showModal: boolean = false
  ShowControllerName: string
  ShowData: any
  faqTab(tab: any)
  {
    this.modalOptions = {
      formType: 'View',
      notDisabledInViewMode: true,
      notchangemodaltitle: true,
      modatTitle: 'پرسش و پاسخهای مرتبط با ' + tab.CodeDesc_Fld,
      hideCallback: this.closeModal.bind(this),
    }   
    this.ShowControllerName = tab.Controller
    this.service.get(`Faq/GetFormFaQList/${this.ShowControllerName}`).subscribe((res: any) => {
      if (res.Data.length == 0)
        this.toastr.info('فاقد اطلاعات پرسش و پاسخ')
      else
      {
        this.ShowData = res.Data
        this.showModal = true
      }
    })

  }
  menuEmitted(menu) {
    this.menuList = menu
    this.menuList.map(p => p.Show = true)

    let pathFromTopPage: string = this.router.url
    if (pathFromTopPage.includes('report/report-design-view')) pathFromTopPage = '/main/kartable'
    this.addTabToTabList(pathFromTopPage)
    this.activeTabIndex = 0
    this.activeTabUrl = pathFromTopPage
    this.router.navigateByUrl(this.activeTabUrl)
  }

  activeTabUrl
  addTabToTabList(url: string) {
    url = url.replace('/', '')
    this.activeTab = this.menuList.find(menuList => menuList.Path == url)
    if (!this.activeTab) 
      {
        this.service.post(`Audit/Create`, {ParentID: url}).subscribe();
        return this.toastr.error('شما به این بخش دسترسی ندارید', 'خطا')
      }
    this.tabList.push(this.activeTab) // main/dashboard
  }

  isExsist(menuItem): boolean { return menuItem.Path.includes('/report-design-view/') ? this.tabList.filter(a => JSON.stringify(a) === JSON.stringify(menuItem)).length == 1 : this.tabList.includes(menuItem) }

  findItemByUrlInMenuList(url: string): ITab { return this.tabList.find(tab => tab.Path === url) }

  showTabs = false
  public activePageTitle: string = ''
  constructor(private router: Router, private location: Location, private service: GridFormService, private contextMenuService: ContextMenuService, private toastr: ToastrService, private renderer: Renderer2) { }
  ShowTab: boolean = false
  modalOptions : ModalOptions
  ngOnInit() {
    // this.renderer.listen('document', 'click', () => {
    //   this.toastr.clear(); // This will remove all toasts
    // });
    this.service.currentMessage.subscribe(menuItem => {
      if (this.isExsist(menuItem)) {
        this.activeTab = menuItem
        this.activeTabUrl = menuItem.Path
        if (menuItem.Path.includes('/report-design-view/')) 
           this.activeTabIndex = this.tabList.indexOf(this.tabList.filter(a => JSON.stringify(a) === JSON.stringify(menuItem))[0]) 
        else
          this.activeTabIndex = this.tabList.indexOf(this.activeTab)
      }
      else {
        this.tabList.push(menuItem)
        this.activeTab = menuItem
        this.activeTabUrl = menuItem.Path
        this.activeTabIndex = this.tabList.length - 1
        this.activeTab.Path = `${this.activeTab.Path}`
        setTimeout(() => this.router.navigateByUrl(`${this.activeTabUrl}`), 500)
      }
    })
    this.contextMenuService.currentMessageAggrid.subscribe(menu => {
      let menuItem = menu
      let id = this.contextMenuService.id
      if (this.isExsist(menuItem)) {
        this.activeTab = menuItem
        this.activeTabUrl = menuItem.Path
        this.activeTabIndex = this.tabList.indexOf(this.activeTab)
      }
      else {
        this.tabList.push(menuItem)
        this.activeTab = menuItem
        this.activeTabUrl = menuItem.Path
        this.activeTabIndex = this.tabList.length - 1
        this.activeTab.Path = `${this.activeTab.Path}`
        setTimeout(() => this.router.navigateByUrl(`${this.activeTabUrl}`), 500)
      }
    })
    this.ShowTab = true
  }
  
  closeModal() {
    this.showModal = false
  }

  reloadTab(tab, tabIndex) {
    this.tabList[tabIndex].Show = false

    // this.deleteTab(tabIndex)
    // setTimeout(() => {
    //   this.addTabToTabList(`/${tab.Path}`)
    //   this.location.replaceState(this.activeTab.Path)
    //   this.activeTabIndex = this.tabList.length - 1
    //   this.activeTab = this.tabList[this.activeTabIndex]
    //   this.router.navigateByUrl(`${this.activeTabUrl}`)
    // }, 500)
    setTimeout(() => {
      this.tabList[tabIndex].Show = true
    }, 500); 

  }

  openHelp(index: number, event: Event) {

    if (index == this.tabList.length) this.activeTabIndex = this.activeTabIndex - 1
    else {
      this.activeTab = this.tabList[this.activeTabIndex - 1]
      this.activeTabIndex = this.activeTabIndex - 1
      this.service.passDataSubjectBack(this.activeTab)
    }
    event.preventDefault()
  }

  closeTab(index: number, event: Event) {
    this.deleteTab(index)
    if (index == this.tabList.length) this.activeTabIndex = this.activeTabIndex - 1
    else {
      this.activeTab = this.tabList[this.activeTabIndex - 1]
      this.activeTabIndex = this.activeTabIndex - 1
      this.service.passDataSubjectBack(this.activeTab)
    }
    event.preventDefault()
  }

  deleteTab(index: number) { this.tabList.splice(index, 1) }

  onTabChange(e) {
    this.activeTabIndex = e.index
    this.activeTab = this.tabList[this.activeTabIndex]
    this.location.replaceState(`${this.activeTab.Path}`)
    this.service.passDataSubjectBack(this.activeTab)
    this.service.passDataSubjectReport(this.activeTab.Path)
  }

}
