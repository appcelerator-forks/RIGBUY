/**
 * Constants.js
 *
 * This file contains all the constants used in the app.
 */

/**********************************Server Details*************************************/

exports.DOMAIN_URL = 'http://rigbuy.com/webservices/index.php?action=users&actionMethod=';
//exports.DOMAIN_URL = 'http://s1.dev-progress.com/ghaya/api/';
exports.SERVICE_USER_LOGIN = 'login';
exports.SERVICE_USER_LOGOUT = "UserLogout"; 
exports.SERVICE_USER_SIGNUP = "signup";
exports.SERVICE_CHANGE_PASSWORD = "changePassword";
exports.SERVICE_RESET_PASSWORD = "ResetPassword";
exports.SERVICE_EDIT_PROFILE = "EditProfile";
exports.SERVICE_TOTAL_SHIFT = "GetTotalShift";
exports.SERVICE_TOTAL_COMPANY = "GetCompanies";
exports.SERVICE_TOTAL_SITE = "GetSites";
exports.SERVICE_ADD_CONTACT = "AddContact";
exports.SERVICE_TOTAL_ASSOCIATED_GUARDS = "GetSiteGuards";  
exports.SERVICE_GET_CONTRACT_LIST = "GetContractList";
//Review section
exports.SERVICE_ADD_REVIEW = "AddReview";
exports.SERVICE_REVIEW_GET_SITES = "GetSites";
exports.SERVICE_GET_SHIFT_SUPERVISOR = "GetShiftSupervisor";
exports.SERVICE_GET_SHIFT_GUARD = "GetShiftGuards";
exports.SERVICE_REVIEW_GET_SITE_GUARD = "GetTotalShift";
exports.SERVICE_GET_SUPERVISOR = "GetSuperVisors";
exports.SERVICE_GET_COMPANY = "GetCompanies";
exports.SERVICE_GET_ATTENDANCE = "GetAttendance";
exports.SERVICE_GET_TIMESHEET = "GetTimeSheet";
exports.SERVICE_TIMESHEET_DETAIL = "UpdateTimeSheet";
exports.SERVICE_UPDATE_ATTENDANCE = "UpdateAttendance";
exports.SERVICE_GET_RESERVED_GUARD = "GetReservedGuards";
exports.SERVICE_GET_GUARD_AND_SUPERVISOR = "GetGuardAndSupervisor";
exports.SERVICE_GET_ALL_REQUEST = "getContactAll";
exports.SERVICE_GET_CONTACT_STATUS = "contact_status";
exports.SERVICE_NOTIFICATION_LIST = "listPushNotification";
exports.SERVICE_SET_PREFERENCE = "setPreference";
exports.SERVICE_GET_PREFERENCE = "getPreference";
//exports.SERVICE_RESET_COUNT = "resetCount";
exports.SERVICE_GET_TIMESHEET_ID = "GetTimeSheetById";
exports.SERVICE_GET_ATTENDANCE_BY_ID= "UpdateTimesheetDetailById";
exports.SERVICE_GET_CONTRACT_DETAIL_BY_ID= "getContractListById";
exports.SERVICE_RESET_COUNT= "pushCountReset";
exports.SERVICE_RESET_ATTENDANCE= "resetAttendance";
exports.SERVICE_GET_CONTACT_BY_ID= "getContactDetailById";
exports.SERVICE_GET_SELECTED_RESERVED_GUARDS= "GetSelectReservedGuards";
exports.SERVICE_ADD_RESERVED_ATTENDANCE= "AddRGAttendance";
exports.SERVICE_GET_CONTACT_TYPE="GetContactUsTopic";

exports.SERVICE_GET_RATING_QUESTION = "GetRatingQestion";
/**********************************Message Constants*************************************/
exports.MSG_NO_NETWORK = "Please check your internet connection and try again";
exports.MSG_STATUS_CODE = "Network is down. Please try again later";
exports.MSG_NO_DATA = "No data received from server";   
exports.MSG_RECORD_NOT_FOUND = "No records found";
