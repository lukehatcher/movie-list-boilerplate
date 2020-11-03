drop database movies;
create database movies;
use movies;

create table movies (
    id int primary key auto_increment,
    title varchar(255) not null
)

-- mysql -u root < schema.sql