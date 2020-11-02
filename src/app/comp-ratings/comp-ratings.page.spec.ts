import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CompRatingsPage } from './comp-ratings.page';

describe('CompRatingsPage', () => {
  let component: CompRatingsPage;
  let fixture: ComponentFixture<CompRatingsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompRatingsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CompRatingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
