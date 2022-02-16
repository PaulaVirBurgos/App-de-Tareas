//aca ponemos el codigo q programa nuestra app

const fs = require('fs');

const tareas = require('./tareas.json');

const guardarJSON = (tareas) /*es el json en si, pasado a array, o sea algo que lee javascript*/ => {
    fs.writeFileSync('./tareas.json',JSON.stringify(tareas,null,3));
    return null
}
const mostrarTareas = (tareas) => {
    tareas.forEach((tarea,index) => {
        console.log(`${index + 1} - ${tarea.descripcion} - estado: ${tarea.estado} - ID: ${tarea.id}`);
    });
}

module.exports = {

    listarTareas : () => {
        mostrarTareas(tareas)
        return null
    },

    agregarTarea : (tarea) => {

        tareas.push(tarea);
        guardarJSON(tareas)

        return console.log('Tarea agregada!')
    },// reemplaza el json que estaba antes con el nuevo agregandole la cosa q le pushee

    actualizarTarea : (id) => {

        let check = tareas.filter(tarea => tarea.id === id);

        if(check.length === 0){
            return console.log('ID inexistente!!');
        }

        let tareasActualizadas = tareas.map(tarea => {
            if(tarea.id === id){
                tarea.estado = 'completado';
                return tarea
            }
            return tarea
        })
        
       guardarJSON(tareasActualizadas)

        return console.log('Tareas actualizadas')
    },


    eliminarTarea : (id) => {

        let tareasFiltradas = tareas.filter(tarea => {
            return tarea.id !== id
        })

        guardarJSON(tareasFiltradas)

        return console.log('Tarea eliminada')
    },
    filtrarTareas : (estado) => {

        let estadosValidos = ['completado','en proceso', 'pendiente'];

        if(!estadosValidos.includes(estado)){
            return console.log('Estado no válido', estadosValidos);
        }

        let tareasFiltradas = tareas.filter((tarea) => {
            return tarea.estado === estado
        });

        mostrarTareas(tareasFiltradas)
        return null
    },
    buscarTarea : (keyword) => {

        let resultado = tareas.filter(tarea => {
            return tarea.descripcion.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())
        })

        mostrarTareas(resultado);
        return null
    }
}