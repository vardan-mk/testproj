import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ITemplate, Template } from 'app/shared/model/templateService/template.model';
import { TemplateService } from './template.service';

@Component({
  selector: 'jhi-template-update',
  templateUrl: './template-update.component.html'
})
export class TemplateUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    templateTitle: [],
    templateContent: [],
    paid: [],
    creationDate: [],
    updateDate: []
  });

  constructor(protected templateService: TemplateService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ template }) => {
      if (!template.id) {
        const today = moment().startOf('day');
        template.creationDate = today;
        template.updateDate = today;
      }

      this.updateForm(template);
    });
  }

  updateForm(template: ITemplate): void {
    this.editForm.patchValue({
      id: template.id,
      templateTitle: template.templateTitle,
      templateContent: template.templateContent,
      paid: template.paid,
      creationDate: template.creationDate ? template.creationDate.format(DATE_TIME_FORMAT) : null,
      // updateDate: template.updateDate ? template.updateDate.format(DATE_TIME_FORMAT) : null
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const template = this.createFromForm();
    if (template.id !== undefined) {
      this.subscribeToSaveResponse(this.templateService.update(template));
    } else {
      this.subscribeToSaveResponse(this.templateService.create(template));
    }
  }

  private createFromForm(): ITemplate {
    return {
      ...new Template(),
      id: this.editForm.get(['id'])!.value,
      templateTitle: this.editForm.get(['templateTitle'])!.value,
      templateContent: this.editForm.get(['templateContent'])!.value,
      paid: this.editForm.get(['paid'])!.value,
      // creationDate: this.editForm.get(['creationDate'])!.value
      //   ? moment(this.editForm.get(['creationDate'])!.value, DATE_TIME_FORMAT)
      //   : undefined,
      // updateDate: this.editForm.get(['updateDate'])!.value ? moment(this.editForm.get(['updateDate'])!.value, DATE_TIME_FORMAT) : undefined
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITemplate>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
