import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContactResolveService } from './services/contact/contact-resolve.service';

import { ContactDetailsComponent } from './pages/contact-details/contact-details.component';
import { ContactEditComponent } from './pages/contact-edit/contact-edit.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HomeComponent } from './pages/home/home.component';
import { StatisticComponent } from './pages/statistic/statistic.component';
import { AuthComponent } from './pages/auth/auth.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'contact',
    component: ContactComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'edit/:id',
        component: ContactEditComponent,
        resolve: { contact: ContactResolveService },
      },
      {
        path: 'edit',
        component: ContactEditComponent,
        resolve: { contact: ContactResolveService },
      },
      {
        path: ':id',
        component: ContactDetailsComponent,
        resolve: { contact: ContactResolveService },
      },
    ],
  },
  {
    path: 'statistic',
    component: StatisticComponent,
    canActivate: [AuthGuard],
  },
  { path: 'auth', component: AuthComponent },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
