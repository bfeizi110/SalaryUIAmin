import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { CookieService } from 'ngx-cookie-service'
import { Component, OnInit } from '@angular/core'
import * as $ from 'jquery'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'customizer',
  templateUrl: './customizer.component.html',
  styleUrls: ['./customizer.component.scss']
})
export class CustomizerComponent implements OnInit {

  selectedTheme
  isDefault: boolean = false
  changeTheme() {
    //this.selectedItemColor = null
    let engName: string = this.selectedTheme.engName
    switch (engName) {
      case 'default-1-hr':
        this.colorModelList = this.colorModelDefault1HrList
        this.colorModelList.forEach(element => element.colorModel.forEach(e => this.changeElementColor(e)))
        this.isDefault = false
        break;
      case 'default-2':
        this.colorModelList = this.colorModelDefault2List
        this.colorModelList.forEach(element => element.colorModel.forEach(e => this.changeElementColor(e)))
        this.isDefault = false
        break;
      case 'default-3':
        this.colorModelList = this.colorModelDefault3List
        this.colorModelList.forEach(element => element.colorModel.forEach(e => this.changeElementColor(e)))
        this.isDefault = false
        break;
      case 'custom-1':
        this.isDefault = true
        let list = sessionStorage.getItem('activeThemeList')
        if (list) {
          this.colorModelList = JSON.parse(list)
          this.colorModelList.forEach(element => element.colorModel.forEach(e => this.changeElementColor(e)))
        }
        else this.colorModelList.forEach(element => element.colorModel.forEach(e => this.changeElementColor(e)))
    }
    this.service.post('Users/PutLastTheme', { CodeDesc_Fld: this.selectedTheme.engName }).subscribe(_ => sessionStorage.setItem('activeThemeType', JSON.stringify(this.selectedTheme)))
  }

  selectedItemColor
  colorModelDefaultList = [
    {
      groupName: 'تم های پیش فرض',
      colorModel: [
        {
          perName: 'پیش فرض 1 (کارگزینی)',
          engName: 'default-1-hr'
        },
        {
          perName: 'پیش فرض 2',
          engName: 'default-2'
        },
        {
          perName: 'پیش فرض 3',
          engName: 'default-3'
        }
      ]
    },
    {
      groupName: 'تم های دستی',
      colorModel: [
        {
          perName: 'دستی 1',
          engName: 'custom-1'
        }
      ]
    }
  ]

  colorModelList: ColorModelGroup[] = []

