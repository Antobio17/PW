# Práctica 1: HTML 5

## Ejercicios

### 1. ¿Cómo quedaría la representación en forma de árbol de este código HTML?

``` HTML
<!DOCTYPE HTML>
<html>
  <head>
    <title>Just a Test</title>
  </head>
  <body>
   <h1>Just a test</h1>
   <p>Nothing much to see <a href="test.html">here</a>. </p>
   <hr>
   <p>Move <a href="nextpage.html">along</a>. </p>
  </body>
</html>
```

La representación en forma de arbol sería la siguiente:
``` HTML
<html> --> <head> --> <title>
       --> <body> --> <h1>
                  --> <p> --> <a>
                  --> <hr>
                  --> <p> --> <a>
```

### 2. Crea un fichero que se llame holamundo.html con el contenido del Ejemplo 1, súbelo al servidor y visualízalo en el navegador.

Nos conectaremos al servidor que nos proporciona la asignatura con nuestras credenciales de correo sin el dominio y subiremos a la carpeta **public_html** el fichero HTML.

[holamundo.html](holamundo.html)
