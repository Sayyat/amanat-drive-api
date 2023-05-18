// SMSC.KZ API (smsc.kz) версия 1.2 (08.11.2021)

let Api = function () {
	'use strict';
	let http = require('http');
	let qs = require('querystring');
	let FormData = require('form-data');
	let fs = require('fs');

	let ssl = false,
		def_fmt = 3,
		host = 'smsc.kz',
		charset = 'utf-8';

	let login = "login",
		password = "password",
		sender,
		log = console.log;

	let PHONE_TYPES = {
		'string' : 1,
		'number' : 2
	};

	let get_host = function (www) {
		if (!www) www = '';
		return (ssl? 'https://' : 'http://') + www + host + '/sys/';
	};

	let isInArr = function (arr, val) {
		if (!arr || !arr.length) return false;
		return arr.indexOf(val) !== -1;
	};

	let convert_data = function (data, notConvert) {
		if (data.fmt) delete data.fmt;
		if (data.msg) {
			data.mes = data.msg;
			delete data.msg;
		} if (data.message) {
			data.mes = data.message;
			delete data.message;
		} if (data.phone && !isInArr(notConvert, 'phone')) {
			data.phones = data.phone;
			delete data.phone;
		} if (data.number) {
			data.phones = data.number;
			delete data.number;
		}

		if (data.list) {
			let list = '';
			for (let i in data.list) {
				list += i + ':' + data.list[i]+'\n';
			}
			data.list = list;
			delete data.mes;
		}

		if (data.phones && !(typeof data.phones in PHONE_TYPES)) data.phones = data.phones.join(',');
	};

	let convert_files = function (form, data) {
		if (!data.files) return;

		if (typeof data.files === 'string') {
			let f = data.files;
			let bin = fs.readFileSync(f);
			form.append(i, bin, {
				filename : f
			});
			return;
		}

		for (let i in data.files) {
			let f = data.files[i];
			let bin = fs.readFileSync(f);
			form.append(i, bin, {
				filename : f
			});
		}

		delete data.files;
	};

	let read_url = function (prs, clb, notConvert) {
		let fmt = prs.fmt ? prs.fmt : def_fmt;

		let fd = new FormData();
		fd.append('fmt', fmt);
		fd.append('login', login);
		fd.append('psw', password);
		fd.append('charset', charset);
		if (prs.type) fd.append(prs.type, 1);

		if (prs.data) {
			convert_data(prs.data, notConvert);

			if (prs.data.files) {
				convert_files(fd, prs.data);
			}

			for (let i in prs.data) {
				fd.append(i, prs.data[i]);
			}
		}

		let www = '';
		let count = 0;
		let submit = function () {
			fd.submit(get_host(www) + prs.file, function (err, res) {

				if (err) {
					if (count++ < 5) {
						www = 'www'+(count !== 1 ? count : '')+'.';
						submit();
					}
					else {
							let error = {
							error : "Connection Error",
							error_code : 100
						};
						clb(error, JSON.stringify(error), error.error, error.error_code);
					}
					return;
				}

				res.setEncoding(charset);
				
				let full_data = '';

				res.on('data', function (data) {
					full_data += data;
				});

				res.on('end', function (data) {
					if (clb) {
						let d = JSON.parse(full_data);
						clb(d, full_data, d.error_code ? d.error : null, d.error_code ? d.error_code : null);
					}
				});

			});
		};

		submit();
		return;
	};

	// Конфигурирование
	this.configure = function (prs) {
		ssl = !!prs.ssl;
		login = prs.login;
		password = prs.password;
		if (prs.charset) charset = prs.charset;
	};

	// Отправка сообщения любого типа (data — объект, включающий параметры отправки. Подробнее смотрите в документации к API)
	this.send = function (type, data, clb) {
		if (typeof data !== 'object') data = {};
		let opts = {
			file : 'send.php',
			data : data
		};
		opts['type'] = type;
		read_url(opts, clb);
	};

	// Отправка простого SMS сообщения
	this.send_sms = function (data, clb) {
		if (typeof data !== 'object') data = {};
		read_url({
			file : 'send.php',
			data : data
		}, clb);
	};

	// Получение статуса сообщения
	this.get_status = function (data, clb) {
		if (data.phones) {
			data.phone = data.phones;
			delete data.phones;
		} if (data.number) {
			data.phone = data.number;
			delete data.number;
		}

		if (data.phone && !(typeof data.phone in PHONE_TYPES)) {
			data.phone = data.phone.join(',');
		}

		read_url({
			file : 'status.php',
			data : data
		}, clb, ['phone']);
	};

	// Получение баланса
	this.get_balance = function (clb) {
		read_url({
			file : 'balance.php',
			data : {
				cur : 1
			}
		}, function (b, r, e, c) {
			clb(e ? 0 : b.balance, r, e, c);
		});
	};

	// Получение стоимости сообщения
	this.get_sms_cost = function (data, clb) {
		if (typeof data !== 'object') data = {};
		if (!data.cost) data.cost = 1;
		read_url({
			file : 'send.php',
			data : data
		}, function (b, r, e, c) {
			clb(e ? 0 : b.cost, r, e, c);
		});
	};

	// Запрос к API
	this.raw = function (file, data, clb) {
		read_url({
			file : file,
			data : data
		}, clb);
	};

	// Тестирование подключения и данных авторизации
	this.test = function (clb) {
		read_url({
			file : 'balance.php'
		}, function (d, r, err) {
			clb(err);
		});
	};

};

module.exports = new Api();