  colorModelDefault1HrList: ColorModelGroup[] = [
    {
      groupName: 'منو کناری',
      colorModel: [
        {
          color: '#1159b9',
          perName: 'منو کناری',
          engName: 'sidebar'
        },
        {
          color: 'white',
          perName: 'متن منو کناری',
          engName: 'sidebar-text'
        },
      ]
    },
    {
      groupName: 'نوار بالایی',
      colorModel: [
        {
          color: '#264dff',
          perName: 'نوار بالایی',
          engName: 'navbar'
        },
        {
          color: 'white',
          perName: 'متن نوار بالایی',
          engName: 'navbar-text'
        },
        {
          color: 'white',
          perName: 'دکمه نوار بالایی',
          engName: 'navbar-text-button'
        },
      ]
    },
    {
      groupName: 'بدنه برنامه',
      colorModel: [
        {
          color: '#bcddff',
          perName: 'برنامه',
          engName: 'body'
        },
        {
          color: '#a0dcff',
          perName: 'تب',
          engName: 'tab'
        },
        {
          color: 'black',
          perName: 'متن تب',
          engName: 'tab-text'
        },
        {
          color: 'white',
          perName: 'کارت',
          engName: 'card'
        },
        {
          color: '#67d5ff',
          perName: 'فیلتر پیشرفته پرسنل',
          engName: 'personnel-filter'
        },
        {
          color: 'black',
          perName: 'متن فیلتر پیشرفته پرسنل',
          engName: 'personnel-filter-text'
        },
        {
          color: '#61a0ff',
          perName: 'انتخاب پرسنل',
          engName: 'select-personnel'
        },
        {
          color: 'black',
          perName: 'متن انتخاب پرسنل',
          engName: 'select-personnel-text'
        },
        {
          color: '#020081',
          perName: 'متن پرسنل انتخاب شده',
          engName: 'select-personnel-selected'
        }
      ]
    },
    {
      groupName: 'جداول',
      colorModel: [
        {
          color: '#060858',
          perName: 'گروه بندی',
          engName: 'group-grid'
        },
        {
          color: 'white',
          perName: 'متن گروه بندی',
          engName: 'grid-group-text'
        },
        {
          color: '#082799',
          perName: 'ستون',
          engName: 'grid-header'
        },
        {
          color: 'white',
          perName: 'متن ستون',
          engName: 'grid-header-text'
        },
        {
          color: '#0a0c56',
          perName: 'ستون فعال',
          engName: 'grid-header-active'
        },
        {
          color: 'ستون',
          perName: 'متن ستون فعال',
          engName: 'grid-header-active-text'
        },
        {
          color: '#0643cb6e',
          perName: 'فیلتر شناور',
          engName: 'grid-float-filter'
        },
        {
          color: '#0030b7',
          perName: 'منوی سمت راست',
          engName: 'grid-sidebar'
        },
        {
          color: 'white',
          perName: 'متن منوی سمت راست',
          engName: 'grid-sidebar-text'
        },
        {
          color: '#0d6efd',
          perName: 'هاور روی سطر',
          engName: 'grid-row-hover'
        },
        {
          color: 'black',
          perName: 'متن هاور روی سطر',
          engName: 'grid-row-hover-text'
        },
        {
          color: '#174164',
          perName: 'کلیک روی سطر',
          engName: 'grid-click-row'
        },
        {
          color: 'white',
          perName: 'متن کلیک روی سطر',
          engName: 'grid-click-row-text'
        },
        {
          color: 'white',
          perName: 'سطر انتخاب شده',
          engName: 'grid-selected-row-text'
        },
        {
          color: 'black',
          perName: 'متن سطر انتخاب شده',
          engName: 'grid-selected-row-text'
        },
      ]
    },
    {
      groupName: 'دکمه ها',
      colorModel: [
        {
          color: 'blue',
          perName: 'ذخیره',
          engName: 'save-button'
        },
        {
          color: 'white',
          perName: 'متن دکمه ذخیره',
          engName: 'save-button-text'
        }
      ]
    },
    {
      groupName: 'فرم',
      colorModel: [
        {
          color: '#dee6ff',
          perName: 'فرم',
          engName: 'form'
        }
      ]
    },
    {
      groupName: 'متفرقه',
      colorModel: [
        {
          color: '#003a80',
          perName: 'رنگ های فعال برای خط ها و...',
          engName: 'active'
        }
      ]
    },
  ]

