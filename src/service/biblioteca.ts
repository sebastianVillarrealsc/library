import Usuario from "../entities/usuario";
import Libro from "../entities/libro";
import Revista from "../entities/revista";
import Prestamo from "../entities/prestamo";

class Biblioteca {
    private usuarios: Usuario[] = [];
    private libros: Libro[] = [];
    private revistas: Revista[] = [];
    private prestamos: Prestamo[] = [];

    public agregarUsuario(usuario: Usuario): void {
        this.usuarios.push(usuario);
    }

    public listarUsuarios(): Usuario[] {
        return this.usuarios;
    }

    public agregarLibro(libro: Libro): void {
        this.libros.push(libro);
    }

    public listarLibros(): Libro[] {
        return this.libros;
    }

    public agregarRevista(revista: Revista): void {
        this.revistas.push(revista);
    }

    public listarRevistas(): Revista[] {
        return this.revistas;
    }

    // Métodos para realizar préstamos y devoluciones
    public realizarPrestamo(usuario: Usuario, elemento: Libro | Revista, fechaInicio: Date): boolean {
        // Verificar si el usuario está registrado
        const usuarioRegistrado = this.usuarios.find((u) => u.id === usuario.id);
        if (!usuarioRegistrado) {
            console.log("El usuario no está registrado.");
            return false;
        }

        // Verificar si el elemento está disponible
        const elementoIndex = elemento instanceof Libro
            ? this.libros.findIndex((l) => l.id === elemento.id)
            : this.revistas.findIndex((r) => r.id === elemento.id);

        if (elementoIndex === -1) {
            console.log("El elemento no está disponible en la biblioteca.");
            return false;
        }

        // Verificar si el elemento ya está prestado
        const elementoPrestado = this.prestamos.find((p) => p.elemento.id === elemento.id);
        if (elementoPrestado) {
            console.log("El elemento ya está prestado a otro usuario.");
            return false;
        }

        // Calcular la fecha de devolución (una semana después de la fecha de inicio)
        const fechaDevolucion = new Date(fechaInicio);
        fechaDevolucion.setDate(fechaDevolucion.getDate() + 7);

        // Crear un nuevo préstamo y agregarlo a la lista de préstamos
        const nuevoPrestamo = new Prestamo(this.prestamos.length + 1, usuario, elemento, fechaInicio, fechaDevolucion);
        this.prestamos.push(nuevoPrestamo);

        console.log(`Préstamo exitoso. Fecha de devolución: ${fechaDevolucion.toDateString()}`);
        return true;
    }

    // Método para realizar una devolución
    public realizarDevolucion(prestamo: Prestamo, fechaDevolucion: Date): boolean {
        // Verificar si el préstamo existe en la lista de préstamos
        const prestamoIndex = this.prestamos.findIndex((p) => p.id === prestamo.id);
        if (prestamoIndex === -1) {
            console.log("El préstamo no existe en la biblioteca.");
            return false;
        }

        // Verificar si el usuario está registrado
        const usuario = prestamo.usuario;

        // Verificar si la fecha de devolución es válida
        if (fechaDevolucion <= prestamo.fechaInicio) {
            console.log("La fecha de devolución no es válida.");
            return false;
        }

        // Calcular la penalización según la escala
        const diasRetraso = Math.ceil((fechaDevolucion.getTime() - prestamo.fechaInicio.getTime()) / (1000 * 3600 * 24));
        let penalizacion = 0;

        if (diasRetraso === 1) {
            penalizacion = 2;
        } else if (diasRetraso >= 2 && diasRetraso <= 5) {
            penalizacion = 3;
        } else if (diasRetraso > 5) {
            penalizacion = 5;
        }

        // Aplicar penalización si es necesario
        if (penalizacion > 0) {
            usuario.penalizacion += penalizacion;
            console.log(`Devolución con retraso de ${diasRetraso} día(s). Penalización: ${penalizacion} punto(s).`);
        }

        // Eliminar el préstamo de la lista de préstamos
        this.prestamos.splice(prestamoIndex, 1);

        console.log("Devolución exitosa.");
        return true;
    }

    // Métodos para llevar estadísticas
    public registrarPrestamo(prestamo: Prestamo): void {
        this.prestamos.push(prestamo);
    }

    public obtenerRegistroPrestamos(): Prestamo[] {
        return this.prestamos;
    }
}

export default Biblioteca;
