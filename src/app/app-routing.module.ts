import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MTicketComponent } from './home/m-ticket/m-ticket.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'ticket/:id', component: MTicketComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
