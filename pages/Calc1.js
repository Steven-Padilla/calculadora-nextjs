import { useState } from "react"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label } from 'reactstrap';


export default function Calc1() {
  const [arrLS, setArrLS] = useState([]);
  const [arrLI, setArrLI] = useState([]);
  const [arrFr, setArrFr] = useState([]);
  const [Abc, setAbc] = useState([]);
  const [marcaC, setMarcaC] = useState([]);
  const [media, setMedia] = useState(0)
  const [varianzaF, setVarianzaF] = useState(0)
  const [DVStand, setDVStan] = useState(0)
  const [DVM, setDVM] = useState(0)
  const [ventana, setVentana] = useState(true)
  const [muestra, setMuestra] = useState(false)
  const [rango, setRango] = useState(0)
  const [datosTotales,setDatosTotales]=useState(0)
  let limInf = 0;
  let limSup = 0;
  let frecuencia = 0;

  const changeLimSup = (e) => {
    limSup = e.target.value;
  }
  const changeLimInf = (e) => {
    limInf = e.target.value;
  }
  const changeFrec = (e) => {
    frecuencia = e.target.value;
  }



  const handleSubmit = (e) => {
    e.preventDefault();

    setArrFr([...arrFr, parseFloat(frecuencia)]);
    setArrLS([...arrLS, parseFloat(limSup)]);
    setArrLI([...arrLI, parseFloat(limInf)]);
    Abc.push(0);
    document.getElementById('input').value = '';
    document.getElementById('input2').value = '';
    document.getElementById('input3').value = '';



  }


  const resultado = () => {


    const arr = [];
    const arrMul = [];
    let sumC = 0;
    let sumN = 0;
    for (let i = 0; i < Abc.length; i++) {
      let aux = (arrLS[i] + arrLI[i]) / 2;

      arr.push(aux)
    }
    setMarcaC(arr)

    for (let i = 0; i < Abc.length; i++) {
      arrMul.push(arr[i] * arrFr[i]);
    }
    for (let i = 0; i < Abc.length; i++) {
      sumC += arrMul[i];
    }
    for (let i = 0; i < Abc.length; i++) {
      sumN += arrFr[i];
    }
    const media = sumC / sumN
    const vari = [];

    for (let i = 0; i < Abc.length; i++) {
      vari.push((arrFr[i] * ((arr[i] - media) * (arr[i] - media))))
    }
    const sumatoria = 0;
    for (let i = 0; i < Abc.length; i++) {
      sumatoria += vari[i];
    }

    const varianza = 0;

    if (muestra) {
      varianza = sumatoria / (sumN - 1);
    } else {
      varianza = sumatoria / sumN;
    }

    let sumDM = 0;
    for (let i = 0; i < Abc.length; i++) {
      sumDM += (Math.abs(arr[i] - media) * arrFr[i])
    }

    const DVMed = 0;

    if (muestra) {
      DVMed = sumDM / (sumN - 1);
    } else {
      DVMed = sumDM / sumN;
    }


    setDatosTotales(sumN)
    setRango(arrLS[arrLS.length - 1] - arrLI[0])
    setVarianzaF(varianza)
    setDVStan(Math.sqrt(varianza))
    setDVM(DVMed)
    setMedia(media)





  }

  const cerrarVentana = () => {
    setVentana(false)

  }

  const definirPoblacion = () => {
    setMuestra(true)

  }







  return (
    <div className="container pd-auto">
      <div class="mb-3">

        <form onSubmit={handleSubmit}>
          <label for="exampleInputEmail1" class="form-label">Escriba el limite inferior </label>
          <input type="number" id='input2' class="form-control" required onChange={changeLimInf} />
          <label for="exampleInputEmail1" class="form-label">Escriba limite superior</label>
          <input type="number" id='input' class="form-control" required onChange={changeLimSup} />
          <label for="exampleInputEmail1" class="form-label">Escriba la frecuencia</label>
          <input type="number" id='input3' class="form-control" required onChange={changeFrec} />


          <button
            className="btn btn-primary"
            // onClick={handleSubmit}
            type="submit"

          >
            Agregar
          </button>
        </form>



      </div>
      <div className="text-al-center">
        <button
          className="btn btn-secondary"
          onClick={resultado}
        >
          calcular marca
        </button>

      </div>


      <table class="table ">
        <thead>
          <tr>
            <th scope="col">Clases</th>
            <th scope="col">limite infe</th>
            <th scope="col">limite sup</th>
            <th scope="col">Frec. Abs.</th>
            <th scope="col">Marca de clase</th>

            {/* <th scope="col">Frec. Rela.</th>
            <th scope="col">Frec. Acum.</th>
            <th scope="col">Frec. Comp.</th> */}
          </tr>

        </thead>
        <tbody>


          {Abc.map((resul, index) => (

            <tr>
              <th >{String.fromCharCode(65 + index)}</th>
              <td>{arrLI[index]}</td>
              <td>{arrLS[index]}</td>
              <td>{arrFr[index]}</td>
              <td>{marcaC[index]}</td>
              {/* <td>{(limSup[index] + limInf[index]) / 2}</td>
              <td>{frecuencia[index]}</td>
              <td>{frecuencia[index] / numDatos}</td>
              <td>{frecAcum[index]}</td>
              <td>{freCom[index]}</td> */}
            </tr>

          ))}
          <tr>
            <th >Totales</th>
            <th ></th>
            <th ></th>
            <th >{datosTotales}</th>
            <th ></th>
          </tr>


        </tbody>
      </table>


      <div>
        <h2>
          Media : {media}
        </h2>
      </div>
      <div>
        <h2>
          Varianza: {varianzaF}
        </h2>
      </div>
      <div>
        <h2>
          Desviacion Standar : {DVStand}
        </h2>
      </div>
      <div>
        <h2>
          Desviacion media : {DVM}
        </h2>
      </div>
      <div>
        <h2>
          Rango : {rango}
        </h2>
      </div>

      <Modal isOpen={ventana}>
        <ModalHeader>
          ¿Sus datos se tratan de una muestra?
        </ModalHeader>
        <ModalBody>
          <div className="form-check" >
            <FormGroup  >
              <Input className="form-check-input" type="radio" id="flexRadioDefault1" onClick={definirPoblacion} required />
              <Label className="form-check-label" for="flexRadioDefault1">Muestra</Label>
            </FormGroup>

          </div>
          <p style={{ color: "red", textAlign: "center" }}>Al darle aceptar sin seleccionar la casilla, sus datos se tratarán como una poblacion</p>
        </ModalBody>
        <ModalFooter>
          <Button onClick={cerrarVentana}>Aceptar</Button>
        </ModalFooter>
      </Modal>




    </div>





  )




}