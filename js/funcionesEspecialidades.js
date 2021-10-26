function traerInformacionEspecialidades(){
    $.ajax({    
            url : 'http://129.151.123.56:8080/api/Specialty/all',
            type : 'GET',
            dataType : 'JSON',
            
            error : function(xhr, status) {
                alert('ha sucedido un problema, '+xhr.status);
            },
            success : function(resultado) {
                $("#resultado").empty();
                tabla = "<center><table border='1'><tr><th>ID<th>Nombre<th>Descripcion"
                filas = ""
                for(i = 0;  i < resultado.length; i++){
                   filas += "<tr>"
                   filas +="<td>"+resultado[i].id+"</td>"   
                   filas +="<td>"+resultado[i].name+"</td>"
                   filas +="<td>"+resultado[i].description+"</td>"
                   /*filas +="<td><button onclick='eliminarSpecialty("+resultado[i].id+")'>Eliminar</button>"
                   filas += "<button onclick='actualizarSpecialty("+resultado[i].id+")'>Actualizar</button>"*/
                }
                $("#resultado").append(tabla + filas+"</tr></table></center>")
                console.log(resultado)
            }
        });
}

function buscarPorIDEspecialidades(id){
    if(!validarCampo(id))
        alert("Primero ingrese un dato en el campo "+id.attr("id"))
    else{
        $.ajax({    
            url : 'http://129.151.123.56:8080/api/Specialty/'+id.val(),
            type : 'GET',
            dataType : 'JSON',
            success : function(resultado) {
                tabla = "<center><table border='1'><tr><th>ID<th>Nombre<th>Descripcion"
                filas =""
                console.log(resultado)
                if(resultado){
                    console.log(resultado)
                    $("#resultado").empty();
                    filas += "<tr>"
                    filas +="<td>"+resultado.id+"</td>" 
                    filas +="<td>"+resultado.name+"</td>"
                    filas +="<td>"+resultado.description+"</td>"
                    /*filas +="<td><button onclick='eliminarSpecialty("+resultado.id+")'>Eliminar</button>"
                    filas += "<button onclick='actualizarSpecialty("+resultado.id+")'>Actualizar</button>"*/
                    $("#resultado").append(tabla + filas+"</tr></table></center>")  
                }
                else{
                    alert("Specialty con ID "+id.val()+" no existe")
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

function guardarEspecialidad(){ 
var datos={ 
    name: $("#name").val(),
    description: $("#description").val()
    }
    $.ajax({    
        url : 'http://129.151.123.56:8080/api/Specialty/save',
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
            window.location.href="especialidades.html";
        }
    });
}

function eliminarSpecialty(idSpecialty){
    var datos={id:idSpecialty}
    console.log(idSpecialty);
    
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

function actualizarSpecialty(idSpecialty){
    console.log(idSpecialty)
    location.href="actualizarSpecialtyes.html?variable="+idSpecialty+"";
}

function cargarDatosSpecialty(id){
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

function editarSpecialty(){ 
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

function cargarDatosSelect(){
    $.ajax({    
            url : 'http://129.151.123.56:8080/api/Specialty/all',
            type : 'GET',
            dataType : 'JSON',
            
            error : function(xhr, status) {
                alert('ha sucedido un problema, '+xhr.status);
            },
            success : function(resultado) {
                $("#specialty").empty();
                options = ""
                options += "<option value='' selected>Seleccione especialidad</option>"
                for(i = 0;  i < resultado.length; i++){
                    options +="<option value='"+resultado[i].id+"'>"+resultado[i].name+"</option>"
                   /*filas +="<td><button onclick='eliminarSpecialty("+resultado[i].id+")'>Eliminar</button>"
                   filas += "<button onclick='actualizarSpecialty("+resultado[i].id+")'>Actualizar</button>"*/
                }
                $("#specialty").append(options)
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
    $("#specialty").val("");
    $("#year").val("");
    $("#department_id").val("");
    $("#name").val("");
}