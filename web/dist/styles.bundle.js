webpackJsonp([11,13],{

/***/ 1117:
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	linkElement.rel = "stylesheet";
	insertStyleElement(options, linkElement);
	return linkElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ 1118:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "cover.jpg";

/***/ }),

/***/ 1119:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHYAAAA/CAYAAAA18Dy1AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAtVJREFUeNrsnT9IG3EUx9+dFzVDpY6xBaVUqHawRaiDHTqkm4MWutZM3SqdqtC1BbsVF0cjdBNLwW7J4ODiUBoH04IgdrAd7R9oCjF3/l5yvxirqRdpIO/l+4EfP3KEwL0P7/3e3f3COUEQUC1zg4UBM90KB2h9cjzmd+J7tQcdK9YIvWym12ZMI1YiWTbjqRH8vSo2lLpuxgjiI5otM+6xXDc8kIZUFYyELsmZvf6b19KPiIkqbnPGTiIO6ph0EQOdQCzEAogFEAsgFjSAhxAQxXscSgw5p47vbvoQKxmW+vhN16njc4MFlGIAsQBim8/N+x30aLETzZOmhunhqxgNJzvQFWvKUpbafcmp+50/vwKIlZSlE89jNPrg/Cxde1GEWAlcG3NNlnZS7xXn3O9+eFsqD4ht8SxNzng0Ph3tVL999un9y6L48/aQpSfX1ZVnRSr8DCBWQ5bWrqtfP/kqYuC1e5ZqWlfVik3OxCj55GKnxJ1y79UuymdK5Zv/0jPXkyTtzExbPaSD/cqaeFGp1Wy/45YHw7/Jgnc3S5TP+uLWXTli60jjwFux/xMu5ZzF9pqXu+XtjE/ZBRkdMx4CRCRxw6W7KTm3HyG2wQYLYjWKXYVYdfA6LqlThtiI5LOyrnEhVmEZhlilZRhilZZhiFVahiFWaRmGWKVlGGIjsLF0CLHa4Bv/zXjAALFomiC2GWxn5IpVtYOC/x3HW2P6htzynDBzo1tkNJRhUWKj/qWxsuvBp4105TOL7Rs+Fm13SGguw+oytt516MF+6URZtVmdCDP7rKyWXIbbQuy/strC21WrGW3meA+JLsNtK/ZveKMaZ6j0LEVX3AZALMQCiAUQCyAWQCyAWIgFEAtaQmwOYVBHzr5Qac986Ec8VPBlfic+YEtxCvFQQ6q6xhrD62aaMuMH4iIWdjcVujx+aSETvuOOjeMlS7J4Z0bavrCQORJgACmp/ofNOWVmAAAAAElFTkSuQmCC"

/***/ }),

/***/ 1120:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHYAAAA/CAYAAAA18Dy1AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAsBJREFUeNrsnd1RwkAUhRcm79CBdGA6ACuADowvvJISsALzzIuxg1iBoQPsIHQAFeC9cjezIg4GB4d7c87MzuZPHffLufubpLPb7VyoxWLRp2xCaeAgLVpNp9MiPNAJwRLUlLI5pR7KSp22lBIPuAZLUDPKZsGFS5SVCnGEvQ32Hwhu/gmWoI7owJuceOdQTCcrlJkOET+uNosA8F1XNuYB1BGg6pLwYnOu5VDqwQ4lz+iiDYpKJVzmlsnuuCth2KtEEeluHfuN7hFLQwbURREALASwEMBCF1GEIqg7+Yn7Pj5eUoOyBFjdSoL+vNPeBUQoRh1rXn3Usbbq1piy3H2dIYFjlUNNpQ69tfa/RS0FOhCXDk9cuoFjdbl09QuoS+rqZHCsHZeyeJnJBHWsHZd6TbTPS0fGgXIXpmgAlPWodbSpFY4lqBxKq4ZQuV6do1V8vS7lunR8xo9PrJRDZNClDPXcddEV/Y5S+raF5hUlkSJo3PWIj5zKeR2tbKfub4vde+J0Tk/0N9dSR3/C1tSg0uTY2P3/7MuN2y+in8nNxYvo5xoaV5gEaCa+sQZoFdtUAbD29KKlngVYg24F2GbaHj6DCrBwK8ACLMAiDANsu9wKsACLMAywcCvAKlEOsPa01rpMxhrYCmF4L03zsatTMMldCWWJvDCFUyz5uZPvOcBeWAQtbXAth886hMqaYg/6pwn7Y2F4BbDXfVNUh+4TV8cB8BsrYbg1YE+4OgtcHYLOAdaOqyvtTkV3x7gAFmAhgIUAFgJYCGAhgG0DWHm2FDICNhzoHqFIVGtQg5VnUd5lP0XZqJbn9+rHinkg/JnSkMJxzhfgax56JFUoM/RvmMvCL2Ux0Hs5we854sHwCsWmIvzyKxr8YgJ+IjA5/Lbd4WfQIF169G+96Rz5GiXfAQkaUqpUuv27OOoI+yHAAGqQ6d49PGJeAAAAAElFTkSuQmCC"

/***/ }),

/***/ 1121:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAAAUCAYAAADIpHLKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjc3MTBENEEwRDNDQzExRTU5RkZEOEUzMDUyRTlBMzhCIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjc3MTBENEExRDNDQzExRTU5RkZEOEUzMDUyRTlBMzhCIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NzcxMEQ0OUVEM0NDMTFFNTlGRkQ4RTMwNTJFOUEzOEIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NzcxMEQ0OUZEM0NDMTFFNTlGRkQ4RTMwNTJFOUEzOEIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5aeQu3AAAHBUlEQVR42uxbW2gdRRiend1uktOkkCpV0lZrJVJ8EH0tgmIVfRKhVZGi0NZLxd5E6Js2zWNRSGulIoU+aBVaQfGpFyMGLw++6YMtCRbR9IptoD2XZLMz6/fvmbNutns9OafZtWfg4wwz83/7z7/z7z+3o42PjzusBWlk6BtNZVvCh6TtGnq2ZXyDg4OuflNTUy3h6+/vbwtfWJqYmHgCPy8C9HuPKv4L+A44BoyGvI+4x8XyfXT0ndEowckLF/57QZqm42e5bdvbOefPA8sdxzFUnS2lPA8cNwzjQxSdR51oyK4YGIhUDjaN1Q+2Gs1i2yS+MPvhGe6v0ejrPN9vcJC0lM/nfDclvMxEMgwwJ+1gTGnwtvL59F6Dn0PAMuAwmQI4p6pXA88AB4ArwJvA2YRHpeJ7a+MHLh9sG8snhdgOxd9bZBh9PT093DRNrnPu1gkpDcuyVtZqtV22EFtgoGGN85EEO6TSD+1c/WD3s63gi7OfwToplwnO8Zj6ug0BnyACikCTMwS0O6Be7o/AemAsgnIOH43hwAfG5YNzeHzIr0d9KB8iwwjXtG2LSyUdYIgSDBGEIkf9C+c4rLuri5fgOJVqtb9arb4PmVVosytiMM/RD4M/tL9o5+mH/Hq0G2sVX5j9+P91gOHlOnnWL25qpiLHcWAjHONQiHP4E9UdBF5SMmsiIofLp76oIiYiC8Djgx2DfNyRcic5R29vr76kr491dXUxXdc951BTLLeM6qgNtSUZyO4Ijjv1pXf1w0A+FDKY/dFaAJ5+SpY1y5dkP95xjtw5B42yI8AwHOPbDLSngb1KVgtMd10+IDUfnMTjgz09PkSGlVB+b6lU4n29vW7koJWFtBibFZJdvjjjgvJURnXUhtqSDGSHwbHCZwtPPwzk1Pqhraef4pgXX5T9eMc58uMcKq0D+tSXPmv6WMmuaxcfpkk7MOAxqyppFCHkLGPVimR//Gax0YM2O7l/1gXlqYzqqA21JRmSlfUoUoj+Fs1BnDw7R9LgT7nj9QItKBOmVXHThcOKYw5f3LQqbroV5MMaYkNPd7eGhbn3Ri6M2+z7IxY7tU+wX4/qLihPZVTXeGskQ7K04xXUL2EaFDndiupvkA+2N4H9wFXgmsqbSfYrYgRx8hw5opwgw3YwbUWenIcKJxRHW/gwuAdM09S52q2SmDSd+5mx37/WmdEDJ+iug/JURnXURskyJTuwAP3dB1DkWkq+pfLDif0t6EzKSXIOfP20vDhJmHPEbA2v9G1FNpPOKY628NE5h+7brbp21WJXLlmM/MUtUqA8lVEdtfEW7ihsnJXc4v6+HFL2WhJfkdcgTh6dI+gUGZ2D0gyb3+Go2Wa+VkfqXPe36Iv0XDpHk5GjkeioevU8HnsvMNkuPjohF1K65xyUlt5hsmV3m1i8U3SZCyqjOmqjog8dILocC9DfT0PKDifxFc1BtIRF5YI6R9LgT3ni/gurn/A2m54EfmoXnxTismVZGOeyPoCkxlavZezB5wSza2wOqIzqqI3aAWOurBCXFqC/u1n91HxKgfLvJvEVMYJoeXSOJCfIcB3lKLBlYmJCb+LxJPMq8FmQT9VlSpi+3sQnHed4bXrambVt720MPGCwxzeZ7OndOnv4FeGC8lRGdY03RjIkC45jQf0QbTPrp2RC+xvkg/0tYCewVIHyVpL9inrVRPNPr/I0rWo4g396lfGu1imgDGylrmV89BtK9nS7+DjnI7Ztb65Wq0sWGYamL9JZCQvv+x8y2X2PSHbtHzX1utNgXGAxjyFHEEIwyDiQrYBjf2H6W+D1h5ZH5wg6RdaLjIODgzTCNgF7EEXWZRB9itXvHW0OrM08Pjb3QC0penh8sLHjW4NMokN7MNjljXKZYcC7DsCxzDB0zpbd1eWC8lRGddSG2pIM6UEcPjt5+uGjklo/tPX0Uxzz4ouyX9EX6VqelWv2li+chG6V0mHa53CSrUDce6K6bcAXSuZMSBuPT31ZeYxjcMDjg3ME+aSGCIBp0sFyuSyu37jBZmZm3AjRWLh7C3KUUR21obYko6KHDNjJ0w+DeivAYxyDA55+kD0TYvfUfEn2K8QUS/0v5LZKcJIxdaOX7gZtR55u4NIhFu3T07bQKrWgfB24DjzK4q+70y1Vj4/Vb/SegDNE8sVdd6dbuY6Uf5YrlaHp6enFIdfdaUEua7WatIWoUNQJTK2Cg3pM3cB19UM+sb9x192b4WMx191bvbd9y/gwcDKTtepPTu3i80cS9G+tCv8bWP30lw6xaHH5N/AD8LaaM6fRgQZAKj7/tCrSSXSd/gj1FRbfO0SlsoHXagPqENBRf5i6CHxpGAbtGE36I0zEoD4LW6bSzz+tagVflP20JKU7qZNu58Q7JuikTopO/wowAIbnEoGllfXqAAAAAElFTkSuQmCC"

/***/ }),

/***/ 1124:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(581);


/***/ }),

/***/ 119:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAABDCAYAAAB6K+4GAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkFDOEI1QjZDREM4RDExRTZCNERCQUJERjUzQzQyM0Y5IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkFDOEI1QjZEREM4RDExRTZCNERCQUJERjUzQzQyM0Y5Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QUM4QjVCNkFEQzhEMTFFNkI0REJBQkRGNTNDNDIzRjkiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QUM4QjVCNkJEQzhEMTFFNkI0REJBQkRGNTNDNDIzRjkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz78jmuYAAAEA0lEQVR42uyXT0gcVxzHvzO6azaKRuNS/xS1boO0hoQ0ZWLNEi9dFelSaLykNhCK1OgxBEKITZNCSUhbr+JgLgn2EGih1LYH8VBRrGsretCQQ1xCuhshsWw3G10nm9383vTN8hx3Zwf0kIA/+O7M+828z/vN7/3e7DwplUpBkiSINjQ0pNChm+QjVXN3iDRGGu7p6QmI90sihDoX02GQ9Cms7QdSL8GimyAcwEZSYM9YND4GkgXnYC5AXl4eSkpKjKbC+/wfiaqqzDGTa+i2tjbU1tZidHQU4XDYcB8zIunOBfB4PDogmUwiFouJl7oNiE/0lpWVweFwpNsFBQVobm7Wz+fm5hCNRsXbfQbEmEa43W50dnbC7/frOWDW1NQEl8uFSCSC+fl5c5DVstnDQo3H4ygvL4fX60VVVRUaGhr0axMTE/rjmE0WCkm39fV1jI+PgyWcdW5tbdX9S0tLWFlZyZSukAEZ2+QNhTA7O6ufO51OrK2tIRAIZMv5mAEZNl9hz768vKyfT05OQtO0bJBhsWJHzOXO/GxmWI6ylT9VbJeY2F5eymljA1gAArxPOrHgi8nHFxdsLEDflgW47VfBdk3GDtgu5JWHsGITxV/CKilI0riC3KdsuV8sNjovJo2kchu7p3jTIhMAMyn7NpMGCZARm52fiBGlISTFJqCPlEdaFHyKAVFtAP4gsQVbaopGNSBBU4dHpITQ3iA18MiHTfcGDYgmOkkOkp+U5L7LHNCSIUItEyRG8vBOV/jzO0l7SPesIObHWSDtJckC8OssuQpaJfa2UEuNpmhTmRKbbYrPkQpI0xazptgpNs2q/He+7HdkAZr++RSe7CB/HI2fq3oOTLb7v7MLeb0gUrYLX/x19F06eEkVpA0S+x4dU9//O5ITQp3ZJ/R10pEM7ATpFulLgoW3QKgzO79BOm/jCVZJHxNoypyTr2wCmO0n/UYDN6YhvNGfq2eLuxNdNRchS/oWhr1PhsRILrEtnhWgvvAQTtVcwAn3SZQ63jDcxymAD2X6cVLDb7mBlPJxurafEijhz9VfsaqFxcufsEjeIhWlt1Gut9HnGdBHNqy94gyqXPWIJSK488+AeYzD+WzHJnreKT6Gw/tOoL7oIL65+xmcsgsdlZ/r1+48/B7PEv9tSTKDPBY9E49/xAf7P8KbrgM4W/8tnqc2kC85sRidxsy/v2ecbpl/i6X3qFoyjsH757H24inqChtxoOg93Tfy4Fq2lC3IVDDso+4X0ftkI4SbwX7Qf6Pe/jk8aE6maD9JQp0smKdZKWtHxZ46jD5SkUwlMwGmKAivWPZXeNXaNbZhaibIolj2V0nf2QSwtdPBADu/ii3eJ5WkuNX75KUAAwCjiXs3gqg6IQAAAABJRU5ErkJggg=="

/***/ }),

/***/ 324:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "select-icon-hover.svg";

/***/ }),

/***/ 549:
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),

/***/ 578:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAA9CAYAAADvaTpkAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjQzRTVDRDcyNTdERTExRTY5RDRFRTg2ODgwQkRCNzg1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjQzRTVDRDczNTdERTExRTY5RDRFRTg2ODgwQkRCNzg1Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDNFNUNENzA1N0RFMTFFNjlENEVFODY4ODBCREI3ODUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NDNFNUNENzE1N0RFMTFFNjlENEVFODY4ODBCREI3ODUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6GL4O8AAAFYklEQVR42txaW4hVVRjeZzyTl6ZGy5KO000rwmJoSLtxIgjnIZiChFJLGsanIuYpTcSHXnrQLkJIDxoyTKR0oQkKJkQiRNQpysDREMtu00yYDWnOqFjT9H317drzzzqePWfW3mfbDz9r73X7/2/9/7qv3OjoaOCbBgYGbkGwGtwMLoTR4J3gFwuFwiHfMnO+gQDEYwg6wBeVyHIO3AYw2zMLBCCaEPScB0QUzF0A84Uv2TWeLbw+BohAedb7FFzj0RpXIVhsoreBF4m3mbTFKpM5i7SY+obBT8F9PiPzW3FR2S2ZAYJWnQd+F5+bTdJuADgV/uh7t8mzmWVZR1WBQIGVCHrBSzhwmOSPHUVsXE5le1VX+kAg+HkEW8EzHMlfgbc44rcozRLr2Ko60wMCge0I1jmShsCbwEW40gmbqLii8gw5yq9T3cnPIxDUiICdt9YkvQ5eBWWPx6znCgQvgZ8wSb+DF6KeA0lb5FUHiGcguDUuCFnnOMsQvEmqlYzkXAuteL9cYwwwKLSxUt9G2ZcdihclKzGLPGn+fwKv8TANrFFd55PlBwhaaIZjAtuIFh2eLArVYa3aIpneLXIveHrk/0+wzxXsdtUZ0nTJ9A7kHvO/Hy054AuF6tpfRqYXILeZ/72Bf9pbRqYXIDeb/94EgPSWkTk5IOh0UxHYhd2RBIDYOudJtjeLLADnTdyXCQCxdeYl2xuQO81/HzrnL75RqM6+MrInBeQ+898TJEc9ZWRXBgQ+OsWxhd2VIJBdji3xFB8WYYvMNnE7EwRi654dxypxgDxu/g/Dl48khUJ1Hy6jw8SAwKSXIVhmot8MkicrY6l0qdgi7WYry7VQRwpAOsy662LpMvEdIlrgSk1Q9ZHo92D6JSkAofwuBA9Hok6Cb4L8nydqkRcMCCLeEKRHGyQzpHrpFN+10BoPImg10V1ojU/SQiFZXSa6VbqVB4KMNyLoNNGnHXvrNGiVZEepUzqWBoIMcxB0g2eZfGvRQt+ljUIy15po6tYtXccDQUKtTHmDKditc6hq0SbpECXq2AWd8y6LrHbsyDgxrUDLjFYLhWSvcEyS1PXZMcMvkHEZ8C24Lupp4LtR0Q9BBgg6XoNgX/DfVR6Jp5XXc9UcWuRpA4KtsDwrIGQZ6rLcDMl10j3I9ff352SNayMZ3kbBpUEGCZZ5C8GjkajvaRVapMmAIL0SZJesbtS9iUCa7e5PvphV2ufYRTYTiD3L3VHNUSrmKLbDRBcJpLHM2VIWyerYSCANJvLgBQDE6tjAmXHETIzPYWTgVfKeLA2/kbmkqAkySiMcfvcEpc9YOSnydupz8AGdO30DgH8krDAbmAeCC+T6t4MXmslwjKsRCK8K3g/G38qWIl6NcTF3VGN4P/gYmBsenkv9JuasS8BnVI6n63lNYpeKuaLgBo4LwLkaSueDrwvG34qVInb+h8IlSqsWZ5cEFxbx7r4dHtL571ZX6y363gNytbqMKj+kUetD8Bvhiadzz64DMb65ukMzP/30VvDMlJU+oRGK/ZMviT4FH4LyI7EPH0p0woL2AqEfN6gDzpGvzwrcDwhcxJ3fr+pbxzSw/Bjpf19P5CIpiYdn0Q5do6Mc0rCOeP4eCHyPfLkkngJWg2qC/wnlPblTvSasU5pXBuE6Z0vknYbgcs0bHO75nutkJoCAXgM/YhQmkLOR4xwOAtPEUXrHbJSqCuSoIy5UemYFZavWR/ieZLCCcoMqmw0gml3btJKOS8zb5usu0tuoBYU+QMDnfOdiZGeelSqTveEXivHxGZ/GfmSObaIrVaYtUt7sT4gYta4O/rlanhvZ2/QAQF8S8v4SYAC8LMkGesH3IgAAAABJRU5ErkJggg=="

