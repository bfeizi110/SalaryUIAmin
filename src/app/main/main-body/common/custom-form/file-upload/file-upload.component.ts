import { Component, EventEmitter, Input, OnInit, Output, SecurityContext } from '@angular/core';
import { DomSanitizer,SafeUrl } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { GridFormService } from '../../grid-form.service';
import { MaxFileSize, setMaxFileSize } from 'src/app/main/pages/global-attr';

@Component({
  selector: 'file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  files: File[] = [];
  fileUrls: SafeUrl[] = [];
  @Input() required: boolean
  @Input() disabled: boolean
  @Input() control: any;
  @Input() label: any;
  @Output() filesChanged = new EventEmitter();


  constructor(private sanitizer: DomSanitizer, private toastr: ToastrService, private service: GridFormService) {}
  maxFileSize: any
  getMaxFileSize() {
    this.maxFileSize = MaxFileSize
    !this.maxFileSize
    ? this.service.get(`OtherSetting/GetByName/MaxFileSize_Fld`).toPromise().then((res: any) => {
      this.maxFileSize = res.Data == '' ? 500000 : res.Data
      setMaxFileSize(this.maxFileSize)
    })
    : null
  }

  base64ToFile(base64: string, fileName: string): File {
    const byteString = atob(base64);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([uint8Array], { type: this.getTypeByFileName(fileName) });
    return new File([blob], fileName, { type: this.getTypeByFileName(fileName) });
  }

  ngOnInit(): void {
    this.getMaxFileSize()
    let filesT: any
    if (this.control && this.control.length) {
      filesT = this.control.map(f => ({
        fileName: f.FileName,
        file : this.base64ToFile(f.Content, f.FileName),
        fileType : f.FileType
      }));
      this.files = filesT.map(f =>
        f.file
      )
      this.fileUrls = this.files.map(f => this.getFileUrl(f));
    }
  }
  onFilesSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      for (let i = 0; i < input.files.length; i++) {
        const file = input.files[i];
        if (this.isFileAlreadyAdded(file)) {
          this.toastr.error('این فایل قبلا اضافه شده', 'خطا')
          continue;
        }
        if (file.size > this.maxFileSize) {
          this.toastr.error(`سایز فایل انتخابی بزرگتر از ${this.maxFileSize/1000}کیلو بایت می باشد`, 'خطا')
          continue;
        }

        this.files.push(file);
        const fileUrl = this.getFileUrl(file);
        this.fileUrls.push(fileUrl);
      }
      this.filesChanged.emit(this.files);
    }
  }

  isFileAlreadyAdded(file: File): boolean {
    return this.files.some(existingFile => existingFile.name === file.name);
  }

  convertSafeUrlToFile(safeUrl: SafeUrl, fileName: string): Promise<File> {
    const url = this.sanitizer.sanitize(SecurityContext.URL, safeUrl) as string;
    return fetch(url)
      .then(response => response.blob())
      .then(blob => new File([blob], fileName, { type: blob.type }));
  }

  removeFile(index: number) {
    const fileUrl = this.fileUrls[index] as string;
    URL.revokeObjectURL(fileUrl);
    this.files.splice(index, 1);
    this.fileUrls.splice(index, 1);
    this.filesChanged.emit(this.files);
  }
  getFileUrl(file: File): SafeUrl {
    const fileUrl = URL.createObjectURL(file);
    return this.sanitizer.bypassSecurityTrustUrl(fileUrl);
  }
  openFile(url: SafeUrl , file: File) {
    if(file && ((file.type.includes("application/pdf")) || this.isImage(file)))
     {
      const fileName = file.name;
      const a = document.createElement('a');
      a.href = (url as any).changingThisBreaksApplicationSecurity;
      document.body.appendChild(a);
      window.open(a.href);
    }
    else {
      const fileName = file.name;
      const a = document.createElement('a');
      a.href = (url as any).changingThisBreaksApplicationSecurity;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  }
  isImage(file: File): boolean {
    const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/tif', 'image/tiff'];
    return allowedImageTypes.includes(file.type);
  }
  getTypeByFileName(fileName: string): string {
    if (/\.(jpg|jpeg)$/i.test(fileName))
      return 'image/jpeg'
    if (/\.(png)$/i.test(fileName))
      return 'image/png'
    if (/\.(gif)$/i.test(fileName))
      return 'image/gif'
    if (/\.(bmp)$/i.test(fileName))
      return 'image/bmp'
    if (/\.(tif)$/i.test(fileName))
      return 'image/tif'
    if (/\.(tiff)$/i.test(fileName))
      return 'image/tiff'
    if (/\.(pdf)$/i.test(fileName))
      return 'application/pdf'

    return 'application/octet-stream'
  }

  triggerFileInput(fileInput: HTMLInputElement) {
    fileInput.click();
  }
}
