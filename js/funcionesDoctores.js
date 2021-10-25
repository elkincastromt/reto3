function traerInformacionDoctores(){
    $.ajax({    
            url : 'https://g1a87438372da7f-database1.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/doctor/doctor',
            type : 'GET',
            dataType : 'JSON',
            
            error : function(xhr, status) {
                alert('ha sucedido un problema, '+xhr.status);
            },
            success : function(resultado) {
                $("#resultado").empty();
                tabla = "<center><table border='1'><tr><th>ID<th>Especialidad<th>Año de Graduacion<th>ID Departamento<th>Nombre<th>Acciones"
                filas = ""
                for(i = 0;  i < resultado.items.length; i++){
                   filas += "<tr>"
                   filas +="<td>"+resultado.items[i].id+"</td>"   
                   filas +="<td>"+resultado.items[i].specialty+"</td>" 
                   filas +="<td>"+resultado.items[i].graduate_year+"</td>" 
                   filas +="<td>"+resultado.items[i].department_id+"</td>" 
                   filas +="<td>"+resultado.items[i].name+"</td>" 
                   filas +="<td><button onclick='eliminarDoctor("+resultado.items[i].id+")'>Eliminar</button>"
                   filas += "<button onclick='actualizarDoctor("+resultado.items[i].id+")'>Actualizar</button>"
                }
                $("#resultado").append(tabla + filas+"</tr></table></center>")
                console.log(resultado)
            }
        });
}

function buscarPorIDDoctores(id){
    if(!validarCampo(id))
        alert("Primero ingrese un dato en el campo "+id.attr("id"))
    else{
        $.ajax({    
            url : 'https://g1a87438372da7f-database1.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/doctor/doctor/'+id.val(),
            dataType : 'JSON',
            type : 'GET',
            success : function(resultado) {
                tabla = "<center><table border='1'><tr><th>ID<th>Especialidad<th>Año de Graduacion<th>ID Departamento<th>Nombre<th>Acciones"
                filas =""
                if(resultado.items.length > 0){
                    console.log(resultado)
                    $("#resultado").empty();
                    filas += "<tr>"
                    filas +="<td>"+resultado.items[0].id+"</td>" 
                    filas +="<td>"+resultado.items[0].specialty+"</td>"
                    filas +="<td>"+resultado.items[0].graduate_year+"</td>"
                    filas +="<td>"+resultado.items[0].department_id+"</td>"
                    filas +="<td>"+resultado.items[0].name+"</td>"
                    filas +="<td><button onclick='eliminarDoctor("+resultado.items[0].id+")'>Eliminar</button>"
                    filas += "<button onclick='actualizarDoctor("+resultado.items[0].id+")'>Actualizar</button>"
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

function guardarDoctor(){ 
    $.ajax({    
        url : 'https://g1a87438372da7f-database1.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/doctor/doctor',
        data : { 
                specialty: $("#specialty").val(),
                graduate_year: $("#graduate_year").val(),
                department_id: $("#department_id").val(),
                name: $("#name").val() },
        type : 'POST',
        dataType: 'JSON',
        success : function(json, textStatus, xhr) {
    
        
        },
        error : function(xhr, status) {
           
            
        },
        complete : function(xhr, status) {
            alert('Petición realizada '+xhr.status);
            limpiarFormulario();
            window.location.href="doctores.html";
        }
    });
}

function eliminarDoctor(idDoctor){
    var datos={id:idDoctor}
    console.log(idDoctor);
    
    $.ajax({    
        url : 'https://g1a87438372da7f-database1.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/doctor/doctor',
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
    window.location.href="doctores.html";  
}

function actualizarDoctor(idDoctor){
    console.log(idDoctor)
    location.href="actualizarDoctores.html?variable="+idDoctor+"";
}

function cargarDatosDoctor(id){
    $.ajax({    
        url : 'https://g1a87438372da7f-database1.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/doctor/doctor/'+id,
        dataType : 'JSON',
        type : 'GET',
        success : function(resultado) {
            $("#id").val(resultado.items[0].id)  
            $("#specialty").val(resultado.items[0].specialty)
            $("#graduate_year").val(resultado.items[0].graduate_year)
            $("#department_id").val(resultado.items[0].department_id)
            $("#name").val(resultado.items[0].name)
        },
        error : function(xhr, status) {
            alert('ha sucedido un problema'+ xhr.status);
        }
    });
}

function editarDoctor(){ 
var datos={
        id:$("#id").val(),
        specialty: $("#specialty").val(),
        graduate_year: $("#graduate_year").val(),
        department_id: $("#department_id").val(),
        name: $("#name").val()
    }

$.ajax({    
    url : 'https://g1a87438372da7f-database1.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/doctor/doctor',
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
        window.location.href="doctores.html";
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
    $("#specialty").val("");
    $("#graduate_year").val("");
    $("#department_id").val("");
    $("#name").val("");
}