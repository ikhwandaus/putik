import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';

declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage{

  map: any;
  container: any;

  @ViewChild('map', {read: ElementRef, static: false}) mapRef: ElementRef;

  infoWindows: any = []
  markers: any = [
    {
        title:"Tempat Pembuangan Sampah Rimba",
        latitude:"4.954176",
        longitude:"114.916100",
        address:"Jalan 18, Bandar Seri Begawan BE3319"
    },
    {
        title:"Garbage Dump Gadong",
        latitude:"4.922586",
        longitude:"114.914836",
        address:"Gadong Estate Road, Bandar Seri Begawan"
    },
    {
        title:"Bengkurong Masin Garbage Dump",
        latitude:"4.845776",
        longitude:"114.876899",
        address:"Kampung Sinarubai"
    }
  ];
    
  constructor() { }

  // ngOnInit() {
  // }

  ionViewDidEnter(){
    this.showMap();
  }

  addMarkersToMap(markers){
    for (let marker of markers){
      let position = new google.maps.LatLng(marker.latitude, marker.longitude);
      let mapMarker = new google.maps.Marker({
        position: position,
        title: marker.title,
        latitude: marker.latitude,
        longitude: marker.longitude,
        address: marker.address
      });

      mapMarker.setMap(this.map);
      this.addInfoWindowToMarker(mapMarker);
    }
  }

  addInfoWindowToMarker(marker){
    let infoWindowContent = '<div id="content">' +
                            '<h2 id="firstHeading" class="headerTitle">' + marker.title + '</h2>' +
                            '<p class="pGreen">Latitude: ' + marker.latitude + '</p>' +
                            '<p class="pGreen">Longitude: ' + marker.longitude + '</p>' +
                            '<p class="pGreen">Address: ' + marker.address + '</p>' +
                            '</div>';
    
    let infoWindow = new google.maps.InfoWindow({
      content: infoWindowContent
    });

    // let conContent = this.container({
    //   content: infoWindowContent
    // });

    marker.addListener('click', () =>{
      this.closeAllInfoWindows();
      infoWindow.open(this.map, marker);
    });
    this.infoWindows.push(infoWindow)
  } 

  closeAllInfoWindows(){
    for(let window of this.infoWindows){
      window.close();
    }
  }



  

  showMap(){
    const location = new google.maps.LatLng(4.9031, 114.9398);
    const options = {
      center: location,
      zoom: 15,
      disableDefaultUI: true
    }
    this.map = new google.maps.Map(this.mapRef.nativeElement, options)
    this.addMarkersToMap(this.markers);
  }



}
