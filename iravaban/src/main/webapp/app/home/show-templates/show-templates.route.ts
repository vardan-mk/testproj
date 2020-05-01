import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, Router, Routes} from "@angular/router";
import {ITemplate, Template} from "app/shared/model/templateService/template.model";
import {TemplateService} from "app/entities/templateService/template/template.service";
import {EMPTY, Observable, of} from "rxjs";
import {flatMap} from "rxjs/operators";
import {HttpResponse} from "@angular/common/http";
import {TemplateComponent} from "app/entities/templateService/template/template.component";
import {Authority} from "app/shared/constants/authority.constants";
import {UserRouteAccessService} from "app/core/auth/user-route-access-service";
import {TemplateDetailComponent} from "app/entities/templateService/template/template-detail.component";
import {TemplateUpdateComponent} from "app/entities/templateService/template/template-update.component";

@Injectable({ providedIn: 'root' })
export class TemplateResolve implements Resolve<ITemplate> {
  constructor(private service: TemplateService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITemplate> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((template: HttpResponse<Template>) => {
          if (template.body) {
            return of(template.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Template());
  }
}

export const showTemplatesRoute: Routes = [
  {
    path: '',
    component: TemplateComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Templates'
    },
    canActivate: [UserRouteAccessService]
  },
  // {
  //   path: ':id/view',
  //   component: TemplateDetailComponent,
  //   resolve: {
  //     template: TemplateResolve
  //   },
  //   data: {
  //     authorities: [Authority.USER],
  //     pageTitle: 'Templates'
  //   },
  //   canActivate: [UserRouteAccessService]
  // },

  {
    path: ':id/edit',
    component: TemplateUpdateComponent,
    resolve: {
      template: TemplateResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Templates'
    },
    canActivate: [UserRouteAccessService]
  }
];