  colorModelDefault2List: ColorModelGroup[] = [
    {
      groupName: 'منو کناری',
      colorModel: [
        {
          color: '#2f646a',
          perName: 'منو کناری',
          engName: 'sidebar'
        },
        {
          color: 'white',
          perName: 'متن منو کناری',
          engName: 'sidebar-text'
        },
      ]
    },
    {
      groupName: 'نوار بالایی',
      colorModel: [
        {
          color: '#81bcbf',
          perName: 'نوار بالایی',
          engName: 'navbar'
        },
        {
          color: 'black',
          perName: 'متن نوار بالایی',
          engName: 'navbar-text'
        },
        {
          color: '#08562c',
          perName: 'دکمه نوار بالایی',
          engName: 'navbar-text-button'
        },
      ]
    },
    {
      groupName: 'بدنه برنامه',
      colorModel: [
        {
          color: '#4dc09b',
          perName: 'برنامه',
          engName: 'body'
        },
        {
          color: '#dffdeb',
          perName: 'تب',
          engName: 'tab'
        },
        {
          color: 'black',
          perName: 'متن تب',
          engName: 'tab-text'
        },
        {
          color: 'white',
          perName: 'کارت',
          engName: 'card'
        },
        {
          color: '#f7d9ff',
          perName: 'فیلتر پیشرفته پرسنل',
          engName: 'personnel-filter'
        },
        {
          color: 'black',
          perName: 'متن فیلتر پیشرفته پرسنل',
          engName: 'personnel-filter-text'
        },
        {
          color: '#bdbdbd',
          perName: 'انتخاب پرسنل',
          engName: 'select-personnel'
        },
        {
          color: 'black',
          perName: 'متن انتخاب پرسنل',
          engName: 'select-personnel-text'
        },
        {
          color: 'green',
          perName: 'متن پرسنل انتخاب شده',
          engName: 'select-personnel-selected'
        }
      ]
    },
    {
      groupName: 'جداول',
      colorModel: [
        {
          color: '#1b685c',
          perName: 'گروه بندی',
          engName: 'group-grid'
        },
        {
          color: 'white',
          perName: 'متن گروه بندی',
          engName: 'grid-group-text'
        },
        {
          color: '#144644',
          perName: 'ستون',
          engName: 'grid-header'
        },
        {
          color: 'white',
          perName: 'متن ستون',
          engName: 'grid-header-text'
        },
        {
          color: 'green',
          perName: 'ستون فعال',
          engName: 'grid-header-active'
        },
        {
          color: 'black',
          perName: 'متن ستون فعال',
          engName: 'grid-header-active-text'
        },
        {
          color: '#178c5b6e',
          perName: 'فیلتر شناور',
          engName: 'grid-float-filter'
        },
        {
          color: '#174435',
          perName: 'منوی سمت راست',
          engName: 'grid-sidebar'
        },
        {
          color: 'white',
          perName: 'متن منوی سمت راست',
          engName: 'grid-sidebar-text'
        },
        {
          color: 'green',
          perName: 'هاور روی سطر',
          engName: 'grid-row-hover'
        },
        {
          color: 'black',
          perName: 'متن هاور روی سطر',
          engName: 'grid-row-hover-text'
        },
        {
          color: '#093d25',
          perName: 'کلیک روی سطر',
          engName: 'grid-click-row'
        },
        {
          color: 'white',
          perName: 'متن کلیک روی سطر',
          engName: 'grid-click-row-text'
        },
        {
          color: 'white',
          perName: 'سطر انتخاب شده',
          engName: 'grid-selected-row-text'
        },
        {
          color: 'black',
          perName: 'متن سطر انتخاب شده',
          engName: 'grid-selected-row-text'
        },
      ]
    },
    {
      groupName: 'دکمه ها',
      colorModel: [
        {
          color: 'blue',
          perName: 'ذخیره',
          engName: 'save-button'
        },
        {
          color: 'white',
          perName: 'متن دکمه ذخیره',
          engName: 'save-button-text'
        }
      ]
    },
    {
      groupName: 'فرم',
      colorModel: [
        {
          color: '#dee6ff',
          perName: 'فرم',
          engName: 'form'
        }
      ]
    },
    {
      groupName: 'متفرقه',
      colorModel: [
        {
          color: 'green',
          perName: 'رنگ های فعال برای خط ها و...',
          engName: 'active'
        }
      ]
    },
  ]

