import Usuario from "./usuario";
import Libro from "./libro";
import Revista from "./revista";

class Prestamo {
    constructor(public id: number, public usuario: Usuario, public elemento: Libro | Revista, public fechaInicio: Date, public fechaDevolucion: Date) { }
}

export default Prestamo;
