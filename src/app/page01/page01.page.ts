import { Component, OnInit } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
 
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';

@Component({
  selector: 'app-page01',
  templateUrl: './page01.page.html',
  styleUrls: ['./page01.page.scss'],
})
export class Page01Page implements OnInit { 
  pdfObj = null;
  createdCode = '1234555555';

  constructor(
    public navCtrl: NavController, 
    private plt: Platform, 
    private file: File, 
    private fileOpener: FileOpener,
    private bluetoothSerial: BluetoothSerial,
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.gerarPDF();
  }


  

  gerarPDF(){
    const canvas = document.querySelector("canvas") as HTMLCanvasElement;
    const imageData = canvas.toDataURL("image/jpeg").toString();
    

    let base64exemplo = imageData;
    var docDefinition = {
      content: [
      {
      columns: [
      {
      image: base64exemplo,
      fit: [200,200],

      },
      [
      { text: 'BITCOIN', style: 'header',  },
      { text: 'Cryptocurrency Payment System', style: 'sub_header' },
      { text: 'WEBSITE: https://bitcoin.org/', style: 'url' },
      ]
      ]
      }
      ],
      styles: {
      image: {
        
      },  
      header: {
      bold: true,
      fontSize: 60,
      alignment: 'right'
      },
      sub_header: {
      fontSize: 40,
      alignment: 'right'
      },
      url: {
      fontSize: 30,
      alignment: 'right'
      }
      }
     
      };
      
    this.pdfObj = pdfMake.createPdf(docDefinition);
  }

  testarImpressao02(){
    this.pdfObj.getBuffer((buffer) => {
      this.enviaBluetoothSerial(buffer);

      let blob = new Blob([buffer], { type: 'application/pdf' });
      this.file.writeFile(this.file.dataDirectory, 'Orcamento.pdf', blob, { replace: true }).then(fileEntry => {
        this.fileOpener.open(this.file.dataDirectory + 'Orcamento.pdf', 'application/pdf');
      })
    });
  }

  enviaBluetoothSerial(buffer){
    this.bluetoothSerial.write(buffer).then(() => console.log("Funcionou!"), (error) => console.log(error));
  }
}
