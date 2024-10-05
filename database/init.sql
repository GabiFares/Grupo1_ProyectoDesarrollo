CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Crear tabla de telefono sin la clave foránea al usuario inicialmente
create table if not exists telefono (
    id serial primary key,
    numeroTel varchar(20) not null
);

-- Crear tabla de direccion sin la clave foránea al usuario inicialmente
create table if not exists direccion (
    id serial primary key,
    numero varchar(10) not null,
    calle varchar(20) not null,
    apto varchar(5) null
);

-- Crear la tabla usuario que hará referencia a direccion y telefono más adelante
create table if not exists usuario (
    id serial primary key,
    nombre varchar(20) not null,
    apellido varchar(20) not null,
    email varchar(50) not null unique,
    id_direccion integer not null,
    id_telefono integer not null,
    contraseña varchar(225) not null
);

-- FIXME: No es de mi materia, pero... Me encantó esa separación de telefono y direccion. 
-- Pero acá hay lugar a mejora. Tendría que ver su modelo gráfico. Por favor adjúntenlo.
-- Pero con eso se complicaron bastante los INSERT
-- Si usuario y telefono es una relación uno a uno, y además id_telefono es not null, no tiene sentido la separación. Metan el atributo en la tabla. Nunca van a haber dos usuarios usando la misma tupla de telefono.
-- En el caso direccion misma pregunta. Es uno a uno? En dicho caso para mantener la separación el id de la dirección es el mismo id del usuario. 
-- En cualquier caso, van a tener que mejorar sus insert. Más comentarios en la ruta post.
CREATE TABLE if not exists usuarios_direcciones (
    usuario_id INT,
    CONSTRAINT fk_usuario FOREIGN KEY (usuario_id) REFERENCES usuario(id) on delete cascade,
    direccion_id INT,
    CONSTRAINT fk_direccion FOREIGN KEY (direccion_id) REFERENCES direccion(id) on delete cascade
);
-- FIXME: Recién veo que usuario direccion es N a N. 
-- No necesariamente tiene que estar mal, pero dado el contexto, no creo que sea necesario ese N a N. 
-- Aparte, a que referencia su id_direccion? Lo pusieron a dirección, ignorando la relación N a N. 

-- Alterar tabla usuario para añadir claves foráneas a direccion y telefono
alter table usuario 
    ADD CONSTRAINT fk_telefono FOREIGN KEY (id_telefono) REFERENCES telefono(id),
    ADD CONSTRAINT fk_direccion FOREIGN KEY (id_direccion) REFERENCES direccion(id);

-- Ahora que usuario existe, podemos añadir la clave foránea de id_usuario en direccion y telefono
alter table telefono ADD COLUMN id_usuario integer;
alter table direccion ADD COLUMN id_usuario integer;

alter table telefono 
    add constraint fk_usuario foreign key (id_usuario) references usuario(id) on delete cascade;

alter table direccion 
    ADD CONSTRAINT fk_usuario FOREIGN KEY (id_usuario) REFERENCES usuario(id) on delete cascade;


-- FIXME: lo que están haciendo en los ALTER TABLE metanlos en el CREATE TABLE que queda más fácil de leer y mantener. Es el primer script así que no es necesario usar los alter.

-- FIXME: Me preocupa que no veo nada relacionado a roles/perfiles. Me suena que los necesitan.