/***/ }),

/***/ 581:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(949);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1117)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js?{\"sourceMap\":false}!../node_modules/postcss-loader/index.js!../node_modules/less-loader/index.js!./styles.less", function() {
			var newContent = require("!!../node_modules/css-loader/index.js?{\"sourceMap\":false}!../node_modules/postcss-loader/index.js!../node_modules/less-loader/index.js!./styles.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 948:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(549)();
// imports


// module
exports.push([module.i, ".mat-elevation-z0{box-shadow:0 0 0 0 rgba(0,0,0,.2),0 0 0 0 rgba(0,0,0,.14),0 0 0 0 rgba(0,0,0,.12)}.mat-elevation-z1{box-shadow:0 2px 1px -1px rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 1px 3px 0 rgba(0,0,0,.12)}.mat-elevation-z2{box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12)}.mat-elevation-z3{box-shadow:0 3px 3px -2px rgba(0,0,0,.2),0 3px 4px 0 rgba(0,0,0,.14),0 1px 8px 0 rgba(0,0,0,.12)}.mat-elevation-z4{box-shadow:0 2px 4px -1px rgba(0,0,0,.2),0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12)}.mat-elevation-z5{box-shadow:0 3px 5px -1px rgba(0,0,0,.2),0 5px 8px 0 rgba(0,0,0,.14),0 1px 14px 0 rgba(0,0,0,.12)}.mat-elevation-z6{box-shadow:0 3px 5px -1px rgba(0,0,0,.2),0 6px 10px 0 rgba(0,0,0,.14),0 1px 18px 0 rgba(0,0,0,.12)}.mat-elevation-z7{box-shadow:0 4px 5px -2px rgba(0,0,0,.2),0 7px 10px 1px rgba(0,0,0,.14),0 2px 16px 1px rgba(0,0,0,.12)}.mat-elevation-z8{box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}.mat-elevation-z9{box-shadow:0 5px 6px -3px rgba(0,0,0,.2),0 9px 12px 1px rgba(0,0,0,.14),0 3px 16px 2px rgba(0,0,0,.12)}.mat-elevation-z10{box-shadow:0 6px 6px -3px rgba(0,0,0,.2),0 10px 14px 1px rgba(0,0,0,.14),0 4px 18px 3px rgba(0,0,0,.12)}.mat-elevation-z11{box-shadow:0 6px 7px -4px rgba(0,0,0,.2),0 11px 15px 1px rgba(0,0,0,.14),0 4px 20px 3px rgba(0,0,0,.12)}.mat-elevation-z12{box-shadow:0 7px 8px -4px rgba(0,0,0,.2),0 12px 17px 2px rgba(0,0,0,.14),0 5px 22px 4px rgba(0,0,0,.12)}.mat-elevation-z13{box-shadow:0 7px 8px -4px rgba(0,0,0,.2),0 13px 19px 2px rgba(0,0,0,.14),0 5px 24px 4px rgba(0,0,0,.12)}.mat-elevation-z14{box-shadow:0 7px 9px -4px rgba(0,0,0,.2),0 14px 21px 2px rgba(0,0,0,.14),0 5px 26px 4px rgba(0,0,0,.12)}.mat-elevation-z15{box-shadow:0 8px 9px -5px rgba(0,0,0,.2),0 15px 22px 2px rgba(0,0,0,.14),0 6px 28px 5px rgba(0,0,0,.12)}.mat-elevation-z16{box-shadow:0 8px 10px -5px rgba(0,0,0,.2),0 16px 24px 2px rgba(0,0,0,.14),0 6px 30px 5px rgba(0,0,0,.12)}.mat-elevation-z17{box-shadow:0 8px 11px -5px rgba(0,0,0,.2),0 17px 26px 2px rgba(0,0,0,.14),0 6px 32px 5px rgba(0,0,0,.12)}.mat-elevation-z18{box-shadow:0 9px 11px -5px rgba(0,0,0,.2),0 18px 28px 2px rgba(0,0,0,.14),0 7px 34px 6px rgba(0,0,0,.12)}.mat-elevation-z19{box-shadow:0 9px 12px -6px rgba(0,0,0,.2),0 19px 29px 2px rgba(0,0,0,.14),0 7px 36px 6px rgba(0,0,0,.12)}.mat-elevation-z20{box-shadow:0 10px 13px -6px rgba(0,0,0,.2),0 20px 31px 3px rgba(0,0,0,.14),0 8px 38px 7px rgba(0,0,0,.12)}.mat-elevation-z21{box-shadow:0 10px 13px -6px rgba(0,0,0,.2),0 21px 33px 3px rgba(0,0,0,.14),0 8px 40px 7px rgba(0,0,0,.12)}.mat-elevation-z22{box-shadow:0 10px 14px -6px rgba(0,0,0,.2),0 22px 35px 3px rgba(0,0,0,.14),0 8px 42px 7px rgba(0,0,0,.12)}.mat-elevation-z23{box-shadow:0 11px 14px -7px rgba(0,0,0,.2),0 23px 36px 3px rgba(0,0,0,.14),0 9px 44px 8px rgba(0,0,0,.12)}.mat-elevation-z24{box-shadow:0 11px 15px -7px rgba(0,0,0,.2),0 24px 38px 3px rgba(0,0,0,.14),0 9px 46px 8px rgba(0,0,0,.12)}.mat-ripple{overflow:hidden}.mat-ripple.mat-ripple-unbounded{overflow:visible}.mat-ripple-element{position:absolute;border-radius:50%;pointer-events:none;background-color:rgba(0,0,0,.1);transition:opacity,transform 0s cubic-bezier(0,0,.2,1);transform:scale(0)}.mat-option{white-space:nowrap;overflow-x:hidden;text-overflow:ellipsis;display:block;line-height:48px;height:48px;padding:0 16px;font-size:16px;font-family:Roboto,\"Helvetica Neue\",sans-serif;text-align:start;text-decoration:none;position:relative;cursor:pointer;outline:0}.mat-option[disabled]{cursor:default}.mat-option .mat-icon{margin-right:16px}[dir=rtl] .mat-option .mat-icon{margin-left:16px}.mat-option[aria-disabled=true]{cursor:default;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.mat-option-ripple{position:absolute;top:0;left:0;bottom:0;right:0}@media screen and (-ms-high-contrast:active){.mat-option-ripple{opacity:.5}}.cdk-visually-hidden{border:0;clip:rect(0 0 0 0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;text-transform:none;width:1px}.cdk-global-overlay-wrapper,.cdk-overlay-container{pointer-events:none;top:0;left:0;height:100%;width:100%}.cdk-overlay-container{position:fixed;z-index:1000}.cdk-global-overlay-wrapper{display:flex;position:absolute;z-index:1000}.cdk-overlay-pane{position:absolute;pointer-events:auto;box-sizing:border-box;z-index:1000}.cdk-overlay-backdrop{position:absolute;top:0;bottom:0;left:0;right:0;z-index:1000;pointer-events:auto;transition:opacity .4s cubic-bezier(.25,.8,.25,1);opacity:0}.cdk-overlay-backdrop.cdk-overlay-backdrop-showing{opacity:.48}.cdk-overlay-dark-backdrop{background:rgba(0,0,0,.6)}.cdk-overlay-transparent-backdrop{background:0 0}.mat-option.mat-active,.mat-option.mat-selected,.mat-option:focus:not(.mat-option-disabled),.mat-option:hover:not(.mat-option-disabled){background:rgba(0,0,0,.04)}.mat-option.mat-selected{color:#673ab7}.mat-option.mat-active{color:rgba(0,0,0,.87)}.mat-option.mat-option-disabled{color:rgba(0,0,0,.38)}.mat-pseudo-checkbox::after{color:#fafafa}.mat-pseudo-checkbox-checked,.mat-pseudo-checkbox-indeterminate{border:none}.mat-pseudo-checkbox-checked.mat-primary,.mat-pseudo-checkbox-indeterminate.mat-primary{background:#673ab7}.mat-pseudo-checkbox-checked.mat-accent,.mat-pseudo-checkbox-indeterminate.mat-accent{background:#ffc107}.mat-pseudo-checkbox-checked.mat-warn,.mat-pseudo-checkbox-indeterminate.mat-warn{background:#f44336}.mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled,.mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled{background:#b0b0b0}.mat-app-background{background-color:#fafafa}.mat-autocomplete-panel,.mat-autocomplete-panel .mat-option.mat-selected:not(.mat-active){background:#fff;color:rgba(0,0,0,.87)}.mat-button.mat-button-focus.mat-primary .mat-button-focus-overlay,.mat-fab.mat-button-focus.mat-primary .mat-button-focus-overlay,.mat-icon-button.mat-button-focus.mat-primary .mat-button-focus-overlay,.mat-mini-fab.mat-button-focus.mat-primary .mat-button-focus-overlay,.mat-raised-button.mat-button-focus.mat-primary .mat-button-focus-overlay{background-color:rgba(103,58,183,.12)}.mat-button.mat-button-focus.mat-accent .mat-button-focus-overlay,.mat-fab.mat-button-focus.mat-accent .mat-button-focus-overlay,.mat-icon-button.mat-button-focus.mat-accent .mat-button-focus-overlay,.mat-mini-fab.mat-button-focus.mat-accent .mat-button-focus-overlay,.mat-raised-button.mat-button-focus.mat-accent .mat-button-focus-overlay{background-color:rgba(255,215,64,.12)}.mat-button.mat-button-focus.mat-warn .mat-button-focus-overlay,.mat-fab.mat-button-focus.mat-warn .mat-button-focus-overlay,.mat-icon-button.mat-button-focus.mat-warn .mat-button-focus-overlay,.mat-mini-fab.mat-button-focus.mat-warn .mat-button-focus-overlay,.mat-raised-button.mat-button-focus.mat-warn .mat-button-focus-overlay{background-color:rgba(244,67,54,.12)}.mat-button,.mat-icon-button{background:0 0}.mat-button.mat-primary,.mat-icon-button.mat-primary{color:#673ab7}.mat-button.mat-accent,.mat-icon-button.mat-accent{color:#ffd740}.mat-button.mat-warn,.mat-icon-button.mat-warn{color:#f44336}.mat-button.mat-accent[disabled],.mat-button.mat-primary[disabled],.mat-button.mat-warn[disabled],.mat-button[disabled][disabled],.mat-icon-button.mat-accent[disabled],.mat-icon-button.mat-primary[disabled],.mat-icon-button.mat-warn[disabled],.mat-icon-button[disabled][disabled]{color:rgba(0,0,0,.38)}.mat-button:hover.mat-primary .mat-button-focus-overlay,.mat-icon-button:hover.mat-primary .mat-button-focus-overlay{background-color:rgba(103,58,183,.12)}.mat-button:hover.mat-accent .mat-button-focus-overlay,.mat-icon-button:hover.mat-accent .mat-button-focus-overlay{background-color:rgba(255,215,64,.12)}.mat-button:hover.mat-warn .mat-button-focus-overlay,.mat-icon-button:hover.mat-warn .mat-button-focus-overlay{background-color:rgba(244,67,54,.12)}.mat-fab,.mat-mini-fab,.mat-raised-button{color:rgba(0,0,0,.87);background-color:#fff}.mat-fab.mat-primary,.mat-mini-fab.mat-primary,.mat-raised-button.mat-primary{color:rgba(255,255,255,.87);background-color:#673ab7}.mat-fab.mat-accent,.mat-mini-fab.mat-accent,.mat-raised-button.mat-accent{color:rgba(0,0,0,.87);background-color:#ffd740}.mat-fab.mat-warn,.mat-mini-fab.mat-warn,.mat-raised-button.mat-warn{color:#fff;background-color:#f44336}.mat-fab.mat-accent[disabled],.mat-fab.mat-primary[disabled],.mat-fab.mat-warn[disabled],.mat-fab[disabled][disabled],.mat-mini-fab.mat-accent[disabled],.mat-mini-fab.mat-primary[disabled],.mat-mini-fab.mat-warn[disabled],.mat-mini-fab[disabled][disabled],.mat-raised-button.mat-accent[disabled],.mat-raised-button.mat-primary[disabled],.mat-raised-button.mat-warn[disabled],.mat-raised-button[disabled][disabled]{color:rgba(0,0,0,.38);background-color:rgba(0,0,0,.12)}.mat-fab,.mat-mini-fab{background-color:#ffd740;color:rgba(0,0,0,.87)}.mat-button-toggle{color:rgba(0,0,0,.38)}.mat-button-toggle-checked{background-color:#e0e0e0;color:#000}.mat-button-toggle-disabled{background-color:#eee;color:rgba(0,0,0,.38)}.mat-button-toggle-disabled.mat-button-toggle-checked{background-color:#bdbdbd}.mat-card{background:#fff;color:#000}.mat-card-subtitle{color:rgba(0,0,0,.54)}.mat-checkbox-frame{border-color:rgba(0,0,0,.54)}.mat-checkbox-checkmark{fill:#fafafa}.mat-checkbox-checkmark-path{stroke:#fafafa!important}.mat-checkbox-mixedmark{background-color:#fafafa}.mat-checkbox-checked.mat-primary .mat-checkbox-background,.mat-checkbox-indeterminate.mat-primary .mat-checkbox-background{background-color:#673ab7}.mat-checkbox-checked.mat-accent .mat-checkbox-background,.mat-checkbox-indeterminate.mat-accent .mat-checkbox-background{background-color:#ffc107}.mat-checkbox-checked.mat-warn .mat-checkbox-background,.mat-checkbox-indeterminate.mat-warn .mat-checkbox-background{background-color:#f44336}.mat-checkbox-disabled.mat-checkbox-checked .mat-checkbox-background,.mat-checkbox-disabled.mat-checkbox-indeterminate .mat-checkbox-background{background-color:#b0b0b0}.mat-checkbox-disabled:not(.mat-checkbox-checked) .mat-checkbox-frame{border-color:#b0b0b0}.mat-checkbox:not(.mat-checkbox-disabled).mat-primary .mat-checkbox-ripple .mat-ripple-element{background-color:rgba(103,58,183,.26)}.mat-checkbox:not(.mat-checkbox-disabled).mat-accent .mat-checkbox-ripple .mat-ripple-element{background-color:rgba(255,215,64,.26)}.mat-checkbox:not(.mat-checkbox-disabled).mat-warn .mat-checkbox-ripple .mat-ripple-element{background-color:rgba(244,67,54,.26)}.mat-chip:not(.mat-basic-chip){background-color:#e0e0e0;color:rgba(0,0,0,.87)}.mat-chip.mat-chip-selected:not(.mat-basic-chip){background-color:grey;color:rgba(255,255,255,.87)}.mat-chip.mat-chip-selected:not(.mat-basic-chip).mat-primary{background-color:#673ab7;color:rgba(255,255,255,.87)}.mat-chip.mat-chip-selected:not(.mat-basic-chip).mat-accent{background-color:#ffc107;color:rgba(0,0,0,.87)}.mat-chip.mat-chip-selected:not(.mat-basic-chip).mat-warn{background-color:#f44336;color:#fff}.mat-dialog-container{background:#fff}.mat-icon.mat-primary{color:#673ab7}.mat-icon.mat-accent{color:#ffd740}.mat-icon.mat-warn{color:#f44336}.mat-input-placeholder{color:rgba(0,0,0,.38)}.mat-input-placeholder.mat-focused{color:#673ab7}.mat-input-placeholder.mat-focused.mat-accent{color:#ffd740}.mat-input-placeholder.mat-focused.mat-warn{color:#f44336}.mat-input-element:disabled{color:rgba(0,0,0,.38)}.mat-input-placeholder.mat-float.mat-focused .mat-placeholder-required,input.mat-input-element:-webkit-autofill+.mat-input-placeholder .mat-placeholder-required{color:#ffd740}.mat-input-underline{border-color:rgba(0,0,0,.12)}.mat-input-underline .mat-input-ripple{background-color:#673ab7}.mat-input-underline .mat-input-ripple.mat-accent{background-color:#ffd740}.mat-input-underline .mat-input-ripple.mat-warn{background-color:#f44336}.mat-list .mat-list-item,.mat-nav-list .mat-list-item{color:#000}.mat-list .mat-subheader,.mat-nav-list .mat-subheader{color:rgba(0,0,0,.54)}.mat-divider{border-top-color:rgba(0,0,0,.12)}.mat-nav-list .mat-list-item-content.mat-list-item-focus,.mat-nav-list .mat-list-item-content:hover{background:rgba(0,0,0,.04)}.mat-menu-content{background:#fff}.mat-menu-item{background:0 0;color:rgba(0,0,0,.87)}.mat-menu-item[disabled]{color:rgba(0,0,0,.38)}.mat-menu-item .mat-icon{color:rgba(0,0,0,.54);vertical-align:middle}.mat-menu-item:focus:not([disabled]),.mat-menu-item:hover:not([disabled]){background:rgba(0,0,0,.04)}.mat-progress-bar-background{background:url(data:image/svg+xml;charset=UTF-8,%3Csvg%20version%3D%271.1%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20xmlns%3Axlink%3D%27http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%27%20x%3D%270px%27%20y%3D%270px%27%20enable-background%3D%27new%200%200%205%202%27%20xml%3Aspace%3D%27preserve%27%20viewBox%3D%270%200%205%202%27%20preserveAspectRatio%3D%27none%20slice%27%3E%3Ccircle%20cx%3D%271%27%20cy%3D%271%27%20r%3D%271%27%20fill%3D%27%23d1c4e9%27%2F%3E%3C%2Fsvg%3E)}.mat-progress-bar-buffer{background-color:#d1c4e9}.mat-progress-bar-fill::after{background-color:#5e35b1}.mat-progress-bar.mat-accent .mat-progress-bar-background{background:url(data:image/svg+xml;charset=UTF-8,%3Csvg%20version%3D%271.1%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20xmlns%3Axlink%3D%27http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%27%20x%3D%270px%27%20y%3D%270px%27%20enable-background%3D%27new%200%200%205%202%27%20xml%3Aspace%3D%27preserve%27%20viewBox%3D%270%200%205%202%27%20preserveAspectRatio%3D%27none%20slice%27%3E%3Ccircle%20cx%3D%271%27%20cy%3D%271%27%20r%3D%271%27%20fill%3D%27%23ffecb3%27%2F%3E%3C%2Fsvg%3E)}.mat-progress-bar.mat-accent .mat-progress-bar-buffer{background-color:#ffecb3}.mat-progress-bar.mat-accent .mat-progress-bar-fill::after{background-color:#ffb300}.mat-progress-bar.mat-warn .mat-progress-bar-background{background:url(data:image/svg+xml;charset=UTF-8,%3Csvg%20version%3D%271.1%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20xmlns%3Axlink%3D%27http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%27%20x%3D%270px%27%20y%3D%270px%27%20enable-background%3D%27new%200%200%205%202%27%20xml%3Aspace%3D%27preserve%27%20viewBox%3D%270%200%205%202%27%20preserveAspectRatio%3D%27none%20slice%27%3E%3Ccircle%20cx%3D%271%27%20cy%3D%271%27%20r%3D%271%27%20fill%3D%27%23ffcdd2%27%2F%3E%3C%2Fsvg%3E)}.mat-progress-bar.mat-warn .mat-progress-bar-buffer{background-color:#ffcdd2}.mat-progress-bar.mat-warn .mat-progress-bar-fill::after{background-color:#e53935}.mat-progress-circle path,.mat-progress-spinner path,.mat-spinner path{stroke:#5e35b1}.mat-progress-circle.mat-accent path,.mat-progress-spinner.mat-accent path,.mat-spinner.mat-accent path{stroke:#ffb300}.mat-progress-circle.mat-warn path,.mat-progress-spinner.mat-warn path,.mat-spinner.mat-warn path{stroke:#e53935}.mat-radio-outer-circle{border-color:rgba(0,0,0,.54)}.mat-radio-checked .mat-radio-outer-circle{border-color:#ffd740}.mat-radio-disabled .mat-radio-outer-circle{border-color:rgba(0,0,0,.38)}.mat-radio-inner-circle{background-color:#ffd740}.mat-radio-disabled .mat-radio-inner-circle{background-color:rgba(0,0,0,.38)}.mat-radio-ripple .mat-ripple-element{background-color:rgba(255,215,64,.26)}.mat-radio-disabled .mat-radio-ripple .mat-ripple-element{background-color:rgba(0,0,0,.38)}.mat-select-trigger{color:rgba(0,0,0,.38)}.mat-select:focus:not(.mat-select-disabled) .mat-select-trigger{color:#673ab7}.mat-select.ng-invalid.ng-touched:not(.mat-select-disabled) .mat-select-trigger{color:#f44336}.mat-select-underline{background-color:rgba(0,0,0,.12)}.mat-select:focus:not(.mat-select-disabled) .mat-select-underline{background-color:#673ab7}.mat-select.ng-invalid.ng-touched:not(.mat-select-disabled) .mat-select-underline{background-color:#f44336}.mat-select-arrow{color:rgba(0,0,0,.38)}.mat-select:focus:not(.mat-select-disabled) .mat-select-arrow{color:#673ab7}.mat-select.ng-invalid.ng-touched:not(.mat-select-disabled) .mat-select-arrow{color:#f44336}.mat-select-content,.mat-select-panel-done-animating{background:#fff}.mat-select-value{color:rgba(0,0,0,.87)}.mat-select-disabled .mat-select-value{color:rgba(0,0,0,.38)}.mat-sidenav,.mat-slider-thumb-label-text,.mat-toolbar{color:rgba(0,0,0,.87)}.mat-sidenav-container{background-color:#fafafa;color:rgba(0,0,0,.87)}.mat-sidenav,.mat-sidenav.mat-sidenav-push{background-color:#fff}.mat-sidenav-backdrop.mat-sidenav-shown{background-color:rgba(0,0,0,.6)}.mat-slide-toggle.mat-checked:not(.mat-disabled) .mat-slide-toggle-thumb{background-color:#ffc107}.mat-slide-toggle.mat-checked:not(.mat-disabled) .mat-slide-toggle-bar{background-color:rgba(255,193,7,.5)}.mat-slide-toggle.mat-slide-toggle-focused:not(.mat-checked) .mat-ink-ripple{background-color:rgba(0,0,0,.12)}.mat-slide-toggle.mat-slide-toggle-focused .mat-ink-ripple{background-color:rgba(255,193,7,.26)}.mat-slide-toggle.mat-primary.mat-checked:not(.mat-disabled) .mat-slide-toggle-thumb{background-color:#673ab7}.mat-slide-toggle.mat-primary.mat-checked:not(.mat-disabled) .mat-slide-toggle-bar{background-color:rgba(103,58,183,.5)}.mat-slide-toggle.mat-primary.mat-slide-toggle-focused:not(.mat-checked) .mat-ink-ripple{background-color:rgba(0,0,0,.12)}.mat-slide-toggle.mat-primary.mat-slide-toggle-focused .mat-ink-ripple{background-color:rgba(103,58,183,.26)}.mat-slide-toggle.mat-warn.mat-checked:not(.mat-disabled) .mat-slide-toggle-thumb{background-color:#f44336}.mat-slide-toggle.mat-warn.mat-checked:not(.mat-disabled) .mat-slide-toggle-bar{background-color:rgba(244,67,54,.5)}.mat-slide-toggle.mat-warn.mat-slide-toggle-focused:not(.mat-checked) .mat-ink-ripple{background-color:rgba(0,0,0,.12)}.mat-slide-toggle.mat-warn.mat-slide-toggle-focused .mat-ink-ripple{background-color:rgba(244,67,54,.26)}.mat-disabled .mat-slide-toggle-thumb{background-color:#bdbdbd}.mat-disabled .mat-slide-toggle-bar{background-color:rgba(0,0,0,.1)}.mat-slide-toggle-thumb{background-color:#fafafa}.mat-slide-toggle-bar{background-color:rgba(0,0,0,.38)}.mat-slider-track-background{background-color:rgba(0,0,0,.26)}.mat-slider-thumb,.mat-slider-thumb-label,.mat-slider-track-fill{background-color:#ffd740}.mat-slider-active .mat-slider-track-background,.mat-slider:hover .mat-slider-track-background{background-color:rgba(0,0,0,.38)}.mat-slider-disabled .mat-slider-thumb,.mat-slider-disabled .mat-slider-track-background,.mat-slider-disabled .mat-slider-track-fill,.mat-slider-disabled:hover .mat-slider-track-background{background-color:rgba(0,0,0,.26)}.mat-slider-min-value.mat-slider-thumb-label-showing .mat-slider-thumb,.mat-slider-min-value.mat-slider-thumb-label-showing .mat-slider-thumb-label{background-color:#000}.mat-slider-min-value.mat-slider-thumb-label-showing.mat-slider-active .mat-slider-thumb,.mat-slider-min-value.mat-slider-thumb-label-showing.mat-slider-active .mat-slider-thumb-label{background-color:rgba(0,0,0,.26)}.mat-slider-min-value:not(.mat-slider-thumb-label-showing) .mat-slider-thumb{border-color:rgba(0,0,0,.26);background-color:transparent}.mat-slider-min-value:not(.mat-slider-thumb-label-showing).mat-slider-active .mat-slider-thumb,.mat-slider-min-value:not(.mat-slider-thumb-label-showing):hover .mat-slider-thumb{border-color:rgba(0,0,0,.38)}.mat-slider-min-value:not(.mat-slider-thumb-label-showing).mat-slider-active.mat-slider-disabled .mat-slider-thumb,.mat-slider-min-value:not(.mat-slider-thumb-label-showing):hover.mat-slider-disabled .mat-slider-thumb{border-color:rgba(0,0,0,.26)}.mat-tab-header,.mat-tab-nav-bar{border-bottom:1px solid #e0e0e0}.mat-tab-group-inverted-header .mat-tab-header,.mat-tab-group-inverted-header .mat-tab-nav-bar{border-top:1px solid #e0e0e0;border-bottom:none}.mat-tab-label:focus{background-color:rgba(209,196,233,.3)}.mat-ink-bar{background-color:#673ab7}.mat-toolbar{background:#f5f5f5}.mat-toolbar.mat-primary{background:#673ab7;color:rgba(255,255,255,.87)}.mat-toolbar.mat-accent{background:#ffd740;color:rgba(0,0,0,.87)}.mat-toolbar.mat-warn{background:#f44336;color:#fff}.mat-tooltip{background:rgba(97,97,97,.9)}", ""]);

// exports


/***/ }),

/***/ 949:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(549)();
// imports
exports.i(__webpack_require__(948), "");

// module
exports.push([module.i, "/* radius functions */\n.blur {\n  -webkit-filter: blur(20px);\n  -moz-filter: blur(20px);\n  -o-filter: blur(20px);\n  -ms-filter: blur(20px);\n  filter: blur(20px);\n}\nbody,\nhtml {\n  height: 100%;\n}\nbody {\n  padding-top: 80px;\n  background-color: #f4f4f4;\n}\n.sk-fading-circle {\n  margin: 100px auto;\n  width: 40px;\n  height: 40px;\n  position: relative;\n}\n.sk-fading-circle .sk-circle {\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  left: 0;\n  top: 0;\n}\n.sk-fading-circle .sk-circle:before {\n  content: '';\n  display: block;\n  margin: 0 auto;\n  width: 15%;\n  height: 15%;\n  background-color: #021523;\n  border-radius: 100%;\n  -webkit-animation: sk-circleFadeDelay 1.2s infinite ease-in-out both;\n  animation: sk-circleFadeDelay 1.2s infinite ease-in-out both;\n}\n.sk-fading-circle .sk-circle2 {\n  -webkit-transform: rotate(30deg);\n  transform: rotate(30deg);\n}\n.sk-fading-circle .sk-circle3 {\n  -webkit-transform: rotate(60deg);\n  transform: rotate(60deg);\n}\n.sk-fading-circle .sk-circle4 {\n  -webkit-transform: rotate(90deg);\n  transform: rotate(90deg);\n}\n.sk-fading-circle .sk-circle5 {\n  -webkit-transform: rotate(120deg);\n  transform: rotate(120deg);\n}\n.sk-fading-circle .sk-circle6 {\n  -webkit-transform: rotate(150deg);\n  transform: rotate(150deg);\n}\n.sk-fading-circle .sk-circle7 {\n  -webkit-transform: rotate(180deg);\n  transform: rotate(180deg);\n}\n.sk-fading-circle .sk-circle8 {\n  -webkit-transform: rotate(210deg);\n  transform: rotate(210deg);\n}\n.sk-fading-circle .sk-circle9 {\n  -webkit-transform: rotate(240deg);\n  transform: rotate(240deg);\n}\n.sk-fading-circle .sk-circle10 {\n  -webkit-transform: rotate(270deg);\n  transform: rotate(270deg);\n}\n.sk-fading-circle .sk-circle11 {\n  -webkit-transform: rotate(300deg);\n  transform: rotate(300deg);\n}\n.sk-fading-circle .sk-circle12 {\n  -webkit-transform: rotate(330deg);\n  transform: rotate(330deg);\n}\n.sk-fading-circle .sk-circle2:before {\n  -webkit-animation-delay: -1.1s;\n  animation-delay: -1.1s;\n}\n.sk-fading-circle .sk-circle3:before {\n  -webkit-animation-delay: -1s;\n  animation-delay: -1s;\n}\n.sk-fading-circle .sk-circle4:before {\n  -webkit-animation-delay: -0.9s;\n  animation-delay: -0.9s;\n}\n.sk-fading-circle .sk-circle5:before {\n  -webkit-animation-delay: -0.8s;\n  animation-delay: -0.8s;\n}\n.sk-fading-circle .sk-circle6:before {\n  -webkit-animation-delay: -0.7s;\n  animation-delay: -0.7s;\n}\n.sk-fading-circle .sk-circle7:before {\n  -webkit-animation-delay: -0.6s;\n  animation-delay: -0.6s;\n}\n.sk-fading-circle .sk-circle8:before {\n  -webkit-animation-delay: -0.5s;\n  animation-delay: -0.5s;\n}\n.sk-fading-circle .sk-circle9:before {\n  -webkit-animation-delay: -0.4s;\n  animation-delay: -0.4s;\n}\n.sk-fading-circle .sk-circle10:before {\n  -webkit-animation-delay: -0.3s;\n  animation-delay: -0.3s;\n}\n.sk-fading-circle .sk-circle11:before {\n  -webkit-animation-delay: -0.2s;\n  animation-delay: -0.2s;\n}\n.sk-fading-circle .sk-circle12:before {\n  -webkit-animation-delay: -0.1s;\n  animation-delay: -0.1s;\n}\n@-webkit-keyframes sk-circleFadeDelay {\n  0%,\n  39%,\n  100% {\n    opacity: 0;\n  }\n  40% {\n    opacity: 1;\n  }\n}\n@keyframes sk-circleFadeDelay {\n  0%,\n  39%,\n  100% {\n    opacity: 0;\n  }\n  40% {\n    opacity: 1;\n  }\n}\n.alert.alert-success.alert-dismissible {\n  margin-top: 20px;\n}\n.border-red {\n  border: 2px solid #C70A0A;\n}\n.border-purple {\n  border: 1px solid #7724f6;\n}\n#activities .empty-text {\n  display: block;\n}\n.dz-error .dz-error-mark {\n  z-index: 501;\n}\n.dz-error .dz-error-message {\n  top: 14px !important;\n  left: -17px !important;\n}\n.dz-success .dz-error-mark {\n  display: none !important;\n}\n.new-activity {\n  position: relative;\n  z-index: 10000;\n  margin: 11px auto;\n  text-align: center;\n}\n.new-activity button {\n  position: fixed;\n  color: #7724F6;\n  text-align: center;\n  background-color: #ffffff;\n  border-radius: 5px;\n  -webkit-border-radius: 5px;\n  -moz-border-radius: 5px;\n  -ms-border-radius: 5px;\n  -o-border-radius: 5px;\n  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);\n  -webkit-transform: translateX(-50%);\n  transform: translateX(-50%);\n}\n#mainframe {\n  position: relative;\n  min-height: 100%;\n  font-family: 'Open Sans', sans-serif;\n}\n#wrap {\n  position: relative;\n  padding-bottom: 300px;\n  background-color: #f4f4f4;\n}\ninput.form-control:focus,\ntextarea.form-control:focus,\nselect.form-control:focus {\n  border-color: #7724F6;\n  box-shadow: none;\n  font-family: 'Open Sans', sans-serif;\n}\na {\n  cursor: pointer;\n  font-family: 'Open Sans', sans-serif;\n}\na:hover {\n  text-decoration: none;\n  color: #7724F6;\n}\na:focus {\n  outline: none;\n  outline-offset: 0;\n}\n.btn {\n  outline: 0;\n  border-radius: 7px;\n  -webkit-border-radius: 7px;\n  -moz-border-radius: 7px;\n  -ms-border-radius: 7px;\n  -o-border-radius: 7px;\n}\n.btn:hover,\n.btn:focus {\n  outline: 0;\n}\nh1,\nh2,\nh3,\nh4,\nh5,\nh5,\np,\nselect,\nbutton,\ninput {\n  font-family: 'Open Sans', sans-serif;\n}\ntextarea {\n  resize: none;\n  font-family: 'Open Sans', sans-serif;\n}\nselect.form-control {\n  color: #A4A4A4;\n}\ninput.form-control::-webkit-input-placeholder {\n  color: #A4A4A4;\n  font-family: 'Open Sans', sans-serif;\n}\n:-moz-placeholder {\n  /* Firefox 18- */\n  color: #A4A4A4;\n  font-family: 'Open Sans', sans-serif;\n}\n::-moz-placeholder {\n  /* Firefox 19+ */\n  color: #A4A4A4;\n  font-family: 'Open Sans', sans-serif;\n}\n:-ms-input-placeholder {\n  color: #A4A4A4;\n  font-family: 'Open Sans', sans-serif;\n}\n.nav .open > a,\n.nav .open > a:focus,\n.nav .open > a:hover {\n  background-color: #021523;\n}\nheader {\n  background: #021523;\n}\nheader #line {\n  height: 4px;\n  background: red;\n  background: -webkit-linear-gradient(left, #ffa600, #de451b, #1b54cf, #00824c);\n  background: linear-gradient(to right, #ffa600, #de451b, #1b54cf, #00824c);\n}\nheader .navbar {\n  min-height: 81px;\n}\nheader .navbar-fixed-top .navbar-collapse {\n  max-height: 400px;\n}\nheader .navbar-default {\n  background: #061b28;\n  z-index: 10000;\n  border: 0;\n}\nheader .navbar-default .navbar-brand {\n  width: 150px;\n  display: block;\n  padding: 19px 30px 21px 20px;\n}\nheader .navbar-default .navbar-toggle {\n  margin-top: 19px;\n  background-color: transparent;\n  border: 0;\n}\nheader .navbar-default .navbar-toggle .icon-bar {\n  background-color: #ffffff;\n}\nheader .navbar-default .navbar-toggle i {\n  display: inline-block;\n  font-size: 36px;\n  margin-top: -11px;\n  color: #ffffff;\n  background-color: transparent;\n}\nheader .navbar-default .navbar-toggle i:hover,\nheader .navbar-default .navbar-toggle i:focus,\nheader .navbar-default .navbar-toggle i:active {\n  text-decoration: none;\n}\nheader .navbar-default .navbar-toggle:hover,\nheader .navbar-default .navbar-toggle:focus,\nheader .navbar-default .navbar-toggle:active {\n  background: transparent;\n}\nheader .navbar-default .navbar-collapse {\n  border-color: #4421AB;\n}\nheader .navbar-default .navbar-nav {\n  margin-top: 0;\n  margin-bottom: 0;\n}\nheader .navbar-default .navbar-nav figure {\n  height: 40px;\n  width: 40px;\n  overflow: hidden;\n}\nheader .navbar-default .navbar-nav figure img {\n  height: 40px;\n}\nheader .navbar-default .navbar-nav li {\n  display: inline-block;\n  vertical-align: top;\n}\nheader .navbar-default .navbar-nav li.block {\n  display: block;\n}\nheader .navbar-default .navbar-nav li a {\n  color: #E5E5E5;\n  font-weight: 700;\n  font-size: 16px;\n  padding: 25px 15px;\n}\nheader .navbar-default .navbar-nav li a i {\n  display: inline-block;\n  vertical-align: middle;\n  font-size: 30px;\n}\nheader .navbar-default .navbar-nav li a span {\n  padding-left: 7px;\n}\nheader .navbar-default .navbar-nav li a:focus {\n  outline: none;\n  color: #E5E5E5;\n}\nheader .navbar-default .navbar-nav .active a {\n  background-color: #061b28;\n  color: #E5E5E5;\n}\nheader .navbar-default .navbar-nav .active a:hover,\nheader .navbar-default .navbar-nav .active a:focus {\n  background-color: #000000;\n  color: #E5E5E5;\n}\nheader .navbar-default .navbar-form {\n  border: 0;\n  box-shadow: none;\n}\nheader .navbar-default .navbar-right {\n  text-align: right;\n}\nheader .navbar-default .navbar-right li {\n  border-bottom: 0;\n  text-align: center;\n}\nheader .navbar-default .navbar-right li a {\n  padding-top: 25px;\n  padding-bottom: 25px;\n}\nheader .navbar-default .navbar-right li a.mobile-user {\n  padding: 21px 15px 16px 0;\n}\nheader .navbar-default .navbar-right li a.mobile-user p {\n  width: 40px;\n  height: 40px;\n  line-height: 34px;\n  vertical-align: middle;\n  margin: 0 5px;\n  font-size: 14px;\n  font-weight: 600;\n}\nheader .navbar-default .navbar-right li:last-child .user {\n  display: block;\n  padding: 19px 5px 19px 15px;\n  position: relative;\n}\nheader .navbar-default .navbar-right li:last-child .user .navbar-brand {\n  width: 120px;\n  padding: 0 10px 0 0;\n}\nheader .navbar-default .navbar-right li:last-child .user figure {\n  background-color: transparent;\n  width: 40px;\n  height: 40px;\n  overflow: hidden;\n  float: left;\n  margin: 0 10px 0 0;\n}\nheader .navbar-default .navbar-right li:last-child .user figure img {\n  height: 40px;\n}\nheader .navbar-default .navbar-right li:last-child .user p {\n  float: left;\n  width: 40px;\n  height: 40px;\n  line-height: 34px;\n  vertical-align: middle;\n  margin: 0 5px;\n  font-size: 14px;\n  font-weight: 600;\n}\nheader .navbar-default .navbar-right li:last-child .user span.name {\n  float: left;\n  padding: 9px 0 4px 8px;\n  display: inline-block;\n  text-align: left;\n  font-size: 18px;\n}\nheader .navbar-default .navbar-right li:last-child .user i {\n  display: inline-block;\n  width: 25px;\n  height: 25px;\n  position: absolute;\n  top: 27px;\n  right: 18px;\n}\nheader .navbar-default .navbar-right li:last-child .user i.menu-hamburger {\n  background: url(" + __webpack_require__(957) + ") no-repeat center center;\n}\nheader .navbar-default .navbar-right li:last-child .user i.menu-hamburger:hover {\n  background: url(" + __webpack_require__(981) + ") no-repeat center center;\n}\nheader .navbar-default .navbar-right li:last-child .user i.menu-remove {\n  background: url(" + __webpack_require__(958) + ") no-repeat center center;\n}\nheader .navbar-default .navbar-right li:last-child .user i.menu-remove:hover {\n  background: url(" + __webpack_require__(982) + ") no-repeat center center;\n}\nheader .navbar-default .navbar-right li:last-child .user i.icon-remove-email {\n  font-size: 40px;\n  background: #021523;\n  line-height: 75px;\n  height: 75px;\n  width: 75px;\n  text-align: center;\n  right: 0;\n  top: 0;\n}\nheader .navbar-default .navbar-right li:last-child .user + div.popover {\n  position: relative;\n}\nheader .navbar-default .navbar-right li:last-child .user-menu {\n  background-color: #021523;\n  padding-left: 0;\n  text-align: left;\n  width: 100%;\n  top: 75px;\n}\nheader .navbar-default .navbar-right li:last-child .user-menu li {\n  border-left: 0;\n  text-align: left;\n  display: block;\n}\nheader .navbar-default .navbar-right li:last-child .user-menu li a {\n  display: block;\n  padding: 10px 20px;\n  font-size: 14px;\n  font-weight: 500;\n  color: #ffffff;\n}\nheader .navbar-default .navbar-right li:last-child .user-menu li a span {\n  margin-left: 10px;\n}\nheader .navbar-default .navbar-right li:last-child .user-menu li a i {\n  display: inline-block;\n  width: 30px;\n  height: 30px;\n  font-size: 30px;\n}\nheader .navbar-default .navbar-right li:last-child .user-menu li a i.mybucketlist-icon {\n  margin-right: 0;\n  background-size: 100%;\n  width: 25px;\n}\nheader .navbar-default .navbar-right li:last-child .user-menu li a i.settings-icon,\nheader .navbar-default .navbar-right li:last-child .user-menu li a i.add-goal {\n  width: 25px;\n}\nheader .navbar-default .navbar-right li:last-child .user-menu li a i.ideas-icon,\nheader .navbar-default .navbar-right li:last-child .user-menu li a i.activity-icon {\n  width: 25px !important;\n}\nheader .navbar-default .navbar-right li:last-child .user-menu li a i.icon-suggest-icon {\n  width: 27px;\n  height: 27px;\n  color: #e5e5e5;\n  margin: 0 0 0 -3px;\n}\nheader .navbar-default .navbar-right li:last-child .user-menu li a i.icon-goalfrined-icon {\n  margin: 0 -2px 0 -3px;\n}\nheader .navbar-default .navbar-right li:last-child .user-menu li a i span {\n  padding-left: 0;\n  margin-left: 0;\n}\nheader .navbar-default .navbar-right li:last-child .user-menu li a .icon-plus-icon {\n  font-size: 30px;\n}\nheader .navbar-default .navbar-right li:last-child .user-menu li a:hover,\nheader .navbar-default .navbar-right li:last-child .user-menu li a:focus {\n  text-decoration: none;\n  background-color: transparent;\n}\nheader .navbar-default .navbar-right li:last-child .user-menu li a:hover span,\nheader .navbar-default .navbar-right li:last-child .user-menu li a:focus span {\n  text-decoration: underline;\n}\nheader .navbar-default .navbar-right li:last-child .user-menu li a:hover i span,\nheader .navbar-default .navbar-right li:last-child .user-menu li a:focus i span {\n  text-decoration: none;\n}\nheader .navbar-default .navbar-right li:last-child .join-class {\n  min-width: 320px;\n  color: #e3e3e3;\n}\nheader .navbar-default .navbar-right li:last-child .popover {\n  padding: 0;\n  border-radius: 0;\n  border: 0;\n  outline: 0;\n  max-width: 100%;\n}\nheader .navbar-default .navbar-right li:last-child .sign-in-popover + div.popover {\n  top: 0 !important;\n  left: 0 !important;\n  position: relative;\n}\nheader .navbar-default .navbar-right li:last-child .popover-content {\n  padding: 0;\n}\nheader .navbar-default .navbar-right li:last-child .popover-content a {\n  font-size: 14px;\n}\nheader .mybucketlist-icon {\n  background: url(" + __webpack_require__(969) + ") no-repeat center center;\n}\nheader .settings-icon {\n  background: url(" + __webpack_require__(975) + ") no-repeat center center;\n  background-size: 95%;\n}\nheader .add-goal {\n  background: url(" + __webpack_require__(951) + ") no-repeat center center;\n  background-size: 109%;\n}\nheader .logout {\n  background: url(" + __webpack_require__(966) + ") no-repeat center center;\n  background-size: 100%;\n}\nheader .activity-icon {\n  width: 30px !important;\n  background: url(" + __webpack_require__(950) + ") no-repeat center center;\n  background-size: 100%;\n}\nheader .edit-note {\n  display: inline-block;\n  width: 30px !important;\n  height: 30px;\n  background: url(" + __webpack_require__(953) + ") no-repeat center center;\n  background-size: 100%;\n}\nheader .bell {\n  display: block;\n  width: 25px;\n  height: 41px;\n  background: url(" + __webpack_require__(578) + ") no-repeat center 11px;\n  background-size: 100%;\n}\nheader a.relative {\n  display: block;\n  padding: 15px 19px 21px !important;\n}\nheader #notification a.relative {\n  display: block;\n  padding: 15px 19px 21px !important;\n}\nheader #notification .bell {\n  display: block;\n  width: 25px;\n  height: 41px;\n  background: url(" + __webpack_require__(578) + ") no-repeat center 11px;\n  background-size: 100%;\n}\nheader #notification sup {\n  position: absolute;\n  top: 16px;\n  right: 10px;\n  padding: 3px 4px;\n  color: #ffffff;\n  background-color: #7724F6;\n  font-size: 12px;\n  line-height: 12px;\n  font-weight: 500;\n  height: 18px;\n  border-radius: 4px;\n  -webkit-border-radius: 4px;\n  -moz-border-radius: 4px;\n  -ms-border-radius: 4px;\n  -o-border-radius: 4px;\n  text-align: center;\n  vertical-align: middle;\n}\nheader #notification .no-note {\n  padding: 40px 0 0 0;\n}\nheader #notification .no-note span {\n  display: block;\n  width: 50px;\n  height: 60px;\n  background: url(" + __webpack_require__(971) + ") no-repeat center center;\n  margin: 0 auto;\n}\nheader #notification .no-note p {\n  color: #999999;\n  font-size: 14px;\n  line-height: 21px;\n  padding: 5px 0 30px;\n}\nheader #notification .close-icon {\n  top: 13px;\n  right: 13px;\n  display: none;\n}\nheader #notification ul.dropdown-menu {\n  position: absolute;\n  background-color: #ffffff;\n  border: 1px solid #e5e5e5;\n  min-width: 310px;\n  padding: 0;\n  border-top-left-radius: 0;\n  border-top-right-radius: 0;\n}\nheader #notification ul.dropdown-menu li {\n  width: 100%;\n  border-left: 0;\n  border-bottom: 1px solid #e5e5e5;\n  position: relative;\n  cursor: pointer;\n  float: none;\n}\nheader #notification ul.dropdown-menu li figure {\n  margin: 0;\n  height: 60px;\n  width: 60px;\n  text-align: center;\n}\nheader #notification ul.dropdown-menu li figure p {\n  height: 60px;\n  width: 60px;\n  line-height: 55px;\n  color: #ffffff;\n}\nheader #notification ul.dropdown-menu li:first-child {\n  padding: 6px 10px 5px;\n}\nheader #notification ul.dropdown-menu li:first-child h3,\nheader #notification ul.dropdown-menu li:first-child a {\n  font-size: 14px;\n  margin: 0;\n  line-height: 21px;\n}\nheader #notification ul.dropdown-menu li:first-child h3 {\n  font-weight: 600;\n}\nheader #notification ul.dropdown-menu li:first-child a {\n  display: inline-block;\n  font-weight: 400;\n  padding: 0 25px 0 5px !important;\n}\nheader #notification ul.dropdown-menu li:first-child a:hover {\n  text-decoration: none;\n  background-color: transparent;\n}\nheader #notification ul.dropdown-menu li:last-child {\n  float: none;\n  width: 100%;\n  right: 0;\n  border-bottom: 0 !important;\n}\nheader #notification ul.dropdown-menu li:last-child a {\n  padding: 10px 0;\n  font-size: 14px;\n  line-height: 21px;\n  font-weight: 400;\n}\nheader #notification ul.dropdown-menu li:last-child a:hover {\n  background-color: transparent;\n  color: #7724f6 !important;\n}\nheader #notification ul.dropdown-menu li.unread {\n  background: #f4f4f4;\n}\nheader #notification ul.dropdown-menu li ul {\n  padding-left: 0;\n  border-bottom: 1px solid #e5e5e5;\n}\nheader #notification ul.dropdown-menu li ul li {\n  display: inline-block;\n  padding: 10px 0;\n  border-bottom: 0;\n}\nheader #notification ul.dropdown-menu li ul li figure {\n  width: 60px;\n  height: 60px;\n  margin: 2px 10px 5px 0;\n}\nheader #notification ul.dropdown-menu li ul li figure img {\n  height: 60px;\n}\nheader #notification ul.dropdown-menu li ul li p {\n  margin-bottom: 0;\n  width: 99%;\n}\nheader #notification ul.dropdown-menu li ul li p span {\n  display: block;\n  white-space: normal;\n  word-break: break-word;\n  font-size: 14px;\n  line-height: 21px;\n  padding: 0 15px 0 0;\n}\nheader #notification ul.dropdown-menu li ul li p span a:not(.text-center) {\n  font-weight: 600;\n  padding: 0;\n  color: #666666;\n}\nheader #notification ul.dropdown-menu li ul li:first-child a {\n  padding: 0 !important;\n}\nheader #notification ul.dropdown-menu li ul:hover {\n  background: #e8e8e8;\n}\nheader #notification ul.dropdown-menu li ul:hover .close-icon {\n  display: block;\n}\nheader #notification .dropdown-menu {\n  left: -137px;\n}\nheader .open a.relative {\n  background-color: #000000;\n}\nheader .open a.relative:hover,\nheader .open a.relative:active,\nheader .open a.relative:focus {\n  background-color: #000000;\n}\n.icons {\n  display: inline-block;\n  width: 25px;\n  height: 30px;\n}\n.join-icon {\n  width: 30px;\n  background: url(" + __webpack_require__(962) + ") no-repeat center center;\n}\n.ideas-icon {\n  width: 30px !important;\n  background: url(" + __webpack_require__(959) + ") no-repeat center center;\n  background-size: 100%;\n}\n.mybuucketlist {\n  display: inline-block;\n  width: 23px !important;\n  height: 23px;\n  background: url(" + __webpack_require__(970) + ") no-repeat center center;\n}\nlabel {\n  color: #a4a4a4;\n}\n.divider {\n  height: 2px;\n}\n.arrow-left {\n  width: 0;\n  height: 0;\n  border-top: 10px solid transparent;\n  border-bottom: 10px solid transparent;\n  border-right: 10px solid #f4f4f4;\n}\n/* user image styles*/\n.no-image {\n  border: 2px solid #cecece;\n  text-align: center;\n  border-radius: 50%;\n  -webkit-border-radius: 50%;\n  -moz-border-radius: 50%;\n  -ms-border-radius: 50%;\n  -o-border-radius: 50%;\n  color: #ffffff;\n  width: 50px;\n  height: 50px;\n  line-height: 44px;\n}\nfigure.img-circle img {\n  width: 50px;\n  height: 50px;\n}\n/*end user image styles*/\n.user-no0 {\n  background: #93a0a9;\n  /* Old browsers */\n  /* FF3.6-15 */\n  background: -webkit-linear-gradient(left, #93a0a9 0%, #96a3ac 6%, #a8b4c2 23%, #abb7c5 29%, #aebcc9 32%, #aebecd 51%, #aabcca 62%, #a7b9c7 63%, #a8b9c9 64%, #a3b5c3 71%, #97a7b6 83%, #93a3b2 86%, #91a1ae 86%, #8b9ba8 91%, #8798a0 97%, #83949e 100%);\n  /* Chrome10-25,Safari5.1-6 */\n  background: linear-gradient(to right, #93a0a9 0%, #96a3ac 6%, #a8b4c2 23%, #abb7c5 29%, #aebcc9 32%, #aebecd 51%, #aabcca 62%, #a7b9c7 63%, #a8b9c9 64%, #a3b5c3 71%, #97a7b6 83%, #93a3b2 86%, #91a1ae 86%, #8b9ba8 91%, #8798a0 97%, #83949e 100%);\n  /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#93a0a9', endColorstr='#83949e', GradientType=1);\n}\n.user-no1 {\n  background: #475d50;\n  /* Old browsers */\n  /* FF3.6-15 */\n  background: -webkit-linear-gradient(left, #475d50 0%, #495e4d 9%, #4d5f4f 12%, #52614c 17%, #5f644d 22%, #61654a 24%, #64674c 25%, #64674a 27%, #6f6a4a 31%, #736d49 35%, #7b6f49 37%, #807148 41%, #8a754a 44%, #8e7847 47%, #927b49 48%, #997b47 50%, #a27f47 59%, #9f7b41 68%, #947139 75%, #896a34 79%, #836330 81%, #836332 82%, #7f612f 83%, #644d21 92%, #5e481f 96%, #5d471e 100%);\n  /* Chrome10-25,Safari5.1-6 */\n  background: linear-gradient(to right, #475d50 0%, #495e4d 9%, #4d5f4f 12%, #52614c 17%, #5f644d 22%, #61654a 24%, #64674c 25%, #64674a 27%, #6f6a4a 31%, #736d49 35%, #7b6f49 37%, #807148 41%, #8a754a 44%, #8e7847 47%, #927b49 48%, #997b47 50%, #a27f47 59%, #9f7b41 68%, #947139 75%, #896a34 79%, #836330 81%, #836332 82%, #7f612f 83%, #644d21 92%, #5e481f 96%, #5d471e 100%);\n  /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#475d50', endColorstr='#5d471e', GradientType=1);\n}\n.user-no2 {\n  background: #124c72;\n  /* Old browsers */\n  /* FF3.6-15 */\n  background: -webkit-linear-gradient(top, #124c72 0%, #15507c 1%, #195480 6%, #1a5982 15%, #1e5c85 19%, #1e5e82 23%, #206086 24%, #206084 26%, #246688 35%, #236587 39%, #226484 40%, #246585 41%, #236484 43%, #21627e 45%, #225f7b 50%, #215d77 51%, #1e566f 58%, #1c5066 60%, #19485a 67%, #144355 70%, #103547 79%, #0e3242 83%, #0f303f 84%, #0c2c3b 91%, #0b2934 96%, #0a2a35 99%, #0b313c 100%);\n  /* Chrome10-25,Safari5.1-6 */\n  background: linear-gradient(to bottom, #124c72 0%, #15507c 1%, #195480 6%, #1a5982 15%, #1e5c85 19%, #1e5e82 23%, #206086 24%, #206084 26%, #246688 35%, #236587 39%, #226484 40%, #246585 41%, #236484 43%, #21627e 45%, #225f7b 50%, #215d77 51%, #1e566f 58%, #1c5066 60%, #19485a 67%, #144355 70%, #103547 79%, #0e3242 83%, #0f303f 84%, #0c2c3b 91%, #0b2934 96%, #0a2a35 99%, #0b313c 100%);\n  /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#124c72', endColorstr='#0b313c', GradientType=0);\n}\n.user-no3 {\n  background: #0f2763;\n  /* Old browsers */\n  /* FF3.6-15 */\n  background: -webkit-linear-gradient(left, #0f2763 0%, #102a65 3%, #122b6b 4%, #122b6b 5%, #152e70 6%, #173575 8%, #1e3b7d 10%, #335998 16%, #4e78b2 22%, #507bb0 22%, #5d8bbc 25%, #6b9bc3 29%, #6f9dbf 29%, #7ca9c8 32%, #8ab1ce 37%, #94bacf 42%, #95bbce 43%, #9ebfd2 47%, #9dc0d4 48%, #a1c2d5 49%, #a3c2d4 50%, #a7c4d6 51%, #a7c4d4 51%, #afcbd7 56%, #b5d1dc 64%, #b2d0db 69%, #aeccd7 70%, #abcdd9 71%, #a7c8d9 73%, #94bed4 78%, #8fbcd1 78%, #86b4cc 80%, #7cadcd 82%, #74a6c7 83%, #5a94c2 87%, #528cba 88%, #4783b9 90%, #4076b2 92%, #3067a7 97%, #2c62a2 100%);\n  /* Chrome10-25,Safari5.1-6 */\n  background: linear-gradient(to right, #0f2763 0%, #102a65 3%, #122b6b 4%, #122b6b 5%, #152e70 6%, #173575 8%, #1e3b7d 10%, #335998 16%, #4e78b2 22%, #507bb0 22%, #5d8bbc 25%, #6b9bc3 29%, #6f9dbf 29%, #7ca9c8 32%, #8ab1ce 37%, #94bacf 42%, #95bbce 43%, #9ebfd2 47%, #9dc0d4 48%, #a1c2d5 49%, #a3c2d4 50%, #a7c4d6 51%, #a7c4d4 51%, #afcbd7 56%, #b5d1dc 64%, #b2d0db 69%, #aeccd7 70%, #abcdd9 71%, #a7c8d9 73%, #94bed4 78%, #8fbcd1 78%, #86b4cc 80%, #7cadcd 82%, #74a6c7 83%, #5a94c2 87%, #528cba 88%, #4783b9 90%, #4076b2 92%, #3067a7 97%, #2c62a2 100%);\n  /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#0f2763', endColorstr='#2c62a2', GradientType=1);\n}\n.user-no4 {\n  background: #475d50;\n  /* Old browsers */\n  /* FF3.6-15 */\n  background: -webkit-linear-gradient(-45deg, #475d50 0%, #495e4d 9%, #4d5f4f 12%, #52614c 17%, #5f644d 22%, #61654a 24%, #64674c 25%, #64674a 27%, #6f6a4a 31%, #736d49 35%, #7b6f49 37%, #807148 41%, #8a754a 44%, #8e7847 47%, #927b49 48%, #997b47 50%, #a27f47 59%, #9f7b41 68%, #947139 75%, #896a34 79%, #836330 81%, #836332 82%, #7f612f 83%, #644d21 92%, #5e481f 96%, #5d471e 100%);\n  /* Chrome10-25,Safari5.1-6 */\n  background: -webkit-linear-gradient(315deg, #475d50 0%, #495e4d 9%, #4d5f4f 12%, #52614c 17%, #5f644d 22%, #61654a 24%, #64674c 25%, #64674a 27%, #6f6a4a 31%, #736d49 35%, #7b6f49 37%, #807148 41%, #8a754a 44%, #8e7847 47%, #927b49 48%, #997b47 50%, #a27f47 59%, #9f7b41 68%, #947139 75%, #896a34 79%, #836330 81%, #836332 82%, #7f612f 83%, #644d21 92%, #5e481f 96%, #5d471e 100%);\n  background: linear-gradient(135deg, #475d50 0%, #495e4d 9%, #4d5f4f 12%, #52614c 17%, #5f644d 22%, #61654a 24%, #64674c 25%, #64674a 27%, #6f6a4a 31%, #736d49 35%, #7b6f49 37%, #807148 41%, #8a754a 44%, #8e7847 47%, #927b49 48%, #997b47 50%, #a27f47 59%, #9f7b41 68%, #947139 75%, #896a34 79%, #836330 81%, #836332 82%, #7f612f 83%, #644d21 92%, #5e481f 96%, #5d471e 100%);\n  /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#475d50', endColorstr='#5d471e', GradientType=1);\n}\n.profile-image1 {\n  background: #e70053;\n  background: -webkit-linear-gradient(#e70053, #6400de);\n  background: linear-gradient(#e70053, #6400de);\n}\n.profile-image2 {\n  background: #df9426;\n  background: -webkit-linear-gradient(#df9426, #e1950A);\n  background: -webkit-linear-gradient(#df9426, #e195A 5A);\n  background: linear-gradient(#df9426, #e195A 5A);\n}\n.profile-image3 {\n  background: #18212d;\n  background: -webkit-linear-gradient(#18212d, #8400f8);\n  background: linear-gradient(#18212d, #8400f8);\n}\n.profile-image4 {\n  background: #13d1b1;\n  background: -webkit-linear-gradient(#13d1b1, #6400de);\n  background: linear-gradient(#13d1b1, #6400de);\n}\n.profile-image0 {\n  background: #0ebc97;\n  background: -webkit-linear-gradient(#0ebc97, #e70053);\n  background: linear-gradient(#0ebc97, #e70053);\n}\n.search {\n  overflow: hidden;\n}\n.search form {\n  padding: 0 0 0 5px;\n  margin: 10px auto 5px;\n}\n.search form .icon-search-icon {\n  color: #A4A4A4;\n  font-size: 30px;\n  vertical-align: middle;\n  position: absolute;\n}\n.search form input {\n  border: 0;\n  color: #666666;\n  background-color: transparent;\n  padding: 0 45px 0 40px;\n  box-shadow: none;\n  font-weight: normal;\n  font-size: 20px;\n}\n.search form input.form-control::-webkit-input-placeholder {\n  color: #cccccc;\n}\n.search form :-moz-placeholder {\n  /* Firefox 18- */\n  color: #cccccc;\n}\n.search form ::-moz-placeholder {\n  /* Firefox 19+ */\n  color: #cccccc;\n}\n.search form :-ms-input-placeholder {\n  color: #cccccc;\n}\n.close-icon {\n  width: 18px;\n  height: 18px;\n  position: absolute;\n  top: 38px;\n  right: 35px;\n  cursor: pointer;\n  background: url(" + __webpack_require__(952) + ") no-repeat center center;\n}\n#common-modal .close-icon,\n#goal-users-modal .close-icon,\n#report-modal .close-icon {\n  top: 25px;\n  right: 20px;\n}\n.content-top .close-icon {\n  top: 18px;\n  right: 5px;\n}\n#goal-friends .close-icon {\n  top: 4px;\n  right: 13px;\n  background-size: 80%;\n}\n.icon {\n  display: inline-block;\n  width: 28px;\n  height: 28px;\n  vertical-align: middle;\n  margin-right: 2px;\n}\n.icon-quote-right {\n  right: 0;\n}\n.icon-dreaming {\n  font-size: 90px;\n  color: #a3a3a3;\n  position: absolute;\n}\n.icon-user-small {\n  font-size: 28px;\n  vertical-align: middle;\n}\n.ok-icon-green {\n  background: url(" + __webpack_require__(119) + ") no-repeat 8px -45px;\n}\n.icon-eye {\n  font-size: 40px;\n  margin-top: -3px;\n  display: block;\n}\n#homepage {\n  background: url(" + __webpack_require__(1118) + ") no-repeat center top;\n  background-size: cover;\n  position: relative;\n  height: 400px !important;\n}\n#homepage .absolute {\n  width: 100%;\n  bottom: 80px;\n}\n.remove-icon .icon-remove-video-link {\n  font-size: 30px;\n}\n.icon-question-only {\n  color: #a3a3a3;\n}\n.done-icon {\n  background: url(" + __webpack_require__(119) + ") no-repeat 8px 5px;\n}\n.done-icon:hover {\n  background: url(" + __webpack_require__(119) + ") no-repeat 8px -19px;\n}\n.addthis_counter .atc_s {\n  background: url(" + __webpack_require__(119) + ") no-repeat -7px -706px !important;\n  display: inline-block;\n  width: 28px !important;\n  height: 24px !important;\n  vertical-align: middle;\n  margin: 2px 2px 0 0 ;\n}\n.addthis_counter .atc_s:hover {\n  background: url(" + __webpack_require__(119) + ") no-repeat -7px -742px !important;\n}\n.question-icon-circle {\n  cursor: pointer;\n}\n.no-marginb {\n  margin-bottom: 0 !important;\n}\n.text-left {\n  text-align: left !important;\n}\n.small-size {\n  font-size: 16px;\n}\n.text-dark-gray {\n  color: #666666 !important;\n}\n.text-dark-grey {\n  color: #555555;\n}\n.text-gray {\n  color: #999999 !important;\n}\n.text-grey-dark {\n  color: #333333 !important;\n}\n.text-dark {\n  color: #021523;\n}\n.text-white {\n  color: #ffffff !important;\n}\n.text {\n  vertical-align: middle;\n}\n.transparent {\n  background-color: transparent;\n}\n.cover img {\n  width: 100%;\n  height: 470px;\n}\n.loading {\n  position: absolute;\n  vertical-align: middle;\n  line-height: 100%;\n  text-align: center;\n  top: 480px;\n  left: 48%;\n  z-index: 10;\n}\n.homepage {\n  position: absolute;\n  width: 100%;\n  top: 2%;\n}\n.homepage h1 {\n  color: #ffffff;\n  font-weight: 300;\n  font-size: 36px;\n}\n.homepage h4 {\n  padding: 0 10px;\n  line-height: 25px;\n  font-size: 18px;\n}\n.icon-scroll-down {\n  display: inline-block;\n  font-size: 30px;\n}\n#scroll-button {\n  height: 2px;\n  margin-top: -80px;\n  position: absolute;\n}\n.apps {\n  padding-left: 0;\n  width: 300px;\n  margin: 0 auto;\n  margin-top: 2%;\n}\n.apps li {\n  float: left;\n  padding: 5px;\n}\n.apps li a {\n  width: 138px;\n  height: 40px;\n  display: block;\n}\n.text-purple {\n  color: #7724F6 !important;\n}\n.text-blue {\n  color: #0057E7;\n}\n.users li {\n  position: absolute;\n  top: 0;\n}\n.users li figure {\n  width: 40px;\n  height: 40px;\n  background-color: transparent;\n}\n.users li img {\n  border: 2px solid;\n  height: 40px;\n}\n.users li p {\n  float: left;\n  width: 40px;\n  height: 40px;\n  line-height: 38px;\n  vertical-align: middle;\n  font-size: 14px !important;\n  font-weight: 600;\n}\n.btn-purple,\n.btn-purple[md-button] {\n  background-color: #7724F6;\n  color: #ffffff;\n  padding: 10px 35px;\n  font-weight: 700;\n  border: 0;\n  border-radius: 7px;\n  -webkit-border-radius: 7px;\n  -moz-border-radius: 7px;\n  -ms-border-radius: 7px;\n  -o-border-radius: 7px;\n}\n.btn-purple:hover,\n.btn-purple[md-button]:hover,\n.btn-purple:focus,\n.btn-purple[md-button]:focus {\n  color: #ffffff;\n  outline: 0;\n  outline-offset: 0;\n  background-color: #5e1dc3;\n}\n.btn-purple:focus,\n.btn-purple[md-button]:focus,\n.btn-purple:active,\n.btn-purple[md-button]:active {\n  background-color: #4f3576;\n}\n.btn-purple[md-button],\n.btn-purple[md-button][disabled] {\n  padding: 2px 35px;\n  color: #ffffff;\n}\n.btn-transparent,\n.btn-transparent[md-button] {\n  background-color: transparent;\n  color: #999999;\n  padding: 10px 35px;\n  border: 1px solid #e3e3e3;\n  border-radius: 7px;\n  -webkit-border-radius: 7px;\n  -moz-border-radius: 7px;\n  -ms-border-radius: 7px;\n  -o-border-radius: 7px;\n}\n.btn-transparent:hover,\n.btn-transparent[md-button]:hover,\n.btn-transparent:focus,\n.btn-transparent[md-button]:focus {\n  color: #ffffff;\n  outline: none;\n  background-color: #6108EA;\n}\n.btn-transparent:focus,\n.btn-transparent[md-button]:focus {\n  background-color: transparent;\n  color: #999999;\n}\n.btn-transparent[md-button] {\n  padding: 2px 35px;\n}\n.empty-text {\n  color: #333333;\n  font-weight: 300;\n  font-size: 14px;\n}\nh1 {\n  color: #021523;\n  font-size: 19px;\n  font-weight: 300;\n}\nh2 {\n  font-weight: 300;\n}\nh3 {\n  font-weight: 400;\n}\nul li {\n  list-style: none;\n}\n.margin-top {\n  margin-top: 10px;\n}\n.padding-top {\n  padding-top: 5px;\n}\n.round {\n  border-radius: 4px;\n  -webkit-border-radius: 4px;\n  -moz-border-radius: 4px;\n  -ms-border-radius: 4px;\n  -o-border-radius: 4px;\n}\n.signup,\n.settings {\n  padding: 10px;\n}\n.signup h1,\n.settings h1 {\n  color: #021523;\n  font-weight: 300;\n}\n.signup p,\n.settings p {\n  font-size: 12px;\n}\n.signup p a,\n.settings p a {\n  font-size: 12px;\n}\n.signup p a:hover,\n.settings p a:hover {\n  text-decoration: underline;\n  color: #7724F6;\n}\n.signup .form-group,\n.settings .form-group {\n  margin-bottom: 10px;\n}\n.signup .form-group input,\n.settings .form-group input {\n  height: 40px;\n}\n.signup .form-group input:hover,\n.settings .form-group input:hover {\n  border-color: #7724F6;\n}\n.signup .form-group div,\n.settings .form-group div {\n  margin-bottom: 5px;\n}\n.signup .registration-image,\n.settings .registration-image {\n  text-align: center;\n}\n.signup .uploaded-image,\n.settings .uploaded-image {\n  margin: 0 auto;\n  width: 90px;\n  height: 90px;\n  text-align: center;\n  border-radius: 50%;\n  -webkit-border-radius: 50%;\n  -moz-border-radius: 50%;\n  -ms-border-radius: 50%;\n  -o-border-radius: 50%;\n  border: 3px solid #e5e5e5;\n}\n.signup select,\n.settings select {\n  cursor: pointer;\n}\n.signup .nice-select,\n.settings .nice-select {\n  width: 100%;\n  border: 1px solid #ccc;\n  color: #A4A4A4;\n  height: 40px;\n  font-family: 'Open Sans', sans-serif;\n}\n.signup .nice-select span,\n.settings .nice-select span {\n  color: #A4A4A4;\n}\n.signup .nice-select .list,\n.settings .nice-select .list {\n  width: 100%;\n  max-height: 160px;\n  overflow-y: auto !important;\n}\n.signup .nice-select:hover,\n.settings .nice-select:hover,\n.signup .nice-select:focus,\n.settings .nice-select:focus,\n.signup .nice-select:active,\n.settings .nice-select:active,\n.signup .nice-select .open,\n.settings .nice-select .open {\n  border-color: #7724F6;\n}\n.settings {\n  padding: 10px;\n  margin-bottom: 10px;\n}\n.settings .form-group {\n  margin-bottom: 0;\n}\n.settings select {\n  display: none;\n}\n.settings hr {\n  margin: 5px 0;\n}\n.settings .iradio_minimal-purple.checked {\n  margin-top: 10px;\n  background: url(" + __webpack_require__(1121) + ") no-repeat -140px 0;\n}\n.settings h3 {\n  margin: 2px 0;\n  font-size: 15px;\n  padding: 0 0 5px;\n  line-height: normal;\n  color: #666666;\n}\n.settings .control-label {\n  padding-top: 7px;\n  color: #333;\n  font-size: 12px;\n}\n.settings figure {\n  padding: 30px 0 10px;\n  margin-bottom: 15px;\n}\n.settings figure figcaption {\n  margin-top: 12px;\n  background-color: transparent;\n}\n.settings figure figcaption label {\n  border: 1px solid #cecece;\n  color: #cecece;\n  padding: 3px 15px;\n  font-size: 14px;\n  cursor: pointer;\n}\n.settings input[type=radio] {\n  margin-top: 0;\n}\n.settings .delete-email {\n  position: relative;\n}\n.settings .delete-email a {\n  position: absolute;\n  top: 8px;\n  right: 0;\n  background: url(" + __webpack_require__(119) + ") no-repeat -8px -1294px;\n}\n.settings .delete-email input {\n  height: 40px;\n  width: 100%;\n}\n.settings .setting-bg {\n  position: absolute;\n  width: 109%;\n  top: 0;\n  height: 230px;\n  overflow: hidden;\n  z-index: 1;\n}\n.settings .setting-bg img {\n  width: 105%;\n  -webkit-filter: blur(20px);\n  -moz-filter: blur(20px);\n  -o-filter: blur(20px);\n  -ms-filter: blur(20px);\n  filter: blur(20px);\n  margin: -25px;\n}\n.settings .relative {\n  z-index: 2;\n}\n.settings label.onoffswitch-label {\n  padding: 0;\n  border: 1px solid #cccccc;\n}\n.settings .onoffswitch .onoffswitch-switch {\n  width: 30px;\n  border: 1px solid #cccccc;\n}\n.settings .upload {\n  width: 145px;\n  height: 145px;\n  padding: 45px 13px;\n  font-size: 18px;\n  text-align: center;\n}\n.settings .uploaded-image {\n  width: 145px;\n  height: 145px;\n}\n.settings .primary label {\n  color: #666666;\n  display: block;\n  text-align: left !important;\n  padding-top: 8px;\n}\n.upload {\n  width: 90px;\n  height: 90px;\n  margin: 0 auto;\n  border-radius: 50%;\n  -webkit-border-radius: 50%;\n  -moz-border-radius: 50%;\n  -ms-border-radius: 50%;\n  -o-border-radius: 50%;\n  background-color: #ffffff;\n  border: 3px solid #e5e5e5;\n  color: #A4A4A4;\n  padding: 28px 13px;\n  display: block;\n  cursor: pointer;\n  margin-bottom: 9px;\n  font-size: 12px;\n  z-index: 10;\n}\n.upload:hover {\n  color: #ffffff;\n  background-color: #CCCCCC;\n}\ninput {\n  color: #a3a3a3;\n}\n.atm-f {\n  height: auto !important;\n}\n.overlay {\n  display: block;\n  width: 100%;\n  height: 230px;\n  background: rgba(0, 0, 0, 0.2);\n  position: absolute;\n}\n.overlay:hover {\n  background: rgba(0, 0, 0, 0.3);\n}\n.overlay.height {\n  height: 540px;\n}\nfigure > a {\n  display: block;\n  overflow: hidden;\n}\nfigure .height {\n  height: 540px;\n}\nfigure .absolute {\n  bottom: 40px;\n  width: 100%;\n}\nfigure .absolute ul {\n  padding-left: 0;\n}\nfigure .absolute ul li {\n  display: inline-block;\n  padding-left: 10px;\n}\nfigure .absolute ul li a {\n  color: #ffffff;\n  font-size: 12px;\n}\nfigure .absolute ul li a:hover span {\n  text-decoration: underline;\n}\nfigure figcaption {\n  background-color: #ffffff;\n}\nfigure figcaption ul {\n  padding-left: 0;\n  margin-bottom: 0;\n}\nfigure figcaption ul li {\n  text-align: center;\n  border-right: 1px solid #f0f0f0;\n}\nfigure figcaption ul li a {\n  color: #999999;\n  display: block;\n  height: auto;\n  font-size: 11px;\n}\nfigure figcaption ul li i {\n  font-size: 23px;\n  vertical-align: middle;\n  margin-right: 5px;\n}\nfigure figcaption ul li .text {\n  display: inline-block;\n  vertical-align: middle;\n  color: #999999;\n  font-size: 11px;\n}\nfigure figcaption ul li:last-child {\n  border-right: 0;\n}\nfigure figcaption ul li:hover a {\n  color: #ffffff;\n}\nfigure figcaption ul li:hover a:hover {\n  color: #ffffff;\n  text-decoration: none;\n}\nfigure figcaption ul li:hover a:hover i {\n  color: #ffffff;\n}\nfigure figcaption ul li:focus,\nfigure figcaption ul li:active {\n  background-color: #6108EA;\n}\nfigure figcaption ul li:focus a,\nfigure figcaption ul li:active a {\n  color: #ffffff;\n}\n.overflow {\n  overflow: hidden;\n}\n.progress {\n  padding: 5px;\n  height: 30px;\n  border-radius: 0;\n  margin-bottom: 10px;\n  background: #f4f4f4;\n}\n.progress .progress-bar-striped {\n  background-size: 100%;\n  box-shadow: none;\n  background-image: -webkit-linear-gradient(left, #7724F6, #f5f5f5);\n  background-image: linear-gradient(to right, #7724F6, #f5f5f5);\n}\n.navigation {\n  text-align: center;\n  margin: 7px 0;\n}\n.navigation .pagination {\n  margin: 0;\n}\n.navigation .pagination a {\n  width: 30px;\n  height: 30px;\n  display: inline-block;\n  color: #b3b3b3;\n  border-radius: 50%;\n  -webkit-border-radius: 50%;\n  -moz-border-radius: 50%;\n  -ms-border-radius: 50%;\n  -o-border-radius: 50%;\n}\n.navigation .pagination a:hover,\n.navigation .pagination a:focus {\n  text-decoration: none;\n}\n.navigation .pagination span {\n  line-height: 30px;\n  display: inline-block;\n  margin: 0 5px 0 0;\n  background-color: #ffffff;\n  color: #b4b4b4;\n  border-radius: 50%;\n  -webkit-border-radius: 50%;\n  -moz-border-radius: 50%;\n  -ms-border-radius: 50%;\n  -o-border-radius: 50%;\n  text-align: center;\n  font-size: 13px;\n}\n.navigation .pagination span.current {\n  width: 30px;\n  height: 30px;\n  background-color: #7724F6;\n  color: #ffffff;\n}\n.navigation .pagination .next,\n.navigation .pagination .previous {\n  width: 30px;\n  height: 30px;\n  background-color: #e3e3e3;\n  color: #999999;\n}\n.navigation .pagination .next a,\n.navigation .pagination .previous a {\n  color: #999999;\n}\n.navigation .pagination .last,\n.navigation .pagination .first {\n  display: none;\n}\n.navigation .show-more {\n  padding: 3px 15px 5px;\n  border-radius: 6px;\n  -webkit-border-radius: 6px;\n  -moz-border-radius: 6px;\n  -ms-border-radius: 6px;\n  -o-border-radius: 6px;\n  background: #7724F6;\n  display: inline-block;\n}\n.navigation .show-more span span {\n  display: inline-block;\n  height: 6px;\n  width: 6px;\n  margin: 0 2px;\n  border-radius: 50%;\n  -webkit-border-radius: 50%;\n  -moz-border-radius: 50%;\n  -ms-border-radius: 50%;\n  -o-border-radius: 50%;\n  background-color: #ffffff;\n}\n.navigation .show-more:hover {\n  background: #6108EA;\n}\nfooter {\n  width: 100%;\n  position: absolute;\n  bottom: 0;\n  height: 300px;\n  background-color: #021523;\n}\nfooter small {\n  display: block;\n  padding: 24px 0 0;\n  color: #ffffff;\n  font-family: 'Open Sans', sans-serif;\n  font-size: 9px;\n}\nfooter ul {\n  padding: 0;\n  text-align: center;\n}\nfooter ul li {\n  display: inline-block;\n  list-style: none;\n  padding: 5px 13px;\n}\nfooter ul li a {\n  color: #E5E5E5;\n  text-transform: uppercase;\n  font-weight: 700;\n  font-size: 12px;\n}\nfooter ul li a:hover {\n  color: #E5E5E5;\n  text-decoration: underline;\n}\nfooter ul li a:focus {\n  color: #E5E5E5;\n  text-decoration: none;\n}\nfooter ul.apps li {\n  padding: 5px;\n}\nfooter .social {\n  padding: 25px 0 0;\n}\nfooter .social li {\n  padding: 5px 3px;\n}\nfooter .social li a {\n  display: block;\n  width: 32px;\n  height: 32px;\n}\nfooter .social li .facebook-icon {\n  background: url(" + __webpack_require__(954) + ") no-repeat center center;\n  background-size: 100%;\n}\nfooter .social li .instagram-icon {\n  background: url(" + __webpack_require__(961) + ") no-repeat center center;\n  background-size: 100%;\n}\nfooter .social li .twitter-icon {\n  background: url(" + __webpack_require__(979) + ") no-repeat center center;\n  background-size: 100%;\n}\nfooter .social li .pinterest-icon {\n  background: url(" + __webpack_require__(973) + ") no-repeat center center;\n  background-size: 100%;\n}\nfooter .social li .gplus-icon {\n  background: url(" + __webpack_require__(956) + ") no-repeat center center;\n  background-size: 100%;\n}\nfooter .social li .youtube-icon {\n  background: url(" + __webpack_require__(984) + ") no-repeat center center;\n  background-size: 100%;\n}\nfooter .apps {\n  margin: 0 auto;\n  padding: 40px 0 0;\n}\nfooter .footer-bottom {\n  position: absolute;\n  bottom: 0;\n  width: 100%;\n  background-color: #000000;\n}\nfooter .footer-bottom ul {\n  padding: 0;\n  text-align: right;\n}\nfooter .footer-bottom ul li {\n  padding: 5px 2px 5px 5px;\n}\nfooter .footer-bottom ul li a {\n  padding-top: 19px;\n  display: inline-block;\n  font-size: 8px;\n  text-transform: uppercase;\n  color: #D3D3D3;\n  font-weight: 600;\n}\nfooter .footer-bottom ul li a:hover {\n  text-decoration: underline;\n}\n.addthis_native_toolbox .addthis_counter.addthis_pill_style {\n  height: auto;\n}\n.relative {\n  position: relative;\n}\n.absolute {\n  position: absolute;\n}\n.bg-purple {\n  background-color: #7724f6 !important;\n}\n.bg-blue {\n  background-color: #021523;\n  color: #ffffff;\n  display: inline-block;\n}\n.bg-grey {\n  background-color: #f4f4f4 !important;\n}\n.bg-grey-darker {\n  background-color: #d8d8d8;\n}\n.bg-green {\n  background-color: #70bf44 !important;\n}\n.bg-gradinet {\n  background: #e92582;\n  /* For browsers that do not support gradients */\n  background: -webkit-linear-gradient(180deg, #e92582, #fdac09);\n  /* For Safari 5.1 to 6.0 */\n  /* For Opera 11.1 to 12.0 */\n  /* For Firefox 3.6 to 15 */\n  background: -webkit-linear-gradient(top, #e92582, #fdac09);\n  background: linear-gradient(180deg, #e92582, #fdac09);\n  /* Standard syntax (must be last) */\n}\n#app_bundle_success_story_type_videoLink {\n  margin-bottom: 30px;\n}\n.border {\n  border: 1px solid #999999;\n  border-radius: 5px;\n  -webkit-border-radius: 5px;\n  -moz-border-radius: 5px;\n  -ms-border-radius: 5px;\n  -o-border-radius: 5px;\n  padding: 3px 8px;\n}\n.row.no-gutter [class*='col-']:not(:first-child),\n.row.no-gutter [class*='col-']:not(:last-child) {\n  padding-right: 0;\n  padding-left: 0;\n}\n.heading {\n  font-size: 14px;\n}\n.heading i {\n  display: inline-block;\n  vertical-align: middle;\n  font-size: 25px;\n}\n.heading i.icon-goalfrined-icon {\n  margin-left: -4px;\n}\n.heading i.suggested-icon,\n.heading i.featured-icon {\n  margin-right: 5px;\n}\n.heading:hover,\n.heading:focus {\n  color: #666666 !important;\n  text-decoration: none;\n}\n.right-block {\n  background: #ffffff;\n  padding: 10px 10px 0;\n  margin-bottom: 20px;\n}\n.right-block hr {\n  margin: 5px 0 10px;\n}\n.right-block .ideas {\n  border: 1px solid #f4f4f4;\n  margin-bottom: 20px;\n  border-radius: 5px;\n  -webkit-border-radius: 5px;\n  -moz-border-radius: 5px;\n  -ms-border-radius: 5px;\n  -o-border-radius: 5px;\n}\n.right-block .ideas figure figcaption ul {\n  padding-left: 8px;\n}\n.right-block i {\n  font-size: 27px;\n  vertical-align: middle;\n  color: #a3a3a3;\n}\n.right-block bdi {\n  vertical-align: middle;\n}\n.right-block span a {\n  vertical-align: middle;\n}\n.right-block .idea-item figure {\n  margin-bottom: 0;\n}\n.right-menu ul {\n  padding-left: 0;\n  margin-bottom: 0;\n}\n.right-menu a,\n.right-menu span {\n  color: #999999;\n  font-size: 14px;\n  vertical-align: middle;\n}\n.right-menu a:hover,\n.right-menu span:hover,\n.right-menu a:focus,\n.right-menu span:focus {\n  text-decoration: none;\n  color: #7724F6;\n}\n.right-menu a:hover i,\n.right-menu span:hover i,\n.right-menu a:focus i,\n.right-menu span:focus i {\n  color: #a3a3a3;\n}\n.right-menu i {\n  font-size: 27px;\n  vertical-align: middle;\n  color: #a3a3a3;\n}\n.right-menu i.icon-top-idea {\n  margin-right: 10px;\n}\n.right-menu i.icon-creat-icon {\n  margin-right: 2px;\n}\n.right-menu span svg {\n  width: 27px !important;\n  height: 27px !important;\n  vertical-align: middle;\n}\n.right-menu span svg polyline,\n.right-menu span svg path {\n  stroke: #A4A4A4;\n}\n.standart-pages {\n  padding-bottom: 5px;\n}\n.standart-pages h1,\n.standart-pages h2 {\n  color: #021523;\n  font-weight: 300;\n}\n.standart-pages h3 {\n  font-weight: 400;\n}\n.standart-pages p {\n  font-size: 12px;\n  text-align: justify;\n  color: #333333;\n}\n.standart-pages ul li {\n  list-style-type: disc;\n  font-size: 12px;\n  text-align: justify;\n  color: #333333;\n}\n.map-marker img {\n  height: 40px;\n}\n.button-lg {\n  padding: 8px 15px;\n  font-size: 12px;\n  margin-right: 10px;\n  text-transform: uppercase;\n  font-weight: 700;\n}\n.check_status {\n  padding: 0 7px 7px 0;\n}\n.load {\n  -webkit-transition: all 300ms linear;\n  transition: all 300ms linear;\n  display: inline-block;\n  width: 22px;\n  height: 27px;\n  background: url(" + __webpack_require__(965) + ") no-repeat center center;\n}\n.tooltip > .tooltip-inner {\n  background: rgba(0, 0, 0, 0.45);\n}\n.ui-select-container {\n  margin-bottom: 7px;\n}\n.ui-select-container .ui-select-match span {\n  color: #999999;\n}\n.ui-select-container .ui-select-match .caret {\n  vertical-align: middle;\n  display: inline-block;\n  width: 26px;\n  height: 26px;\n  background: url(" + __webpack_require__(974) + ") no-repeat center center;\n  right: 0;\n  top: 4px;\n  border: 0;\n}\n.ui-select-container .ui-select-match .caret:hover,\n.ui-select-container .ui-select-match .caret:active {\n  background: url(" + __webpack_require__(324) + ") no-repeat center center;\n}\n.ui-select-container .btn-default,\n.ui-select-container .btn-default-focus {\n  background: transparent;\n  box-shadow: none;\n  color: #999999;\n  -webkit-transition: none;\n  transition: none;\n  border-radius: 4px;\n  -webkit-border-radius: 4px;\n  -moz-border-radius: 4px;\n  -ms-border-radius: 4px;\n  -o-border-radius: 4px;\n}\n.ui-select-container .btn-default:hover,\n.ui-select-container .btn-default-focus:hover {\n  box-shadow: none;\n  background: transparent;\n  border: 1px solid #7724F6;\n}\n.ui-select-container .btn-default:hover .caret,\n.ui-select-container .btn-default-focus:hover .caret {\n  background: url(" + __webpack_require__(324) + ") no-repeat center center;\n}\n.ui-select-container .btn-default:focus,\n.ui-select-container .btn-default-focus:focus,\n.ui-select-container .btn-default:active,\n.ui-select-container .btn-default-focus:active {\n  background: transparent;\n  border: 1px solid #7724F6;\n  box-shadow: none;\n}\n.ui-select-container .btn-default:focus .caret,\n.ui-select-container .btn-default-focus:focus .caret,\n.ui-select-container .btn-default:active .caret,\n.ui-select-container .btn-default-focus:active .caret {\n  background: url(" + __webpack_require__(324) + ") no-repeat center center;\n}\n.ui-select-container .btn-default-focus {\n  border: 0;\n  outline: 0;\n  box-shadow: none;\n  outline-offset: 0;\n}\n.ui-select-container .btn-default-focus:hover,\n.ui-select-container .btn-default-focus:focus,\n.ui-select-container .btn-default-focus:active {\n  border: 0;\n  outline: 0;\n  box-shadow: none;\n  outline-offset: 0;\n}\n.ui-select-container .ui-select-choices.dropdown-menu {\n  min-width: 143px;\n}\n.ui-select-container .ui-select-choices-row a {\n  color: #999999;\n}\n.ui-select-container .ui-select-choices-row.active a {\n  color: #ffffff;\n  background-color: #7724F6;\n}\n.ui-select-container input {\n  color: #999999;\n  border: 1px solid #cecece;\n  box-shadow: none;\n}\n.ui-select-container input:active,\n.ui-select-container input:hover {\n  border: 1px solid #7724F6;\n}\n.ui-select-container input:focus {\n  border: 0;\n  box-shadow: none;\n}\n#story-slider-homepage h2 {\n  margin: 10px 0 30px!important;\n}\n#story-slider-homepage .padding {\n  padding: 10px 20px 5px;\n}\n#story-slider-homepage #story-slider-homepage-container {\n  overflow: hidden;\n}\n#story-slider-homepage #story-slider-homepage-container .idea-item .goal-item-image {\n  height: 190px;\n}\n#story-slider-homepage .comment-place {\n  padding-top: 0;\n}\n#story-slider-homepage .comment-place .user-image {\n  width: 40px;\n  height: 40px;\n}\n#story-slider-homepage .comment-place .user-image span {\n  display: inline-block;\n  width: 40px;\n  height: 40px;\n  line-height: 34px;\n}\n#story-slider-homepage .comment-place .user-image img {\n  border: 2px solid #cecece;\n}\n#story-slider-homepage .user-name {\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  width: 100%;\n  font-weight: 600;\n  margin-bottom: 0;\n}\n#story-slider-homepage .border-left {\n  border-left: 2px solid #cccccc;\n  margin: -14px 0 0 25px;\n}\n#story-slider-homepage .user-image {\n  margin: 0 10px 8px 1px;\n}\n#story-slider-homepage .idea-item figure {\n  margin: 0 0 10px 0;\n}\n#story-slider-homepage .idea-item figure > a {\n  height: 190px;\n}\n#story-slider-homepage .idea-item figure .overlay {\n  height: 190px;\n}\n#story-slider-homepage .idea-item figure .absolute {\n  bottom: 0;\n}\n#story-slider-homepage .idea-item figure span {\n  color: #ffffff;\n}\n#story-slider-homepage .success-story-user {\n  width: 130px;\n}\n#story-slider-homepage .success-story-user span {\n  font-size: 10px;\n}\n#story-slider-homepage .like-icon {\n  width: 34px;\n  height: 18px;\n  margin: 0 0 0 3px;\n}\n#story-slider-homepage .success-scroll {\n  padding: 0 20px 0 30px;\n  text-align: justify;\n}\n#story-slider-homepage .success-scroll a {\n  display: inline-block;\n  position: relative;\n  margin: 10px 10px 0 0;\n}\n#story-slider-homepage .success-scroll a img {\n  vertical-align: inherit;\n}\n#story-slider-homepage .swiper-button-prev-home-story,\n#story-slider-homepage .swiper-button-next-home-story {\n  width: 21px;\n  height: 24px;\n  top: -8%;\n}\n#story-slider-homepage .swiper-button-prev-home-story {\n  background: url(" + __webpack_require__(976) + ") no-repeat center center;\n  background-size: 100%;\n}\n#story-slider-homepage .swiper-button-next-home-story {\n  background: url(" + __webpack_require__(977) + ") no-repeat center center;\n  background-size: 100%;\n}\n#story-slider-homepage .photo-icon,\n#story-slider-homepage .video-icon {\n  width: 20px;\n  height: 20px;\n  position: absolute;\n  right: 10px;\n  top: 10px;\n}\n#story-slider-homepage .photo-icon {\n  background: url(" + __webpack_require__(972) + ") no-repeat center center;\n  background-size: 100%;\n}\n#story-slider-homepage .video-icon {\n  background: url(" + __webpack_require__(980) + ") no-repeat center center;\n  background-size: 100%;\n}\n.margin-top {\n  margin-top: 10px;\n}\n.padding {\n  padding: 10px 10px 5px;\n}\n.padding-bottom {\n  padding-bottom: 10px;\n}\n.padding-no {\n  padding-bottom: 0;\n}\n.goalfrined-icon {\n  display: inline-block;\n  width: 23px;\n  height: 23px;\n  background: url(" + __webpack_require__(955) + ") no-repeat center center;\n  margin-right: 5px;\n}\n.menu-goalfrinds {\n  display: inline-block;\n  width: 25px !important;\n  height: 25px !important;\n  background: url(" + __webpack_require__(968) + ") no-repeat center center;\n}\n.leaderboard-icon {\n  display: inline-block;\n  width: 25px !important;\n  height: 25px !important;\n  background: url(" + __webpack_require__(963) + ") no-repeat center center;\n}\n.leaderboard-small {\n  display: inline-block;\n  width: 14px;\n  height: 14px;\n  background: url(" + __webpack_require__(964) + ") no-repeat center center;\n  margin: 1px 0 0 2px;\n  vertical-align: top;\n}\n.badge-place {\n  padding-left: 0;\n}\n.badge-place i {\n  display: inline-block;\n  vertical-align: middle;\n  width: 30px;\n  height: 30px;\n  background-size: 100%;\n}\n.badge-place .badge-1 {\n  background: url(" + __webpack_require__(978) + ") no-repeat center center;\n}\n.badge-place .badge-2 {\n  background: url(" + __webpack_require__(983) + ") no-repeat center center;\n}\n.badge-place .badge-3 {\n  background: url(" + __webpack_require__(960) + ") no-repeat center center;\n}\n.badge-place li {\n  display: inline-block;\n  text-align: center;\n  margin: 0 10px 0 0;\n}\n.badge-place li span,\n.badge-place li a {\n  display: block;\n  font-size: 16px;\n  vertical-align: middle;\n  font-weight: 400;\n  color: #ffffff;\n}\n.badge-place li a span {\n  display: inline-block;\n}\n.badge-place li a:hover {\n  color: #7724F6;\n}\n.left-corner {\n  border-radius: 4px;\n  -moz-border-radius-topleft: 4px;\n  -moz-border-radius-topright: 0;\n  -moz-border-radius-bottomleft: 4px;\n  -moz-border-radius-bottomright: 0;\n  -webkit-border-top-left-radius: 4px;\n  -webkit-border-top-right-radius: 0;\n  -webkit-border-bottom-left-radius: 4px;\n  -webkit-border-bottom-right-radius: 0;\n  border-top-left-radius: 4px;\n  border-top-right-radius: 0;\n  border-bottom-left-radius: 4px;\n  border-bottom-right-radius: 0;\n}\n.right-corner {\n  border-radius: 4px;\n  -moz-border-radius-topleft: 0;\n  -moz-border-radius-topright: 4px;\n  -moz-border-radius-bottomleft: 0;\n  -moz-border-radius-bottomright: 4px;\n  -webkit-border-top-left-radius: 0;\n  -webkit-border-top-right-radius: 4px;\n  -webkit-border-bottom-left-radius: 0;\n  -webkit-border-bottom-right-radius: 4px;\n  border-top-left-radius: 0;\n  border-top-right-radius: 4px;\n  border-bottom-left-radius: 0;\n  border-bottom-right-radius: 4px;\n}\n.bottom-corner {\n  border-radius: 4px;\n  -moz-border-radius-topleft: 0;\n  -moz-border-radius-topright: 0;\n  -moz-border-radius-bottomleft: 4px;\n  -moz-border-radius-bottomright: 4px;\n  -webkit-border-top-left-radius: 0;\n  -webkit-border-top-right-radius: 0;\n  -webkit-border-bottom-left-radius: 4px;\n  -webkit-border-bottom-right-radius: 4px;\n  border-top-left-radius: 0;\n  border-top-right-radius: 0;\n  border-bottom-left-radius: 4px;\n  border-bottom-right-radius: 4px;\n}\n.no-border-top-left {\n  border-top-left-radius: 0;\n}\n.no-border-top-right {\n  border-top-right-radius: 0;\n}\n.nearby-title {\n  font-size: 21px;\n  line-height: normal;\n  font-weight: 300;\n  margin: 30px 0;\n}\n.footer-bordered {\n  border: 1px solid #f4f4f4;\n  border-top: 0;\n}\n/* map styles*/\n#autocompleteMap {\n  width: 100%;\n  height: 320px;\n}\n/* end map styles*/\n/*goal item*/\n.ideas-list,\n#story-slider-homepage {\n  padding-bottom: 20px;\n}\n.ideas-list h2,\n#story-slider-homepage h2 {\n  font-size: 22px;\n  line-height: normal;\n  font-weight: 300;\n  margin: 30px 0;\n}\n.ideas-list h2 .empty-text,\n#story-slider-homepage h2 .empty-text {\n  font-weight: 400;\n  margin-bottom: 5px;\n}\n.ideas-list h2 .empty-text .btn-purple,\n#story-slider-homepage h2 .empty-text .btn-purple {\n  margin-left: 30px;\n}\n/*end goal item*/\n.hr-margin {\n  margin: 5px 0 10px;\n}\nmd-select .md-select-placeholder {\n  color: transparent;\n}\nmd-select .md-select-value {\n  color: #3c3c3c;\n}\nmd-select .md-select-trigger {\n  min-width: 70px;\n}\n.error-message {\n  color: #FF0000 !important;\n  font-size: 12px;\n  font-family: 'Open Sans', sans-serif;\n}\n.error-message ul {\n  padding-left: 0;\n}\n.example-margin .md-checkbox-inner-container {\n  margin: auto 3px auto auto;\n}\n.email {\n  padding: 5px;\n  text-align: center;\n  position: relative;\n  background: #7724F6;\n  color: #ffffff;\n  z-index: 10;\n  font-size: 12px;\n}\n.email span {\n  display: inline-block;\n  margin: 8px 0 0;\n  font-size: 12px;\n}\n.email a {\n  margin: 5px 0 0 5px;\n  display: inline-block;\n  font-weight: bold;\n  padding: 2px 5px;\n  color: #ffffff;\n  border: 1px solid #ffffff;\n  font-size: 12px;\n}\n.email a:hover {\n  color: #7724F6;\n  background-color: #ffffff;\n}\n@media (min-width: 768px) {\n  .email {\n    padding: 15px 5px;\n    font-size: 14px;\n  }\n  .email span {\n    font-size: 14px;\n  }\n  md-select .md-select-trigger {\n    min-width: 123px;\n  }\n  header .navbar {\n    min-height: 82px;\n  }\n  header .navbar-default .navbar-nav figure {\n    height: auto;\n  }\n  header .navbar-default .navbar-nav figure img {\n    height: auto;\n  }\n  header .navbar-default .navbar-nav li {\n    border-left: 1px solid #030d14;\n    border-bottom: 0;\n  }\n  header .navbar-default .navbar-nav li a {\n    font-size: 16px;\n    padding-top: 24px;\n    padding-bottom: 24px;\n  }\n  header .navbar-default .navbar-brand {\n    height: 78px;\n    padding: 15px 20px 18px 5px;\n  }\n  header .navbar-default .navbar-right li a {\n    padding-top: 24px;\n    padding-bottom: 24px;\n  }\n  header .navbar-default .navbar-right li:last-child {\n    width: 210px;\n  }\n  header .navbar-default .navbar-right li:last-child .user {\n    padding: 15px 5px 13px 15px;\n  }\n  header .navbar-default .navbar-right li:last-child .user figure {\n    width: 50px;\n    height: 50px;\n  }\n  header .navbar-default .navbar-right li:last-child .user figure img {\n    height: 50px;\n  }\n  header .navbar-default .navbar-right li:last-child .user p {\n    width: 50px;\n    height: 50px;\n    line-height: 45px;\n  }\n  header .navbar-default .navbar-right li:last-child .user span.name {\n    padding: 15px 0 4px 8px;\n    font-size: 16px;\n  }\n  header .navbar-default .navbar-right li:last-child .user + div.popover {\n    position: absolute;\n  }\n  header .navbar-default .navbar-right li:last-child .user-menu {\n    min-width: 210px;\n  }\n  header .navbar-default .navbar-right li:last-child .user-menu li a {\n    padding: 10px 20px;\n    font-size: 14px;\n    font-weight: 500;\n  }\n  header .navbar-default .navbar-right li:last-child .join-class {\n    min-width: 210px;\n    background-color: #021523;\n  }\n  header .navbar-default .navbar-right li:last-child .join-class:hover {\n    background-color: #021523;\n  }\n  header .navbar-default .navbar-right li:last-child .sign-in-popover + div.popover {\n    top: inherit !important;\n    left: inherit !important;\n    position: absolute;\n  }\n  header .navbar-default .navbar-right li:last-child .popover-content a {\n    font-size: 14px;\n  }\n  header a.relative {\n    padding: 19px 19px 18px!important;\n  }\n  header .bell {\n    background-position: center center;\n  }\n  header #notification a.relative {\n    padding: 19px 19px 18px!important;\n  }\n  header #notification .bell {\n    background-position: center center;\n  }\n  header #notification ul.dropdown-menu {\n    top: 98%;\n    width: 430px;\n  }\n  header #notification ul.dropdown-menu li:first-child a:hover {\n    color: #7724f6 !important;\n  }\n  header #notification .dropdown-menu {\n    right: -122px;\n    left: auto;\n  }\n  .search {\n    height: 75px;\n  }\n  .search form {\n    padding: 13px 2px 13px 0;\n  }\n  .search form input.form-control {\n    font-size: 22px;\n    padding-left: 43px;\n    width: 100%;\n  }\n  .check_status {\n    padding: 0 0 5px 0;\n  }\n  .button-lg {\n    margin-right: 15px;\n    padding: 7px 35px;\n    font-size: 13px;\n  }\n  .divider {\n    width: 210px;\n  }\n  .cover img {\n    height: auto;\n  }\n  h1,\n  h2 {\n    font-size: 36px;\n  }\n  h2 {\n    padding: 31px 0 34px;\n    margin: 0;\n  }\n  .margin-top {\n    margin-top: 40px;\n  }\n  .empty-text {\n    font-size: 18px;\n  }\n  .signup,\n  .settings {\n    padding-bottom: 10px;\n  }\n  .signup h1,\n  .settings h1 {\n    font-size: 36px;\n    margin: 20px 20px 30px;\n  }\n  .signup .text-dark-gray,\n  .settings .text-dark-gray {\n    font-size: 16px;\n  }\n  .signup .no-padding div:first-child,\n  .settings .no-padding div:first-child {\n    padding-right: 0;\n  }\n  .signup .no-padding div:first-child input,\n  .settings .no-padding div:first-child input {\n    border-top-right-radius: 0;\n    border-bottom-right-radius: 0;\n  }\n  .signup .no-padding div:last-child,\n  .settings .no-padding div:last-child {\n    padding-left: 0;\n  }\n  .signup .no-padding div:last-child input,\n  .settings .no-padding div:last-child input {\n    border-top-left-radius: 0;\n    border-bottom-left-radius: 0;\n  }\n  .signup .form-group,\n  .settings .form-group {\n    margin-bottom: 4px;\n  }\n  .signup .form-group p,\n  .settings .form-group p {\n    margin-bottom: 30px;\n  }\n  .signup .btn-blue,\n  .settings .btn-blue {\n    padding: 13px 51px;\n    border-radius: 10px;\n    -webkit-border-radius: 10px;\n    -moz-border-radius: 10px;\n    -ms-border-radius: 10px;\n    -o-border-radius: 10px;\n  }\n  .settings {\n    padding: 20px;\n  }\n  .settings hr {\n    margin: 5px 0 10px;\n  }\n  .settings h3 {\n    margin: 0 0 5px;\n    font-size: 20px;\n  }\n  .settings .control-label {\n    font-size: 14px;\n  }\n  .standart-pages {\n    padding-bottom: 10px;\n  }\n  .standart-pages h1 {\n    font-size: 36px;\n    margin: 20px 20px 30px;\n  }\n  .standart-pages p {\n    font-size: 13px;\n  }\n  .standart-pages ul li {\n    font-size: 13px;\n  }\n  .ui-select-container {\n    margin-bottom: 0;\n  }\n  .ui-select-container .ui-select-choices.dropdown-menu {\n    min-width: 125px;\n  }\n  #homepage .absolute {\n    bottom: 150px;\n  }\n  .homepage {\n    top: 25%;\n  }\n  .homepage h4 {\n    padding: 0 20px;\n    font-size: 18px;\n  }\n  .heading {\n    font-size: 16px;\n  }\n  .heading i {\n    font-size: 30px;\n    margin-right: 5px;\n  }\n  .right-block {\n    padding: 20px 15px;\n  }\n  .right-block hr {\n    margin: 10px 0 20px;\n  }\n  .right-menu a,\n  .right-menu span {\n    font-size: 16px;\n  }\n  .addthis_counter .atc_s {\n    height: 26px !important;\n    margin-top: 4px;\n  }\n  .addthis_button_expanded {\n    margin-top: 3px !important;\n  }\n  #pac-input {\n    width: 265px;\n  }\n  figure figcaption ul li .text {\n    font-size: 14px;\n  }\n  footer ul {\n    padding: 10px 0 0;\n  }\n  footer ul li {\n    display: inline-block;\n    padding: 5px 25px;\n  }\n  footer ul li a {\n    font-size: 14px;\n  }\n  footer .social {\n    padding: 20px 0 0;\n  }\n  footer .social li {\n    padding: 5px 10px;\n  }\n  footer .social li a {\n    display: block;\n    width: 40px;\n    height: 40px;\n  }\n  footer small {\n    clear: both;\n    padding: 24px 0 15px;\n    font-size: 12px;\n  }\n  footer .footer-bottom ul li {\n    padding: 5px 2px 5px 25px;\n  }\n  footer .footer-bottom ul li a {\n    font-size: 12px;\n  }\n  .navigation {\n    margin: 0 0 15px 0;\n  }\n  .navigation .pagination {\n    margin: 10px 0;\n  }\n  .navigation .pagination a {\n    width: 35px;\n    height: 35px;\n  }\n  .navigation .pagination span {\n    line-height: 35px;\n  }\n  .navigation .pagination span.current {\n    width: 35px;\n    height: 35px;\n  }\n  .navigation .pagination .next,\n  .navigation .pagination .previous {\n    width: 35px;\n    height: 35px;\n  }\n  .navigation .show-more span span {\n    height: 9px;\n    width: 9px;\n  }\n  #story-slider-homepage {\n    margin: 0 0 20px 0;\n  }\n  #story-slider-homepage .padding {\n    padding: 20px 20px 5px;\n  }\n  #story-slider-homepage #story-slider-homepage-container {\n    overflow: hidden;\n  }\n  #story-slider-homepage h2 {\n    margin: 10px 0 !important;\n  }\n  #story-slider-homepage .border-left {\n    margin: -14px 0 0 35px;\n  }\n  #story-slider-homepage .user-image {\n    margin: 0 10px 8px 12px;\n  }\n  #story-slider-homepage .success-story-user {\n    width: auto;\n  }\n  #story-slider-homepage .success-story-user span {\n    font-size: 12px;\n  }\n  #story-slider-homepage .success-scroll {\n    padding: 0 30px;\n  }\n  #story-slider-homepage .like-icon {\n    margin: 0 15px 0 12px;\n    width: 59px;\n    height: 31px;\n  }\n  #story-slider-homepage .swiper-button-prev-home-story,\n  #story-slider-homepage .swiper-button-next-home-story {\n    width: 45px;\n    height: 48px;\n    top: 50%;\n  }\n  .margin-top {\n    margin-top: 20px;\n  }\n  .padding {\n    padding: 20px 20px 5px;\n  }\n  .padding-bottom {\n    padding-bottom: 20px;\n  }\n  .padding-no {\n    padding-bottom: 0;\n  }\n  .nearby-title {\n    padding: 50px 0;\n    font-size: 32px;\n    margin: 20px 0 10px 0;\n  }\n  .nearby-title span:hover {\n    color: #5e1dc3 !important;\n  }\n  .nearby-title span:active {\n    color: #4f3576 !important;\n  }\n  /*goal item*/\n  .ideas-list,\n  #story-slider-homepage {\n    padding-bottom: 0;\n  }\n  .ideas-list h2,\n  #story-slider-homepage h2 {\n    font-size: 27px;\n    margin: 20px 0 10px 0;\n  }\n  /*end goal item*/\n  .hr-margin {\n    margin: 10px 0;\n  }\n}\n.no-right {\n  padding-right: 0;\n}\n.no-left {\n  padding-left: 0;\n}\n.no-bottom {\n  padding-bottom: 0;\n}\n.green-bg {\n  background-color: #66cc33;\n  color: #ffffff;\n}\n.text-green {\n  color: #66cc33;\n}\n.text-orange {\n  color: #ff5500 !important;\n}\n.bg-white {\n  background-color: #ffffff !important;\n}\n.line {\n  height: 1px;\n  border-top: 1px solid #e6e6e6;\n}\n.like-icon {\n  display: inline-block;\n  height: 21px;\n  width: 40px;\n  margin: 0 0 5px 12px;\n  background: url(" + __webpack_require__(1120) + ") no-repeat center center;\n  background-size: 100%;\n  vertical-align: middle;\n  cursor: pointer;\n}\n@media (min-width: 992px) {\n  header .navbar {\n    min-height: 84px;\n  }\n  header .navbar-brand {\n    height: 80px;\n    padding: 16px 30px 21px 5px;\n  }\n  header .navbar-default .navbar-nav li a {\n    font-size: 16px;\n    padding: 25px 23px;\n  }\n  header .navbar-default .navbar-nav li a i.mybucketlist-icon {\n    margin-right: 6px;\n  }\n  header .navbar-default .navbar-nav li a:hover {\n    background-color: #000000;\n    color: #ffffff;\n  }\n  header .navbar-default .navbar-right li:last-child {\n    width: 235px;\n  }\n  header .navbar-default .navbar-right li:last-child .user {\n    padding: 16px 5px 14px 15px;\n  }\n  header .navbar-default .navbar-right li:last-child .user span.name {\n    padding: 13px 0 4px 8px;\n  }\n  header .navbar-default .navbar-right li:last-child .user .icon-arrow-down,\n  header .navbar-default .navbar-right li:last-child .user .icon-icon-up {\n    margin-right: 10px;\n    margin-top: 7px;\n  }\n  header .navbar-default .navbar-right li:last-child .user-menu {\n    width: 235px;\n  }\n  header .navbar-default .navbar-right li:last-child .user-menu li a {\n    padding: 10px 20px;\n    font-size: 14px;\n    font-weight: 500;\n  }\n  header .navbar-default .navbar-right li:last-child .join-class {\n    min-width: 234px;\n  }\n  header .navbar-default .navbar-right li:last-child .popover-content a {\n    font-size: 14px;\n  }\n  header a.relative {\n    padding: 25px 20px !important;\n  }\n  header .bell {\n    width: 25px;\n    height: 30px;\n    background-position: center bottom;\n  }\n  header #notification a.relative {\n    padding: 25px 20px !important;\n  }\n  header #notification .bell {\n    width: 25px;\n    height: 30px;\n    background-position: center bottom;\n  }\n  header #notification .dropdown-menu {\n    right: -240px;\n    left: auto;\n  }\n  header #notification:hover,\n  header #notification:active,\n  header #notification:focus {\n    background-color: #000000;\n  }\n  header #notification:hover a.relative,\n  header #notification:active a.relative,\n  header #notification:focus a.relative {\n    background-color: #000000;\n  }\n  .button-lg {\n    padding: 10px 45px;\n    font-size: 14px;\n  }\n  .example-margin .md-checkbox-inner-container {\n    margin: auto 8px auto auto;\n  }\n  h1,\n  h2 {\n    font-size: 48px;\n    font-weight: 300;\n  }\n  .check_status {\n    padding: 0 0 15px 0;\n  }\n  .empty-text {\n    font-size: 24px;\n  }\n  h2 {\n    padding: 62px 0 68px;\n    margin: 0;\n  }\n  .padding-top {\n    padding-top: 20px;\n  }\n  .divider {\n    width: 235px;\n  }\n  .signup,\n  .settings {\n    padding-bottom: 20px;\n  }\n  .signup h1,\n  .settings h1 {\n    font-size: 52px;\n    margin: 60px 0 35px;\n  }\n  .settings {\n    margin-bottom: 20px;\n    padding: 20px 25px;\n  }\n  .settings hr {\n    margin: 5px 0 20px;\n  }\n  .settings h3 {\n    margin: 0 0 10px;\n    font-size: 24px;\n    padding: 0;\n  }\n  .standart-pages {\n    padding-bottom: 30px;\n  }\n  .standart-pages h1 {\n    font-size: 48px;\n    margin: 60px 0 35px;\n  }\n  .standart-pages p {\n    font-size: 14px;\n  }\n  .standart-pages ul li {\n    font-size: 14px;\n  }\n  .video video {\n    margin-top: -164px;\n  }\n  #homepage {\n    height: 450px !important;\n  }\n  #homepage .absolute {\n    bottom: 100px;\n  }\n  .homepage {\n    top: 15%;\n  }\n  .homepage h1 {\n    font-size: 52px;\n    padding-bottom: 2%;\n  }\n  .homepage h4 {\n    padding-bottom: 4%;\n    font-size: 23px;\n    line-height: 30px;\n  }\n  .bottom-part {\n    background-color: #f1f1f1;\n    padding: 15px 0 25px;\n  }\n  .navigation {\n    margin: 15px 0 40px;\n  }\n  .navigation .pagination {\n    margin: 20px 0;\n  }\n  .navigation .pagination a {\n    width: 40px;\n    height: 40px;\n  }\n  .navigation .pagination span {\n    line-height: 40px;\n  }\n  .navigation .pagination span.current {\n    width: 40px;\n    height: 40px;\n  }\n  .navigation .pagination .next,\n  .navigation .pagination .previous {\n    width: 40px;\n    height: 40px;\n  }\n  .check_status {\n    padding: 0 0 5px 0;\n  }\n  .badge-place li {\n    margin-right: 30px;\n  }\n  .badge-place li span {\n    font-size: 18px;\n  }\n  footer ul li a {\n    font-size: 16px;\n  }\n  footer .apps {\n    padding: 30px 0 0;\n  }\n  footer small {\n    padding: 25px 30px;\n  }\n  #story-slider-homepage {\n    margin: 0 0 25px 0;\n  }\n  #story-slider-homepage h2 {\n    margin: 0 0 10px 0 !important;\n  }\n  #story-slider-homepage .border-left {\n    margin: -14px 0 0 35px;\n  }\n  #story-slider-homepage .user-image {\n    margin: 0 15px 8px 12px;\n  }\n  #story-slider-homepage .success-scroll {\n    padding: 0 35px;\n  }\n  /*goal item*/\n  .ideas-list h2,\n  #story-slider-homepage h2 {\n    padding: 50px 0;\n    font-size: 32px;\n  }\n  .ideas-list .no-bottom,\n  #story-slider-homepage .no-bottom {\n    padding-bottom: 0;\n  }\n  /*end goal item*/\n  .like-icon:hover {\n    background: url(" + __webpack_require__(1119) + ") no-repeat center center;\n    background-size: 100%;\n  }\n}\n.modal-open {\n  padding-right: 0 !important;\n}\nhtml {\n  overflow-y: scroll !important;\n}\n[ng\\:cloak],\n[ng-cloak],\n[data-ng-cloak],\n[x-ng-cloak],\n.ng-cloak,\n.x-ng-cloak {\n  display: none !important;\n}\n@media (min-width: 1200px) {\n  header .navbar-default .navbar-right li:last-child {\n    width: 235px;\n  }\n  header .navbar-default .navbar-right li:last-child .user .icon-arrow-down,\n  header .navbar-default .navbar-right li:last-child .user .icon-icon-up {\n    margin-right: 10px;\n  }\n  header .navbar-default .navbar-right li:last-child .user-menu {\n    width: 235px;\n  }\n  header .navbar-default .navbar-right li:last-child .user-menu li a {\n    padding: 10px 20px;\n    font-size: 14px;\n    font-weight: 500;\n  }\n  header .navbar-default .navbar-right li:last-child .join-class {\n    min-width: 234px;\n  }\n  header .navbar-default .navbar-right li:last-child .popover-content a {\n    font-size: 14px;\n  }\n  .homepage {\n    top: 15%;\n  }\n  .homepage h1 {\n    font-size: 56px;\n    padding-bottom: 1%;\n  }\n  .homepage h4 {\n    font-size: 24px;\n    line-height: 32px;\n    padding-bottom: 2%;\n  }\n  .button-lg {\n    width: 186px;\n  }\n}\n.full-height {\n  height: 100%;\n}\n*:focus {\n  outline: none;\n}\n/*notification list styles*/\n#notification-list {\n  padding: 6px 0 0 0;\n  margin-bottom: 10px;\n}\n#notification-list li:first-child {\n  padding-bottom: 21px;\n}\n#notification-list li:first-child a:hover {\n  color: #7724F6 !important;\n  background-color: transparent;\n}\n#notification-list .close-icon {\n  top: 24px;\n  right: 20px;\n  display: none;\n}\n#notification-list h3,\n#notification-list a {\n  font-size: 14px !important;\n  line-height: 21px;\n  padding: 0 10px;\n  margin: 0;\n}\n#notification-list h3 {\n  font-weight: 600;\n  padding: 3px 10px 2px;\n}\n#notification-list a {\n  font-weight: 400;\n  display: inline-block;\n}\n#notification-list ul {\n  padding: 10px 0;\n  position: relative;\n  margin-bottom: 0;\n  cursor: pointer;\n  border-top: 1px solid #e5e5e5;\n}\n#notification-list ul li figure {\n  text-align: center;\n  width: 40px;\n  height: 40px;\n  margin: 0 10px;\n}\n#notification-list ul li figure img {\n  height: 40px;\n}\n#notification-list ul li figure p {\n  width: 40px;\n  height: 40px;\n  color: #ffffff;\n  line-height: 36px;\n}\n#notification-list ul li p span {\n  display: block;\n  white-space: normal;\n  word-break: break-word;\n  font-size: 14px;\n  line-height: 21px;\n}\n#notification-list ul li p span a {\n  font-weight: 600;\n  padding: 0;\n  color: #666666;\n}\n#notification-list ul li:first-child {\n  padding-bottom: 0;\n}\n#notification-list ul.unread {\n  background: #f4f4f4;\n}\n#notification-list ul:hover {\n  background-color: #e8e8e8;\n}\n#notification-list ul:hover .close-icon {\n  display: block;\n}\n#notification-list .goals-animate p {\n  margin-bottom: 0;\n  padding-bottom: 0;\n}\n.map-marker-new {\n  display: inline-block;\n  width: 30px;\n  height: 30px;\n  background: url(" + __webpack_require__(967) + ") no-repeat center center;\n  background-size: 100%;\n}\n.map-marker-new:hover svg ellipse,\n.map-marker-new:hover svg path,\n.map-marker-new:hover svg .sto {\n  stroke: #7725f6;\n}\n.map-marker-active svg ellipse,\n.map-marker-active svg path,\n.map-marker-active svg .sto {\n  stroke: #7725f6;\n}\n.map-marker-active span {\n  color: #7725f6;\n}\n.bg-transparent {\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0, 0, 0, 0.75);\n  position: absolute;\n  z-index: 100;\n}\n.affiliate-right img,\n.affiliate-right-mobile img {\n  width: 100%;\n  height: auto;\n}\ndiv[dnd-list],\ndiv[dnd-list] > div,\ndiv[dnd-list] > li {\n  position: relative;\n}\ndiv[dnd-list] .dndDraggingSource {\n  display: none;\n}\ndiv[dnd-list] .selected {\n  background-color: #7725f6;\n  color: #3c763d;\n}\ndiv[dnd-list] .noselect {\n  -webkit-touch-callout: none;\n  /* iOS Safari */\n  -webkit-user-select: none;\n  /* Chrome/Safari/Opera */\n  /* Konqueror */\n  -moz-user-select: none;\n  /* Firefox */\n  -ms-user-select: none;\n  /* Internet Explorer/Edge */\n  user-select: none;\n  /* Non-prefixed version, currently\n                                  not supported by any browser */\n}\n.dnd-sortable-drag {\n  display: block;\n  background-color: #7725f6;\n  opacity: 0.5;\n  min-height: 40px;\n}\n/*purple input styles*/\n.purple-checkbox .my-md-container {\n  position: absolute;\n  top: 50%;\n  -webkit-transform: translateY(-50%);\n  transform: translateY(-50%);\n  box-sizing: border-box;\n  display: inline-block;\n  width: 20px;\n  height: 20px;\n  left: 0;\n  right: auto;\n}\n.purple-checkbox .my-md-icon {\n  box-sizing: border-box;\n  -webkit-transition: .24s;\n  transition: .24s;\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 20px;\n  height: 20px;\n  border: 2px solid rgba(0, 0, 0, 0.4);\n  border-radius: 2px;\n}\n.purple-checkbox .my-md-label {\n  box-sizing: border-box;\n  position: relative;\n  display: inline-block;\n  vertical-align: top;\n  white-space: normal;\n  -webkit-user-select: text;\n  -moz-user-select: text;\n  -ms-user-select: text;\n  user-select: text;\n  margin-left: 30px;\n  margin-right: 0;\n  font-size: 16px;\n  color: #333333;\n}\n.purple-checkbox .my-md-checked .my-md-icon {\n  background-color: #7724F6;\n  border: 2px solid #7724f6;\n}\n.purple-checkbox .my-md-checked .my-md-icon:after {\n  box-sizing: border-box;\n  -webkit-transform: rotate(45deg);\n  transform: rotate(45deg);\n  position: absolute;\n  left: 4.66667px;\n  top: .22222px;\n  display: table;\n  width: 6.66667px;\n  height: 13.33333px;\n  border: 2px solid;\n  border-top: 0;\n  border-left: 0;\n  content: '';\n  color: #ffffff;\n}\n.purple-checkbox .my-md-checked .md-on {\n  -webkit-transform: scale(0.5);\n  /* transform: scale(0.5); */\n  background-color: #7724F6;\n}\n.purple-checkbox .md-off,\n.purple-checkbox .md-on {\n  box-sizing: border-box;\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 20px;\n  height: 20px;\n  border-radius: 50%;\n  border: 2px solid #7724F6;\n}\ndiv[data-dnd-draggable] div.to-do-list input {\n  cursor: move;\n}\ndiv[data-dnd-draggable] div.to-do-list input[disabled] {\n  cursor: no-drop;\n}\ndiv[data-dnd-draggable] div.to-do-list input[disabled].market-step {\n  text-decoration: line-through;\n}\n/*end input styles*/\nul {\n  padding-left: 0;\n}\n.arrow-up {\n  width: 0;\n  height: 0;\n  border-left: 10px solid transparent;\n  border-right: 10px solid transparent;\n  border-bottom: 10px solid #f4f4f4;\n}\n.md-checkbox-checked.md-accent .md-checkbox-background,\n.md-checkbox-indeterminate.md-accent .md-checkbox-background {\n  background: #6108EA;\n}\nmd-slide-toggle.md-checked:not(.md-disabled) .md-slide-toggle-thumb,\nmd-slide-toggle.md-slide-toggle-focused .md-slide-toggle-thumb {\n  background-color: #7724f6;\n}\nmd-slide-toggle.md-checked:not(.md-disabled) .md-slide-toggle-thumb .md-ink-ripple,\nmd-slide-toggle.md-slide-toggle-focused .md-slide-toggle-thumb .md-ink-ripple,\nmd-slide-toggle.md-checked:not(.md-disabled) .md-slide-toggle-thumb .md-slide-toggle-focused,\nmd-slide-toggle.md-slide-toggle-focused .md-slide-toggle-thumb .md-slide-toggle-focused {\n  background-color: rgba(119, 36, 246, 0.3);\n}\nmd-slide-toggle.md-checked:not(.md-disabled) .md-slide-toggle-bar,\nmd-slide-toggle.md-slide-toggle-focused .md-slide-toggle-bar {\n  background-color: rgba(119, 36, 246, 0.5);\n}\nmd-radio-button.md-radio-checked .md-radio-inner-circle {\n  background-color: #7724f6;\n}\nmd-radio-button.md-radio-checked .md-radio-outer-circle {\n  border-color: #7724f6;\n}\nmd-radio-button.md-radio-checked .md-ripple-foreground {\n  background-color: rgba(119, 36, 246, 0.3) !important;\n}\n.md-dialog-container {\n  padding: 0;\n  overflow: hidden;\n  box-shadow: none;\n  background: transparent;\n  border-radius: 6px;\n  -webkit-border-radius: 6px;\n  -moz-border-radius: 6px;\n  -ms-border-radius: 6px;\n  -o-border-radius: 6px;\n}\n.cdk-overlay-container {\n  z-index: 10001;\n}\n.cdk-focus-trap-content {\n  position: fixed;\n  left: 0;\n  right: 0;\n  top: 25px;\n  bottom: 0;\n  overflow: auto;\n  border-radius: 8px;\n  -webkit-border-radius: 8px;\n  -moz-border-radius: 8px;\n  -ms-border-radius: 8px;\n  -o-border-radius: 8px;\n}\nmd-progress-spinner {\n  margin: 70px auto 0;\n}\n.progress .progress-section {\n  position: relative;\n}\n.progress .progress-section span {\n  position: absolute;\n  width: 100%;\n  z-index: 1;\n  text-align: center;\n  color: #ffffff;\n}\n.progress .progress-section .md-progress-bar-fill::after {\n  background-color: #7724f6;\n}\n.progress md-progress-bar {\n  height: 20px;\n}\n.md-ripple-foreground {\n  background-color: rgba(119, 36, 246, 0.3);\n}\na[md-button],\nbutton[md-button] {\n  font-family: 'Open Sans', sans-serif;\n}\n", ""]);

// exports


/***/ }),

