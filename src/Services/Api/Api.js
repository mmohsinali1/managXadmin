import {BASE_URl} from './Constant'
import request from '../requests'

function getProjectStatus() {
    return request({
        url: `${BASE_URl}admin/getallprojectstatus`,
        method: 'GET'
    })
}

function login(data) {
    return request({
        url: `${BASE_URl}admin/login`,
        method: 'POST',
        data
    })
}

function forget(data){
    return request({
        url: `${BASE_URl}users/forgotPassword`,
        method: 'POST',
        data
    })
}


function createUser(data){
    alert('admin user create')
    console.log(data)
    return request({
        url: `${BASE_URl}admin/createuser`,
        method: 'POST',
        data
    })
}

function resetPassword(data){
    return request({
        url: `${BASE_URl}users/resetPassword`,
        method: 'POST',
        data
    })
}
function logOut(){
    return request({
        url: `${BASE_URl}logout`,
        method: 'POST',

    })
}
function getName(){
    return request({
        url: `${BASE_URl}admin/getname`,
        method: 'GET',
    })
}
function getRoles(){
    return request({
        url: `${BASE_URl}admin/getroles`,
        method: 'GET',
    })
}
function getUserNames(){
    return request({
        url: `${BASE_URl}admin/getassignresources`,
        method: 'GET',
    })
}

function getUserProject(name){
    return request({
        url: `${BASE_URl}admin/getprojectresources/`+name,
        method: 'GET',
    })
}

function getBills(){
    return request({
        url: `${BASE_URl}admin/getallbills`,
        method: 'GET',
    })
}

function getPayments(){
    return request({
        url: `${BASE_URl}admin/getallpayments`,
        method: 'GET',
    })
}


 function getUsers() {
     return request({
         url: `${BASE_URl}admin/getallusers`,
         method: 'GET',
     })
 }
function createCustomer(data){
    return request({
        url: `${BASE_URl}admin/createcustomer`,
        method: 'POST',
        data
    })
}

function getCustomer(id) {
    return request({
        url: `${BASE_URl}admin/geteditcustomer/`+id,
        method: 'GET',
    })
}
function editCustomer(data){
    return request({
        url: `${BASE_URl}admin/editcustomer/`+data.id,
        method: 'POST',
        data
    })
}
function getUser(id) {
    return request({
        url: `${BASE_URl}admin/getedituser/`+id,
        method: 'GET',
    })
}
function geteditProfile(){
    return request({
        url: `${BASE_URl}users/getedit`,
        method: 'GET',
    })
}

function editUser(data){
    return request({
        url: `${BASE_URl}admin/edituser/`+data.id,
        method: 'POST',
        data
    })
}

function editProfile(data){
    return request({
        url: `${BASE_URl}users/editprofile`,
        method: 'POST',
        data
    })
}
function sendUser(data){
    return request({
        url: `${BASE_URl}users/editprofile`,
        method: 'POST',
        data
    })
}

function assignResources(data){
    return request({
        url: `${BASE_URl}admin/assignresources`,
        method: 'POST',
        data
    })
}
function createProject(data){
    return request({
        url: `${BASE_URl}admin/createproject`,
        method: 'POST',
        data
    })
}


function getCustomers() {
    return request({
        url: `${BASE_URl}admin/getallcustomers`,
        method: 'GET',
    })
}

function getProjectCustomers() {
    return request({
        url: `${BASE_URl}admin/getcreateprojectdata`,
        method: 'GET',
    })
}

function getDiscounts() {
    return request({
        url: `${BASE_URl}admin/getalldiscounts`,
        method: 'GET',
    })
}
function getStatusKey(id) {
    return request({
        url: `${BASE_URl}admin/gettasks/${id}`,
    })
}
 const PresaleServices={
getProjectStatus,
     login,
     forget,
     getUsers,
     sendUser,
     getStatusKey,
     resetPassword,
     getBills,
     getName,
     logOut,
     getDiscounts,
     getPayments,
     getRoles,
     getCustomers,
     createUser,
     getUser,
     editUser,
     getCustomer,
     editCustomer,
     createCustomer,
     getUserNames,
     assignResources,
     getUserProject,
     geteditProfile,
     editProfile,
     createProject,
     getProjectCustomers
};


export default PresaleServices