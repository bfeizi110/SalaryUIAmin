
export interface  Common{
  FldInt1? : number
  FldInt2? : number
  FldInt3? : number
  FldInt4? : number
  FldString1: string
  FldString2: string
}
export class Constant {

  static getToday(): any {
    let today = new Date().toLocaleDateString("fa-IR");
    let year = today.split("/")[0].padStart(2, "0");
    let month = today.split("/")[1].padStart(2, "0");
    let day = today.split("/")[2].padStart(2, "0");
    today = year + "/" + month + "/" + day;
    today = this.NumToEnglish(today);
    return today;
  }

  static NumToEnglish(num): any {
    return num
      .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d))
      .replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
  }

  static NewGUID() {
    return window.URL.createObjectURL(new Blob([])).substr(-36);
  }

  static generateRandomNumber() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  static just_persian(str) {
    var p = /^[\u0600-\u06FF\s]+$/;
    if (!p.test(str)) {
      return false;
    }
    return true;
  }

}

export function showFile(base64Pdf) {
  var blob = base64ToBlob(base64Pdf, 'application/pdf');
  var blobUrl = URL.createObjectURL(blob);
  window.open(blobUrl);
}

export function exportFile(base64Pdf, fileName) {
  var blob = base64ToBlob(base64Pdf, 'application/pdf');
  var blobUrl = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = blobUrl
  a.setAttribute("download", fileName)
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)

}

export function base64ToBlob(b64Data, contentType = '', sliceSize = 512) {
    b64Data = b64Data.replace(/\s/g, ''); //IE compatibility...
    let byteCharacters = atob(b64Data)
    let byteArrays = []
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      let slice = byteCharacters.slice(offset, offset + sliceSize)
      let byteNumbers = new Array(slice.length)
      for (var i = 0; i < slice.length; i++)         byteNumbers[i] = slice.charCodeAt(i);
      let byteArray = new Uint8Array(byteNumbers)
      byteArrays.push(byteArray)
    }
    return new Blob(byteArrays, { type: contentType })
  }
