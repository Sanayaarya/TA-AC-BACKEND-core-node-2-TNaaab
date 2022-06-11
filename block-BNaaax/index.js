var path = require('path');

var relativePath = './form.html'
var absolutePath = _dirname;
var formPath = path.join(_dirname, 'form.html')
console.log(formPath,relativePath)