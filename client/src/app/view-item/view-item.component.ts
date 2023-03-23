import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-view-item',
  templateUrl: './view-item.component.html',
  styleUrls: ['./view-item.component.css']
})
export class ViewItemComponent implements OnInit {
  Email: any;
  id: any;
  islogedin: boolean = false;
  editmode: any;
  UpdateCart: any = false;
  mondal:any;
  district:any;
  selectItem: any;
  userform!: FormGroup;
  constructor(private service: ServicesService) { }
  ngOnInit(): void {
    let logDel = localStorage.getItem('loged');
    if (logDel !== null) {

      this.islogedin = true;
      let islogin = JSON.parse(logDel);
      this.Email = islogin.email;
      this.id = islogin.id;
    }

    this.selectItem = this.service.getItem();
    this.service.District().subscribe((res) => {
      this.district = res.data;
      this.getMondal();
    })
    this.UpdateCart = this.service.getEditMode();
    this.userform = new FormGroup({
      area: new FormControl(this.selectItem.area, Validators.required),
      soil: new FormControl(this.selectItem.soil, Validators.required),
      amount: new FormControl(this.selectItem.amount, Validators.required),
      district: new FormControl(this.selectItem.district, Validators.required),
      mondal: new FormControl(this.selectItem.mondal, Validators.required),
      surveyno: new FormControl(this.selectItem.surveyno, Validators.required),
      isavailable: new FormControl(false, Validators.required),
      registered: new FormControl(this.Email, Validators.required)
    })
  }

  updatedata() {
    this.userform.value.isavailable=true;
    this.userform.value.registered= "None";
    this.service.updateLand(this.userform.value).subscribe((res) => { })
    console.log("🚀 ~ this.userform.value:", this.userform.value)
    this.userform.reset();
  }
  
  applyed(){
    this.service.updateLand(this.userform.value).subscribe((res) => { })
    this.userform.reset();
  }
  editMode() {
    this.editmode = true;
  }
  onRemoveLand(data: any) {
    this.service.getDeleteLand(data).subscribe((res) => { })
  }

  getMondal() {
    if(this.userform.value.district){
      this.service.Mondal(this.userform.value.district).subscribe((res)=>{
        this.mondal=res.data[0].mondal;
      })
    }
  }
}
