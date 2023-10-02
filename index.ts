import Libro from "./src/entities/libro";
import Prestamo from "./src/entities/prestamo";
import Revista from "./src/entities/revista";
import Usuario from "./src/entities/usuario";
import mostrarMenuDevoluciones from "./src/menu/menuDevoluciones";
import mostrarMenuLibros from "./src/menu/menuLibros";
import mostrarMenuPrestamos from "./src/menu/menuPrestamos";
import mostrarMenuRevistas from "./src/menu/menuRevistas";
import mostrarMenuUsuarios from "./src/menu/menuUsuarios";
import Biblioteca from "./src/service/biblioteca";

//  Crear la biblioteca
const biblioteca = new Biblioteca();

// Crear usuarios por defecto
const usuario1 = new Usuario(1, "Juan Pérez", "Calle 123", "123-456-7890");
const usuario2 = new Usuario(2, "María García", "Avenida 456", "987-654-3210");

// Crear libros por defecto
const libro1 = new Libro(1, "El Libro de la Selva", "Rudyard Kipling", 1894);
const libro2 = new Libro(2, "Cien años de soledad", "Gabriel García Márquez", 1967);

// Crear revistas por defecto
const revista1 = new Revista(1, "National Geographic", "National Geographic Society", 1888);
const revista2 = new Revista(2, "Time", "Time Inc.", 1923);

// Crear préstamos
const prestamoLibro = new Prestamo(1, usuario1, libro1, new Date(), new Date());
const prestamoRevista = new Prestamo(2, usuario1, revista1, new Date(), new Date());

// Agregar usuarios, libros y revistas a la biblioteca
biblioteca.agregarUsuario(usuario1);
biblioteca.agregarUsuario(usuario2);

biblioteca.agregarLibro(libro1);
biblioteca.agregarLibro(libro2);

biblioteca.agregarRevista(revista1);
biblioteca.agregarRevista(revista2);

// Función para mostrar un menú de opciones
export function mostrarMenu() {
    console.log("\n--- Menú ---");
    console.log("1. Usuarios");
    console.log("2. Libros");
    console.log("3. Revistas");
    console.log("4. Realizar Préstamo");
    console.log("5. Realizar Devolución");
    console.log("9. Salir");

}

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

export function volverAlMenuPrincipal() {
    mostrarMenu();
    rl.question('Seleccione una opción: ', (nuevaOpcion: any) => {
        realizarAccion(nuevaOpcion);
    });
}

async function realizarAccion(opcion: string) {
    switch (opcion) {
        case "1":
            mostrarMenuUsuarios(rl, biblioteca);
            break;
        case "2":
            mostrarMenuLibros(rl, biblioteca);
            break;
        case "3":
            mostrarMenuRevistas(rl, biblioteca);
            break;
        case "4":
            mostrarMenuPrestamos(rl, biblioteca);
            break;
        case "5":
            mostrarMenuDevoluciones(rl, biblioteca);
            break;
        case "9":
            console.log("Saliendo del programa.");
            rl.close();
            return;
        default:
            console.log("Opción no válida.");
    }

    rl.question('Seleccione una opción: ', realizarAccion);
}

mostrarMenu();
rl.question('Seleccione una opción: ', realizarAccion);
