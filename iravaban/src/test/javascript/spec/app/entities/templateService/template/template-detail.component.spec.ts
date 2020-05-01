import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayAppTestModule } from '../../../../test.module';
import { TemplateDetailComponent } from 'app/entities/templateService/template/template-detail.component';
import { Template } from 'app/shared/model/templateService/template.model';

describe('Component Tests', () => {
  describe('Template Management Detail Component', () => {
    let comp: TemplateDetailComponent;
    let fixture: ComponentFixture<TemplateDetailComponent>;
    const route = ({ data: of({ template: new Template(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayAppTestModule],
        declarations: [TemplateDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(TemplateDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TemplateDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load template on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.template).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