  colorModelDefault3List: ColorModelGroup[] = [
    {
      groupName: 'منو کناری',
      colorModel: [
        {
          color: '#56215c',
          perName: 'منو کناری',
          engName: 'sidebar'
        },
        {
          color: 'white',
          perName: 'متن منو کناری',
          engName: 'sidebar-text'
        },
      ]
    },
    {
      groupName: 'نوار بالایی',
      colorModel: [
        {
          color: '#5d007a',
          perName: 'نوار بالایی',
          engName: 'navbar'
        },
        {
          color: 'white',
          perName: 'متن نوار بالایی',
          engName: 'navbar-text'
        },
        {
          color: '#ffffff',
          perName: 'دکمه نوار بالایی',
          engName: 'navbar-text-button'
        },
      ]
    },
    {
      groupName: 'بدنه برنامه',
      colorModel: [
        {
          color: '#660091',
          perName: 'برنامه',
          engName: 'body'
        },
        {
          color: '#f5d6ff',
          perName: 'تب',
          engName: 'tab'
        },
        {
          color: 'black',
          perName: 'متن تب',
          engName: 'tab-text'
        },
        {
          color: 'white',
          perName: 'کارت',
          engName: 'card'
        },
        {
          color: '#da5dfb',
          perName: 'فیلتر پیشرفته پرسنل',
          engName: 'personnel-filter'
        },
        {
          color: 'black',
          perName: 'متن فیلتر پیشرفته پرسنل',
          engName: 'personnel-filter-text'
        },
        {
          color: '#c789ff',
          perName: 'انتخاب پرسنل',
          engName: 'select-personnel'
        },
        {
          color: 'black',
          perName: 'متن انتخاب پرسنل',
          engName: 'select-personnel-text'
        },
        {
          color: '#3a0264',
          perName: 'متن پرسنل انتخاب شده',
          engName: 'select-personnel-selected'
        }
      ]
    },
    {
      groupName: 'جداول',
      colorModel: [
        {
          color: '#6b0685',
          perName: 'گروه بندی',
          engName: 'group-grid'
        },
        {
          color: 'white',
          perName: 'متن گروه بندی',
          engName: 'grid-group-text'
        },
        {
          color: '#51086e',
          perName: 'ستون',
          engName: 'grid-header'
        },
        {
          color: 'white',
          perName: 'متن ستون',
          engName: 'grid-header-text'
        },
        {
          color: '#660080',
          perName: 'ستون فعال',
          engName: 'grid-header-active'
        },
        {
          color: 'white',
          perName: 'متن ستون فعال',
          engName: 'grid-header-active-text'
        },
        {
          color: '#5400896e',
          perName: 'فیلتر شناور',
          engName: 'grid-float-filter'
        },
        {
          color: '#7526a5',
          perName: 'منوی سمت راست',
          engName: 'grid-sidebar'
        },
        {
          color: 'white',
          perName: 'متن منوی سمت راست',
          engName: 'grid-sidebar-text'
        },
        {
          color: '#ec85f3',
          perName: 'هاور روی سطر',
          engName: 'grid-row-hover'
        },
        {
          color: 'black',
          perName: 'متن هاور روی سطر',
          engName: 'grid-row-hover-text'
        },
        {
          color: '#470463',
          perName: 'کلیک روی سطر',
          engName: 'grid-click-row'
        },
        {
          color: 'white',
          perName: 'متن کلیک روی سطر',
          engName: 'grid-click-row-text'
        },
        {
          color: 'white',
          perName: 'سطر انتخاب شده',
          engName: 'grid-selected-row-text'
        },
        {
          color: 'black',
          perName: 'متن سطر انتخاب شده',
          engName: 'grid-selected-row-text'
        },
      ]
    },
    {
      groupName: 'دکمه ها',
      colorModel: [
        {
          color: '#6f1495',
          perName: 'ذخیره',
          engName: 'save-button'
        },
        {
          color: 'white',
          perName: 'متن دکمه ذخیره',
          engName: 'save-button-text'
        }
      ]
    },
    {
      groupName: 'فرم',
      colorModel: [
        {
          color: '#6f14952b',
          perName: 'فرم',
          engName: 'form'
        }
      ]
    },
    {
      groupName: 'متفرقه',
      colorModel: [
        {
          color: '#540e60',
          perName: 'رنگ های فعال برای خط ها و...',
          engName: 'active'
        }
      ]
    },
  ]

