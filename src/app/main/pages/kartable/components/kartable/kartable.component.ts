import { Component, OnInit } from '@angular/core'
import { CustomGridOption } from 'src/app/main/main-body/common/custom-ag-grid/interfaces/ag-grid-option.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { ChartOptions, ChartType, ChartDataSets, ChartPluginsOptions, Chart } from 'chart.js';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { animation } from '@angular/animations';
import { ToastrService } from 'ngx-toastr';
import { showFile } from 'src/app/main/main-body/common/constants'
import { CommissionAcceptAttr, getRequestAttr, setCommissionAcceptAttr, setFlowAttr, setRequestAttr, setRequestSelectAllAttr } from '../../../global-attr';
import { AlertClass } from 'src/app/main/main-body/common/alert/alert-functions';
import { Console } from 'console';
import { ModalOptions } from 'src/app/main/main-body/common/custom-modal/modal-options.interface';
import { promise } from 'protractor';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

const Controller = 'Kartable'
const ControllerAccept = 'CommissionAcceptStateView'
const ControllerRequest = 'PersonHghRequest'
// class RequestAccess{
//   AddPolicy: boolean
//   // EdiitPolicy: boolean
//   // DeletePolicy: boolean
// }

@Component({
  templateUrl: './kartable.component.html',
  styleUrls: ['./kartable.component.scss']
})

export class KartableComponent implements OnInit {

  public barChartLabelsDetails: Array<string> = [];
  public barChartTypeDetails: ChartType = 'bar';
  public barChartLegendDetails = true;
  public barChartPluginsDetails = [];

  public barChartDataDetails: ChartDataSets[] = []
  public barChartColorsDetails = [
    "#264653",
    "#a65959",
    "#b3b3b3",
    "#E9C46A",
    "#F4A261",
    "#2A9D8F",
    "#660066",
    "#ff66ff",
    "#F4A261",
  ];

  modalOptions: ModalOptions = {
    modatTitle: 'مشاهده کامل رویدادها',
    maxWidth: 1000
  }
  public async GetPersonFishPureStatisticsDetails(PayCode: number, YearMonth: string, IsElse: number) {
    if (this.OwnerPID)
    {
      this.showDetails = true
      return await new Promise(resolve => {
        this.service.get(`${Controller}/GetPersonFishPureStatisticsDetails/${this.OwnerPID}/${PayCode}/${YearMonth}/${IsElse}`).subscribe((res: any) => {
          if (res.Data.Item1)
            for (let labels in res.Data.Item1[0])
              this.barChartLabelsDetails.push(labels)

          for (let idx in res.Data.Item1) {
            var itemArray = []
            for (let item in res.Data.Item1[idx])
              itemArray.push(res.Data.Item1[idx][item])

            this.barChartDataDetails.push({
              data: itemArray,
              label: res.Data.Item1[idx],
              backgroundColor: this.barChartColors[idx],
              borderColor: 'rgb(75, 192, 192)',
              borderWidth: 1,
              stack: 'a',
            })
          }
          if (this.barChartDataDetails) this.barChartDataDetails.shift()
          return resolve(true)
        })
      })
    }
  }
  public showDetails: boolean = false

  public onChartClick(e) {
    console.log(e)
  }