/***/ 950:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "activity.svg";

/***/ }),

/***/ 951:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "add-goal.svg";

/***/ }),

/***/ 952:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "close.svg";

/***/ }),

/***/ 953:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "edit-note.svg";

/***/ }),

/***/ 954:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "facebook-icon.svg";

/***/ }),

/***/ 955:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "goalfriends-icon.svg";

/***/ }),

/***/ 956:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "gplus-icon.svg";

/***/ }),

/***/ 957:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "grey-burger.svg";

/***/ }),

/***/ 958:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "grey-remove.svg";

/***/ }),

/***/ 959:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "ideas.svg";

/***/ }),

/***/ 960:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "inovator-icon.svg";

/***/ }),

/***/ 961:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "instagram-icon.svg";

/***/ }),

/***/ 962:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "join-icon.svg";

/***/ }),

/***/ 963:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "leaderboard-icon.svg";

/***/ }),

/***/ 964:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "leaderboard_small.svg";

/***/ }),

/***/ 965:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "load.svg";

/***/ }),

/***/ 966:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "logout.svg";

/***/ }),

/***/ 967:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "map-icon.svg";

/***/ }),

/***/ 968:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "menu-goalfrinds.svg";

/***/ }),

/***/ 969:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "my-bucketlist.svg";

/***/ }),

/***/ 970:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "mybucketlist-icon.svg";

/***/ }),

/***/ 971:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "no-note.svg";

/***/ }),

/***/ 972:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "photo-icon.svg";

/***/ }),

/***/ 973:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "pinterest-icon.svg";

/***/ }),

/***/ 974:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "select-icon.svg";

/***/ }),

/***/ 975:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "settings.svg";

/***/ }),

/***/ 976:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "story-left-arrow.svg";

/***/ }),

/***/ 977:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "story-right-arrow.svg";

/***/ }),

/***/ 978:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "traveler-icon.svg";

/***/ }),

/***/ 979:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "twitter-icon.svg";

/***/ }),

/***/ 980:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "video-icon.svg";

/***/ }),

/***/ 981:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "white-burger.svg";

/***/ }),

/***/ 982:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "white-remove.svg";

/***/ }),

/***/ 983:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "writer-icon.svg";

/***/ }),

/***/ 984:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "youtube-icon.svg";

/***/ })

},[1124]);
//# sourceMappingURL=styles.bundle.map