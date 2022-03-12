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

### 3. Busca y bájate algunas imágenes e introduce en el fichero holamundo.html varios elementos img. ¿Cómo especificarías el tamaño de la imagen?

En la imagen de la etiqueta HTML podemos definir el tamaño de las siguientes formas usando las propiedades **width** y **height**:
- Indicando los píxeles exactor que deseamos. (width=1000px height=400px)
- Dejándolo de manera automática. (width=auto height=auto)
- Usando porcentajes. (width=60% height=50%)

Todas estas formas pueden ser combinadas entre la altura y la anchura.

[holamundo.html](holamundo.html)

### 4. Introduce los siguientes enlaces:
- De texto, a la página principal de la Universidad de Granada.
- Mediante una imagen, al buscador Google.
- Crea varios párrafos en tu documento con diferentes identificadores y enlaza uno de ellos. 
- Crea un segundo documento HTML, prueba.html, y enlaza a dicho fichero.

[holamundo.html](holamundo.html)
