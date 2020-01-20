import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './component/main/main.component';
import { WindowComponent } from './component/window/window.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'window', component: WindowComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
