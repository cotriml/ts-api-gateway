# Delete Services

> ## Success ✅

1. Receive a DELETE request on /services route
2. Validate if the request was made by an authenticated user
3. Validate required field **serviceId** on path param
4. Delete a service on database
5. Returns 204

> ## Exception ❌

1. Returns 404 if route not found
2. Returns 403 if user not authenticated
3. Returns 400 if missing required field
4. Returns 403 if service not found
5. Returns 500 if error when deleting service
