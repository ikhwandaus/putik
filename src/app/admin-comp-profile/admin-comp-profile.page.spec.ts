import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdminCompProfilePage } from './admin-comp-profile.page';

describe('AdminCompProfilePage', () => {
  let component: AdminCompProfilePage;
  let fixture: ComponentFixture<AdminCompProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCompProfilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminCompProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
