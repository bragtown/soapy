'use strict';

angular.module('soapyApp')
  .service('Passid', function Passid() {
    var ID;
    var patient;
    return {
		getID: function () {
            return ID;
        },
        setID: function(value) {
            ID = value;
        },
        getPatient: function () {
            return patient;
        },
        setPatient: function(value) {
            patient = value;
            console.log(value);
        }
    };
  });
