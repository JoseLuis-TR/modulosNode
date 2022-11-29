// El módulo OS nos ayuda con información sobre el sistema operativo
// que se este usando
const OS = require('os');

// El módulo FS nos permitirá trabajar con el sistema de archivos de
// nuestro sistema
const FS = require('fs');

// El módulo PATH nos ayudara a trabajar con directorios y rutas de archivos
const PATH = require('path');

let infoCPUS = "";

// Función que hace uso de userInfo para sacar el nombre del usuario que esta
// ejecutando el programa en el momento y cpus para conseguir información de uso
// de los distintos nucleos de la CPU
function usoCPus(){
    let nombreUsu = OS.userInfo().username
    let infoCPUs = OS.cpus();

    infoCPUS += `Esta es la información sobre los núcleos de tu CPU ${nombreUsu}`

    for(let i = 0; i < infoCPUs.length; i++){

        infoCPUS += `\n\nInfo sobre el nucleo num -> ${i+1}`
        let total = 0;

        for(let x in infoCPUs[i].times){
            total += infoCPUs[i].times[x]
        }

        for(let z in infoCPUs[i].times){
            infoCPUS += `\n${z} -> ${Math.round(100*infoCPUs[i].times[z] / total)}%`
        }
    }
}
usoCPus()

// Creamos la carpeta info para guardar el documento que creemos más adelante.
if(!FS.existsSync(`.${PATH.sep}info`)){
    FS.mkdirSync(`.${PATH.sep}info`);
}

// Nos ayuda a escribir el documento con la información de la CPU sacada de
// los dos métodos anteriores la cual hemos guardado en una variable.
FS.writeFile('./info/infoCPU.txt', infoCPUS, function (err) {
    if (err) throw err;
    console.log('El archivo ha sido creado correctamente');
});

// A este método indicamos el documento que queremos leer y el formato de codificación
// utilizado, el cual sacará toda la información del documento a la variable data
// que podremos usar para mostrar la info por consola.
FS.readFile('./info/infoCPU.txt','utf-8',(err,data) => {
    if(err) throw err;
    console.log(data);
})