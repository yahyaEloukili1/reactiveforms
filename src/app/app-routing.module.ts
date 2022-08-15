import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEmployeeComponentComponent } from './components/create-employee-component/create-employee-component.component';

const routes: Routes = [
  {path: '',component: CreateEmployeeComponentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
