import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss']
})
export class BasicInfoComponent implements OnInit {
  @Output() onSave = new EventEmitter();
  public basicForm: FormGroup;
  constructor(private fb: FormBuilder, private fbService:  FirebaseService) {     
    this.initForm();
  }
  events: string[] = [];
 
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
  }
 
  saveBasicInformation(){
      this.onSave.emit(this.basicForm.value);
  }
  initForm(){
    this.basicForm = this.fb.group({
      'first_name': ['',[Validators.required]],
      'last_name': ['',[Validators.required]],
      'birth_day': ['',[Validators.required]],
      'university': ['',[Validators.required]]
    })
  }
  foods: any[] = [
    {value: 'Alabama A & M University', viewValue: 'Alabama A & M University'},
    {value: 'Amridge University', viewValue: 'Amridge University'},
    {value: "University of Arizona", viewValue: "University of Arizona"},
    {value: 'University of Alabama System Office', viewValue: 'University of Alabama System Office'},
    {value: 'Lurleen B Wallace Community College', viewValue: 'Lurleen B Wallace Community College'},
    {value: "Carrington College-Phoenix", viewValue: "Carrington College-Phoenix"},
    {value: 'Charles of Italy Beauty College', viewValue: 'Charles of Italy Beauty College'},
    {value: 'Lurleen B Wallace Community College', viewValue: 'Lurleen B Wallace Community College'},
    {value: "Charter College-Anchorage", viewValue: "Charter College-Anchorage"},
    {value: 'Amridge University', viewValue: 'Amridge University'},
    {value: "Ottawa University-Phoenix", viewValue: "Ottawa University-Phoenix"},
    {value: "University of North Alabama", viewValue: "University of North Alabama"}


  ];
  ngOnInit(): void {}

}
