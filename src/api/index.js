/**
 * Created by mas on 2017/11/9.
 */
import fetch from './fetch'
import {API_PREFIX, FILE_PREFIX} from '@/config'
/**
 * 获取首页数据
 * @param userId
 * @constructor
 */
export function GetHomePageInformations(userId) {
  return fetch.get(`/mobile/Common/GetHomePageInformations?userId=${userId}`)
}

/**
 * 获取检查人员
 * @param userId
 * @returns {*|Promise.<TResult>}
 * @constructor
 */
export function GetReviewerUsers(userId) {
  return fetch.get(`/mobile/Administrative/GetReviewerUsers?userId=${userId}`)
    .then(res => {
      return res.result
    })
}

/**
 * 获取检查内容
 * @constructor
 */
export function GetCheckContentList() {
  return fetch.get('/mobile/Administrative/GetCheckContentList')
    .then(res => {
      return res.result
    })
}

/**
 * 根据企业ID获取企业名称
 * @returns {*|Promise.<TResult>}
 * @constructor
 */
export function GetLawTaskNum(EnterpriseId) {
  return fetch.get(`/mobile/Administrative/GetLawTaskNum/${EnterpriseId}`)
    .then(res => {
      return res.result
    })
}

/**
 * 获取检查方案指令编号
 * @returns {*|Promise.<TResult>}
 * @constructor
 */
export function GetInspectionProgramDocumentNumber() {
  return fetch.get('/mobile/Administrative/GetInspectionProgramDocumentNumber')
    .then(res => {
      return res.result
    })
}

/**
 * 新增/修改检查方案
 * @param obj
 * @returns {AxiosPromise}
 * @constructor
 */
export function AddOrEditEnforcementTask(obj) {
  return fetch.post('/mobile/Administrative/AddOrEditEnforcementTask', obj)
    .then(res => {
      return res.result
    })
}

/**
 * 任务ID
 * @param TaskId
 * @returns {AxiosPromise}
 * @constructor
 */
export function GetLawEnforcementTask(TaskId) {
  return fetch.get(`/mobile/Administrative/GetLawEnforcementTask/${TaskId}`)
    .then(res => {
      return res.result
    })
}

/**
 * 根据任务ID获取现场检查记录
 * @param id
 * @returns {AxiosPromise}
 * @constructor
 */
export function GetTaskInspectionRecordList(id) {
  return fetch.get(`/mobile/Administrative/GetTaskInspectionRecordList/${id}`)
    .then(res => {
      return res.result
    })
}

/**
 * 删除现场检查记录
 * @param id
 * @constructor
 */
export function DeleteRecordInfo(id) {
  return fetch.post(`/mobile/Administrative/DeleteRecordInfo`, {id})
}

/**
 * 提交现场检查记录
 * @returns {AxiosPromise}
 * @constructor
 */
export function AddOrEdiTaskInspectionRecord(obj) {
  return fetch.post(`/mobile/Administrative/AddOrEdiTaskInspectionRecord`, obj)
    .then(res => {
      return res.result
    })
}

/**
 * 根据关键字搜索内容
 * @returns {AxiosPromise}
 * @constructor
 */
export function GetMatchingCheckContent(key) {
  return fetch.get(`/mobile/Administrative/GetMatchingCheckContent?keyWord=${key}`)
    .then(res => {
      return res.result
    })
}

/**
 * 新加检查内容
 * @returns {AxiosPromise}
 * @constructor
 */
export function AddOrEditCheckContentInfo(obj) {
  return fetch.post('/mobile/Administrative/AddOrEditCheckContentInfo', obj)
    .then(res => {
      return res.result
    })
}

/**
 * 获取隐患类别树
 * @returns {AxiosPromise}
 * @constructor
 */
export function GetHiddenDangerCategoriesTree() {
  return fetch.get(`/mobile/Administrative/GetHiddenDangerCategoriesTree`)
    .then(res => {
      return res.result
    })
}

/**
 * 获取审核人员列表
 * @returns {AxiosPromise}
 * @constructor
 */
