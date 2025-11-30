import { Component, OnInit } from '@angular/core'
import { ToastrService } from 'ngx-toastr'
import { LoaderService } from 'src/app/common/loader/loader.service'
import { AlertClass } from 'src/app/main/main-body/common/alert/alert-functions'
import { CustomGridOption } from 'src/app/main/main-body/common/custom-ag-grid/interfaces/ag-grid-option.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { setTaminFilesKarAttr, setTaminFilesWorAttr, TaminFilesKarAttr, TaminFilesWorAttr } from 'src/app/main/pages/global-attr'
import { ModalOptions } from 'src/app/main/main-body/common/custom-modal/modal-options.interface'

const Controller = 'TaminFiles'

@Component({
  templateUrl: './tamin-file.component.html',
  styleUrls: ['./tamin-file.component.scss'],
})
export class TaminFileComponent implements OnInit {
  showGridWor: boolean = false;
  showGridKar: boolean = false;

  showForm: boolean = false;
  formType: string = '';
  gridOptionWor = <CustomGridOption>{
    actions: [
      {
        label: 'Edit',
        callback: this.edit.bind(this),
      },
      {
        label: 'Delete',
        callback: this.delete.bind(this),
      },
      {
        label: 'Add',
        callback: this.add.bind(this),
      },
    ],
    controllerName: `${Controller}/Wor`,
    checkboxSelection: true,
    rowSelected: this.rowSelected.bind(this),
    rowClicked: this.view.bind(this),
  };

  gridOptionKar = <CustomGridOption>{
    actions: [
      {
        label: 'Edit',
        callback: this.edit.bind(this),
      },
      {
        label: 'Delete',
        callback: this.delete.bind(this),
      },
      {
        label: 'Add',
        callback: this.add.bind(this),
      },
    ],
    controllerName: `${Controller}/Kar`,
    rowClicked: this.view.bind(this),
  };

  taminList = [];
  rowSelected(event) {
    this.taminList.includes(event.data.Id)
      ? (this.taminList = this.taminList.filter((a) => a != event.data.Id))
      : this.taminList.push(event.data.Id);
  }

  deleteAll() {
    if (this.taminList.length == 0)
      return this.toastr.error('انتخاب حداقل یک ردیف الزامی است', 'خطا');
    AlertClass.deleteAlert((_) =>
      this.service
        .deleteByBody(`${Controller}/DeleteDSKWORAll`, {
          IDCollect_Fld: this.taminList.toString(),
        })
        .subscribe((_) =>
          this.type == 'kar' ? this.getSelectKar() : this.getSelectWor()
        )
    );
  }

  formObjWor: any;
  getAttrWor() {
    this.showGridWor = false;
    let Attr = TaminFilesWorAttr()
    !Attr
      ? this.service
          .get(`${Controller}/GetDSKWORAttribute`)
          .subscribe((res: any) => this.setAttrWor(res.Data, 'toLocal'))
      : this.setAttrWor(Attr);
  }

  setAttrWor(attr, type?) {
    this.gridOptionWor.columnDefs = attr;
    this.formObjWor = attr.EntityAttribute;
    type == 'toLocal' ? setTaminFilesWorAttr(attr) : null;
    this.getSelectWor();
  }

  getSelectWor() {
    this.showGridWor = false;
    this.service
      .get(`${Controller}/GetSelectDSKWOR/null`)
      .subscribe((res: any) => {
        this.gridOptionWor.rowData = res.Data;
        this.showGridWor = true;
      });
  }

  formObjKar: any;
  getAttrKar() {
    this.showGridKar = false;
    let Attr = TaminFilesKarAttr()
    !Attr
      ? this.service
          .get(`${Controller}/GetDSKKARAttribute`)
          .subscribe((res: any) => this.setAttrKar(res.Data, 'toLocal'))
      : this.setAttrKar(Attr);
  }

  setAttrKar(attr, type?) {
    this.gridOptionKar.columnDefs = attr;
    this.formObjKar = attr.EntityAttribute;
    type == 'toLocal' ? setTaminFilesKarAttr(attr) : null;
    this.getSelectKar();
  }

  getSelectKar() {
    this.showGridKar = false;
    this.service
      .get(`${Controller}/GetSelectDSKKar/null`)
      .subscribe((res: any) => {
        this.gridOptionKar.rowData = res.Data;
        this.showGridKar = true;
      });
  }

