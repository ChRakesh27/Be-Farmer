import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private service: ServicesService) { }

  getdata: any = [];
  id: any;
  district:any;
  mondal:any;
  cartform!:FormGroup;
  ngOnInit(): void {
   
    this.service.District().subscribe((res) => {
      this.district = res.data;
    })
    //------------------ Getting data ----------------------------------
    this.service.getUnRegLand(this.id).subscribe((res) => {
      this.getdata = res.data;
    })
    
    this.cartform = new FormGroup({
      area: new FormControl('', Validators.required),
      soil: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required),
      district: new FormControl('', Validators.required),
      mondal: new FormControl('', Validators.required),
    })
  }

  selItem(data:any){
    this.service.setItem(data);
  }

  

  sub() {
    if(this.cartform.value.district){
      this.service.Mondal(this.cartform.value.district).subscribe((res)=>{
        this.mondal=res.data[0].mondal;
      })
    }
  }
}
 