export function GetToexamineComboData(id) {
  return fetch.get(`/mobile/Administrative/GetToexamineComboData?userId=${id}`)
    .then(res => {
      return res.result
    })
}

/**
 * 获取整改指令信息
 * @returns {AxiosPromise}
 * @constructor
 */
export function GetRectificationInstructionInfo(id) {
  return fetch.get(`/mobile/Administrative/GetRectificationInstructionInfo/${id}`)
    .then(res => {
      return res.result
    })
}

/**
 * 提交整改指令信息
 * @returns {AxiosPromise}
 * @constructor
 */
export function ModifiedRectificationInstruction(obj) {
  return fetch.post(`/mobile/Administrative/ModifiedRectificationInstruction`, obj)
    .then(res => {
      return res.result
    })
}

/**
 * 获取整改指令中的检查记录
 * @returns {AxiosPromise}
 * @constructor
 */
export function GetInstructionCheckInfoList(id) {
  return fetch.get(`/mobile/Administrative/GetInstructionCheckInfoList/${id}`)
    .then(res => {
      return res.result
    })
}

/**
 * 获取整改复查任务中的复查任务
 * @param taskId
 * @returns {AxiosPromise}
 * @constructor
 */
export function GetReviewRecordInfo(taskId) {
  return fetch.get(`/mobile/Administrative/GetReviewRecordInfo/${taskId}`)
    .then(res => {
      return res.result
    })
}

/**
 * 修改检查记录的完成状态
 * @param obj
 * @returns {AxiosPromise}
 * @constructor
 */
export function UpdateTaskInspectionStatus(obj) {
  return fetch.post(`/mobile/Administrative/UpdateTaskInspectionStatus`, obj)
    .then(res => {
      return res.result
    })
}

/**
 * 提交复查记录
 * @returns {AxiosPromise}
 * @constructor
 */
export function AddOrEditReviewRecord(obj) {
  return fetch.post(`/mobile/Administrative/AddOrEditReviewRecord`, obj)
    .then(res => {
      return res.result
    })
}

/**
 * 执法计划
 * @returns {AxiosPromise}
 */
export function listEnterpriseDataInfos(year) {
  return fetch.get(`/mobile/Administrative/listEnterpriseDataInfos?year=${year}`)
    .then(res => {
      return res.result
    })
}

/**
 * 获取通讯联络
 * @returns {AxiosPromise}
 */
export function GetAddressPersonList() {
  return fetch.get(`/mobile/Common/GetAddressPersonList`)
    .then(res => {
      return res.result
    })
}

/**
 * 获取企业信息列表
 * @returns {AxiosPromise}
 */
export function GetEnterpriseList() {
  return fetch.get(`/mobile/Enterprise/GetEnterpriseList`)
}

/**
 * 获取企业信息详情
 * @returns {AxiosPromise}
 */
export function GetEnterpriseInfo(id) {
  return fetch.get(`/mobile/Enterprise/GetEnterpriseInfo?id=${id}`)
    .then(res => {
      return res.success ? res.result : {}
    })
}

/**
 * 获取企业信息详情
 * @returns {AxiosPromise}
 */
export function GetSafetyOfficerlList(id) {
  return fetch.get(`/mobile/Enterprise/GetSafetyOfficerlList?enterpriseId=${id}`)
    .then(res => {
      return res.success ? res.result.rows : []
    })
}

/**
 * 获取企业信息详情
 * @returns {AxiosPromise}
 */
export function GetSpecialOperationPersonnelList(id) {
  return fetch.get(`/mobile/Enterprise/GetSpecialOperationPersonnelList?enterpriseId=${id}`)
    .then(res => {
      return res.success ? res.result.rows : []
    })
}

/**
 * 获取重大危险源
 * @returns {AxiosPromise}
 */
export function GetHazardManagementList() {
  return fetch.get(`/mobile/Enterprise/GetHazardManagementList`)
    .then(res => {
      return res.result.rows
    })
}

/**
 * 获取重大危险源详情
 * @returns {AxiosPromise}
 */
export function GetHazardDetail(id) {
  return fetch.get(`/mobile/Enterprise/GetHazardDetail/${id}`)
}