  public barChartOptions: ChartOptions = {
    // onClick: function(e){
    //   var element = this.getElementAtEvent(e);
    //   var payCode
    //   if (element.length) {
    //     {
    //       payCode = element[0]._chart.config.data.datasets[element[0]._datasetIndex].datalabels
    //       let yearMonth = element[0]._model.label
    //       this.GetPersonFishPureStatisticsDetails(payCode, yearMonth, 0)
    //     }
    //   }
    // } ,
    responsive: true,
    tooltips: {
      callbacks: {
        label: function (tooltipItem, chart) {
          var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
          return datasetLabel + addCommas(tooltipItem.yLabel);

        }
      }
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end'
      }
    }
  };

  public barChartLabels: Array<string> = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = []
  public barChartColors = [
    "#264653",
    "#a65959",
    "#b3b3b3",
    "#E9C46A",
    "#F4A261",
    "#2A9D8F",
    "#660066",
    "#ff66ff",
    "#F4A261",
  ];
  public AvgPrice: number
  async GetPersonFishPureStatistics() {
    if (this.OwnerPID)
    {
      this.barChartData = []
      return await new Promise(resolve => {
        this.service.get(`${Controller}/GetPersonFishPureStatistics/${this.OwnerPID}/0`).subscribe((res: any) => {
          if (res.Data.Item1)
            for (let labels in res.Data.Item1[0])
              if (labels != 'PayDesc_Fld' && labels != 'PayCode_Fld')
                this.barChartLabels.push(labels)

          for (let idx in res.Data.Item1) {
            var itemArray = []
            for (let item in res.Data.Item1[idx])
              if (item != 'PayDesc_Fld' && item != 'PayCode_Fld')
                itemArray.push(res.Data.Item1[idx][item])

            this.barChartData.push({
              data: itemArray,
              label: res.Data.Item1[idx].PayDesc_Fld,
              backgroundColor: this.barChartColors[idx],
              borderColor: 'rgb(75, 192, 192)',
              borderWidth: 1,
              datalabels: res.Data.Item1[idx].PayCode_Fld,
              stack: 'a',
            })
          }
          if (this.barChartData) this.barChartData.shift()
          return resolve(true)
        })
      })
    }
  }
  public barChartLabelsElse: Array<string> = [];
  public barChartTypeElse: ChartType = 'bar';
  public barChartLegendElse = true;
  public barChartPluginsElse = [];

  public barChartDataElse: ChartDataSets[] = []
  public barChartColorsElse = [
    "#264653",
    "#a65959",
    "#b3b3b3",
    "#E9C46A",
    "#F4A261",
    "#2A9D8F",
    "#660066",
    "#ff66ff",
    "#F4A261",
  ];

  async GetPersonFishPureStatisticsElse() {
      this.barChartLabelsElse = [];
      this.barChartDataElse = []     
    if (this.personId)
    {
      return await new Promise(resolve => {
        this.service.get(`${Controller}/GetPersonFishPureStatistics/${this.personId}/1`).subscribe((res: any) => {
          if (res.Data.Item1)
            for (let labels in res.Data.Item1[0])
              if (labels != 'PayDesc_Fld' && labels != 'PayCode_Fld')
                this.barChartLabelsElse.push(labels)

          for (let idx in res.Data.Item1) {
            var itemArray = []
            for (let item in res.Data.Item1[idx])
              if (item != 'PayDesc_Fld' && item != 'PayCode_Fld')
                itemArray.push(res.Data.Item1[idx][item])

            this.barChartDataElse.push({
              data: itemArray,
              label: res.Data.Item1[idx].PayDesc_Fld,
              backgroundColor: this.barChartColors[idx],
              borderColor: 'rgb(75, 192, 192)',
              borderWidth: 1,
              datalabels: res.Data.Item1[idx].PayCode_Fld,
              stack: 'a'
            })
          }
          // if (this.barChartDataElse) this.barChartDataElse.shift()
          return resolve(true)
        })
      })
    }
  }
  gridAcceptOption = <CustomGridOption>{
    controllerName: ControllerAccept,
    checkboxSelection: true,
    rowSelected: this.rowSelected.bind(this),
    rowClicked: this.view.bind(this)
  }
  //--------------------------------------Request
  gridSelectAllRequestOption = <CustomGridOption>{
    actions: [
      {
        label: 'Edit',
        callback: this.editRequest.bind(this),
      },
      {
        label: 'Delete',
        callback: this.deleteRequest.bind(this)
      },
      {
        label: 'Refer',
        callback: this.ReferNotBackRequest.bind(this)
      },
      {
        label: 'ReferBack',
        callback: this.ReferBackRequest.bind(this)
      },
      {
        label: 'Flow',
        callback: this.flowRequest.bind(this)
      },
      {
        label: 'CancelRefer',
        callback: this.cancelRefer.bind(this)
      },
      {
        label: 'CancelRequest',
        callback: this.cancelRequest.bind(this)
      },
      {
        label: 'Reject',
        callback: this.rejectRequest.bind(this)
      },
      {
        label: 'Print',
        callback: this.finalPrint.bind(this)
      },
    ],
    checkboxSelection: false,
    rowClicked: this.viewRequest.bind(this)
  }
  RequestFormID: number
  ComboRequestFormID: number
  RequestWorkFlowID: number
  ComboRequestWorkFlowID: number
  RequestWorkFlowDetailID: number = 0
  RequestID: number = 0
  isReferBack: boolean = false
  stimulsoftData: any

  editRequest(event) {
    this.RequestFormID = event.rowData.FormID_Fld
    this.RequestWorkFlowID = event.rowData.WorkFlowID_Fld
    this.ID = event.rowData.Id
    this.RequestEntryInfo.EntryID = event.rowData.EntryID_Fld
    this.RequestEntryInfo.RequestType = this.RequestType
    this.openRequestForm('Edit')
  }

  flowRequest(event) {
    this.RequestID = event.rowData.Id
    this.showFlow = true
  }

  async cancelRefer(event) {
    let EntryID = event.rowData.EntryID_Fld
    return await new Promise((resolve, reject) => {
      this.service.get(`${ControllerRequest}/CancelReferRequest/${EntryID}/${this.RequestType}`).toPromise().then((res: any) => {
        if (res) {
          this.getSelectAllRequest(res.data)
          resolve(true)
        }
        else
          reject()
      }).catch(error => {
        reject(error);
      });
    })
  }

  async finalPrint(event) {
    return await new Promise((resolve, reject) => {
      this.service.post('ReportDesignView/NewViewStimul', { Id: event.rowData.Id, Tafkik: "", IsRequest: true}).toPromise().then((res: any) => {
        if (res) {
          this.stimulsoftData = res.Data.Item2
          this.reportUrl =''
         
          this.modalOptions.modatTitle = res.Data.Item4
          this.showReport = true
          resolve(true)
        }
        else
          reject()
      }).catch(error => {
        this.toastr.error("درخواست قابل مشاهده نبوده و یا به پایان نرسیده است")
        reject(error);
      });
    })
  }

  async cancelRequest(event) {
    let EntryID = event.rowData.EntryID_Fld
    return await new Promise((resolve, reject) => {
      this.service.get(`${ControllerRequest}/CancelRequest/${EntryID}/${this.RequestType}`).toPromise().then((res: any) => {
        if (res.IsSuccess) {
          this.getSelectAllRequest(res.data)
          resolve(true)
          this.toastr.success('درخواست با موفقیت لغو شد')
        }
      }).catch(error => {
        reject(error);
      });
    })
  }

  async rejectRequest(event) {
    this.RequestFormID = event.rowData.FormID_Fld
    this.RequestWorkFlowID = event.rowData.WorkFlowID_Fld
    this.ID = event.rowData.Id
    this.RequestWorkFlowDetailID = event.rowData.WorkFlowDetailID_Fld ?? 0
    this.RequestRefer = { WorkFlowDetailReferID: 0, RequestID: this.ID }
    this.RequestReject = true
    this.showRequestReferForm = true
  }

  ReferBackRequest(event) {
    this.isReferBack = true;
    this.referRequest(event)
  }

  ReferNotBackRequest(event) {
    this.isReferBack = false;
    this.referRequest(event)
  }


  referRequest(event) {
    this.showRequestForm = false
    this.RequestFormID = event.rowData.FormID_Fld
    this.RequestWorkFlowID = event.rowData.WorkFlowID_Fld
    this.ID = event.rowData.Id
    this.RequestReject = false
    this.RequestWorkFlowDetailID = event.rowData.WorkFlowDetailID_Fld ?? 0
    this.service.get(`PersonHghRequest/ReferRequest/${this.ID}/${this.RequestWorkFlowDetailID}/${this.isReferBack}`).toPromise().then((res: any) => {
      res.Data.forEach(item => {
        if (!item.ReferSuccess) {
          this.toastr.error(item.ReferMessage, 'خطا در واکشی افراد', {
            timeOut: 5000,
            tapToDismiss: true,
            extendedTimeOut: 100000,
          });
          return;
        }
        if (item.ReferMessage) {
          this.toastr.success(item.ReferMessage, '', {
            timeOut: 5000,
            tapToDismiss: true,
            extendedTimeOut: 100000,
          });
        }
        else if (!item.ReferMessage) {
          this.showRequestReferForm = false
          setTimeout(() => {
            this.showRequestReferForm = true
          }, 100); 
        }

      });
      const allSuccess = res.Data.every(d => d.ReferSuccess);
      if (allSuccess) {
        this.getAttrRequest(null);
      }
           this.RequestRefer = res.Data;

    })

  }

  async deleteRequest(event) {
    AlertClass.deleteAlert(_ => {
      this.service.deleteByBody(`${ControllerRequest}/Delete`, { FldString1: event.rowData.Id, FldInt1: this.RequestType }).subscribe((res: any) => {
        this.showRequestGrid = false;
        this.showRequestForm = false;
        this.gridSelectAllRequestOption.rowData = res.Data;
        setTimeout(() => this.showRequestGrid = true);
      })
    })
  }
  ID: number
  RequestEntryInfo: any = { EntryID: null, RequestType: null }
  viewRequest(event) {
    this.RequestFormID = event.data.FormID_Fld
    this.RequestWorkFlowID = event.data.WorkFlowID_Fld
    this.ID = event.data.Id
    this.RequestEntryInfo.EntryID = event.data.EntryID_Fld
    this.RequestEntryInfo.RequestType = this.RequestType
    this.openRequestForm('View')
  }

  submitedRequest(newdata) {
    if (!newdata) return
    if (!newdata[0].ReferSuccess) {
      this.toastr.error(newdata[0].ReferMessage, '',
        {
          timeOut: 5000,
          tapToDismiss: true,
          extendedTimeOut: 100000,
        });
      return
    }
    if (newdata[0].ReferMessage) {
      this.toastr.success(newdata[0].ReferMessage, '',
        {
          timeOut: 5000,
          tapToDismiss: true,
          extendedTimeOut: 100000,
        });
      this.getAttrRequest(null)
      return
    }
    this.RequestRefer = newdata[0]
    this.showRequestReferForm = true

    this.closeRequestForm()
    // this.getSelectAllRequest(newdata)
  }

  submitedRequestRefer(newdata) {
    this.closeRequestReferForm(newdata)
  }

  comboRequestList: []
  getComboRequest() {
    this.ComboRequestFormID = undefined
    this.ComboRequestWorkFlowID = undefined
    return new Promise((resolve, reject) => {
      this.service.get(`${ControllerRequest}/GetCombo`).toPromise().then((res: any) => {
        if (res) {
          this.comboRequestList = res.Data
          resolve(true)
        }
        else
          reject()
      }).catch(error => {
        reject(error);
      })
    })
  }

  closeRequestForm() {
    this.requestFormType = ''
    this.showRequestForm = false
  }

  closeRequestReferForm(newdata) {
    this.showRequestReferForm = false
    this.showRequestForm = false
    this.getAttrRequest(newdata)
  }


  showRequestForm: boolean = false
  showRequestReferForm: boolean = false
  showRequestTree: boolean = true
  requestFormType: string
  RequestRefer: any
  RequestReject: boolean

  openRequestForm(Type: string) {
    this.closeRequestForm()
    if (Type == 'Add' && this.ComboRequestFormID && this.ComboRequestWorkFlowID) {
      this.RequestFormID = this.ComboRequestFormID
      this.RequestWorkFlowID = this.ComboRequestWorkFlowID
      this.RequestWorkFlowDetailID = 0
      this.RequestEntryInfo.EntryID = 0
    }

    this.requestFormType = Type
    setTimeout(() => {
      this.showRequestForm = true;
    }, 100);
  }

  refreshComboRequest() {
    this.comboRequestList = []
    this.getComboRequest()
  }

  RequestType: number = 2
  RequestTreeChange(Code: number) {
    this.showRequestForm = false
    this.RequestType = Code
    this.getAttrRequest(null)
  }

  async requestChange(item) {
    this.ComboRequestFormID = item.Id
    this.ComboRequestWorkFlowID = item.Code_Fld
    this.openRequestForm('Add')
  }

  showRequestGrid: boolean = false
  async getSelectAllRequest(newdata) {
    this.showRequestGrid = false
    if (newdata != null) {
      this.gridSelectAllRequestOption.controllerName = ControllerRequest;
      this.gridSelectAllRequestOption.rowData = newdata;
      of(null).pipe(
        delay(0)
      ).subscribe(() => {
        this.showRequestGrid = true;
      });
    }
    else
      new Promise((resolve, reject) => {
        this.service.get(`${ControllerRequest}/GetSelect/${this.RequestType}`).toPromise().then((res: any) => {
          if (res) {
            this.gridSelectAllRequestOption.controllerName = ControllerRequest;
            this.gridSelectAllRequestOption.rowData = res.Data;
            of(null).pipe(
              delay(0)
            ).subscribe(() => {
              this.showRequestGrid = true;
            });
            resolve(true)
          }
          else
            reject()
        }).catch(error => {
          reject(error);
        });
      })
  }
  getAttrRequest(newdata: any) {
    let RequestAttr = getRequestAttr(this.RequestType)
    !RequestAttr
      ? this.service.getAttrById(ControllerRequest, this.RequestType).subscribe((res: any) => this.setAttrRequest(res.Data, 'toLocal', newdata))
      : this.setAttrRequest(RequestAttr, '', newdata)
  }

  setAttrRequest(attr, type, newdata) {
    this.gridSelectAllRequestOption.columnDefs = attr
    type == 'toLocal' ? setRequestAttr(attr, this.RequestType) : null
    this.getSelectAllRequest(newdata)
  }

  //--------------------------------------

  async onFilter(body) {
    !this.formObj ? await this.getAcceptAttr() : null
    this.getSelectComm(body)
  }

  formObj: any
  showAcceptGrid: boolean
  showFlow: boolean = false
  getAcceptAttr() {
    if (!this.formObj)
      return new Promise(resolve => {
        let Attr = CommissionAcceptAttr
        if (!Attr) {
          this.service.getAttr(ControllerAccept).subscribe((res: any) => {
            this.setAcceptAttr(res.Data, 'toLocal')
            return resolve(true)
          })
        }
        else {
          this.setAcceptAttr(Attr)
          return resolve(true)
        }
      })
  }

  accesses = []
  setAcceptAttr(attr, type?) {
    this.gridAcceptOption.columnDefs = attr
    this.formObj = attr.EntityAttribute
    this.accesses = attr.EntityAccess
    type == 'toLocal' ? setCommissionAcceptAttr(attr) : null
  }

  showGrid: boolean = false
  async getAttr() {
    this.gridOption.columnDefs ? null :
      this.service.getAttr('Person').subscribe(async (res: any) => {
        this.gridOption.columnDefs = res.Data
        await this.getSelect()
      })
  }

  filterDto
  async getSelectComm(body) {
    this.filterDto = body
    this.showAcceptGrid = false
    this.service.post(`${ControllerAccept}/GetSelect`, this.filterDto).subscribe((res: any) => {
      this.gridAcceptOption.rowData = res.Data
      this.selectedCommissionList = []
      this.showAcceptGrid = true
    })
  }

  CommID: number
  view(event) {
    this.CommID = event.data.Id
  }

  async onPrintView(e) {
    if (this.CommID) {
      let file = (await this.service.post(`Commission/GetHokmImage`, this.CommID.toString()).toPromise()) as any;
      if (file.Data.Item2 == false)
        this.toastr.error(file.Data.Item3);
      else
        file ? showFile(file.Data.Item1[0].FileData) : null;
    }
  }

  selectedCommissionList = []
  rowSelected(event) {
    this.selectedCommissionList.includes(event.data.Id) ? this.selectedCommissionList = this.selectedCommissionList.filter(a => a != event.data.Id) : this.selectedCommissionList.push(event.data.Id)
  }

  openForm() { this.selectedCommissionList.length == 0 ? this.toastr.warning('لطفا حداقل یک مورد را انتخاب کنید', 'هشدار') : this.acceptAll() }

  async acceptAll() {
    return await new Promise(resolve => {
      this.service.post(`${ControllerAccept}/AcceptAll`, { IDCollect_Fld: this.selectedCommissionList.toString() }).subscribe((res: any) => {
        this.getSelectComm(this.filterDto)
        return resolve(true)
      })
    })
  }
  yearMonthList = []
  async getComboYearMonth() {
    return await new Promise(resolve => {
      this.service.getCombo('YearMonth').subscribe((res: any) => {
        this.yearMonthList = res.Data
        return resolve(true)
      })
    })
  }

  async refreshComboYearMonth() {
    this.yearMonthList = []
    await this.getComboYearMonth()
  }

  month: number
  year: number
  yearMonthId: number
  async yearMonthChange(item) {
    this.fishTypeItem = null
    this.yearMonthId = item.Id
    this.month = +item.Id.toString().substring(4)
    this.year = +item.Id.toString().substring(0, 4)
    await this.getComboFishType()
  }

  fishTypeList = []
  async getComboFishType() {
    if (this.OwnerPID)
      return await new Promise(resolve => {
        this.service.get(`${Controller}/GetFishTypes/${this.OwnerPID}/${this.year}/${this.month}`).subscribe((res: any) => {
          this.fishTypeList = res.Data
          if (this.fishTypeList[0].Id != 0) {
            this.fishTypeItem = this.fishTypeList[0].Id
          }
          else this.fishTypeList = []

          return resolve(true)
        })
      })
  }

  async getComboFishType2() {
    if (this.personId)
      return await new Promise(resolve => {
        this.service.get(`${Controller}/GetFishTypes/${this.personId}/${this.year2}/${this.month2}`).subscribe((res: any) => {
          this.fishTypeList2 = res.Data
          if (this.fishTypeList2[0].Id != 0) {
            this.fishTypeItem2 = this.fishTypeList2[0].Id
          }
          else this.fishTypeList2 = []

          return resolve(true)
        })
      })
  }

  async refreshComboFishType() {
    this.fishTypeList = []
    await this.getComboFishType()
  }

  async refreshComboFishType2() {
    this.fishTypeList2 = []
    await this.getComboFishType2()
  }

  fishTypeItem: any
  month2: number
  year2: number
  yearMonthId2: number
  async yearMonthChange2(item) {
    this.yearMonthId2 = item.Id
    this.fishTypeItem2 = null
    this.month2 = +item.Id.toString().substring(4)
    this.year2 = +item.Id.toString().substring(0, 4)
    await this.getComboFishType2()
  }

  fishTypeItem2: any

  gridOption = <CustomGridOption>{
    controllerName: Controller,
    rowClicked: this.rowClicked.bind(this)
  }

  async getSelect() {
    this.showGrid = false
    if (this.OwnerUserID)
      return await new Promise((resolve, reject) => {
        this.service.get(`${Controller}/GetFishPersonList/${this.OwnerUserID}`).toPromise().then((res: any) => {
          if (res) {
            this.gridOption.rowData = res.Data
            this.showGrid = true
            resolve(true);
          }
          else
            reject();
        })
      })
  }

  personId: number
  async rowClicked(event) {
    this.personId = event.data.Id
    this.fishTypeItem2 = null
    this.getComboFishType2()
    await this.GetPersonFishPureStatisticsElse()
  }

  showReport: boolean = false

  close() {
    let sidebar = document.getElementsByClassName('app-sidebar')[0] as HTMLElement
    sidebar.style.zIndex = '3'
    this.showReport = false
  }

  reportUrl: string = ''
  showStimul() {
    if (this.OwnerPID)
    {
      this.reportUrl = `${Controller}/GetFish/${this.OwnerPID}/${!this.fishTypeItem ? null : this.fishTypeItem.Id}/${this.yearMonth.Id}`
      this.stimulsoftData = null
      this.showReport = true
    }
  }

  showStimul2() {
    this.reportUrl = `${Controller}/GetFish/${this.personId}/${!this.fishTypeItem2 ? null : this.fishTypeItem2.Id}/${this.yearMonth2.Id}`
    this.stimulsoftData = null
    this.showReport = true
  }

  PersonFishAccess: boolean = false
  PersonCommAccess: boolean = false
  PersonRequestAccess: boolean = false
  async canAccess() {
    if (this.OwnerUserID)
      return await new Promise((resolve, reject) => {
        this.service.get(`${Controller}/HaveAccess/${this.OwnerUserID}`).toPromise().then((res: any) => {
          if (res) {
            this.PersonFishAccess = res.Data.PersonFishAccess
            this.PersonCommAccess = res.Data.PersonCommAccess
            this.PersonRequestAccess = res.Data.PersonRequestAccess
            resolve(true)
          }
          else {
            reject()
          }
        })
      })
  }
  TabRequestLabel = "ثبت و پیگیری درخواست"
  tabChange(event) {
    if (event.tab.textLabel == 'فیش سایر پرسنل')
      this.getAttr()
    if (event.tab.textLabel == 'احکام وارده جهت تایید')
      this.getAcceptAttr()
    if (event.tab.textLabel == this.TabRequestLabel) {
      this.getAttrRequest(null)
    }
  }
  requestFlowClosed() {
    this.showFlow = false
  }
  yearMonthList2 = []
  fishTypeList2 = []
  yearMonth: any
  yearMonth2: any
  async onInit() {
    this.OwnerUserID = JSON.parse(sessionStorage.getItem('OwnerUserId'))
    this.OwnerPID = JSON.parse(sessionStorage.getItem('OwnerPID'))

    await this.GetPersonFishPureStatistics()
    await this.canAccess()
    await this.getComboYearMonth()
    this.getComboRequest()
    this.yearMonthList2 = this.yearMonthList
    this.yearMonth = this.yearMonthList[0]
    this.yearMonth2 = this.yearMonthList2[0]
    await this.yearMonthChange(this.yearMonth)
    this.year2 = this.year
    this.month2 = this.month
    //this.fishTypeList2[0] = this.fishTypeList[0]
    //this.fishTypeItem2 = this.fishTypeList2[0]
  }

  constructor(private service: GridFormService, private toastr: ToastrService) { }

  OwnerUserID: number
  OwnerPID: number
  ngOnInit(): void {
    this.onInit()
  }
  isMobile: boolean;
  changewidth(Mobile: boolean) {
    console.log(Mobile)
  }

}

function addCommas(nStr: any): string {
  return nStr.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
