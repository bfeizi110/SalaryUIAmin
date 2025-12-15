import { FormsModule } from '@angular/forms'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MainComponent } from './main-body/body/main.component'
import { MainRouting } from './main.routing'
import { MatButtonModule } from '@angular/material/button'
import { MatMenuModule } from '@angular/material/menu'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatRadioModule } from '@angular/material/radio'
import { MatSelectModule } from '@angular/material/select'
import { MatFormFieldModule } from '@angular/material/form-field'
import { CookieService } from 'ngx-cookie-service'
import { MatAutocompleteModule } from '@angular/material/autocomplete'

import { MatTabsModule } from '@angular/material/tabs'
import { MatTooltipModule } from '@angular/material/tooltip';
import { SidebarComponent } from './main-body/sidebar/sidebar.component'
import { NavbarComponent } from './main-body/navbar/navbar-body/navbar.component'
import { CustomizerComponent } from './main-body/customizer/customizer.component'
import { CustomRouterOutlet } from './main-body/tab/custom-router-outlet.directive'
import { ToggleFullscreenDirective } from './main-body/navbar/navbar-body/toggle-fullscreen.directive'
import { YearMonthComponent } from './main-body/navbar/year-month/year-month.component'
import { CustomModalModule } from './main-body/common/custom-modal/custom-modal.module'
import { ChangePasswordComponent } from './main-body/navbar/change-password/change-password.component'
import { CustomFormModule } from './main-body/common/custom-form/custom-form.module'
import { ToastrService } from 'ngx-toastr'
import { MyInfoModule } from './main-body/navbar/my-info/my-info.module'
import { ColorPickerModule } from 'ngx-color-picker';
import { SecurityModule } from "./pages/security/security.module";


const MATERIALS = [
  MatButtonModule,
  MatMenuModule,
  MatSlideToggleModule,
  MatRadioModule,
  MatSelectModule,
  MatFormFieldModule,
  MatTabsModule,
  MatTooltipModule,
  MatAutocompleteModule
]

@NgModule({
  declarations: [
    MainComponent,
    SidebarComponent,
    NavbarComponent,
    YearMonthComponent,
    CustomizerComponent,
    CustomRouterOutlet,
    ToggleFullscreenDirective,
    ChangePasswordComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MainRouting,
    MATERIALS,
    CustomModalModule,
    CustomFormModule,
    MyInfoModule,
    ColorPickerModule,
    SecurityModule
],
  providers: [
    // GridFormService,
    ToastrService,
    CookieService
  ]
})
export class MainModule { }
