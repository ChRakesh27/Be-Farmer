CREATE DATABASE befarmer;
use befarmer;
CREATE TABLE user(
  id varchar(36) not Null,
  username VARCHAR(20) NOT NULL,
  phone int NOT NULL,
  email VARCHAR(20) NOT NULL,
  password VARCHAR(10) NOT NULL,
  profileImg longblob NOT NULL,
  primary key(id),
  UNIQUE (email)
);
show tables;

CREATE TABLE land(
	 userId varchar(36) not null,
     area varchar(10) not null,
	soil varchar(20) not null,
	surveyno varchar(10) not null,	
     amount int(20) not null,
     district varchar(40) not null,
     mondal varchar(40) not null,
	 img longblob not null,
     isavailable boolean default true,
     registered varchar(20) default "None",
     primary key(surveyno),
     foreign key (userId) references user(id) on delete cascade
);

insert into land (id,area,soil,surveyno,amount,district,img) values('af964553-d059-494f-a41c-b071f36afb66','200','red','15576345',5000,'sircilla','l1.jpg'),('660793a9-81ca-40ee-b58c-146c6b3bfde2','100','black','4556',5000,'hyd','l2.jpg'),('b52b16d6-bcb7-11ed-a0f8-c200b798d254','300','red','247666',5000,'siddipet','l3.jpg'),('b278d9d2-6cc0-4745-8a32-45515100c42b','100','black','451156',5000,'hyd','l2.jpg');
insert into land (id,area,soil,surveyno,amount,district,img) values('af964553-d059-494f-a41c-b071f36afb66','300','black','565',7000,'hyd','l2.jpg');


