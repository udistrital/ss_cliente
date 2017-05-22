'use strict';

/**
* @ngdoc function
* @name ssClienteApp.controller:RegistrarTipoUpcCtrl
* @description
* # RegistrarTipoUpcCtrl
* Controller of the ssClienteApp
*/
angular.module('ssClienteApp')
.controller('RegistrarTipoUpcCtrl', function (seguridadSocialCrudService, $scope) {

  var self = this;
  var nombreZona;
  var zonaNormal = [];
  var zonaEspecial = [];
  var grandesCiudades = [];
  var zonasAlejadas = [];

  var idZonaNormal = 0;
  var idZonaEspecial = 0;
  var idGrandesCiudades = 0;
  var idZonasAlejadas = 0;

  self.gridOptions = {
    enableRowHeaderSelection: false,
    enableRowSelection: true,
    multiSelect: false,
    expandableRowTemplate: 'expandableRowEdades.html',
    expandableRowHeight: 250,
    onRegisterApi: function(gridApi) {
      gridApi.expandable.on.rowExpandedStateChanged($scope, function (row) {
        if(row.isExpanded) {
          row.entity.subGridOptions = {
            enableRowHeaderSelection: false,
            enableRowSelection: true,
            multiSelect: false,
            enableCellEditOnFocus: true,
            columnDefs: [
              { name: 'Id', visible: false},
              { name: 'Valor', enableCellEdit: true,
              cellTemplate: '<div ng-init="row.entity.Valor=0">{{row.entity.Valor | currency:undefined:0}}</div>',
              headerCellTemplate: '<div align="center"><h5>Valor</h5></div>'},
              { name: 'EdadMin', cellTemplate: '<div align="center">{{row.entity.EdadMin}}</div>', headerCellTemplate: '<div align="center"><h5>Edad Mínima</h5></div>'},
              { name: 'EdadMax', cellTemplate: '<div align="center">{{row.entity.EdadMax}}</div>', headerCellTemplate: '<div align="center"><h5>Edad Máxima</h5></div>'},
              { name: 'IdEdadUpc.AplicaGenero', enableCellEdit: false, cellTemplate: '<div align="center">{{row.entity.AplicaGenero}}</div>', headerCellTemplate: '<div align="center"><h5>Aplica Genero</h5></div>'}
            ]};


            seguridadSocialCrudService.get('edad_upc','limit=-1&query=Vigencia:' + new Date().getFullYear() + '&sortby=EdadMin&order=asc').then(function(response) {
              row.entity.subGridOptions.data = response.data;

              switch (row.entity.Id) {
                case 1: //Zona Normal
                if (!zonaNormal.length === 0) {
                  console.log(' es 0');
                  row.entity.subGridOptions.data = zonaNormal;
                } else {
                  console.log('no es 0');
                  zonaNormal = row.entity.subGridOptions.data;
                }
                console.log(zonaNormal);
                console.error(row.entity.subGridOptions.data);
                idZonaNormal = row.entity.Id;
                break;
                case 2: //Zona Especial
                zonaEspecial = row.entity.subGridOptions.data;
                idZonaEspecial = row.entity.Id;
                break;
                case 3: //Grandes Ciudades
                grandesCiudades = row.entity.subGridOptions.data;
                idGrandesCiudades = row.entity.Id;
                break;
                case 4: //Zonas Alejadas
                zonasAlejadas = row.entity.subGridOptions.data;
                idZonasAlejadas = row.entity.Id;
                break;
                default:
                console.log('Opción no implementada');
                break;
              }
            });
          }
        });
      }
    };

    self.gridOptions.columnDefs = [
      {name: 'Id', visible: false},
      {name: 'Nombre', cellTemplate: '<div align="center">{{row.entity.Nombre}}</div>', headerCellTemplate: '<div align="center"><h5>Nombre de la Zona</h5></div>'}
    ];

    seguridadSocialCrudService.get('tipo_zona_upc','limit=0').then(function(response) {
      //self.zonas = response.data;
      self.gridOptions.data = response.data;
    });

    self.guardar = function() {
      var guardar = false;
      guardar = rectificarValores(zonaNormal, 'Zona Normal');
      guardar = rectificarValores(zonaEspecial, 'Zona Especial');
      guardar = rectificarValores(grandesCiudades, 'Grandes Ciudades');
      guardar = rectificarValores(zonasAlejadas, 'Zonas Alejadas');
      guardarZonas(guardar);
      console.log(guardar);


    }

    function guardarZonas(guardar) {
      if (guardar) {
        //Registro de Zona Normal
        angular.forEach(zonaNormal, function (zona) {
          var IdEdadUpc = { Id: zona.Id };
          var IdTipoZonaUpc = { Id: idZonaNormal };
          var tipoUpc =
          {
            Valor: parseInt(zona.Valor),
            acuerdo: '2017',
            IdEdadUpc: IdEdadUpc,
            IdTipoZonaUpc: IdTipoZonaUpc
          }
          seguridadSocialCrudService.post('tipo_upc',tipoUpc).then(function (response) {
            console.log(response.data);
          });
        });
        //Registro de Zona Especial
        angular.forEach(zonaEspecial, function (zona) {
          var IdEdadUpc = { Id: zona.Id };
          var IdTipoZonaUpc = { Id: idZonaEspecial };
          var tipoUpc =
          {
            Valor: parseInt(zona.Valor),
            acuerdo: '2017',
            IdEdadUpc: IdEdadUpc,
            IdTipoZonaUpc: IdTipoZonaUpc
          }
          seguridadSocialCrudService.post('tipo_upc',tipoUpc).then(function (response) {
            console.log(response.data);
          });
        });

        //Registro de Grandes Ciudades
        angular.forEach(grandesCiudades, function (zona) {
          var IdEdadUpc = { Id: zona.Id };
          var IdTipoZonaUpc = { Id: idGrandesCiudades };
          var tipoUpc =
          {
            Valor: parseInt(zona.Valor),
            acuerdo: '2017',
            IdEdadUpc: IdEdadUpc,
            IdTipoZonaUpc: IdTipoZonaUpc
          }
          seguridadSocialCrudService.post('tipo_upc',tipoUpc).then(function (response) {
            console.log(response.data);
          });
        });

        //Registro de Zonas Alejadas
        angular.forEach(zonasAlejadas, function (zona) {
          var IdEdadUpc = { Id: zona.Id };
          var IdTipoZonaUpc = { Id: idZonasAlejadas };
          var tipoUpc =
          {
            Valor: parseInt(zona.Valor),
            acuerdo: '2017',
            IdEdadUpc: IdEdadUpc,
            IdTipoZonaUpc: IdTipoZonaUpc
          }
          seguridadSocialCrudService.post('tipo_upc',tipoUpc).then(function (response) {
            console.log(response.data);
          });
        });
      } else {
        console.log('Error en guardarZonas');
      }
    }


    function rectificarValores(zona, sujeto) {
      var error = 0 //si la variable se vuelve 1 entonces existe un error y el mensaje mostrado del swal va a ser de error
      var mensaje = '';
      if (zona.length == 0) {
        mensaje = 'No has ingresado valores para ' + sujeto;
        error = 1;
      } else {
        for (var i = 0; i < zona.length; i++) {
          if (zona[i].Valor == 0) {
            mensaje = 'Ingresa los Valores en el Rango de ' + zona[i].EdadMin + ' - ' + zona[i].EdadMax + ' para ' + sujeto;
            error = 1;
            break;
          } else if (zona[i].Valor < 0 ) {
            mensaje = 'Los Valores en el Rango de ' + zona[i].EdadMin + ' - ' + zona[i].EdadMax + ' no pueden ser negativos para ' + sujeto;
            error = 1;
            break;
          } else {
            mensaje = 'Valores de' + sujeto + ' Registrados Exitosamente';
            error = 0;
          }
        }
      }

      if (error == 0) { //todo salio bien
        swal (
          'Registro Correcto',
          mensaje,
          'success'
        )
        return true;
      } else { //hubo un error en el proceso  de rectificación
        swal(
          'Error',
          mensaje,
          'error'
        )
        return false;
      }
    };

  });
