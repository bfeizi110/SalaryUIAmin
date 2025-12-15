import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { ChartInfoRouting } from './chart-info.routing'
import { OrgStructureComponent } from './components/org-structure/body/org-structure.component'
import { ChartTreeComponent } from './components/org-structure/chart-tree/body/chart-tree.component'
import { ChartTreeFormComponent } from './components/org-structure/chart-tree/form/chart-tree-form.component'
import { OrgStructureFormComponent } from './components/org-structure/form/org-structure-form.component'
import { CustomAgGridModule } from '../../main-body/common/custom-ag-grid/custom-ag-grid.module'
import { CustomFormModule } from '../../main-body/common/custom-form/custom-form.module'
import { CustomModalModule } from '../../main-body/common/custom-modal/custom-modal.module'
import { MatTreeModule } from '@angular/material/tree'
import { OrgChartComponent } from './components/org-chart/grid/org-chart.component'
import { OrgChartFormComponent } from './components/org-chart/form/org-chart-form.component'
import { OrgPostComponent } from './components/org-post/body/org-post.component'
import { OrgPostFormComponent } from './components/org-post/form/org-post-form.component'
import { JobCategoryFormComponent } from './components/job-category/form/job-category-form.component'
import { JobCategoryComponent } from './components/job-category/grid/job-category.component'
import { JobFieldFormComponent } from './components/job-field/form/job-field-form.component'
import { JobFieldComponent } from './components/job-field/grid/job-field.component'

@NgModule({
  imports: [
    CommonModule,
    ChartInfoRouting,
    CustomAgGridModule,
    CustomFormModule,
    CustomModalModule,
    MatTreeModule
  ],
  declarations: [
    OrgStructureComponent,
    OrgStructureFormComponent,
    ChartTreeComponent,
    ChartTreeFormComponent,
    OrgChartComponent,
    OrgChartFormComponent,
    OrgPostComponent,
    OrgPostFormComponent,
    JobCategoryComponent,
    JobFieldComponent,
    JobFieldFormComponent,
    JobCategoryFormComponent
  ],
})
export class ChartInfoModule { }
