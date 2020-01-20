import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './component/app.component';
import { MainComponent } from './component/main/main.component';
import { WindowComponent } from './component/window/window.component';

@NgModule({
  declarations: [AppComponent, MainComponent, WindowComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
