import { AuthGuard } from "./guards/auth.guard";
import { LoginComponent } from "./components/login/login.component";
import { WhatsAppComponent } from "./components/whats-app/whats-app.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ChatComponent } from "./components/chat/chat.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";

const routes: Routes = [
  {
    path: "",
    component: WhatsAppComponent,
    children: [
      {
        path: "room/:id", // child route path
        component: ChatComponent, // child route component that the router renders
      },
    ],
    canActivate: [AuthGuard],
  },
  { path: "login", component: LoginComponent },
  { path: "**", component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
