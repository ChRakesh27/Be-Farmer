import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-landlord',
  templateUrl: './landlord.component.html',
  styleUrls: ['./landlord.component.css']
})
export class LandlordComponent implements OnInit {
  getdata: any = [];
  getRegData: any = [];
  islogin: any;
  UserName: any;
  Email: any;
  id: any;
  imageBase64!: string;
  selectedFile!: File;
  displayStyle: any = "none";
  district: any;
  mondal: any;
  cartform!: FormGroup;
  userform!: FormGroup;

  constructor(private service: ServicesService) { }

  ngOnInit(): void {
    let userDel: any = localStorage.getItem('loged');



    if (userDel !== null) {
      this.islogin = JSON.parse(userDel);
      this.UserName = this.islogin.username;
      this.Email = this.islogin.email;
      this.id = this.islogin.id;
    }
    //------------------ Getting data ----------------------------------

    // this.service.getAllLand(this.id).subscribe((res) => {
    //   this.getdata=res.data.filter((ele:any)=> ele.id==this.id);
    //   this.getRegData=res.data.filter((ele:any)=> ele.registered==this.Email);
    // })

    this.service.getAllLand(this.id).subscribe((res) => {
      this.getdata = res.data;
    })
    this.service.District().subscribe((res) => {
      this.district = res.data;
    })
    this.service.getAllLand(this.Email).subscribe((res) => {
      this.getRegData = res.data;
    })

    this.cartform = new FormGroup({
      userId: new FormControl(this.id),
      area: new FormControl('', Validators.required),
      soil: new FormControl('', Validators.required),
      surveyno: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required),
      district: new FormControl('', Validators.required),
      mondal: new FormControl('', Validators.required),
    })

    this.userform = new FormGroup({
      isavailable: new FormControl('', Validators.required),
      registered: new FormControl('', Validators.required),
      surveyno: new FormControl('', Validators.required),
    })


  }

  updatePopup(data: any) {
    this.displayStyle = data;
  }

  onSelectImg(e: any) {
    if (e.target.files) {
      this.selectedFile = e.target.files[0]
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.imageBase64 = event.target.result.split(',')[1];
      }
    }
  }



  //------------------ Updating the land when u " Submit "----------------------------------
  onSubmitLandInfo() {
    if (this.cartform.valid) {
      this.service.createLand(this.cartform.value, this.selectedFile).subscribe(() => {
        this.displayStyle = "none";
        this.cartform.reset();
      });
    }
  }



  //------------------ Updating the land when u " Reject "----------------------------------
  LandReject(data: any) {

    this.getRegData = this.getRegData.filter((element: any) => { return element.surveyno !== data });
    this.userform.value.surveyno = data;
    this.userform.value.isavailable = true;
    this.userform.value.registered = 'none';
    this.service.updateLand(this.userform.value).subscribe((res) => { })
    this.userform.reset();
  }


  selItem(data: any) {
    this.service.setItem(data);
    this.service.setEditMode(true);
  }


  getMondal() {
    if (this.cartform.value.district) {
      this.service.Mondal(this.cartform.value.district).subscribe((res) => {
        this.mondal = res.data[0].mondal;
      })
    }
  }



}
