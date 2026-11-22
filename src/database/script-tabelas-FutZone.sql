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
    
select * from quiz;
select * from podium;
select * from usuario;
select * from musica
 order by id;
 
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

-- /////////////////////////// PARTE DA MÚSICA ///////////////////////////////////////

-- KPI 1
-- Musicas mais bem avaliadas
-- MUSICAS QUE MAIS APARECERAM NO TOP 3
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
        
create view vw_musicas_top3 as
select 
	m.titulo as Nome_da_musica,
    p.posicao as Posicao,
    count(*) as Quantidade_de_vezes_no_top3
    from usuario u
		join podium p 
			on u.id = p.fk_usuario 
		join musica m
			on m.id = p.fk_musica
	where p.posicao <= 3
		group by m.titulo, p.posicao
        order by p.posicao;
        
select nome_da_musica from vw_musicas_top3;
select Quantidade_de_vezes_no_top3 from vw_musicas_top3;



-- KPI 2
-- Músicas com mais pontuação 
create view vw_musica_pontuacao as
select 
	m.titulo as nome_musica, 
    SUM(8 - p.posicao) as pontos
	from podium p
		join musica m 
			on m.id = p.fk_musica
	group by m.id, m.titulo
	order by pontos desc
	limit 1;
    
    select nome_musica from vw_musica_pontuacao;
    select pontos from vw_musica_pontuacao;


-- KPI 3
-- Quantidade de participantes que já montaram seu Top 7
create view vw_kpi3_respostas as
select 
	count(*) as Qtd_respostas
    from quiz
	group by fk_usuario; 

select * from vw_kpi3_respostas;

-- GRAFICO 1
-- MUSICAS QUE MAIS APARECERAM NO PODIUM DAS PESSOAS
-- SELECT COM O NOME DA PESSOA E O PÓDIUM DELA COM AS MÚSICAS NAS POSIÇÕES CRESCENTE
create view vw_ranking_musicas as
select 
	m.titulo as nome_musica, 
    SUM(8 - p.posicao) as pontos
	from podium p
		join musica m 
			on m.id = p.fk_musica
	group by m.id, m.titulo
	order by pontos desc
	limit 8;
    
-- GRAFICO 2
-- 