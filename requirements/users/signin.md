# User Signin

> ## Success ✅

1. Receive a POST request on /users/signin route
2. Validate required fields **email** | **password**
3. Validate if **email** is valid
4. Find user on database with **email** and **password** given
5. Generate an access token by user **id** with 1h expiration
6. Returns 200 with access token and username

> ## Exception ❌

1. Returns 404 if route not found
3. Returns 400 if missing any required field
4. Returns 400 if **email** not valid
4. Returns 500 if error when finding user
5. Returns 500 if error when generating access token