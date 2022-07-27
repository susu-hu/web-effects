const domain = '';
axios.defaults.baseURL = domain;
// 请求超时时间
axios.defaults.timeout = 50000;
// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/json';
// 请求拦截器
axios.interceptors.request.use(
	config => {
		const token = sessionStorage.token;
		token && (config.headers.token = token);
		return config;
	},
	error => {
		return Promise.error(error);
	}
)
// 响应拦截器
axios.interceptors.response.use(
	response => {
		if (response.status === 200) {
			return Promise.resolve(response);
		} else {
			return Promise.reject(response);
		}
	},
);

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
function get(url, params) {
	return new Promise((resolve, reject) => {
		axios.get(url, {
			params: params
		})
			.then(res => {
				let d = res.data;
				resolve(res.data);
			})
			.catch(err => {
				reject(err.data)
			})
	});
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 * QS.stringify(params)
 */
function post(url, params) {
	return new Promise((resolve, reject) => {
		axios.post(url, params)
			.then(res => {
				let d = res.data;
				resolve(res.data);
			})
			.catch(err => {
				reject(err.data)
			})
	});
}

