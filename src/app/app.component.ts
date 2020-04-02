import { Component, Compiler, ViewChild, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { map, switchMap, debounceTime, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Cotton Avenue';
  selectedIndex = 0;
  images = [1, 2, 3].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);
  showHeader: boolean;
  showScollToTop: boolean;
  constructor(private compiler: Compiler, http:HttpClient){
    http.get('').pipe(
      catchError(err => {
      console.log(err);
     return of(null);
      })
   );
    setTimeout(()=>{
      this.showHeader = true;
    },1200)
  }
  goto(event){
    this.selectedIndex = event;
    setTimeout(()=>{
      document.getElementById("blankDiv").click();
    },1500);
  }
  @HostListener('window:scroll', [])
  onWindowScroll() {
      if(window.pageYOffset > 50){
        this.showScollToTop = true;
        if(document.getElementById('scollToTopBtn')){
           if (window.pageYOffset > document.getElementById('footer').offsetTop - 560) {
            document.getElementById('scollToTopBtn').style.bottom = 
            window.screen.width > 600 ?'110px' : '130px';
          }else {
            document.getElementById('scollToTopBtn').style.bottom = '20px'
          }
        }
      }else {
        this.showScollToTop = false;
      }
  }
}
