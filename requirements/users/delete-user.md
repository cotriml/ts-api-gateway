# Delete User

> ## Success ✅

1. Receive a DELETE request on /users route
2. Validate if the request was made by an authenticated user
3. Validate required field **userId**
4. Validate if **userId** equals **tokenUserId** (for not delete yourself)
5. Delete a user on database
6. Returns 204

> ## Exception ❌

1. Returns 404 if route not found
2. Returns 403 if user not authenticated
3. Returns 400 if missing required field
4. Returns 400 if userId equals tokenUserId
5. Returns 403 if user not found
6. Returns 500 if error when deleting user