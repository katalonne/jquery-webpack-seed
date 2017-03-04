var _ = require('lodash');
var _configs = {
	// global section
	global: require(__dirname + '/config/webpack/global'),

	// config by enviroments
	// dev_contacts: require(__dirname + '/config/webpack/environments/dev_contacts'),
	// dev_gallery: require(__dirname + '/config/webpack/environments/dev_gallery'),
	// dev_index: require(__dirname + '/config/webpack/environments/dev_index'),
	// dev_news: require(__dirname + '/config/webpack/environments/dev_news'),
	// dev_reviews: require(__dirname + '/config/webpack/environments/dev_reviews'),
	// dev_services: require(__dirname + '/config/webpack/environments/dev_services'),
	// dev_why_us: require(__dirname + '/config/webpack/environments/dev_why_us'),

	development: require(__dirname + '/config/webpack/development'),
	production: require(__dirname + '/config/webpack/production'),

	plugins: [],
};

var _load = function () {
	var ENV = process.env.NODE_ENV
		? process.env.NODE_ENV
		: 'production';
	if (ENV != 'production' && ENV != 'development') {
	// if (ENV != 'production') {
		_configs.plugins = _configs.plugins.concat(_configs[ENV].plugins);
		_configs.plugins = _configs.plugins.concat(_configs['global'].plugins);
		delete _configs[ENV].plugins;
		delete _configs['global'].plugins;
	}

	console.log('Current Environment: ', ENV);

	if (ENV == 'development') {
		return _configs && _.merge(
			_configs[ENV](__dirname)
		);
	}

	if (ENV == 'production') {
		return _configs && _.merge(
			_configs[ENV](__dirname)
		);
	}


	// load config file by environment
	return _configs && _.merge(
		_configs.global(__dirname),
		_configs[ENV](__dirname)
	);
};

module.exports = _load();