  changeElementColor(event) {
    switch (event.engName) {
      case 'sidebar':
        $('html')[0].style.setProperty('--sidebar', event.color)
        break
      case 'sidebar-text':
        $('html')[0].style.setProperty('--sidebar-text', event.color)
        break
      case 'navbar':
        $('html')[0].style.setProperty('--navbar', event.color)
        break
      case 'navbar-text':
        $('html')[0].style.setProperty('--navbar-text', event.color)
        break
      case 'navbar-text-button':
        $('html')[0].style.setProperty('--navbar-text-button', event.color)
        break
      case 'body':
        $('html')[0].style.setProperty('--main-content', event.color)
        break
      case 'tab':
        $('html')[0].style.setProperty('--tab', event.color)
        break
      case 'tab-text':
        $('html')[0].style.setProperty('--tab-text', event.color)
        break
      case 'card':
        $('html')[0].style.setProperty('--card', event.color)
        break
      case 'personnel-filter':
        $('html')[0].style.setProperty('--personnel-filter', event.color)
        break
      case 'personnel-filter-text':
        $('html')[0].style.setProperty('--personnel-filter-text', event.color)
        break
      case 'select-personnel':
        $('html')[0].style.setProperty('--select-personnel', event.color)
        break
      case 'select-personnel-text':
        $('html')[0].style.setProperty('--select-personnel-text', event.color)
        break
      case 'select-personnel-selected':
        $('html')[0].style.setProperty('--select-personnel-selected', event.color)
        break
      case 'group-grid':
        $('html')[0].style.setProperty('--group-grid', event.color)
        break
      case 'grid-group-text':
        $('html')[0].style.setProperty('--grid-group-text', event.color)
        break
      case 'grid-header':
        $('html')[0].style.setProperty('--grid-header', event.color)
        break
      case 'grid-header-text':
        $('html')[0].style.setProperty('--grid-header-text', event.color)
        break
      case 'grid-header-active':
        $('html')[0].style.setProperty('--grid-header-active', event.color)
        break
      case 'grid-header-active-text':
        $('html')[0].style.setProperty('--grid-header-active-text', event.color)
        break
      case 'grid-float-filter':
        $('html')[0].style.setProperty('--grid-float-filter', event.color)
        break
      case 'grid-sidebar':
        $('html')[0].style.setProperty('--grid-sidebar', event.color)
        break
      case 'grid-sidebar-text':
        $('html')[0].style.setProperty('--grid-sidebar-text', event.color)
        break
      case 'grid-row-hover':
        $('html')[0].style.setProperty('--grid-row-hover', event.color)
        break
      case 'grid-row-hover-text':
        $('html')[0].style.setProperty('--grid-row-hover-text', event.color)
        break
      case 'grid-click-row':
        $('html')[0].style.setProperty('--grid-click-row', event.color)
        break
      case 'grid-click-row-text':
        $('html')[0].style.setProperty('--grid-click-row-text', event.color)
        break
      case 'grid-selected-row':
        $('html')[0].style.setProperty('--grid-selected-row', event.color)
        break
      case 'grid-selected-row-text':
        $('html')[0].style.setProperty('--grid-selected-row-text', event.color)
        break
      case 'save-button':
        $('html')[0].style.setProperty('--save-button', event.color)
        break
      case 'save-button-text':
        $('html')[0].style.setProperty('--save-button-text', event.color)
        break
      case 'form':
        $('html')[0].style.setProperty('--form', event.color)
        break
      case 'active':
        $('html')[0].style.setProperty('--active', event.color)
        break
    }
  }

  bgImage: string = ''
  showSideBarBgImg: boolean = true
  compressSideBar: boolean = false
  sideBarSize: 'small' | 'medium' | 'large'

  bgImages: string[] = [
    'assets/img/sidebar-bg/1.jpg',
    'assets/img/sidebar-bg/2.jpg',
    'assets/img/sidebar-bg/3.jpg',
    'assets/img/sidebar-bg/4.jpg',
    'assets/img/sidebar-bg/5.jpg',
    'assets/img/sidebar-bg/6.jpg'
  ]

  // When Select A Image
  changeBgImage(item) {
    var $this = $(this)
    $this.closest('.cz-bg-image').find('.selected').removeClass('selected')
    $this.addClass('selected')
    this.bgImage = item
    this.cookieService.set('sideBarBgImg', this.bgImage, { expires: 1000, sameSite: 'Lax' })
    $('.sidebar-background').css('background-image', 'url(' + item + ')')
  }

  // Show Or Hide Background Image In SideBar
  changeShowBgImage(value) {
    value ? $('.sidebar-background').css('display', 'block') : $('.sidebar-background').css('display', 'none')
    this.cookieService.set('showSideBarBgImg', value, 63072000)
  }

