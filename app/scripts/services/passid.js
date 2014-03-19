'use strict';

angular.module('soapyApp')
  .service('Passid', function Passid() {
    var ID;
    return {
		getID: function () {
            return ID;
        },
        setID: function(value) {
            ID = value;
        }
    };
  });
