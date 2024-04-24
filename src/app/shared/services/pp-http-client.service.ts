import { HttpClient, HttpParams } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { NgbDate } from '@ng-bootstrap/ng-bootstrap'

import { UtilFunctions } from '../utils/util.functions'
import { DictionaryFullModel } from '../models/dictionary-full.model'
import {
  GlobalFilters,
  ServerDataModel,
  UpdateInfo,
  ProcessInfoModel,
  DataChange,
  ServerBasicResponse,
  PaymentsProcessingInfo,
  ServerDataStringList
} from 'src/app/data-models/server-data.model'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class PpHttpClientService {
  private readonly http = inject(HttpClient)

  private readonly url =
    (environment.BACKEND_URL || window.location.origin) + environment.API_BASE_URL + environment.purpose_api_url
  private readonly urlVerification = this.url + '/verification'

  getGlobalFilters(processing_type: string) {
    const params = new HttpParams().set('processing_type', processing_type)
    return this.http.get<GlobalFilters>(this.url + '/global_filters', { params })
  }

  getPurposeData(files: string[], min_date: string, max_date: string, bufferType: string, processing_type: string) {
    const glFilters: GlobalFilters = {
      files: files,
      min_date: min_date,
      max_date: max_date,
      bufferType: bufferType
    }
    const params = new HttpParams().set('processing_type', processing_type)
    return this.http.post<ServerDataModel>(this.url + '/get_payments_data', glFilters, { params })
  }

  getPurposeDataFromIds(selectedIds: string[], processing_type: string) {
    const params = new HttpParams().set('processing_type', processing_type)

    return this.http.post<ServerDataModel>(this.url + '/get_payments_data_from_ids', { data: selectedIds }, { params })
  }

  getContractInfo(contractId: string, updateSellerInfo: boolean) {
    const params = new HttpParams().set('contract_id', contractId).set('update_seller_info', updateSellerInfo)

    return this.http.get<UpdateInfo>(this.url + '/contract_info', { params })
  }

  creditC1Exists(creditId: number | string) {
    return this.http.get<boolean>(this.url + '/c1_credit_exists/' + creditId)
  }

  getFileWithSelectedIds(ids: string[], processing_type: string) {
    const params = new HttpParams().set('processing_type', processing_type)

    return this.http.post<Blob>(
      this.url + '/data_from_row_ids',
      { data: ids },
      { responseType: 'blob' as 'json', params }
    )
  }

  sendPaymentsSplit(formData: FormData, processing_type: string) {
    const params = new HttpParams().set('processing_type', processing_type)

    return this.http.post<ProcessInfoModel>(this.url + '/payments_split', formData, { params })
  }

  saveChanges(dataChanges: DataChange[], processing_type: string) {
    const params = new HttpParams().set('processing_type', processing_type)
    return this.http.patch<ServerBasicResponse>(this.url + `/payments_data`, dataChanges, { params })
  }

  startPaymentsProcessing(formData: FormData, processing_type: string) {
    const params = new HttpParams().set('processing_type', processing_type)
    return this.http.post<ServerBasicResponse>(this.url + '/start_payments_processing', formData, { params })
  }

  getPaymentsProcessingInfo() {
    return this.http.get<PaymentsProcessingInfo>(this.url + '/payments_processing_info')
  }

  requestFile(end_file: string) {
    return this.http.get<Blob>(this.url + '/user_file/' + end_file, { responseType: 'blob' as 'json' })
  }

  deleteFile(end_file: string) {
    return this.http.delete<ServerBasicResponse>(this.url + '/user_file/' + end_file)
  }

  prepareUpload(glFilters: GlobalFilters | null, processing_type: string) {
    const params = new HttpParams().set('processing_type', processing_type)

    return this.http.post<Blob>(this.url + '/prepare_upload', glFilters, { responseType: 'blob' as 'json', params })
  }

  getFileWithFilters(files: string[], min_date: string, max_date: string, bufferType: string, processing_type: string) {
    const params = new HttpParams().set('processing_type', processing_type)

    const glFilters: GlobalFilters = {
      files: files,
      min_date: min_date,
      max_date: max_date,
      bufferType: bufferType
    }
    return this.http.post<Blob>(this.url + '/get_file_with_filters', glFilters, {
      responseType: 'blob' as 'json',
      params
    })
  }

  getHistoryDates(processing_type: string) {
    const params = new HttpParams().set('processing_type', processing_type)
    return this.http.get<{ MinDate: string; MaxDate: string }>(this.url + '/history_dates', { params })
  }

  getHistory(dateFilter: { minDate: string | null; maxDate: string | null; processingType: string }) {
    const params = new HttpParams()
      .set('min_date', dateFilter.minDate ? dateFilter.minDate : '')
      .set('max_date', dateFilter.maxDate ? dateFilter.maxDate : '')
      .set('processing_type', dateFilter.processingType)

    return this.http.get<{ [key: string]: any }[]>(this.url + '/history', { params })
  }

  getFirstCredit1CreditDate() {
    return this.http.get<string>(this.url + '/first_credit_1_credit_date')
  }

  loadPaymentsReconciliation(fromDate: string | null, toDate: string | null) {
    const params = new HttpParams().set('start_date', fromDate ? fromDate : '').set('end_date', toDate ? toDate : '')
    return this.http.get<{ [key: string]: string | number }[]>(this.url + '/c1_reconciliation/cashbox_to_logs', {
      params
    })
  }

  loadCreditsReconciliation(fromDate: string | null, toDate: string | null) {
    const params = new HttpParams().set('start_date', fromDate ? fromDate : '').set('end_date', toDate ? toDate : '')
    return this.http.get<{ [key: string]: string | number }[]>(this.url + '/c1_reconciliation/by_credits', { params })
  }

  loadBankToDatabaseReconciliation(fromDate: string | null, toDate: string | null, periodicity: 'd' | 'w' | 'm' | 'y') {
    const params = new HttpParams()
      .set('start_date', fromDate ? fromDate : '')
      .set('end_date', toDate ? toDate : '')
      .set('periodicity', periodicity)
    return this.http.get<{ [key: string]: string | number }[]>(this.url + '/c1_reconciliation/bank_info_to_database', {
      params
    })
  }

  splitRowK1(rowId: string) {
    return this.http.get<ProcessInfoModel>(this.url + `/rerun_register_reconciliation/${rowId}`)
  }

  updatePaymentId(payId: number | null, row: { [p: string]: any }, processType: string) {
    const params = new HttpParams().set('processing_type', processType)
    const paymentCheck = {
      PaymentId: payId,
      DataRow: row
    }
    return this.http.post<boolean>(this.url + '/payment_id_fits', paymentCheck, { params })
  }

  updatePaymentIds(file: FormData, processType: string) {
    const params = new HttpParams().set('processing_type', processType)

    return this.http.post<any>(this.url + '/payment_ids', file, { params })
  }

  autoUpdatePaymentIds(selectedIds: string[] | null, processType: string) {
    const params = new HttpParams().set('processing_type', processType)

    return this.http.post<any>(this.url + '/autofill_payment_ids', selectedIds ? { data: selectedIds } : null, {
      params
    })
  }

  getEmptyPaymentIds(processType: string) {
    const params = new HttpParams().set('processing_type', processType)

    return this.http.get<string[]>(this.url + '/empty_payment_ids', { params })
  }

  getBusinesses() {
    return this.http.get<DictionaryFullModel[]>(this.url + '/businesses')
  }

  getProjects() {
    return this.http.get<DictionaryFullModel[]>(this.url + '/projects')
  }

  getSpendingTypes() {
    return this.http.get<DictionaryFullModel[]>(this.url + '/spending_types')
  }

  uploadPaymentDocs(
    files: FormData,
    docTypes: string[],
    rowId: string,
    business: string,
    project: string,
    spendingTypeParent: string,
    spendingType: string
  ) {
    const params = {
      business,
      project,
      spending_type_parent: spendingTypeParent,
      spending_type: spendingType,
      doc_types: docTypes
    }

    return this.http.post<any[]>(this.url + '/payments_docs/' + rowId, files, { params })
  }

  downloadPaymentDoc(docPath: string) {
    const params = new HttpParams().set('doc_path', docPath)

    return this.http.get<Blob>(this.url + '/payments_doc', {
      responseType: 'blob' as 'json',
      params,
      observe: 'response'
    })
  }

  loadUserLayouts() {
    return this.http.get<string[]>(this.url + '/layouts')
  }

  saveLayout(layout: any) {
    return this.http.post<ServerBasicResponse>(this.url + '/layout', layout)
  }

  loadLayout(layoutName: string) {
    const params = new HttpParams().set('layout_name', layoutName)

    return this.http.get<any>(this.url + '/layout', { params })
  }

  getContractPaymentsVerification(
    type: any,
    startDate: NgbDate | null,
    endDate: NgbDate | null,
    onlyFactoring: boolean
  ) {
    let params = new HttpParams().set('verification_type', type).set('only_factoring', onlyFactoring)

    if (startDate) params = params.set('start_date', UtilFunctions.formatNgbDate(startDate, '%Y-%m-%d'))
    if (endDate) params = params.set('end_date', UtilFunctions.formatNgbDate(endDate, '%Y-%m-%d'))

    return this.http.get<any[]>(this.urlVerification + '/contract_payments', { params })
  }

  getPaymentDocsVerification(startDate: NgbDate | null, endDate: NgbDate | null) {
    let params = new HttpParams()
    if (startDate) params = params.set('start_date', UtilFunctions.formatNgbDate(startDate, '%Y-%m-%d'))
    if (endDate) params = params.set('end_date', UtilFunctions.formatNgbDate(endDate, '%Y-%m-%d'))

    return this.http.get<any[]>(this.urlVerification + '/payment_docs', { params })
  }

  getPaymentIdsFromDocsVerification(period: string | null, selectedPeriods: string[], type: any | null) {
    let params = new HttpParams()
    if (period) params = params.set('period', period ? period : '')
    for (const p of selectedPeriods) params = params.append('selected_periods', p)
    if (type) params = params.set('verification_type', type ? type : '')

    return this.http.get<string[]>(this.urlVerification + '/payment_docs/payment_ids', { params })
  }

  getSchedulePayDetails(periods: Date[], project: string | null, rNumber: number | null, onlyFactoring: boolean) {
    return this.http.get<Blob>(this.urlVerification + '/contract_payments/schedule_pay_details', {
      responseType: 'blob' as 'json',
      params: this.fillVerificationParams(periods, project, rNumber, onlyFactoring),
      observe: 'response'
    })
  }

  getPpPaymentIdsFromContractPayments(
    periods: Date[],
    project: string | null,
    rNumber: number | null,
    onlyFactoring: boolean
  ) {
    return this.http.get<string[]>(this.urlVerification + '/contract_payments/payment_ids', {
      params: this.fillVerificationParams(periods, project, rNumber, onlyFactoring)
    })
  }

  private fillVerificationParams(
    periods: Date[],
    project: string | null,
    rNumber: number | null,
    onlyFactoring: boolean
  ) {
    let params = new HttpParams().set('only_factoring', onlyFactoring)

    if (project) params = params.set('project_name', project)
    if (rNumber) params = params.set('rnumber', rNumber)
    for (const period of periods) params = params.append('periods', UtilFunctions.formatDate(period, false, '%Y-%m-%d'))

    return params
  }
}
