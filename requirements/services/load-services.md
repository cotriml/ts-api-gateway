# Load Services

> ## Success ✅

1. Receive a GET request on /services route
2. Validate if the request was made by an authenticated user
3. If there is pageSize as query param, validate if it is less than 100
4. Returns 200 with a list of services

> ## Exception ❌

1. Returns 404 if route not found
2. Returns 403 if user not authenticated
3. Returns 400 if pageSize is greater than 100
4. Returns 500 if error when loading services