  // Compress SideBar Menu
  compressChanged(value?) {
    $('.nav-toggle').trigger('click')
    var $this = $(this), toggle_icon = $this.find('.toggle-icon')
    if (toggle_icon && value) {
      $('.wrapper').addClass('nav-collapsed')
      $('.nav-toggle').find('.toggle-icon').removeClass('fa-toggle-on').addClass('fa-toggle-off')
      toggle_icon.attr('data-toggle', 'collapsed')
    }
    else {
      $('.wrapper').removeClass('nav-collapsed menu-collapsed')
      $('.nav-toggle').find('.toggle-icon').removeClass('fa-toggle-off').addClass('fa-toggle-on')
    }

    this.cookieService.set('compressSideBar', value, { expires: 1000, sameSite: 'Lax' })
  }

  // Change Side Bar Menu Size
  sizeChanged(value) {
    let wrapper = $('.wrapper')
    if (value === 'small') $(wrapper).removeClass('sidebar-lg sidebar-md').addClass('sidebar-sm')
    else if (value === 'large') $(wrapper).removeClass('sidebar-sm sidebar-md').addClass('sidebar-lg')
    else $(wrapper).removeClass('sidebar-sm sidebar-lg').addClass('sidebar-md')
    this.cookieService.set('sideBarSize', value, { expires: 1000, sameSite: 'Lax' })
  }

  ngOnInit() {
    this.initialColorTheme()
    // Read The Themes From Cookie And Set Them
    this.initialSidebarTheme()
  }

  saveColorModel() {
    sessionStorage.setItem('activeThemeType', JSON.stringify(this.selectedTheme))
    this.service.post('Users/PutTheme', { CodeDesc_Fld: JSON.stringify(this.colorModelList) }).subscribe(_ => sessionStorage.setItem('activeThemeList', JSON.stringify(this.colorModelList)))
  }

  async initialColorTheme() {
    let activeThemeType: any = JSON.parse(sessionStorage.getItem('activeThemeType'))
    if (!activeThemeType) {
      await new Promise((resolve, reject) => {
        this.service.get('Users/GetTheme').toPromise().then((data: any) => {
          if (data)
          {
            data = data.Data
            let themeListForCustom: string = data.Item1
            let themeType: string = data.Item2
            if (!themeType) {
              this.colorModelList = this.colorModelDefault1HrList
              this.colorModelList.forEach(element => element.colorModel.forEach(e => this.changeElementColor(e)))
              this.selectedTheme = { perName: 'پیشفرض 1 (کارگزینی)', engName: 'default-1-hr' }
              sessionStorage.setItem('activeThemeType', JSON.stringify(this.selectedTheme))
            }
            else {
              if (themeType == 'custom-1') {
                this.selectedTheme = { perName: 'دستی 1', engName: 'custom-1' }
                this.colorModelList = JSON.parse(themeListForCustom)
                this.colorModelList.forEach(element => element.colorModel.forEach(e => this.changeElementColor(e)))
                sessionStorage.setItem('activeThemeType', JSON.stringify(this.selectedTheme))
                sessionStorage.setItem('activeThemeList', JSON.stringify(this.colorModelList))
              }
              else {
                for (let index = 0; index < this.colorModelDefaultList.length; index++) {
                  this.selectedTheme = this.colorModelDefaultList[index].colorModel.filter(b => b.engName == themeType)[0]
                  if (this.selectedTheme) break
                }
                if (this.selectedTheme.engName == 'default-1-hr') {
                  this.colorModelList = this.colorModelDefault1HrList
                  this.colorModelList.forEach(element => element.colorModel.forEach(e => this.changeElementColor(e)))
                }
                else if (this.selectedTheme.engName == 'default-2') {
                  this.colorModelList = this.colorModelDefault2List
                  this.colorModelList.forEach(element => element.colorModel.forEach(e => this.changeElementColor(e)))
                }
                else if (this.selectedTheme.engName == 'default-3') {
                  this.colorModelList = this.colorModelDefault3List
                  this.colorModelList.forEach(element => element.colorModel.forEach(e => this.changeElementColor(e)))
                }
                else if (sessionStorage.getItem('activeThemeType')) {
                  this.selectedTheme = { perName: 'دستی 1', engName: 'custom-1' }
                  this.colorModelList = JSON.parse(sessionStorage.getItem('activeThemeList'))
                  this.colorModelList.forEach(element => element.colorModel.forEach(e => this.changeElementColor(e)))
                }
                sessionStorage.setItem('activeThemeList', JSON.stringify(this.colorModelList))
              }
            }
            resolve(true);
          }
          else
            reject();
        })
      })
    }
    else {
      for (let index = 0; index < this.colorModelDefaultList.length; index++) {
        this.selectedTheme = this.colorModelDefaultList[index].colorModel.filter(b => b.engName == activeThemeType.engName)[0]
        if (this.selectedTheme) break
      }
      if (this.selectedTheme.engName == 'default-1-hr') {
        this.colorModelList = this.colorModelDefault1HrList
        this.colorModelList.forEach(element => element.colorModel.forEach(e => this.changeElementColor(e)))
      }
      else if (this.selectedTheme.engName == 'default-2') {
        this.colorModelList = this.colorModelDefault2List
        this.colorModelList.forEach(element => element.colorModel.forEach(e => this.changeElementColor(e)))
      }
      else if (this.selectedTheme.engName == 'default-3') {
        this.colorModelList = this.colorModelDefault3List
        this.colorModelList.forEach(element => element.colorModel.forEach(e => this.changeElementColor(e)))
      }
      else if (sessionStorage.getItem('activeThemeType')) {
        this.selectedTheme = { perName: 'دستی 1', engName: 'custom-1' }
        this.colorModelList = JSON.parse(sessionStorage.getItem('activeThemeList'))
        this.colorModelList.forEach(element => element.colorModel.forEach(e => this.changeElementColor(e)))
      }
      sessionStorage.setItem('activeThemeList', JSON.stringify(this.colorModelList))
    }
  }

