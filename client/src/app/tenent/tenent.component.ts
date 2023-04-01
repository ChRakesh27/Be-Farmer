import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-tenent',
  templateUrl: './tenent.component.html',
  styleUrls: ['./tenent.component.css']
})
export class TenentComponent implements OnInit {

  constructor(private service: ServicesService) {
  }

  getdata: any = [];
  islogedin: any = false;
  Email: any;
  id: any;
  logDel: any = localStorage.getItem('loged');

  islogin = JSON.parse(this.logDel);

  userform = new FormGroup({
    isavailable: new FormControl(),
    registered: new FormControl(),
    surveyno: new FormControl(),

  })


  ngOnInit(): void {

    if (this.logDel !== null) {
      this.islogedin = true;
      this.Email = this.islogin.email;
      this.id = this.islogin.id;
    }
    // getting land data

    this.service.getUnRegLand(this.id).subscribe((res) => {
      this.getdata = res.data.slice(0, 4)
      this.getdata.forEach((item: any) => {
        item.pic = btoa(
          new Uint8Array(item.img.data)
            .reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
      });
      console.log("🚀 ~ res:", this.getdata)
    })


  }


  //------------------ Updating the land when u " apply "----------------------------------

  updatedata(data: any) {
    this.getdata = this.getdata.filter((element: any) => { return element.surveyno !== data });
    this.userform.value.surveyno = data;
    this.userform.value.isavailable = false;
    this.userform.value.registered = this.Email;
    this.service.updateLand(this.userform.value).subscribe((res) => {
      this.userform.reset();
    })

  }
  selItem(data: any) {
    this.service.setItem(data);
  }
}
