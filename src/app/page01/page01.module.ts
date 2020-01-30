import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Page01PageRoutingModule } from './page01-routing.module';

import { Page01Page } from './page01.page';
import { NgxQRCodeModule } from 'ngx-qrcode2';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxQRCodeModule,
    Page01PageRoutingModule
  ],
  declarations: [Page01Page]
})
export class Page01PageModule {}
