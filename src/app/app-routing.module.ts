import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {HomeComponent} from "./components/home/home.component";
import {CreateTicketFormComponent} from "./components/create-ticket-form/create-ticket-form.component";
import {TicketsComponent} from "./components/tickets/tickets.component";
import {TicketPageComponent} from "./components/ticket-page/ticket-page.component";
import {HelpComponent} from "./components/help/help.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {AuthGuard} from "./helpers/auth.guard";


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'tickets', component: TicketsComponent, canActivate: [AuthGuard]},
  {path: 'tickets/view/:ticketId', component: TicketPageComponent, canActivate: [AuthGuard]},
  {path: 'tickets/create', component: CreateTicketFormComponent, canActivate: [AuthGuard]},
  {path: 'help', component: HelpComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
