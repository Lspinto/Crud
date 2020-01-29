import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ApiService]
})
export class AppComponent {
  clientes = [{nome: 'test'}];
  selectedCliente;


  constructor(private api: ApiService){
      this.getClientes();
      this.selectedCliente = {id: -1, nome:'', idade:0, cpf:0}
      }
    getClientes = () => {
      this.api.getAllClientes().subscribe(
        data => {
           this.clientes = data;

        },
        error => {
          console.log(error);
        }
      );
    }
    clienteClicked = (cliente) => {
      this.api.getOneClientes(cliente.id).subscribe(
        data => {
         this.selectedCliente = data;

        },
        error => {
          console.log(error);
        }
      );
    }

    updateCliente = () => {
     this.api.updateCliente(this.selectedCliente).subscribe(
        data => {
         this.selectedCliente = data;

        },
        error => {
          console.log(error);
        }
      );
    }

     createCliente = () => {
     this.api.createCliente(this.selectedCliente).subscribe(
        data => {
         this.clientes.push(data);

        },
        error => {
          console.log(error);
        }
      );
    }

    deleteCliente = () => {
    this.api.deleteCliente(this.selectedCliente.id).subscribe(
        data => {
         this.getClientes

        },
        error => {
          console.log(error);
        }
      );
    }
}
