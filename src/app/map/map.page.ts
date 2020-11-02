import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';
import { MenuController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
// import { ConsoleReporter } from 'jasmine';

declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage {

  map: any;
  container: any;

  conts
  address
  currentLocation
  distance
  phone
  hours
  email

  mapMarker1
  mapMarker2
  mark1: boolean = false;
  mark2: boolean = false;


  nearby
  nearest
  nearAddr
  nearbyArr = [];
  sortedNear

  // markersArray = [];

  @ViewChild('map', { read: ElementRef, static: false }) mapRef: ElementRef;

  // infoWindows: any = []
  userMark: any = [];

  markers1: any = [
    {
      title: "Tempat Pembuangan Sampah Rimba",
      latitude: "4.954176",
      longitude: "114.916100",
      address: "Jalan 18, Bandar Seri Begawan BE3319"
    },
    {
      title: "Garbage Dump Gadong",
      latitude: "4.922586",
      longitude: "114.914836",
      address: "Gadong Estate Road, Bandar Seri Begawan"
    },
    {
      title: "Bengkurong Masin Garbage Dump",
      latitude: "4.845776",
      longitude: "114.876899",
      address: "Kampung Sinarubai"
    },
    {
      title: "Sungai Paku Landfill",
      latitude: "4.707596",
      longitude: "114.542373",
      address: "Sungai Pepakan"
    },
    {
      title: "Tanjong Maya Garbage Dump",
      latitude: "4.748710",
      longitude: "114.665049",
      address: "Jln Tanjong Maya, kampung Tanjong Maya"
    },
  ];

  markers2: any = [
    {
      title: "Daikyo Environmental Recycling Sdn Bhd",
      latitude: "5.004243",
      longitude: "115.062124",
      address: "Spg 287 Jln Serasa, Muara BT1128",
      phone: "+673 2773380",
      email: "daikyorecycling@gmail.com",
      hours: "8AM-5PM"
    },
    {
      title: "EnEnvo Sdn Bhd",
      latitude: "4.789639",
      longitude: "114.647883",
      address: "Kampung Serambangun",
      phone: "+673 4220838",
      hours: "8AM-5PM"
    },
    {
      title: "Green Depot",
      latitude: "4.587616",
      longitude: "114.203096",
      address: "No 1 Simpang 24-29, Kuala Belait",
      phone: "+673 8729756",
      hours: "8AM-5PM"
    },
    {
      title: "Syarikat Perindustrian Dan Perkembangan Pemotongan Dan Memasak Besi",
      latitude: "4.861574",
      longitude: "114.856890",
      address: "Spg. 41, Jalan Kilanas Mulaut, Negara Brunei Darussalam",
      phone: "+673 2662205",
      hours: "8AM-5PM"
    },
    {
      title: "CIC Environmental Services Sdn Bhd",
      latitude: "4.589911",
      longitude: "114.215845",
      address: "Lot 5169, Simpang 144, Jln Maulana, Kuala Belait KA1531",
      phone: "+673 3330266",
      email: "arief.razak@cicgrp.com",
      hours: "7:30AM-4:30PM",
    },

  ];

  constructor(
    private menu: MenuController,
    private geolocation: Geolocation
  ) {
    // this.menu.open();
  }

  //side menu
  openFirst() {
    this.menu.enable(true, 'first');

  }

  ionViewWillEnter(){
    this.menu.open();
  }


  // ngOnInit() {
  // }

  ionViewDidEnter() {
    this.showMap();
    this.menu.open('first');
  }

  addMarkersToMap(markers) {
    var iconBase = 'http://maps.google.com/mapfiles/ms/icons/';
    for (let marker of markers) {
      let position = new google.maps.LatLng(marker.latitude, marker.longitude);
      this.mapMarker1 = new google.maps.Marker({
        position: position,
        title: marker.title,
        latitude: marker.latitude,
        longitude: marker.longitude,
        address: marker.address,
        animation: google.maps.Animation.DROP,
        icon: iconBase + "blue.png"
      });

      this.mapMarker1.setMap(this.map);
      this.addInfoWindowToMarker(this.mapMarker1);
      this.nearbyMarker(this.mapMarker1)

    }
  }

  addMarkersToMapD(markers) {
    var iconBase = 'http://maps.google.com/mapfiles/ms/icons/'
    for (let marker of markers) {
      let position = new google.maps.LatLng(marker.latitude, marker.longitude);
      this.mapMarker2 = new google.maps.Marker({
        position: position,
        title: marker.title,
        latitude: marker.latitude,
        longitude: marker.longitude,
        address: marker.address,
        phone: marker.phone,
        hours: marker.hours,
        email: marker.email,
        animation: google.maps.Animation.DROP,
        icon: iconBase + "green.png"
      });

      this.mapMarker2.setMap(this.map);
      this.addInfoWindowToMarker(this.mapMarker2);
      this.nearbyMarker(this.mapMarker2)

    }
  }


  nearbyMarker(marker) {
    // setTimeout(() => {
    // for (let marker of markers){
    // let position = new google.maps.LatLng(markers.latitude, markers.longitude);
    let position = { lat: parseFloat(marker.latitude), lng: parseFloat(marker.longitude) }
    let current = this.currentLocation
    let i = 0;


    // console.log(position)


    new google.maps.DistanceMatrixService().getDistanceMatrix(
      { 'origins': [current], 'destinations': [position], travelMode: 'DRIVING', unitSystem: google.maps.UnitSystem.METRIC },
      (results: any) => {
        this.nearby = results.rows[i].elements[i].distance.value / 1000;
        // i++
        // console.log(this.nearby)
        // console.log("result2")
        // console.log(results.rows[2].elements[2].distance.value/1000)
        // console.log(this.nearby)
        if (this.nearby <= 20) {

          this.nearest = marker.title
          this.nearAddr = this.nearby + "km away"
        }
      });

    //  this.nearby = this.getDistance(current,{lat: parseFloat(markers.latitude), lng: parseFloat(markers.longitude)});
    // if(this.nearby <  10){

    //   this.nearest= marker.title

    //  }
    // }
    // }, 1000);

  }



  addInfoWindowToMarker(marker) {

    marker.addListener('click', () => {
      // this.closeAllInfoWindows();
      // infoWindow.open(this.map, marker);

      this.conts = marker.title;
      this.address = marker.address;
      if (marker.phone == undefined && marker.hours == undefined) {
        this.phone = "";
        this.hours = "";
      } else if (marker.phone != undefined && marker.hours != undefined) {
        this.phone = "Phone: " + marker.phone;
        this.hours = "Open Hours: " + marker.hours;
      }
      if (marker.email == undefined) {
        this.email = "";
      }
      if (marker.email != undefined) {
        this.email = "Email: " + marker.email;
      }

      this.getDistance(this.currentLocation, { lat: parseFloat(marker.latitude), lng: parseFloat(marker.longitude) });

    });
  }



  getDistance(origin: any, destination: any) {
    return new google.maps.DistanceMatrixService().getDistanceMatrix(
      { 'origins': [origin], 'destinations': [destination], travelMode: 'DRIVING', unitSystem: google.maps.UnitSystem.METRIC },

      (results: any) => {
        this.distance = results.rows[0].elements[0].distance.value / 1000 + "km away";
      });
  }

  getGeolocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      let pos = {
        lat: resp.coords.latitude,
        lng: resp.coords.longitude
      };


      // var iconBase = 'http://maps.google.com/mapfiles/kml/paddle/';
      var iconBase = 'http://maps.google.com/mapfiles/kml/shapes/';

      let marker = new google.maps.Marker({
        position: pos,
        map: this.map,
        title: 'I am here!',
        // icon: iconBase + 'grn-blank.png'
        icon: iconBase + 'man.png'
      });
      this.userMark.push(marker);
      this.map.setCenter(pos);
      return this.currentLocation = pos;
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }






  showMap() {
    const location = new google.maps.LatLng();
    const options = {
      // center: location,
      zoom: 12,
      disableDefaultUI: true
    }
    this.map = new google.maps.Map(this.mapRef.nativeElement, options)
    // this.addMarkersToMap(this.markers);
    this.getGeolocation();
    // this.nearbyMarker(this.mapMarker);
    // this.calculateDistances(this.currentLocation, this.markers)
  }

  showDumpsites() {
    // this.mark1 = false;
    this.mark2 = true;

    this.addMarkersToMap(this.markers1);
    this.menu.close();


  }

  showDropoff() {
    this.mark1 = true;

    this.addMarkersToMapD(this.markers2);
    this.menu.close();

  }

  styles = {
    default: [],
    hide: [
      {
        // featureType: "poi.business",
        stylers: [{ visibility: "off" }],
      },
    ],
  };



}
