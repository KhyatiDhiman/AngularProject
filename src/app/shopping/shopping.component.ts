import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss'],
  animations: [trigger('fadeInOut', [
    state('void', style({
      opacity: 0
    })),
    transition('void <=> *', animate(1500)),
  ]),]
})
export class ShoppingComponent implements OnInit {
  /*images = [
    'https://rukminim1.flixcart.com/image/800/960/jf8khow0/t-shirt/f/e/w/xxl-arnavee-65-cottonavenue-original-imaf3qrdbxw6yxqg.jpeg?q=50',
    'https://rukminim1.flixcart.com/image/800/960/jf8khow0/t-shirt/f/e/w/l-arnavee-65-cottonavenue-original-imaf3qredqmsv4g7.jpeg?q=50',
    'https://rukminim1.flixcart.com/image/800/960/jf8khow0/t-shirt/f/e/w/m-arnavee-65-cottonavenue-original-imaf3qrf2ehx2mnz.jpeg?q=50',
    'https://rukminim1.flixcart.com/image/800/960/jf8khow0/t-shirt/f/e/w/m-arnavee-65-cottonavenue-original-imaf3qrfjyubqgwh.jpeg?q=50']

  imagesTile = [1, 2, 3,4,5,6,7,8,9,10].map(() => `https://rukminim1.flixcart.com/image/800/960/jmqmpow0-1/t-shirt/m/k/4/l-arnavee-87-cottonavenue-original-imaf9gh58hhdnzqh.jpeg?q=50`);
  */
  closeResult: string;
  tShirtRecord = {
    id: '',
    tshirtImage : 'https://rukminim1.flixcart.com/image/800/960/jmqmpow0-1/t-shirt/m/k/4/l-arnavee-87-cottonavenue-original-imaf9gh58hhdnzqh.jpeg?q=50',
    title: 'High Neck Multicolor T-Shirt',
    salePrice: '477',
    orginalPrice: '1990',
    off: '61% off',
    size: 'L;XL',
    tshirtColor: '#006400;#000080',
    flipcartLink: 'https://www.flipkart.com/cottonavenue-self-design-men-high-neck-multicolor-t-shirt/p/itmf3ytfrfgtvnef',
    amazonLink: 'https://www.flipkart.com/cottonavenue-self-design-men-high-neck-multicolor-t-shirt/p/itmf3ytfrfgtvnef'
  };
  tShirtRecords: any = []
  viewTshirtRecords: any = []
  showTiles: boolean;
  showError:boolean = false;
  constructor(private http: HttpClient) { 
    setTimeout(()=>{
      this.showTiles = true;
    },850)
  }

  ngOnInit() {
    this.http.get('assets/productList.csv',{responseType: 'text'}).subscribe((data)=> {
      let csv: string = data;
      let allTextLines = csv.split(/\r|\n|\r/);
      let headers = allTextLines[0].split(',');
      let lines = [];

        for (let i = 0; i < allTextLines.length; i++) {
          // split content based on comma
          let data = allTextLines[i].split(',');
          if (data.length === headers.length) {
            let tarr = [];
            for (let j = 0; j < headers.length; j++) {
              tarr.push(data[j]);
            }

          // log each row to see output 
          lines.push(tarr);
        }
      }
      // all rows in the csv file 
      var objArray = [];
    for (var i = 1; i < lines.length; i++) {
        objArray[i - 1] = {};
        for (var k = 0; k < lines[0].length && k < lines[i].length; k++) {
            var key = lines[0][k];
            objArray[i - 1][key] = lines[i][k]
            objArray[i - 1]['index'] = (i-1);
        }
    }
    this.tShirtRecords = objArray;
    let temp = this.tShirtRecords;
    this.viewTshirtRecords = temp.slice(0, 40);
    this.showNxtBtn = this.tShirtRecords.length > 41;
  }, (error)=>{
      console.log(error);
      this.showError = true;
    });
   
 
  }
  getSize(sizeStr) {
    return sizeStr.toUpperCase().replace(/;/g, ", ");
  }
  prevRec = 40;
  showNxtBtn = true;
  showPrevBtn = false;
  getNextPage(){
    let temp = this.tShirtRecords;
    this.viewTshirtRecords =[];
    this.viewTshirtRecords = temp.slice(this.prevRec, this.prevRec + 40);
    this.prevRec = this.prevRec + 40;
    if(this.tShirtRecords.length <= this.prevRec) {
      this.showNxtBtn = false;
      this.showPrevBtn = true;
    }else {
      this.showNxtBtn = true; 
      this.showPrevBtn = true;
    }
  }
  getPrevPage(){
    let temp = this.tShirtRecords;
    this.viewTshirtRecords =[];
    this.viewTshirtRecords = temp.slice(this.prevRec - 80, this.prevRec-40);
    this.prevRec = this.prevRec - 40;
    if( 0 != this.prevRec - 40) {
      this.showPrevBtn = true;
      this.showNxtBtn = true;
    }else {
      this.showPrevBtn = false;
      this.showNxtBtn = true;
    }
  }
  hidePic(record){
   // this.viewTshirtRecords[index].tshirtImage = '/images/INA.png';
    let temp = this.tShirtRecords.filter(function(ele){
      return ele != record;
    });
    this.tShirtRecords = temp;
    this.viewTshirtRecords = temp.slice(0, 40);
    this.showNxtBtn = this.tShirtRecords.length > 41;
  }
  }
