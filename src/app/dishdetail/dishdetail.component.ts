import { Component, OnInit, Input, ViewChild, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { switchMap } from 'rxjs/operators';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback } from '../shared/feedback';


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  dish: Dish;
  dishIds: string[];
  prev: string;
  next: string;
  feedbackForm: FormGroup;
  feedback: Feedback;
  errMess: string;
  @ViewChild('fform', {static: false}) feedbackFormDirective;


  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    @Inject ('BaseURL') private BaseURL) {
      this.createForm();
     }

  ngOnInit() {
    this.dishservice.getDishIds()
      .subscribe(dishIds => this.dishIds = dishIds);
    this.route.params.pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])))
      .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); },
      errmess => this.errMess = <any>errmess);
  }

  createForm() {
    this.feedbackForm = this.fb.group({
  author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
  rating:5,
  comment: ['', [Validators.required]],
  date:[(Date)]
});
}

onSubmit() {
  this.dish.comments.push(this.feedbackForm.value)
  this.feedback = this.feedbackForm.value;
  console.log(this.feedback);
  this.feedbackForm.reset({
    author: '',
    rating:'',
    comment: '',
    
  });
  this.feedbackFormDirective.resetForm();

}

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }
  goBack(): void {
    this.location.back();
  }

}