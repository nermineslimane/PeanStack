import { ProjectDetailsComponent } from './components/project-details/project-details.component';
import { FreelancerDetailsComponent } from './components/freelancer-details/freelancer-details.component';
import { ListComponent } from './components/freelancer/list/list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  { path: '', redirectTo: 'freelancers', pathMatch: 'full' },
  { path: 'freelancers', component: ListComponent },
  { path: 'details', component: FreelancerDetailsComponent },
  { path: 'detailsProject', component: ProjectDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
