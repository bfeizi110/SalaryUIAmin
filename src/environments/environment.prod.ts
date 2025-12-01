import { enableProdMode } from '@angular/core'
import { getBaseUrl } from '../app/app.module'

export const environment = {
  production: true,
   API_URL: "http://192.168.1.10:1010/PayrollApi/api/v1/",
  //API_URL: `${getBaseUrl()}/payrollapi/api/v1/`,

};
