import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITemplate } from 'app/shared/model/templateService/template.model';

type EntityResponseType = HttpResponse<ITemplate>;
type EntityArrayResponseType = HttpResponse<ITemplate[]>;

@Injectable({ providedIn: 'root' })
export class TemplateService {
  public resourceUrl = SERVER_API_URL + 'services/templateservice/api/templates';

  constructor(protected http: HttpClient) {}

  create(template: ITemplate): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(template);
    return this.http
      .post<ITemplate>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(template: ITemplate): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(template);
    return this.http
      .put<ITemplate>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ITemplate>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ITemplate[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(template: ITemplate): ITemplate {
    const copy: ITemplate = Object.assign({}, template, {
      creationDate: template.creationDate && template.creationDate.isValid() ? template.creationDate.toJSON() : undefined,
      updateDate: template.updateDate && template.updateDate.isValid() ? template.updateDate.toJSON() : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.creationDate = res.body.creationDate ? moment(res.body.creationDate) : undefined;
      res.body.updateDate = res.body.updateDate ? moment(res.body.updateDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((template: ITemplate) => {
        template.creationDate = template.creationDate ? moment(template.creationDate) : undefined;
        template.updateDate = template.updateDate ? moment(template.updateDate) : undefined;
      });
    }
    return res;
  }
}
