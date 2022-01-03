import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContactResolverService } from './services/contact-resolver.service';

import { ContactDetailsComponent } from './pages/contact-details/contact-details.component';
import { ContactEditComponent } from './pages/contact-edit/contact-edit.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HomeComponent } from './pages/home/home.component';
import { StatisticComponent } from './pages/statistic/statistic.component';
import { AuthComponent } from './pages/auth/auth.component';

const routes: Routes = [
  {
    path: 'contact',
    component: ContactComponent,
    children: [
      {
        path: 'edit/:id',
        component: ContactEditComponent,
        resolve: { contact: ContactResolverService },
      },
      {
        path: 'edit',
        component: ContactEditComponent,
        resolve: { contact: ContactResolverService },
      },
      {
        path: ':id',
        component: ContactDetailsComponent,
        resolve: { contact: ContactResolverService },
      },
    ],
  },
  { path: 'statistic', component: StatisticComponent },
  { path: 'auth', component: AuthComponent },
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
