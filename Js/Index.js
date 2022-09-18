let personas = [];
let equipoA = [];
let equipoB = [];
let puntuacionA=0;
let puntuacionB=0;
let puntuacion=0;
let starElegida=-1;


  

   function agregar()
   {          
     let nombre= $('#nombre').val();    
          
     if(puntuacion>0 && nombre.length>0)
     {
        let nuevo = {
          "nombre": nombre,
          "puntuacion": puntuacion    
        }
        
        personas.push(nuevo);
        cargarPersonas();
        puntuacion=0;
        starElegida=-1;
     }
     else
     {

      $("#alert").remove();

      $("#msj").after(`
      <div id="alert" class="alert alert-danger alert-dismissible fade show " role="alert">
          <strong>Complete Nombre y puntuación</strong>
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
      `); 
      
     
     }
                  
  }


  function cargarPersonas()
  {
    $( "#personas" ).empty();

    personas.forEach(function(elemento, indice, array) 
    {
      $( "#personas" ).append( '<tr><td>'+elemento.nombre+'</td><td>'+elemento.puntuacion+'</td></tr>' );
    })    
  }

function ordenarPuntuacion()
{
    personas.sort(function(a, b){return a.puntuacion - b.puntuacion});
    personas.reverse();
    //cargarPersonas();
}

function limpiar()
{
  $( "#personas" ).empty();  
  $( "#equipoA" ).empty();
  $( "#equipoB" ).empty();
  $( "#totalA" ).empty();
  $( "#totalB" ).empty();

  personas=[];
  equipoA=[];
  equipoB=[];
  puntuacionA=0;
  puntuacionB=0;
}

function armarEquiposAlAzar()
{
    var lista;
    $( "#equipoA" ).empty();
    $( "#equipoB" ).empty();

    $( "#totalA" ).empty();
    $( "#totalB" ).empty();
    puntuacionA=0;
    puntuacionB=0;

    if(personas.length>0)
    {
      totalPersonas=personas.length;          
      lista = personas.sort(function() {return Math.random() - 0.5});
      lista.forEach(function(elemento, indice, array) 
      {      
        if(indice%2!=0)
        {
          equipoA.push(elemento);      
          $( "#equipoA" ).append( '<tr><td>'+elemento.nombre+'</td><td>'+elemento.puntuacion+'</td></tr>' );
          puntuacionA=parseInt(puntuacionA)+parseInt(elemento.puntuacion);          
        }
        else
        {
          equipoB.push(elemento);      
          $( "#equipoB" ).append( '<tr><td>'+elemento.nombre+'</td><td>'+elemento.puntuacion+'</td></tr>' );
          puntuacionB=parseInt(puntuacionB)+parseInt(elemento.puntuacion);          
        }      
      })  
      
      $( "#totalA" ).append( '<tr><th> Total: </td><td>'+puntuacionA+'</th></tr>' );
      $( "#totalB" ).append( '<tr><th> Total: </td><td>'+puntuacionB+'</th></tr>' );
      
    }
    else 
    {
      $("#alert").remove();

      $("#msj").after(`
      <div id="alert" class="alert alert-danger alert-dismissible fade show  role="alert">
          <strong>Primero ingrese personas para armar equipos.</strong>
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
      `); 
      
    }
  
}

function armarEquiposParejos()
{

    $( "#equipoA" ).empty();
    $( "#equipoB" ).empty();

    $( "#totalA" ).empty();
    $( "#totalB" ).empty();
    puntuacionA=0;
    puntuacionB=0;
    ordenarPuntuacion();

    if(personas.length>0)
    {
      totalPersonas=personas.length;      
      personas.forEach(function(elemento, indice, array) 
      {      
        if(puntuacionA<=puntuacionB)
        {
          equipoA.push(elemento);      
          $( "#equipoA" ).append( '<tr><td>'+elemento.nombre+'</td><td>'+elemento.puntuacion+'</td></tr>' );
          puntuacionA=parseInt(puntuacionA)+parseInt(elemento.puntuacion);        
        }
        else
        {
          equipoB.push(elemento);      
          $( "#equipoB" ).append( '<tr><td>'+elemento.nombre+'</td><td>'+elemento.puntuacion+'</td></tr>' );
          puntuacionB=parseInt(puntuacionB)+parseInt(elemento.puntuacion);          
        }      
      })  
      
      $( "#totalA" ).append( '<tr><th> Total: </td><td>'+puntuacionA+'</th></tr>' );
      $( "#totalB" ).append( '<tr><th> Total: </td><td>'+puntuacionB+'</th></tr>' );
      
    }
    else 
    {
      $("#alert").remove();

      $("#msj").after(`
      <div id="alert" class="alert alert-danger alert-dismissible fade show  role="alert">
          <strong>Primero ingrese personas para armar equipos.</strong>
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
      `); 
      
    }
  
}



//-----------------------------------------------
$(document).ready(function () {
    
  for(let j=1;j<=10;j++)
  {         
      
      $("#estrellitas").append(`<img class="star" id="star-${j}"  src="Image/star_des.png" alt="id="star-${j}">`); //append agrega luego del elemento      
      
      if(j==10)
      {
        $("#estrellitas").append(`<span id="puntuacion">(0)</span>`); 
      }

      $(`#star-${j}`).hover(                
        function() {
            let hasta= $(this).attr("id").substr(5);                    
            
            for(let b=1;b<=10;b++)
                {                            
                    $(`#star-${b}`).attr("src","IMAGE/star_des.png");
                }

            for(let b=1;b<=hasta;b++)
            {                        
                $(`#star-${b}`).attr("src","IMAGE/star.png");
                $(`#puntuacion`).empty();
                $(`#puntuacion`).append("("+b+")");
            }
            
        }, 
        function() {
            let hasta;
            
            hasta= $(this).attr("id").substr(5);                    
                for(let b=1;b<=hasta;b++)
                {                            
                    $(`#star-${b}`).attr("src","IMAGE/star_des.png");
                    $(`#puntuacion`).empty();
                    $(`#puntuacion`).append("("+b+")");
                }  
                                                                                                                                                                                                
        }
      );   

      $(`#star-${j}`).on({
        click: function() {                       
                starElegida= $(this).attr("id").substr(5);                    
                puntuacion=starElegida;

                for(let b=1;b<=10;b++)
                    {           
                        if(b<=starElegida)     
                        {
                            $(`#star-${b}`).attr("src","IMAGE/star.png");
                            $(`#puntuacion`).empty();
                            $(`#puntuacion`).append("("+starElegida+")");
                        }
                        else
                        {
                            $(`#star-${b}`).attr("src","IMAGE/star_des.png");
                            $(`#puntuacion`).empty();
                            $(`#puntuacion`).append("("+starElegida+")");
                        }
                    }
                
                    
        }
      });

$("#estrellitas").mouseleave(function() {
    if(starElegida!=-1)
    {
                for(let b=1;b<=10;b++)
                {           
                    if(b<=starElegida)     
                    {
                        $(`#star-${b}`).attr("src","IMAGE/star.png");                      
                    }
                    else
                    {
                      $(`#star-${b}`).attr("src","IMAGE/star_des.png");                    
                    }
                        
                }
                $(`#puntuacion`).empty();
                $(`#puntuacion`).append("("+starElegida+")");
    }  
    else
    {    
      $(`#puntuacion`).empty();
      $(`#puntuacion`).append("(0)");
    }
});

    }
  
  })//document ready