  add() {
    this.showForm = true;
    this.formType = 'Add';
  }

  ID;
  edit(event) {
    this.ID = event.rowData.Id;
    this.showForm = true;
    this.formType = 'Edit';
  }

  view(event) {
    this.ID = event.data.Id;
    this.showForm = true;
    this.formType = 'View';
  }

  delete(event) {
    this.closeForm();
    AlertClass.deleteAlert((_) => {
      let postUrl: string =
        this.type == 'wor' ? 'DeleteDSKWOR' : 'DeleteDSKKAR';
      this.showGridWor = false;
      this.showGridKar = false;
      this.showForm = false
      this.service
        .post(`${Controller}/${postUrl}`, {IDCollect_Fld : event.rowData.Id})
        .subscribe((res: any) => {
          if (this.type == 'wor') {
            this.gridOptionWor.rowData = res.Data;
            this.showGridWor = true;
          } else {
            this.gridOptionKar.rowData = res.Data;
            this.showGridKar = true;
          }
        });
    });
  }

  submited(newData) {
    this.closeForm();
    if (!newData) return;
    this.type == 'kar' ? this.getSelectKar() : this.getSelectWor();
  }

  closeForm() {
    this.formType = '';
    this.showForm = false;
  }

  inputChange(event) {
    let model = { Id: 0, FileName: null, FileContent: null, TaminType: null };
    let taminType: number = 0;
    this.type == 'wor' ? (taminType = 2) : (taminType = 1);
    var file = event.target.files[0];
    var extType: string = '';
    let fileName = file.name;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    if (file.size > 5242880)
    {
      this.toastr.error('اندازه فایل نمی تواند بیشتر از 5 مگابابت باشد', 'خطا')
      return
    }
    this.loaderService.show();

    reader.onload = (ـ) => {
      let fileContent = reader.result;
      this.loaderService.hide();
      model = {
        Id: 0,
        FileName: fileName,
        FileContent: fileContent,
        TaminType: taminType,
      };
      this.service
        .post(`${Controller}/ImportFile`, model)
        .subscribe((_) =>
          this.type == 'wor' ? this.getSelectWor() : this.getSelectKar()
        );
    };
  }

  exportFile(fileType: number, taminType: number) {
    this.service
      .post(`${Controller}/ExportFile`, {
        FileType: fileType,
        TaminType: taminType,
        WhichTab: this.type == 'wor' ? 1 : 2,
      })
      .subscribe((res: any) => {
        let data = res.Data;
        const a = document.createElement('a');
        if (data.Item1 == 'text/plain')
          data.Item3 = btoa(unescape(encodeURIComponent(data.Item3)));
        a.href = URL.createObjectURL(this.base64ToBlob(data.Item3, data.Item1));
        a.setAttribute('download', data.Item2);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      });
  }

  base64ToBlob(b64Data, contentType = '', sliceSize = 512) {
    b64Data = b64Data.replace(/\s/g, ''); //IE compatibility...
    let byteCharacters = atob(b64Data);
    let byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      let slice = byteCharacters.slice(offset, offset + sliceSize);
      let byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++)
        byteNumbers[i] = slice.charCodeAt(i);
      let byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, { type: contentType });
  }

  type: 'wor' | 'kar' = 'wor';
  onTabChange(event) {
    this.showForm = false;
    let index: number = event.index;
    index == 0 ? (this.type = 'wor') : (this.type = 'kar');
    this.type == 'kar' ? this.getAttrKar() : null;
  }

  stimulsoftData: any;
  modalOptions: ModalOptions;
  showReport: boolean = false;

  close() {
    let sidebar = document.getElementsByClassName(
      'app-sidebar'
    )[0] as HTMLElement;
    sidebar.style.zIndex = '3';
    this.showReport = false;
  }
  ShowTaminReport(fileType: number) {
    this.showReport = false;
    this.service
      .post(`${Controller}/ShowTaminReport`, fileType)
      .subscribe((res: any) => {
        this.stimulsoftData = res.Data.Item2;
        this.showReport = true;
      });
  }
  constructor(
    private service: GridFormService,
    private loaderService: LoaderService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAttrWor();
  }
}
