import { Routes, RouterModule } from '@angular/router'
import { JobCategoryComponent } from './components/job-category/grid/job-category.component'
import { JobFieldComponent } from './components/job-field/grid/job-field.component'
import { OrgChartComponent } from './components/org-chart/grid/org-chart.component'
import { OrgPostComponent } from './components/org-post/body/org-post.component'
import { OrgStructureComponent } from './components/org-structure/body/org-structure.component'

export const routes: Routes = [
  { path: 'org-structure', component: OrgStructureComponent },
  { path: 'org-chart', component: OrgChartComponent },
  { path: 'org-post', component: OrgPostComponent },
  { path: 'job-category', component: JobCategoryComponent },
  { path: 'job-field', component: JobFieldComponent }
]

export const ChartInfoRouting = RouterModule.forChild(routes)
