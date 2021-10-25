function traerInformacionMensajes(){
    $.ajax({    
            url : 'https://g1a87438372da7f-database1.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message',
            type : 'GET',
            dataType : 'JSON',
            
            error : function(xhr, status) {
                alert('ha sucedido un problema, '+xhr.status);
            },
            success : function(resultado) {
                $("#resultado").empty();
                tabla = "<center><table border='1'><tr><th>ID<th>Mensaje<th>Acciones"
                filas = ""
                for(i = 0;  i < resultado.items.length; i++){
                   filas += "<tr>"
                   filas +="<td>"+resultado.items[i].id+"</td>"  
                   filas +="<td>"+resultado.items[i].messagetext+"</td>"
                   filas +="<td><button onclick='eliminarMensaje("+resultado.items[i].id+")'>Eliminar</button>"
                   filas += "<button onclick='actualizarMensaje("+resultado.items[i].id+")'>Actualizar</button>"
                }
                $("#resultado").append(tabla + filas+"</tr></table></center>")
                console.log(resultado)
            }
        });
}

function buscarPorIDMensajes(id){
    if(!validarCampo(id))
        alert("Primero ingrese un dato en el campo "+id.attr("id"))
    else{
        $.ajax({    
            url : 'https://g1a87438372da7f-database1.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message/'+id.val(),
            dataType : 'JSON',
            type : 'GET',
            success : function(resultado) {
                tabla = "<center><table border='1'><tr><th>ID<th>Mensaje<th>Acciones"
                filas =""
                if(resultado.items.length > 0){
                    console.log(resultado)
                    $("#resultado").empty();
                    filas += "<tr>"
                    filas +="<td>"+resultado.items[0].id+"</td>"  
                    filas +="<td>"+resultado.items[0].messagetext+"</td>"
                    filas +="<td><button onclick='eliminarMensaje("+resultado.items[0].id+")'>Eliminar</button>"
                    filas += "<button onclick='actualizarMensaje("+resultado.items[0].id+")'>Actualizar</button>"
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

function guardarMensaje(){ 
    $.ajax({    
        url : 'https://g1a87438372da7f-database1.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message',
        data : { 
                messagetext: $("#messagetext").val() },
        type : 'POST',
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