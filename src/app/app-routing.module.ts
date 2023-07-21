import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './views/auth-module/not-found/not-found.component';
import { AuthGuard } from './guards.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./views/auth-module/auth-module.module').then(
        (m) => m.AuthModuleModule
      ),
  },
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./views/employee-module/employee-module.module').then(
            (m) => m.EmployeeModuleModule
          ),
      },
    ],
  },
  {
    path: '**',
    pathMatch: 'full',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
