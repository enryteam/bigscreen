(function(root) {
	const APPKEY = 27182819;
	const APPSECRET = "5920d4f5d0c04b23a1059d58a9410461"; //app密码, 有可能更改，所以设为全局
	/**
	 * 创建api签名和时间戳
	 *
	 * @param {Number} appKey      app key
	 * @param {String} appSecret   app密码
	 * @param {Number} apiId       api ID 每个请求的id不一样
	 * @param {Object} body        body值固定
	 * @param {Object} head        默认值空对象
	 * @param {Object} query       默认值空对象
	 */
	let __body = { ds: 1 };
	function createSig({
		appKey = APPKEY,
		appSecret = APPSECRET,
		apiId,
		body = __body,
		head = {},
		query = {}
	}) {
		let time = new Date().getTime();
		const baseArr = [
			["X-Auth-ActionId", apiId],
			["X-Auth-Key", appKey],
			["X-Auth-Timestamp", time]
		];
		let params = [
			...baseArr,
			...Object.entries(body),
			...Object.entries(head),
			...Object.entries(query)
		]
			.sort()
			.map(([key, value]) => {
				return `${key}=${value}`;
			})
			.concat(appSecret)
			.join("&");
		params = CryptoJS.MD5(params);
		return {
			sig: params,
			time
		};
	}
	/**
	 * 封装ajax请求
	 *
	 * @param {String} type         请求类型 默认都是post
	 * @param {String} url          请求url  必须
	 * @param {Object} data         请求参数 默认都是一样的
	 * @param {Function} callback   请求成功回调  必须
	 * @param {Number} apiId        请求id  必须
	 */
	function http({
		type = "POST",
		url,
		data = JSON.stringify({
			inFields: {
				ds: "1"
			}
		}),
		callback,
		apiId
	}) {
		//生成签名和时间戳
		let sig = createSig({
			apiId
		});
		$.ajax({
			type,
			url,
			data,
			contentType: "application/json;charset=utf-8",
			beforeSend: function(xhr) {
				xhr.setRequestHeader("X-Auth-Key", APPKEY);
				xhr.setRequestHeader("X-Auth-ActionId", apiId);
				xhr.setRequestHeader("X-Auth-Signature", sig.sig);
				xhr.setRequestHeader("X-Auth-Timestamp", sig.time);
			},
			dataType: "json",
			success: callback,
			error: function() {}
		});
  }
  root.__http = typeof window ? http : f => f;
}(window));
