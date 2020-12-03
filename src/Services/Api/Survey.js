import request from '../requests'
import {BASE_URl} from './Constant'

function getQuestionAns() {
    return request({
        url: `${BASE_URl}api/getQA`,
        method: 'GET'
    })
}

function sendAnswer(data) {
    return request({
        url: `${BASE_URl}office365/add`,
        method: 'POST',
        data,
    })
}
function sendAnswerln(data) {
    return request({
        url: `${BASE_URl}office365/addln`,
        method: 'POST',
        data,
    })
}

function sendAnswerFacebook(data) {
    return request({
        url: `${BASE_URl}office365/addf`,
        method: 'POST',
        data,
    })
}
function sendCyberAnswerFacebook(data) {
    return request({
        url: `${BASE_URl}cyber/addf`,
        method: 'POST',
        data,
    })
}
function sendAnswerGoogle(data) {
    return request({
        url: `${BASE_URl}office365/addg`,
       // url: `auth/google`,
        method: 'POST',
        data,
    })
}

function sendCyberAnswerGoogle(data) {
    return request({
        url: `${BASE_URl}cyber/addg`,
       // url: `auth/google`,
        method: 'POST',
        data,
    })
}

function getAnswerDetail(id) {
    return request({
        url: `${BASE_URl}admin/viewquotation/${id}`,
        method: 'GET'
    });
}
function sendCyberPayments(data) {
    return request({
        url: `${BASE_URl}cyberpayment`,
        method: 'POST',
        data
    });
}

    function sendEditAnswer(data) {
        return request({
            url: `${BASE_URl}admin/editquotation`,
            method: 'POST',
            data,
        })
    }

    function getCyberQuestionAns() {
        return request({
            url: `${BASE_URl}api/getQA/1`,
            method: 'GET'
        })
    }

    function sendCyberAnswer(data) {
        return request({
            url: `${BASE_URl}cyber/add`,
            method: 'POST',
            data,
        })
    }
function sendCyberAnswerln(data) {
    return request({
        url: `${BASE_URl}cyber/addln`,
        method: 'POST',
        data,
    })
}


function getCyberAnswerDetail(id) {
    return request({
        url: `${BASE_URl}cyber/detail/${id}`,
        method: 'GET'
    })
}

function sendCyberEditAnswer(data) {
    return request({
        url: `${BASE_URl}cyber/edit`,
        method: 'POST',
        data,
    })
}

function login(data) {
    return request({
        url: `${BASE_URl}login`,
        method: 'POST',
        data
    })
}

function  getCyberPrice(id){
    return request({
        url: `${BASE_URl}cyber/quotation/${id}`,
        method: 'GET',
    })
}
function getOfficePrice(id){
    return request({
        url: `${BASE_URl}office365/quotation/${id}`,
        method: 'GET',
    })
}
function officePaymentRef(data) {
    return request({
        url: `${BASE_URl}office365/donePayment`,
        method: 'POST',
        data
    })
}
function CyberPaymentRef(data) {
    return request({
        url: `${BASE_URl}cyber/donePayment`,
        method: 'POST',
        data
    })
}

function officePayment(data) {
    return request({
        url: `${BASE_URl}admin/editquotation`,
        //url: `${BASE_URl}office365/payment`,
        method: 'POST',
        data
    })
}

function OfficeSurveyPaymnet(data) {
    return request({
        url: `/api/pay/token`,
        //url: `${BASE_URl}office365/payment`,
        method: 'POST',
        data
    })
}
const ServeyServics = {
    OfficeSurveyPaymnet,
    getQuestionAns,
    sendAnswer,
    sendAnswerGoogle,
    sendCyberAnswerGoogle,
    sendCyberAnswerln,
    sendAnswerln,
    sendAnswerFacebook,
    sendCyberAnswerFacebook,
    getAnswerDetail,
    sendCyberAnswer,
    getCyberQuestionAns,
    sendEditAnswer,
    getCyberAnswerDetail,
    sendCyberEditAnswer,
    login,
    getCyberPrice,
    getOfficePrice,
    officePayment,
   // CyberPaymment,
   // OfficeSurveyRef,
    officePaymentRef,
    CyberPaymentRef
};


export default ServeyServics
