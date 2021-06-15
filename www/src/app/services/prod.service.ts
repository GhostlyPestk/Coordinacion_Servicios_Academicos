import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { AuthService } from 'src/app/services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class ProdService {

  constructor(private auth: AuthService) { }
  
  async getProdep(codigo){
    const resp = await this.auth.getProd(codigo);
    console.log(resp);
  }
}
