create table adoption_house_location (
    adoption_house_location_id int primary key, 
    adoption_house_location varchar(90) unique
);

create table adoption_house (
    adoption_house_id int primary key,
    adoption_house varchar(90),
    adoption_house_location_id int,
    foreign key(adoption_house_location_id) references adoption_house_location(adoption_house_location_id)
);

create table pets(
    id int primary key,
    pet_name varchar(90),
    catagory varchar(90),
    pet_breed varchar(90),
    food varchar(90),
    adoption_house_id int,
    foreign key(adoption_house_id) references adoption_house(adoption_house_id)
);

insert into adoption_house_location values (1, "chennai");
insert into adoption_house_location values (2, "CBE");
insert into adoption_house_location values (3, "Madurai");

insert into adoption_house values (1, "Pets House", 1);
insert into adoption_house values (2, "Pets caves", 2);
insert into adoption_house values (3, "Pets nest", 3);

insert into pets values (1, "MAX", "DOG", "Golden Retriever", "carrot", 1);
insert into pets values (2, "honey", "cat", "Scottish Fold", "chicken", 2);
insert into pets values (3, "cooper", "DOG", "Labrador", "carrots", 1);
insert into pets values (4, "luna", "cat", "Siamese cat", "carrot", 1);
insert into pets values (5, "charlie", "DOG", "Golden Retriever", "chicken", 3);
insert into pets values (6, "bob", "cat", "Scottish Fold", "carrots", 1);
insert into pets values (7, "dog", "cat", "Siamese cat", "carrot, chicken", 3);

