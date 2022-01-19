# Update Service

> ## Success ✅

1. Receive a PATCH request on /services route
2. Validate if the request was made by an authenticated user
3. Validate required field **serviceId** on path param
5. Validate if **baseUrl** already exists if updating it
6. Update a service on database
7. Returns 204

> ## Exception ❌

1. Returns 404 if route not found
2. Returns 403 if user not authenticated
3. Returns 400 if missing any required field
4. Returns 403 if **baseUrl** already exists
5. Returns 500 if error when updating service