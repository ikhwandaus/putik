import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdminCompsPage } from './admin-comps.page';

describe('AdminCompsPage', () => {
  let component: AdminCompsPage;
  let fixture: ComponentFixture<AdminCompsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCompsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminCompsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
