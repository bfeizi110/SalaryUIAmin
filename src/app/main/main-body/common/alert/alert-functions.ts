import Swal from 'sweetalert2'

export class AlertClass {

  static async deleteAlert(callback: (e: any) => void): Promise<any> {
    Swal.fire({
      title: 'آیا مایل به حذف هستید؟',
      text: 'شما نمی توانید عملیات را برگردانید!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#673BB7',
      cancelButtonColor: '#d33',
      confirmButtonText: 'بلی',
      cancelButtonText: 'خیر',
    }).then(e => promisFunc(e.isConfirmed).then(e => callback(e)))
  }

  static async questionAlert(argument: ArgumentType, callback: (e: boolean) => void): Promise<any> {
    Swal.fire({
      title: 'تاییدیه',
      text: argument.text,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'بلی',
      cancelButtonText: 'خیر',
    }).then(e => promisFunc(e.isConfirmed).then(e => callback(e)))
  }

  static async questionAlertCheckBoxInput(argument: ArgumentType, callback: (e: boolean, value: boolean) => void): Promise<any> {
    Swal.fire({
      title: 'تاییدیه',
      text: argument.text,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'بلی',
      cancelButtonText: 'خیر',
      input: 'checkbox',
      inputValue: false,
      inputPlaceholder: "<h4 style='color:red;margin-bottom:0px' =>انتقال پرداختهای پیش نویس به ماه بعد</h4>",
      didOpen: () => {
        Swal.getInput().select()
      }
    }).then(e => {
      let value: boolean = e.value
      promisFunc(e.isConfirmed).then(e => callback(e,value))
    } )
  }

  static async customAlert(argument: ArgumentType, callback: (e: boolean) => void): Promise<any> {
    Swal.fire({
      title: argument.title,
      text: argument.text,
      icon: argument.type,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'بلی',
      cancelButtonText: 'خیر',
    }).then(e => promisFunc(e.isConfirmed).then(e => callback(e)))
  }
}

function promisFunc(trueFalse): Promise<boolean> {
  return new Promise((resolve, reject) => {
    if (trueFalse) return resolve(trueFalse)
    else return reject(trueFalse)
  })
}

export interface ArgumentType {
  title?: string
  text?: string
  type?: 'question' | 'warning'
}
