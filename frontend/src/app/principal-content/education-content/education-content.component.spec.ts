import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EducationContentComponent } from './education-content.component';

describe('EducationContentComponent', () => {
  let component: EducationContentComponent;
  let fixture: ComponentFixture<EducationContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, EducationContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EducationContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
