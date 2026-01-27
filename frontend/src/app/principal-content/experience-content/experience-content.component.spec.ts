import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ExperienceContentComponent } from './experience-content.component';

describe('ExperienceContentComponent', () => {
  let component: ExperienceContentComponent;
  let fixture: ComponentFixture<ExperienceContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ExperienceContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExperienceContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
