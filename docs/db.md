## User
- *name:* varchar(25)

## Image
- *name:* varchar(25)
- *url:* text


## Object
- *name:* varchar(25)
- *position:* json {x: number, y: number}
- *image:* Image

## Score
- *record:* varchar(8)
- *user:* User
- *image:* Image