import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { VoitureService } from "./Services/voiture-service.service";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { OverlayContainer } from "@angular/cdk/overlay";
import { CustomOverlayContainer } from "./theme/utils/custom-overlay-container";

import { AgmCoreModule } from "@agm/core";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { PERFECT_SCROLLBAR_CONFIG } from "ngx-perfect-scrollbar";
import { PerfectScrollbarConfigInterface } from "ngx-perfect-scrollbar";
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  wheelPropagation: true,
  suppressScrollX: true
};
import { AuthGuard } from "./Services/auth-guard.service";
import { AdminAuthGuard } from "./Services/admin-auth-guard.service";
import { CalendarModule } from "angular-calendar";
import { SharedModule } from "./shared/shared.module";
import { PipesModule } from "./theme/pipes/pipes.module";
import { routing } from "./app.routing";

import { AppSettings } from "./app.settings";
import { AppComponent } from "./app.component";
import { PagesComponent } from "./pages/pages.component";
import { BlankComponent } from "./pages/blank/blank.component";
import { SearchComponent } from "./pages/search/search.component";
import { NotFoundComponent } from "./pages/errors/not-found/not-found.component";
import { ErrorComponent } from "./pages/errors/error/error.component";
import { DialogDeleteItemDialog } from "./shared/dialog-delete/dialog-delete-item-dialog";

import { TopInfoContentComponent } from "./theme/components/top-info-content/top-info-content.component";
import { SidenavComponent } from "./theme/components/sidenav/sidenav.component";
import { VerticalMenuComponent } from "./theme/components/menu/vertical-menu/vertical-menu.component";
import { HorizontalMenuComponent } from "./theme/components/menu/horizontal-menu/horizontal-menu.component";
import { FlagsMenuComponent } from "./theme/components/flags-menu/flags-menu.component";
import { FullScreenComponent } from "./theme/components/fullscreen/fullscreen.component";
import { ApplicationsComponent } from "./theme/components/applications/applications.component";
import { MessagesComponent } from "./theme/components/messages/messages.component";
import { UserMenuComponent } from "./theme/components/user-menu/user-menu.component";
import { FavoritesComponent } from "./theme/components/favorites/favorites.component";
import { VoituresComponent } from "./pages/voitures/voitures/voitures.component";
import { AddVoitureComponent } from "./pages/voitures/add-voiture/add-voiture.component";
import { MyCarsComponent } from "./pages/voitures/my-cars/my-cars.component";
import { EditVoitureComponent } from "./pages/voitures/edit-voiture/edit-voiture.component";
import { UserService } from "./Services/user-service.service";
import { HttpModule } from "@angular/http";
import { AddeventComponent } from "./pages/events/addevent/addevent.component";
import { TokenInterceptor } from "./token-interceptor";
import { TrackEventComponent } from "./pages/events/track-event/track-event.component";
import { EventsComponent } from "./pages/events/events/events.component";
import { MyEventsComponent } from "./pages/events/my-events/my-events.component";
import { ConfirmEventComponent } from "./pages/events/confirm-event/confirm-event.component";
import { PieceRechangesComponent } from "./pages/pieceRechanges/piece-rechanges/piece-rechanges.component";
import { AjoutPieceRechangeComponent } from "./pages/pieceRechanges/ajout-piece-rechange/ajout-piece-rechange.component";
import { EditPieceRechangeComponent } from "./pages/pieceRechanges/edit-piece-rechange/edit-piece-rechange.component";
import { AddPieceRechangeComponent } from "./pages/pieceRechanges/add-piece-rechange/add-piece-rechange.component";
import { TrackEventRepResponsableComponent } from "./pages/events/track-event-rep-responsable/track-event-rep-responsable.component";
import { HomePageComponent } from './pages/home-page/home-page.component';

@NgModule({
  imports: [
    HttpClientModule,
    HttpModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyBNcjxo_35qnEG17dQvvftWa68eZWepYE0"
    }),
    PerfectScrollbarModule,
    CalendarModule.forRoot(),
    SharedModule,
    PipesModule,
    routing
  ],
  declarations: [
    AppComponent,
    PagesComponent,
    BlankComponent,
    SearchComponent,
    NotFoundComponent,
    ErrorComponent,
    TopInfoContentComponent,
    SidenavComponent,
    VerticalMenuComponent,
    HorizontalMenuComponent,
    FlagsMenuComponent,
    FullScreenComponent,
    ApplicationsComponent,
    MessagesComponent,
    UserMenuComponent,
    FavoritesComponent,
    VoituresComponent,
    AddVoitureComponent,
    MyCarsComponent,
    EditVoitureComponent,
    AddeventComponent,
    DialogDeleteItemDialog,
    TrackEventComponent,
    EventsComponent,
    MyEventsComponent,
    ConfirmEventComponent,
    PieceRechangesComponent,
    AjoutPieceRechangeComponent,
    EditPieceRechangeComponent,
    AddPieceRechangeComponent,
    TrackEventRepResponsableComponent,
    HomePageComponent
  ],
  providers: [
    AppSettings,
    AuthGuard,
    AdminAuthGuard,
    UserService,
    VoitureService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    { provide: OverlayContainer, useClass: CustomOverlayContainer },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  entryComponents: [DialogDeleteItemDialog, AddPieceRechangeComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
