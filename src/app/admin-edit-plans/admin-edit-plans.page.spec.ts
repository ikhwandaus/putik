import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdminEditPlansPage } from './admin-edit-plans.page';

describe('AdminEditPlansPage', () => {
  let component: AdminEditPlansPage;
  let fixture: ComponentFixture<AdminEditPlansPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEditPlansPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminEditPlansPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
