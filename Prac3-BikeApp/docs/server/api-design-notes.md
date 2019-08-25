## GET

### List all users

``GET /v0/users``

```
{
    "ok": true,
    "data": [
        {
            "user_id": "integer",
            "username": "string",
            "password": "string",
            "sessions": "[Array]"
        }
    ],
    "version": "integer",
    "now": "datetime"
}
```
## List all sessions

``GET /v0/sessions``

Lists all session information stored in the Database

Status: 200 OK

{
    ok: true,
    data: [
        {
            session_id: string,
            user_id: integer
        },
    ],
    version: "1.0.0",
    now: "2019-04-09T15:38:48.405Z"
}


### Search users

``GET /v0/users/:username``

Returns the usernames of people currently registered in the database

Status 200

{
    ok: true,
    data: [
        {
            user_id: 101,
            username: "ajw40",
            password: "$2b$12$5Qki3q8yEXZZHt64OC.Ixu7FI2OyTuFQACGN2NTCnvk/Sq17csUtq",
            sessions: [ ]
        }
        ],
    version: "1.0.0",
    now: "2019-04-09T15:05:17.951Z"
}


## POST

### Create user
``POST /v0/users/``

```
Run in the terminal:
curl -d '{"username":"value1", "password":"value2"}' -H "Content-Type: application/json" -X POST http://localhost:3000/api/v0/users
Object to post should look like this:
{
    "username":"string",
    "password":"string"
}
Success message:
{"ok":true,"version":"1.0.0","now":"2019-04-09T15:00:40.567Z"}
For further verification run http://localhost:3000/api/v0/users in the browser and see if the user was added

Server further dev:
If user doesn't run the request properly (e.g. not having "username" and "password" as part of their object or having an inconsistency wit ' or " -> server should return an error message )

To test:
- emoji 🤞🏻
- weird character
- success message: maybe return the complete object


The following inputs will return an error
- Usernames shorter than 3 letters don't work -> but it should let the user know if they don't meet the criteria


The following inputs don't return an error but probably should:
- Username that already exists -> it should let the user know if the username typed already exists (but it doesn't add to the database)
- Emails -> usernames with @ and "." -> Should we accept emails as usernames


```