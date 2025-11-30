import { YektaStructComponent } from './components/yektastruct/grid/yektastruct.component';
import { Routes, RouterModule } from '@angular/router'
import { SavingComponent } from './components/saving/grid/saving.component'
import { OrganizationComponent } from './components/organization/grid/organization.component'
import { CityComponent } from './components/city/city/body/city.component'
import { MajorSubjectComponent } from './components/major-subject/grid/major-subject.component'
import { GradeLicenseComponent } from './components/grade-license/grid/grade-license.component'
import { AuthGuardService } from 'src/app/auth/providers/auth.guard'
import { SmsSavedComponent } from './components/sms-saved/grid/sms-saved.component'
import { ListNoComponent } from './components/list-no/list-no/list-no.component'
import { HghWitnessFilesComponent } from './components/hghwitnessfiles/hghwitnessfiles/hghwitnessfiles.component'
import { ListNoFormDirectComponent } from './components/list-no/list-no-form-direct/list-no-form-direct.component';
import { SlackGroupComponent } from './components/slackgroup/slackgroup/slackgroup.component'

export const routes: Routes = [
  { path: 'saving', component: SavingComponent },
  { path: 'organization', component: OrganizationComponent },
  { path: 'city', component: CityComponent },
  { path: 'major-subject', component: MajorSubjectComponent },
  { path: 'grade-license', component: GradeLicenseComponent },
  { path: 'smssaved', component: SmsSavedComponent },
  { path: 'listno', component: ListNoComponent },
  { path: 'listnoformdirect', component: ListNoFormDirectComponent },
  { path: 'hghwitnessfiles', component: HghWitnessFilesComponent },
  { path: 'bank-info', loadChildren: () => import('./components/bank-info/bank-info.module').then(m => m.BankInfoModule), canActivate: [AuthGuardService] },
  { path: 'hire-info', loadChildren: () => import('./components/hire-info/hire-info.module').then(m => m.HireInfoModule), canActivate: [AuthGuardService] },
  { path: 'cost-center-info', loadChildren: () => import('./components/cost-center-info/cost-center-info.module').then(m => m.CostCenterInfoModule), canActivate: [AuthGuardService] },
  { path: 'debt-info', loadChildren: () => import('./components/debt-info/debt-info.module').then(m => m.DebtInfoModule), canActivate: [AuthGuardService] },
  { path: 'case-info', loadChildren: () => import('./components/case-info/case-info.module').then(m => m.CaseInfoModule), canActivate: [AuthGuardService] },
  { path: 'insure-info', loadChildren: () => import('./components/insure-info/insure-info.module').then(m => m.InsureInfoModule), canActivate: [AuthGuardService] },
  { path: 'formula-info', loadChildren: () => import('./components/formula-info/formula-info.module').then(m => m.FormulaInfoModule), canActivate: [AuthGuardService] },
  { path: 'work-adding-info', loadChildren: () => import('./components/work-adding-info/work-adding-info.module').then(m => m.WorkAddingInfoModule), canActivate: [AuthGuardService] },
  { path: 'tax-info', loadChildren: () => import('./components/tax-info/tax-info.module').then(m => m.TaxInfoModule), canActivate: [AuthGuardService] },
  { path: 'yektastruct', component: YektaStructComponent },
  { path: 'slackgroup', component: SlackGroupComponent },

]

export const DetailInfoRouting = RouterModule.forChild(routes)
