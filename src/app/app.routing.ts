import { TrackEventRepResponsableComponent } from "./pages/events/track-event-rep-responsable/track-event-rep-responsable.component";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";

import { PagesComponent } from "./pages/pages.component";
import { BlankComponent } from "./pages/blank/blank.component";
import { SearchComponent } from "./pages/search/search.component";
import { NotFoundComponent } from "./pages/errors/not-found/not-found.component";
import { ErrorComponent } from "./pages/errors/error/error.component";
import { AddVoitureComponent } from "./pages/voitures/add-voiture/add-voiture.component";
import { AddeventComponent } from "./pages/events/addevent/addevent.component";
import { AuthGuard } from "./Services/auth-guard.service";
import { VoituresComponent } from "./pages/voitures/voitures/voitures.component";
import { AdminAuthGuard } from "./Services/admin-auth-guard.service";
import { EditVoitureComponent } from "./pages/voitures/edit-voiture/edit-voiture.component";
import { MyCarsComponent } from "./pages/voitures/my-cars/my-cars.component";
import { ConfirmEventComponent } from "./pages/events/confirm-event/confirm-event.component";
import { EventsComponent } from "./pages/events/events/events.component";
import { MyEventsComponent } from "./pages/events/my-events/my-events.component";
import { PieceRechangesComponent } from "./pages/pieceRechanges/piece-rechanges/piece-rechanges.component";
import { AjoutPieceRechangeComponent } from "./pages/pieceRechanges/ajout-piece-rechange/ajout-piece-rechange.component";
import { EditPieceRechangeComponent } from "./pages/pieceRechanges/edit-piece-rechange/edit-piece-rechange.component";
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { TrackEventComponent } from "./pages/events/track-event/track-event.component";

export const routes: Routes = [
  { path: "", component: HomePageComponent, pathMatch: "full" },
  {
    path: "",
    component: PagesComponent,
    children: [
      {
        path: "dash",
        loadChildren: "./pages/dashboard/dashboard.module#DashboardModule",
        data: { breadcrumb: "Dashboard" },
        canActivate: [AuthGuard]
      },
      //paths: voitures:
      {
        path: "voitures",
        component: VoituresComponent,
        data: { breadcrumb: "Voitures" },
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      {
        path: "ajoutvoiture",
        component: AddVoitureComponent,
        data: { breadcrumb: "Ajout Voiture" },
        canActivate: [AuthGuard]
      },
      {
        path: "editvoiture/:id",
        component: EditVoitureComponent,
        data: { breadcrumb: "Edition Voiture" },
        canActivate: [AuthGuard]
      },
      {
        path: "mesvoitures",
        component: MyCarsComponent,
        data: { breadcrumb: "mes voitures" },
        canActivate: [AuthGuard]
      },
      //paths: pieces rechange:
      {
        path: "piecesrechanges",
        component: PieceRechangesComponent,
        data: { breadcrumb: "Pieces de Rechanges" },
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      {
        path: "ajoutpiecerechange",
        component: AjoutPieceRechangeComponent,
        data: { breadcrumb: "Ajout Piece de rechange" },
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      {
        path: "editpiecerechange/:id",
        component: EditPieceRechangeComponent,
        data: { breadcrumb: "Edition Piece de rechagne" },
        canActivate: [AuthGuard, AdminAuthGuard]
      },

      // events
      {
        path: "ajoutevent",
        component: AddeventComponent,
        data: { breadcrumb: "créer un évenement" },
        canActivate: [AuthGuard]
      },
      {
        path: "confirmevent/:id",
        component: ConfirmEventComponent,
        data: { breadcrumb: "confiremer l'évenement" },
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      {
        path: "events",
        component: EventsComponent,
        data: { breadcrumb: "tous les evenements" },
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      {
        path: "myevents",
        component: MyEventsComponent,
        data: { breadcrumb: "mes evenements" },
        canActivate: [AuthGuard]
      },
      {
        path: "trackevent/:id",
        component: TrackEventComponent,
        data: { breadcrumb: "mes evenements" },
        canActivate: [AuthGuard]
      },
      {
        path: "editevent/:id",
        component: TrackEventRepResponsableComponent,
        data: { breadcrumb: "mes evenements" },
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      {
        path: "users",
        loadChildren: "./pages/users/users.module#UsersModule",
        data: { breadcrumb: "Users" }
      },
      {
        path: "dynamic-menu",
        loadChildren:
          "./pages/dynamic-menu/dynamic-menu.module#DynamicMenuModule",
        data: { breadcrumb: "Dynamic Menu" }
      },
      {
        path: "ui",
        loadChildren: "./pages/ui/ui.module#UiModule",
        data: { breadcrumb: "UI" }
      },
      {
        path: "mailbox",
        loadChildren: "./pages/mailbox/mailbox.module#MailboxModule",
        data: { breadcrumb: "Mailbox" }
      },
      {
        path: "chat",
        loadChildren: "./pages/chat/chat.module#ChatModule",
        data: { breadcrumb: "Chat" }
      },
      {
        path: "form-controls",
        loadChildren:
          "./pages/form-controls/form-controls.module#FormControlsModule",
        data: { breadcrumb: "Form Controls" }
      },
      {
        path: "tables",
        loadChildren: "./pages/tables/tables.module#TablesModule",
        data: { breadcrumb: "Tables" }
      },
      {
        path: "schedule",
        loadChildren: "./pages/schedule/schedule.module#ScheduleModule",
        data: { breadcrumb: "Schedule" }
      },
      {
        path: "maps",
        loadChildren: "./pages/maps/maps.module#MapsModule",
        data: { breadcrumb: "Maps" }
      },
      {
        path: "charts",
        loadChildren: "./pages/charts/charts.module#ChartsModule",
        data: { breadcrumb: "Charts" }
      },
      {
        path: "drag-drop",
        loadChildren: "./pages/drag-drop/drag-drop.module#DragDropModule",
        data: { breadcrumb: "Drag & Drop" }
      },
      {
        path: "icons",
        loadChildren: "./pages/icons/icons.module#IconsModule",
        data: { breadcrumb: "Material Icons" }
      },
      {
        path: "blank",
        component: BlankComponent,
        data: { breadcrumb: "Blank page" }
      },
      {
        path: "search",
        component: SearchComponent,
        data: { breadcrumb: "Search" }
      },
      {
        path: "search/:name",
        component: SearchComponent,
        data: { breadcrumb: "Search" }
      }
    ]
  },
  {
    path: "landing",
    loadChildren: "./pages/landing/landing.module#LandingModule"
  },
  { path: "login", loadChildren: "./pages/login/login.module#LoginModule" },
  {
    path: "register",
    loadChildren: "./pages/register/register.module#RegisterModule"
  },
  { path: "error", component: ErrorComponent, data: { breadcrumb: "Error" } },
  { path: "**", component: NotFoundComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
  preloadingStrategy: PreloadAllModules // <- comment this line for activate lazy load
  // useHash: true
});
