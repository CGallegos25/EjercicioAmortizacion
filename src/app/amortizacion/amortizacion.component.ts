import { Calculos } from './../models/calculos';
import { Component, OnInit } from '@angular/core';
import { Amortizacion } from '../models/amortizacion';

@Component({
  selector: 'app-amortizacion',
  templateUrl: './amortizacion.component.html',
  styleUrls: ['./amortizacion.component.css']
})
export class AmortizacionComponent implements OnInit {

  public amortizacionModel = new Amortizacion(0, 0, 20);
  public calculos = new Calculos(0,0,0,0,0,0);
  public arrayLista:Array<Calculos> = [];

  constructor() {
   }

  ngOnInit(): void {

  }

  getFormAmortizacion(){

      for(let i=0; i < this.amortizacionModel.plazo; i++){

      if(i == 0){
        let calcularInteres:number = ((this.amortizacionModel.monto*this.amortizacionModel.tasa)/(this.amortizacionModel.plazo))/100;
        let amortizacion:number = ((this.amortizacionModel.monto)/(this.amortizacionModel.plazo));
        let pago:any =(calcularInteres+amortizacion);
        const deudaFinal:number = (((this.amortizacionModel.monto)+(calcularInteres))/10)-pago;
        this.arrayLista.push(new Calculos(i+1, this.amortizacionModel.monto, calcularInteres, amortizacion, pago, deudaFinal));

      } else{
              let calcularInteresN:number = ((this.arrayLista[i-1].deudaFinal*this.amortizacionModel.tasa)/(this.amortizacionModel.plazo))/100;
              let amortizacionN:number = ((this.amortizacionModel.monto)/(this.amortizacionModel.plazo));
              let pagoN:number = (calcularInteresN+amortizacionN);
              let deudaFinalN:number = ((this.sumar(this.arrayLista[i-1].deudaFinal,calcularInteresN))-pagoN);

              this.arrayLista.push(new Calculos(i+1, this.arrayLista[i-1].deudaFinal, calcularInteresN, amortizacionN, pagoN, deudaFinalN));
      }
    }

    this.amortizacionModel = new Amortizacion(0, 0, 20);
  }

  sumar(valor1:number, valor2:number){
    return (valor1+valor2);
  }

}
