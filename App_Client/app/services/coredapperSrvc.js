(function(){
	
    var coredapperSrvc = function ($http) {
        var domain = "http://localhost:2115"

	var getCustomers=function(){
	    return $http.get(domain+"/api/customers/getall")
		.then(function(response){
			return response.data;		
		});	
	};


	var getCustomer=function(id){
	    return $http.get(domain + "/api/customers/getfull/" + id)
		.then(function(response){
			return response.data;		
		});	
	};
	

	var deleteCustomer = function (id) {
	    return $http.delete(domain + "/api/Customers/DeleteCustomer/"+id).then(function (status) {
		return status.data;
		});
	};


	var insertCustomer = function (customer) {
	    return $http.post(domain + "/api/Customers/CreateCustomer", customer).then(function (results) {
	return results;
	});
	};

 
	var updateCustomer = function (customer) {
	    return $http.put(domain + "/api/customers/UpdateCustomer", customer).then(function (status) {
	return status.data;
	});
	};

 
	var getDropdowns=function(){
	    return $http.get(domain + "/api/customers/getdropdowns")
		.then(function(response){
			return response.data;		
		});	
	};



	return{
	    getCustomers: getCustomers,
	    getCustomer: getCustomer,
	    deleteCustomer: deleteCustomer,
	    insertCustomer: insertCustomer,
	    updateCustomer: updateCustomer,
	    getDropdowns: getDropdowns

	};

	};
	
	
	var module = angular.module("apoxcrm");
	module.factory("coredapperSrvc", coredapperSrvc);
	
}());