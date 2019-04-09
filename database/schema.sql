/* make sure to create a database locally: createdb `zillowgallery` */
/* make sure to run schema: psql -d zillowgallery < database/schema.sql  */
-- psql.exe -U postgres -d zillowgallery < database/schema.sql -- comand that I ran
DROP TABLE photos; 
DROP TABLE houses;

/* we want to create tables: homes, photos */
CREATE TABLE IF NOT EXISTS houses (
    house_id SERIAL PRIMARY KEY,
    name varchar(40)
);

CREATE TABLE IF NOT EXISTS photos (
    photo_id SERIAL PRIMARY KEY,
    img_url varchar(150),
    img_order INTEGER,
    house_id INTEGER 
);


-- {
--     house_id: 1 
--     photos:[fdafd,fdafdaf,fdafda,rerewr,]
-- },

-- {
--     house_id:2
--     photos:[{url: fdsafda img_order: 0}]
-- }





-- why would I need an order here 