import { Component, OnInit } from '@angular/core';
import { Printer, PrintOptions } from '@ionic-native/printer/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private printer: Printer
  ) {}

  ngOnInit(){
  }

  testarImpressao01(){
    this.printer.isAvailable().then(() => {
      let conteudoDaImpressao = document.getElementById('teste').outerHTML;
      this.printer.print(conteudoDaImpressao).then(
        () => {
          alert("printing done successfully !");
        },
        () => {
          alert("Error while printing !");
        }
      ).catch((error) => {
        console.log('Erro:', error);
      });
    }, (error) => {
      console.log('Erro:', error);
    });
  }

}
