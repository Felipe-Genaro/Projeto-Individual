create database FutZone;
use FutZone;

create table usuario (
id int primary key auto_increment,
nome varchar(50) not null,
email varchar(100) unique not null,
senha varchar(50)not null
);

create table quiz(
id int primary key auto_increment,
acertos int null,
erros int null,
fk_usuario int null,
constraint cfk_quiz_usuario 
	foreign key(fk_usuario)
		references usuario(id)
);

create table musica (
    id int primary key auto_increment,
    titulo varchar(100) not null,
    constraint uq_musica unique (titulo)
);

create table podio (
    id int primary key auto_increment,
    fk_usuario int not null,
    fk_musica int not null,
    posicao tinyint not null,
    constraint cfk_podio_usuario
        foreign key (fk_usuario) 
			references usuario(id),
    constraint cfk_podio_musica
        foreign key (fk_musica) 
			references musica(id),
    constraint chk_posicao check (posicao between 1 and 7),
    constraint uq_usuario_posicao unique (fk_usuario, posicao),
    constraint uq_usuario_musica unique (fk_usuario, fk_musica)
);

insert into musica (titulo) values
('Levanta e Anda'),
('Way down we go'),
('The Nights'),
('Love me Again'),
('Genius'),
('My Type'),
('Feet Don´T Fall Me Now'),
('Hayya hayya'),
('Flicker Of Light'),
('Big Talk'),
('Kuzola'),
('Jerk It Out'),
('Kids'),
('Yo x Ti, Tu x Mi');

select * from usuario;