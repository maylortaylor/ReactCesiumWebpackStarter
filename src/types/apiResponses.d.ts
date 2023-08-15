type AxiosResponse = {
	// * `data` is the response from the server
	data: {};
	// * `status` is the HTTP status code from the server response
	status: 200;
	// * `statusText` is the HTTP status message from the server response
	statusText: 'OK';
	// * `headers` the HTTP headers that the server responded with
	// * All header names are lowercase and can be accessed using the bracket notation.
	// * Example: `response.headers['content-type']`
	headers: {};
	// * `config` is the config that was provided to `axios` for the request
	config: {};
	// * `request` is the request that generated this response
	request: {};
};
