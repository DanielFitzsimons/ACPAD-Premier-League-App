import { Component, OnInit } from '@angular/core';
import { FootballService } from 'src/app/services/football.service';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-fixture',
  templateUrl: './fixture.page.html',
  styleUrls: ['./fixture.page.scss'],
})
export class FixturePage implements OnInit {

  fixtures: any;

  constructor(private footballService: FootballService, private navctrl: NavController,) {}

  ngOnInit(): void {
    this.footballService.getFixtures().subscribe(
      (data) => {
        this.fixtures = data;
        console.log('Fixtures Data:', this.fixtures);
      },
      (error) => {
        console.error('Error fetching fixtures:', error);
      }
    );
  }

  goHome(){
    this.navctrl.navigateForward('/home');
  }

}
