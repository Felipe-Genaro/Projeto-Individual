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

create table podium (
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

select * from podium;

-- SELECT COM O NOME DA PESSOA E O PÓDIUM DELA COM AS MÚSICAS NAS POSIÇÕES CRESCENTE
select 
	u.nome 'Questão do Usuário',
	m.titulo 'Nome da música',
    p.posicao 'Posição da música'
    from usuario u
		join podium p 
			on u.id = p.fk_usuario 
		join musica m
			on m.id = p.fk_musica
	order by p.posicao asc;
    
-- MUSICAS QUE APARECERAM NO TOP 3
select 
	m.titulo 'Nome da música',
    p.posicao 'Posição',
    count(*) 'Quantidade de vezes no top 3'
    from usuario u
		join podium p 
			on u.id = p.fk_usuario 
		join musica m
			on m.id = p.fk_musica
	where p.posicao <= 3
		group by m.titulo, p.posicao
        order by p.posicao;
        
-- ALTERAÇÕES quiz desejavel
-- data_hora datetime default current_timestamp,
-- duracao int null


select * from quiz;
