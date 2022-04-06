<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    <?php
    $comida1 = 10.4;
    $comida2 = 9;
    $comida3 = 2.5;
    $total = $comida1 + $comida2 + $comida3;
    echo sprintf("El total sin IVA es %f ", $total);
    $iva = $total * 0.21;
    echo sprintf("El iva es %f ", $iva);
    echo sprintf("El total pagar es  %f ", $total + $iva);
    ?>
</body>
</html>