(function () {

    var module = angular.module("apoxcrm");

    var dxGridController = function ($scope, coredapperSrvc, $q, $timeout) {

        var primary_key
        $scope.atValue = "center";
        $scope.myValue = "center";
        $scope.offsetValue = "0 150";
        $scope.toastVisible = false;  
        $scope.gridInstance = null;

        //Toast
        var showToast = function (message, type) {
            $scope.toastMessage = message;
            $scope.toastType = type;
            $scope.toastVisible = true;
        };
        
        var refreshData = function (){

            $scope.customers = [];
            $scope.statuses = [];
            $scope.ratings = [];

        $scope.isBusy = true;       //Spinner
        $scope.is_load = false;     //Grid Load
    
        var dropdownsDeferred = $q.defer();
        var promiseDropdowns = dropdownsDeferred.promise;
        dropdownsDeferred.resolve(coredapperSrvc.getDropdowns());


        var customersDeferred = $q.defer();
        var promiseCustomers = customersDeferred.promise;
        customersDeferred.resolve(coredapperSrvc.getCustomers());


            $q.all({
                customers: promiseCustomers,
                dropdowns: promiseDropdowns
                   })
        .then(function(results) {

            $scope.customers = results.customers;
            $scope.statuses = results.dropdowns.customerStatus;
            $scope.ratings = results.dropdowns.customerRating;


        })
        .finally(function () {

            $scope.is_load = true;
            $scope.isBusy = false;
    
	    });
            
        
        };


        refreshData();

   


    //dev express
    $scope.gridSettings =
    {
                    bindingOptions: { 
                        dataSource: 'customers',
                        'columns[6].lookup.dataSource': 'statuses',
                        'columns[7].lookup.dataSource': 'ratings',
                    },


                    paging: {
                        pageSize: 10
                    },
                  

                    filterRow: {
                        visible: true
                    },
                    groupPanel: {
                        visible: true
                    },
                    editing: {
                        editMode: 'form',
                        editEnabled: true,
                        removeEnabled: true,
                        insertEnabled: true

                    },
                    
                    columns: [
                        
                        { dataField: 'id', caption: 'Id', allowEditing: false }, //columns[0]
                        { dataField: 'vat',caption: 'Vat',validationRules: [ { type: 'required' } ] },//columns[1]
                        { dataField: 'email', caption: 'Email', validationRules: [{ type: 'required' }] }, //columns[2]
                        { dataField: 'firstName', caption: 'First Name', validationRules: [{ type: 'required' }] },//columns[3]
                        { dataField: 'lastName', caption: 'Last Name', validationRules: [{ type: 'required' }] },//columns[4]
                        { dataField: 'phone', caption: 'Phone' },//columns[5]
                        { dataField: 'statusId', caption: 'Status', lookup: { valueExpr: 'id', displayExpr: 'descr', title: 'Status' } },//columns[6]
                        { dataField: 'ratingId', caption: 'Rating', lookup: { valueExpr: 'id', displayExpr: 'descr', title: 'Rating' } }//columns[7]
                        ]
                    ,

                    allowColumnResizing: true,
                    allowColumnReordering: true,

                    
                    onEditingStart: function (e,info) {
                        
                        //e.model.gridSettings.columns[0].allowEditing = false;

                    },
                    onInitNewRow: function (e) {
                        
                        
                    },
                    onRowInserting: function (e) {
                       
                    },
                    onRowInserted: function (e) {


                        var onSuccess = function (data) {
                            var msg = "Success";
                            showToast(msg, "success");
                            refreshData();

                        }

                        var onError = function (data) {
                            var msg = "Error";
                            showToast(msg, "error");
                            //refreshData();

                        }

                        coredapperSrvc.insertCustomer(e.data).then(onSuccess, onError)


                    },


                    onRowUpdating: function (e) {

                        primary_key = e.oldData.id
                   
                    },
                    onRowUpdated: function (e) {
                        
                        //Update code
                        var onSuccess = function (data) {
                            var msg="Success";
                            showToast(msg, "success");
                            refreshData();
                       }

                        var onError = function (data) {

                            var msg="Error";
                            showToast(msg, "error");

                        }

                        coredapperSrvc.updateCustomer(e.key).then(onSuccess, onError)

                    },
                    onRowRemoving: function (e) {
                        
                    },
                    onRowRemoved: function (e) {

                        var onSuccess = function (data) {
                            var msg = "Success";
                            showToast(msg, "success");
                            refreshData();

                        }

                        var onError = function (data) {
                            var msg = "error";
                            showToast(msg, "error");
                            refreshData();

                        }

                        coredapperSrvc.deleteCustomer(e.data.id).then(onSuccess, onError);

                     
                    },
                    onCellPrepared: function (e,cellElement, cellInfo) {

                    },
                     onInitialized: function(e) {
                        $scope.gridInstance = e.component;

                    }
  
    }
        
 };
    module.controller("dxGridController", dxGridController);

}());