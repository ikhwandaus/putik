import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CompPlansPage } from './comp-plans.page';

describe('CompPlansPage', () => {
  let component: CompPlansPage;
  let fixture: ComponentFixture<CompPlansPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompPlansPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CompPlansPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
