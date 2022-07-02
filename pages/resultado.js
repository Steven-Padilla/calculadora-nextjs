import { useState } from "react";


export default function Resultado() {

  const [arrDatos, setArrDatos] = useState([]); //1
  const [showData, setShowData] = useState(false); //2
  const [showTable, setShowTable] = useState(false); //3
  const [numClases, setNumClases] = useState(0); //4
  const [rango, setRango] = useState(0); //5
  const [numDatos, setNumDatos] = useState(0); //6
  const [amplitud, setAmplitud] = useState(0); //7
  const [limSup, setLimSup] = useState([]); //8
  const [limInf, setLimInf] = useState([]); //9
  const [Abc, setAbc] = useState([]); //10
  const [uniVa, setUniVa] = useState(null); //11
  const [limSupEx, setLimSupEx] = useState([]); //12
  const [limInfEx, setLimInfEx] = useState([]); //13
  const [frecuencia, setFrecuencia] = useState([]);
  const [frecAcum, setFrecAcum] = useState([]);
  const [freCom, setFreCom] = useState([]);



  const [media, setMedia] = useState(0)
  const [varianzaF, setVarianzaF] = useState(0)
  const [DVStand, setDVStan] = useState(0)
  const [DVM, setDVM] = useState(0)
  const [ventana, setVentana] = useState(true)
  const [muestra, setMuestra] = useState(false)
  // const [rango, setRango] = useState(0)
  const [datosTotales,setDatosTotales]=useState(0)


  const arrAbc = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L']



  const bubbleSort = arr => {
    const l = arr.length;
    for (let i = 0; i < l; i++) {
      for (let j = 0; j < l - 1 - i; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }
      }
    }

    return arr;
  };


  const comprobar = () => {

    const datos = localStorage.getItem('datos')
    const datosJson = JSON.parse(datos)
    const datosSorted = bubbleSort(datosJson);

    setArrDatos(datosSorted);
    const formClas = Math.round(1 + (3.322 * Math.log10(datosSorted.length)))
    setNumClases(formClas);
    setNumDatos(datosSorted.length);
    const formuRango = datosSorted[datosSorted.length - 1] - datosSorted[0]
    setRango(formuRango);
    setAmplitud(formuRango / formClas);
    setShowData(true)






  }

  const hacerTabla = () => {

    if (uniVa == null) {
      alert('pon unidad de variacion')
    } else {

      
      asignarLimites();
      mediasDis();


      let frec = 0;
      for (let i = 0; i < numClases; i++) {
        for (let j = 0; j < arrDatos.length; j++) {
          if (arrDatos[j] >= limInf[i] && arrDatos[j] <= limSup[i]) {
            frec++;
          }

        }
        frecuencia.push(frec)
        frec = 0;
      }

      frecAcum.push(frecuencia[0])
      for (let i = 1; i < frecuencia.length; i++) {
        frecAcum.push(frecAcum[i - 1] + frecuencia[i])
      }

      let aux = frecAcum[frecAcum.length - 1]
      for (let i = 0; i < frecAcum.length; i++) {
        freCom.push(aux -= frecuencia[i])

      }





      setShowTable(true)
    }





  }

  const onSubmit = (e) => {
    e.preventDefault();
  }
  
  const mediasDis=()=>{
    let sumDatos=0;
    for(let i=0;i<arrDatos.length;i++){
      sumDatos+=arrDatos[i];
    }
    let mediaCal=sumDatos/arrDatos.length;

    setMedia(mediaCal)

    sumDatos=0;
    for(let i=0;i<arrDatos.length;i++){
      sumDatos+=Math.abs(arrDatos[i]-mediaCal);
    }

    let desviacionM=sumDatos/arrDatos.length;
    setDVM(desviacionM);

    sumDatos=0;
    for(let i=0;i<arrDatos.length;i++){
      sumDatos+=Math.pow(Math.abs(arrDatos[i]-mediaCal),2);
    }

    let varianza=sumDatos/arrDatos.length;
    setVarianzaF(varianza);
  }




  const asignarLimites = () => {
    let auxLimSup = arrDatos[0];
    limInf.push(auxLimSup)

    for (let i = 0; i < numClases - 1; i++) {
      auxLimSup += amplitud;

      limInf.push(auxLimSup)
    }

    for (let i = 0; i < numClases - 1; i++) {
      limSup.push(limInf[i + 1] - 1);
    }
    limSup.push(limInf[limInf.length - 1] + amplitud)

    for (let i = 0; i < numClases; i++) {
      limSupEx.push(limSup[i] + (uniVa / 2))
    }

    for (let i = 0; i < numClases; i++) {
      limInfEx.push(limInf[i] - (uniVa / 2))
    }


    for (let i = 0; i < numClases; i++) {
      Abc.push(arrAbc[i])

    }



  }
  const handleChange = (e) => {
    setUniVa(e.target.value);
  }


  







  return (
    <div className="container ">
      <div className="col-10 d-flex justify-content-center">
        <button
          className="btn btn-primary "
          onClick={comprobar}
        >

          calcular datooos iniciales
        </button>

      </div>

      <div>
        {showData && (
          <div >

            <h2>Datos ordenados:</h2>
            <h3>
              {arrDatos.map(function (singleData) {
                return (singleData + ', ')
              })}
            </h3>

            <h2>Numero de clases : {numClases}</h2>
            <h2>Rango : {rango}</h2>
            <h2>Numero de datos : {numDatos}</h2>
            <h2>Amplitud : {amplitud}</h2>

            <form onSubmit={onSubmit}>
              <label>Ingresa la unidad de variacion</label>
              <input
                type="number"
                required
                onChange={handleChange}
                style={{ WebkitAppearance: 'textfield !important' }}
              >

              </input>
              <button
                className="btn btn-secondary"
                type="submit"

              >
                aceptar la unidad variacion
              </button>
            </form>

            <button
              className="btn btn-secondary"
              onClick={hacerTabla}
              type="submit"
            >
              Realizar la tabla
            </button>


          </div>
        )}
      </div>

      <div>
        {showTable && (
          <div>
            <table class="table ">
              <thead>
                <tr>
                  <th scope="col">Clases</th>
                  <th scope="col">limite infe</th>
                  <th scope="col">limite sup</th>
                  <th scope="col">limite infe exact</th>
                  <th scope="col">limite sup exact</th>
                  <th scope="col">Marca de clase</th>
                  <th scope="col">Frec. Abs.</th>
                  <th scope="col">Frec. Rela.</th>
                  <th scope="col">Frec. Acum.</th>
                  <th scope="col">Frec. Comp.</th>
                </tr>

              </thead>
              <tbody>


                {Abc.map((resul, index) => (

                  <tr>
                    <th >{String.fromCharCode(65 + index)}</th>
                    <td>{limInf[index]}</td>
                    <td>{limSup[index]}</td>
                    <td>{limInfEx[index]}</td>
                    <td>{limSupEx[index]}</td>
                    <td>{(limSup[index] + limInf[index]) / 2}</td>
                    <td>{frecuencia[index]}</td>
                    <td>{frecuencia[index] / numDatos}</td>
                    <td>{frecAcum[index]}</td>
                    <td>{freCom[index]}</td>
                  </tr>

                ))}


              </tbody>
            </table>

            <div>
              <h2 className="header">Medidas de tendencia central</h2 >
              <h4>Media: {media}</h4>
              <h4>Desviacion Media: {DVM}</h4>
              <h4>Varianza: {varianzaF}</h4>
              <h4>Desviacion Estandar: {Math.pow(varianzaF,1/2)} </h4>


            </div>
          </div>
        )}
      </div>



    </div>

  )


}