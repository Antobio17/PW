# Programación Web (PW)
Repositorio para la asignatura Programación Web en el curso 21/22 (UGR)

## Pasos Instalación Symfony con Docker
1. docker-compose run --rm --service-ports installer bash
2. Una vez ejecutado y estemos dentro del bash ejecutaremos: curl -sS https://get.symfony.com/cli/installer | bash
3. mv /root/.symfony/bin/symfony /usr/local/bin/symfony
4. bash-5.1# symfony new pe2-symfony --full
5. Para hacer peticiones de la aplicación de Symfony al servidor MYSQL necesitamos:
   1. Crear el Dockerfile
### Comandos
```shell
docker-compose up -d # Ejecutar en background
docker-compose exec db mysql -uroot -padmin # Comando para conectarse a MYSQL dentro del contenedor

# Cuando se congele
docker system prune --all
docker volume prune 
docker-compose up

#Limpiar caché
docker-compose exec app bin/console cache:clear

# Doctrine
docker-compose exec app bin/console doctrine:migrations:diff
docker-compose exec app bin/console doctrine:migrations:execute --up DoctrineMigrations\VersionXXXXXXXXX
# Borrar vendor/doctrine
docker-compose exec app /usr/bin/composer require doctrine

# Instalar encore
docker-compose exec app /usr/bin/composer require symfony/webpack-encore-bundle

# Instalaciones yarn
docker-compose exec app yarn add @symfony/webpack-encore --dev
docker-compose exec app yarn add sass-loader@^12.0.0 sass
docker-compose exec app yarn add --dev @fortawesome/fontawesome-free

# Acceder al contenedor 
docker exec -it php-container bash

docker exec -it mysql-container bash
mysql -uroot -psecret

docker-compose run --rm node-service yarn encore dev
docker-compose exec php-service composer require twig/extra-bundle

podman-compose exec nginx-service /bin/sh
  
```