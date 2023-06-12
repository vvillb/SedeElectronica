import React from 'react'
import DataGrid from 'devextreme-react/data-grid';


const columns = [ 'Fecha', 'Titular', 'Estado', 'Tipo'];
const customers=[{
    ID:1,
    Fecha:'23/06/2023',
    Titular:'Abierto el plazo para inscripciones en el concurso',
    Estado:'Activa',
    Tipo:'Concursos y Premios'
    },{
    ID:2,
    Fecha:'20/05/2023',
    Titular:'Anuncio calificación y convocatoria para reconocimiento médico ',
    Estado:'Activa',
    Tipo:'Trámites'
    },{
    ID:3,
    Fecha:'18/05/2023',
    Titular:'Edicto incoación procedimiento baja en el Padrón Municipal de Habitantes',
    Estado:'Caducado',
    Tipo:'Anuncios'
    },{
    ID:4,
    Fecha:'15/03/2023',
    Titular:'Anuncio lista provisional admitidos y excluidos',
    Estado:'Activa',
    Tipo:'Anuncios'
    },{
    ID:5,
    Fecha:'10/03/2023',
    Titular:'Aprobación definitiva del "Estudio de Detalle para la ampliación del Colegio Público Sabugo" (Expte. nº AYT/1289/2020)',
    Estado:'Activa',
    Tipo:'Anuncios'
    },{
    ID:6,
    Fecha:'01/02/2023',
    Titular:'Extracto BOPA Convocatoria de Ayudas a la Contratación de Personas Desempleadas.pdf',
    Estado:'Activa',
    Tipo:'Trámites'
    },{
    ID:7,
    Fecha:'14/01/2023',
    Titular:'Convocatoria del Programa de Contratación en Prácticas 2022-2023',
    Estado:'Activa',
    Tipo:'Convocatorias'
    },
  ]
class TablonDeAnuncios extends React.Component {
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

export default TablonDeAnuncios
