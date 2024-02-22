import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";

export default function PagesChallenge() {


// Define la consulta GraphQL
const query = `
query FraccionalChallenge($targetMonth: String!) {
  exchange_rates: exchange_ratesCollection(
    filter: { pair_left: { eq: CLF }, pair_right: { eq: CLP }, pair_at : {eq: $targetMonth}}
    orderBy: { pair_at: DescNullsLast }
  ) {
    edges {
      node {
        id
        pair_at # Datetime (ISO)
        pair_decimals
        pair_left
        pair_right
        pair_numeric
        pair_source
        created_at # Date (ISO)
      }
    }
  }
}
`;

// console.log(getServerSideProps);
const [datos, setDatos] = useState([]);
const [datosMes, setDatosMes] = useState([]);

useEffect(() => {
  //API dada en la variable de entorno, al ser privada no se publica en el repositorio
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const obtenerDatos = async () => {
    try {
      const response = await axios.post(
        'https://api.fraccional.app/graphql/v1',
        { query },
        {
          headers: {
            'apiKey': apiKey
          }
        }
      );
      setDatos(response.data.data.exchange_rates.edges);
      
    } catch (error) {
      console.log(apiKey)
      console.error('Error al hacer la solicitud:', error);
    }
  };
  
  obtenerDatos();
}, []);


const [valorIngresado, setValorIngresado] = useState(0);
const [valorFinalUf, setValorFinalUf] = useState(0);

const handleChange = (event) => {
  setValorIngresado(event.target.value);
}

const CalcularUf = () => {
  const valorUF = datos[paginaActual - 1].node.pair_numeric;
  setValorFinalUf(valorIngresado * valorUF);
  return valorIngresado;
}

const filasPorPagina = 10;

const paginasTotales = Math.ceil(datos.length / filasPorPagina);

const [paginaActual, setPaginaActual] = useState(1);
const retrocederPagina = () => {
  if (paginaActual > 1) {
    setPaginaActual(paginaActual - 1);
  }
};

const avanzarPagina = () => {
  if (paginaActual < paginasTotales) {
    setPaginaActual(paginaActual + 1);
  }
};

const inicio = (paginaActual - 1) * filasPorPagina;
const fin = inicio + filasPorPagina;
const datosPaginados = datos.slice(inicio, fin);

return (
    <main>
      <section>
        {/* Seccion calcular uf */}
        <div className="prose dark:prose-invert tituloUF">
          <h1>
              Calculadora de <span className="text-yellow-500">UF</span>
          </h1>
        </div>
        
        <div className="form">
          <div className="formUF">
            <div className="inputUF">
              <label htmlFor="inputCantidadUf">Cantidad de UF</label>
              <input id="inputCantidadUf" style={{color:'black'}} placeholder="Cantidad UF" type="number" onChange={handleChange}></input>
            </div>
            <div className="inputUF">
              <label htmlFor="inputCLP">Valor en CLP</label>
              <input id="inputCLP" style={{color:'black'}} placeholder="Valor CLP" disabled value={valorFinalUf}></input>
            </div>
          </div>
        </div>

        <div className="container-button">
          <button onClick={CalcularUf} className="btn-calcular">Calcular</button>
        </div>
        {/* Seccion calcular uf */}
        <div className="prose dark:prose-invert tituloUF">
          <h1>
              Datos <span className="text-yellow-500">historicos</span>
          </h1>
        </div>
        
        <div className="form">
          
          <table id="myTable" border={1} className="tablaHistorica">
            <thead style={{color:'grey'}}>
              <tr >
                <th>Fecha Actualización</th>
                <th>Valor una UF a CLP</th>
              </tr>
            </thead>
            <tbody>
              {datosPaginados.map((fila, index) => (
                <tr key={index} style={{textAlign:'center'}}>
                  <td style={{padding:'12px'}}>{fila.node.pair_at}</td>
                  <td style={{padding:'12px'}}>{fila.node.pair_numeric}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
          <div style={{textAlign: 'center',margin:'12px'}}>
            <button onClick={retrocederPagina} style={{margin:'0px 12px'}}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <span style={{textAlign: 'center'}}>Pagina {paginaActual} de {datos.length}</span>
            <button onClick={avanzarPagina} style={{margin:'0px 12px'}}>
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
          
        </div>
        </div>
        
      </section>
    </main>
  );
}
