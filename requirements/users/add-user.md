# Add User

> ## Success ✅

1. Receive a POST request on /users route
2. Validate if the request was made by an authenticated user
3. Validate required fields **name** | **role** | **email** | **password** | **passwordConfirmation**
4. Validate if **email** is valid
5. Validate if **email** is already in use
6. Hash password
7. Create a user on database
8. Returns 201

> ## Exception ❌

1. Returns 404 if route not found
2. Returns 403 if user not authenticated
3. Returns 400 if missing any required field
4. Returns 400 if **email** not valid
5. Returns 403 if **email** already in use
6. Returns 500 if error when hashing password
7. Returns 500 if error when creating user