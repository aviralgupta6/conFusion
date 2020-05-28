import { Component, OnInit, Inject } from '@angular/core';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
import { switchMap } from 'rxjs/operators';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  leaders: Leader[];
  errMess: string;

  selectedLeader: Leader;

  constructor(private leaderService: LeaderService,
    @Inject ('BaseURL') private BaseURL) {

  }

  ngOnInit() {
     this.leaderService.getLeaders()
    .subscribe((leaders) => this.leaders= leaders,
    errmess => this.errMess = <any>errmess);
  }

  onSelect(leader: Leader) {
    this.selectedLeader = leader;
  }

}
