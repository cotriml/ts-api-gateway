# Add Service

> ## Success ✅

1. Receive a POST request on /services route
2. Validate if the request was made by an authenticated user
3. Validate required fields **baseUrl** | **hostName** | **apiName** | **isActive**
5. Validate if **baseUrl** already exists
6. Create a service on database
7. Returns 201

> ## Exception ❌

1. Returns 404 if route not found
2. Returns 403 if user not authenticated
3. Returns 400 if missing any required field
4. Returns 403 if **baseUrl** already exists
5. Returns 500 if error when creating service