import axios from 'axios'
import cookie from "react-cookies";


const request = function (options) {

    const onSuccess = function (response) {
        return response.data;
    };

    const onError = function (err) {

        if (err.response) {
            if(err.response.status===401){
                cookie.remove("admin_token", {
                    path: "/",
                });

                window.location.reload()
            }
            // Request was made but server responded with something other than 2xx
            // console.error('Status:', err.response.status);
            // console.error('Data:', err.response.data);
            // console.error('Headers:', err.response.headers);
        } else {

            // Something else happened while setting up the request triggered the error
            console.error('Error Message:', err.message);
        }

        //return Promise.reject(err.response || err.message);
        return Promise.reject(err);
    };
    const client = axios.create({ headers: { Authorization: cookie.load('admin_token') } });
    return client(options)
        .then(onSuccess)
        .catch(onError);
};

export default request;