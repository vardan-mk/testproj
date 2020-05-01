import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewayAppSharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';
import { ShowTemplatesComponent } from './show-templates/show-templates.component';

@NgModule({
  imports: [GatewayAppSharedModule, RouterModule.forChild([HOME_ROUTE,
    {path: 'show-templates',
      loadChildren: () => import('./show-templates/show-templates.module').then(m => m.ShowTemplatesModule)
    }])],
  declarations: [HomeComponent, ShowTemplatesComponent]
})
export class GatewayAppHomeModule {}