/**
 * 获取重大危险源监控视频地址
 * @returns {AxiosPromise}
 */
export function GetDeviceUrl(id, parms) {
  return fetch.post(parms.apiurl, {
    streamurl: parms.rtspurl,
    channelid: id,
    rtmpwlanurl: parms.rtmpwlanurl,
    hlswlanurl: parms.hlswlanurl,
    keepalive: parms.keepalive,
    h264Encode: parms.h264Encode
  }).then((res) => {
    let durl = /http:\/\/([^\/]+)\//i
    let url = `http://${parms.apiurl.match(durl)[1] + res.Body.LiveUrl}`
    return {
      url,
      SnapUrl: res.Body.SnapUrl
    }
  })
}

/**
 * 获取专家库列表
 * @returns {AxiosPromise}
 */
export function GetExpertList() {
  return fetch.get(`/mobile/Common/GetExpertList`)
    .then(res => {
      return res.result.rows
    })
}

/**
 * 获取专家详情
 * @returns {AxiosPromise}
 */
export function GettExpertInfo(id) {
  return fetch.get(`/mobile/Common/GettExpertInfo?id=${id}`)
    .then(res => {
      return res.result
    })
}

/**
 * 根据事故ID获取应急方案src
 * @param id
 * @returns {AxiosPromise}
 * @constructor
 */
export function GetAccidentFile(id) {
  return fetch.get(`/mobile/Emergency/GetAccidentFile?accidentId=${id}`)
    .then(res => {
      return res.result
    })
}

/**
 * 结束应急救援
 * @param userId
 * @param id
 * @returns {AxiosPromise}
 * @constructor
 */
export function EndRescues({userId, AccidentId}) {
  return fetch.post(`/mobile/Emergency/EndRescues?input.userId=${userId}&input.accidentId=${AccidentId}`)
}

/**
 * 启动应急救援
 * @returns {AxiosPromise}
 * @constructor
 */
export function StartRescues({userId, AccidentId}) {
  return fetch.post(`/mobile/Emergency/StartRescues?input.userId=${userId}&input.accidentId=${AccidentId}`)
}

/**
 * 根据事故ID获取事故详情
 * @param id
 * @returns {AxiosPromise}
 * @constructor
 */
export function GetAccidentDetail(id) {
  return fetch.get(`/mobile/Emergency/GetAccidentDetail?accidentId=${id}`)
}

/**
 * 根据事故ID获取应急视频列表
 * @param id
 * @returns {AxiosPromise}
 * @constructor
 */
export function GetAccidentVideoGroups(id) {
  return fetch.get(`/mobile/Enterprise/GetAccidentVideoGroups?accidentId=${id}&type=1`)
}

/**
 * 根据分组ID获取视频列表
 * @returns {AxiosPromise}
 * @constructor
 */
export function GetAccidentVideoGroupsDetail(id) {
  return fetch.get(`/mobile/Enterprise/GetAccidentVideoGroupsDetail?groupId=${id}`)
}

/**
 * 获取传感器数据
 * @param id
 * @returns {AxiosPromise}
 * @constructor
 */
export function GetAccidentSensorGroups(id) {
  return fetch.get(`/mobile/Enterprise/GetAccidentVideoGroups?accidentId=${id}&type=2`)
}

/**
 * 获取传感器详情
 * @param id
 * @returns {AxiosPromise}
 * @constructor
 */
export function GetAccidentSensorGroupsDetail(id) {
  return fetch.get(`/mobile/Enterprise/GetAccidentSensorGroupsDetail?groupId=${id}`)
}

/**
 * 获取应急专家列表
 * @param id
 * @returns {AxiosPromise}
 * @constructor
 */
export function GetAccidentsExperts(id) {
  return fetch.get(`/mobile/Emergency/GetAccidentsExperts?accidentId=${id}`)
}

/**
 * 获取避难场所
 * @returns {AxiosPromise}
 * @constructor
 */
export function GetShelterList() {
  return fetch.get(`/mobile/Emergency/GetShelterList`)
    .then(res => {
      return res.result.rows
    })
}

/**
 * 获取应急物资
 * @returns {AxiosPromise}
 * @constructor
 */
