
import { useState} from "react"

export default function Calc2() {
    const [datos, setDatos] = useState([]);
    const [dato, setDato] = useState('');

    const handleChange = (e) => {
        setDato(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const dato1 = parseFloat(dato)
        if (dato1 * 0 != 0) {
            alert('No estas ingresando datos numericos bb')
        } else {
            setDatos([...datos, dato1]);
        }
        document.getElementById('input').value = ''

    }

    const resultado = () => {
        localStorage.setItem('datos', JSON.stringify(datos));
        window.location.assign('http://localhost:3000/resultado')
    }




    
    return (
        <div className="container pd-auto">
            <div class="mb-3">

                <form onSubmit={handleSubmit}>
                <label for="exampleInputEmail1" class="form-label">Escriba los datos uno a uno</label>
                <input type="number" id='input' class="form-control" onChange={handleChange} />

                <button
                    className="btn btn-primary"
                    // onClick={handleSubmit}
                    type="submit"

                >
                    Agregar
                </button>
                </form>



            </div>


            <div>
                <h2>
                    {datos.map(function (datoSolo) {
                        return (datoSolo + ", ")
                    }
                    )}
                </h2>
            </div>

            <div className="text-al-center">
                {/* <Link href={'/resultado' + datos}> */}
                <button
                    className="btn btn-secondary"
                    onClick={resultado}
                >
                    Hacer calculos
                </button>
                {/* </Link> */}

            </div>



        </div>




    )




}