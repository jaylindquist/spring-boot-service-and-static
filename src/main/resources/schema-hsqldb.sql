CREATE TABLE franchises (
	id BIGINT NOT NULL PRIMARY KEY,
	title VARCHAR(255)
);

CREATE TABLE games (
	id BIGINT NOT NULL,
	franchise_id BIGINT NOT NULL, 
	name VARCHAR(255),
	release DATE,
	FOREIGN KEY (franchise_id) REFERENCES franchises(id)
);

INSERT INTO franchises 
	(id, title) VALUES
	(0, 'Final Fantasy'),
	(1, 'Fire Emblem'),
	(2, 'The Legend of Zelda');

INSERT INTO games
	(franchise_id, id, name, release) VALUES
	(0, 0, 'Final Fantasy Type 0', '2011-10-27'),
	(0, 1, 'Final Fantasy IV: The After Years', '2008-02-18'),
	(0, 2, 'Final Fantasy VII', '1997-09-07'),
	(1, 0, 'Fire Emblem Awakening', '2013-02-04'),
	(1, 1, 'Fire Emblem Shadow Dragon', '2009-02-16'),
	(2, 0, 'The Legend of Zelda: Skyward Sword', '2011-11-20'),
	(2, 1, 'The Legend of Zelda: Ocarina of Time', '2007-02-26'),
	(2, 2, 'The Legend of Zelda: A Link to the Past', '1991-11-21');
	
-- SHUTDOWN;