export function GetMaterialList() {
  return fetch.get(`/mobile/Emergency/GetMaterialList`)
    .then(res => {
      return res.result.rows
    })
}

/**
 * 获取应急队伍
 * @returns {AxiosPromise}
 * @constructor
 */
export function GetTeamList() {
  return fetch.get(`/mobile/Emergency/GetTeamList`)
    .then(res => {
      return res.result.rows
    })
}

/**
 * 获取指挥部
 * @returns {AxiosPromise}
 * @constructor
 */
export function getPartyList() {
  return fetch.get(`/mobile/Emergency/getPartyList`)
    .then(res => {
      return res.result.rows
    })
}

/**
 * 企业类型统计
 * @returns {AxiosPromise}
 * @constructor
 */
export function GetQuantityStatisticsList() {
  return fetch.get(`/mobile/Enterprise/GetQuantityStatisticsList`)
    .then(res => {
      return res.result
    })
}

/**
 * 获取执法文书统计
 * @param year
 * @returns {AxiosPromise}
 * @constructor
 */
export function GetDocumentStatistics(year) {
  return fetch.get(`/mobile/Administrative/DocumentStatistics?year=${year}`)
    .then(res => {
      return res.result
    })
}

/**
 * 获取知识库
 * @returns {AxiosPromise}
 * @constructor
 */
export function GetKnowledges(obj) {
  let {keyword = '', type, page, rows} = obj
  return fetch.get(`/mobile/Common/GetKnowledges?input.type=${type}&input.page=${page}&input.rows=${rows}&input.keyword=${keyword}`)
    .then(res => {
      return res.result
    })
}

/**
 * 获取物质特性
 * @param obj
 * @returns {AxiosPromise}
 * @constructor
 */
export function GetDangerousGoodsList(obj) {
  let {name = '', page, rows} = obj
  return fetch.get(`/mobile/Common/GetDangerousGoodsList?input.page=${page}&input.rows=${rows}&input.name=${name}`)
    .then(res => {
      return res.result
    })
}

/**
 * 获取执法依据树
 * @returns {Promise.<TResult>}
 * @constructor
 */
export function GetLawEnforcementBasisTree() {
  return fetch.get(`/mobile/Common/GetLawEnforcementBasisTree`)
    .then(res => {
      return res.result
    })
}

/**
 * 执法依据详情
 * @returns {AxiosPromise}
 * @constructor
 */
export function GetContentLawEnforcements(id) {
  return fetch.get(`/mobile/Common/GetContentLawEnforcements?classificationId=${id}`)
    .then(res => {
      return res.result
    })
}

/**
 * 获取最新通知列表
 * @returns {AxiosPromise}
 * @constructor
 */
export function GetAnnouncementList(id) {
  return fetch.get(`/mobile/Common/GetAnnouncementList?userId=${id}`)
}

/**
 * 更新通知的状态
 * @returns {AxiosPromise}
 * @constructor
 */
export function UpdateGovernmentRecord(id) {
  return fetch.post(`/mobile/Common/UpdateGovernmentRecord?bulletinReadingRecordId=${id}`)
    .then(res => {
      return res.result
    })
}

/**
 * 获取通知详情
 * @returns {AxiosPromise}
 * @constructor
 */
export function GetAnnouncementInfo(id) {
  return fetch.get(`/mobile/Common/GetAnnouncementInfo?noticeId=${id}`)
}

/**
 * 登录
 * @param user
 * @returns {*}
 * @constructor
 */
export function Login(user) {
  return fetch.post('/mobile/Account/Login', user)
}

/**
 * 第三方登录
 * @param id
 * @constructor
 */
export function LoginOthers(id) {
  return fetch.get(`/mobile/Account/GetUserInfo?userId=${id}`)
}

/**
 * 获取待检查企业列表
 * @constructor
 */
export function GetEnterprisesTreatedList() {
  return fetch.get('/mobile/Administrative/GetEnterprisesTreatedList')
    .then((res) => {
      return res.success ? res.result.map(item => {
        item.leadTime = item.leadTime.replace(new window.RegExp('/', 'g'), '-')
        return item
      }) : []
    })
}

