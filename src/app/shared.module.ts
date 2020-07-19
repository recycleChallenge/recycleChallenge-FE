import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ReactiveFormsModule,
    ],
    exports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ReactiveFormsModule
    ]
})
export class SharedModule { }
