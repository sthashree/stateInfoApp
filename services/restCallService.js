app.factory('restCallFactory', function($http) {
    return { 

            //get call
            get : function (url, successCallback, errorCallback) {
                
                $http.get(url)
                .success(function (data, status) {
                    if (data == "null") data = null;
                    if (successCallback)
                    {
                        successCallback(data);
                    }
                })
                .error(function (data, status, headers, config) {
                    if (errorCallback){

                        errorCallback(data);
                    }
                });
            },

            //post call 
            post : function (url, postData, successCallback, errorCallback) {
                
                $http.post(url, postData)
                .success(function (data, status) {
                    if (typeof (data) == "string") {
                        if (data == "null") data = null;
                        if (data == "true") data = true;
                        if (data == "false") data = false;

                    }
                    if (successCallback)
                        successCallback(data);
                })
                .error(function (data, status, headers, config) {
                    if (errorCallback)
                        errorCallback(data);
                    else {
                        if (status == 401) {
                            //_logoff();

                        }
                        else {
                            
                        }
                    }
                });
            }
        }
});
