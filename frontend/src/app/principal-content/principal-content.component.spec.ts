import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PrincipalContentComponent } from './principal-content.component';

describe('PrincipalContentComponent', () => {
  let component: PrincipalContentComponent;
  let fixture: ComponentFixture<PrincipalContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, PrincipalContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrincipalContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
