import React from 'react'
import DataGrid from 'devextreme-react/data-grid';


const columns = [ 'Tramite', 'Entidad'];
const customers=[{
    ID:1,
    Tramite:'Solicitud de empadronamiento',
    Entidad:'Alcaldía'
    },{
    ID:2,
    Tramite:'Aporte de documentación Carpeta Ciudadana',
    Entidad:'Empresa Municipal de Aguas de Gijón, S.A.'
    },{
    ID:3,
    Tramite:'Baja del Servicio',
    Entidad:'Alcaldía'
    },{
    ID:4,
    Tramite:'Solicitud de empadronamiento',
    Entidad:'Alcaldía'
    },{
    ID:5,
    Tramite:'Solicitud de empadronamiento',
    Entidad:'Alcaldía'
    },{
    ID:6,
    Tramite:'Solicitud de empadronamiento',
    Entidad:'Alcaldía'
    },{
    ID:7,
    Tramite:'Solicitud de empadronamiento',
    Entidad:'Alcaldía'
    },
  ]
class CatalogoDeTramites extends React.Component {
    render() {
      return (
        <DataGrid
          dataSource={customers}
          keyExpr="ID"
          defaultColumns={columns}
          showBorders={true}
        />
      );
    }
  }

export default  CatalogoDeTramites