  initialSidebarTheme() {
    this.setBgImage()
    this.setShowBgImage()
    this.setCompress()
    this.setSize()
    this.compressChanged()
  }

  setBgImage() {
    this.bgImage = this.cookieService.get('sideBarBgImg')
    !this.bgImage ? this.bgImage = this.bgImages[0] : null
    $('.sidebar-background').css('background-image', 'url(' + this.bgImage + ')')
  }

  setShowBgImage() {
    let value = this.cookieService.get('showSideBarBgImg')
    if (value) this.showSideBarBgImg = JSON.parse(this.cookieService.get('showSideBarBgImg'))
    else this.showSideBarBgImg = true
    this.showSideBarBgImg ? $('.sidebar-background').css('background-image', 'url(' + this.bgImage + ')') : $('.sidebar-background').css('display', 'none')
  }

  setCompress() {
    let compressSideBar = this.cookieService.get('compressSideBar') as any
    !compressSideBar || compressSideBar == 'false' ? this.compressSideBar = false : this.compressSideBar = true
    if (this.compressSideBar) {
      $('.wrapper').addClass('nav-collapsed')
      $('.nav-toggle').trigger('click')
      var $this = $(this), toggle_icon = $this.find('.toggle-icon')
      let compact_menu_checkbox = $('.cz-compact-menu')
      $('.nav-toggle').find('.toggle-icon').removeClass('fa-toggle-on').addClass('fa-toggle-off')
      toggle_icon.attr('data-toggle', 'collapsed');
      if (compact_menu_checkbox.length > 0) compact_menu_checkbox.prop('checked', true);
    }
  }

  setSize() {
    this.sideBarSize = this.cookieService.get('sideBarSize') as 'small' | 'medium' | 'large'
    !this.sideBarSize ? this.sideBarSize = 'medium' : null
    this.sizeChanged(this.sideBarSize)
  }

  // Close Customizer Menu
  close() { $('.customizer').removeClass('open') }

  constructor(private cookieService: CookieService, private service: GridFormService, private toastr: ToastrService) { }
}

interface ColorModelGroup {
  groupName: string
  disabled?: boolean
  colorModel: ColorModel[]
}

interface ColorModel {
  color: string
  perName: string
  engName: string
}