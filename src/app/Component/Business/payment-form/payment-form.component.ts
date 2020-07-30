import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmDialogService } from 'src/app/service/confirm-dialog.service';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css']
})
export class PaymentFormComponent implements OnInit {

  constructor(
    private router: Router,
    private confirmDialogService: ConfirmDialogService
  ) { }

  ngOnInit() {
  }

  CancelPaymentForm(){
    this.router.navigateByUrl('ServiceList');
  }

  SavePaymentForm(){
    this.confirmDialogService.confirm('Confirmar compra', '¿Esta que quiere hacer la compra de este producto?', 'Aceptar', 'Cancelar', 'lg')
      .then((confirmed) =>
        this.router.navigateByUrl('ServiceList')
      )
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

}
