import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EducationFormComponent } from './education-form.component';

describe('EducationFormComponent', () => {
  let component: EducationFormComponent;
  let fixture: ComponentFixture<EducationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, EducationFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EducationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