Create Table district(
district_id varchar(36),
district_name varchar(30),
mondal json,
primary key(district_id)
);


  
insert into district  values(uuid(),"Adilabad",'["Adilabad (urban)","Adilabad (rural)","Mavala", "Gudihatnoor" , "Bazarhatnoor","Tadamadagu,Tamsi","Bela,Boadh","Jainad,Ichoda","Neradigonda","Sirikonda","Indervelly","Narnoor","Gudiguda","Utnoor"]');  
insert into district  values(uuid(),"Bhadradri Kothagudem",'["Kothagudem","Palwancha","Tekulapalli","Yellandu","Chandrugonda","Aswaraopeta","Mulakalapalli","Dammapeta","Gundala","Julurpadu","Sujathanagar","Chunchupalle","Laxmidevipalli","Allapalli","Annapureddypalli","Bhadrachalam","Dummugudem","Cherla","Burgampahad","Aswapuram","Manuguru","Pinapaka","Karakagudem"]');
insert into district  values(uuid(),"Hanamkonda",'["Bheemadevarpalli","Dharmasagar","Elkathurthy","Inavolu","Hanamkonda","Hasanparthy","Kamalapur","Kazipet","Velair","Parkal","Nadikuda","Damera","Atmakur","Shayampet"]');
insert into district  values(uuid(),"Hyderabad",'["Amberpet","Asif Nagar","Bahadurpura","Bandlaguda","Charminar","Golkonda","Himayathnagar","Nampally","Saidabad","Ameerpet","Khairtabad","Marredpally","Musheerabad","Secunderabad","Shaikpet","Trimulgherry"]');
insert into district  values(uuid(),"Jagtial",'["Jagitial","Jagitial Rural","Raikal","Sarangapur","Beerpur","Dharmapuri","Buggaram","Pegadapalli","Gollapalli","Mallial","Kodimial","Velgatur","Metpalli","Mallapur","IbrahimpatnamKorutla","Medipalli","Kathlapur"]');
insert into district  values(uuid(),"Jangaon",'["Bachannapeta","Devaruppala","Jangaon","Lingalaghanpur","Narmetta","Raghunathapalle","Tarigoppula","Chilpur","Zaffergadh","Kodakandla","Palakurthi","Station Ghanpur"]');
insert into district  values(uuid(),"Jayashankar Bhupalapally",'["Bhupalpalle","Chityal","Ghanpur","Kataram","Mahadevpur","Maha Mutharam","Malharrao","Mogullapalle","Palimela","Regonda","Tekumatla","Eturunagaram","Govindaraopet","Mangapet","Mulug","Tadvai","Vajedu","Venkatapur","Kannaigudem"]');
insert into district  values(uuid(),"Medchal-Malkajgiri",'["Alwal","Bachupally","Balanagar","Dundigal Gandimaisamma","Kukatpally","Malkajgiri","Quthbullapur","Ghatkesar","Kapra","Keesara","Medchal","Medipally","Muduchintalpalli","Shamirpet","Uppal"]');
insert into district  values(uuid(),"Mancherial",'["Chennur","Jaipur","Bheemaram","Kotapally","Luxettipet","Mancherial","Naspur","Hajipur","Mandamarri","Dandepally","JannaramKasipet","Bellampally Mandal","Vempally","Nennel","Tandur","Bheemini","Kannepally"]');
insert into district  values(uuid(),"Sangareddy",'["Ameenpur","Andole","Gummadidala","Hathnoora","Jinnaram","Kandi","Kondapur","Munipally","Patancheru","Pulkal","Ramchandrapuram","Sadasivpet","Sangareddy","Vatpally","Jharasangam","Kohir","Mogudampally","Nyalkal","Raikode","Zaheerabad"]');
insert into district  values(uuid(),"Siddipet",'["Siddipet (Urban)","Siddipet (Rural)","Nangnoor","Chinnakodur","Thoguta","Doulthabad","Mirdoddi","Dubbak","Cherial","Komuravelli","Narayanaraopet","Gajwel","Jagdevpur","Kondapak","Mulug","Markook","Wargal","Raipole","Husnabad","Akkannapet","Koheda","Bejjanki","Maddur","Dhoolmitta"]');
insert into district  values(uuid(),"Suryapet",'["Atmakur(s)","Chivvemla","Jajireddygudem","Mothey","Nuthankal","Penpahad","Suryapet","Thirumalagiri","Thungathurthy","Nagaram","Maddirala","Chilkur","Kodad","Munagala","Nadigudem","Ananthagiri","Palakeedu","Huzurnagar","Mellachervu","Mallareddygudem","Mattampally","Neredcherla","Garidepally"]');
insert into district  values(uuid(),"Vikarabad",'["Basheerabad","Bommaraspet","Doulthabad","Kodangal","Peddemul","Tandur","Yelal","Doma","Dharur","Bantwaram","Kulkacherla","Kotepally","Marpalle","Mominpet","Nawabpet","Pudur","Pargi","Vikarabad"]');
insert into district  values(uuid(),"Wanaparthy",'["Amarchinta","Atmakur","Chinnambavi","Ghanpur (Khilla)","Gopalpeta","Kothakota","Madanapur","Pangal","Pebbair","Peddamandadi","Revally","Srirangapur","Veepanagandla","Wanaparthy"]');
insert into district  values(uuid(),"Warangal",'["Warangal","Khila Warangal","Geesugonda","Sangem","Wardhannapet","Rayaparthy","Parvathagiri","Chennaraopet","Duggondi","Khanapur","Narsampet","Nallabelly","Nekkonda"]');
insert into district  values(uuid(),"Yadadri Bhuvanagiri",'["Addaguduru","Alair","Atmakur (M)","Bibinagar","Bhongir","Bommalaramaram","Gundala","Motakondur","Mothkur","Rajapet","Turkapally","Yadagirigutta","Bhoodan Pochampally","Choutuppal","Narayanpur","Ramannapet","Valigonda"]');
  


select * from district;



select * from land;
select * from user;





drop table district;
drop table user;
drop table land;
INSERT INTO login (id,username, phone, email, password, profileImg) VALUES ( uuid() ,'Rakesh',1234567890, 'ra','r','dsfadf');
UPDATE land SET registered='a', isavailable=false  WHERE surveyno='1342556';
SELECT * FROM login where id='c4647a3f-b8fe-11ed-b487-a04b96108f9b';
select ld.*, u.username from land ld, login u where u.id=ld.id;
select uuid();