/**
 * 获取待复查企业列表
 * @constructor
 */
export function GetPendingReviewList() {
  return fetch.get('/mobile/Administrative/GetPendingReviewList')
    .then((res) => {
      return res.success ? res.result.map(item => {
        item.leadTime = item.rectificationTime
        return item
      }) : []
    })
}

/**
 * 获取待审核指令企业列表
 * @constructor
 */
export function GetPendingAuditInstruction(id) {
  return fetch.get(`/mobile/Administrative/GetPendingAuditInstruction/${id}`)
    .then((res) => {
      return res.success ? res.result.map(item => {
        item.leadTime = item.leadTime.replace(new window.RegExp('/', 'g'), '-')
        return item
      }) : []
    })
}

/**
 * 获取待启动企业列表
 * @constructor
 */
export function GetUnDealAccidents() {
  return fetch.get('/mobile/Emergency/GetUnDealAccidents')
    .then(res => {
      return res.success ? res.result.rows.map(item => {
        item.leadTime = item.incidentDate.replace(new window.RegExp('/', 'g'), '-')
        item.leadTime = item.leadTime.replace(new window.RegExp('T', 'g'), ' ')
        return item
      }) : []
    })
}

/**
 * 修改复查时间
 * @constructor
 */
export function UpdateLawEntRectificationTime(id, time) {
  return fetch.post(`/mobile/Administrative/UpdateLawEntRectificationTime?recId=${id}&newRecTime=${time}`)
}

/**
 * 更新审核指令的审核结果
 * @returns {*}
 * @constructor
 */
export function UpdateRecInstruction(obj) {
  return fetch.post(`/mobile/Administrative/UpdateRecInstruction`, obj)
}

/**
 * 获取现场检查方案文书
 */
export function CheckOnSiteInspectionFile(obj) {
  let {id, userId} = obj
  return fetch.get(`/Administrative/Task/CheckOnSiteInspectionFile?id=${id}&userId=${userId}`)
    .then(res => {
      if (res.success) {
        res.result.file.physicalPath = res.result.file.physicalPath.replace(FILE_PREFIX, API_PREFIX)
        res.result.filePdf = res.result.filePdf.replace(FILE_PREFIX, API_PREFIX)
        return res.result
      }
      return {}
    })
}

/**
 * 现场检查记录文书
 * @constructor
 */
export function CheckFile(obj) {
  let {id, userId} = obj
  return fetch.get(`/Administrative/Task/CheckFile?id=${id}&userId=${userId}`)
    .then(res => {
      if (res.success) {
        res.result.file.physicalPath = res.result.file.physicalPath.replace(FILE_PREFIX, API_PREFIX)
        res.result.filePdf = res.result.filePdf.replace(FILE_PREFIX, API_PREFIX)
        return res.result
      }
      return {}
    })
}

/**
 * 责令限期整改文书
 * @constructor
 */
export function InstructionFile(obj) {
  let {id, userId} = obj
  return fetch.get(`/Administrative/Task/InstructionFile?id=${id}&userId=${userId}`)
    .then(res => {
      if (res.success) {
        res.result.file.physicalPath = res.result.file.physicalPath.replace(FILE_PREFIX, API_PREFIX)
        res.result.filePdf = res.result.filePdf.replace(FILE_PREFIX, API_PREFIX)
        return res.result
      }
      return {}
    })
}

/**
 * 整改复查意见书
 * @constructor
 */
export function ReviewFile(obj) {
  let {id, userId} = obj
  return fetch.get(`/Administrative/Task/ReviewFile?id=${id}&userId=${userId}`)
    .then(res => {
      if (res.success) {
        res.result.file.physicalPath = res.result.file.physicalPath.replace(FILE_PREFIX, API_PREFIX)
        res.result.filePdf = res.result.filePdf.replace(FILE_PREFIX, API_PREFIX)
        return res.result
      }
      return {}
    })
}

/**
 * 上传图片
 * @param obj
 * @returns {*}
 * @constructor
 */
export function EditUserPic(obj) {
  return fetch.post(`/mobile/Account/EditUserPic`, obj)
}
