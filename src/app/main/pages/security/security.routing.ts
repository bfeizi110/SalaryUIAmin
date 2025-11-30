import { Routes, RouterModule } from '@angular/router'

import { AuditComponent } from './components/audit/audit.component'
import { MenuComponent } from './components/menu/grid/menu.component'
import { FaqComponent } from './components/faq/grid/faq.component'
import { GroupAccessComponent } from './components/group-access/body/group-access.component'
import { UserAccessComponent } from './components/user-access/body/user-access.component'
import { ApiLogComponent } from './components/api-log/api-log.component'
import { ErrorComponent } from './components/error/error.component'
import { YearMonthComponent } from './components/year-month/year-month.component'
import { ReportDesignComponent } from './components/report-design/body/report-design.component'
import { EntityPropertyComponent } from './components/entity-property/body/entity-property.component'
import { CloseInfoComponent } from './components/close-info/close-info.component'
import { CloseListComponent } from './components/close-list/close-list.component'
import { ImportComponent } from './components/import/import.component'
import { BackupComponent } from './components/backup/grid/backup.component'
import { EntityComponent } from './components/entity/body/entity.component'
import { FormComponent } from './components/form/body/form.component'
import { DynamicFormType1Component } from './components/form/dynamic-form/formtop-type1/dynamic-form-type1.component'
import { WorkFlowComponent } from './components/workflow/body/workflow.component'
import { ShowDynamicFormComponent } from './components/form/dynamic-form/show-dynamic-form/show-dynamic-form.component'

const routes: Routes = [
  { path: 'menu', component: MenuComponent },
  { path: 'audit', component: AuditComponent },
  { path: 'group-access', component: GroupAccessComponent },
  { path: 'user-access', component: UserAccessComponent },
  { path: 'apilog', component: ApiLogComponent },
  { path: 'error', component: ErrorComponent },
  { path: 'yearmonth', component: YearMonthComponent },
  { path: 'report-design', component: ReportDesignComponent },
  { path: 'EntityProperty', component: EntityPropertyComponent },
  { path: 'CloseInfo', component: CloseInfoComponent },
  { path: 'CloseList', component: CloseListComponent },
  { path: 'import', component: ImportComponent },
  { path: 'backup', component: BackupComponent },
  { path: 'entity', component: EntityComponent },
  { path: 'form', component: FormComponent },
  { path: 'formtype1', component: DynamicFormType1Component },
  { path: 'form/dynamic-form/show-dynamic-form', component: ShowDynamicFormComponent },
  { path: 'workflow', component: WorkFlowComponent },
  { path: 'faq', component: FaqComponent },
]

export const SecurityRouting = RouterModule.forChild(routes)
