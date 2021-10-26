function traerInformacionReservaciones(){
    $.ajax({    
            url : 'http://129.151.123.56:8080/api/Reservation/all',
            type : 'GET',
            dataType : 'JSON',
            
            error : function(xhr, status) {
                alert('ha sucedido un problema, '+xhr.status);
            },
            success : function(resultado) {
                $("#resultado").empty();
                tabla = "<center><table border='1'><tr><th>ID<th>Fecha Creacion<th>Fecha Reserva<th>ID Cliente<th>Nombre Cliente<th>Correo Cliente<th>Nombre Doctor"
                filas = ""
                for(i = 0;  i < resultado.length; i++){
                   filas += "<tr>"
                   filas +="<td>"+resultado[i].idReservation+"</td>"
                   filas +="<td>"+resultado[i].startDate.substr(0,10)+"</td>"
                   filas +="<td>"+resultado[i].devolutionDate.substr(0,10)+"</td>"
                   filas +="<td>"+resultado[i].client.idClient+"</td>"
                   filas +="<td>"+resultado[i].client.name+"</td>"
                   filas +="<td>"+resultado[i].client.email+"</td>"
                   filas +="<td>"+resultado[i].doctor.name+"</td>"
                   /*filas +="<td><button onclick='eliminarMensaje("+resultado[i].id+")'>Eliminar</button>"
                   filas += "<button onclick='actualizarMensaje("+resultado[i].id+")'>Actualizar</button>"*/
                }
                $("#resultado").append(tabla + filas+"</tr></table></center>")
                console.log(resultado)
            }
        });
}

function buscarPorIDReservaciones(id){
    if(!validarCampo(id))
        alert("Primero ingrese un dato en el campo "+id.attr("id"))
    else{
        $.ajax({    
            url : 'http://129.151.123.56:8080/api/Reservation/'+id.val(),
            dataType : 'JSON',
            type : 'GET',
            success : function(resultado) {
                tabla = "<center><table border='1'><tr><th>ID<th>Fecha Creacion<th>Fecha Reserva<th>ID Cliente<th>Nombre Cliente<th>Correo Cliente<th>Nombre Doctor"
                filas =""
                if(resultado){
                    console.log(resultado)
                    $("#resultado").empty();
                    filas += "<tr>"
                    filas +="<td>"+resultado.idReservation+"</td>"
                    filas +="<td>"+resultado.startDate.substr(0,10)+"</td>"
                    filas +="<td>"+resultado.devolutionDate.substr(0,10)+"</td>"
                    filas +="<td>"+resultado.client.idClient+"</td>"
                    filas +="<td>"+resultado.client.name+"</td>"
                    filas +="<td>"+resultado.client.email+"</td>"
                    filas +="<td>"+resultado.doctor.name+"</td>" 
                    /*filas +="<td><button onclick='eliminarMensaje("+resultado.items.id+")'>Eliminar</button>"
                    filas += "<button onclick='actualizarMensaje("+resultado.items.id+")'>Actualizar</button>"*/
                    $("#resultado").append(tabla + filas+"</tr></table></center>")  
                }
                else{
                    alert("Doctor con ID "+id.val()+" no existe")
                }
            },
            error : function(xhr, status) {
                alert('ha sucedido un problema'+ xhr.status);
            },
            complete : function(xhr, status) {
                alert('Petición realizada '+xhr.status);
            }
        });
    }
}

function guardarReservacion(){ 
var datos ={ 
    startDate: Date.now(),
    devolutionDate: $("#devolutionDate").val(),
        client: {
            idClient: $("#client").val()
        },
        doctor: {
            id: $("#doctor").val()
        } 
    }

    $.ajax({    
        url : 'http://129.151.123.56:8080/api/Reservation/save',
        data : JSON.stringify(datos),
        type : 'POST',
        contentType: 'application/json',
        dataType: 'JSON',
        success : function(json, textStatus, xhr) {
    
        
        },
        error : function(xhr, status) {
           
            
        },
        complete : function(xhr, status) {
            alert('Petición realizada '+xhr.status);
            limpiarFormulario();
            window.location.href="reservaciones.html";
        }
    });
}

function eliminarMensaje(idMensaje){
    var datos={id:idMensaje}
    console.log(idMensaje);
    
    $.ajax({    
        url : 'https://g1a87438372da7f-database1.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message',
        data: JSON.stringify(datos),
        contentType: 'application/json',
        dataType: 'text',
        type : 'DELETE',
        success : function(json, textStatus, xhr) {
    
        
        },
        error : function(xhr, status) {
           
            
        },
        complete : function(xhr, status) {
            alert('Petición realizada '+xhr.status);
        }
    }); 
    window.location.href="mensajes.html";   
}

function actualizarMensaje(idMensaje){
    console.log(idMensaje)
    location.href="actualizarMensajes.html?variable="+idMensaje+"";
}

function cargarDatosMensaje(id){
        $.ajax({    
            url : 'https://g1a87438372da7f-database1.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message/'+id,
            dataType : 'JSON',
            type : 'GET',
            success : function(resultado) {
                $("#id").val(resultado.items[0].id)  
                $("#messagetext").val(resultado.items[0].messagetext) 
            },
            error : function(xhr, status) {
                alert('ha sucedido un problema'+ xhr.status);
            }
        });
}

function editarMensaje(){ 
    var datos={
        id:$("#id").val(),
        messagetext:$("#messagetext").val()
        }

    $.ajax({    
        url : 'https://g1a87438372da7f-database1.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message',
        data: JSON.stringify(datos),
        contentType: 'application/json',
        dataType: 'text',
        type : 'PUT',
        dataType: 'JSON',
        success : function(json, textStatus, xhr) {
    
        
        },
        error : function(xhr, status) {
           
            
        },
        complete : function(xhr, status) {
            alert('Petición realizada '+xhr.status);
            limpiarFormulario();
            window.location.href="mensajes.html";
        }
    });
}

function cargarDatosSelectDoctor(){
    $.ajax({    
            url : 'http://129.151.123.56:8080/api/Doctor/all',
            type : 'GET',
            dataType : 'JSON',
            
            error : function(xhr, status) {
                alert('ha sucedido un problema, '+xhr.status);
            },
            success : function(resultado) {
                $("#doctor").empty();
                options = ""
                options += "<option value='' selected>Seleccione doctor</option>"
                for(i = 0;  i < resultado.length; i++){
                    options +="<option value='"+resultado[i].id+"'>"+resultado[i].name+"</option>"
                }
                $("#doctor").append(options)
                console.log(resultado)
            }
        });
}

function cargarDatosSelectCliente(){
    $.ajax({    
            url : 'http://129.151.123.56:8080/api/Client/all',
            type : 'GET',
            dataType : 'JSON',
            
            error : function(xhr, status) {
                alert('ha sucedido un problema, '+xhr.status);
            },
            success : function(resultado) {
                $("#client").empty();
                options = ""
                options += "<option value='' selected>Seleccione cliente</option>"
                for(i = 0;  i < resultado.length; i++){
                    options +="<option value='"+resultado[i].idClient+"'>"+resultado[i].name+"</option>"
                }
                $("#client").append(options)
                console.log(resultado)
            }
        });
}

function validarCampo(campo){
    if(campo.val() != "")
        return true
    else
        return false;
}

function limpiarFormulario(){
    $("#messagetext").val("");
    $("#id").val("");
}