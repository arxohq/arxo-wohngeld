'use strict';
  // Init log level
  var gsb_loglevel = 'error';
  var gsb_logDependenciesWarning = false;
  var ISPREVIEW = false;
  /* Start logging */
  
    

    

    /*!
* GSB-Plugin zur Bereitstellung von globalen Logging-Methoden
* Benoetigt Variable "gsb_loglevel" aus global.js, ueberschreibbar durch Konfigurationseintrag "/bmwsb/SiteGlobals/_config/JSLogWarnlevel"
*
* Author: rkrusenb
* --GSBDocStart
* @module logging
* @version 1.1.3
* @see {@link http://semver.org|Semantic Versioning}
* @author rkrusenb
*
* @desc GSB-Plugin zur Bereitstellung von globalen Logging-Methoden
*  Benoetigt Variable "gsb_loglevel" aus global.js, ueberschreibbar durch Konfigurationseintrag "/bmwsb/SiteGlobals/_config/JSLogWarnlevel"
*--GSBDocEnd
*/"use strict";
/* eslint no-console: "off" -- Logging Modul soll logging dürfen */
// noinspection ES6ConvertVarToLetConst
// eslint-disable-next-line no-redeclare,no-var,no-use-before-define -- Globale Deklaration
var gsb = gsb || {};
(function (namespace) {
  const loglevels = {
    debug: 8,
    log: 4,
    warn: 2,
    error: 1,
    none: 0
  };

  let loglevel = gsb_loglevel;
  let hiddenMessages = [];

  const env = {
    debug: console.debug.bind(console),
    log: console.log.bind(console),
    warn: console.warn.bind(console),
    error: console.error.bind(console) };

  function wrap(method) {
    return function () {
      hiddenMessages.push([method, arguments]);
    };
  }

  const deferred = {
    debug: wrap('debug'),
    log: wrap('log'),
    warn: wrap('warn'),
    error: wrap('error') };

  function consoleExists(method) {
    if (!method) {
      return typeof console !== "undefined";
    }
    return typeof console !== "undefined" && typeof console[method] === "function";

  }


  function flushHiddenMessages() {
    let i, l, temp, method, args;
    if (consoleExists()) {
      for (i = 0, l = hiddenMessages.length; i < l; i++) {
        temp = hiddenMessages[i];
        method = temp[0];
        args = temp[1];
        if (consoleExists(method)) {
          hiddenMessages[i] = null; //mark message for deletion
          env[method].apply(null, args); //use suitable log method
        }
      }
      //delete messages
      hiddenMessages = hiddenMessages.filter(function (value) {
        return value !== null;
      });
    }
  }

  function setLogLevel(newLevel) {
    loglevel = newLevel;
    ['error', 'warn', 'log', 'debug'].forEach(function (str) {
      if (loglevels[str] === loglevels.error) {
        if (loglevels[newLevel] >= loglevels.error && consoleExists('error')) {
          namespace.error = env.error;
        } else {
          namespace.error = deferred.error;
        }
      } else if (loglevels[str] === loglevels.warn) {
        if (loglevels[newLevel] >= loglevels.warn && consoleExists('warn')) {
          namespace.warn = env.warn;
        } else {
          namespace.warn = deferred.warn;
        }
      } else if (loglevels[str] === loglevels.log) {
        if (loglevels[newLevel] >= loglevels.log && consoleExists('log')) {
          namespace[str] = env.log;
        } else {
          namespace[str] = deferred.log;
        }
      } else {//all other methods default to "debug", currently
        if (loglevels[newLevel] >= loglevels.debug && consoleExists('debug')) {
          namespace[str] = env.debug;
        } else {
          namespace[str] = deferred.debug;
        }
      }
    });
  }


  setLogLevel(loglevel);

  try {
    if (typeof localStorage !== "undefined" && typeof localStorage.getItem === "function" && localStorage.getItem('gsb_frontend_loglevel')) {
      setLogLevel(localStorage.getItem('gsb_frontend_loglevel'));
    }
  } catch (e) {
    console.debug('Auslesen des Loglevels aus dem localStorage nicht möglich.', e);
  }

  namespace.flushHiddenMessages = flushHiddenMessages;
})(gsb);

    

  /* Ende logging */
  /* Start variables_LABELS */
  
    

    

        var SHARIFF_TITLE = 'Inhalte teilen';
    var SHARIFF_FORMLINKTEXT = 'per E-Mail';
    var SHARIFF_INFO_TITLE = 'Datenschutz';
    var SHOW_LESS = 'Weniger anzeigen';
    var SHOW_MORE = 'Mehr anzeigen';
    var CLOSE = 'Schlie&szlig;en';
    var NEXT = 'Nächste Seite';
    var BACK = 'Vorherige Seite';
    var NEXT_INACTIVE = 'Keine nächste Seite';
    var BACK_INACTIVE = 'Keine vorherige Seite';
    var PLAY = 'Animation starten';
    var PAUSE = 'Animation stoppen';
    var PAGE = 'Seite';
    var TRACKING_CONSENT = 'Erlauben';
    var TRACKING_DISSENT = 'Nicht erlauben';
    var CONSENT_LABEL = 'Aktivierung erforderlich';
    var CONSENT_DESCRIPTION  = 'Drittanbieter-Inhalte';
    var CONSENT_TEXT = 'Wir möchten Sie darauf hinweisen, dass nach der Aktivierung Daten an Drittanbieter übermittelt werden.';
    var CONSENT_BUTTON = 'Ich akzeptiere';
    var CONSENT_CHECKBOX_LABEL = 'Alle Inhalte von Drittanbietern akzeptieren';
    var SHOW_PAGE = 'Seite anzeigen';
    var ALL_SHOW = 'Alle öffnen';
    var ALL_HIDE = 'Alle schließen';
    var WOHNGELDRECHNER_HAUSHALTSMITGLIED_LABEL = 'Haushaltsmitglied';
    var INSTANT_SEARCH_LABEL = 'Alle Fragen und Antworten durchsuchen';
    var INSTANT_SEARCH_PLACEHOLDER = 'Suchen ...';
    var INSTANT_SEARCH_AMOUNT = 'Treffer mit dem Suchbegriff';

    

  /* Ende variables_LABELS */
  /* Start variables_IMG */
  
    

    

        var image_url_next = '/SiteGlobals/Frontend/Images/icons/next-upright.svg?__blob=normal&v=1';
    var image_url_back = '/SiteGlobals/Frontend/Images/icons/back-upright.svg?__blob=normal&v=1';
    var image_url_play = '/SiteGlobals/Frontend/Images/icons/play.svg?__blob=normal&v=1';
    var image_url_paused = '/SiteGlobals/Frontend/Images/icons/pause.svg?__blob=normal&v=1';
    var image_url_mejs_controls = '/SiteGlobals/Frontend/Images/icons/mediaelement/mejs-controls.svg?__blob=normal&v=1';
    var image_url_mejs_a11y_icons = '/SiteGlobals/Frontend/Images/icons/mediaelement/mejs-a11y-icons.svg?__blob=normal&v=1';

    

  /* Ende variables_IMG */
gsb.jsComponents = {
     config: {},
     definitions: {
       bundle_lightbox: {
         scriptList: [ 'https://www.bmwsb.bund.de/SiteGlobals/Frontend/JavaScript/init/bundle_lightbox.js?v=1' ]
       },
       bundle_multimedia: {
         scriptList: [ 'https://www.bmwsb.bund.de/SiteGlobals/Frontend/JavaScript/init/bundle_multimedia.js?v=1' ]
       },
       bundle_slideshow: {
         scriptList: [ 'https://www.bmwsb.bund.de/SiteGlobals/Frontend/JavaScript/init/bundle_slideshow.js?v=1' ]
       },
       bundle_map: {
         scriptList: [ 'https://www.bmwsb.bund.de/SiteGlobals/Frontend/JavaScript/init/bundle_map.js?v=2' ]
       },
       bundle_echarts: {
         scriptList: [ 'https://www.bmwsb.bund.de/SiteGlobals/Frontend/JavaScript/init/bundle_echarts.js?v=1' ]
       },
    }
};
   /* Start polyfills */
   
    

    

    /**
 * core-js 3.38.0
 * © 2014-2024 Denis Pushkarev (zloirock.ru)
 * license: https://github.com/zloirock/core-js/blob/v3.38.0/LICENSE
 * source: https://github.com/zloirock/core-js
 */
!function (undefined) { 'use strict'; /******/ (function(modules) { // webpackBootstrap
/******/   // The module cache
/******/   var installedModules = {};
/******/
/******/   // The require function
/******/   var __webpack_require__ = function (moduleId) {
/******/
/******/     // Check if module is in cache
/******/     if(installedModules[moduleId]) {
/******/       return installedModules[moduleId].exports;
/******/     }
/******/     // Create a new module (and put it into the cache)
/******/     var module = installedModules[moduleId] = {
/******/       i: moduleId,
/******/       l: false,
/******/       exports: {}
/******/     };
/******/
/******/     // Execute the module function
/******/     modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/     // Flag the module as loaded
/******/     module.l = true;
/******/
/******/     // Return the exports of the module
/******/     return module.exports;
/******/   }
/******/
/******/
/******/   // expose the modules object (__webpack_modules__)
/******/   __webpack_require__.m = modules;
/******/
/******/   // expose the module cache
/******/   __webpack_require__.c = installedModules;
/******/
/******/   // define getter function for harmony exports
/******/   __webpack_require__.d = function(exports, name, getter) {
/******/     if(!__webpack_require__.o(exports, name)) {
/******/       Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/     }
/******/   };
/******/
/******/   // define __esModule on exports
/******/   __webpack_require__.r = function(exports) {
/******/     if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/       Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/     }
/******/     Object.defineProperty(exports, '__esModule', { value: true });
/******/   };
/******/
/******/   // create a fake namespace object
/******/   // mode & 1: value is a module id, require it
/******/   // mode & 2: merge all properties of value into the ns
/******/   // mode & 4: return value when already ns object
/******/   // mode & 8|1: behave like require
/******/   __webpack_require__.t = function(value, mode) {
/******/     if(mode & 1) value = __webpack_require__(value);
/******/     if(mode & 8) return value;
/******/     if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/     var ns = Object.create(null);
/******/     __webpack_require__.r(ns);
/******/     Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/     if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/     return ns;
/******/   };
/******/
/******/   // getDefaultExport function for compatibility with non-harmony modules
/******/   __webpack_require__.n = function(module) {
/******/     var getter = module && module.__esModule ?
/******/       function getDefault() { return module['default']; } :
/******/       function getModuleExports() { return module; };
/******/     __webpack_require__.d(getter, 'a', getter);
/******/     return getter;
/******/   };
/******/
/******/   // Object.prototype.hasOwnProperty.call
/******/   __webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/   // __webpack_public_path__
/******/   __webpack_require__.p = "";
/******/
/******/
/******/   // Load entry module and return exports
/******/   return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
__webpack_require__(70);
__webpack_require__(82);
__webpack_require__(83);
__webpack_require__(85);
__webpack_require__(97);
__webpack_require__(99);
__webpack_require__(101);
__webpack_require__(103);
__webpack_require__(105);
__webpack_require__(107);
__webpack_require__(109);
__webpack_require__(124);
__webpack_require__(135);
__webpack_require__(140);
__webpack_require__(141);
__webpack_require__(144);
__webpack_require__(146);
__webpack_require__(148);
__webpack_require__(149);
__webpack_require__(150);
__webpack_require__(152);
__webpack_require__(153);
__webpack_require__(156);
__webpack_require__(159);
__webpack_require__(160);
__webpack_require__(165);
__webpack_require__(166);
__webpack_require__(169);
__webpack_require__(170);
__webpack_require__(171);
__webpack_require__(172);
__webpack_require__(174);
__webpack_require__(175);
__webpack_require__(177);
__webpack_require__(178);
__webpack_require__(179);
__webpack_require__(180);
__webpack_require__(181);
__webpack_require__(182);
__webpack_require__(183);
__webpack_require__(188);
__webpack_require__(208);
__webpack_require__(209);
__webpack_require__(211);
__webpack_require__(212);
__webpack_require__(218);
__webpack_require__(220);
__webpack_require__(221);
__webpack_require__(223);
__webpack_require__(224);
__webpack_require__(225);
__webpack_require__(226);
__webpack_require__(227);
__webpack_require__(229);
__webpack_require__(234);
__webpack_require__(235);
__webpack_require__(236);
__webpack_require__(237);
__webpack_require__(238);
__webpack_require__(239);
__webpack_require__(241);
__webpack_require__(242);
__webpack_require__(243);
__webpack_require__(244);
__webpack_require__(245);
__webpack_require__(246);
__webpack_require__(247);
__webpack_require__(248);
__webpack_require__(249);
__webpack_require__(250);
__webpack_require__(251);
__webpack_require__(254);
__webpack_require__(256);
__webpack_require__(258);
__webpack_require__(260);
__webpack_require__(261);
__webpack_require__(262);
__webpack_require__(263);
__webpack_require__(264);
__webpack_require__(265);
__webpack_require__(267);
__webpack_require__(269);
__webpack_require__(270);
__webpack_require__(271);
__webpack_require__(272);
__webpack_require__(273);
__webpack_require__(274);
__webpack_require__(276);
__webpack_require__(277);
__webpack_require__(278);
__webpack_require__(279);
__webpack_require__(281);
__webpack_require__(282);
__webpack_require__(283);
__webpack_require__(284);
__webpack_require__(285);
__webpack_require__(288);
__webpack_require__(289);
__webpack_require__(290);
__webpack_require__(291);
__webpack_require__(292);
__webpack_require__(293);
__webpack_require__(294);
__webpack_require__(295);
__webpack_require__(297);
__webpack_require__(298);
__webpack_require__(299);
__webpack_require__(300);
__webpack_require__(301);
__webpack_require__(302);
__webpack_require__(304);
__webpack_require__(305);
__webpack_require__(306);
__webpack_require__(311);
__webpack_require__(312);
__webpack_require__(314);
__webpack_require__(315);
__webpack_require__(316);
__webpack_require__(317);
__webpack_require__(318);
__webpack_require__(319);
__webpack_require__(320);
__webpack_require__(321);
__webpack_require__(322);
__webpack_require__(327);
__webpack_require__(328);
__webpack_require__(329);
__webpack_require__(332);
__webpack_require__(333);
__webpack_require__(334);
__webpack_require__(335);
__webpack_require__(336);
__webpack_require__(337);
__webpack_require__(338);
__webpack_require__(339);
__webpack_require__(340);
__webpack_require__(341);
__webpack_require__(342);
__webpack_require__(343);
__webpack_require__(344);
__webpack_require__(345);
__webpack_require__(346);
__webpack_require__(347);
__webpack_require__(349);
__webpack_require__(351);
__webpack_require__(352);
__webpack_require__(355);
__webpack_require__(359);
__webpack_require__(360);
__webpack_require__(361);
__webpack_require__(363);
__webpack_require__(364);
__webpack_require__(366);
__webpack_require__(367);
__webpack_require__(368);
__webpack_require__(369);
__webpack_require__(370);
__webpack_require__(371);
__webpack_require__(372);
__webpack_require__(373);
__webpack_require__(377);
__webpack_require__(381);
__webpack_require__(382);
__webpack_require__(383);
__webpack_require__(386);
__webpack_require__(387);
__webpack_require__(395);
__webpack_require__(397);
__webpack_require__(399);
__webpack_require__(400);
__webpack_require__(401);
__webpack_require__(402);
__webpack_require__(404);
__webpack_require__(405);
__webpack_require__(406);
__webpack_require__(407);
__webpack_require__(408);
__webpack_require__(411);
__webpack_require__(412);
module.exports = __webpack_require__(413);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var toObject = __webpack_require__(38);
var lengthOfArrayLike = __webpack_require__(62);
var setArrayLength = __webpack_require__(67);
var doesNotExceedSafeInteger = __webpack_require__(69);
var fails = __webpack_require__(6);

var INCORRECT_TO_LENGTH = fails(function () {
  return [].push.call({ length: 0x100000000 }, 1) !== 4294967297;
});

// V8 <= 121 and Safari <= 15.4; FF < 23 throws InternalError
// https://bugs.chromium.org/p/v8/issues/detail?id=12681
var properErrorOnNonWritableLength = function () {
  try {
    // eslint-disable-next-line es/no-object-defineproperty -- safe
    Object.defineProperty([], 'length', { writable: false }).push();
  } catch (error) {
    return error instanceof TypeError;
  }
};

var FORCED = INCORRECT_TO_LENGTH || !properErrorOnNonWritableLength();

// `Array.prototype.push` method
// https://tc39.es/ecma262/#sec-array.prototype.push
$({ target: 'Array', proto: true, arity: 1, forced: FORCED }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  push: function push(item) {
    var O = toObject(this);
    var len = lengthOfArrayLike(O);
    var argCount = arguments.length;
    doesNotExceedSafeInteger(len + argCount);
    for (var i = 0; i < argCount; i++) {
      O[len] = arguments[i];
      len++;
    }
    setArrayLength(O, len);
    return len;
  }
});


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var globalThis = __webpack_require__(3);
var getOwnPropertyDescriptor = __webpack_require__(4).f;
var createNonEnumerableProperty = __webpack_require__(42);
var defineBuiltIn = __webpack_require__(46);
var defineGlobalProperty = __webpack_require__(36);
var copyConstructorProperties = __webpack_require__(54);
var isForced = __webpack_require__(66);

/*
  options.target         - name of the target object
  options.global         - target is the global object
  options.stat           - export as static methods of target
  options.proto          - export as prototype methods of target
  options.real           - real prototype method for the `pure` version
  options.forced         - export even if the native feature is available
  options.bind           - bind methods to the target, required for the `pure` version
  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
  options.sham           - add a flag to not completely full polyfills
  options.enumerable     - export as enumerable property
  options.dontCallGetSet - prevent calling a getter on target
  options.name           - the .name of the function if it does not match the key
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = globalThis;
  } else if (STATIC) {
    target = globalThis[TARGET] || defineGlobalProperty(TARGET, {});
  } else {
    target = globalThis[TARGET] && globalThis[TARGET].prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.dontCallGetSet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty == typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    defineBuiltIn(target, key, sourceProperty, options);
  }
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var check = function (it) {
  return it && it.Math === Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof global == 'object' && global) ||
  check(typeof this == 'object' && this) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || Function('return this')();


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var DESCRIPTORS = __webpack_require__(5);
var call = __webpack_require__(7);
var propertyIsEnumerableModule = __webpack_require__(9);
var createPropertyDescriptor = __webpack_require__(10);
var toIndexedObject = __webpack_require__(11);
var toPropertyKey = __webpack_require__(17);
var hasOwn = __webpack_require__(37);
var IE8_DOM_DEFINE = __webpack_require__(40);

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPropertyKey(P);
  if (IE8_DOM_DEFINE) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (hasOwn(O, P)) return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__(6);

// Detect IE8's incomplete defineProperty implementation
module.exports = !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] !== 7;
});


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var NATIVE_BIND = __webpack_require__(8);

var call = Function.prototype.call;

module.exports = NATIVE_BIND ? call.bind(call) : function () {
  return call.apply(call, arguments);
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__(6);

module.exports = !fails(function () {
  // eslint-disable-next-line es/no-function-prototype-bind -- safe
  var test = (function () { /* empty */ }).bind();
  // eslint-disable-next-line no-prototype-builtins -- safe
  return typeof test != 'function' || test.hasOwnProperty('prototype');
});


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__(12);
var requireObjectCoercible = __webpack_require__(15);

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var uncurryThis = __webpack_require__(13);
var fails = __webpack_require__(6);
var classof = __webpack_require__(14);

var $Object = Object;
var split = uncurryThis(''.split);

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !$Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) === 'String' ? split(it, '') : $Object(it);
} : $Object;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var NATIVE_BIND = __webpack_require__(8);

var FunctionPrototype = Function.prototype;
var call = FunctionPrototype.call;
var uncurryThisWithBind = NATIVE_BIND && FunctionPrototype.bind.bind(call, call);

module.exports = NATIVE_BIND ? uncurryThisWithBind : function (fn) {
  return function () {
    return call.apply(fn, arguments);
  };
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var uncurryThis = __webpack_require__(13);

var toString = uncurryThis({}.toString);
var stringSlice = uncurryThis(''.slice);

module.exports = function (it) {
  return stringSlice(toString(it), 8, -1);
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var isNullOrUndefined = __webpack_require__(16);

var $TypeError = TypeError;

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (isNullOrUndefined(it)) throw new $TypeError("Can't call method on " + it);
  return it;
};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// we can't use just `it == null` since of `document.all` special case
// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
module.exports = function (it) {
  return it === null || it === undefined;
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toPrimitive = __webpack_require__(18);
var isSymbol = __webpack_require__(21);

// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
module.exports = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol(key) ? key : key + '';
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var call = __webpack_require__(7);
var isObject = __webpack_require__(19);
var isSymbol = __webpack_require__(21);
var getMethod = __webpack_require__(28);
var ordinaryToPrimitive = __webpack_require__(31);
var wellKnownSymbol = __webpack_require__(32);

var $TypeError = TypeError;
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
module.exports = function (input, pref) {
  if (!isObject(input) || isSymbol(input)) return input;
  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
  var result;
  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = call(exoticToPrim, input, pref);
    if (!isObject(result) || isSymbol(result)) return result;
    throw new $TypeError("Can't convert object to primitive value");
  }
  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var isCallable = __webpack_require__(20);

module.exports = function (it) {
  return typeof it == 'object' ? it !== null : isCallable(it);
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
var documentAll = typeof document == 'object' && document.all;

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
// eslint-disable-next-line unicorn/no-typeof-undefined -- required for testing
module.exports = typeof documentAll == 'undefined' && documentAll !== undefined ? function (argument) {
  return typeof argument == 'function' || argument === documentAll;
} : function (argument) {
  return typeof argument == 'function';
};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var getBuiltIn = __webpack_require__(22);
var isCallable = __webpack_require__(20);
var isPrototypeOf = __webpack_require__(23);
var USE_SYMBOL_AS_UID = __webpack_require__(24);

var $Object = Object;

module.exports = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn('Symbol');
  return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, $Object(it));
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var globalThis = __webpack_require__(3);
var isCallable = __webpack_require__(20);

var aFunction = function (argument) {
  return isCallable(argument) ? argument : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(globalThis[namespace]) : globalThis[namespace] && globalThis[namespace][method];
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var uncurryThis = __webpack_require__(13);

module.exports = uncurryThis({}.isPrototypeOf);


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* eslint-disable es/no-symbol -- required for testing */
var NATIVE_SYMBOL = __webpack_require__(25);

module.exports = NATIVE_SYMBOL
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* eslint-disable es/no-symbol -- required for testing */
var V8_VERSION = __webpack_require__(26);
var fails = __webpack_require__(6);
var globalThis = __webpack_require__(3);

var $String = globalThis.String;

// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  var symbol = Symbol('symbol detection');
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  // nb: Do not call `String` directly to avoid this being optimized out to `symbol+''` which will,
  // of course, fail.
  return !$String(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var globalThis = __webpack_require__(3);
var userAgent = __webpack_require__(27);

var process = globalThis.process;
var Deno = globalThis.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  // but their correct versions are not interesting for us
  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
}

// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0
if (!version && userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = +match[1];
  }
}

module.exports = version;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var globalThis = __webpack_require__(3);

var navigator = globalThis.navigator;
var userAgent = navigator && navigator.userAgent;

module.exports = userAgent ? String(userAgent) : '';


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var aCallable = __webpack_require__(29);
var isNullOrUndefined = __webpack_require__(16);

// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
module.exports = function (V, P) {
  var func = V[P];
  return isNullOrUndefined(func) ? undefined : aCallable(func);
};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var isCallable = __webpack_require__(20);
var tryToString = __webpack_require__(30);

var $TypeError = TypeError;

// `Assert: IsCallable(argument) is true`
module.exports = function (argument) {
  if (isCallable(argument)) return argument;
  throw new $TypeError(tryToString(argument) + ' is not a function');
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $String = String;

module.exports = function (argument) {
  try {
    return $String(argument);
  } catch (error) {
    return 'Object';
  }
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var call = __webpack_require__(7);
var isCallable = __webpack_require__(20);
var isObject = __webpack_require__(19);

var $TypeError = TypeError;

// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
module.exports = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  if (isCallable(fn = input.valueOf) && !isObject(val = call(fn, input))) return val;
  if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  throw new $TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var globalThis = __webpack_require__(3);
var shared = __webpack_require__(33);
var hasOwn = __webpack_require__(37);
var uid = __webpack_require__(39);
var NATIVE_SYMBOL = __webpack_require__(25);
var USE_SYMBOL_AS_UID = __webpack_require__(24);

var Symbol = globalThis.Symbol;
var WellKnownSymbolsStore = shared('wks');
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol['for'] || Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!hasOwn(WellKnownSymbolsStore, name)) {
    WellKnownSymbolsStore[name] = NATIVE_SYMBOL && hasOwn(Symbol, name)
      ? Symbol[name]
      : createWellKnownSymbol('Symbol.' + name);
  } return WellKnownSymbolsStore[name];
};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var store = __webpack_require__(34);

module.exports = function (key, value) {
  return store[key] || (store[key] = value || {});
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var IS_PURE = __webpack_require__(35);
var globalThis = __webpack_require__(3);
var defineGlobalProperty = __webpack_require__(36);

var SHARED = '__core-js_shared__';
var store = module.exports = globalThis[SHARED] || defineGlobalProperty(SHARED, {});

(store.versions || (store.versions = [])).push({
  version: '3.38.0',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2014-2024 Denis Pushkarev (zloirock.ru)',
  license: 'https://github.com/zloirock/core-js/blob/v3.38.0/LICENSE',
  source: 'https://github.com/zloirock/core-js'
});


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = false;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var globalThis = __webpack_require__(3);

// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;

module.exports = function (key, value) {
  try {
    defineProperty(globalThis, key, { value: value, configurable: true, writable: true });
  } catch (error) {
    globalThis[key] = value;
  } return value;
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var uncurryThis = __webpack_require__(13);
var toObject = __webpack_require__(38);

var hasOwnProperty = uncurryThis({}.hasOwnProperty);

// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
// eslint-disable-next-line es/no-object-hasown -- safe
module.exports = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject(it), key);
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var requireObjectCoercible = __webpack_require__(15);

var $Object = Object;

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
module.exports = function (argument) {
  return $Object(requireObjectCoercible(argument));
};


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var uncurryThis = __webpack_require__(13);

var id = 0;
var postfix = Math.random();
var toString = uncurryThis(1.0.toString);

module.exports = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var DESCRIPTORS = __webpack_require__(5);
var fails = __webpack_require__(6);
var createElement = __webpack_require__(41);

// Thanks to IE8 for its funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a !== 7;
});


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var globalThis = __webpack_require__(3);
var isObject = __webpack_require__(19);

var document = globalThis.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var DESCRIPTORS = __webpack_require__(5);
var definePropertyModule = __webpack_require__(43);
var createPropertyDescriptor = __webpack_require__(10);

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var DESCRIPTORS = __webpack_require__(5);
var IE8_DOM_DEFINE = __webpack_require__(40);
var V8_PROTOTYPE_DEFINE_BUG = __webpack_require__(44);
var anObject = __webpack_require__(45);
var toPropertyKey = __webpack_require__(17);

var $TypeError = TypeError;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ENUMERABLE = 'enumerable';
var CONFIGURABLE = 'configurable';
var WRITABLE = 'writable';

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
    var current = $getOwnPropertyDescriptor(O, P);
    if (current && current[WRITABLE]) {
      O[P] = Attributes.value;
      Attributes = {
        configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
        writable: false
      };
    }
  } return $defineProperty(O, P, Attributes);
} : $defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw new $TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var DESCRIPTORS = __webpack_require__(5);
var fails = __webpack_require__(6);

// V8 ~ Chrome 36-
// https://bugs.chromium.org/p/v8/issues/detail?id=3334
module.exports = DESCRIPTORS && fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
    value: 42,
    writable: false
  }).prototype !== 42;
});


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var isObject = __webpack_require__(19);

var $String = String;
var $TypeError = TypeError;

// `Assert: Type(argument) is Object`
module.exports = function (argument) {
  if (isObject(argument)) return argument;
  throw new $TypeError($String(argument) + ' is not an object');
};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var isCallable = __webpack_require__(20);
var definePropertyModule = __webpack_require__(43);
var makeBuiltIn = __webpack_require__(47);
var defineGlobalProperty = __webpack_require__(36);

module.exports = function (O, key, value, options) {
  if (!options) options = {};
  var simple = options.enumerable;
  var name = options.name !== undefined ? options.name : key;
  if (isCallable(value)) makeBuiltIn(value, name, options);
  if (options.global) {
    if (simple) O[key] = value;
    else defineGlobalProperty(key, value);
  } else {
    try {
      if (!options.unsafe) delete O[key];
      else if (O[key]) simple = true;
    } catch (error) { /* empty */ }
    if (simple) O[key] = value;
    else definePropertyModule.f(O, key, {
      value: value,
      enumerable: false,
      configurable: !options.nonConfigurable,
      writable: !options.nonWritable
    });
  } return O;
};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var uncurryThis = __webpack_require__(13);
var fails = __webpack_require__(6);
var isCallable = __webpack_require__(20);
var hasOwn = __webpack_require__(37);
var DESCRIPTORS = __webpack_require__(5);
var CONFIGURABLE_FUNCTION_NAME = __webpack_require__(48).CONFIGURABLE;
var inspectSource = __webpack_require__(49);
var InternalStateModule = __webpack_require__(50);

var enforceInternalState = InternalStateModule.enforce;
var getInternalState = InternalStateModule.get;
var $String = String;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;
var stringSlice = uncurryThis(''.slice);
var replace = uncurryThis(''.replace);
var join = uncurryThis([].join);

var CONFIGURABLE_LENGTH = DESCRIPTORS && !fails(function () {
  return defineProperty(function () { /* empty */ }, 'length', { value: 8 }).length !== 8;
});

var TEMPLATE = String(String).split('String');

var makeBuiltIn = module.exports = function (value, name, options) {
  if (stringSlice($String(name), 0, 7) === 'Symbol(') {
    name = '[' + replace($String(name), /^Symbol\(([^)]*)\).*$/, '$1') + ']';
  }
  if (options && options.getter) name = 'get ' + name;
  if (options && options.setter) name = 'set ' + name;
  if (!hasOwn(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
    if (DESCRIPTORS) defineProperty(value, 'name', { value: name, configurable: true });
    else value.name = name;
  }
  if (CONFIGURABLE_LENGTH && options && hasOwn(options, 'arity') && value.length !== options.arity) {
    defineProperty(value, 'length', { value: options.arity });
  }
  try {
    if (options && hasOwn(options, 'constructor') && options.constructor) {
      if (DESCRIPTORS) defineProperty(value, 'prototype', { writable: false });
    // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
    } else if (value.prototype) value.prototype = undefined;
  } catch (error) { /* empty */ }
  var state = enforceInternalState(value);
  if (!hasOwn(state, 'source')) {
    state.source = join(TEMPLATE, typeof name == 'string' ? name : '');
  } return value;
};

// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
// eslint-disable-next-line no-extend-native -- required
Function.prototype.toString = makeBuiltIn(function toString() {
  return isCallable(this) && getInternalState(this).source || inspectSource(this);
}, 'toString');


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var DESCRIPTORS = __webpack_require__(5);
var hasOwn = __webpack_require__(37);

var FunctionPrototype = Function.prototype;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;

var EXISTS = hasOwn(FunctionPrototype, 'name');
// additional protection from minified / mangled / dropped function names
var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
var CONFIGURABLE = EXISTS && (!DESCRIPTORS || (DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable));

module.exports = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var uncurryThis = __webpack_require__(13);
var isCallable = __webpack_require__(20);
var store = __webpack_require__(34);

var functionToString = uncurryThis(Function.toString);

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!isCallable(store.inspectSource)) {
  store.inspectSource = function (it) {
    return functionToString(it);
  };
}

module.exports = store.inspectSource;


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var NATIVE_WEAK_MAP = __webpack_require__(51);
var globalThis = __webpack_require__(3);
var isObject = __webpack_require__(19);
var createNonEnumerableProperty = __webpack_require__(42);
var hasOwn = __webpack_require__(37);
var shared = __webpack_require__(34);
var sharedKey = __webpack_require__(52);
var hiddenKeys = __webpack_require__(53);

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var TypeError = globalThis.TypeError;
var WeakMap = globalThis.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw new TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap());
  /* eslint-disable no-self-assign -- prototype methods protection */
  store.get = store.get;
  store.has = store.has;
  store.set = store.set;
  /* eslint-enable no-self-assign -- prototype methods protection */
  set = function (it, metadata) {
    if (store.has(it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    store.set(it, metadata);
    return metadata;
  };
  get = function (it) {
    return store.get(it) || {};
  };
  has = function (it) {
    return store.has(it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    if (hasOwn(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return hasOwn(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return hasOwn(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var globalThis = __webpack_require__(3);
var isCallable = __webpack_require__(20);

var WeakMap = globalThis.WeakMap;

module.exports = isCallable(WeakMap) && /native code/.test(String(WeakMap));


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var shared = __webpack_require__(33);
var uid = __webpack_require__(39);

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = {};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var hasOwn = __webpack_require__(37);
var ownKeys = __webpack_require__(55);
var getOwnPropertyDescriptorModule = __webpack_require__(4);
var definePropertyModule = __webpack_require__(43);

module.exports = function (target, source, exceptions) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!hasOwn(target, key) && !(exceptions && hasOwn(exceptions, key))) {
      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  }
};


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var getBuiltIn = __webpack_require__(22);
var uncurryThis = __webpack_require__(13);
var getOwnPropertyNamesModule = __webpack_require__(56);
var getOwnPropertySymbolsModule = __webpack_require__(65);
var anObject = __webpack_require__(45);

var concat = uncurryThis([].concat);

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
};


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var internalObjectKeys = __webpack_require__(57);
var enumBugKeys = __webpack_require__(64);

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var uncurryThis = __webpack_require__(13);
var hasOwn = __webpack_require__(37);
var toIndexedObject = __webpack_require__(11);
var indexOf = __webpack_require__(58).indexOf;
var hiddenKeys = __webpack_require__(53);

var push = uncurryThis([].push);

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (hasOwn(O, key = names[i++])) {
    ~indexOf(result, key) || push(result, key);
  }
  return result;
};


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toIndexedObject = __webpack_require__(11);
var toAbsoluteIndex = __webpack_require__(59);
var lengthOfArrayLike = __webpack_require__(62);

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = lengthOfArrayLike(O);
    if (length === 0) return !IS_INCLUDES && -1;
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el !== el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value !== value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toIntegerOrInfinity = __webpack_require__(60);

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toIntegerOrInfinity(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var trunc = __webpack_require__(61);

// `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity
module.exports = function (argument) {
  var number = +argument;
  // eslint-disable-next-line no-self-compare -- NaN check
  return number !== number || number === 0 ? 0 : trunc(number);
};


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ceil = Math.ceil;
var floor = Math.floor;

// `Math.trunc` method
// https://tc39.es/ecma262/#sec-math.trunc
// eslint-disable-next-line es/no-math-trunc -- safe
module.exports = Math.trunc || function trunc(x) {
  var n = +x;
  return (n > 0 ? floor : ceil)(n);
};


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toLength = __webpack_require__(63);

// `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike
module.exports = function (obj) {
  return toLength(obj.length);
};


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toIntegerOrInfinity = __webpack_require__(60);

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
module.exports = function (argument) {
  var len = toIntegerOrInfinity(argument);
  return len > 0 ? min(len, 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__(6);
var isCallable = __webpack_require__(20);

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value === POLYFILL ? true
    : value === NATIVE ? false
    : isCallable(detection) ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var DESCRIPTORS = __webpack_require__(5);
var isArray = __webpack_require__(68);

var $TypeError = TypeError;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Safari < 13 does not throw an error in this case
var SILENT_ON_NON_WRITABLE_LENGTH_SET = DESCRIPTORS && !function () {
  // makes no sense without proper strict mode support
  if (this !== undefined) return true;
  try {
    // eslint-disable-next-line es/no-object-defineproperty -- safe
    Object.defineProperty([], 'length', { writable: false }).length = 1;
  } catch (error) {
    return error instanceof TypeError;
  }
}();

module.exports = SILENT_ON_NON_WRITABLE_LENGTH_SET ? function (O, length) {
  if (isArray(O) && !getOwnPropertyDescriptor(O, 'length').writable) {
    throw new $TypeError('Cannot set read only .length');
  } return O.length = length;
} : function (O, length) {
  return O.length = length;
};


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var classof = __webpack_require__(14);

// `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es/no-array-isarray -- safe
module.exports = Array.isArray || function isArray(argument) {
  return classof(argument) === 'Array';
};


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $TypeError = TypeError;
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF; // 2 ** 53 - 1 == 9007199254740991

module.exports = function (it) {
  if (it > MAX_SAFE_INTEGER) throw $TypeError('Maximum allowed index exceeded');
  return it;
};


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var uncurryThis = __webpack_require__(13);
var aCallable = __webpack_require__(29);
var requireObjectCoercible = __webpack_require__(15);
var iterate = __webpack_require__(71);
var MapHelpers = __webpack_require__(81);
var IS_PURE = __webpack_require__(35);
var fails = __webpack_require__(6);

var Map = MapHelpers.Map;
var has = MapHelpers.has;
var get = MapHelpers.get;
var set = MapHelpers.set;
var push = uncurryThis([].push);

var DOES_NOT_WORK_WITH_PRIMITIVES = IS_PURE || fails(function () {
  return Map.groupBy('ab', function (it) {
    return it;
  }).get('a').length !== 1;
});

// `Map.groupBy` method
// https://github.com/tc39/proposal-array-grouping
$({ target: 'Map', stat: true, forced: IS_PURE || DOES_NOT_WORK_WITH_PRIMITIVES }, {
  groupBy: function groupBy(items, callbackfn) {
    requireObjectCoercible(items);
    aCallable(callbackfn);
    var map = new Map();
    var k = 0;
    iterate(items, function (value) {
      var key = callbackfn(value, k++);
      if (!has(map, key)) set(map, key, [value]);
      else push(get(map, key), value);
    });
    return map;
  }
});


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var bind = __webpack_require__(72);
var call = __webpack_require__(7);
var anObject = __webpack_require__(45);
var tryToString = __webpack_require__(30);
var isArrayIteratorMethod = __webpack_require__(74);
var lengthOfArrayLike = __webpack_require__(62);
var isPrototypeOf = __webpack_require__(23);
var getIterator = __webpack_require__(76);
var getIteratorMethod = __webpack_require__(77);
var iteratorClose = __webpack_require__(80);

var $TypeError = TypeError;

var Result = function (stopped, result) {
  this.stopped = stopped;
  this.result = result;
};

var ResultPrototype = Result.prototype;

module.exports = function (iterable, unboundFunction, options) {
  var that = options && options.that;
  var AS_ENTRIES = !!(options && options.AS_ENTRIES);
  var IS_RECORD = !!(options && options.IS_RECORD);
  var IS_ITERATOR = !!(options && options.IS_ITERATOR);
  var INTERRUPTED = !!(options && options.INTERRUPTED);
  var fn = bind(unboundFunction, that);
  var iterator, iterFn, index, length, result, next, step;

  var stop = function (condition) {
    if (iterator) iteratorClose(iterator, 'normal', condition);
    return new Result(true, condition);
  };

  var callFn = function (value) {
    if (AS_ENTRIES) {
      anObject(value);
      return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
    } return INTERRUPTED ? fn(value, stop) : fn(value);
  };

  if (IS_RECORD) {
    iterator = iterable.iterator;
  } else if (IS_ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod(iterable);
    if (!iterFn) throw new $TypeError(tryToString(iterable) + ' is not iterable');
    // optimisation for array iterators
    if (isArrayIteratorMethod(iterFn)) {
      for (index = 0, length = lengthOfArrayLike(iterable); length > index; index++) {
        result = callFn(iterable[index]);
        if (result && isPrototypeOf(ResultPrototype, result)) return result;
      } return new Result(false);
    }
    iterator = getIterator(iterable, iterFn);
  }

  next = IS_RECORD ? iterable.next : iterator.next;
  while (!(step = call(next, iterator)).done) {
    try {
      result = callFn(step.value);
    } catch (error) {
      iteratorClose(iterator, 'throw', error);
    }
    if (typeof result == 'object' && result && isPrototypeOf(ResultPrototype, result)) return result;
  } return new Result(false);
};


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var uncurryThis = __webpack_require__(73);
var aCallable = __webpack_require__(29);
var NATIVE_BIND = __webpack_require__(8);

var bind = uncurryThis(uncurryThis.bind);

// optional / simple context binding
module.exports = function (fn, that) {
  aCallable(fn);
  return that === undefined ? fn : NATIVE_BIND ? bind(fn, that) : function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var classofRaw = __webpack_require__(14);
var uncurryThis = __webpack_require__(13);

module.exports = function (fn) {
  // Nashorn bug:
  //   https://github.com/zloirock/core-js/issues/1128
  //   https://github.com/zloirock/core-js/issues/1130
  if (classofRaw(fn) === 'Function') return uncurryThis(fn);
};


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var wellKnownSymbol = __webpack_require__(32);
var Iterators = __webpack_require__(75);

var ITERATOR = wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype;

// check on default Array iterator
module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
};


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = {};


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var call = __webpack_require__(7);
var aCallable = __webpack_require__(29);
var anObject = __webpack_require__(45);
var tryToString = __webpack_require__(30);
var getIteratorMethod = __webpack_require__(77);

var $TypeError = TypeError;

module.exports = function (argument, usingIterator) {
  var iteratorMethod = arguments.length < 2 ? getIteratorMethod(argument) : usingIterator;
  if (aCallable(iteratorMethod)) return anObject(call(iteratorMethod, argument));
  throw new $TypeError(tryToString(argument) + ' is not iterable');
};


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var classof = __webpack_require__(78);
var getMethod = __webpack_require__(28);
var isNullOrUndefined = __webpack_require__(16);
var Iterators = __webpack_require__(75);
var wellKnownSymbol = __webpack_require__(32);

var ITERATOR = wellKnownSymbol('iterator');

module.exports = function (it) {
  if (!isNullOrUndefined(it)) return getMethod(it, ITERATOR)
    || getMethod(it, '@@iterator')
    || Iterators[classof(it)];
};


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var TO_STRING_TAG_SUPPORT = __webpack_require__(79);
var isCallable = __webpack_require__(20);
var classofRaw = __webpack_require__(14);
var wellKnownSymbol = __webpack_require__(32);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var $Object = Object;

// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) === 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = $Object(it), TO_STRING_TAG)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) === 'Object' && isCallable(O.callee) ? 'Arguments' : result;
};


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var wellKnownSymbol = __webpack_require__(32);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG] = 'z';

module.exports = String(test) === '[object z]';


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var call = __webpack_require__(7);
var anObject = __webpack_require__(45);
var getMethod = __webpack_require__(28);

module.exports = function (iterator, kind, value) {
  var innerResult, innerError;
  anObject(iterator);
  try {
    innerResult = getMethod(iterator, 'return');
    if (!innerResult) {
      if (kind === 'throw') throw value;
      return value;
    }
    innerResult = call(innerResult, iterator);
  } catch (error) {
    innerError = true;
    innerResult = error;
  }
  if (kind === 'throw') throw value;
  if (innerError) throw innerResult;
  anObject(innerResult);
  return value;
};


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var uncurryThis = __webpack_require__(13);

// eslint-disable-next-line es/no-map -- safe
var MapPrototype = Map.prototype;

module.exports = {
  // eslint-disable-next-line es/no-map -- safe
  Map: Map,
  set: uncurryThis(MapPrototype.set),
  get: uncurryThis(MapPrototype.get),
  has: uncurryThis(MapPrototype.has),
  remove: uncurryThis(MapPrototype['delete']),
  proto: MapPrototype
};


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var getBuiltIn = __webpack_require__(22);
var uncurryThis = __webpack_require__(13);
var aCallable = __webpack_require__(29);
var requireObjectCoercible = __webpack_require__(15);
var toPropertyKey = __webpack_require__(17);
var iterate = __webpack_require__(71);
var fails = __webpack_require__(6);

// eslint-disable-next-line es/no-object-groupby -- testing
var nativeGroupBy = Object.groupBy;
var create = getBuiltIn('Object', 'create');
var push = uncurryThis([].push);

var DOES_NOT_WORK_WITH_PRIMITIVES = !nativeGroupBy || fails(function () {
  return nativeGroupBy('ab', function (it) {
    return it;
  }).a.length !== 1;
});

// `Object.groupBy` method
// https://github.com/tc39/proposal-array-grouping
$({ target: 'Object', stat: true, forced: DOES_NOT_WORK_WITH_PRIMITIVES }, {
  groupBy: function groupBy(items, callbackfn) {
    requireObjectCoercible(items);
    aCallable(callbackfn);
    var obj = create(null);
    var k = 0;
    iterate(items, function (value) {
      var key = toPropertyKey(callbackfn(value, k++));
      // in some IE versions, `hasOwnProperty` returns incorrect result on integer keys
      // but since it's a `null` prototype object, we can safely use `in`
      if (key in obj) push(obj[key], value);
      else obj[key] = [value];
    });
    return obj;
  }
});


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var newPromiseCapabilityModule = __webpack_require__(84);

// `Promise.withResolvers` method
// https://github.com/tc39/proposal-promise-with-resolvers
$({ target: 'Promise', stat: true }, {
  withResolvers: function withResolvers() {
    var promiseCapability = newPromiseCapabilityModule.f(this);
    return {
      promise: promiseCapability.promise,
      resolve: promiseCapability.resolve,
      reject: promiseCapability.reject
    };
  }
});


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var aCallable = __webpack_require__(29);

var $TypeError = TypeError;

var PromiseCapability = function (C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw new $TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aCallable(resolve);
  this.reject = aCallable(reject);
};

// `NewPromiseCapability` abstract operation
// https://tc39.es/ecma262/#sec-newpromisecapability
module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var difference = __webpack_require__(86);
var setMethodAcceptSetLike = __webpack_require__(96);

// `Set.prototype.difference` method
// https://github.com/tc39/proposal-set-methods
$({ target: 'Set', proto: true, real: true, forced: !setMethodAcceptSetLike('difference') }, {
  difference: difference
});


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var aSet = __webpack_require__(87);
var SetHelpers = __webpack_require__(88);
var clone = __webpack_require__(89);
var size = __webpack_require__(92);
var getSetRecord = __webpack_require__(94);
var iterateSet = __webpack_require__(90);
var iterateSimple = __webpack_require__(91);

var has = SetHelpers.has;
var remove = SetHelpers.remove;

// `Set.prototype.difference` method
// https://github.com/tc39/proposal-set-methods
module.exports = function difference(other) {
  var O = aSet(this);
  var otherRec = getSetRecord(other);
  var result = clone(O);
  if (size(O) <= otherRec.size) iterateSet(O, function (e) {
    if (otherRec.includes(e)) remove(result, e);
  });
  else iterateSimple(otherRec.getIterator(), function (e) {
    if (has(O, e)) remove(result, e);
  });
  return result;
};


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var has = __webpack_require__(88).has;

// Perform ? RequireInternalSlot(M, [[SetData]])
module.exports = function (it) {
  has(it);
  return it;
};


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var uncurryThis = __webpack_require__(13);

// eslint-disable-next-line es/no-set -- safe
var SetPrototype = Set.prototype;

module.exports = {
  // eslint-disable-next-line es/no-set -- safe
  Set: Set,
  add: uncurryThis(SetPrototype.add),
  has: uncurryThis(SetPrototype.has),
  remove: uncurryThis(SetPrototype['delete']),
  proto: SetPrototype
};


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var SetHelpers = __webpack_require__(88);
var iterate = __webpack_require__(90);

var Set = SetHelpers.Set;
var add = SetHelpers.add;

module.exports = function (set) {
  var result = new Set();
  iterate(set, function (it) {
    add(result, it);
  });
  return result;
};


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var uncurryThis = __webpack_require__(13);
var iterateSimple = __webpack_require__(91);
var SetHelpers = __webpack_require__(88);

var Set = SetHelpers.Set;
var SetPrototype = SetHelpers.proto;
var forEach = uncurryThis(SetPrototype.forEach);
var keys = uncurryThis(SetPrototype.keys);
var next = keys(new Set()).next;

module.exports = function (set, fn, interruptible) {
  return interruptible ? iterateSimple({ iterator: keys(set), next: next }, fn) : forEach(set, fn);
};


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var call = __webpack_require__(7);

module.exports = function (record, fn, ITERATOR_INSTEAD_OF_RECORD) {
  var iterator = ITERATOR_INSTEAD_OF_RECORD ? record : record.iterator;
  var next = record.next;
  var step, result;
  while (!(step = call(next, iterator)).done) {
    result = fn(step.value);
    if (result !== undefined) return result;
  }
};


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var uncurryThisAccessor = __webpack_require__(93);
var SetHelpers = __webpack_require__(88);

module.exports = uncurryThisAccessor(SetHelpers.proto, 'size', 'get') || function (set) {
  return set.size;
};


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var uncurryThis = __webpack_require__(13);
var aCallable = __webpack_require__(29);

module.exports = function (object, key, method) {
  try {
    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    return uncurryThis(aCallable(Object.getOwnPropertyDescriptor(object, key)[method]));
  } catch (error) { /* empty */ }
};


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var aCallable = __webpack_require__(29);
var anObject = __webpack_require__(45);
var call = __webpack_require__(7);
var toIntegerOrInfinity = __webpack_require__(60);
var getIteratorDirect = __webpack_require__(95);

var INVALID_SIZE = 'Invalid size';
var $RangeError = RangeError;
var $TypeError = TypeError;
var max = Math.max;

var SetRecord = function (set, intSize) {
  this.set = set;
  this.size = max(intSize, 0);
  this.has = aCallable(set.has);
  this.keys = aCallable(set.keys);
};

SetRecord.prototype = {
  getIterator: function () {
    return getIteratorDirect(anObject(call(this.keys, this.set)));
  },
  includes: function (it) {
    return call(this.has, this.set, it);
  }
};

// `GetSetRecord` abstract operation
// https://tc39.es/proposal-set-methods/#sec-getsetrecord
module.exports = function (obj) {
  anObject(obj);
  var numSize = +obj.size;
  // NOTE: If size is undefined, then numSize will be NaN
  // eslint-disable-next-line no-self-compare -- NaN check
  if (numSize !== numSize) throw new $TypeError(INVALID_SIZE);
  var intSize = toIntegerOrInfinity(numSize);
  if (intSize < 0) throw new $RangeError(INVALID_SIZE);
  return new SetRecord(obj, intSize);
};


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// `GetIteratorDirect(obj)` abstract operation
// https://tc39.es/proposal-iterator-helpers/#sec-getiteratordirect
module.exports = function (obj) {
  return {
    iterator: obj,
    next: obj.next,
    done: false
  };
};


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var getBuiltIn = __webpack_require__(22);

var createSetLike = function (size) {
  return {
    size: size,
    has: function () {
      return false;
    },
    keys: function () {
      return {
        next: function () {
          return { done: true };
        }
      };
    }
  };
};

module.exports = function (name) {
  var Set = getBuiltIn('Set');
  try {
    new Set()[name](createSetLike(0));
    try {
      // late spec change, early WebKit ~ Safari 17.0 beta implementation does not pass it
      // https://github.com/tc39/proposal-set-methods/pull/88
      new Set()[name](createSetLike(-1));
      return false;
    } catch (error2) {
      return true;
    }
  } catch (error) {
    return false;
  }
};


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var fails = __webpack_require__(6);
var intersection = __webpack_require__(98);
var setMethodAcceptSetLike = __webpack_require__(96);

var INCORRECT = !setMethodAcceptSetLike('intersection') || fails(function () {
  // eslint-disable-next-line es/no-array-from, es/no-set -- testing
  return String(Array.from(new Set([1, 2, 3]).intersection(new Set([3, 2])))) !== '3,2';
});

// `Set.prototype.intersection` method
// https://github.com/tc39/proposal-set-methods
$({ target: 'Set', proto: true, real: true, forced: INCORRECT }, {
  intersection: intersection
});


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var aSet = __webpack_require__(87);
var SetHelpers = __webpack_require__(88);
var size = __webpack_require__(92);
var getSetRecord = __webpack_require__(94);
var iterateSet = __webpack_require__(90);
var iterateSimple = __webpack_require__(91);

var Set = SetHelpers.Set;
var add = SetHelpers.add;
var has = SetHelpers.has;

// `Set.prototype.intersection` method
// https://github.com/tc39/proposal-set-methods
module.exports = function intersection(other) {
  var O = aSet(this);
  var otherRec = getSetRecord(other);
  var result = new Set();

  if (size(O) > otherRec.size) {
    iterateSimple(otherRec.getIterator(), function (e) {
      if (has(O, e)) add(result, e);
    });
  } else {
    iterateSet(O, function (e) {
      if (otherRec.includes(e)) add(result, e);
    });
  }

  return result;
};


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var isDisjointFrom = __webpack_require__(100);
var setMethodAcceptSetLike = __webpack_require__(96);

// `Set.prototype.isDisjointFrom` method
// https://github.com/tc39/proposal-set-methods
$({ target: 'Set', proto: true, real: true, forced: !setMethodAcceptSetLike('isDisjointFrom') }, {
  isDisjointFrom: isDisjointFrom
});


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var aSet = __webpack_require__(87);
var has = __webpack_require__(88).has;
var size = __webpack_require__(92);
var getSetRecord = __webpack_require__(94);
var iterateSet = __webpack_require__(90);
var iterateSimple = __webpack_require__(91);
var iteratorClose = __webpack_require__(80);

// `Set.prototype.isDisjointFrom` method
// https://tc39.github.io/proposal-set-methods/#Set.prototype.isDisjointFrom
module.exports = function isDisjointFrom(other) {
  var O = aSet(this);
  var otherRec = getSetRecord(other);
  if (size(O) <= otherRec.size) return iterateSet(O, function (e) {
    if (otherRec.includes(e)) return false;
  }, true) !== false;
  var iterator = otherRec.getIterator();
  return iterateSimple(iterator, function (e) {
    if (has(O, e)) return iteratorClose(iterator, 'normal', false);
  }) !== false;
};


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var isSubsetOf = __webpack_require__(102);
var setMethodAcceptSetLike = __webpack_require__(96);

// `Set.prototype.isSubsetOf` method
// https://github.com/tc39/proposal-set-methods
$({ target: 'Set', proto: true, real: true, forced: !setMethodAcceptSetLike('isSubsetOf') }, {
  isSubsetOf: isSubsetOf
});


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var aSet = __webpack_require__(87);
var size = __webpack_require__(92);
var iterate = __webpack_require__(90);
var getSetRecord = __webpack_require__(94);

// `Set.prototype.isSubsetOf` method
// https://tc39.github.io/proposal-set-methods/#Set.prototype.isSubsetOf
module.exports = function isSubsetOf(other) {
  var O = aSet(this);
  var otherRec = getSetRecord(other);
  if (size(O) > otherRec.size) return false;
  return iterate(O, function (e) {
    if (!otherRec.includes(e)) return false;
  }, true) !== false;
};


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var isSupersetOf = __webpack_require__(104);
var setMethodAcceptSetLike = __webpack_require__(96);

// `Set.prototype.isSupersetOf` method
// https://github.com/tc39/proposal-set-methods
$({ target: 'Set', proto: true, real: true, forced: !setMethodAcceptSetLike('isSupersetOf') }, {
  isSupersetOf: isSupersetOf
});


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var aSet = __webpack_require__(87);
var has = __webpack_require__(88).has;
var size = __webpack_require__(92);
var getSetRecord = __webpack_require__(94);
var iterateSimple = __webpack_require__(91);
var iteratorClose = __webpack_require__(80);

// `Set.prototype.isSupersetOf` method
// https://tc39.github.io/proposal-set-methods/#Set.prototype.isSupersetOf
module.exports = function isSupersetOf(other) {
  var O = aSet(this);
  var otherRec = getSetRecord(other);
  if (size(O) < otherRec.size) return false;
  var iterator = otherRec.getIterator();
  return iterateSimple(iterator, function (e) {
    if (!has(O, e)) return iteratorClose(iterator, 'normal', false);
  }) !== false;
};


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var symmetricDifference = __webpack_require__(106);
var setMethodAcceptSetLike = __webpack_require__(96);

// `Set.prototype.symmetricDifference` method
// https://github.com/tc39/proposal-set-methods
$({ target: 'Set', proto: true, real: true, forced: !setMethodAcceptSetLike('symmetricDifference') }, {
  symmetricDifference: symmetricDifference
});


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var aSet = __webpack_require__(87);
var SetHelpers = __webpack_require__(88);
var clone = __webpack_require__(89);
var getSetRecord = __webpack_require__(94);
var iterateSimple = __webpack_require__(91);

var add = SetHelpers.add;
var has = SetHelpers.has;
var remove = SetHelpers.remove;

// `Set.prototype.symmetricDifference` method
// https://github.com/tc39/proposal-set-methods
module.exports = function symmetricDifference(other) {
  var O = aSet(this);
  var keysIter = getSetRecord(other).getIterator();
  var result = clone(O);
  iterateSimple(keysIter, function (e) {
    if (has(O, e)) remove(result, e);
    else add(result, e);
  });
  return result;
};


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var union = __webpack_require__(108);
var setMethodAcceptSetLike = __webpack_require__(96);

// `Set.prototype.union` method
// https://github.com/tc39/proposal-set-methods
$({ target: 'Set', proto: true, real: true, forced: !setMethodAcceptSetLike('union') }, {
  union: union
});


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var aSet = __webpack_require__(87);
var add = __webpack_require__(88).add;
var clone = __webpack_require__(89);
var getSetRecord = __webpack_require__(94);
var iterateSimple = __webpack_require__(91);

// `Set.prototype.union` method
// https://github.com/tc39/proposal-set-methods
module.exports = function union(other) {
  var O = aSet(this);
  var keysIter = getSetRecord(other).getIterator();
  var result = clone(O);
  iterateSimple(keysIter, function (it) {
    add(result, it);
  });
  return result;
};


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var globalThis = __webpack_require__(3);
var isPrototypeOf = __webpack_require__(23);
var getPrototypeOf = __webpack_require__(110);
var setPrototypeOf = __webpack_require__(112);
var copyConstructorProperties = __webpack_require__(54);
var create = __webpack_require__(115);
var createNonEnumerableProperty = __webpack_require__(42);
var createPropertyDescriptor = __webpack_require__(10);
var installErrorStack = __webpack_require__(119);
var normalizeStringArgument = __webpack_require__(122);
var wellKnownSymbol = __webpack_require__(32);
var fails = __webpack_require__(6);
var IS_PURE = __webpack_require__(35);

var NativeSuppressedError = globalThis.SuppressedError;
var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var $Error = Error;

// https://github.com/oven-sh/bun/issues/9282
var WRONG_ARITY = !!NativeSuppressedError && NativeSuppressedError.length !== 3;

// https://github.com/oven-sh/bun/issues/9283
var EXTRA_ARGS_SUPPORT = !!NativeSuppressedError && fails(function () {
  return new NativeSuppressedError(1, 2, 3, { cause: 4 }).cause === 4;
});

var PATCH = WRONG_ARITY || EXTRA_ARGS_SUPPORT;

var $SuppressedError = function SuppressedError(error, suppressed, message) {
  var isInstance = isPrototypeOf(SuppressedErrorPrototype, this);
  var that;
  if (setPrototypeOf) {
    that = PATCH && (!isInstance || getPrototypeOf(this) === SuppressedErrorPrototype)
      ? new NativeSuppressedError()
      : setPrototypeOf(new $Error(), isInstance ? getPrototypeOf(this) : SuppressedErrorPrototype);
  } else {
    that = isInstance ? this : create(SuppressedErrorPrototype);
    createNonEnumerableProperty(that, TO_STRING_TAG, 'Error');
  }
  if (message !== undefined) createNonEnumerableProperty(that, 'message', normalizeStringArgument(message));
  installErrorStack(that, $SuppressedError, that.stack, 1);
  createNonEnumerableProperty(that, 'error', error);
  createNonEnumerableProperty(that, 'suppressed', suppressed);
  return that;
};

if (setPrototypeOf) setPrototypeOf($SuppressedError, $Error);
else copyConstructorProperties($SuppressedError, $Error, { name: true });

var SuppressedErrorPrototype = $SuppressedError.prototype = PATCH ? NativeSuppressedError.prototype : create($Error.prototype, {
  constructor: createPropertyDescriptor(1, $SuppressedError),
  message: createPropertyDescriptor(1, ''),
  name: createPropertyDescriptor(1, 'SuppressedError')
});

if (PATCH && !IS_PURE) SuppressedErrorPrototype.constructor = $SuppressedError;

// `SuppressedError` constructor
// https://github.com/tc39/proposal-explicit-resource-management
$({ global: true, constructor: true, arity: 3, forced: PATCH }, {
  SuppressedError: $SuppressedError
});


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var hasOwn = __webpack_require__(37);
var isCallable = __webpack_require__(20);
var toObject = __webpack_require__(38);
var sharedKey = __webpack_require__(52);
var CORRECT_PROTOTYPE_GETTER = __webpack_require__(111);

var IE_PROTO = sharedKey('IE_PROTO');
var $Object = Object;
var ObjectPrototype = $Object.prototype;

// `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof
// eslint-disable-next-line es/no-object-getprototypeof -- safe
module.exports = CORRECT_PROTOTYPE_GETTER ? $Object.getPrototypeOf : function (O) {
  var object = toObject(O);
  if (hasOwn(object, IE_PROTO)) return object[IE_PROTO];
  var constructor = object.constructor;
  if (isCallable(constructor) && object instanceof constructor) {
    return constructor.prototype;
  } return object instanceof $Object ? ObjectPrototype : null;
};


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__(6);

module.exports = !fails(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
  return Object.getPrototypeOf(new F()) !== F.prototype;
});


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* eslint-disable no-proto -- safe */
var uncurryThisAccessor = __webpack_require__(93);
var isObject = __webpack_require__(19);
var requireObjectCoercible = __webpack_require__(15);
var aPossiblePrototype = __webpack_require__(113);

// `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
// eslint-disable-next-line es/no-object-setprototypeof -- safe
module.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    setter = uncurryThisAccessor(Object.prototype, '__proto__', 'set');
    setter(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    requireObjectCoercible(O);
    aPossiblePrototype(proto);
    if (!isObject(O)) return O;
    if (CORRECT_SETTER) setter(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var isPossiblePrototype = __webpack_require__(114);

var $String = String;
var $TypeError = TypeError;

module.exports = function (argument) {
  if (isPossiblePrototype(argument)) return argument;
  throw new $TypeError("Can't set " + $String(argument) + ' as a prototype');
};


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var isObject = __webpack_require__(19);

module.exports = function (argument) {
  return isObject(argument) || argument === null;
};


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* global ActiveXObject -- old IE, WSH */
var anObject = __webpack_require__(45);
var definePropertiesModule = __webpack_require__(116);
var enumBugKeys = __webpack_require__(64);
var hiddenKeys = __webpack_require__(53);
var html = __webpack_require__(118);
var documentCreateElement = __webpack_require__(41);
var sharedKey = __webpack_require__(52);

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  // eslint-disable-next-line no-useless-assignment -- avoid memory leak
  activeXDocument = null;
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    activeXDocument = new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = typeof document != 'undefined'
    ? document.domain && activeXDocument
      ? NullProtoObjectViaActiveX(activeXDocument) // old IE
      : NullProtoObjectViaIFrame()
    : NullProtoObjectViaActiveX(activeXDocument); // WSH
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO] = true;

// `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
// eslint-disable-next-line es/no-object-create -- safe
module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : definePropertiesModule.f(result, Properties);
};


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var DESCRIPTORS = __webpack_require__(5);
var V8_PROTOTYPE_DEFINE_BUG = __webpack_require__(44);
var definePropertyModule = __webpack_require__(43);
var anObject = __webpack_require__(45);
var toIndexedObject = __webpack_require__(11);
var objectKeys = __webpack_require__(117);

// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es/no-object-defineproperties -- safe
exports.f = DESCRIPTORS && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var props = toIndexedObject(Properties);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule.f(O, key = keys[index++], props[key]);
  return O;
};


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var internalObjectKeys = __webpack_require__(57);
var enumBugKeys = __webpack_require__(64);

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es/no-object-keys -- safe
module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var getBuiltIn = __webpack_require__(22);

module.exports = getBuiltIn('document', 'documentElement');


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var createNonEnumerableProperty = __webpack_require__(42);
var clearErrorStack = __webpack_require__(120);
var ERROR_STACK_INSTALLABLE = __webpack_require__(121);

// non-standard V8
var captureStackTrace = Error.captureStackTrace;

module.exports = function (error, C, stack, dropEntries) {
  if (ERROR_STACK_INSTALLABLE) {
    if (captureStackTrace) captureStackTrace(error, C);
    else createNonEnumerableProperty(error, 'stack', clearErrorStack(stack, dropEntries));
  }
};


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var uncurryThis = __webpack_require__(13);

var $Error = Error;
var replace = uncurryThis(''.replace);

var TEST = (function (arg) { return String(new $Error(arg).stack); })('zxcasd');
// eslint-disable-next-line redos/no-vulnerable -- safe
var V8_OR_CHAKRA_STACK_ENTRY = /\n\s*at [^:]*:[^\n]*/;
var IS_V8_OR_CHAKRA_STACK = V8_OR_CHAKRA_STACK_ENTRY.test(TEST);

module.exports = function (stack, dropEntries) {
  if (IS_V8_OR_CHAKRA_STACK && typeof stack == 'string' && !$Error.prepareStackTrace) {
    while (dropEntries--) stack = replace(stack, V8_OR_CHAKRA_STACK_ENTRY, '');
  } return stack;
};


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__(6);
var createPropertyDescriptor = __webpack_require__(10);

module.exports = !fails(function () {
  var error = new Error('a');
  if (!('stack' in error)) return true;
  // eslint-disable-next-line es/no-object-defineproperty -- safe
  Object.defineProperty(error, 'stack', createPropertyDescriptor(1, 7));
  return error.stack !== 7;
});


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toString = __webpack_require__(123);

module.exports = function (argument, $default) {
  return argument === undefined ? arguments.length < 2 ? '' : $default : toString(argument);
};


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var classof = __webpack_require__(78);

var $String = String;

module.exports = function (argument) {
  if (classof(argument) === 'Symbol') throw new TypeError('Cannot convert a Symbol value to a string');
  return $String(argument);
};


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var fromAsync = __webpack_require__(125);
var fails = __webpack_require__(6);

var nativeFromAsync = Array.fromAsync;
// https://bugs.webkit.org/show_bug.cgi?id=271703
var INCORRECT_CONSTRUCTURING = !nativeFromAsync || fails(function () {
  var counter = 0;
  nativeFromAsync.call(function () {
    counter++;
    return [];
  }, { length: 0 });
  return counter !== 1;
});

// `Array.fromAsync` method
// https://github.com/tc39/proposal-array-from-async
$({ target: 'Array', stat: true, forced: INCORRECT_CONSTRUCTURING }, {
  fromAsync: fromAsync
});


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var bind = __webpack_require__(72);
var uncurryThis = __webpack_require__(13);
var toObject = __webpack_require__(38);
var isConstructor = __webpack_require__(126);
var getAsyncIterator = __webpack_require__(127);
var getIterator = __webpack_require__(76);
var getIteratorDirect = __webpack_require__(95);
var getIteratorMethod = __webpack_require__(77);
var getMethod = __webpack_require__(28);
var getBuiltIn = __webpack_require__(22);
var getBuiltInPrototypeMethod = __webpack_require__(132);
var wellKnownSymbol = __webpack_require__(32);
var AsyncFromSyncIterator = __webpack_require__(128);
var toArray = __webpack_require__(133).toArray;

var ASYNC_ITERATOR = wellKnownSymbol('asyncIterator');
var arrayIterator = uncurryThis(getBuiltInPrototypeMethod('Array', 'values'));
var arrayIteratorNext = uncurryThis(arrayIterator([]).next);

var safeArrayIterator = function () {
  return new SafeArrayIterator(this);
};

var SafeArrayIterator = function (O) {
  this.iterator = arrayIterator(O);
};

SafeArrayIterator.prototype.next = function () {
  return arrayIteratorNext(this.iterator);
};

// `Array.fromAsync` method implementation
// https://github.com/tc39/proposal-array-from-async
module.exports = function fromAsync(asyncItems /* , mapfn = undefined, thisArg = undefined */) {
  var C = this;
  var argumentsLength = arguments.length;
  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
  var thisArg = argumentsLength > 2 ? arguments[2] : undefined;
  return new (getBuiltIn('Promise'))(function (resolve) {
    var O = toObject(asyncItems);
    if (mapfn !== undefined) mapfn = bind(mapfn, thisArg);
    var usingAsyncIterator = getMethod(O, ASYNC_ITERATOR);
    var usingSyncIterator = usingAsyncIterator ? undefined : getIteratorMethod(O) || safeArrayIterator;
    var A = isConstructor(C) ? new C() : [];
    var iterator = usingAsyncIterator
      ? getAsyncIterator(O, usingAsyncIterator)
      : new AsyncFromSyncIterator(getIteratorDirect(getIterator(O, usingSyncIterator)));
    resolve(toArray(iterator, mapfn, A));
  });
};


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var uncurryThis = __webpack_require__(13);
var fails = __webpack_require__(6);
var isCallable = __webpack_require__(20);
var classof = __webpack_require__(78);
var getBuiltIn = __webpack_require__(22);
var inspectSource = __webpack_require__(49);

var noop = function () { /* empty */ };
var construct = getBuiltIn('Reflect', 'construct');
var constructorRegExp = /^\s*(?:class|function)\b/;
var exec = uncurryThis(constructorRegExp.exec);
var INCORRECT_TO_STRING = !constructorRegExp.test(noop);

var isConstructorModern = function isConstructor(argument) {
  if (!isCallable(argument)) return false;
  try {
    construct(noop, [], argument);
    return true;
  } catch (error) {
    return false;
  }
};

var isConstructorLegacy = function isConstructor(argument) {
  if (!isCallable(argument)) return false;
  switch (classof(argument)) {
    case 'AsyncFunction':
    case 'GeneratorFunction':
    case 'AsyncGeneratorFunction': return false;
  }
  try {
    // we can't check .prototype since constructors produced by .bind haven't it
    // `Function#toString` throws on some built-it function in some legacy engines
    // (for example, `DOMQuad` and similar in FF41-)
    return INCORRECT_TO_STRING || !!exec(constructorRegExp, inspectSource(argument));
  } catch (error) {
    return true;
  }
};

isConstructorLegacy.sham = true;

// `IsConstructor` abstract operation
// https://tc39.es/ecma262/#sec-isconstructor
module.exports = !construct || fails(function () {
  var called;
  return isConstructorModern(isConstructorModern.call)
    || !isConstructorModern(Object)
    || !isConstructorModern(function () { called = true; })
    || called;
}) ? isConstructorLegacy : isConstructorModern;


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var call = __webpack_require__(7);
var AsyncFromSyncIterator = __webpack_require__(128);
var anObject = __webpack_require__(45);
var getIterator = __webpack_require__(76);
var getIteratorDirect = __webpack_require__(95);
var getMethod = __webpack_require__(28);
var wellKnownSymbol = __webpack_require__(32);

var ASYNC_ITERATOR = wellKnownSymbol('asyncIterator');

module.exports = function (it, usingIterator) {
  var method = arguments.length < 2 ? getMethod(it, ASYNC_ITERATOR) : usingIterator;
  return method ? anObject(call(method, it)) : new AsyncFromSyncIterator(getIteratorDirect(getIterator(it)));
};


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var call = __webpack_require__(7);
var anObject = __webpack_require__(45);
var create = __webpack_require__(115);
var getMethod = __webpack_require__(28);
var defineBuiltIns = __webpack_require__(129);
var InternalStateModule = __webpack_require__(50);
var getBuiltIn = __webpack_require__(22);
var AsyncIteratorPrototype = __webpack_require__(130);
var createIterResultObject = __webpack_require__(131);

var Promise = getBuiltIn('Promise');

var ASYNC_FROM_SYNC_ITERATOR = 'AsyncFromSyncIterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(ASYNC_FROM_SYNC_ITERATOR);

var asyncFromSyncIteratorContinuation = function (result, resolve, reject) {
  var done = result.done;
  Promise.resolve(result.value).then(function (value) {
    resolve(createIterResultObject(value, done));
  }, reject);
};

var AsyncFromSyncIterator = function AsyncIterator(iteratorRecord) {
  iteratorRecord.type = ASYNC_FROM_SYNC_ITERATOR;
  setInternalState(this, iteratorRecord);
};

AsyncFromSyncIterator.prototype = defineBuiltIns(create(AsyncIteratorPrototype), {
  next: function next() {
    var state = getInternalState(this);
    return new Promise(function (resolve, reject) {
      var result = anObject(call(state.next, state.iterator));
      asyncFromSyncIteratorContinuation(result, resolve, reject);
    });
  },
  'return': function () {
    var iterator = getInternalState(this).iterator;
    return new Promise(function (resolve, reject) {
      var $return = getMethod(iterator, 'return');
      if ($return === undefined) return resolve(createIterResultObject(undefined, true));
      var result = anObject(call($return, iterator));
      asyncFromSyncIteratorContinuation(result, resolve, reject);
    });
  }
});

module.exports = AsyncFromSyncIterator;


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var defineBuiltIn = __webpack_require__(46);

module.exports = function (target, src, options) {
  for (var key in src) defineBuiltIn(target, key, src[key], options);
  return target;
};


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var globalThis = __webpack_require__(3);
var shared = __webpack_require__(34);
var isCallable = __webpack_require__(20);
var create = __webpack_require__(115);
var getPrototypeOf = __webpack_require__(110);
var defineBuiltIn = __webpack_require__(46);
var wellKnownSymbol = __webpack_require__(32);
var IS_PURE = __webpack_require__(35);

var USE_FUNCTION_CONSTRUCTOR = 'USE_FUNCTION_CONSTRUCTOR';
var ASYNC_ITERATOR = wellKnownSymbol('asyncIterator');
var AsyncIterator = globalThis.AsyncIterator;
var PassedAsyncIteratorPrototype = shared.AsyncIteratorPrototype;
var AsyncIteratorPrototype, prototype;

if (PassedAsyncIteratorPrototype) {
  AsyncIteratorPrototype = PassedAsyncIteratorPrototype;
} else if (isCallable(AsyncIterator)) {
  AsyncIteratorPrototype = AsyncIterator.prototype;
} else if (shared[USE_FUNCTION_CONSTRUCTOR] || globalThis[USE_FUNCTION_CONSTRUCTOR]) {
  try {
    // eslint-disable-next-line no-new-func -- we have no alternatives without usage of modern syntax
    prototype = getPrototypeOf(getPrototypeOf(getPrototypeOf(Function('return async function*(){}()')())));
    if (getPrototypeOf(prototype) === Object.prototype) AsyncIteratorPrototype = prototype;
  } catch (error) { /* empty */ }
}

if (!AsyncIteratorPrototype) AsyncIteratorPrototype = {};
else if (IS_PURE) AsyncIteratorPrototype = create(AsyncIteratorPrototype);

if (!isCallable(AsyncIteratorPrototype[ASYNC_ITERATOR])) {
  defineBuiltIn(AsyncIteratorPrototype, ASYNC_ITERATOR, function () {
    return this;
  });
}

module.exports = AsyncIteratorPrototype;


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// `CreateIterResultObject` abstract operation
// https://tc39.es/ecma262/#sec-createiterresultobject
module.exports = function (value, done) {
  return { value: value, done: done };
};


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var globalThis = __webpack_require__(3);

module.exports = function (CONSTRUCTOR, METHOD) {
  var Constructor = globalThis[CONSTRUCTOR];
  var Prototype = Constructor && Constructor.prototype;
  return Prototype && Prototype[METHOD];
};


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-iterator-helpers
// https://github.com/tc39/proposal-array-from-async
var call = __webpack_require__(7);
var aCallable = __webpack_require__(29);
var anObject = __webpack_require__(45);
var isObject = __webpack_require__(19);
var doesNotExceedSafeInteger = __webpack_require__(69);
var getBuiltIn = __webpack_require__(22);
var getIteratorDirect = __webpack_require__(95);
var closeAsyncIteration = __webpack_require__(134);

var createMethod = function (TYPE) {
  var IS_TO_ARRAY = TYPE === 0;
  var IS_FOR_EACH = TYPE === 1;
  var IS_EVERY = TYPE === 2;
  var IS_SOME = TYPE === 3;
  return function (object, fn, target) {
    anObject(object);
    var MAPPING = fn !== undefined;
    if (MAPPING || !IS_TO_ARRAY) aCallable(fn);
    var record = getIteratorDirect(object);
    var Promise = getBuiltIn('Promise');
    var iterator = record.iterator;
    var next = record.next;
    var counter = 0;

    return new Promise(function (resolve, reject) {
      var ifAbruptCloseAsyncIterator = function (error) {
        closeAsyncIteration(iterator, reject, error, reject);
      };

      var loop = function () {
        try {
          if (MAPPING) try {
            doesNotExceedSafeInteger(counter);
          } catch (error5) { ifAbruptCloseAsyncIterator(error5); }
          Promise.resolve(anObject(call(next, iterator))).then(function (step) {
            try {
              if (anObject(step).done) {
                if (IS_TO_ARRAY) {
                  target.length = counter;
                  resolve(target);
                } else resolve(IS_SOME ? false : IS_EVERY || undefined);
              } else {
                var value = step.value;
                try {
                  if (MAPPING) {
                    var result = fn(value, counter);

                    var handler = function ($result) {
                      if (IS_FOR_EACH) {
                        loop();
                      } else if (IS_EVERY) {
                        $result ? loop() : closeAsyncIteration(iterator, resolve, false, reject);
                      } else if (IS_TO_ARRAY) {
                        try {
                          target[counter++] = $result;
                          loop();
                        } catch (error4) { ifAbruptCloseAsyncIterator(error4); }
                      } else {
                        $result ? closeAsyncIteration(iterator, resolve, IS_SOME || value, reject) : loop();
                      }
                    };

                    if (isObject(result)) Promise.resolve(result).then(handler, ifAbruptCloseAsyncIterator);
                    else handler(result);
                  } else {
                    target[counter++] = value;
                    loop();
                  }
                } catch (error3) { ifAbruptCloseAsyncIterator(error3); }
              }
            } catch (error2) { reject(error2); }
          }, reject);
        } catch (error) { reject(error); }
      };

      loop();
    });
  };
};

module.exports = {
  toArray: createMethod(0),
  forEach: createMethod(1),
  every: createMethod(2),
  some: createMethod(3),
  find: createMethod(4)
};


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var call = __webpack_require__(7);
var getBuiltIn = __webpack_require__(22);
var getMethod = __webpack_require__(28);

module.exports = function (iterator, method, argument, reject) {
  try {
    var returnMethod = getMethod(iterator, 'return');
    if (returnMethod) {
      return getBuiltIn('Promise').resolve(call(returnMethod, iterator)).then(function () {
        method(argument);
      }, function (error) {
        reject(error);
      });
    }
  } catch (error2) {
    return reject(error2);
  } method(argument);
};


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// TODO: remove from `core-js@4`
var $ = __webpack_require__(2);
var $filterReject = __webpack_require__(136).filterReject;
var addToUnscopables = __webpack_require__(139);

// `Array.prototype.filterOut` method
// https://github.com/tc39/proposal-array-filtering
$({ target: 'Array', proto: true, forced: true }, {
  filterOut: function filterOut(callbackfn /* , thisArg */) {
    return $filterReject(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

addToUnscopables('filterOut');


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var bind = __webpack_require__(72);
var uncurryThis = __webpack_require__(13);
var IndexedObject = __webpack_require__(12);
var toObject = __webpack_require__(38);
var lengthOfArrayLike = __webpack_require__(62);
var arraySpeciesCreate = __webpack_require__(137);

var push = uncurryThis([].push);

// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation
var createMethod = function (TYPE) {
  var IS_MAP = TYPE === 1;
  var IS_FILTER = TYPE === 2;
  var IS_SOME = TYPE === 3;
  var IS_EVERY = TYPE === 4;
  var IS_FIND_INDEX = TYPE === 6;
  var IS_FILTER_REJECT = TYPE === 7;
  var NO_HOLES = TYPE === 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject($this);
    var self = IndexedObject(O);
    var length = lengthOfArrayLike(self);
    var boundFunction = bind(callbackfn, that);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate;
    var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_REJECT ? create($this, 0) : undefined;
    var value, result;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
          case 3: return true;              // some
          case 5: return value;             // find
          case 6: return index;             // findIndex
          case 2: push(target, value);      // filter
        } else switch (TYPE) {
          case 4: return false;             // every
          case 7: push(target, value);      // filterReject
        }
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

module.exports = {
  // `Array.prototype.forEach` method
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  forEach: createMethod(0),
  // `Array.prototype.map` method
  // https://tc39.es/ecma262/#sec-array.prototype.map
  map: createMethod(1),
  // `Array.prototype.filter` method
  // https://tc39.es/ecma262/#sec-array.prototype.filter
  filter: createMethod(2),
  // `Array.prototype.some` method
  // https://tc39.es/ecma262/#sec-array.prototype.some
  some: createMethod(3),
  // `Array.prototype.every` method
  // https://tc39.es/ecma262/#sec-array.prototype.every
  every: createMethod(4),
  // `Array.prototype.find` method
  // https://tc39.es/ecma262/#sec-array.prototype.find
  find: createMethod(5),
  // `Array.prototype.findIndex` method
  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod(6),
  // `Array.prototype.filterReject` method
  // https://github.com/tc39/proposal-array-filtering
  filterReject: createMethod(7)
};


/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var arraySpeciesConstructor = __webpack_require__(138);

// `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate
module.exports = function (originalArray, length) {
  return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
};


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var isArray = __webpack_require__(68);
var isConstructor = __webpack_require__(126);
var isObject = __webpack_require__(19);
var wellKnownSymbol = __webpack_require__(32);

var SPECIES = wellKnownSymbol('species');
var $Array = Array;

// a part of `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate
module.exports = function (originalArray) {
  var C;
  if (isArray(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (isConstructor(C) && (C === $Array || isArray(C.prototype))) C = undefined;
    else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? $Array : C;
};


/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var wellKnownSymbol = __webpack_require__(32);
var create = __webpack_require__(115);
var defineProperty = __webpack_require__(43).f;

var UNSCOPABLES = wellKnownSymbol('unscopables');
var ArrayPrototype = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype[UNSCOPABLES] === undefined) {
  defineProperty(ArrayPrototype, UNSCOPABLES, {
    configurable: true,
    value: create(null)
  });
}

// add a key to Array.prototype[@@unscopables]
module.exports = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};


/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var $filterReject = __webpack_require__(136).filterReject;
var addToUnscopables = __webpack_require__(139);

// `Array.prototype.filterReject` method
// https://github.com/tc39/proposal-array-filtering
$({ target: 'Array', proto: true, forced: true }, {
  filterReject: function filterReject(callbackfn /* , thisArg */) {
    return $filterReject(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

addToUnscopables('filterReject');


/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var $group = __webpack_require__(142);
var addToUnscopables = __webpack_require__(139);

// `Array.prototype.group` method
// https://github.com/tc39/proposal-array-grouping
$({ target: 'Array', proto: true }, {
  group: function group(callbackfn /* , thisArg */) {
    var thisArg = arguments.length > 1 ? arguments[1] : undefined;
    return $group(this, callbackfn, thisArg);
  }
});

addToUnscopables('group');


/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var bind = __webpack_require__(72);
var uncurryThis = __webpack_require__(13);
var IndexedObject = __webpack_require__(12);
var toObject = __webpack_require__(38);
var toPropertyKey = __webpack_require__(17);
var lengthOfArrayLike = __webpack_require__(62);
var objectCreate = __webpack_require__(115);
var arrayFromConstructorAndList = __webpack_require__(143);

var $Array = Array;
var push = uncurryThis([].push);

module.exports = function ($this, callbackfn, that, specificConstructor) {
  var O = toObject($this);
  var self = IndexedObject(O);
  var boundFunction = bind(callbackfn, that);
  var target = objectCreate(null);
  var length = lengthOfArrayLike(self);
  var index = 0;
  var Constructor, key, value;
  for (;length > index; index++) {
    value = self[index];
    key = toPropertyKey(boundFunction(value, index, O));
    // in some IE versions, `hasOwnProperty` returns incorrect result on integer keys
    // but since it's a `null` prototype object, we can safely use `in`
    if (key in target) push(target[key], value);
    else target[key] = [value];
  }
  // TODO: Remove this block from `core-js@4`
  if (specificConstructor) {
    Constructor = specificConstructor(O);
    if (Constructor !== $Array) {
      for (key in target) target[key] = arrayFromConstructorAndList(Constructor, target[key]);
    }
  } return target;
};


/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var lengthOfArrayLike = __webpack_require__(62);

module.exports = function (Constructor, list, $length) {
  var index = 0;
  var length = arguments.length > 2 ? $length : lengthOfArrayLike(list);
  var result = new Constructor(length);
  while (length > index) result[index] = list[index++];
  return result;
};


/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// TODO: Remove from `core-js@4`
var $ = __webpack_require__(2);
var $group = __webpack_require__(142);
var arrayMethodIsStrict = __webpack_require__(145);
var addToUnscopables = __webpack_require__(139);

// `Array.prototype.groupBy` method
// https://github.com/tc39/proposal-array-grouping
// https://bugs.webkit.org/show_bug.cgi?id=236541
$({ target: 'Array', proto: true, forced: !arrayMethodIsStrict('groupBy') }, {
  groupBy: function groupBy(callbackfn /* , thisArg */) {
    var thisArg = arguments.length > 1 ? arguments[1] : undefined;
    return $group(this, callbackfn, thisArg);
  }
});

addToUnscopables('groupBy');


/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__(6);

module.exports = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call -- required for testing
    method.call(null, argument || function () { return 1; }, 1);
  });
};


/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// TODO: Remove from `core-js@4`
var $ = __webpack_require__(2);
var arrayMethodIsStrict = __webpack_require__(145);
var addToUnscopables = __webpack_require__(139);
var $groupToMap = __webpack_require__(147);
var IS_PURE = __webpack_require__(35);

// `Array.prototype.groupByToMap` method
// https://github.com/tc39/proposal-array-grouping
// https://bugs.webkit.org/show_bug.cgi?id=236541
$({ target: 'Array', proto: true, name: 'groupToMap', forced: IS_PURE || !arrayMethodIsStrict('groupByToMap') }, {
  groupByToMap: $groupToMap
});

addToUnscopables('groupByToMap');


/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var bind = __webpack_require__(72);
var uncurryThis = __webpack_require__(13);
var IndexedObject = __webpack_require__(12);
var toObject = __webpack_require__(38);
var lengthOfArrayLike = __webpack_require__(62);
var MapHelpers = __webpack_require__(81);

var Map = MapHelpers.Map;
var mapGet = MapHelpers.get;
var mapHas = MapHelpers.has;
var mapSet = MapHelpers.set;
var push = uncurryThis([].push);

// `Array.prototype.groupToMap` method
// https://github.com/tc39/proposal-array-grouping
module.exports = function groupToMap(callbackfn /* , thisArg */) {
  var O = toObject(this);
  var self = IndexedObject(O);
  var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  var map = new Map();
  var length = lengthOfArrayLike(self);
  var index = 0;
  var key, value;
  for (;length > index; index++) {
    value = self[index];
    key = boundFunction(value, index, O);
    if (mapHas(map, key)) push(mapGet(map, key), value);
    else mapSet(map, key, [value]);
  } return map;
};


/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var addToUnscopables = __webpack_require__(139);
var $groupToMap = __webpack_require__(147);
var IS_PURE = __webpack_require__(35);

// `Array.prototype.groupToMap` method
// https://github.com/tc39/proposal-array-grouping
$({ target: 'Array', proto: true, forced: IS_PURE }, {
  groupToMap: $groupToMap
});

addToUnscopables('groupToMap');


/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var isArray = __webpack_require__(68);

// eslint-disable-next-line es/no-object-isfrozen -- safe
var isFrozen = Object.isFrozen;

var isFrozenStringArray = function (array, allowUndefined) {
  if (!isFrozen || !isArray(array) || !isFrozen(array)) return false;
  var index = 0;
  var length = array.length;
  var element;
  while (index < length) {
    element = array[index++];
    if (!(typeof element == 'string' || (allowUndefined && element === undefined))) {
      return false;
    }
  } return length !== 0;
};

// `Array.isTemplateObject` method
// https://github.com/tc39/proposal-array-is-template-object
$({ target: 'Array', stat: true, sham: true, forced: true }, {
  isTemplateObject: function isTemplateObject(value) {
    if (!isFrozenStringArray(value, true)) return false;
    var raw = value.raw;
    return raw.length === value.length && isFrozenStringArray(raw, false);
  }
});


/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// TODO: Remove from `core-js@4`
var DESCRIPTORS = __webpack_require__(5);
var addToUnscopables = __webpack_require__(139);
var toObject = __webpack_require__(38);
var lengthOfArrayLike = __webpack_require__(62);
var defineBuiltInAccessor = __webpack_require__(151);

// `Array.prototype.lastIndex` getter
// https://github.com/keithamus/proposal-array-last
if (DESCRIPTORS) {
  defineBuiltInAccessor(Array.prototype, 'lastIndex', {
    configurable: true,
    get: function lastIndex() {
      var O = toObject(this);
      var len = lengthOfArrayLike(O);
      return len === 0 ? 0 : len - 1;
    }
  });

  addToUnscopables('lastIndex');
}


/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var makeBuiltIn = __webpack_require__(47);
var defineProperty = __webpack_require__(43);

module.exports = function (target, name, descriptor) {
  if (descriptor.get) makeBuiltIn(descriptor.get, name, { getter: true });
  if (descriptor.set) makeBuiltIn(descriptor.set, name, { setter: true });
  return defineProperty.f(target, name, descriptor);
};


/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// TODO: Remove from `core-js@4`
var DESCRIPTORS = __webpack_require__(5);
var addToUnscopables = __webpack_require__(139);
var toObject = __webpack_require__(38);
var lengthOfArrayLike = __webpack_require__(62);
var defineBuiltInAccessor = __webpack_require__(151);

// `Array.prototype.lastIndex` accessor
// https://github.com/keithamus/proposal-array-last
if (DESCRIPTORS) {
  defineBuiltInAccessor(Array.prototype, 'lastItem', {
    configurable: true,
    get: function lastItem() {
      var O = toObject(this);
      var len = lengthOfArrayLike(O);
      return len === 0 ? undefined : O[len - 1];
    },
    set: function lastItem(value) {
      var O = toObject(this);
      var len = lengthOfArrayLike(O);
      return O[len === 0 ? 0 : len - 1] = value;
    }
  });

  addToUnscopables('lastItem');
}


/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var addToUnscopables = __webpack_require__(139);
var uniqueBy = __webpack_require__(154);

// `Array.prototype.uniqueBy` method
// https://github.com/tc39/proposal-array-unique
$({ target: 'Array', proto: true, forced: true }, {
  uniqueBy: uniqueBy
});

addToUnscopables('uniqueBy');


/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var uncurryThis = __webpack_require__(13);
var aCallable = __webpack_require__(29);
var isNullOrUndefined = __webpack_require__(16);
var lengthOfArrayLike = __webpack_require__(62);
var toObject = __webpack_require__(38);
var MapHelpers = __webpack_require__(81);
var iterate = __webpack_require__(155);

var Map = MapHelpers.Map;
var mapHas = MapHelpers.has;
var mapSet = MapHelpers.set;
var push = uncurryThis([].push);

// `Array.prototype.uniqueBy` method
// https://github.com/tc39/proposal-array-unique
module.exports = function uniqueBy(resolver) {
  var that = toObject(this);
  var length = lengthOfArrayLike(that);
  var result = [];
  var map = new Map();
  var resolverFunction = !isNullOrUndefined(resolver) ? aCallable(resolver) : function (value) {
    return value;
  };
  var index, item, key;
  for (index = 0; index < length; index++) {
    item = that[index];
    key = resolverFunction(item);
    if (!mapHas(map, key)) mapSet(map, key, item);
  }
  iterate(map, function (value) {
    push(result, value);
  });
  return result;
};


/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var uncurryThis = __webpack_require__(13);
var iterateSimple = __webpack_require__(91);
var MapHelpers = __webpack_require__(81);

var Map = MapHelpers.Map;
var MapPrototype = MapHelpers.proto;
var forEach = uncurryThis(MapPrototype.forEach);
var entries = uncurryThis(MapPrototype.entries);
var next = entries(new Map()).next;

module.exports = function (map, fn, interruptible) {
  return interruptible ? iterateSimple({ iterator: entries(map), next: next }, function (entry) {
    return fn(entry[1], entry[0]);
  }) : forEach(map, fn);
};


/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-async-explicit-resource-management
var $ = __webpack_require__(2);
var DESCRIPTORS = __webpack_require__(5);
var getBuiltIn = __webpack_require__(22);
var aCallable = __webpack_require__(29);
var anInstance = __webpack_require__(157);
var defineBuiltIn = __webpack_require__(46);
var defineBuiltIns = __webpack_require__(129);
var defineBuiltInAccessor = __webpack_require__(151);
var wellKnownSymbol = __webpack_require__(32);
var InternalStateModule = __webpack_require__(50);
var addDisposableResource = __webpack_require__(158);

var Promise = getBuiltIn('Promise');
var SuppressedError = getBuiltIn('SuppressedError');
var $ReferenceError = ReferenceError;

var ASYNC_DISPOSE = wellKnownSymbol('asyncDispose');
var TO_STRING_TAG = wellKnownSymbol('toStringTag');

var ASYNC_DISPOSABLE_STACK = 'AsyncDisposableStack';
var setInternalState = InternalStateModule.set;
var getAsyncDisposableStackInternalState = InternalStateModule.getterFor(ASYNC_DISPOSABLE_STACK);

var HINT = 'async-dispose';
var DISPOSED = 'disposed';
var PENDING = 'pending';

var getPendingAsyncDisposableStackInternalState = function (stack) {
  var internalState = getAsyncDisposableStackInternalState(stack);
  if (internalState.state === DISPOSED) throw new $ReferenceError(ASYNC_DISPOSABLE_STACK + ' already disposed');
  return internalState;
};

var $AsyncDisposableStack = function AsyncDisposableStack() {
  setInternalState(anInstance(this, AsyncDisposableStackPrototype), {
    type: ASYNC_DISPOSABLE_STACK,
    state: PENDING,
    stack: []
  });

  if (!DESCRIPTORS) this.disposed = false;
};

var AsyncDisposableStackPrototype = $AsyncDisposableStack.prototype;

defineBuiltIns(AsyncDisposableStackPrototype, {
  disposeAsync: function disposeAsync() {
    var asyncDisposableStack = this;
    return new Promise(function (resolve, reject) {
      var internalState = getAsyncDisposableStackInternalState(asyncDisposableStack);
      if (internalState.state === DISPOSED) return resolve(undefined);
      internalState.state = DISPOSED;
      if (!DESCRIPTORS) asyncDisposableStack.disposed = true;
      var stack = internalState.stack;
      var i = stack.length;
      var thrown = false;
      var suppressed;

      var handleError = function (result) {
        if (thrown) {
          suppressed = new SuppressedError(result, suppressed);
        } else {
          thrown = true;
          suppressed = result;
        }

        loop();
      };

      var loop = function () {
        if (i) {
          var disposeMethod = stack[--i];
          stack[i] = undefined;
          try {
            Promise.resolve(disposeMethod()).then(loop, handleError);
          } catch (error) {
            handleError(error);
          }
        } else {
          internalState.stack = undefined;
          thrown ? reject(suppressed) : resolve(undefined);
        }
      };

      loop();
    });
  },
  use: function use(value) {
    addDisposableResource(getPendingAsyncDisposableStackInternalState(this), value, HINT);
    return value;
  },
  adopt: function adopt(value, onDispose) {
    var internalState = getPendingAsyncDisposableStackInternalState(this);
    aCallable(onDispose);
    addDisposableResource(internalState, undefined, HINT, function () {
      return onDispose(value);
    });
    return value;
  },
  defer: function defer(onDispose) {
    var internalState = getPendingAsyncDisposableStackInternalState(this);
    aCallable(onDispose);
    addDisposableResource(internalState, undefined, HINT, onDispose);
  },
  move: function move() {
    var internalState = getPendingAsyncDisposableStackInternalState(this);
    var newAsyncDisposableStack = new $AsyncDisposableStack();
    getAsyncDisposableStackInternalState(newAsyncDisposableStack).stack = internalState.stack;
    internalState.stack = [];
    internalState.state = DISPOSED;
    if (!DESCRIPTORS) this.disposed = true;
    return newAsyncDisposableStack;
  }
});

if (DESCRIPTORS) defineBuiltInAccessor(AsyncDisposableStackPrototype, 'disposed', {
  configurable: true,
  get: function disposed() {
    return getAsyncDisposableStackInternalState(this).state === DISPOSED;
  }
});

defineBuiltIn(AsyncDisposableStackPrototype, ASYNC_DISPOSE, AsyncDisposableStackPrototype.disposeAsync, { name: 'disposeAsync' });
defineBuiltIn(AsyncDisposableStackPrototype, TO_STRING_TAG, ASYNC_DISPOSABLE_STACK, { nonWritable: true });

$({ global: true, constructor: true }, {
  AsyncDisposableStack: $AsyncDisposableStack
});


/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var isPrototypeOf = __webpack_require__(23);

var $TypeError = TypeError;

module.exports = function (it, Prototype) {
  if (isPrototypeOf(Prototype, it)) return it;
  throw new $TypeError('Incorrect invocation');
};


/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var call = __webpack_require__(7);
var uncurryThis = __webpack_require__(13);
var bind = __webpack_require__(72);
var anObject = __webpack_require__(45);
var aCallable = __webpack_require__(29);
var isNullOrUndefined = __webpack_require__(16);
var getMethod = __webpack_require__(28);
var wellKnownSymbol = __webpack_require__(32);

var ASYNC_DISPOSE = wellKnownSymbol('asyncDispose');
var DISPOSE = wellKnownSymbol('dispose');

var push = uncurryThis([].push);

// `GetDisposeMethod` abstract operation
// https://tc39.es/proposal-explicit-resource-management/#sec-getdisposemethod
var getDisposeMethod = function (V, hint) {
  if (hint === 'async-dispose') {
    var method = getMethod(V, ASYNC_DISPOSE);
    if (method !== undefined) return method;
    method = getMethod(V, DISPOSE);
    if (method === undefined) return method;
    return function () {
      call(method, this);
    };
  } return getMethod(V, DISPOSE);
};

// `CreateDisposableResource` abstract operation
// https://tc39.es/proposal-explicit-resource-management/#sec-createdisposableresource
var createDisposableResource = function (V, hint, method) {
  if (arguments.length < 3 && !isNullOrUndefined(V)) {
    method = aCallable(getDisposeMethod(anObject(V), hint));
  }

  return method === undefined ? function () {
    return undefined;
  } : bind(method, V);
};

// `AddDisposableResource` abstract operation
// https://tc39.es/proposal-explicit-resource-management/#sec-adddisposableresource
module.exports = function (disposable, V, hint, method) {
  var resource;
  if (arguments.length < 4) {
    // When `V`` is either `null` or `undefined` and hint is `async-dispose`,
    // we record that the resource was evaluated to ensure we will still perform an `Await` when resources are later disposed.
    if (isNullOrUndefined(V) && hint === 'sync-dispose') return;
    resource = createDisposableResource(V, hint);
  } else {
    resource = createDisposableResource(undefined, hint, method);
  }

  push(disposable.stack, resource);
};


/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var anInstance = __webpack_require__(157);
var getPrototypeOf = __webpack_require__(110);
var createNonEnumerableProperty = __webpack_require__(42);
var hasOwn = __webpack_require__(37);
var wellKnownSymbol = __webpack_require__(32);
var AsyncIteratorPrototype = __webpack_require__(130);
var IS_PURE = __webpack_require__(35);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');

var $TypeError = TypeError;

var AsyncIteratorConstructor = function AsyncIterator() {
  anInstance(this, AsyncIteratorPrototype);
  if (getPrototypeOf(this) === AsyncIteratorPrototype) throw new $TypeError('Abstract class AsyncIterator not directly constructable');
};

AsyncIteratorConstructor.prototype = AsyncIteratorPrototype;

if (!hasOwn(AsyncIteratorPrototype, TO_STRING_TAG)) {
  createNonEnumerableProperty(AsyncIteratorPrototype, TO_STRING_TAG, 'AsyncIterator');
}

if (IS_PURE || !hasOwn(AsyncIteratorPrototype, 'constructor') || AsyncIteratorPrototype.constructor === Object) {
  createNonEnumerableProperty(AsyncIteratorPrototype, 'constructor', AsyncIteratorConstructor);
}

// `AsyncIterator` constructor
// https://github.com/tc39/proposal-async-iterator-helpers
$({ global: true, constructor: true, forced: IS_PURE }, {
  AsyncIterator: AsyncIteratorConstructor
});


/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// TODO: Remove from `core-js@4`
var $ = __webpack_require__(2);
var indexed = __webpack_require__(161);

// `AsyncIterator.prototype.asIndexedPairs` method
// https://github.com/tc39/proposal-iterator-helpers
$({ target: 'AsyncIterator', name: 'indexed', proto: true, real: true, forced: true }, {
  asIndexedPairs: indexed
});


/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var call = __webpack_require__(7);
var map = __webpack_require__(162);

var callback = function (value, counter) {
  return [counter, value];
};

// `AsyncIterator.prototype.indexed` method
// https://github.com/tc39/proposal-iterator-helpers
module.exports = function indexed() {
  return call(map, this, callback);
};


/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var call = __webpack_require__(7);
var aCallable = __webpack_require__(29);
var anObject = __webpack_require__(45);
var isObject = __webpack_require__(19);
var getIteratorDirect = __webpack_require__(95);
var createAsyncIteratorProxy = __webpack_require__(163);
var createIterResultObject = __webpack_require__(131);
var closeAsyncIteration = __webpack_require__(134);

var AsyncIteratorProxy = createAsyncIteratorProxy(function (Promise) {
  var state = this;
  var iterator = state.iterator;
  var mapper = state.mapper;

  return new Promise(function (resolve, reject) {
    var doneAndReject = function (error) {
      state.done = true;
      reject(error);
    };

    var ifAbruptCloseAsyncIterator = function (error) {
      closeAsyncIteration(iterator, doneAndReject, error, doneAndReject);
    };

    Promise.resolve(anObject(call(state.next, iterator))).then(function (step) {
      try {
        if (anObject(step).done) {
          state.done = true;
          resolve(createIterResultObject(undefined, true));
        } else {
          var value = step.value;
          try {
            var result = mapper(value, state.counter++);

            var handler = function (mapped) {
              resolve(createIterResultObject(mapped, false));
            };

            if (isObject(result)) Promise.resolve(result).then(handler, ifAbruptCloseAsyncIterator);
            else handler(result);
          } catch (error2) { ifAbruptCloseAsyncIterator(error2); }
        }
      } catch (error) { doneAndReject(error); }
    }, doneAndReject);
  });
});

// `AsyncIterator.prototype.map` method
// https://github.com/tc39/proposal-iterator-helpers
module.exports = function map(mapper) {
  anObject(this);
  aCallable(mapper);
  return new AsyncIteratorProxy(getIteratorDirect(this), {
    mapper: mapper
  });
};


/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var call = __webpack_require__(7);
var perform = __webpack_require__(164);
var anObject = __webpack_require__(45);
var create = __webpack_require__(115);
var createNonEnumerableProperty = __webpack_require__(42);
var defineBuiltIns = __webpack_require__(129);
var wellKnownSymbol = __webpack_require__(32);
var InternalStateModule = __webpack_require__(50);
var getBuiltIn = __webpack_require__(22);
var getMethod = __webpack_require__(28);
var AsyncIteratorPrototype = __webpack_require__(130);
var createIterResultObject = __webpack_require__(131);
var iteratorClose = __webpack_require__(80);

var Promise = getBuiltIn('Promise');

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var ASYNC_ITERATOR_HELPER = 'AsyncIteratorHelper';
var WRAP_FOR_VALID_ASYNC_ITERATOR = 'WrapForValidAsyncIterator';
var setInternalState = InternalStateModule.set;

var createAsyncIteratorProxyPrototype = function (IS_ITERATOR) {
  var IS_GENERATOR = !IS_ITERATOR;
  var getInternalState = InternalStateModule.getterFor(IS_ITERATOR ? WRAP_FOR_VALID_ASYNC_ITERATOR : ASYNC_ITERATOR_HELPER);

  var getStateOrEarlyExit = function (that) {
    var stateCompletion = perform(function () {
      return getInternalState(that);
    });

    var stateError = stateCompletion.error;
    var state = stateCompletion.value;

    if (stateError || (IS_GENERATOR && state.done)) {
      return { exit: true, value: stateError ? Promise.reject(state) : Promise.resolve(createIterResultObject(undefined, true)) };
    } return { exit: false, value: state };
  };

  return defineBuiltIns(create(AsyncIteratorPrototype), {
    next: function next() {
      var stateCompletion = getStateOrEarlyExit(this);
      var state = stateCompletion.value;
      if (stateCompletion.exit) return state;
      var handlerCompletion = perform(function () {
        return anObject(state.nextHandler(Promise));
      });
      var handlerError = handlerCompletion.error;
      var value = handlerCompletion.value;
      if (handlerError) state.done = true;
      return handlerError ? Promise.reject(value) : Promise.resolve(value);
    },
    'return': function () {
      var stateCompletion = getStateOrEarlyExit(this);
      var state = stateCompletion.value;
      if (stateCompletion.exit) return state;
      state.done = true;
      var iterator = state.iterator;
      var returnMethod, result;
      var completion = perform(function () {
        if (state.inner) try {
          iteratorClose(state.inner.iterator, 'normal');
        } catch (error) {
          return iteratorClose(iterator, 'throw', error);
        }
        return getMethod(iterator, 'return');
      });
      returnMethod = result = completion.value;
      if (completion.error) return Promise.reject(result);
      if (returnMethod === undefined) return Promise.resolve(createIterResultObject(undefined, true));
      completion = perform(function () {
        return call(returnMethod, iterator);
      });
      result = completion.value;
      if (completion.error) return Promise.reject(result);
      return IS_ITERATOR ? Promise.resolve(result) : Promise.resolve(result).then(function (resolved) {
        anObject(resolved);
        return createIterResultObject(undefined, true);
      });
    }
  });
};

var WrapForValidAsyncIteratorPrototype = createAsyncIteratorProxyPrototype(true);
var AsyncIteratorHelperPrototype = createAsyncIteratorProxyPrototype(false);

createNonEnumerableProperty(AsyncIteratorHelperPrototype, TO_STRING_TAG, 'Async Iterator Helper');

module.exports = function (nextHandler, IS_ITERATOR) {
  var AsyncIteratorProxy = function AsyncIterator(record, state) {
    if (state) {
      state.iterator = record.iterator;
      state.next = record.next;
    } else state = record;
    state.type = IS_ITERATOR ? WRAP_FOR_VALID_ASYNC_ITERATOR : ASYNC_ITERATOR_HELPER;
    state.nextHandler = nextHandler;
    state.counter = 0;
    state.done = false;
    setInternalState(this, state);
  };

  AsyncIteratorProxy.prototype = IS_ITERATOR ? WrapForValidAsyncIteratorPrototype : AsyncIteratorHelperPrototype;

  return AsyncIteratorProxy;
};


/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function (exec) {
  try {
    return { error: false, value: exec() };
  } catch (error) {
    return { error: true, value: error };
  }
};


/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-async-explicit-resource-management
var call = __webpack_require__(7);
var defineBuiltIn = __webpack_require__(46);
var getBuiltIn = __webpack_require__(22);
var getMethod = __webpack_require__(28);
var hasOwn = __webpack_require__(37);
var wellKnownSymbol = __webpack_require__(32);
var AsyncIteratorPrototype = __webpack_require__(130);

var ASYNC_DISPOSE = wellKnownSymbol('asyncDispose');
var Promise = getBuiltIn('Promise');

if (!hasOwn(AsyncIteratorPrototype, ASYNC_DISPOSE)) {
  defineBuiltIn(AsyncIteratorPrototype, ASYNC_DISPOSE, function () {
    var O = this;
    return new Promise(function (resolve, reject) {
      var $return = getMethod(O, 'return');
      if ($return) {
        Promise.resolve(call($return, O)).then(function () {
          resolve(undefined);
        }, reject);
      } else resolve(undefined);
    });
  });
}


/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var call = __webpack_require__(7);
var anObject = __webpack_require__(45);
var getIteratorDirect = __webpack_require__(95);
var notANaN = __webpack_require__(167);
var toPositiveInteger = __webpack_require__(168);
var createAsyncIteratorProxy = __webpack_require__(163);
var createIterResultObject = __webpack_require__(131);
var IS_PURE = __webpack_require__(35);

var AsyncIteratorProxy = createAsyncIteratorProxy(function (Promise) {
  var state = this;

  return new Promise(function (resolve, reject) {
    var doneAndReject = function (error) {
      state.done = true;
      reject(error);
    };

    var loop = function () {
      try {
        Promise.resolve(anObject(call(state.next, state.iterator))).then(function (step) {
          try {
            if (anObject(step).done) {
              state.done = true;
              resolve(createIterResultObject(undefined, true));
            } else if (state.remaining) {
              state.remaining--;
              loop();
            } else resolve(createIterResultObject(step.value, false));
          } catch (err) { doneAndReject(err); }
        }, doneAndReject);
      } catch (error) { doneAndReject(error); }
    };

    loop();
  });
});

// `AsyncIterator.prototype.drop` method
// https://github.com/tc39/proposal-async-iterator-helpers
$({ target: 'AsyncIterator', proto: true, real: true, forced: IS_PURE }, {
  drop: function drop(limit) {
    anObject(this);
    var remaining = toPositiveInteger(notANaN(+limit));
    return new AsyncIteratorProxy(getIteratorDirect(this), {
      remaining: remaining
    });
  }
});


/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $RangeError = RangeError;

module.exports = function (it) {
  // eslint-disable-next-line no-self-compare -- NaN check
  if (it === it) return it;
  throw new $RangeError('NaN is not allowed');
};


/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toIntegerOrInfinity = __webpack_require__(60);

var $RangeError = RangeError;

module.exports = function (it) {
  var result = toIntegerOrInfinity(it);
  if (result < 0) throw new $RangeError("The argument can't be less than 0");
  return result;
};


/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var $every = __webpack_require__(133).every;

// `AsyncIterator.prototype.every` method
// https://github.com/tc39/proposal-async-iterator-helpers
$({ target: 'AsyncIterator', proto: true, real: true }, {
  every: function every(predicate) {
    return $every(this, predicate);
  }
});


/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var call = __webpack_require__(7);
var aCallable = __webpack_require__(29);
var anObject = __webpack_require__(45);
var isObject = __webpack_require__(19);
var getIteratorDirect = __webpack_require__(95);
var createAsyncIteratorProxy = __webpack_require__(163);
var createIterResultObject = __webpack_require__(131);
var closeAsyncIteration = __webpack_require__(134);
var IS_PURE = __webpack_require__(35);

var AsyncIteratorProxy = createAsyncIteratorProxy(function (Promise) {
  var state = this;
  var iterator = state.iterator;
  var predicate = state.predicate;

  return new Promise(function (resolve, reject) {
    var doneAndReject = function (error) {
      state.done = true;
      reject(error);
    };

    var ifAbruptCloseAsyncIterator = function (error) {
      closeAsyncIteration(iterator, doneAndReject, error, doneAndReject);
    };

    var loop = function () {
      try {
        Promise.resolve(anObject(call(state.next, iterator))).then(function (step) {
          try {
            if (anObject(step).done) {
              state.done = true;
              resolve(createIterResultObject(undefined, true));
            } else {
              var value = step.value;
              try {
                var result = predicate(value, state.counter++);

                var handler = function (selected) {
                  selected ? resolve(createIterResultObject(value, false)) : loop();
                };

                if (isObject(result)) Promise.resolve(result).then(handler, ifAbruptCloseAsyncIterator);
                else handler(result);
              } catch (error3) { ifAbruptCloseAsyncIterator(error3); }
            }
          } catch (error2) { doneAndReject(error2); }
        }, doneAndReject);
      } catch (error) { doneAndReject(error); }
    };

    loop();
  });
});

// `AsyncIterator.prototype.filter` method
// https://github.com/tc39/proposal-async-iterator-helpers
$({ target: 'AsyncIterator', proto: true, real: true, forced: IS_PURE }, {
  filter: function filter(predicate) {
    anObject(this);
    aCallable(predicate);
    return new AsyncIteratorProxy(getIteratorDirect(this), {
      predicate: predicate
    });
  }
});


/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var $find = __webpack_require__(133).find;

// `AsyncIterator.prototype.find` method
// https://github.com/tc39/proposal-async-iterator-helpers
$({ target: 'AsyncIterator', proto: true, real: true }, {
  find: function find(predicate) {
    return $find(this, predicate);
  }
});


/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var call = __webpack_require__(7);
var aCallable = __webpack_require__(29);
var anObject = __webpack_require__(45);
var isObject = __webpack_require__(19);
var getIteratorDirect = __webpack_require__(95);
var createAsyncIteratorProxy = __webpack_require__(163);
var createIterResultObject = __webpack_require__(131);
var getAsyncIteratorFlattenable = __webpack_require__(173);
var closeAsyncIteration = __webpack_require__(134);
var IS_PURE = __webpack_require__(35);

var AsyncIteratorProxy = createAsyncIteratorProxy(function (Promise) {
  var state = this;
  var iterator = state.iterator;
  var mapper = state.mapper;

  return new Promise(function (resolve, reject) {
    var doneAndReject = function (error) {
      state.done = true;
      reject(error);
    };

    var ifAbruptCloseAsyncIterator = function (error) {
      closeAsyncIteration(iterator, doneAndReject, error, doneAndReject);
    };

    var outerLoop = function () {
      try {
        Promise.resolve(anObject(call(state.next, iterator))).then(function (step) {
          try {
            if (anObject(step).done) {
              state.done = true;
              resolve(createIterResultObject(undefined, true));
            } else {
              var value = step.value;
              try {
                var result = mapper(value, state.counter++);

                var handler = function (mapped) {
                  try {
                    state.inner = getAsyncIteratorFlattenable(mapped);
                    innerLoop();
                  } catch (error4) { ifAbruptCloseAsyncIterator(error4); }
                };

                if (isObject(result)) Promise.resolve(result).then(handler, ifAbruptCloseAsyncIterator);
                else handler(result);
              } catch (error3) { ifAbruptCloseAsyncIterator(error3); }
            }
          } catch (error2) { doneAndReject(error2); }
        }, doneAndReject);
      } catch (error) { doneAndReject(error); }
    };

    var innerLoop = function () {
      var inner = state.inner;
      if (inner) {
        try {
          Promise.resolve(anObject(call(inner.next, inner.iterator))).then(function (result) {
            try {
              if (anObject(result).done) {
                state.inner = null;
                outerLoop();
              } else resolve(createIterResultObject(result.value, false));
            } catch (error1) { ifAbruptCloseAsyncIterator(error1); }
          }, ifAbruptCloseAsyncIterator);
        } catch (error) { ifAbruptCloseAsyncIterator(error); }
      } else outerLoop();
    };

    innerLoop();
  });
});

// `AsyncIterator.prototype.flaMap` method
// https://github.com/tc39/proposal-async-iterator-helpers
$({ target: 'AsyncIterator', proto: true, real: true, forced: IS_PURE }, {
  flatMap: function flatMap(mapper) {
    anObject(this);
    aCallable(mapper);
    return new AsyncIteratorProxy(getIteratorDirect(this), {
      mapper: mapper,
      inner: null
    });
  }
});


/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var call = __webpack_require__(7);
var isCallable = __webpack_require__(20);
var anObject = __webpack_require__(45);
var getIteratorDirect = __webpack_require__(95);
var getIteratorMethod = __webpack_require__(77);
var getMethod = __webpack_require__(28);
var wellKnownSymbol = __webpack_require__(32);
var AsyncFromSyncIterator = __webpack_require__(128);

var ASYNC_ITERATOR = wellKnownSymbol('asyncIterator');

module.exports = function (obj) {
  var object = anObject(obj);
  var alreadyAsync = true;
  var method = getMethod(object, ASYNC_ITERATOR);
  var iterator;
  if (!isCallable(method)) {
    method = getIteratorMethod(object);
    alreadyAsync = false;
  }
  if (method !== undefined) {
    iterator = call(method, object);
  } else {
    iterator = object;
    alreadyAsync = true;
  }
  anObject(iterator);
  return getIteratorDirect(alreadyAsync ? iterator : new AsyncFromSyncIterator(getIteratorDirect(iterator)));
};


/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var $forEach = __webpack_require__(133).forEach;

// `AsyncIterator.prototype.forEach` method
// https://github.com/tc39/proposal-async-iterator-helpers
$({ target: 'AsyncIterator', proto: true, real: true }, {
  forEach: function forEach(fn) {
    return $forEach(this, fn);
  }
});


/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var toObject = __webpack_require__(38);
var isPrototypeOf = __webpack_require__(23);
var getAsyncIteratorFlattenable = __webpack_require__(173);
var AsyncIteratorPrototype = __webpack_require__(130);
var WrapAsyncIterator = __webpack_require__(176);
var IS_PURE = __webpack_require__(35);

// `AsyncIterator.from` method
// https://github.com/tc39/proposal-async-iterator-helpers
$({ target: 'AsyncIterator', stat: true, forced: IS_PURE }, {
  from: function from(O) {
    var iteratorRecord = getAsyncIteratorFlattenable(typeof O == 'string' ? toObject(O) : O);
    return isPrototypeOf(AsyncIteratorPrototype, iteratorRecord.iterator)
      ? iteratorRecord.iterator
      : new WrapAsyncIterator(iteratorRecord);
  }
});


/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var call = __webpack_require__(7);
var createAsyncIteratorProxy = __webpack_require__(163);

module.exports = createAsyncIteratorProxy(function () {
  return call(this.next, this.iterator);
}, true);


/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// TODO: Remove from `core-js@4`
var $ = __webpack_require__(2);
var indexed = __webpack_require__(161);

// `AsyncIterator.prototype.indexed` method
// https://github.com/tc39/proposal-iterator-helpers
$({ target: 'AsyncIterator', proto: true, real: true, forced: true }, {
  indexed: indexed
});


/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var map = __webpack_require__(162);
var IS_PURE = __webpack_require__(35);

// `AsyncIterator.prototype.map` method
// https://github.com/tc39/proposal-async-iterator-helpers
$({ target: 'AsyncIterator', proto: true, real: true, forced: IS_PURE }, {
  map: map
});



/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var call = __webpack_require__(7);
var aCallable = __webpack_require__(29);
var anObject = __webpack_require__(45);
var isObject = __webpack_require__(19);
var getBuiltIn = __webpack_require__(22);
var getIteratorDirect = __webpack_require__(95);
var closeAsyncIteration = __webpack_require__(134);

var Promise = getBuiltIn('Promise');
var $TypeError = TypeError;

// `AsyncIterator.prototype.reduce` method
// https://github.com/tc39/proposal-async-iterator-helpers
$({ target: 'AsyncIterator', proto: true, real: true }, {
  reduce: function reduce(reducer /* , initialValue */) {
    anObject(this);
    aCallable(reducer);
    var record = getIteratorDirect(this);
    var iterator = record.iterator;
    var next = record.next;
    var noInitial = arguments.length < 2;
    var accumulator = noInitial ? undefined : arguments[1];
    var counter = 0;

    return new Promise(function (resolve, reject) {
      var ifAbruptCloseAsyncIterator = function (error) {
        closeAsyncIteration(iterator, reject, error, reject);
      };

      var loop = function () {
        try {
          Promise.resolve(anObject(call(next, iterator))).then(function (step) {
            try {
              if (anObject(step).done) {
                noInitial ? reject(new $TypeError('Reduce of empty iterator with no initial value')) : resolve(accumulator);
              } else {
                var value = step.value;
                if (noInitial) {
                  noInitial = false;
                  accumulator = value;
                  loop();
                } else try {
                  var result = reducer(accumulator, value, counter);

                  var handler = function ($result) {
                    accumulator = $result;
                    loop();
                  };

                  if (isObject(result)) Promise.resolve(result).then(handler, ifAbruptCloseAsyncIterator);
                  else handler(result);
                } catch (error3) { ifAbruptCloseAsyncIterator(error3); }
              }
              counter++;
            } catch (error2) { reject(error2); }
          }, reject);
        } catch (error) { reject(error); }
      };

      loop();
    });
  }
});


/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var $some = __webpack_require__(133).some;

// `AsyncIterator.prototype.some` method
// https://github.com/tc39/proposal-async-iterator-helpers
$({ target: 'AsyncIterator', proto: true, real: true }, {
  some: function some(predicate) {
    return $some(this, predicate);
  }
});


/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var call = __webpack_require__(7);
var anObject = __webpack_require__(45);
var getIteratorDirect = __webpack_require__(95);
var notANaN = __webpack_require__(167);
var toPositiveInteger = __webpack_require__(168);
var createAsyncIteratorProxy = __webpack_require__(163);
var createIterResultObject = __webpack_require__(131);
var IS_PURE = __webpack_require__(35);

var AsyncIteratorProxy = createAsyncIteratorProxy(function (Promise) {
  var state = this;
  var iterator = state.iterator;
  var returnMethod;

  if (!state.remaining--) {
    var resultDone = createIterResultObject(undefined, true);
    state.done = true;
    returnMethod = iterator['return'];
    if (returnMethod !== undefined) {
      return Promise.resolve(call(returnMethod, iterator, undefined)).then(function () {
        return resultDone;
      });
    }
    return resultDone;
  } return Promise.resolve(call(state.next, iterator)).then(function (step) {
    if (anObject(step).done) {
      state.done = true;
      return createIterResultObject(undefined, true);
    } return createIterResultObject(step.value, false);
  }).then(null, function (error) {
    state.done = true;
    throw error;
  });
});

// `AsyncIterator.prototype.take` method
// https://github.com/tc39/proposal-async-iterator-helpers
$({ target: 'AsyncIterator', proto: true, real: true, forced: IS_PURE }, {
  take: function take(limit) {
    anObject(this);
    var remaining = toPositiveInteger(notANaN(+limit));
    return new AsyncIteratorProxy(getIteratorDirect(this), {
      remaining: remaining
    });
  }
});


/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var $toArray = __webpack_require__(133).toArray;

// `AsyncIterator.prototype.toArray` method
// https://github.com/tc39/proposal-async-iterator-helpers
$({ target: 'AsyncIterator', proto: true, real: true }, {
  toArray: function toArray() {
    return $toArray(this, undefined, []);
  }
});


/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* eslint-disable es/no-bigint -- safe */
var $ = __webpack_require__(2);
var NumericRangeIterator = __webpack_require__(184);

// `BigInt.range` method
// https://github.com/tc39/proposal-Number.range
// TODO: Remove from `core-js@4`
if (typeof BigInt == 'function') {
  $({ target: 'BigInt', stat: true, forced: true }, {
    range: function range(start, end, option) {
      return new NumericRangeIterator(start, end, option, 'bigint', BigInt(0), BigInt(1));
    }
  });
}


/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var InternalStateModule = __webpack_require__(50);
var createIteratorConstructor = __webpack_require__(185);
var createIterResultObject = __webpack_require__(131);
var isNullOrUndefined = __webpack_require__(16);
var isObject = __webpack_require__(19);
var defineBuiltInAccessor = __webpack_require__(151);
var DESCRIPTORS = __webpack_require__(5);

var INCORRECT_RANGE = 'Incorrect Iterator.range arguments';
var NUMERIC_RANGE_ITERATOR = 'NumericRangeIterator';

var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(NUMERIC_RANGE_ITERATOR);

var $RangeError = RangeError;
var $TypeError = TypeError;

var $RangeIterator = createIteratorConstructor(function NumericRangeIterator(start, end, option, type, zero, one) {
  // TODO: Drop the first `typeof` check after removing legacy methods in `core-js@4`
  if (typeof start != type || (end !== Infinity && end !== -Infinity && typeof end != type)) {
    throw new $TypeError(INCORRECT_RANGE);
  }
  if (start === Infinity || start === -Infinity) {
    throw new $RangeError(INCORRECT_RANGE);
  }
  var ifIncrease = end > start;
  var inclusiveEnd = false;
  var step;
  if (option === undefined) {
    step = undefined;
  } else if (isObject(option)) {
    step = option.step;
    inclusiveEnd = !!option.inclusive;
  } else if (typeof option == type) {
    step = option;
  } else {
    throw new $TypeError(INCORRECT_RANGE);
  }
  if (isNullOrUndefined(step)) {
    step = ifIncrease ? one : -one;
  }
  if (typeof step != type) {
    throw new $TypeError(INCORRECT_RANGE);
  }
  if (step === Infinity || step === -Infinity || (step === zero && start !== end)) {
    throw new $RangeError(INCORRECT_RANGE);
  }
  // eslint-disable-next-line no-self-compare -- NaN check
  var hitsEnd = start !== start || end !== end || step !== step || (end > start) !== (step > zero);
  setInternalState(this, {
    type: NUMERIC_RANGE_ITERATOR,
    start: start,
    end: end,
    step: step,
    inclusive: inclusiveEnd,
    hitsEnd: hitsEnd,
    currentCount: zero,
    zero: zero
  });
  if (!DESCRIPTORS) {
    this.start = start;
    this.end = end;
    this.step = step;
    this.inclusive = inclusiveEnd;
  }
}, NUMERIC_RANGE_ITERATOR, function next() {
  var state = getInternalState(this);
  if (state.hitsEnd) return createIterResultObject(undefined, true);
  var start = state.start;
  var end = state.end;
  var step = state.step;
  var currentYieldingValue = start + (step * state.currentCount++);
  if (currentYieldingValue === end) state.hitsEnd = true;
  var inclusiveEnd = state.inclusive;
  var endCondition;
  if (end > start) {
    endCondition = inclusiveEnd ? currentYieldingValue > end : currentYieldingValue >= end;
  } else {
    endCondition = inclusiveEnd ? end > currentYieldingValue : end >= currentYieldingValue;
  }
  if (endCondition) {
    state.hitsEnd = true;
    return createIterResultObject(undefined, true);
  } return createIterResultObject(currentYieldingValue, false);
});

var addGetter = function (key) {
  defineBuiltInAccessor($RangeIterator.prototype, key, {
    get: function () {
      return getInternalState(this)[key];
    },
    set: function () { /* empty */ },
    configurable: true,
    enumerable: false
  });
};

if (DESCRIPTORS) {
  addGetter('start');
  addGetter('end');
  addGetter('inclusive');
  addGetter('step');
}

module.exports = $RangeIterator;


/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var IteratorPrototype = __webpack_require__(186).IteratorPrototype;
var create = __webpack_require__(115);
var createPropertyDescriptor = __webpack_require__(10);
var setToStringTag = __webpack_require__(187);
var Iterators = __webpack_require__(75);

var returnThis = function () { return this; };

module.exports = function (IteratorConstructor, NAME, next, ENUMERABLE_NEXT) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = create(IteratorPrototype, { next: createPropertyDescriptor(+!ENUMERABLE_NEXT, next) });
  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
  Iterators[TO_STRING_TAG] = returnThis;
  return IteratorConstructor;
};


/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__(6);
var isCallable = __webpack_require__(20);
var isObject = __webpack_require__(19);
var create = __webpack_require__(115);
var getPrototypeOf = __webpack_require__(110);
var defineBuiltIn = __webpack_require__(46);
var wellKnownSymbol = __webpack_require__(32);
var IS_PURE = __webpack_require__(35);

var ITERATOR = wellKnownSymbol('iterator');
var BUGGY_SAFARI_ITERATORS = false;

// `%IteratorPrototype%` object
// https://tc39.es/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

/* eslint-disable es/no-array-prototype-keys -- safe */
if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
  else {
    PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
  }
}

var NEW_ITERATOR_PROTOTYPE = !isObject(IteratorPrototype) || fails(function () {
  var test = {};
  // FF44- legacy iterators case
  return IteratorPrototype[ITERATOR].call(test) !== test;
});

if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype = {};
else if (IS_PURE) IteratorPrototype = create(IteratorPrototype);

// `%IteratorPrototype%[@@iterator]()` method
// https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
if (!isCallable(IteratorPrototype[ITERATOR])) {
  defineBuiltIn(IteratorPrototype, ITERATOR, function () {
    return this;
  });
}

module.exports = {
  IteratorPrototype: IteratorPrototype,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};


/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var defineProperty = __webpack_require__(43).f;
var hasOwn = __webpack_require__(37);
var wellKnownSymbol = __webpack_require__(32);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');

module.exports = function (target, TAG, STATIC) {
  if (target && !STATIC) target = target.prototype;
  if (target && !hasOwn(target, TO_STRING_TAG)) {
    defineProperty(target, TO_STRING_TAG, { configurable: true, value: TAG });
  }
};


/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var apply = __webpack_require__(189);
var getCompositeKeyNode = __webpack_require__(190);
var getBuiltIn = __webpack_require__(22);
var create = __webpack_require__(115);

var $Object = Object;

var initializer = function () {
  var freeze = getBuiltIn('Object', 'freeze');
  return freeze ? freeze(create(null)) : create(null);
};

// https://github.com/tc39/proposal-richer-keys/tree/master/compositeKey
$({ global: true, forced: true }, {
  compositeKey: function compositeKey() {
    return apply(getCompositeKeyNode, $Object, arguments).get('object', initializer);
  }
});


/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var NATIVE_BIND = __webpack_require__(8);

var FunctionPrototype = Function.prototype;
var apply = FunctionPrototype.apply;
var call = FunctionPrototype.call;

// eslint-disable-next-line es/no-reflect -- safe
module.exports = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND ? call.bind(apply) : function () {
  return call.apply(apply, arguments);
});


/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`
__webpack_require__(191);
__webpack_require__(205);
var getBuiltIn = __webpack_require__(22);
var create = __webpack_require__(115);
var isObject = __webpack_require__(19);

var $Object = Object;
var $TypeError = TypeError;
var Map = getBuiltIn('Map');
var WeakMap = getBuiltIn('WeakMap');

var Node = function () {
  // keys
  this.object = null;
  this.symbol = null;
  // child nodes
  this.primitives = null;
  this.objectsByIndex = create(null);
};

Node.prototype.get = function (key, initializer) {
  return this[key] || (this[key] = initializer());
};

Node.prototype.next = function (i, it, IS_OBJECT) {
  var store = IS_OBJECT
    ? this.objectsByIndex[i] || (this.objectsByIndex[i] = new WeakMap())
    : this.primitives || (this.primitives = new Map());
  var entry = store.get(it);
  if (!entry) store.set(it, entry = new Node());
  return entry;
};

var root = new Node();

module.exports = function () {
  var active = root;
  var length = arguments.length;
  var i, it;
  // for prevent leaking, start from objects
  for (i = 0; i < length; i++) {
    if (isObject(it = arguments[i])) active = active.next(i, it, true);
  }
  if (this === $Object && active === root) throw new $TypeError('Composite keys must contain a non-primitive component');
  for (i = 0; i < length; i++) {
    if (!isObject(it = arguments[i])) active = active.next(i, it, false);
  } return active;
};


/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// TODO: Remove this module from `core-js@4` since it's replaced to module below
__webpack_require__(192);


/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var collection = __webpack_require__(193);
var collectionStrong = __webpack_require__(202);

// `Map` constructor
// https://tc39.es/ecma262/#sec-map-objects
collection('Map', function (init) {
  return function Map() { return init(this, arguments.length ? arguments[0] : undefined); };
}, collectionStrong);


/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var globalThis = __webpack_require__(3);
var uncurryThis = __webpack_require__(13);
var isForced = __webpack_require__(66);
var defineBuiltIn = __webpack_require__(46);
var InternalMetadataModule = __webpack_require__(194);
var iterate = __webpack_require__(71);
var anInstance = __webpack_require__(157);
var isCallable = __webpack_require__(20);
var isNullOrUndefined = __webpack_require__(16);
var isObject = __webpack_require__(19);
var fails = __webpack_require__(6);
var checkCorrectnessOfIteration = __webpack_require__(200);
var setToStringTag = __webpack_require__(187);
var inheritIfRequired = __webpack_require__(201);

module.exports = function (CONSTRUCTOR_NAME, wrapper, common) {
  var IS_MAP = CONSTRUCTOR_NAME.indexOf('Map') !== -1;
  var IS_WEAK = CONSTRUCTOR_NAME.indexOf('Weak') !== -1;
  var ADDER = IS_MAP ? 'set' : 'add';
  var NativeConstructor = globalThis[CONSTRUCTOR_NAME];
  var NativePrototype = NativeConstructor && NativeConstructor.prototype;
  var Constructor = NativeConstructor;
  var exported = {};

  var fixMethod = function (KEY) {
    var uncurriedNativeMethod = uncurryThis(NativePrototype[KEY]);
    defineBuiltIn(NativePrototype, KEY,
      KEY === 'add' ? function add(value) {
        uncurriedNativeMethod(this, value === 0 ? 0 : value);
        return this;
      } : KEY === 'delete' ? function (key) {
        return IS_WEAK && !isObject(key) ? false : uncurriedNativeMethod(this, key === 0 ? 0 : key);
      } : KEY === 'get' ? function get(key) {
        return IS_WEAK && !isObject(key) ? undefined : uncurriedNativeMethod(this, key === 0 ? 0 : key);
      } : KEY === 'has' ? function has(key) {
        return IS_WEAK && !isObject(key) ? false : uncurriedNativeMethod(this, key === 0 ? 0 : key);
      } : function set(key, value) {
        uncurriedNativeMethod(this, key === 0 ? 0 : key, value);
        return this;
      }
    );
  };

  var REPLACE = isForced(
    CONSTRUCTOR_NAME,
    !isCallable(NativeConstructor) || !(IS_WEAK || NativePrototype.forEach && !fails(function () {
      new NativeConstructor().entries().next();
    }))
  );

  if (REPLACE) {
    // create collection constructor
    Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
    InternalMetadataModule.enable();
  } else if (isForced(CONSTRUCTOR_NAME, true)) {
    var instance = new Constructor();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) !== instance;
    // V8 ~ Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    // eslint-disable-next-line no-new -- required for testing
    var ACCEPT_ITERABLES = checkCorrectnessOfIteration(function (iterable) { new NativeConstructor(iterable); });
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new NativeConstructor();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
    });

    if (!ACCEPT_ITERABLES) {
      Constructor = wrapper(function (dummy, iterable) {
        anInstance(dummy, NativePrototype);
        var that = inheritIfRequired(new NativeConstructor(), dummy, Constructor);
        if (!isNullOrUndefined(iterable)) iterate(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
        return that;
      });
      Constructor.prototype = NativePrototype;
      NativePrototype.constructor = Constructor;
    }

    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }

    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);

    // weak collections should not contains .clear method
    if (IS_WEAK && NativePrototype.clear) delete NativePrototype.clear;
  }

  exported[CONSTRUCTOR_NAME] = Constructor;
  $({ global: true, constructor: true, forced: Constructor !== NativeConstructor }, exported);

  setToStringTag(Constructor, CONSTRUCTOR_NAME);

  if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);

  return Constructor;
};


/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var uncurryThis = __webpack_require__(13);
var hiddenKeys = __webpack_require__(53);
var isObject = __webpack_require__(19);
var hasOwn = __webpack_require__(37);
var defineProperty = __webpack_require__(43).f;
var getOwnPropertyNamesModule = __webpack_require__(56);
var getOwnPropertyNamesExternalModule = __webpack_require__(195);
var isExtensible = __webpack_require__(197);
var uid = __webpack_require__(39);
var FREEZING = __webpack_require__(199);

var REQUIRED = false;
var METADATA = uid('meta');
var id = 0;

var setMetadata = function (it) {
  defineProperty(it, METADATA, { value: {
    objectID: 'O' + id++, // object ID
    weakData: {}          // weak collections IDs
  } });
};

var fastKey = function (it, create) {
  // return a primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!hasOwn(it, METADATA)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMetadata(it);
  // return object ID
  } return it[METADATA].objectID;
};

var getWeakData = function (it, create) {
  if (!hasOwn(it, METADATA)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMetadata(it);
  // return the store of weak collections IDs
  } return it[METADATA].weakData;
};

// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZING && REQUIRED && isExtensible(it) && !hasOwn(it, METADATA)) setMetadata(it);
  return it;
};

var enable = function () {
  meta.enable = function () { /* empty */ };
  REQUIRED = true;
  var getOwnPropertyNames = getOwnPropertyNamesModule.f;
  var splice = uncurryThis([].splice);
  var test = {};
  test[METADATA] = 1;

  // prevent exposing of metadata key
  if (getOwnPropertyNames(test).length) {
    getOwnPropertyNamesModule.f = function (it) {
      var result = getOwnPropertyNames(it);
      for (var i = 0, length = result.length; i < length; i++) {
        if (result[i] === METADATA) {
          splice(result, i, 1);
          break;
        }
      } return result;
    };

    $({ target: 'Object', stat: true, forced: true }, {
      getOwnPropertyNames: getOwnPropertyNamesExternalModule.f
    });
  }
};

var meta = module.exports = {
  enable: enable,
  fastKey: fastKey,
  getWeakData: getWeakData,
  onFreeze: onFreeze
};

hiddenKeys[METADATA] = true;


/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* eslint-disable es/no-object-getownpropertynames -- safe */
var classof = __webpack_require__(14);
var toIndexedObject = __webpack_require__(11);
var $getOwnPropertyNames = __webpack_require__(56).f;
var arraySlice = __webpack_require__(196);

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return $getOwnPropertyNames(it);
  } catch (error) {
    return arraySlice(windowNames);
  }
};

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && classof(it) === 'Window'
    ? getWindowNames(it)
    : $getOwnPropertyNames(toIndexedObject(it));
};


/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var uncurryThis = __webpack_require__(13);

module.exports = uncurryThis([].slice);


/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__(6);
var isObject = __webpack_require__(19);
var classof = __webpack_require__(14);
var ARRAY_BUFFER_NON_EXTENSIBLE = __webpack_require__(198);

// eslint-disable-next-line es/no-object-isextensible -- safe
var $isExtensible = Object.isExtensible;
var FAILS_ON_PRIMITIVES = fails(function () { $isExtensible(1); });

// `Object.isExtensible` method
// https://tc39.es/ecma262/#sec-object.isextensible
module.exports = (FAILS_ON_PRIMITIVES || ARRAY_BUFFER_NON_EXTENSIBLE) ? function isExtensible(it) {
  if (!isObject(it)) return false;
  if (ARRAY_BUFFER_NON_EXTENSIBLE && classof(it) === 'ArrayBuffer') return false;
  return $isExtensible ? $isExtensible(it) : true;
} : $isExtensible;


/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// FF26- bug: ArrayBuffers are non-extensible, but Object.isExtensible does not report it
var fails = __webpack_require__(6);

module.exports = fails(function () {
  if (typeof ArrayBuffer == 'function') {
    var buffer = new ArrayBuffer(8);
    // eslint-disable-next-line es/no-object-isextensible, es/no-object-defineproperty -- safe
    if (Object.isExtensible(buffer)) Object.defineProperty(buffer, 'a', { value: 8 });
  }
});


/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__(6);

module.exports = !fails(function () {
  // eslint-disable-next-line es/no-object-isextensible, es/no-object-preventextensions -- required for testing
  return Object.isExtensible(Object.preventExtensions({}));
});


/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var wellKnownSymbol = __webpack_require__(32);

var ITERATOR = wellKnownSymbol('iterator');
var SAFE_CLOSING = false;

try {
  var called = 0;
  var iteratorWithReturn = {
    next: function () {
      return { done: !!called++ };
    },
    'return': function () {
      SAFE_CLOSING = true;
    }
  };
  iteratorWithReturn[ITERATOR] = function () {
    return this;
  };
  // eslint-disable-next-line es/no-array-from, no-throw-literal -- required for testing
  Array.from(iteratorWithReturn, function () { throw 2; });
} catch (error) { /* empty */ }

module.exports = function (exec, SKIP_CLOSING) {
  try {
    if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
  } catch (error) { return false; } // workaround of old WebKit + `eval` bug
  var ITERATION_SUPPORT = false;
  try {
    var object = {};
    object[ITERATOR] = function () {
      return {
        next: function () {
          return { done: ITERATION_SUPPORT = true };
        }
      };
    };
    exec(object);
  } catch (error) { /* empty */ }
  return ITERATION_SUPPORT;
};


/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var isCallable = __webpack_require__(20);
var isObject = __webpack_require__(19);
var setPrototypeOf = __webpack_require__(112);

// makes subclassing work correct for wrapped built-ins
module.exports = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if (
    // it can work only with native `setPrototypeOf`
    setPrototypeOf &&
    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    isCallable(NewTarget = dummy.constructor) &&
    NewTarget !== Wrapper &&
    isObject(NewTargetPrototype = NewTarget.prototype) &&
    NewTargetPrototype !== Wrapper.prototype
  ) setPrototypeOf($this, NewTargetPrototype);
  return $this;
};


/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(115);
var defineBuiltInAccessor = __webpack_require__(151);
var defineBuiltIns = __webpack_require__(129);
var bind = __webpack_require__(72);
var anInstance = __webpack_require__(157);
var isNullOrUndefined = __webpack_require__(16);
var iterate = __webpack_require__(71);
var defineIterator = __webpack_require__(203);
var createIterResultObject = __webpack_require__(131);
var setSpecies = __webpack_require__(204);
var DESCRIPTORS = __webpack_require__(5);
var fastKey = __webpack_require__(194).fastKey;
var InternalStateModule = __webpack_require__(50);

var setInternalState = InternalStateModule.set;
var internalStateGetterFor = InternalStateModule.getterFor;

module.exports = {
  getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
    var Constructor = wrapper(function (that, iterable) {
      anInstance(that, Prototype);
      setInternalState(that, {
        type: CONSTRUCTOR_NAME,
        index: create(null),
        first: undefined,
        last: undefined,
        size: 0
      });
      if (!DESCRIPTORS) that.size = 0;
      if (!isNullOrUndefined(iterable)) iterate(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
    });

    var Prototype = Constructor.prototype;

    var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

    var define = function (that, key, value) {
      var state = getInternalState(that);
      var entry = getEntry(that, key);
      var previous, index;
      // change existing entry
      if (entry) {
        entry.value = value;
      // create new entry
      } else {
        state.last = entry = {
          index: index = fastKey(key, true),
          key: key,
          value: value,
          previous: previous = state.last,
          next: undefined,
          removed: false
        };
        if (!state.first) state.first = entry;
        if (previous) previous.next = entry;
        if (DESCRIPTORS) state.size++;
        else that.size++;
        // add to index
        if (index !== 'F') state.index[index] = entry;
      } return that;
    };

    var getEntry = function (that, key) {
      var state = getInternalState(that);
      // fast case
      var index = fastKey(key);
      var entry;
      if (index !== 'F') return state.index[index];
      // frozen object case
      for (entry = state.first; entry; entry = entry.next) {
        if (entry.key === key) return entry;
      }
    };

    defineBuiltIns(Prototype, {
      // `{ Map, Set }.prototype.clear()` methods
      // https://tc39.es/ecma262/#sec-map.prototype.clear
      // https://tc39.es/ecma262/#sec-set.prototype.clear
      clear: function clear() {
        var that = this;
        var state = getInternalState(that);
        var entry = state.first;
        while (entry) {
          entry.removed = true;
          if (entry.previous) entry.previous = entry.previous.next = undefined;
          entry = entry.next;
        }
        state.first = state.last = undefined;
        state.index = create(null);
        if (DESCRIPTORS) state.size = 0;
        else that.size = 0;
      },
      // `{ Map, Set }.prototype.delete(key)` methods
      // https://tc39.es/ecma262/#sec-map.prototype.delete
      // https://tc39.es/ecma262/#sec-set.prototype.delete
      'delete': function (key) {
        var that = this;
        var state = getInternalState(that);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.next;
          var prev = entry.previous;
          delete state.index[entry.index];
          entry.removed = true;
          if (prev) prev.next = next;
          if (next) next.previous = prev;
          if (state.first === entry) state.first = next;
          if (state.last === entry) state.last = prev;
          if (DESCRIPTORS) state.size--;
          else that.size--;
        } return !!entry;
      },
      // `{ Map, Set }.prototype.forEach(callbackfn, thisArg = undefined)` methods
      // https://tc39.es/ecma262/#sec-map.prototype.foreach
      // https://tc39.es/ecma262/#sec-set.prototype.foreach
      forEach: function forEach(callbackfn /* , that = undefined */) {
        var state = getInternalState(this);
        var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
        var entry;
        while (entry = entry ? entry.next : state.first) {
          boundFunction(entry.value, entry.key, this);
          // revert to the last existing entry
          while (entry && entry.removed) entry = entry.previous;
        }
      },
      // `{ Map, Set}.prototype.has(key)` methods
      // https://tc39.es/ecma262/#sec-map.prototype.has
      // https://tc39.es/ecma262/#sec-set.prototype.has
      has: function has(key) {
        return !!getEntry(this, key);
      }
    });

    defineBuiltIns(Prototype, IS_MAP ? {
      // `Map.prototype.get(key)` method
      // https://tc39.es/ecma262/#sec-map.prototype.get
      get: function get(key) {
        var entry = getEntry(this, key);
        return entry && entry.value;
      },
      // `Map.prototype.set(key, value)` method
      // https://tc39.es/ecma262/#sec-map.prototype.set
      set: function set(key, value) {
        return define(this, key === 0 ? 0 : key, value);
      }
    } : {
      // `Set.prototype.add(value)` method
      // https://tc39.es/ecma262/#sec-set.prototype.add
      add: function add(value) {
        return define(this, value = value === 0 ? 0 : value, value);
      }
    });
    if (DESCRIPTORS) defineBuiltInAccessor(Prototype, 'size', {
      configurable: true,
      get: function () {
        return getInternalState(this).size;
      }
    });
    return Constructor;
  },
  setStrong: function (Constructor, CONSTRUCTOR_NAME, IS_MAP) {
    var ITERATOR_NAME = CONSTRUCTOR_NAME + ' Iterator';
    var getInternalCollectionState = internalStateGetterFor(CONSTRUCTOR_NAME);
    var getInternalIteratorState = internalStateGetterFor(ITERATOR_NAME);
    // `{ Map, Set }.prototype.{ keys, values, entries, @@iterator }()` methods
    // https://tc39.es/ecma262/#sec-map.prototype.entries
    // https://tc39.es/ecma262/#sec-map.prototype.keys
    // https://tc39.es/ecma262/#sec-map.prototype.values
    // https://tc39.es/ecma262/#sec-map.prototype-@@iterator
    // https://tc39.es/ecma262/#sec-set.prototype.entries
    // https://tc39.es/ecma262/#sec-set.prototype.keys
    // https://tc39.es/ecma262/#sec-set.prototype.values
    // https://tc39.es/ecma262/#sec-set.prototype-@@iterator
    defineIterator(Constructor, CONSTRUCTOR_NAME, function (iterated, kind) {
      setInternalState(this, {
        type: ITERATOR_NAME,
        target: iterated,
        state: getInternalCollectionState(iterated),
        kind: kind,
        last: undefined
      });
    }, function () {
      var state = getInternalIteratorState(this);
      var kind = state.kind;
      var entry = state.last;
      // revert to the last existing entry
      while (entry && entry.removed) entry = entry.previous;
      // get next entry
      if (!state.target || !(state.last = entry = entry ? entry.next : state.state.first)) {
        // or finish the iteration
        state.target = undefined;
        return createIterResultObject(undefined, true);
      }
      // return step by kind
      if (kind === 'keys') return createIterResultObject(entry.key, false);
      if (kind === 'values') return createIterResultObject(entry.value, false);
      return createIterResultObject([entry.key, entry.value], false);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // `{ Map, Set }.prototype[@@species]` accessors
    // https://tc39.es/ecma262/#sec-get-map-@@species
    // https://tc39.es/ecma262/#sec-get-set-@@species
    setSpecies(CONSTRUCTOR_NAME);
  }
};


/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var call = __webpack_require__(7);
var IS_PURE = __webpack_require__(35);
var FunctionName = __webpack_require__(48);
var isCallable = __webpack_require__(20);
var createIteratorConstructor = __webpack_require__(185);
var getPrototypeOf = __webpack_require__(110);
var setPrototypeOf = __webpack_require__(112);
var setToStringTag = __webpack_require__(187);
var createNonEnumerableProperty = __webpack_require__(42);
var defineBuiltIn = __webpack_require__(46);
var wellKnownSymbol = __webpack_require__(32);
var Iterators = __webpack_require__(75);
var IteratorsCore = __webpack_require__(186);

var PROPER_FUNCTION_NAME = FunctionName.PROPER;
var CONFIGURABLE_FUNCTION_NAME = FunctionName.CONFIGURABLE;
var IteratorPrototype = IteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR = wellKnownSymbol('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis = function () { return this; };

module.exports = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS && KIND && KIND in IterablePrototype) return IterablePrototype[KIND];

    switch (KIND) {
      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
    }

    return function () { return new IteratorConstructor(this); };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR]
    || IterablePrototype['@@iterator']
    || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME === 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY;

  // fix native
  if (anyNativeIterator) {
    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
    if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
      if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
        if (setPrototypeOf) {
          setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
        } else if (!isCallable(CurrentIteratorPrototype[ITERATOR])) {
          defineBuiltIn(CurrentIteratorPrototype, ITERATOR, returnThis);
        }
      }
      // Set @@toStringTag to native iterators
      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
      if (IS_PURE) Iterators[TO_STRING_TAG] = returnThis;
    }
  }

  // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
  if (PROPER_FUNCTION_NAME && DEFAULT === VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    if (!IS_PURE && CONFIGURABLE_FUNCTION_NAME) {
      createNonEnumerableProperty(IterablePrototype, 'name', VALUES);
    } else {
      INCORRECT_VALUES_NAME = true;
      defaultIterator = function values() { return call(nativeIterator, this); };
    }
  }

  // export additional methods
  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        defineBuiltIn(IterablePrototype, KEY, methods[KEY]);
      }
    } else $({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
  }

  // define iterator
  if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
    defineBuiltIn(IterablePrototype, ITERATOR, defaultIterator, { name: DEFAULT });
  }
  Iterators[NAME] = defaultIterator;

  return methods;
};


/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var getBuiltIn = __webpack_require__(22);
var defineBuiltInAccessor = __webpack_require__(151);
var wellKnownSymbol = __webpack_require__(32);
var DESCRIPTORS = __webpack_require__(5);

var SPECIES = wellKnownSymbol('species');

module.exports = function (CONSTRUCTOR_NAME) {
  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);

  if (DESCRIPTORS && Constructor && !Constructor[SPECIES]) {
    defineBuiltInAccessor(Constructor, SPECIES, {
      configurable: true,
      get: function () { return this; }
    });
  }
};


/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// TODO: Remove this module from `core-js@4` since it's replaced to module below
__webpack_require__(206);


/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var FREEZING = __webpack_require__(199);
var globalThis = __webpack_require__(3);
var uncurryThis = __webpack_require__(13);
var defineBuiltIns = __webpack_require__(129);
var InternalMetadataModule = __webpack_require__(194);
var collection = __webpack_require__(193);
var collectionWeak = __webpack_require__(207);
var isObject = __webpack_require__(19);
var enforceInternalState = __webpack_require__(50).enforce;
var fails = __webpack_require__(6);
var NATIVE_WEAK_MAP = __webpack_require__(51);

var $Object = Object;
// eslint-disable-next-line es/no-array-isarray -- safe
var isArray = Array.isArray;
// eslint-disable-next-line es/no-object-isextensible -- safe
var isExtensible = $Object.isExtensible;
// eslint-disable-next-line es/no-object-isfrozen -- safe
var isFrozen = $Object.isFrozen;
// eslint-disable-next-line es/no-object-issealed -- safe
var isSealed = $Object.isSealed;
// eslint-disable-next-line es/no-object-freeze -- safe
var freeze = $Object.freeze;
// eslint-disable-next-line es/no-object-seal -- safe
var seal = $Object.seal;

var IS_IE11 = !globalThis.ActiveXObject && 'ActiveXObject' in globalThis;
var InternalWeakMap;

var wrapper = function (init) {
  return function WeakMap() {
    return init(this, arguments.length ? arguments[0] : undefined);
  };
};

// `WeakMap` constructor
// https://tc39.es/ecma262/#sec-weakmap-constructor
var $WeakMap = collection('WeakMap', wrapper, collectionWeak);
var WeakMapPrototype = $WeakMap.prototype;
var nativeSet = uncurryThis(WeakMapPrototype.set);

// Chakra Edge bug: adding frozen arrays to WeakMap unfreeze them
var hasMSEdgeFreezingBug = function () {
  return FREEZING && fails(function () {
    var frozenArray = freeze([]);
    nativeSet(new $WeakMap(), frozenArray, 1);
    return !isFrozen(frozenArray);
  });
};

// IE11 WeakMap frozen keys fix
// We can't use feature detection because it crash some old IE builds
// https://github.com/zloirock/core-js/issues/485
if (NATIVE_WEAK_MAP) if (IS_IE11) {
  InternalWeakMap = collectionWeak.getConstructor(wrapper, 'WeakMap', true);
  InternalMetadataModule.enable();
  var nativeDelete = uncurryThis(WeakMapPrototype['delete']);
  var nativeHas = uncurryThis(WeakMapPrototype.has);
  var nativeGet = uncurryThis(WeakMapPrototype.get);
  defineBuiltIns(WeakMapPrototype, {
    'delete': function (key) {
      if (isObject(key) && !isExtensible(key)) {
        var state = enforceInternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        return nativeDelete(this, key) || state.frozen['delete'](key);
      } return nativeDelete(this, key);
    },
    has: function has(key) {
      if (isObject(key) && !isExtensible(key)) {
        var state = enforceInternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        return nativeHas(this, key) || state.frozen.has(key);
      } return nativeHas(this, key);
    },
    get: function get(key) {
      if (isObject(key) && !isExtensible(key)) {
        var state = enforceInternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        return nativeHas(this, key) ? nativeGet(this, key) : state.frozen.get(key);
      } return nativeGet(this, key);
    },
    set: function set(key, value) {
      if (isObject(key) && !isExtensible(key)) {
        var state = enforceInternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        nativeHas(this, key) ? nativeSet(this, key, value) : state.frozen.set(key, value);
      } else nativeSet(this, key, value);
      return this;
    }
  });
// Chakra Edge frozen keys fix
} else if (hasMSEdgeFreezingBug()) {
  defineBuiltIns(WeakMapPrototype, {
    set: function set(key, value) {
      var arrayIntegrityLevel;
      if (isArray(key)) {
        if (isFrozen(key)) arrayIntegrityLevel = freeze;
        else if (isSealed(key)) arrayIntegrityLevel = seal;
      }
      nativeSet(this, key, value);
      if (arrayIntegrityLevel) arrayIntegrityLevel(key);
      return this;
    }
  });
}


/***/ }),
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var uncurryThis = __webpack_require__(13);
var defineBuiltIns = __webpack_require__(129);
var getWeakData = __webpack_require__(194).getWeakData;
var anInstance = __webpack_require__(157);
var anObject = __webpack_require__(45);
var isNullOrUndefined = __webpack_require__(16);
var isObject = __webpack_require__(19);
var iterate = __webpack_require__(71);
var ArrayIterationModule = __webpack_require__(136);
var hasOwn = __webpack_require__(37);
var InternalStateModule = __webpack_require__(50);

var setInternalState = InternalStateModule.set;
var internalStateGetterFor = InternalStateModule.getterFor;
var find = ArrayIterationModule.find;
var findIndex = ArrayIterationModule.findIndex;
var splice = uncurryThis([].splice);
var id = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function (state) {
  return state.frozen || (state.frozen = new UncaughtFrozenStore());
};

var UncaughtFrozenStore = function () {
  this.entries = [];
};

var findUncaughtFrozen = function (store, key) {
  return find(store.entries, function (it) {
    return it[0] === key;
  });
};

UncaughtFrozenStore.prototype = {
  get: function (key) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) return entry[1];
  },
  has: function (key) {
    return !!findUncaughtFrozen(this, key);
  },
  set: function (key, value) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) entry[1] = value;
    else this.entries.push([key, value]);
  },
  'delete': function (key) {
    var index = findIndex(this.entries, function (it) {
      return it[0] === key;
    });
    if (~index) splice(this.entries, index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
    var Constructor = wrapper(function (that, iterable) {
      anInstance(that, Prototype);
      setInternalState(that, {
        type: CONSTRUCTOR_NAME,
        id: id++,
        frozen: undefined
      });
      if (!isNullOrUndefined(iterable)) iterate(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
    });

    var Prototype = Constructor.prototype;

    var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

    var define = function (that, key, value) {
      var state = getInternalState(that);
      var data = getWeakData(anObject(key), true);
      if (data === true) uncaughtFrozenStore(state).set(key, value);
      else data[state.id] = value;
      return that;
    };

    defineBuiltIns(Prototype, {
      // `{ WeakMap, WeakSet }.prototype.delete(key)` methods
      // https://tc39.es/ecma262/#sec-weakmap.prototype.delete
      // https://tc39.es/ecma262/#sec-weakset.prototype.delete
      'delete': function (key) {
        var state = getInternalState(this);
        if (!isObject(key)) return false;
        var data = getWeakData(key);
        if (data === true) return uncaughtFrozenStore(state)['delete'](key);
        return data && hasOwn(data, state.id) && delete data[state.id];
      },
      // `{ WeakMap, WeakSet }.prototype.has(key)` methods
      // https://tc39.es/ecma262/#sec-weakmap.prototype.has
      // https://tc39.es/ecma262/#sec-weakset.prototype.has
      has: function has(key) {
        var state = getInternalState(this);
        if (!isObject(key)) return false;
        var data = getWeakData(key);
        if (data === true) return uncaughtFrozenStore(state).has(key);
        return data && hasOwn(data, state.id);
      }
    });

    defineBuiltIns(Prototype, IS_MAP ? {
      // `WeakMap.prototype.get(key)` method
      // https://tc39.es/ecma262/#sec-weakmap.prototype.get
      get: function get(key) {
        var state = getInternalState(this);
        if (isObject(key)) {
          var data = getWeakData(key);
          if (data === true) return uncaughtFrozenStore(state).get(key);
          return data ? data[state.id] : undefined;
        }
      },
      // `WeakMap.prototype.set(key, value)` method
      // https://tc39.es/ecma262/#sec-weakmap.prototype.set
      set: function set(key, value) {
        return define(this, key, value);
      }
    } : {
      // `WeakSet.prototype.add(value)` method
      // https://tc39.es/ecma262/#sec-weakset.prototype.add
      add: function add(value) {
        return define(this, value, true);
      }
    });

    return Constructor;
  }
};


/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var getCompositeKeyNode = __webpack_require__(190);
var getBuiltIn = __webpack_require__(22);
var apply = __webpack_require__(189);

// https://github.com/tc39/proposal-richer-keys/tree/master/compositeKey
$({ global: true, forced: true }, {
  compositeSymbol: function compositeSymbol() {
    if (arguments.length === 1 && typeof arguments[0] == 'string') return getBuiltIn('Symbol')['for'](arguments[0]);
    return apply(getCompositeKeyNode, null, arguments).get('symbol', getBuiltIn('Symbol'));
  }
});


/***/ }),
/* 209 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var uncurryThis = __webpack_require__(13);
var unpackIEEE754 = __webpack_require__(210).unpack;

// eslint-disable-next-line es/no-typed-arrays -- safe
var getUint16 = uncurryThis(DataView.prototype.getUint16);

// `DataView.prototype.getFloat16` method
// https://github.com/tc39/proposal-float16array
$({ target: 'DataView', proto: true }, {
  getFloat16: function getFloat16(byteOffset /* , littleEndian */) {
    var uint16 = getUint16(this, byteOffset, arguments.length > 1 ? arguments[1] : false);
    return unpackIEEE754([uint16 & 0xFF, uint16 >> 8 & 0xFF], 10);
  }
});


/***/ }),
/* 210 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// IEEE754 conversions based on https://github.com/feross/ieee754
var $Array = Array;
var abs = Math.abs;
var pow = Math.pow;
var floor = Math.floor;
var log = Math.log;
var LN2 = Math.LN2;

var pack = function (number, mantissaLength, bytes) {
  var buffer = $Array(bytes);
  var exponentLength = bytes * 8 - mantissaLength - 1;
  var eMax = (1 << exponentLength) - 1;
  var eBias = eMax >> 1;
  var rt = mantissaLength === 23 ? pow(2, -24) - pow(2, -77) : 0;
  var sign = number < 0 || number === 0 && 1 / number < 0 ? 1 : 0;
  var index = 0;
  var exponent, mantissa, c;
  number = abs(number);
  // eslint-disable-next-line no-self-compare -- NaN check
  if (number !== number || number === Infinity) {
    // eslint-disable-next-line no-self-compare -- NaN check
    mantissa = number !== number ? 1 : 0;
    exponent = eMax;
  } else {
    exponent = floor(log(number) / LN2);
    c = pow(2, -exponent);
    if (number * c < 1) {
      exponent--;
      c *= 2;
    }
    if (exponent + eBias >= 1) {
      number += rt / c;
    } else {
      number += rt * pow(2, 1 - eBias);
    }
    if (number * c >= 2) {
      exponent++;
      c /= 2;
    }
    if (exponent + eBias >= eMax) {
      mantissa = 0;
      exponent = eMax;
    } else if (exponent + eBias >= 1) {
      mantissa = (number * c - 1) * pow(2, mantissaLength);
      exponent += eBias;
    } else {
      mantissa = number * pow(2, eBias - 1) * pow(2, mantissaLength);
      exponent = 0;
    }
  }
  while (mantissaLength >= 8) {
    buffer[index++] = mantissa & 255;
    mantissa /= 256;
    mantissaLength -= 8;
  }
  exponent = exponent << mantissaLength | mantissa;
  exponentLength += mantissaLength;
  while (exponentLength > 0) {
    buffer[index++] = exponent & 255;
    exponent /= 256;
    exponentLength -= 8;
  }
  buffer[index - 1] |= sign * 128;
  return buffer;
};

var unpack = function (buffer, mantissaLength) {
  var bytes = buffer.length;
  var exponentLength = bytes * 8 - mantissaLength - 1;
  var eMax = (1 << exponentLength) - 1;
  var eBias = eMax >> 1;
  var nBits = exponentLength - 7;
  var index = bytes - 1;
  var sign = buffer[index--];
  var exponent = sign & 127;
  var mantissa;
  sign >>= 7;
  while (nBits > 0) {
    exponent = exponent * 256 + buffer[index--];
    nBits -= 8;
  }
  mantissa = exponent & (1 << -nBits) - 1;
  exponent >>= -nBits;
  nBits += mantissaLength;
  while (nBits > 0) {
    mantissa = mantissa * 256 + buffer[index--];
    nBits -= 8;
  }
  if (exponent === 0) {
    exponent = 1 - eBias;
  } else if (exponent === eMax) {
    return mantissa ? NaN : sign ? -Infinity : Infinity;
  } else {
    mantissa += pow(2, mantissaLength);
    exponent -= eBias;
  } return (sign ? -1 : 1) * mantissa * pow(2, exponent - mantissaLength);
};

module.exports = {
  pack: pack,
  unpack: unpack
};


/***/ }),
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var uncurryThis = __webpack_require__(13);

// eslint-disable-next-line es/no-typed-arrays -- safe
var getUint8 = uncurryThis(DataView.prototype.getUint8);

// `DataView.prototype.getUint8Clamped` method
// https://github.com/tc39/proposal-dataview-get-set-uint8clamped
$({ target: 'DataView', proto: true, forced: true }, {
  getUint8Clamped: function getUint8Clamped(byteOffset) {
    return getUint8(this, byteOffset);
  }
});


/***/ }),
/* 212 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var uncurryThis = __webpack_require__(13);
var aDataView = __webpack_require__(213);
var toIndex = __webpack_require__(214);
var packIEEE754 = __webpack_require__(210).pack;
var f16round = __webpack_require__(215);

// eslint-disable-next-line es/no-typed-arrays -- safe
var setUint16 = uncurryThis(DataView.prototype.setUint16);

// `DataView.prototype.setFloat16` method
// https://github.com/tc39/proposal-float16array
$({ target: 'DataView', proto: true }, {
  setFloat16: function setFloat16(byteOffset, value /* , littleEndian */) {
    aDataView(this);
    var offset = toIndex(byteOffset);
    var bytes = packIEEE754(f16round(value), 10, 2);
    return setUint16(this, offset, bytes[1] << 8 | bytes[0], arguments.length > 2 ? arguments[2] : false);
  }
});


/***/ }),
/* 213 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var classof = __webpack_require__(78);

var $TypeError = TypeError;

module.exports = function (argument) {
  if (classof(argument) === 'DataView') return argument;
  throw new $TypeError('Argument is not a DataView');
};


/***/ }),
/* 214 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toIntegerOrInfinity = __webpack_require__(60);
var toLength = __webpack_require__(63);

var $RangeError = RangeError;

// `ToIndex` abstract operation
// https://tc39.es/ecma262/#sec-toindex
module.exports = function (it) {
  if (it === undefined) return 0;
  var number = toIntegerOrInfinity(it);
  var length = toLength(number);
  if (number !== length) throw new $RangeError('Wrong length or index');
  return length;
};


/***/ }),
/* 215 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var floatRound = __webpack_require__(216);

var FLOAT16_EPSILON = 0.0009765625;
var FLOAT16_MAX_VALUE = 65504;
var FLOAT16_MIN_VALUE = 6.103515625e-05;

// `Math.f16round` method implementation
// https://github.com/tc39/proposal-float16array
module.exports = Math.f16round || function f16round(x) {
  return floatRound(x, FLOAT16_EPSILON, FLOAT16_MAX_VALUE, FLOAT16_MIN_VALUE);
};


/***/ }),
/* 216 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var sign = __webpack_require__(217);

var abs = Math.abs;

var EPSILON = 2.220446049250313e-16; // Number.EPSILON
var INVERSE_EPSILON = 1 / EPSILON;

var roundTiesToEven = function (n) {
  return n + INVERSE_EPSILON - INVERSE_EPSILON;
};

module.exports = function (x, FLOAT_EPSILON, FLOAT_MAX_VALUE, FLOAT_MIN_VALUE) {
  var n = +x;
  var absolute = abs(n);
  var s = sign(n);
  if (absolute < FLOAT_MIN_VALUE) return s * roundTiesToEven(absolute / FLOAT_MIN_VALUE / FLOAT_EPSILON) * FLOAT_MIN_VALUE * FLOAT_EPSILON;
  var a = (1 + FLOAT_EPSILON / EPSILON) * absolute;
  var result = a - (a - absolute);
  // eslint-disable-next-line no-self-compare -- NaN check
  if (result > FLOAT_MAX_VALUE || result !== result) return s * Infinity;
  return s * result;
};


/***/ }),
/* 217 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// `Math.sign` method implementation
// https://tc39.es/ecma262/#sec-math.sign
// eslint-disable-next-line es/no-math-sign -- safe
module.exports = Math.sign || function sign(x) {
  var n = +x;
  // eslint-disable-next-line no-self-compare -- NaN check
  return n === 0 || n !== n ? n : n < 0 ? -1 : 1;
};


/***/ }),
/* 218 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var uncurryThis = __webpack_require__(13);
var aDataView = __webpack_require__(213);
var toIndex = __webpack_require__(214);
var toUint8Clamped = __webpack_require__(219);

// eslint-disable-next-line es/no-typed-arrays -- safe
var setUint8 = uncurryThis(DataView.prototype.setUint8);

// `DataView.prototype.setUint8Clamped` method
// https://github.com/tc39/proposal-dataview-get-set-uint8clamped
$({ target: 'DataView', proto: true, forced: true }, {
  setUint8Clamped: function setUint8Clamped(byteOffset, value) {
    aDataView(this);
    var offset = toIndex(byteOffset);
    return setUint8(this, offset, toUint8Clamped(value));
  }
});


/***/ }),
/* 219 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var round = Math.round;

module.exports = function (it) {
  var value = round(it);
  return value < 0 ? 0 : value > 0xFF ? 0xFF : value & 0xFF;
};


/***/ }),
/* 220 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-explicit-resource-management
var $ = __webpack_require__(2);
var DESCRIPTORS = __webpack_require__(5);
var getBuiltIn = __webpack_require__(22);
var aCallable = __webpack_require__(29);
var anInstance = __webpack_require__(157);
var defineBuiltIn = __webpack_require__(46);
var defineBuiltIns = __webpack_require__(129);
var defineBuiltInAccessor = __webpack_require__(151);
var wellKnownSymbol = __webpack_require__(32);
var InternalStateModule = __webpack_require__(50);
var addDisposableResource = __webpack_require__(158);

var SuppressedError = getBuiltIn('SuppressedError');
var $ReferenceError = ReferenceError;

var DISPOSE = wellKnownSymbol('dispose');
var TO_STRING_TAG = wellKnownSymbol('toStringTag');

var DISPOSABLE_STACK = 'DisposableStack';
var setInternalState = InternalStateModule.set;
var getDisposableStackInternalState = InternalStateModule.getterFor(DISPOSABLE_STACK);

var HINT = 'sync-dispose';
var DISPOSED = 'disposed';
var PENDING = 'pending';

var getPendingDisposableStackInternalState = function (stack) {
  var internalState = getDisposableStackInternalState(stack);
  if (internalState.state === DISPOSED) throw new $ReferenceError(DISPOSABLE_STACK + ' already disposed');
  return internalState;
};

var $DisposableStack = function DisposableStack() {
  setInternalState(anInstance(this, DisposableStackPrototype), {
    type: DISPOSABLE_STACK,
    state: PENDING,
    stack: []
  });

  if (!DESCRIPTORS) this.disposed = false;
};

var DisposableStackPrototype = $DisposableStack.prototype;

defineBuiltIns(DisposableStackPrototype, {
  dispose: function dispose() {
    var internalState = getDisposableStackInternalState(this);
    if (internalState.state === DISPOSED) return;
    internalState.state = DISPOSED;
    if (!DESCRIPTORS) this.disposed = true;
    var stack = internalState.stack;
    var i = stack.length;
    var thrown = false;
    var suppressed;
    while (i) {
      var disposeMethod = stack[--i];
      stack[i] = undefined;
      try {
        disposeMethod();
      } catch (errorResult) {
        if (thrown) {
          suppressed = new SuppressedError(errorResult, suppressed);
        } else {
          thrown = true;
          suppressed = errorResult;
        }
      }
    }
    internalState.stack = undefined;
    if (thrown) throw suppressed;
  },
  use: function use(value) {
    addDisposableResource(getPendingDisposableStackInternalState(this), value, HINT);
    return value;
  },
  adopt: function adopt(value, onDispose) {
    var internalState = getPendingDisposableStackInternalState(this);
    aCallable(onDispose);
    addDisposableResource(internalState, undefined, HINT, function () {
      onDispose(value);
    });
    return value;
  },
  defer: function defer(onDispose) {
    var internalState = getPendingDisposableStackInternalState(this);
    aCallable(onDispose);
    addDisposableResource(internalState, undefined, HINT, onDispose);
  },
  move: function move() {
    var internalState = getPendingDisposableStackInternalState(this);
    var newDisposableStack = new $DisposableStack();
    getDisposableStackInternalState(newDisposableStack).stack = internalState.stack;
    internalState.stack = [];
    internalState.state = DISPOSED;
    if (!DESCRIPTORS) this.disposed = true;
    return newDisposableStack;
  }
});

if (DESCRIPTORS) defineBuiltInAccessor(DisposableStackPrototype, 'disposed', {
  configurable: true,
  get: function disposed() {
    return getDisposableStackInternalState(this).state === DISPOSED;
  }
});

defineBuiltIn(DisposableStackPrototype, DISPOSE, DisposableStackPrototype.dispose, { name: 'dispose' });
defineBuiltIn(DisposableStackPrototype, TO_STRING_TAG, DISPOSABLE_STACK, { nonWritable: true });

$({ global: true, constructor: true }, {
  DisposableStack: $DisposableStack
});


/***/ }),
/* 221 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var demethodize = __webpack_require__(222);

// `Function.prototype.demethodize` method
// https://github.com/js-choi/proposal-function-demethodize
$({ target: 'Function', proto: true, forced: true }, {
  demethodize: demethodize
});


/***/ }),
/* 222 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var uncurryThis = __webpack_require__(13);
var aCallable = __webpack_require__(29);

module.exports = function demethodize() {
  return uncurryThis(aCallable(this));
};


/***/ }),
/* 223 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var uncurryThis = __webpack_require__(13);
var $isCallable = __webpack_require__(20);
var inspectSource = __webpack_require__(49);
var hasOwn = __webpack_require__(37);
var DESCRIPTORS = __webpack_require__(5);

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var classRegExp = /^\s*class\b/;
var exec = uncurryThis(classRegExp.exec);

var isClassConstructor = function (argument) {
  try {
    // `Function#toString` throws on some built-it function in some legacy engines
    // (for example, `DOMQuad` and similar in FF41-)
    if (!DESCRIPTORS || !exec(classRegExp, inspectSource(argument))) return false;
  } catch (error) { /* empty */ }
  var prototype = getOwnPropertyDescriptor(argument, 'prototype');
  return !!prototype && hasOwn(prototype, 'writable') && !prototype.writable;
};

// `Function.isCallable` method
// https://github.com/caitp/TC39-Proposals/blob/trunk/tc39-reflect-isconstructor-iscallable.md
$({ target: 'Function', stat: true, sham: true, forced: true }, {
  isCallable: function isCallable(argument) {
    return $isCallable(argument) && !isClassConstructor(argument);
  }
});


/***/ }),
/* 224 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var isConstructor = __webpack_require__(126);

// `Function.isConstructor` method
// https://github.com/caitp/TC39-Proposals/blob/trunk/tc39-reflect-isconstructor-iscallable.md
$({ target: 'Function', stat: true, forced: true }, {
  isConstructor: isConstructor
});


/***/ }),
/* 225 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var wellKnownSymbol = __webpack_require__(32);
var defineProperty = __webpack_require__(43).f;

var METADATA = wellKnownSymbol('metadata');
var FunctionPrototype = Function.prototype;

// Function.prototype[@@metadata]
// https://github.com/tc39/proposal-decorator-metadata
if (FunctionPrototype[METADATA] === undefined) {
  defineProperty(FunctionPrototype, METADATA, {
    value: null
  });
}


/***/ }),
/* 226 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var demethodize = __webpack_require__(222);

// `Function.prototype.unThis` method
// https://github.com/js-choi/proposal-function-demethodize
// TODO: Remove from `core-js@4`
$({ target: 'Function', proto: true, forced: true, name: 'demethodize' }, {
  unThis: demethodize
});


/***/ }),
/* 227 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var globalThis = __webpack_require__(3);
var anInstance = __webpack_require__(157);
var anObject = __webpack_require__(45);
var isCallable = __webpack_require__(20);
var getPrototypeOf = __webpack_require__(110);
var defineBuiltInAccessor = __webpack_require__(151);
var createProperty = __webpack_require__(228);
var fails = __webpack_require__(6);
var hasOwn = __webpack_require__(37);
var wellKnownSymbol = __webpack_require__(32);
var IteratorPrototype = __webpack_require__(186).IteratorPrototype;
var DESCRIPTORS = __webpack_require__(5);
var IS_PURE = __webpack_require__(35);

var CONSTRUCTOR = 'constructor';
var ITERATOR = 'Iterator';
var TO_STRING_TAG = wellKnownSymbol('toStringTag');

var $TypeError = TypeError;
var NativeIterator = globalThis[ITERATOR];

// FF56- have non-standard global helper `Iterator`
var FORCED = IS_PURE
  || !isCallable(NativeIterator)
  || NativeIterator.prototype !== IteratorPrototype
  // FF44- non-standard `Iterator` passes previous tests
  || !fails(function () { NativeIterator({}); });

var IteratorConstructor = function Iterator() {
  anInstance(this, IteratorPrototype);
  if (getPrototypeOf(this) === IteratorPrototype) throw new $TypeError('Abstract class Iterator not directly constructable');
};

var defineIteratorPrototypeAccessor = function (key, value) {
  if (DESCRIPTORS) {
    defineBuiltInAccessor(IteratorPrototype, key, {
      configurable: true,
      get: function () {
        return value;
      },
      set: function (replacement) {
        anObject(this);
        if (this === IteratorPrototype) throw new $TypeError("You can't redefine this property");
        if (hasOwn(this, key)) this[key] = replacement;
        else createProperty(this, key, replacement);
      }
    });
  } else IteratorPrototype[key] = value;
};

if (!hasOwn(IteratorPrototype, TO_STRING_TAG)) defineIteratorPrototypeAccessor(TO_STRING_TAG, ITERATOR);

if (FORCED || !hasOwn(IteratorPrototype, CONSTRUCTOR) || IteratorPrototype[CONSTRUCTOR] === Object) {
  defineIteratorPrototypeAccessor(CONSTRUCTOR, IteratorConstructor);
}

IteratorConstructor.prototype = IteratorPrototype;

// `Iterator` constructor
// https://github.com/tc39/proposal-iterator-helpers
$({ global: true, constructor: true, forced: FORCED }, {
  Iterator: IteratorConstructor
});


/***/ }),
/* 228 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var DESCRIPTORS = __webpack_require__(5);
var definePropertyModule = __webpack_require__(43);
var createPropertyDescriptor = __webpack_require__(10);

module.exports = function (object, key, value) {
  if (DESCRIPTORS) definePropertyModule.f(object, key, createPropertyDescriptor(0, value));
  else object[key] = value;
};


/***/ }),
/* 229 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// TODO: Remove from `core-js@4`
var $ = __webpack_require__(2);
var indexed = __webpack_require__(230);

// `Iterator.prototype.asIndexedPairs` method
// https://github.com/tc39/proposal-iterator-helpers
$({ target: 'Iterator', name: 'indexed', proto: true, real: true, forced: true }, {
  asIndexedPairs: indexed
});


/***/ }),
/* 230 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var call = __webpack_require__(7);
var map = __webpack_require__(231);

var callback = function (value, counter) {
  return [counter, value];
};

// `Iterator.prototype.indexed` method
// https://github.com/tc39/proposal-iterator-helpers
module.exports = function indexed() {
  return call(map, this, callback);
};


/***/ }),
/* 231 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var call = __webpack_require__(7);
var aCallable = __webpack_require__(29);
var anObject = __webpack_require__(45);
var getIteratorDirect = __webpack_require__(95);
var createIteratorProxy = __webpack_require__(232);
var callWithSafeIterationClosing = __webpack_require__(233);

var IteratorProxy = createIteratorProxy(function () {
  var iterator = this.iterator;
  var result = anObject(call(this.next, iterator));
  var done = this.done = !!result.done;
  if (!done) return callWithSafeIterationClosing(iterator, this.mapper, [result.value, this.counter++], true);
});

// `Iterator.prototype.map` method
// https://github.com/tc39/proposal-iterator-helpers
module.exports = function map(mapper) {
  anObject(this);
  aCallable(mapper);
  return new IteratorProxy(getIteratorDirect(this), {
    mapper: mapper
  });
};


/***/ }),
/* 232 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var call = __webpack_require__(7);
var create = __webpack_require__(115);
var createNonEnumerableProperty = __webpack_require__(42);
var defineBuiltIns = __webpack_require__(129);
var wellKnownSymbol = __webpack_require__(32);
var InternalStateModule = __webpack_require__(50);
var getMethod = __webpack_require__(28);
var IteratorPrototype = __webpack_require__(186).IteratorPrototype;
var createIterResultObject = __webpack_require__(131);
var iteratorClose = __webpack_require__(80);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var ITERATOR_HELPER = 'IteratorHelper';
var WRAP_FOR_VALID_ITERATOR = 'WrapForValidIterator';
var setInternalState = InternalStateModule.set;

var createIteratorProxyPrototype = function (IS_ITERATOR) {
  var getInternalState = InternalStateModule.getterFor(IS_ITERATOR ? WRAP_FOR_VALID_ITERATOR : ITERATOR_HELPER);

  return defineBuiltIns(create(IteratorPrototype), {
    next: function next() {
      var state = getInternalState(this);
      // for simplification:
      //   for `%WrapForValidIteratorPrototype%.next` our `nextHandler` returns `IterResultObject`
      //   for `%IteratorHelperPrototype%.next` - just a value
      if (IS_ITERATOR) return state.nextHandler();
      try {
        var result = state.done ? undefined : state.nextHandler();
        return createIterResultObject(result, state.done);
      } catch (error) {
        state.done = true;
        throw error;
      }
    },
    'return': function () {
      var state = getInternalState(this);
      var iterator = state.iterator;
      state.done = true;
      if (IS_ITERATOR) {
        var returnMethod = getMethod(iterator, 'return');
        return returnMethod ? call(returnMethod, iterator) : createIterResultObject(undefined, true);
      }
      if (state.inner) try {
        iteratorClose(state.inner.iterator, 'normal');
      } catch (error) {
        return iteratorClose(iterator, 'throw', error);
      }
      iteratorClose(iterator, 'normal');
      return createIterResultObject(undefined, true);
    }
  });
};

var WrapForValidIteratorPrototype = createIteratorProxyPrototype(true);
var IteratorHelperPrototype = createIteratorProxyPrototype(false);

createNonEnumerableProperty(IteratorHelperPrototype, TO_STRING_TAG, 'Iterator Helper');

module.exports = function (nextHandler, IS_ITERATOR) {
  var IteratorProxy = function Iterator(record, state) {
    if (state) {
      state.iterator = record.iterator;
      state.next = record.next;
    } else state = record;
    state.type = IS_ITERATOR ? WRAP_FOR_VALID_ITERATOR : ITERATOR_HELPER;
    state.nextHandler = nextHandler;
    state.counter = 0;
    state.done = false;
    setInternalState(this, state);
  };

  IteratorProxy.prototype = IS_ITERATOR ? WrapForValidIteratorPrototype : IteratorHelperPrototype;

  return IteratorProxy;
};


/***/ }),
/* 233 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var anObject = __webpack_require__(45);
var iteratorClose = __webpack_require__(80);

// call something on iterator step with safe closing on error
module.exports = function (iterator, fn, value, ENTRIES) {
  try {
    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
  } catch (error) {
    iteratorClose(iterator, 'throw', error);
  }
};


/***/ }),
/* 234 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-explicit-resource-management
var call = __webpack_require__(7);
var defineBuiltIn = __webpack_require__(46);
var getMethod = __webpack_require__(28);
var hasOwn = __webpack_require__(37);
var wellKnownSymbol = __webpack_require__(32);
var IteratorPrototype = __webpack_require__(186).IteratorPrototype;

var DISPOSE = wellKnownSymbol('dispose');

if (!hasOwn(IteratorPrototype, DISPOSE)) {
  defineBuiltIn(IteratorPrototype, DISPOSE, function () {
    var $return = getMethod(this, 'return');
    if ($return) call($return, this);
  });
}


/***/ }),
/* 235 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var call = __webpack_require__(7);
var anObject = __webpack_require__(45);
var getIteratorDirect = __webpack_require__(95);
var notANaN = __webpack_require__(167);
var toPositiveInteger = __webpack_require__(168);
var createIteratorProxy = __webpack_require__(232);
var IS_PURE = __webpack_require__(35);

var IteratorProxy = createIteratorProxy(function () {
  var iterator = this.iterator;
  var next = this.next;
  var result, done;
  while (this.remaining) {
    this.remaining--;
    result = anObject(call(next, iterator));
    done = this.done = !!result.done;
    if (done) return;
  }
  result = anObject(call(next, iterator));
  done = this.done = !!result.done;
  if (!done) return result.value;
});

// `Iterator.prototype.drop` method
// https://github.com/tc39/proposal-iterator-helpers
$({ target: 'Iterator', proto: true, real: true, forced: IS_PURE }, {
  drop: function drop(limit) {
    anObject(this);
    var remaining = toPositiveInteger(notANaN(+limit));
    return new IteratorProxy(getIteratorDirect(this), {
      remaining: remaining
    });
  }
});


/***/ }),
/* 236 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var iterate = __webpack_require__(71);
var aCallable = __webpack_require__(29);
var anObject = __webpack_require__(45);
var getIteratorDirect = __webpack_require__(95);

// `Iterator.prototype.every` method
// https://github.com/tc39/proposal-iterator-helpers
$({ target: 'Iterator', proto: true, real: true }, {
  every: function every(predicate) {
    anObject(this);
    aCallable(predicate);
    var record = getIteratorDirect(this);
    var counter = 0;
    return !iterate(record, function (value, stop) {
      if (!predicate(value, counter++)) return stop();
    }, { IS_RECORD: true, INTERRUPTED: true }).stopped;
  }
});


/***/ }),
/* 237 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var call = __webpack_require__(7);
var aCallable = __webpack_require__(29);
var anObject = __webpack_require__(45);
var getIteratorDirect = __webpack_require__(95);
var createIteratorProxy = __webpack_require__(232);
var callWithSafeIterationClosing = __webpack_require__(233);
var IS_PURE = __webpack_require__(35);

var IteratorProxy = createIteratorProxy(function () {
  var iterator = this.iterator;
  var predicate = this.predicate;
  var next = this.next;
  var result, done, value;
  while (true) {
    result = anObject(call(next, iterator));
    done = this.done = !!result.done;
    if (done) return;
    value = result.value;
    if (callWithSafeIterationClosing(iterator, predicate, [value, this.counter++], true)) return value;
  }
});

// `Iterator.prototype.filter` method
// https://github.com/tc39/proposal-iterator-helpers
$({ target: 'Iterator', proto: true, real: true, forced: IS_PURE }, {
  filter: function filter(predicate) {
    anObject(this);
    aCallable(predicate);
    return new IteratorProxy(getIteratorDirect(this), {
      predicate: predicate
    });
  }
});


/***/ }),
/* 238 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var iterate = __webpack_require__(71);
var aCallable = __webpack_require__(29);
var anObject = __webpack_require__(45);
var getIteratorDirect = __webpack_require__(95);

// `Iterator.prototype.find` method
// https://github.com/tc39/proposal-iterator-helpers
$({ target: 'Iterator', proto: true, real: true }, {
  find: function find(predicate) {
    anObject(this);
    aCallable(predicate);
    var record = getIteratorDirect(this);
    var counter = 0;
    return iterate(record, function (value, stop) {
      if (predicate(value, counter++)) return stop(value);
    }, { IS_RECORD: true, INTERRUPTED: true }).result;
  }
});


/***/ }),
/* 239 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var call = __webpack_require__(7);
var aCallable = __webpack_require__(29);
var anObject = __webpack_require__(45);
var getIteratorDirect = __webpack_require__(95);
var getIteratorFlattenable = __webpack_require__(240);
var createIteratorProxy = __webpack_require__(232);
var iteratorClose = __webpack_require__(80);
var IS_PURE = __webpack_require__(35);

var IteratorProxy = createIteratorProxy(function () {
  var iterator = this.iterator;
  var mapper = this.mapper;
  var result, inner;

  while (true) {
    if (inner = this.inner) try {
      result = anObject(call(inner.next, inner.iterator));
      if (!result.done) return result.value;
      this.inner = null;
    } catch (error) { iteratorClose(iterator, 'throw', error); }

    result = anObject(call(this.next, iterator));

    if (this.done = !!result.done) return;

    try {
      this.inner = getIteratorFlattenable(mapper(result.value, this.counter++), false);
    } catch (error) { iteratorClose(iterator, 'throw', error); }
  }
});

// `Iterator.prototype.flatMap` method
// https://github.com/tc39/proposal-iterator-helpers
$({ target: 'Iterator', proto: true, real: true, forced: IS_PURE }, {
  flatMap: function flatMap(mapper) {
    anObject(this);
    aCallable(mapper);
    return new IteratorProxy(getIteratorDirect(this), {
      mapper: mapper,
      inner: null
    });
  }
});


/***/ }),
/* 240 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var call = __webpack_require__(7);
var anObject = __webpack_require__(45);
var getIteratorDirect = __webpack_require__(95);
var getIteratorMethod = __webpack_require__(77);

module.exports = function (obj, stringHandling) {
  if (!stringHandling || typeof obj !== 'string') anObject(obj);
  var method = getIteratorMethod(obj);
  return getIteratorDirect(anObject(method !== undefined ? call(method, obj) : obj));
};


/***/ }),
/* 241 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var iterate = __webpack_require__(71);
var aCallable = __webpack_require__(29);
var anObject = __webpack_require__(45);
var getIteratorDirect = __webpack_require__(95);

// `Iterator.prototype.forEach` method
// https://github.com/tc39/proposal-iterator-helpers
$({ target: 'Iterator', proto: true, real: true }, {
  forEach: function forEach(fn) {
    anObject(this);
    aCallable(fn);
    var record = getIteratorDirect(this);
    var counter = 0;
    iterate(record, function (value) {
      fn(value, counter++);
    }, { IS_RECORD: true });
  }
});


/***/ }),
/* 242 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var call = __webpack_require__(7);
var toObject = __webpack_require__(38);
var isPrototypeOf = __webpack_require__(23);
var IteratorPrototype = __webpack_require__(186).IteratorPrototype;
var createIteratorProxy = __webpack_require__(232);
var getIteratorFlattenable = __webpack_require__(240);
var IS_PURE = __webpack_require__(35);

var IteratorProxy = createIteratorProxy(function () {
  return call(this.next, this.iterator);
}, true);

// `Iterator.from` method
// https://github.com/tc39/proposal-iterator-helpers
$({ target: 'Iterator', stat: true, forced: IS_PURE }, {
  from: function from(O) {
    var iteratorRecord = getIteratorFlattenable(typeof O == 'string' ? toObject(O) : O, true);
    return isPrototypeOf(IteratorPrototype, iteratorRecord.iterator)
      ? iteratorRecord.iterator
      : new IteratorProxy(iteratorRecord);
  }
});


/***/ }),
/* 243 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// TODO: Remove from `core-js@4`
var $ = __webpack_require__(2);
var indexed = __webpack_require__(230);

// `Iterator.prototype.indexed` method
// https://github.com/tc39/proposal-iterator-helpers
$({ target: 'Iterator', proto: true, real: true, forced: true }, {
  indexed: indexed
});


/***/ }),
/* 244 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var map = __webpack_require__(231);
var IS_PURE = __webpack_require__(35);

// `Iterator.prototype.map` method
// https://github.com/tc39/proposal-iterator-helpers
$({ target: 'Iterator', proto: true, real: true, forced: IS_PURE }, {
  map: map
});


/***/ }),
/* 245 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* eslint-disable es/no-bigint -- safe */
var $ = __webpack_require__(2);
var NumericRangeIterator = __webpack_require__(184);

var $TypeError = TypeError;

// `Iterator.range` method
// https://github.com/tc39/proposal-Number.range
$({ target: 'Iterator', stat: true, forced: true }, {
  range: function range(start, end, option) {
    if (typeof start == 'number') return new NumericRangeIterator(start, end, option, 'number', 0, 1);
    if (typeof start == 'bigint') return new NumericRangeIterator(start, end, option, 'bigint', BigInt(0), BigInt(1));
    throw new $TypeError('Incorrect Iterator.range arguments');
  }
});


/***/ }),
/* 246 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var iterate = __webpack_require__(71);
var aCallable = __webpack_require__(29);
var anObject = __webpack_require__(45);
var getIteratorDirect = __webpack_require__(95);

var $TypeError = TypeError;

// `Iterator.prototype.reduce` method
// https://github.com/tc39/proposal-iterator-helpers
$({ target: 'Iterator', proto: true, real: true }, {
  reduce: function reduce(reducer /* , initialValue */) {
    anObject(this);
    aCallable(reducer);
    var record = getIteratorDirect(this);
    var noInitial = arguments.length < 2;
    var accumulator = noInitial ? undefined : arguments[1];
    var counter = 0;
    iterate(record, function (value) {
      if (noInitial) {
        noInitial = false;
        accumulator = value;
      } else {
        accumulator = reducer(accumulator, value, counter);
      }
      counter++;
    }, { IS_RECORD: true });
    if (noInitial) throw new $TypeError('Reduce of empty iterator with no initial value');
    return accumulator;
  }
});


/***/ }),
/* 247 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var iterate = __webpack_require__(71);
var aCallable = __webpack_require__(29);
var anObject = __webpack_require__(45);
var getIteratorDirect = __webpack_require__(95);

// `Iterator.prototype.some` method
// https://github.com/tc39/proposal-iterator-helpers
$({ target: 'Iterator', proto: true, real: true }, {
  some: function some(predicate) {
    anObject(this);
    aCallable(predicate);
    var record = getIteratorDirect(this);
    var counter = 0;
    return iterate(record, function (value, stop) {
      if (predicate(value, counter++)) return stop();
    }, { IS_RECORD: true, INTERRUPTED: true }).stopped;
  }
});


/***/ }),
/* 248 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var call = __webpack_require__(7);
var anObject = __webpack_require__(45);
var getIteratorDirect = __webpack_require__(95);
var notANaN = __webpack_require__(167);
var toPositiveInteger = __webpack_require__(168);
var createIteratorProxy = __webpack_require__(232);
var iteratorClose = __webpack_require__(80);
var IS_PURE = __webpack_require__(35);

var IteratorProxy = createIteratorProxy(function () {
  var iterator = this.iterator;
  if (!this.remaining--) {
    this.done = true;
    return iteratorClose(iterator, 'normal', undefined);
  }
  var result = anObject(call(this.next, iterator));
  var done = this.done = !!result.done;
  if (!done) return result.value;
});

// `Iterator.prototype.take` method
// https://github.com/tc39/proposal-iterator-helpers
$({ target: 'Iterator', proto: true, real: true, forced: IS_PURE }, {
  take: function take(limit) {
    anObject(this);
    var remaining = toPositiveInteger(notANaN(+limit));
    return new IteratorProxy(getIteratorDirect(this), {
      remaining: remaining
    });
  }
});


/***/ }),
/* 249 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var anObject = __webpack_require__(45);
var iterate = __webpack_require__(71);
var getIteratorDirect = __webpack_require__(95);

var push = [].push;

// `Iterator.prototype.toArray` method
// https://github.com/tc39/proposal-iterator-helpers
$({ target: 'Iterator', proto: true, real: true }, {
  toArray: function toArray() {
    var result = [];
    iterate(getIteratorDirect(anObject(this)), push, { that: result, IS_RECORD: true });
    return result;
  }
});


/***/ }),
/* 250 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var anObject = __webpack_require__(45);
var AsyncFromSyncIterator = __webpack_require__(128);
var WrapAsyncIterator = __webpack_require__(176);
var getIteratorDirect = __webpack_require__(95);
var IS_PURE = __webpack_require__(35);

// `Iterator.prototype.toAsync` method
// https://github.com/tc39/proposal-async-iterator-helpers
$({ target: 'Iterator', proto: true, real: true, forced: IS_PURE }, {
  toAsync: function toAsync() {
    return new WrapAsyncIterator(getIteratorDirect(new AsyncFromSyncIterator(getIteratorDirect(anObject(this)))));
  }
});


/***/ }),
/* 251 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var NATIVE_RAW_JSON = __webpack_require__(252);
var isRawJSON = __webpack_require__(253);

// `JSON.parse` method
// https://tc39.es/proposal-json-parse-with-source/#sec-json.israwjson
// https://github.com/tc39/proposal-json-parse-with-source
$({ target: 'JSON', stat: true, forced: !NATIVE_RAW_JSON }, {
  isRawJSON: isRawJSON
});


/***/ }),
/* 252 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* eslint-disable es/no-json -- safe */
var fails = __webpack_require__(6);

module.exports = !fails(function () {
  var unsafeInt = '9007199254740993';
  var raw = JSON.rawJSON(unsafeInt);
  return !JSON.isRawJSON(raw) || JSON.stringify(raw) !== unsafeInt;
});


/***/ }),
/* 253 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var isObject = __webpack_require__(19);
var getInternalState = __webpack_require__(50).get;

module.exports = function isRawJSON(O) {
  if (!isObject(O)) return false;
  var state = getInternalState(O);
  return !!state && state.type === 'RawJSON';
};


/***/ }),
/* 254 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var DESCRIPTORS = __webpack_require__(5);
var globalThis = __webpack_require__(3);
var getBuiltIn = __webpack_require__(22);
var uncurryThis = __webpack_require__(13);
var call = __webpack_require__(7);
var isCallable = __webpack_require__(20);
var isObject = __webpack_require__(19);
var isArray = __webpack_require__(68);
var hasOwn = __webpack_require__(37);
var toString = __webpack_require__(123);
var lengthOfArrayLike = __webpack_require__(62);
var createProperty = __webpack_require__(228);
var fails = __webpack_require__(6);
var parseJSONString = __webpack_require__(255);
var NATIVE_SYMBOL = __webpack_require__(25);

var JSON = globalThis.JSON;
var Number = globalThis.Number;
var SyntaxError = globalThis.SyntaxError;
var nativeParse = JSON && JSON.parse;
var enumerableOwnProperties = getBuiltIn('Object', 'keys');
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var at = uncurryThis(''.charAt);
var slice = uncurryThis(''.slice);
var exec = uncurryThis(/./.exec);
var push = uncurryThis([].push);

var IS_DIGIT = /^\d$/;
var IS_NON_ZERO_DIGIT = /^[1-9]$/;
var IS_NUMBER_START = /^[\d-]$/;
var IS_WHITESPACE = /^[\t\n\r ]$/;

var PRIMITIVE = 0;
var OBJECT = 1;

var $parse = function (source, reviver) {
  source = toString(source);
  var context = new Context(source, 0, '');
  var root = context.parse();
  var value = root.value;
  var endIndex = context.skip(IS_WHITESPACE, root.end);
  if (endIndex < source.length) {
    throw new SyntaxError('Unexpected extra character: "' + at(source, endIndex) + '" after the parsed data at: ' + endIndex);
  }
  return isCallable(reviver) ? internalize({ '': value }, '', reviver, root) : value;
};

var internalize = function (holder, name, reviver, node) {
  var val = holder[name];
  var unmodified = node && val === node.value;
  var context = unmodified && typeof node.source == 'string' ? { source: node.source } : {};
  var elementRecordsLen, keys, len, i, P;
  if (isObject(val)) {
    var nodeIsArray = isArray(val);
    var nodes = unmodified ? node.nodes : nodeIsArray ? [] : {};
    if (nodeIsArray) {
      elementRecordsLen = nodes.length;
      len = lengthOfArrayLike(val);
      for (i = 0; i < len; i++) {
        internalizeProperty(val, i, internalize(val, '' + i, reviver, i < elementRecordsLen ? nodes[i] : undefined));
      }
    } else {
      keys = enumerableOwnProperties(val);
      len = lengthOfArrayLike(keys);
      for (i = 0; i < len; i++) {
        P = keys[i];
        internalizeProperty(val, P, internalize(val, P, reviver, hasOwn(nodes, P) ? nodes[P] : undefined));
      }
    }
  }
  return call(reviver, holder, name, val, context);
};

var internalizeProperty = function (object, key, value) {
  if (DESCRIPTORS) {
    var descriptor = getOwnPropertyDescriptor(object, key);
    if (descriptor && !descriptor.configurable) return;
  }
  if (value === undefined) delete object[key];
  else createProperty(object, key, value);
};

var Node = function (value, end, source, nodes) {
  this.value = value;
  this.end = end;
  this.source = source;
  this.nodes = nodes;
};

var Context = function (source, index) {
  this.source = source;
  this.index = index;
};

// https://www.json.org/json-en.html
Context.prototype = {
  fork: function (nextIndex) {
    return new Context(this.source, nextIndex);
  },
  parse: function () {
    var source = this.source;
    var i = this.skip(IS_WHITESPACE, this.index);
    var fork = this.fork(i);
    var chr = at(source, i);
    if (exec(IS_NUMBER_START, chr)) return fork.number();
    switch (chr) {
      case '{':
        return fork.object();
      case '[':
        return fork.array();
      case '"':
        return fork.string();
      case 't':
        return fork.keyword(true);
      case 'f':
        return fork.keyword(false);
      case 'n':
        return fork.keyword(null);
    } throw new SyntaxError('Unexpected character: "' + chr + '" at: ' + i);
  },
  node: function (type, value, start, end, nodes) {
    return new Node(value, end, type ? null : slice(this.source, start, end), nodes);
  },
  object: function () {
    var source = this.source;
    var i = this.index + 1;
    var expectKeypair = false;
    var object = {};
    var nodes = {};
    while (i < source.length) {
      i = this.until(['"', '}'], i);
      if (at(source, i) === '}' && !expectKeypair) {
        i++;
        break;
      }
      // Parsing the key
      var result = this.fork(i).string();
      var key = result.value;
      i = result.end;
      i = this.until([':'], i) + 1;
      // Parsing value
      i = this.skip(IS_WHITESPACE, i);
      result = this.fork(i).parse();
      createProperty(nodes, key, result);
      createProperty(object, key, result.value);
      i = this.until([',', '}'], result.end);
      var chr = at(source, i);
      if (chr === ',') {
        expectKeypair = true;
        i++;
      } else if (chr === '}') {
        i++;
        break;
      }
    }
    return this.node(OBJECT, object, this.index, i, nodes);
  },
  array: function () {
    var source = this.source;
    var i = this.index + 1;
    var expectElement = false;
    var array = [];
    var nodes = [];
    while (i < source.length) {
      i = this.skip(IS_WHITESPACE, i);
      if (at(source, i) === ']' && !expectElement) {
        i++;
        break;
      }
      var result = this.fork(i).parse();
      push(nodes, result);
      push(array, result.value);
      i = this.until([',', ']'], result.end);
      if (at(source, i) === ',') {
        expectElement = true;
        i++;
      } else if (at(source, i) === ']') {
        i++;
        break;
      }
    }
    return this.node(OBJECT, array, this.index, i, nodes);
  },
  string: function () {
    var index = this.index;
    var parsed = parseJSONString(this.source, this.index + 1);
    return this.node(PRIMITIVE, parsed.value, index, parsed.end);
  },
  number: function () {
    var source = this.source;
    var startIndex = this.index;
    var i = startIndex;
    if (at(source, i) === '-') i++;
    if (at(source, i) === '0') i++;
    else if (exec(IS_NON_ZERO_DIGIT, at(source, i))) i = this.skip(IS_DIGIT, i + 1);
    else throw new SyntaxError('Failed to parse number at: ' + i);
    if (at(source, i) === '.') i = this.skip(IS_DIGIT, i + 1);
    if (at(source, i) === 'e' || at(source, i) === 'E') {
      i++;
      if (at(source, i) === '+' || at(source, i) === '-') i++;
      var exponentStartIndex = i;
      i = this.skip(IS_DIGIT, i);
      if (exponentStartIndex === i) throw new SyntaxError("Failed to parse number's exponent value at: " + i);
    }
    return this.node(PRIMITIVE, Number(slice(source, startIndex, i)), startIndex, i);
  },
  keyword: function (value) {
    var keyword = '' + value;
    var index = this.index;
    var endIndex = index + keyword.length;
    if (slice(this.source, index, endIndex) !== keyword) throw new SyntaxError('Failed to parse value at: ' + index);
    return this.node(PRIMITIVE, value, index, endIndex);
  },
  skip: function (regex, i) {
    var source = this.source;
    for (; i < source.length; i++) if (!exec(regex, at(source, i))) break;
    return i;
  },
  until: function (array, i) {
    i = this.skip(IS_WHITESPACE, i);
    var chr = at(this.source, i);
    for (var j = 0; j < array.length; j++) if (array[j] === chr) return i;
    throw new SyntaxError('Unexpected character: "' + chr + '" at: ' + i);
  }
};

var NO_SOURCE_SUPPORT = fails(function () {
  var unsafeInt = '9007199254740993';
  var source;
  nativeParse(unsafeInt, function (key, value, context) {
    source = context.source;
  });
  return source !== unsafeInt;
});

var PROPER_BASE_PARSE = NATIVE_SYMBOL && !fails(function () {
  // Safari 9 bug
  return 1 / nativeParse('-0 \t') !== -Infinity;
});

// `JSON.parse` method
// https://tc39.es/ecma262/#sec-json.parse
// https://github.com/tc39/proposal-json-parse-with-source
$({ target: 'JSON', stat: true, forced: NO_SOURCE_SUPPORT }, {
  parse: function parse(text, reviver) {
    return PROPER_BASE_PARSE && !isCallable(reviver) ? nativeParse(text) : $parse(text, reviver);
  }
});


/***/ }),
/* 255 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var uncurryThis = __webpack_require__(13);
var hasOwn = __webpack_require__(37);

var $SyntaxError = SyntaxError;
var $parseInt = parseInt;
var fromCharCode = String.fromCharCode;
var at = uncurryThis(''.charAt);
var slice = uncurryThis(''.slice);
var exec = uncurryThis(/./.exec);

var codePoints = {
  '\\"': '"',
  '\\\\': '\\',
  '\\/': '/',
  '\\b': '\b',
  '\\f': '\f',
  '\\n': '\n',
  '\\r': '\r',
  '\\t': '\t'
};

var IS_4_HEX_DIGITS = /^[\da-f]{4}$/i;
// eslint-disable-next-line regexp/no-control-character -- safe
var IS_C0_CONTROL_CODE = /^[\u0000-\u001F]$/;

module.exports = function (source, i) {
  var unterminated = true;
  var value = '';
  while (i < source.length) {
    var chr = at(source, i);
    if (chr === '\\') {
      var twoChars = slice(source, i, i + 2);
      if (hasOwn(codePoints, twoChars)) {
        value += codePoints[twoChars];
        i += 2;
      } else if (twoChars === '\\u') {
        i += 2;
        var fourHexDigits = slice(source, i, i + 4);
        if (!exec(IS_4_HEX_DIGITS, fourHexDigits)) throw new $SyntaxError('Bad Unicode escape at: ' + i);
        value += fromCharCode($parseInt(fourHexDigits, 16));
        i += 4;
      } else throw new $SyntaxError('Unknown escape sequence: "' + twoChars + '"');
    } else if (chr === '"') {
      unterminated = false;
      i++;
      break;
    } else {
      if (exec(IS_C0_CONTROL_CODE, chr)) throw new $SyntaxError('Bad control character in string literal at: ' + i);
      value += chr;
      i++;
    }
  }
  if (unterminated) throw new $SyntaxError('Unterminated string at: ' + i);
  return { value: value, end: i };
};


/***/ }),
/* 256 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var FREEZING = __webpack_require__(199);
var NATIVE_RAW_JSON = __webpack_require__(252);
var getBuiltIn = __webpack_require__(22);
var call = __webpack_require__(7);
var uncurryThis = __webpack_require__(13);
var isCallable = __webpack_require__(20);
var isRawJSON = __webpack_require__(253);
var toString = __webpack_require__(123);
var createProperty = __webpack_require__(228);
var parseJSONString = __webpack_require__(255);
var getReplacerFunction = __webpack_require__(257);
var uid = __webpack_require__(39);
var setInternalState = __webpack_require__(50).set;

var $String = String;
var $SyntaxError = SyntaxError;
var parse = getBuiltIn('JSON', 'parse');
var $stringify = getBuiltIn('JSON', 'stringify');
var create = getBuiltIn('Object', 'create');
var freeze = getBuiltIn('Object', 'freeze');
var at = uncurryThis(''.charAt);
var slice = uncurryThis(''.slice);
var push = uncurryThis([].push);

var MARK = uid();
var MARK_LENGTH = MARK.length;
var ERROR_MESSAGE = 'Unacceptable as raw JSON';

var isWhitespace = function (it) {
  return it === ' ' || it === '\t' || it === '\n' || it === '\r';
};

// `JSON.parse` method
// https://tc39.es/proposal-json-parse-with-source/#sec-json.israwjson
// https://github.com/tc39/proposal-json-parse-with-source
$({ target: 'JSON', stat: true, forced: !NATIVE_RAW_JSON }, {
  rawJSON: function rawJSON(text) {
    var jsonString = toString(text);
    if (jsonString === '' || isWhitespace(at(jsonString, 0)) || isWhitespace(at(jsonString, jsonString.length - 1))) {
      throw new $SyntaxError(ERROR_MESSAGE);
    }
    var parsed = parse(jsonString);
    if (typeof parsed == 'object' && parsed !== null) throw new $SyntaxError(ERROR_MESSAGE);
    var obj = create(null);
    setInternalState(obj, { type: 'RawJSON' });
    createProperty(obj, 'rawJSON', jsonString);
    return FREEZING ? freeze(obj) : obj;
  }
});

// `JSON.stringify` method
// https://tc39.es/ecma262/#sec-json.stringify
// https://github.com/tc39/proposal-json-parse-with-source
if ($stringify) $({ target: 'JSON', stat: true, arity: 3, forced: !NATIVE_RAW_JSON }, {
  stringify: function stringify(text, replacer, space) {
    var replacerFunction = getReplacerFunction(replacer);
    var rawStrings = [];

    var json = $stringify(text, function (key, value) {
      // some old implementations (like WebKit) could pass numbers as keys
      var v = isCallable(replacerFunction) ? call(replacerFunction, this, $String(key), value) : value;
      return isRawJSON(v) ? MARK + (push(rawStrings, v.rawJSON) - 1) : v;
    }, space);

    if (typeof json != 'string') return json;

    var result = '';
    var length = json.length;

    for (var i = 0; i < length; i++) {
      var chr = at(json, i);
      if (chr === '"') {
        var end = parseJSONString(json, ++i).end - 1;
        var string = slice(json, i, end);
        result += slice(string, 0, MARK_LENGTH) === MARK
          ? rawStrings[slice(string, MARK_LENGTH)]
          : '"' + string + '"';
        i = end;
      } else result += chr;
    }

    return result;
  }
});


/***/ }),
/* 257 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var uncurryThis = __webpack_require__(13);
var isArray = __webpack_require__(68);
var isCallable = __webpack_require__(20);
var classof = __webpack_require__(14);
var toString = __webpack_require__(123);

var push = uncurryThis([].push);

module.exports = function (replacer) {
  if (isCallable(replacer)) return replacer;
  if (!isArray(replacer)) return;
  var rawLength = replacer.length;
  var keys = [];
  for (var i = 0; i < rawLength; i++) {
    var element = replacer[i];
    if (typeof element == 'string') push(keys, element);
    else if (typeof element == 'number' || classof(element) === 'Number' || classof(element) === 'String') push(keys, toString(element));
  }
  var keysLength = keys.length;
  var root = true;
  return function (key, value) {
    if (root) {
      root = false;
      return value;
    }
    if (isArray(this)) return value;
    for (var j = 0; j < keysLength; j++) if (keys[j] === key) return value;
  };
};


/***/ }),
/* 258 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var aMap = __webpack_require__(259);
var remove = __webpack_require__(81).remove;

// `Map.prototype.deleteAll` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', proto: true, real: true, forced: true }, {
  deleteAll: function deleteAll(/* ...elements */) {
    var collection = aMap(this);
    var allDeleted = true;
    var wasDeleted;
    for (var k = 0, len = arguments.length; k < len; k++) {
      wasDeleted = remove(collection, arguments[k]);
      allDeleted = allDeleted && wasDeleted;
    } return !!allDeleted;
  }
});


/***/ }),
/* 259 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var has = __webpack_require__(81).has;

// Perform ? RequireInternalSlot(M, [[MapData]])
module.exports = function (it) {
  has(it);
  return it;
};


/***/ }),
/* 260 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var aMap = __webpack_require__(259);
var MapHelpers = __webpack_require__(81);

var get = MapHelpers.get;
var has = MapHelpers.has;
var set = MapHelpers.set;

// `Map.prototype.emplace` method
// https://github.com/tc39/proposal-upsert
$({ target: 'Map', proto: true, real: true, forced: true }, {
  emplace: function emplace(key, handler) {
    var map = aMap(this);
    var value, inserted;
    if (has(map, key)) {
      value = get(map, key);
      if ('update' in handler) {
        value = handler.update(value, key, map);
        set(map, key, value);
      } return value;
    }
    inserted = handler.insert(key, map);
    set(map, key, inserted);
    return inserted;
  }
});


/***/ }),
/* 261 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var bind = __webpack_require__(72);
var aMap = __webpack_require__(259);
var iterate = __webpack_require__(155);

// `Map.prototype.every` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', proto: true, real: true, forced: true }, {
  every: function every(callbackfn /* , thisArg */) {
    var map = aMap(this);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    return iterate(map, function (value, key) {
      if (!boundFunction(value, key, map)) return false;
    }, true) !== false;
  }
});


/***/ }),
/* 262 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var bind = __webpack_require__(72);
var aMap = __webpack_require__(259);
var MapHelpers = __webpack_require__(81);
var iterate = __webpack_require__(155);

var Map = MapHelpers.Map;
var set = MapHelpers.set;

// `Map.prototype.filter` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', proto: true, real: true, forced: true }, {
  filter: function filter(callbackfn /* , thisArg */) {
    var map = aMap(this);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    var newMap = new Map();
    iterate(map, function (value, key) {
      if (boundFunction(value, key, map)) set(newMap, key, value);
    });
    return newMap;
  }
});


/***/ }),
/* 263 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var bind = __webpack_require__(72);
var aMap = __webpack_require__(259);
var iterate = __webpack_require__(155);

// `Map.prototype.find` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', proto: true, real: true, forced: true }, {
  find: function find(callbackfn /* , thisArg */) {
    var map = aMap(this);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    var result = iterate(map, function (value, key) {
      if (boundFunction(value, key, map)) return { value: value };
    }, true);
    return result && result.value;
  }
});


/***/ }),
/* 264 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var bind = __webpack_require__(72);
var aMap = __webpack_require__(259);
var iterate = __webpack_require__(155);

// `Map.prototype.findKey` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', proto: true, real: true, forced: true }, {
  findKey: function findKey(callbackfn /* , thisArg */) {
    var map = aMap(this);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    var result = iterate(map, function (value, key) {
      if (boundFunction(value, key, map)) return { key: key };
    }, true);
    return result && result.key;
  }
});


/***/ }),
/* 265 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var MapHelpers = __webpack_require__(81);
var createCollectionFrom = __webpack_require__(266);

// `Map.from` method
// https://tc39.github.io/proposal-setmap-offrom/#sec-map.from
$({ target: 'Map', stat: true, forced: true }, {
  from: createCollectionFrom(MapHelpers.Map, MapHelpers.set, true)
});


/***/ }),
/* 266 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var bind = __webpack_require__(72);
var anObject = __webpack_require__(45);
var toObject = __webpack_require__(38);
var iterate = __webpack_require__(71);

module.exports = function (C, adder, ENTRY) {
  return function from(source /* , mapFn, thisArg */) {
    var O = toObject(source);
    var length = arguments.length;
    var mapFn = length > 1 ? arguments[1] : undefined;
    var mapping = mapFn !== undefined;
    var boundFunction = mapping ? bind(mapFn, length > 2 ? arguments[2] : undefined) : undefined;
    var result = new C();
    var n = 0;
    iterate(O, function (nextItem) {
      var entry = mapping ? boundFunction(nextItem, n++) : nextItem;
      if (ENTRY) adder(result, anObject(entry)[0], entry[1]);
      else adder(result, entry);
    });
    return result;
  };
};


/***/ }),
/* 267 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var sameValueZero = __webpack_require__(268);
var aMap = __webpack_require__(259);
var iterate = __webpack_require__(155);

// `Map.prototype.includes` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', proto: true, real: true, forced: true }, {
  includes: function includes(searchElement) {
    return iterate(aMap(this), function (value) {
      if (sameValueZero(value, searchElement)) return true;
    }, true) === true;
  }
});


/***/ }),
/* 268 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// `SameValueZero` abstract operation
// https://tc39.es/ecma262/#sec-samevaluezero
module.exports = function (x, y) {
  // eslint-disable-next-line no-self-compare -- NaN check
  return x === y || x !== x && y !== y;
};


/***/ }),
/* 269 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var call = __webpack_require__(7);
var iterate = __webpack_require__(71);
var isCallable = __webpack_require__(20);
var aCallable = __webpack_require__(29);
var Map = __webpack_require__(81).Map;

// `Map.keyBy` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', stat: true, forced: true }, {
  keyBy: function keyBy(iterable, keyDerivative) {
    var C = isCallable(this) ? this : Map;
    var newMap = new C();
    aCallable(keyDerivative);
    var setter = aCallable(newMap.set);
    iterate(iterable, function (element) {
      call(setter, newMap, keyDerivative(element), element);
    });
    return newMap;
  }
});


/***/ }),
/* 270 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var aMap = __webpack_require__(259);
var iterate = __webpack_require__(155);

// `Map.prototype.keyOf` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', proto: true, real: true, forced: true }, {
  keyOf: function keyOf(searchElement) {
    var result = iterate(aMap(this), function (value, key) {
      if (value === searchElement) return { key: key };
    }, true);
    return result && result.key;
  }
});


/***/ }),
/* 271 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var bind = __webpack_require__(72);
var aMap = __webpack_require__(259);
var MapHelpers = __webpack_require__(81);
var iterate = __webpack_require__(155);

var Map = MapHelpers.Map;
var set = MapHelpers.set;

// `Map.prototype.mapKeys` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', proto: true, real: true, forced: true }, {
  mapKeys: function mapKeys(callbackfn /* , thisArg */) {
    var map = aMap(this);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    var newMap = new Map();
    iterate(map, function (value, key) {
      set(newMap, boundFunction(value, key, map), value);
    });
    return newMap;
  }
});


/***/ }),
/* 272 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var bind = __webpack_require__(72);
var aMap = __webpack_require__(259);
var MapHelpers = __webpack_require__(81);
var iterate = __webpack_require__(155);

var Map = MapHelpers.Map;
var set = MapHelpers.set;

// `Map.prototype.mapValues` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', proto: true, real: true, forced: true }, {
  mapValues: function mapValues(callbackfn /* , thisArg */) {
    var map = aMap(this);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    var newMap = new Map();
    iterate(map, function (value, key) {
      set(newMap, key, boundFunction(value, key, map));
    });
    return newMap;
  }
});


/***/ }),
/* 273 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var aMap = __webpack_require__(259);
var iterate = __webpack_require__(71);
var set = __webpack_require__(81).set;

// `Map.prototype.merge` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', proto: true, real: true, arity: 1, forced: true }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  merge: function merge(iterable /* ...iterables */) {
    var map = aMap(this);
    var argumentsLength = arguments.length;
    var i = 0;
    while (i < argumentsLength) {
      iterate(arguments[i++], function (key, value) {
        set(map, key, value);
      }, { AS_ENTRIES: true });
    }
    return map;
  }
});


/***/ }),
/* 274 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var MapHelpers = __webpack_require__(81);
var createCollectionOf = __webpack_require__(275);

// `Map.of` method
// https://tc39.github.io/proposal-setmap-offrom/#sec-map.of
$({ target: 'Map', stat: true, forced: true }, {
  of: createCollectionOf(MapHelpers.Map, MapHelpers.set, true)
});


/***/ }),
/* 275 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var anObject = __webpack_require__(45);

// https://tc39.github.io/proposal-setmap-offrom/
module.exports = function (C, adder, ENTRY) {
  return function of() {
    var result = new C();
    var length = arguments.length;
    for (var index = 0; index < length; index++) {
      var entry = arguments[index];
      if (ENTRY) adder(result, anObject(entry)[0], entry[1]);
      else adder(result, entry);
    } return result;
  };
};


/***/ }),
/* 276 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var aCallable = __webpack_require__(29);
var aMap = __webpack_require__(259);
var iterate = __webpack_require__(155);

var $TypeError = TypeError;

// `Map.prototype.reduce` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', proto: true, real: true, forced: true }, {
  reduce: function reduce(callbackfn /* , initialValue */) {
    var map = aMap(this);
    var noInitial = arguments.length < 2;
    var accumulator = noInitial ? undefined : arguments[1];
    aCallable(callbackfn);
    iterate(map, function (value, key) {
      if (noInitial) {
        noInitial = false;
        accumulator = value;
      } else {
        accumulator = callbackfn(accumulator, value, key, map);
      }
    });
    if (noInitial) throw new $TypeError('Reduce of empty map with no initial value');
    return accumulator;
  }
});


/***/ }),
/* 277 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var bind = __webpack_require__(72);
var aMap = __webpack_require__(259);
var iterate = __webpack_require__(155);

// `Map.prototype.some` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', proto: true, real: true, forced: true }, {
  some: function some(callbackfn /* , thisArg */) {
    var map = aMap(this);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    return iterate(map, function (value, key) {
      if (boundFunction(value, key, map)) return true;
    }, true) === true;
  }
});


/***/ }),
/* 278 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var aCallable = __webpack_require__(29);
var aMap = __webpack_require__(259);
var MapHelpers = __webpack_require__(81);

var $TypeError = TypeError;
var get = MapHelpers.get;
var has = MapHelpers.has;
var set = MapHelpers.set;

// `Map.prototype.update` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', proto: true, real: true, forced: true }, {
  update: function update(key, callback /* , thunk */) {
    var map = aMap(this);
    var length = arguments.length;
    aCallable(callback);
    var isPresentInMap = has(map, key);
    if (!isPresentInMap && length < 3) {
      throw new $TypeError('Updating absent value');
    }
    var value = isPresentInMap ? get(map, key) : aCallable(length > 2 ? arguments[2] : undefined)(key, map);
    set(map, key, callback(value, key, map));
    return map;
  }
});


/***/ }),
/* 279 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// TODO: remove from `core-js@4`
var $ = __webpack_require__(2);
var upsert = __webpack_require__(280);

// `Map.prototype.updateOrInsert` method (replaced by `Map.prototype.emplace`)
// https://github.com/thumbsupep/proposal-upsert
$({ target: 'Map', proto: true, real: true, name: 'upsert', forced: true }, {
  updateOrInsert: upsert
});


/***/ }),
/* 280 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var call = __webpack_require__(7);
var aCallable = __webpack_require__(29);
var isCallable = __webpack_require__(20);
var anObject = __webpack_require__(45);

var $TypeError = TypeError;

// `Map.prototype.upsert` method
// https://github.com/tc39/proposal-upsert
module.exports = function upsert(key, updateFn /* , insertFn */) {
  var map = anObject(this);
  var get = aCallable(map.get);
  var has = aCallable(map.has);
  var set = aCallable(map.set);
  var insertFn = arguments.length > 2 ? arguments[2] : undefined;
  var value;
  if (!isCallable(updateFn) && !isCallable(insertFn)) {
    throw new $TypeError('At least one callback required');
  }
  if (call(has, map, key)) {
    value = call(get, map, key);
    if (isCallable(updateFn)) {
      value = updateFn(value);
      call(set, map, key, value);
    }
  } else if (isCallable(insertFn)) {
    value = insertFn();
    call(set, map, key, value);
  } return value;
};


/***/ }),
/* 281 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// TODO: remove from `core-js@4`
var $ = __webpack_require__(2);
var upsert = __webpack_require__(280);

// `Map.prototype.upsert` method (replaced by `Map.prototype.emplace`)
// https://github.com/thumbsupep/proposal-upsert
$({ target: 'Map', proto: true, real: true, forced: true }, {
  upsert: upsert
});


/***/ }),
/* 282 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);

var min = Math.min;
var max = Math.max;

// `Math.clamp` method
// https://rwaldron.github.io/proposal-math-extensions/
$({ target: 'Math', stat: true, forced: true }, {
  clamp: function clamp(x, lower, upper) {
    return min(upper, max(lower, x));
  }
});


/***/ }),
/* 283 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);

// `Math.DEG_PER_RAD` constant
// https://rwaldron.github.io/proposal-math-extensions/
$({ target: 'Math', stat: true, nonConfigurable: true, nonWritable: true }, {
  DEG_PER_RAD: Math.PI / 180
});


/***/ }),
/* 284 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);

var RAD_PER_DEG = 180 / Math.PI;

// `Math.degrees` method
// https://rwaldron.github.io/proposal-math-extensions/
$({ target: 'Math', stat: true, forced: true }, {
  degrees: function degrees(radians) {
    return radians * RAD_PER_DEG;
  }
});


/***/ }),
/* 285 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);

var scale = __webpack_require__(286);
var fround = __webpack_require__(287);

// `Math.fscale` method
// https://rwaldron.github.io/proposal-math-extensions/
$({ target: 'Math', stat: true, forced: true }, {
  fscale: function fscale(x, inLow, inHigh, outLow, outHigh) {
    return fround(scale(x, inLow, inHigh, outLow, outHigh));
  }
});


/***/ }),
/* 286 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// `Math.scale` method implementation
// https://rwaldron.github.io/proposal-math-extensions/
module.exports = Math.scale || function scale(x, inLow, inHigh, outLow, outHigh) {
  var nx = +x;
  var nInLow = +inLow;
  var nInHigh = +inHigh;
  var nOutLow = +outLow;
  var nOutHigh = +outHigh;
  // eslint-disable-next-line no-self-compare -- NaN check
  if (nx !== nx || nInLow !== nInLow || nInHigh !== nInHigh || nOutLow !== nOutLow || nOutHigh !== nOutHigh) return NaN;
  if (nx === Infinity || nx === -Infinity) return nx;
  return (nx - nInLow) * (nOutHigh - nOutLow) / (nInHigh - nInLow) + nOutLow;
};


/***/ }),
/* 287 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var floatRound = __webpack_require__(216);

var FLOAT32_EPSILON = 1.1920928955078125e-7; // 2 ** -23;
var FLOAT32_MAX_VALUE = 3.4028234663852886e+38; // 2 ** 128 - 2 ** 104
var FLOAT32_MIN_VALUE = 1.1754943508222875e-38; // 2 ** -126;

// `Math.fround` method implementation
// https://tc39.es/ecma262/#sec-math.fround
// eslint-disable-next-line es/no-math-fround -- safe
module.exports = Math.fround || function fround(x) {
  return floatRound(x, FLOAT32_EPSILON, FLOAT32_MAX_VALUE, FLOAT32_MIN_VALUE);
};


/***/ }),
/* 288 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var f16round = __webpack_require__(215);

// `Math.f16round` method
// https://github.com/tc39/proposal-float16array
$({ target: 'Math', stat: true }, { f16round: f16round });


/***/ }),
/* 289 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);

// `Math.iaddh` method
// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
// TODO: Remove from `core-js@4`
$({ target: 'Math', stat: true, forced: true }, {
  iaddh: function iaddh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0;
    var $x1 = x1 >>> 0;
    var $y0 = y0 >>> 0;
    return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
  }
});


/***/ }),
/* 290 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);

// `Math.imulh` method
// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
// TODO: Remove from `core-js@4`
$({ target: 'Math', stat: true, forced: true }, {
  imulh: function imulh(u, v) {
    var UINT16 = 0xFFFF;
    var $u = +u;
    var $v = +v;
    var u0 = $u & UINT16;
    var v0 = $v & UINT16;
    var u1 = $u >> 16;
    var v1 = $v >> 16;
    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
  }
});


/***/ }),
/* 291 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);

// `Math.isubh` method
// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
// TODO: Remove from `core-js@4`
$({ target: 'Math', stat: true, forced: true }, {
  isubh: function isubh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0;
    var $x1 = x1 >>> 0;
    var $y0 = y0 >>> 0;
    return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
  }
});


/***/ }),
/* 292 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);

// `Math.RAD_PER_DEG` constant
// https://rwaldron.github.io/proposal-math-extensions/
$({ target: 'Math', stat: true, nonConfigurable: true, nonWritable: true }, {
  RAD_PER_DEG: 180 / Math.PI
});


/***/ }),
/* 293 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);

var DEG_PER_RAD = Math.PI / 180;

// `Math.radians` method
// https://rwaldron.github.io/proposal-math-extensions/
$({ target: 'Math', stat: true, forced: true }, {
  radians: function radians(degrees) {
    return degrees * DEG_PER_RAD;
  }
});


/***/ }),
/* 294 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var scale = __webpack_require__(286);

// `Math.scale` method
// https://rwaldron.github.io/proposal-math-extensions/
$({ target: 'Math', stat: true, forced: true }, {
  scale: scale
});


/***/ }),
/* 295 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var anObject = __webpack_require__(45);
var numberIsFinite = __webpack_require__(296);
var createIteratorConstructor = __webpack_require__(185);
var createIterResultObject = __webpack_require__(131);
var InternalStateModule = __webpack_require__(50);

var SEEDED_RANDOM = 'Seeded Random';
var SEEDED_RANDOM_GENERATOR = SEEDED_RANDOM + ' Generator';
var SEED_TYPE_ERROR = 'Math.seededPRNG() argument should have a "seed" field with a finite value.';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(SEEDED_RANDOM_GENERATOR);
var $TypeError = TypeError;

var $SeededRandomGenerator = createIteratorConstructor(function SeededRandomGenerator(seed) {
  setInternalState(this, {
    type: SEEDED_RANDOM_GENERATOR,
    seed: seed % 2147483647
  });
}, SEEDED_RANDOM, function next() {
  var state = getInternalState(this);
  var seed = state.seed = (state.seed * 1103515245 + 12345) % 2147483647;
  return createIterResultObject((seed & 1073741823) / 1073741823, false);
});

// `Math.seededPRNG` method
// https://github.com/tc39/proposal-seeded-random
// based on https://github.com/tc39/proposal-seeded-random/blob/78b8258835b57fc2100d076151ab506bc3202ae6/demo.html
$({ target: 'Math', stat: true, forced: true }, {
  seededPRNG: function seededPRNG(it) {
    var seed = anObject(it).seed;
    if (!numberIsFinite(seed)) throw new $TypeError(SEED_TYPE_ERROR);
    return new $SeededRandomGenerator(seed);
  }
});


/***/ }),
/* 296 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var globalThis = __webpack_require__(3);

var globalIsFinite = globalThis.isFinite;

// `Number.isFinite` method
// https://tc39.es/ecma262/#sec-number.isfinite
// eslint-disable-next-line es/no-number-isfinite -- safe
module.exports = Number.isFinite || function isFinite(it) {
  return typeof it == 'number' && globalIsFinite(it);
};


/***/ }),
/* 297 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);

// `Math.signbit` method
// https://github.com/tc39/proposal-Math.signbit
$({ target: 'Math', stat: true, forced: true }, {
  signbit: function signbit(x) {
    var n = +x;
    // eslint-disable-next-line no-self-compare -- NaN check
    return n === n && n === 0 ? 1 / n === -Infinity : n < 0;
  }
});


/***/ }),
/* 298 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// based on Shewchuk's algorithm for exactly floating point addition
// adapted from https://github.com/tc39/proposal-math-sum/blob/3513d58323a1ae25560e8700aa5294500c6c9287/polyfill/polyfill.mjs
var $ = __webpack_require__(2);
var uncurryThis = __webpack_require__(13);
var iterate = __webpack_require__(71);

var $RangeError = RangeError;
var $TypeError = TypeError;
var $Infinity = Infinity;
var $NaN = NaN;
var abs = Math.abs;
var pow = Math.pow;
var push = uncurryThis([].push);

var POW_2_1023 = pow(2, 1023);
var MAX_SAFE_INTEGER = pow(2, 53) - 1; // 2 ** 53 - 1 === 9007199254740992
var MAX_DOUBLE = Number.MAX_VALUE; // 2 ** 1024 - 2 ** (1023 - 52) === 1.79769313486231570815e+308
var MAX_ULP = pow(2, 971); // 2 ** (1023 - 52) === 1.99584030953471981166e+292

var NOT_A_NUMBER = {};
var MINUS_INFINITY = {};
var PLUS_INFINITY = {};
var MINUS_ZERO = {};
var FINITE = {};

// prerequisite: abs(x) >= abs(y)
var twosum = function (x, y) {
  var hi = x + y;
  var lo = y - (hi - x);
  return { hi: hi, lo: lo };
};

// `Math.sumPrecise` method
// https://github.com/tc39/proposal-math-sum
$({ target: 'Math', stat: true, forced: true }, {
  // eslint-disable-next-line max-statements -- ok
  sumPrecise: function sumPrecise(items) {
    var numbers = [];
    var count = 0;
    var state = MINUS_ZERO;

    iterate(items, function (n) {
      if (++count >= MAX_SAFE_INTEGER) throw new $RangeError('Maximum allowed index exceeded');
      if (typeof n != 'number') throw new $TypeError('Value is not a number');
      if (state !== NOT_A_NUMBER) {
        // eslint-disable-next-line no-self-compare -- NaN check
        if (n !== n) state = NOT_A_NUMBER;
        else if (n === $Infinity) state = state === MINUS_INFINITY ? NOT_A_NUMBER : PLUS_INFINITY;
        else if (n === -$Infinity) state = state === PLUS_INFINITY ? NOT_A_NUMBER : MINUS_INFINITY;
        else if ((n !== 0 || (1 / n) === $Infinity) && (state === MINUS_ZERO || state === FINITE)) {
          state = FINITE;
          push(numbers, n);
        }
      }
    });

    switch (state) {
      case NOT_A_NUMBER: return $NaN;
      case MINUS_INFINITY: return -$Infinity;
      case PLUS_INFINITY: return $Infinity;
      case MINUS_ZERO: return -0;
    }

    var partials = [];
    var overflow = 0; // conceptually 2 ** 1024 times this value; the final partial is biased by this amount
    var x, y, sum, hi, lo, tmp;

    for (var i = 0; i < numbers.length; i++) {
      x = numbers[i];
      var actuallyUsedPartials = 0;
      for (var j = 0; j < partials.length; j++) {
        y = partials[j];
        if (abs(x) < abs(y)) {
          tmp = x;
          x = y;
          y = tmp;
        }
        sum = twosum(x, y);
        hi = sum.hi;
        lo = sum.lo;
        if (abs(hi) === $Infinity) {
          var sign = hi === $Infinity ? 1 : -1;
          overflow += sign;

          x = (x - (sign * POW_2_1023)) - (sign * POW_2_1023);
          if (abs(x) < abs(y)) {
            tmp = x;
            x = y;
            y = tmp;
          }
          sum = twosum(x, y);
          hi = sum.hi;
          lo = sum.lo;
        }
        if (lo !== 0) partials[actuallyUsedPartials++] = lo;
        x = hi;
      }
      partials.length = actuallyUsedPartials;
      if (x !== 0) push(partials, x);
    }

    // compute the exact sum of partials, stopping once we lose precision
    var n = partials.length - 1;
    hi = 0;
    lo = 0;

    if (overflow !== 0) {
      var next = n >= 0 ? partials[n] : 0;
      n--;
      if (abs(overflow) > 1 || (overflow > 0 && next > 0) || (overflow < 0 && next < 0)) {
        return overflow > 0 ? $Infinity : -$Infinity;
      }
      // here we actually have to do the arithmetic
      // drop a factor of 2 so we can do it without overflow
      // assert(abs(overflow) === 1)
      sum = twosum(overflow * POW_2_1023, next / 2);
      hi = sum.hi;
      lo = sum.lo;
      lo *= 2;
      if (abs(2 * hi) === $Infinity) {
        // rounding to the maximum value
        if (hi > 0) {
          return (hi === POW_2_1023 && lo === -(MAX_ULP / 2) && n >= 0 && partials[n] < 0) ? MAX_DOUBLE : $Infinity;
        } return (hi === -POW_2_1023 && lo === (MAX_ULP / 2) && n >= 0 && partials[n] > 0) ? -MAX_DOUBLE : -$Infinity;
      }

      if (lo !== 0) {
        partials[++n] = lo;
        lo = 0;
      }

      hi *= 2;
    }

    while (n >= 0) {
      sum = twosum(hi, partials[n--]);
      hi = sum.hi;
      lo = sum.lo;
      if (lo !== 0) break;
    }

    if (n >= 0 && ((lo < 0 && partials[n] < 0) || (lo > 0 && partials[n] > 0))) {
      y = lo * 2;
      x = hi + y;
      if (y === x - hi) hi = x;
    }

    return hi;
  }
});


/***/ }),
/* 299 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);

// `Math.umulh` method
// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
// TODO: Remove from `core-js@4`
$({ target: 'Math', stat: true, forced: true }, {
  umulh: function umulh(u, v) {
    var UINT16 = 0xFFFF;
    var $u = +u;
    var $v = +v;
    var u0 = $u & UINT16;
    var v0 = $v & UINT16;
    var u1 = $u >>> 16;
    var v1 = $v >>> 16;
    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
  }
});


/***/ }),
/* 300 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var uncurryThis = __webpack_require__(13);
var toIntegerOrInfinity = __webpack_require__(60);

var INVALID_NUMBER_REPRESENTATION = 'Invalid number representation';
var INVALID_RADIX = 'Invalid radix';
var $RangeError = RangeError;
var $SyntaxError = SyntaxError;
var $TypeError = TypeError;
var $parseInt = parseInt;
var pow = Math.pow;
var valid = /^[\d.a-z]+$/;
var charAt = uncurryThis(''.charAt);
var exec = uncurryThis(valid.exec);
var numberToString = uncurryThis(1.0.toString);
var stringSlice = uncurryThis(''.slice);
var split = uncurryThis(''.split);

// `Number.fromString` method
// https://github.com/tc39/proposal-number-fromstring
$({ target: 'Number', stat: true, forced: true }, {
  fromString: function fromString(string, radix) {
    var sign = 1;
    if (typeof string != 'string') throw new $TypeError(INVALID_NUMBER_REPRESENTATION);
    if (!string.length) throw new $SyntaxError(INVALID_NUMBER_REPRESENTATION);
    if (charAt(string, 0) === '-') {
      sign = -1;
      string = stringSlice(string, 1);
      if (!string.length) throw new $SyntaxError(INVALID_NUMBER_REPRESENTATION);
    }
    var R = radix === undefined ? 10 : toIntegerOrInfinity(radix);
    if (R < 2 || R > 36) throw new $RangeError(INVALID_RADIX);
    if (!exec(valid, string)) throw new $SyntaxError(INVALID_NUMBER_REPRESENTATION);
    var parts = split(string, '.');
    var mathNum = $parseInt(parts[0], R);
    if (parts.length > 1) mathNum += $parseInt(parts[1], R) / pow(R, parts[1].length);
    if (R === 10 && numberToString(mathNum, R) !== string) throw new $SyntaxError(INVALID_NUMBER_REPRESENTATION);
    return sign * mathNum;
  }
});


/***/ }),
/* 301 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var NumericRangeIterator = __webpack_require__(184);

// `Number.range` method
// https://github.com/tc39/proposal-Number.range
// TODO: Remove from `core-js@4`
$({ target: 'Number', stat: true, forced: true }, {
  range: function range(start, end, option) {
    return new NumericRangeIterator(start, end, option, 'number', 0, 1);
  }
});


/***/ }),
/* 302 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// TODO: Remove from `core-js@4`
var $ = __webpack_require__(2);
var ObjectIterator = __webpack_require__(303);

// `Object.iterateEntries` method
// https://github.com/tc39/proposal-object-iteration
$({ target: 'Object', stat: true, forced: true }, {
  iterateEntries: function iterateEntries(object) {
    return new ObjectIterator(object, 'entries');
  }
});


/***/ }),
/* 303 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var InternalStateModule = __webpack_require__(50);
var createIteratorConstructor = __webpack_require__(185);
var createIterResultObject = __webpack_require__(131);
var hasOwn = __webpack_require__(37);
var objectKeys = __webpack_require__(117);
var toObject = __webpack_require__(38);

var OBJECT_ITERATOR = 'Object Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(OBJECT_ITERATOR);

module.exports = createIteratorConstructor(function ObjectIterator(source, mode) {
  var object = toObject(source);
  setInternalState(this, {
    type: OBJECT_ITERATOR,
    mode: mode,
    object: object,
    keys: objectKeys(object),
    index: 0
  });
}, 'Object', function next() {
  var state = getInternalState(this);
  var keys = state.keys;
  while (true) {
    if (keys === null || state.index >= keys.length) {
      state.object = state.keys = null;
      return createIterResultObject(undefined, true);
    }
    var key = keys[state.index++];
    var object = state.object;
    if (!hasOwn(object, key)) continue;
    switch (state.mode) {
      case 'keys': return createIterResultObject(key, false);
      case 'values': return createIterResultObject(object[key], false);
    } /* entries */ return createIterResultObject([key, object[key]], false);
  }
});


/***/ }),
/* 304 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// TODO: Remove from `core-js@4`
var $ = __webpack_require__(2);
var ObjectIterator = __webpack_require__(303);

// `Object.iterateKeys` method
// https://github.com/tc39/proposal-object-iteration
$({ target: 'Object', stat: true, forced: true }, {
  iterateKeys: function iterateKeys(object) {
    return new ObjectIterator(object, 'keys');
  }
});


/***/ }),
/* 305 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// TODO: Remove from `core-js@4`
var $ = __webpack_require__(2);
var ObjectIterator = __webpack_require__(303);

// `Object.iterateValues` method
// https://github.com/tc39/proposal-object-iteration
$({ target: 'Object', stat: true, forced: true }, {
  iterateValues: function iterateValues(object) {
    return new ObjectIterator(object, 'values');
  }
});


/***/ }),
/* 306 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// TODO: Remove this module from `core-js@4` since it's split to modules listed below
__webpack_require__(307);
__webpack_require__(309);
__webpack_require__(310);


/***/ }),
/* 307 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-observable
var $ = __webpack_require__(2);
var call = __webpack_require__(7);
var DESCRIPTORS = __webpack_require__(5);
var setSpecies = __webpack_require__(204);
var aCallable = __webpack_require__(29);
var anObject = __webpack_require__(45);
var anInstance = __webpack_require__(157);
var isCallable = __webpack_require__(20);
var isNullOrUndefined = __webpack_require__(16);
var isObject = __webpack_require__(19);
var getMethod = __webpack_require__(28);
var defineBuiltIn = __webpack_require__(46);
var defineBuiltIns = __webpack_require__(129);
var defineBuiltInAccessor = __webpack_require__(151);
var hostReportErrors = __webpack_require__(308);
var wellKnownSymbol = __webpack_require__(32);
var InternalStateModule = __webpack_require__(50);

var $$OBSERVABLE = wellKnownSymbol('observable');
var OBSERVABLE = 'Observable';
var SUBSCRIPTION = 'Subscription';
var SUBSCRIPTION_OBSERVER = 'SubscriptionObserver';
var getterFor = InternalStateModule.getterFor;
var setInternalState = InternalStateModule.set;
var getObservableInternalState = getterFor(OBSERVABLE);
var getSubscriptionInternalState = getterFor(SUBSCRIPTION);
var getSubscriptionObserverInternalState = getterFor(SUBSCRIPTION_OBSERVER);

var SubscriptionState = function (observer) {
  this.observer = anObject(observer);
  this.cleanup = undefined;
  this.subscriptionObserver = undefined;
};

SubscriptionState.prototype = {
  type: SUBSCRIPTION,
  clean: function () {
    var cleanup = this.cleanup;
    if (cleanup) {
      this.cleanup = undefined;
      try {
        cleanup();
      } catch (error) {
        hostReportErrors(error);
      }
    }
  },
  close: function () {
    if (!DESCRIPTORS) {
      var subscription = this.facade;
      var subscriptionObserver = this.subscriptionObserver;
      subscription.closed = true;
      if (subscriptionObserver) subscriptionObserver.closed = true;
    } this.observer = undefined;
  },
  isClosed: function () {
    return this.observer === undefined;
  }
};

var Subscription = function (observer, subscriber) {
  var subscriptionState = setInternalState(this, new SubscriptionState(observer));
  var start;
  if (!DESCRIPTORS) this.closed = false;
  try {
    if (start = getMethod(observer, 'start')) call(start, observer, this);
  } catch (error) {
    hostReportErrors(error);
  }
  if (subscriptionState.isClosed()) return;
  var subscriptionObserver = subscriptionState.subscriptionObserver = new SubscriptionObserver(subscriptionState);
  try {
    var cleanup = subscriber(subscriptionObserver);
    var subscription = cleanup;
    if (!isNullOrUndefined(cleanup)) subscriptionState.cleanup = isCallable(cleanup.unsubscribe)
      ? function () { subscription.unsubscribe(); }
      : aCallable(cleanup);
  } catch (error) {
    subscriptionObserver.error(error);
    return;
  } if (subscriptionState.isClosed()) subscriptionState.clean();
};

Subscription.prototype = defineBuiltIns({}, {
  unsubscribe: function unsubscribe() {
    var subscriptionState = getSubscriptionInternalState(this);
    if (!subscriptionState.isClosed()) {
      subscriptionState.close();
      subscriptionState.clean();
    }
  }
});

if (DESCRIPTORS) defineBuiltInAccessor(Subscription.prototype, 'closed', {
  configurable: true,
  get: function closed() {
    return getSubscriptionInternalState(this).isClosed();
  }
});

var SubscriptionObserver = function (subscriptionState) {
  setInternalState(this, {
    type: SUBSCRIPTION_OBSERVER,
    subscriptionState: subscriptionState
  });
  if (!DESCRIPTORS) this.closed = false;
};

SubscriptionObserver.prototype = defineBuiltIns({}, {
  next: function next(value) {
    var subscriptionState = getSubscriptionObserverInternalState(this).subscriptionState;
    if (!subscriptionState.isClosed()) {
      var observer = subscriptionState.observer;
      try {
        var nextMethod = getMethod(observer, 'next');
        if (nextMethod) call(nextMethod, observer, value);
      } catch (error) {
        hostReportErrors(error);
      }
    }
  },
  error: function error(value) {
    var subscriptionState = getSubscriptionObserverInternalState(this).subscriptionState;
    if (!subscriptionState.isClosed()) {
      var observer = subscriptionState.observer;
      subscriptionState.close();
      try {
        var errorMethod = getMethod(observer, 'error');
        if (errorMethod) call(errorMethod, observer, value);
        else hostReportErrors(value);
      } catch (err) {
        hostReportErrors(err);
      } subscriptionState.clean();
    }
  },
  complete: function complete() {
    var subscriptionState = getSubscriptionObserverInternalState(this).subscriptionState;
    if (!subscriptionState.isClosed()) {
      var observer = subscriptionState.observer;
      subscriptionState.close();
      try {
        var completeMethod = getMethod(observer, 'complete');
        if (completeMethod) call(completeMethod, observer);
      } catch (error) {
        hostReportErrors(error);
      } subscriptionState.clean();
    }
  }
});

if (DESCRIPTORS) defineBuiltInAccessor(SubscriptionObserver.prototype, 'closed', {
  configurable: true,
  get: function closed() {
    return getSubscriptionObserverInternalState(this).subscriptionState.isClosed();
  }
});

var $Observable = function Observable(subscriber) {
  anInstance(this, ObservablePrototype);
  setInternalState(this, {
    type: OBSERVABLE,
    subscriber: aCallable(subscriber)
  });
};

var ObservablePrototype = $Observable.prototype;

defineBuiltIns(ObservablePrototype, {
  subscribe: function subscribe(observer) {
    var length = arguments.length;
    return new Subscription(isCallable(observer) ? {
      next: observer,
      error: length > 1 ? arguments[1] : undefined,
      complete: length > 2 ? arguments[2] : undefined
    } : isObject(observer) ? observer : {}, getObservableInternalState(this).subscriber);
  }
});

defineBuiltIn(ObservablePrototype, $$OBSERVABLE, function () { return this; });

$({ global: true, constructor: true, forced: true }, {
  Observable: $Observable
});

setSpecies(OBSERVABLE);


/***/ }),
/* 308 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function (a, b) {
  try {
    // eslint-disable-next-line no-console -- safe
    arguments.length === 1 ? console.error(a) : console.error(a, b);
  } catch (error) { /* empty */ }
};


/***/ }),
/* 309 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var getBuiltIn = __webpack_require__(22);
var call = __webpack_require__(7);
var anObject = __webpack_require__(45);
var isConstructor = __webpack_require__(126);
var getIterator = __webpack_require__(76);
var getMethod = __webpack_require__(28);
var iterate = __webpack_require__(71);
var wellKnownSymbol = __webpack_require__(32);

var $$OBSERVABLE = wellKnownSymbol('observable');

// `Observable.from` method
// https://github.com/tc39/proposal-observable
$({ target: 'Observable', stat: true, forced: true }, {
  from: function from(x) {
    var C = isConstructor(this) ? this : getBuiltIn('Observable');
    var observableMethod = getMethod(anObject(x), $$OBSERVABLE);
    if (observableMethod) {
      var observable = anObject(call(observableMethod, x));
      return observable.constructor === C ? observable : new C(function (observer) {
        return observable.subscribe(observer);
      });
    }
    var iterator = getIterator(x);
    return new C(function (observer) {
      iterate(iterator, function (it, stop) {
        observer.next(it);
        if (observer.closed) return stop();
      }, { IS_ITERATOR: true, INTERRUPTED: true });
      observer.complete();
    });
  }
});


/***/ }),
/* 310 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var getBuiltIn = __webpack_require__(22);
var isConstructor = __webpack_require__(126);

var Array = getBuiltIn('Array');

// `Observable.of` method
// https://github.com/tc39/proposal-observable
$({ target: 'Observable', stat: true, forced: true }, {
  of: function of() {
    var C = isConstructor(this) ? this : getBuiltIn('Observable');
    var length = arguments.length;
    var items = Array(length);
    var index = 0;
    while (index < length) items[index] = arguments[index++];
    return new C(function (observer) {
      for (var i = 0; i < length; i++) {
        observer.next(items[i]);
        if (observer.closed) return;
      } observer.complete();
    });
  }
});


/***/ }),
/* 311 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var globalThis = __webpack_require__(3);
var apply = __webpack_require__(189);
var slice = __webpack_require__(196);
var newPromiseCapabilityModule = __webpack_require__(84);
var aCallable = __webpack_require__(29);
var perform = __webpack_require__(164);

var Promise = globalThis.Promise;

var ACCEPT_ARGUMENTS = false;
// Avoiding the use of polyfills of the previous iteration of this proposal
// that does not accept arguments of the callback
var FORCED = !Promise || !Promise['try'] || perform(function () {
  Promise['try'](function (argument) {
    ACCEPT_ARGUMENTS = argument === 8;
  }, 8);
}).error || !ACCEPT_ARGUMENTS;

// `Promise.try` method
// https://github.com/tc39/proposal-promise-try
$({ target: 'Promise', stat: true, forced: FORCED }, {
  'try': function (callbackfn /* , ...args */) {
    var args = arguments.length > 1 ? slice(arguments, 1) : [];
    var promiseCapability = newPromiseCapabilityModule.f(this);
    var result = perform(function () {
      return apply(aCallable(callbackfn), undefined, args);
    });
    (result.error ? promiseCapability.reject : promiseCapability.resolve)(result.value);
    return promiseCapability.promise;
  }
});


/***/ }),
/* 312 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// TODO: Remove from `core-js@4`
var $ = __webpack_require__(2);
var ReflectMetadataModule = __webpack_require__(313);
var anObject = __webpack_require__(45);

var toMetadataKey = ReflectMetadataModule.toKey;
var ordinaryDefineOwnMetadata = ReflectMetadataModule.set;

// `Reflect.defineMetadata` method
// https://github.com/rbuckton/reflect-metadata
$({ target: 'Reflect', stat: true }, {
  defineMetadata: function defineMetadata(metadataKey, metadataValue, target /* , targetKey */) {
    var targetKey = arguments.length < 4 ? undefined : toMetadataKey(arguments[3]);
    ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), targetKey);
  }
});


/***/ }),
/* 313 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`
__webpack_require__(191);
__webpack_require__(205);
var getBuiltIn = __webpack_require__(22);
var uncurryThis = __webpack_require__(13);
var shared = __webpack_require__(33);

var Map = getBuiltIn('Map');
var WeakMap = getBuiltIn('WeakMap');
var push = uncurryThis([].push);

var metadata = shared('metadata');
var store = metadata.store || (metadata.store = new WeakMap());

var getOrCreateMetadataMap = function (target, targetKey, create) {
  var targetMetadata = store.get(target);
  if (!targetMetadata) {
    if (!create) return;
    store.set(target, targetMetadata = new Map());
  }
  var keyMetadata = targetMetadata.get(targetKey);
  if (!keyMetadata) {
    if (!create) return;
    targetMetadata.set(targetKey, keyMetadata = new Map());
  } return keyMetadata;
};

var ordinaryHasOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
};

var ordinaryGetOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
};

var ordinaryDefineOwnMetadata = function (MetadataKey, MetadataValue, O, P) {
  getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
};

var ordinaryOwnMetadataKeys = function (target, targetKey) {
  var metadataMap = getOrCreateMetadataMap(target, targetKey, false);
  var keys = [];
  if (metadataMap) metadataMap.forEach(function (_, key) { push(keys, key); });
  return keys;
};

var toMetadataKey = function (it) {
  return it === undefined || typeof it == 'symbol' ? it : String(it);
};

module.exports = {
  store: store,
  getMap: getOrCreateMetadataMap,
  has: ordinaryHasOwnMetadata,
  get: ordinaryGetOwnMetadata,
  set: ordinaryDefineOwnMetadata,
  keys: ordinaryOwnMetadataKeys,
  toKey: toMetadataKey
};


/***/ }),
/* 314 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var ReflectMetadataModule = __webpack_require__(313);
var anObject = __webpack_require__(45);

var toMetadataKey = ReflectMetadataModule.toKey;
var getOrCreateMetadataMap = ReflectMetadataModule.getMap;
var store = ReflectMetadataModule.store;

// `Reflect.deleteMetadata` method
// https://github.com/rbuckton/reflect-metadata
$({ target: 'Reflect', stat: true }, {
  deleteMetadata: function deleteMetadata(metadataKey, target /* , targetKey */) {
    var targetKey = arguments.length < 3 ? undefined : toMetadataKey(arguments[2]);
    var metadataMap = getOrCreateMetadataMap(anObject(target), targetKey, false);
    if (metadataMap === undefined || !metadataMap['delete'](metadataKey)) return false;
    if (metadataMap.size) return true;
    var targetMetadata = store.get(target);
    targetMetadata['delete'](targetKey);
    return !!targetMetadata.size || store['delete'](target);
  }
});


/***/ }),
/* 315 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// TODO: Remove from `core-js@4`
var $ = __webpack_require__(2);
var ReflectMetadataModule = __webpack_require__(313);
var anObject = __webpack_require__(45);
var getPrototypeOf = __webpack_require__(110);

var ordinaryHasOwnMetadata = ReflectMetadataModule.has;
var ordinaryGetOwnMetadata = ReflectMetadataModule.get;
var toMetadataKey = ReflectMetadataModule.toKey;

var ordinaryGetMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return ordinaryGetOwnMetadata(MetadataKey, O, P);
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
};

// `Reflect.getMetadata` method
// https://github.com/rbuckton/reflect-metadata
$({ target: 'Reflect', stat: true }, {
  getMetadata: function getMetadata(metadataKey, target /* , targetKey */) {
    var targetKey = arguments.length < 3 ? undefined : toMetadataKey(arguments[2]);
    return ordinaryGetMetadata(metadataKey, anObject(target), targetKey);
  }
});


/***/ }),
/* 316 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// TODO: Remove from `core-js@4`
var $ = __webpack_require__(2);
var uncurryThis = __webpack_require__(13);
var ReflectMetadataModule = __webpack_require__(313);
var anObject = __webpack_require__(45);
var getPrototypeOf = __webpack_require__(110);
var $arrayUniqueBy = __webpack_require__(154);

var arrayUniqueBy = uncurryThis($arrayUniqueBy);
var concat = uncurryThis([].concat);
var ordinaryOwnMetadataKeys = ReflectMetadataModule.keys;
var toMetadataKey = ReflectMetadataModule.toKey;

var ordinaryMetadataKeys = function (O, P) {
  var oKeys = ordinaryOwnMetadataKeys(O, P);
  var parent = getPrototypeOf(O);
  if (parent === null) return oKeys;
  var pKeys = ordinaryMetadataKeys(parent, P);
  return pKeys.length ? oKeys.length ? arrayUniqueBy(concat(oKeys, pKeys)) : pKeys : oKeys;
};

// `Reflect.getMetadataKeys` method
// https://github.com/rbuckton/reflect-metadata
$({ target: 'Reflect', stat: true }, {
  getMetadataKeys: function getMetadataKeys(target /* , targetKey */) {
    var targetKey = arguments.length < 2 ? undefined : toMetadataKey(arguments[1]);
    return ordinaryMetadataKeys(anObject(target), targetKey);
  }
});


/***/ }),
/* 317 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// TODO: Remove from `core-js@4`
var $ = __webpack_require__(2);
var ReflectMetadataModule = __webpack_require__(313);
var anObject = __webpack_require__(45);

var ordinaryGetOwnMetadata = ReflectMetadataModule.get;
var toMetadataKey = ReflectMetadataModule.toKey;

// `Reflect.getOwnMetadata` method
// https://github.com/rbuckton/reflect-metadata
$({ target: 'Reflect', stat: true }, {
  getOwnMetadata: function getOwnMetadata(metadataKey, target /* , targetKey */) {
    var targetKey = arguments.length < 3 ? undefined : toMetadataKey(arguments[2]);
    return ordinaryGetOwnMetadata(metadataKey, anObject(target), targetKey);
  }
});


/***/ }),
/* 318 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// TODO: Remove from `core-js@4`
var $ = __webpack_require__(2);
var ReflectMetadataModule = __webpack_require__(313);
var anObject = __webpack_require__(45);

var ordinaryOwnMetadataKeys = ReflectMetadataModule.keys;
var toMetadataKey = ReflectMetadataModule.toKey;

// `Reflect.getOwnMetadataKeys` method
// https://github.com/rbuckton/reflect-metadata
$({ target: 'Reflect', stat: true }, {
  getOwnMetadataKeys: function getOwnMetadataKeys(target /* , targetKey */) {
    var targetKey = arguments.length < 2 ? undefined : toMetadataKey(arguments[1]);
    return ordinaryOwnMetadataKeys(anObject(target), targetKey);
  }
});


/***/ }),
/* 319 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// TODO: Remove from `core-js@4`
var $ = __webpack_require__(2);
var ReflectMetadataModule = __webpack_require__(313);
var anObject = __webpack_require__(45);
var getPrototypeOf = __webpack_require__(110);

var ordinaryHasOwnMetadata = ReflectMetadataModule.has;
var toMetadataKey = ReflectMetadataModule.toKey;

var ordinaryHasMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return true;
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
};

// `Reflect.hasMetadata` method
// https://github.com/rbuckton/reflect-metadata
$({ target: 'Reflect', stat: true }, {
  hasMetadata: function hasMetadata(metadataKey, target /* , targetKey */) {
    var targetKey = arguments.length < 3 ? undefined : toMetadataKey(arguments[2]);
    return ordinaryHasMetadata(metadataKey, anObject(target), targetKey);
  }
});


/***/ }),
/* 320 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// TODO: Remove from `core-js@4`
var $ = __webpack_require__(2);
var ReflectMetadataModule = __webpack_require__(313);
var anObject = __webpack_require__(45);

var ordinaryHasOwnMetadata = ReflectMetadataModule.has;
var toMetadataKey = ReflectMetadataModule.toKey;

// `Reflect.hasOwnMetadata` method
// https://github.com/rbuckton/reflect-metadata
$({ target: 'Reflect', stat: true }, {
  hasOwnMetadata: function hasOwnMetadata(metadataKey, target /* , targetKey */) {
    var targetKey = arguments.length < 3 ? undefined : toMetadataKey(arguments[2]);
    return ordinaryHasOwnMetadata(metadataKey, anObject(target), targetKey);
  }
});


/***/ }),
/* 321 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var ReflectMetadataModule = __webpack_require__(313);
var anObject = __webpack_require__(45);

var toMetadataKey = ReflectMetadataModule.toKey;
var ordinaryDefineOwnMetadata = ReflectMetadataModule.set;

// `Reflect.metadata` method
// https://github.com/rbuckton/reflect-metadata
$({ target: 'Reflect', stat: true }, {
  metadata: function metadata(metadataKey, metadataValue) {
    return function decorator(target, key) {
      ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), toMetadataKey(key));
    };
  }
});


/***/ }),
/* 322 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var uncurryThis = __webpack_require__(13);
var aString = __webpack_require__(323);
var hasOwn = __webpack_require__(37);
var padStart = __webpack_require__(324).start;
var WHITESPACES = __webpack_require__(326);

var $Array = Array;
var $escape = RegExp.escape;
var charAt = uncurryThis(''.charAt);
var charCodeAt = uncurryThis(''.charCodeAt);
var numberToString = uncurryThis(1.1.toString);
var join = uncurryThis([].join);
var FIRST_DIGIT_OR_ASCII = /^[0-9a-z]/i;
var SYNTAX_SOLIDUS = /^[$()*+./?[\\\]^{|}]/;
var OTHER_PUNCTUATORS_AND_WHITESPACES = RegExp('^[!"#%&\',\\-:;<=>@`~' + WHITESPACES + ']');
var exec = uncurryThis(FIRST_DIGIT_OR_ASCII.exec);

var ControlEscape = {
  '\u0009': 't',
  '\u000A': 'n',
  '\u000B': 'v',
  '\u000C': 'f',
  '\u000D': 'r'
};

var escapeChar = function (chr) {
  var hex = numberToString(charCodeAt(chr, 0), 16);
  return hex.length < 3 ? '\\x' + padStart(hex, 2, '0') : '\\u' + padStart(hex, 4, '0');
};

// Avoiding the use of polyfills of the previous iteration of this proposal
var FORCED = !$escape || $escape('ab') !== '\\x61b';

// `RegExp.escape` method
// https://github.com/tc39/proposal-regex-escaping
$({ target: 'RegExp', stat: true, forced: FORCED }, {
  escape: function escape(S) {
    aString(S);
    var length = S.length;
    var result = $Array(length);

    for (var i = 0; i < length; i++) {
      var chr = charAt(S, i);
      if (i === 0 && exec(FIRST_DIGIT_OR_ASCII, chr)) {
        result[i] = escapeChar(chr);
      } else if (hasOwn(ControlEscape, chr)) {
        result[i] = '\\' + ControlEscape[chr];
      } else if (exec(SYNTAX_SOLIDUS, chr)) {
        result[i] = '\\' + chr;
      } else if (exec(OTHER_PUNCTUATORS_AND_WHITESPACES, chr)) {
        result[i] = escapeChar(chr);
      } else {
        var charCode = charCodeAt(chr, 0);
        // single UTF-16 code unit
        if ((charCode & 0xF800) !== 0xD800) result[i] = chr;
        // unpaired surrogate
        else if (charCode >= 0xDC00 || i + 1 >= length || (charCodeAt(S, i + 1) & 0xFC00) !== 0xDC00) result[i] = escapeChar(chr);
        // surrogate pair
        else {
          result[i] = chr;
          result[++i] = charAt(S, i);
        }
      }
    }

    return join(result, '');
  }
});


/***/ }),
/* 323 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $TypeError = TypeError;

module.exports = function (argument) {
  if (typeof argument == 'string') return argument;
  throw new $TypeError('Argument is not a string');
};


/***/ }),
/* 324 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var uncurryThis = __webpack_require__(13);
var toLength = __webpack_require__(63);
var toString = __webpack_require__(123);
var $repeat = __webpack_require__(325);
var requireObjectCoercible = __webpack_require__(15);

var repeat = uncurryThis($repeat);
var stringSlice = uncurryThis(''.slice);
var ceil = Math.ceil;

// `String.prototype.{ padStart, padEnd }` methods implementation
var createMethod = function (IS_END) {
  return function ($this, maxLength, fillString) {
    var S = toString(requireObjectCoercible($this));
    var intMaxLength = toLength(maxLength);
    var stringLength = S.length;
    var fillStr = fillString === undefined ? ' ' : toString(fillString);
    var fillLen, stringFiller;
    if (intMaxLength <= stringLength || fillStr === '') return S;
    fillLen = intMaxLength - stringLength;
    stringFiller = repeat(fillStr, ceil(fillLen / fillStr.length));
    if (stringFiller.length > fillLen) stringFiller = stringSlice(stringFiller, 0, fillLen);
    return IS_END ? S + stringFiller : stringFiller + S;
  };
};

module.exports = {
  // `String.prototype.padStart` method
  // https://tc39.es/ecma262/#sec-string.prototype.padstart
  start: createMethod(false),
  // `String.prototype.padEnd` method
  // https://tc39.es/ecma262/#sec-string.prototype.padend
  end: createMethod(true)
};


/***/ }),
/* 325 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toIntegerOrInfinity = __webpack_require__(60);
var toString = __webpack_require__(123);
var requireObjectCoercible = __webpack_require__(15);

var $RangeError = RangeError;

// `String.prototype.repeat` method implementation
// https://tc39.es/ecma262/#sec-string.prototype.repeat
module.exports = function repeat(count) {
  var str = toString(requireObjectCoercible(this));
  var result = '';
  var n = toIntegerOrInfinity(count);
  if (n < 0 || n === Infinity) throw new $RangeError('Wrong number of repetitions');
  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) result += str;
  return result;
};


/***/ }),
/* 326 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// a string of all valid unicode whitespaces
module.exports = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002' +
  '\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ }),
/* 327 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var aSet = __webpack_require__(87);
var add = __webpack_require__(88).add;

// `Set.prototype.addAll` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Set', proto: true, real: true, forced: true }, {
  addAll: function addAll(/* ...elements */) {
    var set = aSet(this);
    for (var k = 0, len = arguments.length; k < len; k++) {
      add(set, arguments[k]);
    } return set;
  }
});


/***/ }),
/* 328 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var aSet = __webpack_require__(87);
var remove = __webpack_require__(88).remove;

// `Set.prototype.deleteAll` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Set', proto: true, real: true, forced: true }, {
  deleteAll: function deleteAll(/* ...elements */) {
    var collection = aSet(this);
    var allDeleted = true;
    var wasDeleted;
    for (var k = 0, len = arguments.length; k < len; k++) {
      wasDeleted = remove(collection, arguments[k]);
      allDeleted = allDeleted && wasDeleted;
    } return !!allDeleted;
  }
});


/***/ }),
/* 329 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var call = __webpack_require__(7);
var toSetLike = __webpack_require__(330);
var $difference = __webpack_require__(86);

// `Set.prototype.difference` method
// https://github.com/tc39/proposal-set-methods
// TODO: Obsolete version, remove from `core-js@4`
$({ target: 'Set', proto: true, real: true, forced: true }, {
  difference: function difference(other) {
    return call($difference, this, toSetLike(other));
  }
});


/***/ }),
/* 330 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var getBuiltIn = __webpack_require__(22);
var isCallable = __webpack_require__(20);
var isIterable = __webpack_require__(331);
var isObject = __webpack_require__(19);

var Set = getBuiltIn('Set');

var isSetLike = function (it) {
  return isObject(it)
    && typeof it.size == 'number'
    && isCallable(it.has)
    && isCallable(it.keys);
};

// fallback old -> new set methods proposal arguments
module.exports = function (it) {
  if (isSetLike(it)) return it;
  return isIterable(it) ? new Set(it) : it;
};


/***/ }),
/* 331 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var classof = __webpack_require__(78);
var hasOwn = __webpack_require__(37);
var isNullOrUndefined = __webpack_require__(16);
var wellKnownSymbol = __webpack_require__(32);
var Iterators = __webpack_require__(75);

var ITERATOR = wellKnownSymbol('iterator');
var $Object = Object;

module.exports = function (it) {
  if (isNullOrUndefined(it)) return false;
  var O = $Object(it);
  return O[ITERATOR] !== undefined
    || '@@iterator' in O
    || hasOwn(Iterators, classof(O));
};


/***/ }),
/* 332 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var bind = __webpack_require__(72);
var aSet = __webpack_require__(87);
var iterate = __webpack_require__(90);

// `Set.prototype.every` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Set', proto: true, real: true, forced: true }, {
  every: function every(callbackfn /* , thisArg */) {
    var set = aSet(this);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    return iterate(set, function (value) {
      if (!boundFunction(value, value, set)) return false;
    }, true) !== false;
  }
});


/***/ }),
/* 333 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var bind = __webpack_require__(72);
var aSet = __webpack_require__(87);
var SetHelpers = __webpack_require__(88);
var iterate = __webpack_require__(90);

var Set = SetHelpers.Set;
var add = SetHelpers.add;

// `Set.prototype.filter` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Set', proto: true, real: true, forced: true }, {
  filter: function filter(callbackfn /* , thisArg */) {
    var set = aSet(this);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    var newSet = new Set();
    iterate(set, function (value) {
      if (boundFunction(value, value, set)) add(newSet, value);
    });
    return newSet;
  }
});


/***/ }),
/* 334 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var bind = __webpack_require__(72);
var aSet = __webpack_require__(87);
var iterate = __webpack_require__(90);

// `Set.prototype.find` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Set', proto: true, real: true, forced: true }, {
  find: function find(callbackfn /* , thisArg */) {
    var set = aSet(this);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    var result = iterate(set, function (value) {
      if (boundFunction(value, value, set)) return { value: value };
    }, true);
    return result && result.value;
  }
});


/***/ }),
/* 335 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var SetHelpers = __webpack_require__(88);
var createCollectionFrom = __webpack_require__(266);

// `Set.from` method
// https://tc39.github.io/proposal-setmap-offrom/#sec-set.from
$({ target: 'Set', stat: true, forced: true }, {
  from: createCollectionFrom(SetHelpers.Set, SetHelpers.add, false)
});


/***/ }),
/* 336 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var call = __webpack_require__(7);
var toSetLike = __webpack_require__(330);
var $intersection = __webpack_require__(98);

// `Set.prototype.intersection` method
// https://github.com/tc39/proposal-set-methods
// TODO: Obsolete version, remove from `core-js@4`
$({ target: 'Set', proto: true, real: true, forced: true }, {
  intersection: function intersection(other) {
    return call($intersection, this, toSetLike(other));
  }
});


/***/ }),
/* 337 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var call = __webpack_require__(7);
var toSetLike = __webpack_require__(330);
var $isDisjointFrom = __webpack_require__(100);

// `Set.prototype.isDisjointFrom` method
// https://github.com/tc39/proposal-set-methods
// TODO: Obsolete version, remove from `core-js@4`
$({ target: 'Set', proto: true, real: true, forced: true }, {
  isDisjointFrom: function isDisjointFrom(other) {
    return call($isDisjointFrom, this, toSetLike(other));
  }
});


/***/ }),
/* 338 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var call = __webpack_require__(7);
var toSetLike = __webpack_require__(330);
var $isSubsetOf = __webpack_require__(102);

// `Set.prototype.isSubsetOf` method
// https://github.com/tc39/proposal-set-methods
// TODO: Obsolete version, remove from `core-js@4`
$({ target: 'Set', proto: true, real: true, forced: true }, {
  isSubsetOf: function isSubsetOf(other) {
    return call($isSubsetOf, this, toSetLike(other));
  }
});


/***/ }),
/* 339 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var call = __webpack_require__(7);
var toSetLike = __webpack_require__(330);
var $isSupersetOf = __webpack_require__(104);

// `Set.prototype.isSupersetOf` method
// https://github.com/tc39/proposal-set-methods
// TODO: Obsolete version, remove from `core-js@4`
$({ target: 'Set', proto: true, real: true, forced: true }, {
  isSupersetOf: function isSupersetOf(other) {
    return call($isSupersetOf, this, toSetLike(other));
  }
});


/***/ }),
/* 340 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var uncurryThis = __webpack_require__(13);
var aSet = __webpack_require__(87);
var iterate = __webpack_require__(90);
var toString = __webpack_require__(123);

var arrayJoin = uncurryThis([].join);
var push = uncurryThis([].push);

// `Set.prototype.join` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Set', proto: true, real: true, forced: true }, {
  join: function join(separator) {
    var set = aSet(this);
    var sep = separator === undefined ? ',' : toString(separator);
    var array = [];
    iterate(set, function (value) {
      push(array, value);
    });
    return arrayJoin(array, sep);
  }
});


/***/ }),
/* 341 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var bind = __webpack_require__(72);
var aSet = __webpack_require__(87);
var SetHelpers = __webpack_require__(88);
var iterate = __webpack_require__(90);

var Set = SetHelpers.Set;
var add = SetHelpers.add;

// `Set.prototype.map` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Set', proto: true, real: true, forced: true }, {
  map: function map(callbackfn /* , thisArg */) {
    var set = aSet(this);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    var newSet = new Set();
    iterate(set, function (value) {
      add(newSet, boundFunction(value, value, set));
    });
    return newSet;
  }
});


/***/ }),
/* 342 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var SetHelpers = __webpack_require__(88);
var createCollectionOf = __webpack_require__(275);

// `Set.of` method
// https://tc39.github.io/proposal-setmap-offrom/#sec-set.of
$({ target: 'Set', stat: true, forced: true }, {
  of: createCollectionOf(SetHelpers.Set, SetHelpers.add, false)
});


/***/ }),
/* 343 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var aCallable = __webpack_require__(29);
var aSet = __webpack_require__(87);
var iterate = __webpack_require__(90);

var $TypeError = TypeError;

// `Set.prototype.reduce` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Set', proto: true, real: true, forced: true }, {
  reduce: function reduce(callbackfn /* , initialValue */) {
    var set = aSet(this);
    var noInitial = arguments.length < 2;
    var accumulator = noInitial ? undefined : arguments[1];
    aCallable(callbackfn);
    iterate(set, function (value) {
      if (noInitial) {
        noInitial = false;
        accumulator = value;
      } else {
        accumulator = callbackfn(accumulator, value, value, set);
      }
    });
    if (noInitial) throw new $TypeError('Reduce of empty set with no initial value');
    return accumulator;
  }
});


/***/ }),
/* 344 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var bind = __webpack_require__(72);
var aSet = __webpack_require__(87);
var iterate = __webpack_require__(90);

// `Set.prototype.some` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Set', proto: true, real: true, forced: true }, {
  some: function some(callbackfn /* , thisArg */) {
    var set = aSet(this);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    return iterate(set, function (value) {
      if (boundFunction(value, value, set)) return true;
    }, true) === true;
  }
});


/***/ }),
/* 345 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var call = __webpack_require__(7);
var toSetLike = __webpack_require__(330);
var $symmetricDifference = __webpack_require__(106);

// `Set.prototype.symmetricDifference` method
// https://github.com/tc39/proposal-set-methods
// TODO: Obsolete version, remove from `core-js@4`
$({ target: 'Set', proto: true, real: true, forced: true }, {
  symmetricDifference: function symmetricDifference(other) {
    return call($symmetricDifference, this, toSetLike(other));
  }
});


/***/ }),
/* 346 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var call = __webpack_require__(7);
var toSetLike = __webpack_require__(330);
var $union = __webpack_require__(108);

// `Set.prototype.union` method
// https://github.com/tc39/proposal-set-methods
// TODO: Obsolete version, remove from `core-js@4`
$({ target: 'Set', proto: true, real: true, forced: true }, {
  union: function union(other) {
    return call($union, this, toSetLike(other));
  }
});


/***/ }),
/* 347 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// TODO: Remove from `core-js@4`
var $ = __webpack_require__(2);
var charAt = __webpack_require__(348).charAt;
var requireObjectCoercible = __webpack_require__(15);
var toIntegerOrInfinity = __webpack_require__(60);
var toString = __webpack_require__(123);

// `String.prototype.at` method
// https://github.com/mathiasbynens/String.prototype.at
$({ target: 'String', proto: true, forced: true }, {
  at: function at(index) {
    var S = toString(requireObjectCoercible(this));
    var len = S.length;
    var relativeIndex = toIntegerOrInfinity(index);
    var k = relativeIndex >= 0 ? relativeIndex : len + relativeIndex;
    return (k < 0 || k >= len) ? undefined : charAt(S, k);
  }
});


/***/ }),
/* 348 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var uncurryThis = __webpack_require__(13);
var toIntegerOrInfinity = __webpack_require__(60);
var toString = __webpack_require__(123);
var requireObjectCoercible = __webpack_require__(15);

var charAt = uncurryThis(''.charAt);
var charCodeAt = uncurryThis(''.charCodeAt);
var stringSlice = uncurryThis(''.slice);

var createMethod = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = toString(requireObjectCoercible($this));
    var position = toIntegerOrInfinity(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = charCodeAt(S, position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size
      || (second = charCodeAt(S, position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING
          ? charAt(S, position)
          : first
        : CONVERT_TO_STRING
          ? stringSlice(S, position, position + 2)
          : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

module.exports = {
  // `String.prototype.codePointAt` method
  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod(true)
};


/***/ }),
/* 349 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var cooked = __webpack_require__(350);

// `String.cooked` method
// https://github.com/tc39/proposal-string-cooked
$({ target: 'String', stat: true, forced: true }, {
  cooked: cooked
});


/***/ }),
/* 350 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var uncurryThis = __webpack_require__(13);
var toIndexedObject = __webpack_require__(11);
var toString = __webpack_require__(123);
var lengthOfArrayLike = __webpack_require__(62);

var $TypeError = TypeError;
var push = uncurryThis([].push);
var join = uncurryThis([].join);

// `String.cooked` method
// https://tc39.es/proposal-string-cooked/
module.exports = function cooked(template /* , ...substitutions */) {
  var cookedTemplate = toIndexedObject(template);
  var literalSegments = lengthOfArrayLike(cookedTemplate);
  if (!literalSegments) return '';
  var argumentsLength = arguments.length;
  var elements = [];
  var i = 0;
  while (true) {
    var nextVal = cookedTemplate[i++];
    if (nextVal === undefined) throw new $TypeError('Incorrect template');
    push(elements, toString(nextVal));
    if (i === literalSegments) return join(elements, '');
    if (i < argumentsLength) push(elements, toString(arguments[i]));
  }
};


/***/ }),
/* 351 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var createIteratorConstructor = __webpack_require__(185);
var createIterResultObject = __webpack_require__(131);
var requireObjectCoercible = __webpack_require__(15);
var toString = __webpack_require__(123);
var InternalStateModule = __webpack_require__(50);
var StringMultibyteModule = __webpack_require__(348);

var codeAt = StringMultibyteModule.codeAt;
var charAt = StringMultibyteModule.charAt;
var STRING_ITERATOR = 'String Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR);

// TODO: unify with String#@@iterator
var $StringIterator = createIteratorConstructor(function StringIterator(string) {
  setInternalState(this, {
    type: STRING_ITERATOR,
    string: string,
    index: 0
  });
}, 'String', function next() {
  var state = getInternalState(this);
  var string = state.string;
  var index = state.index;
  var point;
  if (index >= string.length) return createIterResultObject(undefined, true);
  point = charAt(string, index);
  state.index += point.length;
  return createIterResultObject({ codePoint: codeAt(point, 0), position: index }, false);
});

// `String.prototype.codePoints` method
// https://github.com/tc39/proposal-string-prototype-codepoints
$({ target: 'String', proto: true, forced: true }, {
  codePoints: function codePoints() {
    return new $StringIterator(toString(requireObjectCoercible(this)));
  }
});


/***/ }),
/* 352 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var FREEZING = __webpack_require__(199);
var $ = __webpack_require__(2);
var makeBuiltIn = __webpack_require__(47);
var uncurryThis = __webpack_require__(13);
var apply = __webpack_require__(189);
var anObject = __webpack_require__(45);
var toObject = __webpack_require__(38);
var isCallable = __webpack_require__(20);
var lengthOfArrayLike = __webpack_require__(62);
var defineProperty = __webpack_require__(43).f;
var createArrayFromList = __webpack_require__(196);
var WeakMapHelpers = __webpack_require__(353);
var cooked = __webpack_require__(350);
var parse = __webpack_require__(354);
var whitespaces = __webpack_require__(326);

var DedentMap = new WeakMapHelpers.WeakMap();
var weakMapGet = WeakMapHelpers.get;
var weakMapHas = WeakMapHelpers.has;
var weakMapSet = WeakMapHelpers.set;

var $Array = Array;
var $TypeError = TypeError;
// eslint-disable-next-line es/no-object-freeze -- safe
var freeze = Object.freeze || Object;
// eslint-disable-next-line es/no-object-isfrozen -- safe
var isFrozen = Object.isFrozen;
var min = Math.min;
var charAt = uncurryThis(''.charAt);
var stringSlice = uncurryThis(''.slice);
var split = uncurryThis(''.split);
var exec = uncurryThis(/./.exec);

var NEW_LINE = /([\n\u2028\u2029]|\r\n?)/g;
var LEADING_WHITESPACE = RegExp('^[' + whitespaces + ']*');
var NON_WHITESPACE = RegExp('[^' + whitespaces + ']');
var INVALID_TAG = 'Invalid tag';
var INVALID_OPENING_LINE = 'Invalid opening line';
var INVALID_CLOSING_LINE = 'Invalid closing line';

var dedentTemplateStringsArray = function (template) {
  var rawInput = template.raw;
  // https://github.com/tc39/proposal-string-dedent/issues/75
  if (FREEZING && !isFrozen(rawInput)) throw new $TypeError('Raw template should be frozen');
  if (weakMapHas(DedentMap, rawInput)) return weakMapGet(DedentMap, rawInput);
  var raw = dedentStringsArray(rawInput);
  var cookedArr = cookStrings(raw);
  defineProperty(cookedArr, 'raw', {
    value: freeze(raw)
  });
  freeze(cookedArr);
  weakMapSet(DedentMap, rawInput, cookedArr);
  return cookedArr;
};

var dedentStringsArray = function (template) {
  var t = toObject(template);
  var length = lengthOfArrayLike(t);
  var blocks = $Array(length);
  var dedented = $Array(length);
  var i = 0;
  var lines, common, quasi, k;

  if (!length) throw new $TypeError(INVALID_TAG);

  for (; i < length; i++) {
    var element = t[i];
    if (typeof element == 'string') blocks[i] = split(element, NEW_LINE);
    else throw new $TypeError(INVALID_TAG);
  }

  for (i = 0; i < length; i++) {
    var lastSplit = i + 1 === length;
    lines = blocks[i];
    if (i === 0) {
      if (lines.length === 1 || lines[0].length > 0) {
        throw new $TypeError(INVALID_OPENING_LINE);
      }
      lines[1] = '';
    }
    if (lastSplit) {
      if (lines.length === 1 || exec(NON_WHITESPACE, lines[lines.length - 1])) {
        throw new $TypeError(INVALID_CLOSING_LINE);
      }
      lines[lines.length - 2] = '';
      lines[lines.length - 1] = '';
    }
    for (var j = 2; j < lines.length; j += 2) {
      var text = lines[j];
      var lineContainsTemplateExpression = j + 1 === lines.length && !lastSplit;
      var leading = exec(LEADING_WHITESPACE, text)[0];
      if (!lineContainsTemplateExpression && leading.length === text.length) {
        lines[j] = '';
        continue;
      }
      common = commonLeadingIndentation(leading, common);
    }
  }

  var count = common ? common.length : 0;

  for (i = 0; i < length; i++) {
    lines = blocks[i];
    quasi = lines[0];
    k = 1;
    for (; k < lines.length; k += 2) {
      quasi += lines[k] + stringSlice(lines[k + 1], count);
    }
    dedented[i] = quasi;
  }

  return dedented;
};

var commonLeadingIndentation = function (a, b) {
  if (b === undefined || a === b) return a;
  var i = 0;
  for (var len = min(a.length, b.length); i < len; i++) {
    if (charAt(a, i) !== charAt(b, i)) break;
  }
  return stringSlice(a, 0, i);
};

var cookStrings = function (raw) {
  var i = 0;
  var length = raw.length;
  var result = $Array(length);
  for (; i < length; i++) {
    result[i] = parse(raw[i]);
  } return result;
};

var makeDedentTag = function (tag) {
  return makeBuiltIn(function (template /* , ...substitutions */) {
    var args = createArrayFromList(arguments);
    args[0] = dedentTemplateStringsArray(anObject(template));
    return apply(tag, this, args);
  }, '');
};

var cookedDedentTag = makeDedentTag(cooked);

// `String.dedent` method
// https://github.com/tc39/proposal-string-dedent
$({ target: 'String', stat: true, forced: true }, {
  dedent: function dedent(templateOrFn /* , ...substitutions */) {
    anObject(templateOrFn);
    if (isCallable(templateOrFn)) return makeDedentTag(templateOrFn);
    return apply(cookedDedentTag, this, arguments);
  }
});


/***/ }),
/* 353 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var uncurryThis = __webpack_require__(13);

// eslint-disable-next-line es/no-weak-map -- safe
var WeakMapPrototype = WeakMap.prototype;

module.exports = {
  // eslint-disable-next-line es/no-weak-map -- safe
  WeakMap: WeakMap,
  set: uncurryThis(WeakMapPrototype.set),
  get: uncurryThis(WeakMapPrototype.get),
  has: uncurryThis(WeakMapPrototype.has),
  remove: uncurryThis(WeakMapPrototype['delete'])
};


/***/ }),
/* 354 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// adapted from https://github.com/jridgewell/string-dedent
var getBuiltIn = __webpack_require__(22);
var uncurryThis = __webpack_require__(13);

var fromCharCode = String.fromCharCode;
var fromCodePoint = getBuiltIn('String', 'fromCodePoint');
var charAt = uncurryThis(''.charAt);
var charCodeAt = uncurryThis(''.charCodeAt);
var stringIndexOf = uncurryThis(''.indexOf);
var stringSlice = uncurryThis(''.slice);

var ZERO_CODE = 48;
var NINE_CODE = 57;
var LOWER_A_CODE = 97;
var LOWER_F_CODE = 102;
var UPPER_A_CODE = 65;
var UPPER_F_CODE = 70;

var isDigit = function (str, index) {
  var c = charCodeAt(str, index);
  return c >= ZERO_CODE && c <= NINE_CODE;
};

var parseHex = function (str, index, end) {
  if (end >= str.length) return -1;
  var n = 0;
  for (; index < end; index++) {
    var c = hexToInt(charCodeAt(str, index));
    if (c === -1) return -1;
    n = n * 16 + c;
  }
  return n;
};

var hexToInt = function (c) {
  if (c >= ZERO_CODE && c <= NINE_CODE) return c - ZERO_CODE;
  if (c >= LOWER_A_CODE && c <= LOWER_F_CODE) return c - LOWER_A_CODE + 10;
  if (c >= UPPER_A_CODE && c <= UPPER_F_CODE) return c - UPPER_A_CODE + 10;
  return -1;
};

module.exports = function (raw) {
  var out = '';
  var start = 0;
  // We need to find every backslash escape sequence, and cook the escape into a real char.
  var i = 0;
  var n;
  while ((i = stringIndexOf(raw, '\\', i)) > -1) {
    out += stringSlice(raw, start, i);
    // If the backslash is the last char of the string, then it was an invalid sequence.
    // This can't actually happen in a tagged template literal, but could happen if you manually
    // invoked the tag with an array.
    if (++i === raw.length) return;
    var next = charAt(raw, i++);
    switch (next) {
      // Escaped control codes need to be individually processed.
      case 'b':
        out += '\b';
        break;
      case 't':
        out += '\t';
        break;
      case 'n':
        out += '\n';
        break;
      case 'v':
        out += '\v';
        break;
      case 'f':
        out += '\f';
        break;
      case 'r':
        out += '\r';
        break;
      // Escaped line terminators just skip the char.
      case '\r':
        // Treat `\r\n` as a single terminator.
        if (i < raw.length && charAt(raw, i) === '\n') ++i;
      // break omitted
      case '\n':
      case '\u2028':
      case '\u2029':
        break;
      // `\0` is a null control char, but `\0` followed by another digit is an illegal octal escape.
      case '0':
        if (isDigit(raw, i)) return;
        out += '\0';
        break;
      // Hex escapes must contain 2 hex chars.
      case 'x':
        n = parseHex(raw, i, i + 2);
        if (n === -1) return;
        i += 2;
        out += fromCharCode(n);
        break;
      // Unicode escapes contain either 4 chars, or an unlimited number between `{` and `}`.
      // The hex value must not overflow 0x10FFFF.
      case 'u':
        if (i < raw.length && charAt(raw, i) === '{') {
          var end = stringIndexOf(raw, '}', ++i);
          if (end === -1) return;
          n = parseHex(raw, i, end);
          i = end + 1;
        } else {
          n = parseHex(raw, i, i + 4);
          i += 4;
        }
        if (n === -1 || n > 0x10FFFF) return;
        out += fromCodePoint(n);
        break;
      default:
        if (isDigit(next, 0)) return;
        out += next;
    }
    start = i;
  }
  return out + stringSlice(raw, start);
};


/***/ }),
/* 355 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var globalThis = __webpack_require__(3);
var defineWellKnownSymbol = __webpack_require__(356);
var defineProperty = __webpack_require__(43).f;
var getOwnPropertyDescriptor = __webpack_require__(4).f;

var Symbol = globalThis.Symbol;

// `Symbol.asyncDispose` well-known symbol
// https://github.com/tc39/proposal-async-explicit-resource-management
defineWellKnownSymbol('asyncDispose');

if (Symbol) {
  var descriptor = getOwnPropertyDescriptor(Symbol, 'asyncDispose');
  // workaround of NodeJS 20.4 bug
  // https://github.com/nodejs/node/issues/48699
  // and incorrect descriptor from some transpilers and userland helpers
  if (descriptor.enumerable && descriptor.configurable && descriptor.writable) {
    defineProperty(Symbol, 'asyncDispose', { value: descriptor.value, enumerable: false, configurable: false, writable: false });
  }
}


/***/ }),
/* 356 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var path = __webpack_require__(357);
var hasOwn = __webpack_require__(37);
var wrappedWellKnownSymbolModule = __webpack_require__(358);
var defineProperty = __webpack_require__(43).f;

module.exports = function (NAME) {
  var Symbol = path.Symbol || (path.Symbol = {});
  if (!hasOwn(Symbol, NAME)) defineProperty(Symbol, NAME, {
    value: wrappedWellKnownSymbolModule.f(NAME)
  });
};


/***/ }),
/* 357 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var globalThis = __webpack_require__(3);

module.exports = globalThis;


/***/ }),
/* 358 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var wellKnownSymbol = __webpack_require__(32);

exports.f = wellKnownSymbol;


/***/ }),
/* 359 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var defineWellKnownSymbol = __webpack_require__(356);

// `Symbol.customMatcher` well-known symbol
// https://github.com/tc39/proposal-pattern-matching
defineWellKnownSymbol('customMatcher');


/***/ }),
/* 360 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var globalThis = __webpack_require__(3);
var defineWellKnownSymbol = __webpack_require__(356);
var defineProperty = __webpack_require__(43).f;
var getOwnPropertyDescriptor = __webpack_require__(4).f;

var Symbol = globalThis.Symbol;

// `Symbol.dispose` well-known symbol
// https://github.com/tc39/proposal-explicit-resource-management
defineWellKnownSymbol('dispose');

if (Symbol) {
  var descriptor = getOwnPropertyDescriptor(Symbol, 'dispose');
  // workaround of NodeJS 20.4 bug
  // https://github.com/nodejs/node/issues/48699
  // and incorrect descriptor from some transpilers and userland helpers
  if (descriptor.enumerable && descriptor.configurable && descriptor.writable) {
    defineProperty(Symbol, 'dispose', { value: descriptor.value, enumerable: false, configurable: false, writable: false });
  }
}


/***/ }),
/* 361 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var isRegisteredSymbol = __webpack_require__(362);

// `Symbol.isRegisteredSymbol` method
// https://tc39.es/proposal-symbol-predicates/#sec-symbol-isregisteredsymbol
$({ target: 'Symbol', stat: true }, {
  isRegisteredSymbol: isRegisteredSymbol
});


/***/ }),
/* 362 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var getBuiltIn = __webpack_require__(22);
var uncurryThis = __webpack_require__(13);

var Symbol = getBuiltIn('Symbol');
var keyFor = Symbol.keyFor;
var thisSymbolValue = uncurryThis(Symbol.prototype.valueOf);

// `Symbol.isRegisteredSymbol` method
// https://tc39.es/proposal-symbol-predicates/#sec-symbol-isregisteredsymbol
module.exports = Symbol.isRegisteredSymbol || function isRegisteredSymbol(value) {
  try {
    return keyFor(thisSymbolValue(value)) !== undefined;
  } catch (error) {
    return false;
  }
};


/***/ }),
/* 363 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var isRegisteredSymbol = __webpack_require__(362);

// `Symbol.isRegistered` method
// obsolete version of https://tc39.es/proposal-symbol-predicates/#sec-symbol-isregisteredsymbol
$({ target: 'Symbol', stat: true, name: 'isRegisteredSymbol' }, {
  isRegistered: isRegisteredSymbol
});


/***/ }),
/* 364 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var isWellKnownSymbol = __webpack_require__(365);

// `Symbol.isWellKnownSymbol` method
// https://tc39.es/proposal-symbol-predicates/#sec-symbol-iswellknownsymbol
// We should patch it for newly added well-known symbols. If it's not required, this module just will not be injected
$({ target: 'Symbol', stat: true, forced: true }, {
  isWellKnownSymbol: isWellKnownSymbol
});


/***/ }),
/* 365 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var shared = __webpack_require__(33);
var getBuiltIn = __webpack_require__(22);
var uncurryThis = __webpack_require__(13);
var isSymbol = __webpack_require__(21);
var wellKnownSymbol = __webpack_require__(32);

var Symbol = getBuiltIn('Symbol');
var $isWellKnownSymbol = Symbol.isWellKnownSymbol;
var getOwnPropertyNames = getBuiltIn('Object', 'getOwnPropertyNames');
var thisSymbolValue = uncurryThis(Symbol.prototype.valueOf);
var WellKnownSymbolsStore = shared('wks');

for (var i = 0, symbolKeys = getOwnPropertyNames(Symbol), symbolKeysLength = symbolKeys.length; i < symbolKeysLength; i++) {
  // some old engines throws on access to some keys like `arguments` or `caller`
  try {
    var symbolKey = symbolKeys[i];
    if (isSymbol(Symbol[symbolKey])) wellKnownSymbol(symbolKey);
  } catch (error) { /* empty */ }
}

// `Symbol.isWellKnownSymbol` method
// https://tc39.es/proposal-symbol-predicates/#sec-symbol-iswellknownsymbol
// We should patch it for newly added well-known symbols. If it's not required, this module just will not be injected
module.exports = function isWellKnownSymbol(value) {
  if ($isWellKnownSymbol && $isWellKnownSymbol(value)) return true;
  try {
    var symbol = thisSymbolValue(value);
    for (var j = 0, keys = getOwnPropertyNames(WellKnownSymbolsStore), keysLength = keys.length; j < keysLength; j++) {
      // eslint-disable-next-line eqeqeq -- polyfilled symbols case
      if (WellKnownSymbolsStore[keys[j]] == symbol) return true;
    }
  } catch (error) { /* empty */ }
  return false;
};


/***/ }),
/* 366 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var isWellKnownSymbol = __webpack_require__(365);

// `Symbol.isWellKnown` method
// obsolete version of https://tc39.es/proposal-symbol-predicates/#sec-symbol-iswellknownsymbol
// We should patch it for newly added well-known symbols. If it's not required, this module just will not be injected
$({ target: 'Symbol', stat: true, name: 'isWellKnownSymbol', forced: true }, {
  isWellKnown: isWellKnownSymbol
});


/***/ }),
/* 367 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var defineWellKnownSymbol = __webpack_require__(356);

// `Symbol.matcher` well-known symbol
// https://github.com/tc39/proposal-pattern-matching
defineWellKnownSymbol('matcher');


/***/ }),
/* 368 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var defineWellKnownSymbol = __webpack_require__(356);

// `Symbol.metadata` well-known symbol
// https://github.com/tc39/proposal-decorators
defineWellKnownSymbol('metadata');


/***/ }),
/* 369 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// TODO: Remove from `core-js@4`
var defineWellKnownSymbol = __webpack_require__(356);

// `Symbol.metadataKey` well-known symbol
// https://github.com/tc39/proposal-decorator-metadata
defineWellKnownSymbol('metadataKey');


/***/ }),
/* 370 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var defineWellKnownSymbol = __webpack_require__(356);

// `Symbol.observable` well-known symbol
// https://github.com/tc39/proposal-observable
defineWellKnownSymbol('observable');


/***/ }),
/* 371 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// TODO: remove from `core-js@4`
var defineWellKnownSymbol = __webpack_require__(356);

// `Symbol.patternMatch` well-known symbol
// https://github.com/tc39/proposal-pattern-matching
defineWellKnownSymbol('patternMatch');


/***/ }),
/* 372 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// TODO: remove from `core-js@4`
var defineWellKnownSymbol = __webpack_require__(356);

defineWellKnownSymbol('replaceAll');


/***/ }),
/* 373 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// TODO: Remove from `core-js@4`
var getBuiltIn = __webpack_require__(22);
var aConstructor = __webpack_require__(374);
var arrayFromAsync = __webpack_require__(125);
var ArrayBufferViewCore = __webpack_require__(375);
var arrayFromConstructorAndList = __webpack_require__(143);

var aTypedArrayConstructor = ArrayBufferViewCore.aTypedArrayConstructor;
var exportTypedArrayStaticMethod = ArrayBufferViewCore.exportTypedArrayStaticMethod;

// `%TypedArray%.fromAsync` method
// https://github.com/tc39/proposal-array-from-async
exportTypedArrayStaticMethod('fromAsync', function fromAsync(asyncItems /* , mapfn = undefined, thisArg = undefined */) {
  var C = this;
  var argumentsLength = arguments.length;
  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
  var thisArg = argumentsLength > 2 ? arguments[2] : undefined;
  return new (getBuiltIn('Promise'))(function (resolve) {
    aConstructor(C);
    resolve(arrayFromAsync(asyncItems, mapfn, thisArg));
  }).then(function (list) {
    return arrayFromConstructorAndList(aTypedArrayConstructor(C), list);
  });
}, true);


/***/ }),
/* 374 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var isConstructor = __webpack_require__(126);
var tryToString = __webpack_require__(30);

var $TypeError = TypeError;

// `Assert: IsConstructor(argument) is true`
module.exports = function (argument) {
  if (isConstructor(argument)) return argument;
  throw new $TypeError(tryToString(argument) + ' is not a constructor');
};


/***/ }),
/* 375 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var NATIVE_ARRAY_BUFFER = __webpack_require__(376);
var DESCRIPTORS = __webpack_require__(5);
var globalThis = __webpack_require__(3);
var isCallable = __webpack_require__(20);
var isObject = __webpack_require__(19);
var hasOwn = __webpack_require__(37);
var classof = __webpack_require__(78);
var tryToString = __webpack_require__(30);
var createNonEnumerableProperty = __webpack_require__(42);
var defineBuiltIn = __webpack_require__(46);
var defineBuiltInAccessor = __webpack_require__(151);
var isPrototypeOf = __webpack_require__(23);
var getPrototypeOf = __webpack_require__(110);
var setPrototypeOf = __webpack_require__(112);
var wellKnownSymbol = __webpack_require__(32);
var uid = __webpack_require__(39);
var InternalStateModule = __webpack_require__(50);

var enforceInternalState = InternalStateModule.enforce;
var getInternalState = InternalStateModule.get;
var Int8Array = globalThis.Int8Array;
var Int8ArrayPrototype = Int8Array && Int8Array.prototype;
var Uint8ClampedArray = globalThis.Uint8ClampedArray;
var Uint8ClampedArrayPrototype = Uint8ClampedArray && Uint8ClampedArray.prototype;
var TypedArray = Int8Array && getPrototypeOf(Int8Array);
var TypedArrayPrototype = Int8ArrayPrototype && getPrototypeOf(Int8ArrayPrototype);
var ObjectPrototype = Object.prototype;
var TypeError = globalThis.TypeError;

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var TYPED_ARRAY_TAG = uid('TYPED_ARRAY_TAG');
var TYPED_ARRAY_CONSTRUCTOR = 'TypedArrayConstructor';
// Fixing native typed arrays in Opera Presto crashes the browser, see #595
var NATIVE_ARRAY_BUFFER_VIEWS = NATIVE_ARRAY_BUFFER && !!setPrototypeOf && classof(globalThis.opera) !== 'Opera';
var TYPED_ARRAY_TAG_REQUIRED = false;
var NAME, Constructor, Prototype;

var TypedArrayConstructorsList = {
  Int8Array: 1,
  Uint8Array: 1,
  Uint8ClampedArray: 1,
  Int16Array: 2,
  Uint16Array: 2,
  Int32Array: 4,
  Uint32Array: 4,
  Float32Array: 4,
  Float64Array: 8
};

var BigIntArrayConstructorsList = {
  BigInt64Array: 8,
  BigUint64Array: 8
};

var isView = function isView(it) {
  if (!isObject(it)) return false;
  var klass = classof(it);
  return klass === 'DataView'
    || hasOwn(TypedArrayConstructorsList, klass)
    || hasOwn(BigIntArrayConstructorsList, klass);
};

var getTypedArrayConstructor = function (it) {
  var proto = getPrototypeOf(it);
  if (!isObject(proto)) return;
  var state = getInternalState(proto);
  return (state && hasOwn(state, TYPED_ARRAY_CONSTRUCTOR)) ? state[TYPED_ARRAY_CONSTRUCTOR] : getTypedArrayConstructor(proto);
};

var isTypedArray = function (it) {
  if (!isObject(it)) return false;
  var klass = classof(it);
  return hasOwn(TypedArrayConstructorsList, klass)
    || hasOwn(BigIntArrayConstructorsList, klass);
};

var aTypedArray = function (it) {
  if (isTypedArray(it)) return it;
  throw new TypeError('Target is not a typed array');
};

var aTypedArrayConstructor = function (C) {
  if (isCallable(C) && (!setPrototypeOf || isPrototypeOf(TypedArray, C))) return C;
  throw new TypeError(tryToString(C) + ' is not a typed array constructor');
};

var exportTypedArrayMethod = function (KEY, property, forced, options) {
  if (!DESCRIPTORS) return;
  if (forced) for (var ARRAY in TypedArrayConstructorsList) {
    var TypedArrayConstructor = globalThis[ARRAY];
    if (TypedArrayConstructor && hasOwn(TypedArrayConstructor.prototype, KEY)) try {
      delete TypedArrayConstructor.prototype[KEY];
    } catch (error) {
      // old WebKit bug - some methods are non-configurable
      try {
        TypedArrayConstructor.prototype[KEY] = property;
      } catch (error2) { /* empty */ }
    }
  }
  if (!TypedArrayPrototype[KEY] || forced) {
    defineBuiltIn(TypedArrayPrototype, KEY, forced ? property
      : NATIVE_ARRAY_BUFFER_VIEWS && Int8ArrayPrototype[KEY] || property, options);
  }
};

var exportTypedArrayStaticMethod = function (KEY, property, forced) {
  var ARRAY, TypedArrayConstructor;
  if (!DESCRIPTORS) return;
  if (setPrototypeOf) {
    if (forced) for (ARRAY in TypedArrayConstructorsList) {
      TypedArrayConstructor = globalThis[ARRAY];
      if (TypedArrayConstructor && hasOwn(TypedArrayConstructor, KEY)) try {
        delete TypedArrayConstructor[KEY];
      } catch (error) { /* empty */ }
    }
    if (!TypedArray[KEY] || forced) {
      // V8 ~ Chrome 49-50 `%TypedArray%` methods are non-writable non-configurable
      try {
        return defineBuiltIn(TypedArray, KEY, forced ? property : NATIVE_ARRAY_BUFFER_VIEWS && TypedArray[KEY] || property);
      } catch (error) { /* empty */ }
    } else return;
  }
  for (ARRAY in TypedArrayConstructorsList) {
    TypedArrayConstructor = globalThis[ARRAY];
    if (TypedArrayConstructor && (!TypedArrayConstructor[KEY] || forced)) {
      defineBuiltIn(TypedArrayConstructor, KEY, property);
    }
  }
};

for (NAME in TypedArrayConstructorsList) {
  Constructor = globalThis[NAME];
  Prototype = Constructor && Constructor.prototype;
  if (Prototype) enforceInternalState(Prototype)[TYPED_ARRAY_CONSTRUCTOR] = Constructor;
  else NATIVE_ARRAY_BUFFER_VIEWS = false;
}

for (NAME in BigIntArrayConstructorsList) {
  Constructor = globalThis[NAME];
  Prototype = Constructor && Constructor.prototype;
  if (Prototype) enforceInternalState(Prototype)[TYPED_ARRAY_CONSTRUCTOR] = Constructor;
}

// WebKit bug - typed arrays constructors prototype is Object.prototype
if (!NATIVE_ARRAY_BUFFER_VIEWS || !isCallable(TypedArray) || TypedArray === Function.prototype) {
  // eslint-disable-next-line no-shadow -- safe
  TypedArray = function TypedArray() {
    throw new TypeError('Incorrect invocation');
  };
  if (NATIVE_ARRAY_BUFFER_VIEWS) for (NAME in TypedArrayConstructorsList) {
    if (globalThis[NAME]) setPrototypeOf(globalThis[NAME], TypedArray);
  }
}

if (!NATIVE_ARRAY_BUFFER_VIEWS || !TypedArrayPrototype || TypedArrayPrototype === ObjectPrototype) {
  TypedArrayPrototype = TypedArray.prototype;
  if (NATIVE_ARRAY_BUFFER_VIEWS) for (NAME in TypedArrayConstructorsList) {
    if (globalThis[NAME]) setPrototypeOf(globalThis[NAME].prototype, TypedArrayPrototype);
  }
}

// WebKit bug - one more object in Uint8ClampedArray prototype chain
if (NATIVE_ARRAY_BUFFER_VIEWS && getPrototypeOf(Uint8ClampedArrayPrototype) !== TypedArrayPrototype) {
  setPrototypeOf(Uint8ClampedArrayPrototype, TypedArrayPrototype);
}

if (DESCRIPTORS && !hasOwn(TypedArrayPrototype, TO_STRING_TAG)) {
  TYPED_ARRAY_TAG_REQUIRED = true;
  defineBuiltInAccessor(TypedArrayPrototype, TO_STRING_TAG, {
    configurable: true,
    get: function () {
      return isObject(this) ? this[TYPED_ARRAY_TAG] : undefined;
    }
  });
  for (NAME in TypedArrayConstructorsList) if (globalThis[NAME]) {
    createNonEnumerableProperty(globalThis[NAME], TYPED_ARRAY_TAG, NAME);
  }
}

module.exports = {
  NATIVE_ARRAY_BUFFER_VIEWS: NATIVE_ARRAY_BUFFER_VIEWS,
  TYPED_ARRAY_TAG: TYPED_ARRAY_TAG_REQUIRED && TYPED_ARRAY_TAG,
  aTypedArray: aTypedArray,
  aTypedArrayConstructor: aTypedArrayConstructor,
  exportTypedArrayMethod: exportTypedArrayMethod,
  exportTypedArrayStaticMethod: exportTypedArrayStaticMethod,
  getTypedArrayConstructor: getTypedArrayConstructor,
  isView: isView,
  isTypedArray: isTypedArray,
  TypedArray: TypedArray,
  TypedArrayPrototype: TypedArrayPrototype
};


/***/ }),
/* 376 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// eslint-disable-next-line es/no-typed-arrays -- safe
module.exports = typeof ArrayBuffer != 'undefined' && typeof DataView != 'undefined';


/***/ }),
/* 377 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// TODO: Remove from `core-js@4`
var ArrayBufferViewCore = __webpack_require__(375);
var $filterReject = __webpack_require__(136).filterReject;
var fromSpeciesAndList = __webpack_require__(378);

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.filterOut` method
// https://github.com/tc39/proposal-array-filtering
exportTypedArrayMethod('filterOut', function filterOut(callbackfn /* , thisArg */) {
  var list = $filterReject(aTypedArray(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  return fromSpeciesAndList(this, list);
}, true);


/***/ }),
/* 378 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var arrayFromConstructorAndList = __webpack_require__(143);
var typedArraySpeciesConstructor = __webpack_require__(379);

module.exports = function (instance, list) {
  return arrayFromConstructorAndList(typedArraySpeciesConstructor(instance), list);
};


/***/ }),
/* 379 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__(375);
var speciesConstructor = __webpack_require__(380);

var aTypedArrayConstructor = ArrayBufferViewCore.aTypedArrayConstructor;
var getTypedArrayConstructor = ArrayBufferViewCore.getTypedArrayConstructor;

// a part of `TypedArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#typedarray-species-create
module.exports = function (originalArray) {
  return aTypedArrayConstructor(speciesConstructor(originalArray, getTypedArrayConstructor(originalArray)));
};


/***/ }),
/* 380 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var anObject = __webpack_require__(45);
var aConstructor = __webpack_require__(374);
var isNullOrUndefined = __webpack_require__(16);
var wellKnownSymbol = __webpack_require__(32);

var SPECIES = wellKnownSymbol('species');

// `SpeciesConstructor` abstract operation
// https://tc39.es/ecma262/#sec-speciesconstructor
module.exports = function (O, defaultConstructor) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || isNullOrUndefined(S = anObject(C)[SPECIES]) ? defaultConstructor : aConstructor(S);
};


/***/ }),
/* 381 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__(375);
var $filterReject = __webpack_require__(136).filterReject;
var fromSpeciesAndList = __webpack_require__(378);

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.filterReject` method
// https://github.com/tc39/proposal-array-filtering
exportTypedArrayMethod('filterReject', function filterReject(callbackfn /* , thisArg */) {
  var list = $filterReject(aTypedArray(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  return fromSpeciesAndList(this, list);
}, true);


/***/ }),
/* 382 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// TODO: Remove from `core-js@4`
var ArrayBufferViewCore = __webpack_require__(375);
var $group = __webpack_require__(142);
var typedArraySpeciesConstructor = __webpack_require__(379);

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.groupBy` method
// https://github.com/tc39/proposal-array-grouping
exportTypedArrayMethod('groupBy', function groupBy(callbackfn /* , thisArg */) {
  var thisArg = arguments.length > 1 ? arguments[1] : undefined;
  return $group(aTypedArray(this), callbackfn, thisArg, typedArraySpeciesConstructor);
}, true);


/***/ }),
/* 383 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// TODO: Remove from `core-js@4`
var ArrayBufferViewCore = __webpack_require__(375);
var lengthOfArrayLike = __webpack_require__(62);
var isBigIntArray = __webpack_require__(384);
var toAbsoluteIndex = __webpack_require__(59);
var toBigInt = __webpack_require__(385);
var toIntegerOrInfinity = __webpack_require__(60);
var fails = __webpack_require__(6);

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var getTypedArrayConstructor = ArrayBufferViewCore.getTypedArrayConstructor;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
var max = Math.max;
var min = Math.min;

// some early implementations, like WebKit, does not follow the final semantic
var PROPER_ORDER = !fails(function () {
  // eslint-disable-next-line es/no-typed-arrays -- required for testing
  var array = new Int8Array([1]);

  var spliced = array.toSpliced(1, 0, {
    valueOf: function () {
      array[0] = 2;
      return 3;
    }
  });

  return spliced[0] !== 2 || spliced[1] !== 3;
});

// `%TypedArray%.prototype.toSpliced` method
// https://tc39.es/proposal-change-array-by-copy/#sec-%typedarray%.prototype.toSpliced
exportTypedArrayMethod('toSpliced', function toSpliced(start, deleteCount /* , ...items */) {
  var O = aTypedArray(this);
  var C = getTypedArrayConstructor(O);
  var len = lengthOfArrayLike(O);
  var actualStart = toAbsoluteIndex(start, len);
  var argumentsLength = arguments.length;
  var k = 0;
  var insertCount, actualDeleteCount, thisIsBigIntArray, convertedItems, value, newLen, A;
  if (argumentsLength === 0) {
    insertCount = actualDeleteCount = 0;
  } else if (argumentsLength === 1) {
    insertCount = 0;
    actualDeleteCount = len - actualStart;
  } else {
    actualDeleteCount = min(max(toIntegerOrInfinity(deleteCount), 0), len - actualStart);
    insertCount = argumentsLength - 2;
    if (insertCount) {
      convertedItems = new C(insertCount);
      thisIsBigIntArray = isBigIntArray(convertedItems);
      for (var i = 2; i < argumentsLength; i++) {
        value = arguments[i];
        // FF30- typed arrays doesn't properly convert objects to typed array values
        convertedItems[i - 2] = thisIsBigIntArray ? toBigInt(value) : +value;
      }
    }
  }
  newLen = len + insertCount - actualDeleteCount;
  A = new C(newLen);

  for (; k < actualStart; k++) A[k] = O[k];
  for (; k < actualStart + insertCount; k++) A[k] = convertedItems[k - actualStart];
  for (; k < newLen; k++) A[k] = O[k + actualDeleteCount - insertCount];

  return A;
}, !PROPER_ORDER);


/***/ }),
/* 384 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var classof = __webpack_require__(78);

module.exports = function (it) {
  var klass = classof(it);
  return klass === 'BigInt64Array' || klass === 'BigUint64Array';
};


/***/ }),
/* 385 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toPrimitive = __webpack_require__(18);

var $TypeError = TypeError;

// `ToBigInt` abstract operation
// https://tc39.es/ecma262/#sec-tobigint
module.exports = function (argument) {
  var prim = toPrimitive(argument, 'number');
  if (typeof prim == 'number') throw new $TypeError("Can't convert number to bigint");
  // eslint-disable-next-line es/no-bigint -- safe
  return BigInt(prim);
};


/***/ }),
/* 386 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var uncurryThis = __webpack_require__(13);
var ArrayBufferViewCore = __webpack_require__(375);
var arrayFromConstructorAndList = __webpack_require__(143);
var $arrayUniqueBy = __webpack_require__(154);

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var getTypedArrayConstructor = ArrayBufferViewCore.getTypedArrayConstructor;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
var arrayUniqueBy = uncurryThis($arrayUniqueBy);

// `%TypedArray%.prototype.uniqueBy` method
// https://github.com/tc39/proposal-array-unique
exportTypedArrayMethod('uniqueBy', function uniqueBy(resolver) {
  aTypedArray(this);
  return arrayFromConstructorAndList(getTypedArrayConstructor(this), arrayUniqueBy(this, resolver));
}, true);


/***/ }),
/* 387 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var globalThis = __webpack_require__(3);
var arrayFromConstructorAndList = __webpack_require__(143);
var $fromBase64 = __webpack_require__(388);

var Uint8Array = globalThis.Uint8Array;

// `Uint8Array.fromBase64` method
// https://github.com/tc39/proposal-arraybuffer-base64
if (Uint8Array) $({ target: 'Uint8Array', stat: true }, {
  fromBase64: function fromBase64(string /* , options */) {
    var result = $fromBase64(string, arguments.length > 1 ? arguments[1] : undefined, null, 0x1FFFFFFFFFFFFF);
    return arrayFromConstructorAndList(Uint8Array, result.bytes);
  }
});


/***/ }),
/* 388 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var globalThis = __webpack_require__(3);
var uncurryThis = __webpack_require__(13);
var anObjectOrUndefined = __webpack_require__(389);
var aString = __webpack_require__(323);
var hasOwn = __webpack_require__(37);
var base64Map = __webpack_require__(390);
var getAlphabetOption = __webpack_require__(391);
var notDetached = __webpack_require__(392);

var base64Alphabet = base64Map.c2i;
var base64UrlAlphabet = base64Map.c2iUrl;

var SyntaxError = globalThis.SyntaxError;
var TypeError = globalThis.TypeError;
var at = uncurryThis(''.charAt);

var skipAsciiWhitespace = function (string, index) {
  var length = string.length;
  for (;index < length; index++) {
    var chr = at(string, index);
    if (chr !== ' ' && chr !== '\t' && chr !== '\n' && chr !== '\f' && chr !== '\r') break;
  } return index;
};

var decodeBase64Chunk = function (chunk, alphabet, throwOnExtraBits) {
  var chunkLength = chunk.length;

  if (chunkLength < 4) {
    chunk += chunkLength === 2 ? 'AA' : 'A';
  }

  var triplet = (alphabet[at(chunk, 0)] << 18)
    + (alphabet[at(chunk, 1)] << 12)
    + (alphabet[at(chunk, 2)] << 6)
    + alphabet[at(chunk, 3)];

  var chunkBytes = [
    (triplet >> 16) & 255,
    (triplet >> 8) & 255,
    triplet & 255
  ];

  if (chunkLength === 2) {
    if (throwOnExtraBits && chunkBytes[1] !== 0) {
      throw new SyntaxError('Extra bits');
    }
    return [chunkBytes[0]];
  }

  if (chunkLength === 3) {
    if (throwOnExtraBits && chunkBytes[2] !== 0) {
      throw new SyntaxError('Extra bits');
    }
    return [chunkBytes[0], chunkBytes[1]];
  }

  return chunkBytes;
};

var writeBytes = function (bytes, elements, written) {
  var elementsLength = elements.length;
  for (var index = 0; index < elementsLength; index++) {
    bytes[written + index] = elements[index];
  }
  return written + elementsLength;
};

/* eslint-disable max-statements, max-depth -- TODO */
module.exports = function (string, options, into, maxLength) {
  aString(string);
  anObjectOrUndefined(options);
  var alphabet = getAlphabetOption(options) === 'base64' ? base64Alphabet : base64UrlAlphabet;
  var lastChunkHandling = options ? options.lastChunkHandling : undefined;

  if (lastChunkHandling === undefined) lastChunkHandling = 'loose';

  if (lastChunkHandling !== 'loose' && lastChunkHandling !== 'strict' && lastChunkHandling !== 'stop-before-partial') {
    throw new TypeError('Incorrect `lastChunkHandling` option');
  }

  if (into) notDetached(into.buffer);

  var bytes = into || [];
  var written = 0;
  var read = 0;
  var chunk = '';
  var index = 0;

  if (maxLength) while (true) {
    index = skipAsciiWhitespace(string, index);
    if (index === string.length) {
      if (chunk.length > 0) {
        if (lastChunkHandling === 'stop-before-partial') {
          break;
        }
        if (lastChunkHandling === 'loose') {
          if (chunk.length === 1) {
            throw new SyntaxError('Malformed padding: exactly one additional character');
          }
          written = writeBytes(bytes, decodeBase64Chunk(chunk, alphabet, false), written);
        } else {
          throw new SyntaxError('Missing padding');
        }
      }
      read = string.length;
      break;
    }
    var chr = at(string, index);
    ++index;
    if (chr === '=') {
      if (chunk.length < 2) {
        throw new SyntaxError('Padding is too early');
      }
      index = skipAsciiWhitespace(string, index);
      if (chunk.length === 2) {
        if (index === string.length) {
          if (lastChunkHandling === 'stop-before-partial') {
            break;
          }
          throw new SyntaxError('Malformed padding: only one =');
        }
        if (at(string, index) === '=') {
          ++index;
          index = skipAsciiWhitespace(string, index);
        }
      }
      if (index < string.length) {
        throw new SyntaxError('Unexpected character after padding');
      }
      written = writeBytes(bytes, decodeBase64Chunk(chunk, alphabet, lastChunkHandling === 'strict'), written);
      read = string.length;
      break;
    }
    if (!hasOwn(alphabet, chr)) {
      throw new SyntaxError('Unexpected character');
    }
    var remainingBytes = maxLength - written;
    if (remainingBytes === 1 && chunk.length === 2 || remainingBytes === 2 && chunk.length === 3) {
      // special case: we can fit exactly the number of bytes currently represented by chunk, so we were just checking for `=`
      break;
    }

    chunk += chr;
    if (chunk.length === 4) {
      written = writeBytes(bytes, decodeBase64Chunk(chunk, alphabet, false), written);
      chunk = '';
      read = index;
      if (written === maxLength) {
        break;
      }
    }
  }

  return { bytes: bytes, read: read, written: written };
};


/***/ }),
/* 389 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var isObject = __webpack_require__(19);

var $String = String;
var $TypeError = TypeError;

module.exports = function (argument) {
  if (argument === undefined || isObject(argument)) return argument;
  throw new $TypeError($String(argument) + ' is not an object or undefined');
};


/***/ }),
/* 390 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var commonAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
var base64Alphabet = commonAlphabet + '+/';
var base64UrlAlphabet = commonAlphabet + '-_';

var inverse = function (characters) {
  // TODO: use `Object.create(null)` in `core-js@4`
  var result = {};
  var index = 0;
  for (; index < 64; index++) result[characters.charAt(index)] = index;
  return result;
};

module.exports = {
  i2c: base64Alphabet,
  c2i: inverse(base64Alphabet),
  i2cUrl: base64UrlAlphabet,
  c2iUrl: inverse(base64UrlAlphabet)
};


/***/ }),
/* 391 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $TypeError = TypeError;

module.exports = function (options) {
  var alphabet = options && options.alphabet;
  if (alphabet === undefined || alphabet === 'base64' || alphabet === 'base64url') return alphabet || 'base64';
  throw new $TypeError('Incorrect `alphabet` option');
};


/***/ }),
/* 392 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var isDetached = __webpack_require__(393);

var $TypeError = TypeError;

module.exports = function (it) {
  if (isDetached(it)) throw new $TypeError('ArrayBuffer is detached');
  return it;
};


/***/ }),
/* 393 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var globalThis = __webpack_require__(3);
var uncurryThis = __webpack_require__(73);
var arrayBufferByteLength = __webpack_require__(394);

var ArrayBuffer = globalThis.ArrayBuffer;
var ArrayBufferPrototype = ArrayBuffer && ArrayBuffer.prototype;
var slice = ArrayBufferPrototype && uncurryThis(ArrayBufferPrototype.slice);

module.exports = function (O) {
  if (arrayBufferByteLength(O) !== 0) return false;
  if (!slice) return false;
  try {
    slice(O, 0, 0);
    return false;
  } catch (error) {
    return true;
  }
};


/***/ }),
/* 394 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var globalThis = __webpack_require__(3);
var uncurryThisAccessor = __webpack_require__(93);
var classof = __webpack_require__(14);

var ArrayBuffer = globalThis.ArrayBuffer;
var TypeError = globalThis.TypeError;

// Includes
// - Perform ? RequireInternalSlot(O, [[ArrayBufferData]]).
// - If IsSharedArrayBuffer(O) is true, throw a TypeError exception.
module.exports = ArrayBuffer && uncurryThisAccessor(ArrayBuffer.prototype, 'byteLength', 'get') || function (O) {
  if (classof(O) !== 'ArrayBuffer') throw new TypeError('ArrayBuffer expected');
  return O.byteLength;
};


/***/ }),
/* 395 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var globalThis = __webpack_require__(3);
var aString = __webpack_require__(323);
var $fromHex = __webpack_require__(396);

// `Uint8Array.fromHex` method
// https://github.com/tc39/proposal-arraybuffer-base64
if (globalThis.Uint8Array) $({ target: 'Uint8Array', stat: true }, {
  fromHex: function fromHex(string) {
    return $fromHex(aString(string)).bytes;
  }
});


/***/ }),
/* 396 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var globalThis = __webpack_require__(3);
var uncurryThis = __webpack_require__(13);

var Uint8Array = globalThis.Uint8Array;
var SyntaxError = globalThis.SyntaxError;
var parseInt = globalThis.parseInt;
var min = Math.min;
var NOT_HEX = /[^\da-f]/i;
var exec = uncurryThis(NOT_HEX.exec);
var stringSlice = uncurryThis(''.slice);

module.exports = function (string, into) {
  var stringLength = string.length;
  if (stringLength % 2 !== 0) throw new SyntaxError('String should be an even number of characters');
  var maxLength = into ? min(into.length, stringLength / 2) : stringLength / 2;
  var bytes = into || new Uint8Array(maxLength);
  var read = 0;
  var written = 0;
  while (written < maxLength) {
    var hexits = stringSlice(string, read, read += 2);
    if (exec(NOT_HEX, hexits)) throw new SyntaxError('String should only contain hex characters');
    bytes[written++] = parseInt(hexits, 16);
  }
  return { bytes: bytes, read: read };
};


/***/ }),
/* 397 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var globalThis = __webpack_require__(3);
var $fromBase64 = __webpack_require__(388);
var anUint8Array = __webpack_require__(398);

var Uint8Array = globalThis.Uint8Array;

// `Uint8Array.prototype.setFromBase64` method
// https://github.com/tc39/proposal-arraybuffer-base64
if (Uint8Array) $({ target: 'Uint8Array', proto: true }, {
  setFromBase64: function setFromBase64(string /* , options */) {
    anUint8Array(this);

    var result = $fromBase64(string, arguments.length > 1 ? arguments[1] : undefined, this, this.length);

    return { read: result.read, written: result.written };
  }
});


/***/ }),
/* 398 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var classof = __webpack_require__(78);

var $TypeError = TypeError;

// Perform ? RequireInternalSlot(argument, [[TypedArrayName]])
// If argument.[[TypedArrayName]] is not "Uint8Array", throw a TypeError exception
module.exports = function (argument) {
  if (classof(argument) === 'Uint8Array') return argument;
  throw new $TypeError('Argument is not an Uint8Array');
};


/***/ }),
/* 399 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var globalThis = __webpack_require__(3);
var aString = __webpack_require__(323);
var anUint8Array = __webpack_require__(398);
var notDetached = __webpack_require__(392);
var $fromHex = __webpack_require__(396);

// `Uint8Array.prototype.setFromHex` method
// https://github.com/tc39/proposal-arraybuffer-base64
if (globalThis.Uint8Array) $({ target: 'Uint8Array', proto: true }, {
  setFromHex: function setFromHex(string) {
    anUint8Array(this);
    aString(string);
    notDetached(this.buffer);
    var read = $fromHex(string, this).read;
    return { read: read, written: read / 2 };
  }
});


/***/ }),
/* 400 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var globalThis = __webpack_require__(3);
var uncurryThis = __webpack_require__(13);
var anObjectOrUndefined = __webpack_require__(389);
var anUint8Array = __webpack_require__(398);
var notDetached = __webpack_require__(392);
var base64Map = __webpack_require__(390);
var getAlphabetOption = __webpack_require__(391);

var base64Alphabet = base64Map.i2c;
var base64UrlAlphabet = base64Map.i2cUrl;

var charAt = uncurryThis(''.charAt);

// `Uint8Array.prototype.toBase64` method
// https://github.com/tc39/proposal-arraybuffer-base64
if (globalThis.Uint8Array) $({ target: 'Uint8Array', proto: true }, {
  toBase64: function toBase64(/* options */) {
    var array = anUint8Array(this);
    var options = arguments.length ? anObjectOrUndefined(arguments[0]) : undefined;
    var alphabet = getAlphabetOption(options) === 'base64' ? base64Alphabet : base64UrlAlphabet;
    var omitPadding = !!options && !!options.omitPadding;
    notDetached(this.buffer);

    var result = '';
    var i = 0;
    var length = array.length;
    var triplet;

    var at = function (shift) {
      return charAt(alphabet, (triplet >> (6 * shift)) & 63);
    };

    for (; i + 2 < length; i += 3) {
      triplet = (array[i] << 16) + (array[i + 1] << 8) + array[i + 2];
      result += at(3) + at(2) + at(1) + at(0);
    }
    if (i + 2 === length) {
      triplet = (array[i] << 16) + (array[i + 1] << 8);
      result += at(3) + at(2) + at(1) + (omitPadding ? '' : '=');
    } else if (i + 1 === length) {
      triplet = array[i] << 16;
      result += at(3) + at(2) + (omitPadding ? '' : '==');
    }

    return result;
  }
});


/***/ }),
/* 401 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var globalThis = __webpack_require__(3);
var uncurryThis = __webpack_require__(13);
var anUint8Array = __webpack_require__(398);
var notDetached = __webpack_require__(392);

var numberToString = uncurryThis(1.0.toString);

// `Uint8Array.prototype.toHex` method
// https://github.com/tc39/proposal-arraybuffer-base64
if (globalThis.Uint8Array) $({ target: 'Uint8Array', proto: true }, {
  toHex: function toHex() {
    anUint8Array(this);
    notDetached(this.buffer);
    var result = '';
    for (var i = 0, length = this.length; i < length; i++) {
      var hex = numberToString(this[i], 16);
      result += hex.length === 1 ? '0' + hex : hex;
    }
    return result;
  }
});


/***/ }),
/* 402 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var aWeakMap = __webpack_require__(403);
var remove = __webpack_require__(353).remove;

// `WeakMap.prototype.deleteAll` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'WeakMap', proto: true, real: true, forced: true }, {
  deleteAll: function deleteAll(/* ...elements */) {
    var collection = aWeakMap(this);
    var allDeleted = true;
    var wasDeleted;
    for (var k = 0, len = arguments.length; k < len; k++) {
      wasDeleted = remove(collection, arguments[k]);
      allDeleted = allDeleted && wasDeleted;
    } return !!allDeleted;
  }
});


/***/ }),
/* 403 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var has = __webpack_require__(353).has;

// Perform ? RequireInternalSlot(M, [[WeakMapData]])
module.exports = function (it) {
  has(it);
  return it;
};


/***/ }),
/* 404 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var WeakMapHelpers = __webpack_require__(353);
var createCollectionFrom = __webpack_require__(266);

// `WeakMap.from` method
// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.from
$({ target: 'WeakMap', stat: true, forced: true }, {
  from: createCollectionFrom(WeakMapHelpers.WeakMap, WeakMapHelpers.set, true)
});


/***/ }),
/* 405 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var WeakMapHelpers = __webpack_require__(353);
var createCollectionOf = __webpack_require__(275);

// `WeakMap.of` method
// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.of
$({ target: 'WeakMap', stat: true, forced: true }, {
  of: createCollectionOf(WeakMapHelpers.WeakMap, WeakMapHelpers.set, true)
});


/***/ }),
/* 406 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var aWeakMap = __webpack_require__(403);
var WeakMapHelpers = __webpack_require__(353);

var get = WeakMapHelpers.get;
var has = WeakMapHelpers.has;
var set = WeakMapHelpers.set;

// `WeakMap.prototype.emplace` method
// https://github.com/tc39/proposal-upsert
$({ target: 'WeakMap', proto: true, real: true, forced: true }, {
  emplace: function emplace(key, handler) {
    var map = aWeakMap(this);
    var value, inserted;
    if (has(map, key)) {
      value = get(map, key);
      if ('update' in handler) {
        value = handler.update(value, key, map);
        set(map, key, value);
      } return value;
    }
    inserted = handler.insert(key, map);
    set(map, key, inserted);
    return inserted;
  }
});


/***/ }),
/* 407 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// TODO: remove from `core-js@4`
var $ = __webpack_require__(2);
var upsert = __webpack_require__(280);

// `WeakMap.prototype.upsert` method (replaced by `WeakMap.prototype.emplace`)
// https://github.com/tc39/proposal-upsert
$({ target: 'WeakMap', proto: true, real: true, forced: true }, {
  upsert: upsert
});


/***/ }),
/* 408 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var aWeakSet = __webpack_require__(409);
var add = __webpack_require__(410).add;

// `WeakSet.prototype.addAll` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'WeakSet', proto: true, real: true, forced: true }, {
  addAll: function addAll(/* ...elements */) {
    var set = aWeakSet(this);
    for (var k = 0, len = arguments.length; k < len; k++) {
      add(set, arguments[k]);
    } return set;
  }
});


/***/ }),
/* 409 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var has = __webpack_require__(410).has;

// Perform ? RequireInternalSlot(M, [[WeakSetData]])
module.exports = function (it) {
  has(it);
  return it;
};


/***/ }),
/* 410 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var uncurryThis = __webpack_require__(13);

// eslint-disable-next-line es/no-weak-set -- safe
var WeakSetPrototype = WeakSet.prototype;

module.exports = {
  // eslint-disable-next-line es/no-weak-set -- safe
  WeakSet: WeakSet,
  add: uncurryThis(WeakSetPrototype.add),
  has: uncurryThis(WeakSetPrototype.has),
  remove: uncurryThis(WeakSetPrototype['delete'])
};


/***/ }),
/* 411 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var aWeakSet = __webpack_require__(409);
var remove = __webpack_require__(410).remove;

// `WeakSet.prototype.deleteAll` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'WeakSet', proto: true, real: true, forced: true }, {
  deleteAll: function deleteAll(/* ...elements */) {
    var collection = aWeakSet(this);
    var allDeleted = true;
    var wasDeleted;
    for (var k = 0, len = arguments.length; k < len; k++) {
      wasDeleted = remove(collection, arguments[k]);
      allDeleted = allDeleted && wasDeleted;
    } return !!allDeleted;
  }
});


/***/ }),
/* 412 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var WeakSetHelpers = __webpack_require__(410);
var createCollectionFrom = __webpack_require__(266);

// `WeakSet.from` method
// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.from
$({ target: 'WeakSet', stat: true, forced: true }, {
  from: createCollectionFrom(WeakSetHelpers.WeakSet, WeakSetHelpers.add, false)
});


/***/ }),
/* 413 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var WeakSetHelpers = __webpack_require__(410);
var createCollectionOf = __webpack_require__(275);

// `WeakSet.of` method
// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.of
$({ target: 'WeakSet', stat: true, forced: true }, {
  of: createCollectionOf(WeakSetHelpers.WeakSet, WeakSetHelpers.add, false)
});


/***/ })
/******/ ]); }();

    

   /* Ende polyfills */
   /* Start jquery */
   
    

    

    /*!
 * jQuery JavaScript Library v3.7.1
 * https://jquery.com/
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2023-08-28T13:37Z
 */
( function( global, factory ) {

  "use strict";

  if ( typeof module === "object" && typeof module.exports === "object" ) {

    // For CommonJS and CommonJS-like environments where a proper `window`
    // is present, execute the factory and get jQuery.
    // For environments that do not have a `window` with a `document`
    // (such as Node.js), expose a factory as module.exports.
    // This accentuates the need for the creation of a real `window`.
    // e.g. var jQuery = require("jquery")(window);
    // See ticket trac-14549 for more info.
    module.exports = global.document ?
      factory( global, true ) :
      function( w ) {
        if ( !w.document ) {
          throw new Error( "jQuery requires a window with a document" );
        }
        return factory( w );
      };
  } else {
    factory( global );
  }

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var flat = arr.flat ? function( array ) {
  return arr.flat.call( array );
} : function( array ) {
  return arr.concat.apply( [], array );
};


var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};

var isFunction = function isFunction( obj ) {

    // Support: Chrome <=57, Firefox <=52
    // In some browsers, typeof returns "function" for HTML <object> elements
    // (i.e., `typeof document.createElement( "object" ) === "function"`).
    // We don't want to classify *any* DOM node as a function.
    // Support: QtWeb <=3.8.5, WebKit <=534.34, wkhtmltopdf tool <=0.12.5
    // Plus for old WebKit, typeof returns "function" for HTML collections
    // (e.g., `typeof document.getElementsByTagName("div") === "function"`). (gh-4756)
    return typeof obj === "function" && typeof obj.nodeType !== "number" &&
      typeof obj.item !== "function";
  };


var isWindow = function isWindow( obj ) {
    return obj != null && obj === obj.window;
  };


var document = window.document;



  var preservedScriptAttributes = {
    type: true,
    src: true,
    nonce: true,
    noModule: true
  };

  function DOMEval( code, node, doc ) {
    doc = doc || document;

    var i, val,
      script = doc.createElement( "script" );

    script.text = code;
    if ( node ) {
      for ( i in preservedScriptAttributes ) {

        // Support: Firefox 64+, Edge 18+
        // Some browsers don't support the "nonce" property on scripts.
        // On the other hand, just using `getAttribute` is not enough as
        // the `nonce` attribute is reset to an empty string whenever it
        // becomes browsing-context connected.
        // See https://github.com/whatwg/html/issues/2369
        // See https://html.spec.whatwg.org/#nonce-attributes
        // The `node.getAttribute` check was added for the sake of
        // `jQuery.globalEval` so that it can fake a nonce-containing node
        // via an object.
        val = node[ i ] || node.getAttribute && node.getAttribute( i );
        if ( val ) {
          script.setAttribute( i, val );
        }
      }
    }
    doc.head.appendChild( script ).parentNode.removeChild( script );
  }


function toType( obj ) {
  if ( obj == null ) {
    return obj + "";
  }

  // Support: Android <=2.3 only (functionish RegExp)
  return typeof obj === "object" || typeof obj === "function" ?
    class2type[ toString.call( obj ) ] || "object" :
    typeof obj;
}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var version = "3.7.1",

  rhtmlSuffix = /HTML$/i,

  // Define a local copy of jQuery
  jQuery = function( selector, context ) {

    // The jQuery object is actually just the init constructor 'enhanced'
    // Need init if jQuery is called (just allow error to be thrown if not included)
    return new jQuery.fn.init( selector, context );
  };

jQuery.fn = jQuery.prototype = {

  // The current version of jQuery being used
  jquery: version,

  constructor: jQuery,

  // The default length of a jQuery object is 0
  length: 0,

  toArray: function() {
    return slice.call( this );
  },

  // Get the Nth element in the matched element set OR
  // Get the whole matched element set as a clean array
  get: function( num ) {

    // Return all the elements in a clean array
    if ( num == null ) {
      return slice.call( this );
    }

    // Return just the one element from the set
    return num < 0 ? this[ num + this.length ] : this[ num ];
  },

  // Take an array of elements and push it onto the stack
  // (returning the new matched element set)
  pushStack: function( elems ) {

    // Build a new jQuery matched element set
    var ret = jQuery.merge( this.constructor(), elems );

    // Add the old object onto the stack (as a reference)
    ret.prevObject = this;

    // Return the newly-formed element set
    return ret;
  },

  // Execute a callback for every element in the matched set.
  each: function( callback ) {
    return jQuery.each( this, callback );
  },

  map: function( callback ) {
    return this.pushStack( jQuery.map( this, function( elem, i ) {
      return callback.call( elem, i, elem );
    } ) );
  },

  slice: function() {
    return this.pushStack( slice.apply( this, arguments ) );
  },

  first: function() {
    return this.eq( 0 );
  },

  last: function() {
    return this.eq( -1 );
  },

  even: function() {
    return this.pushStack( jQuery.grep( this, function( _elem, i ) {
      return ( i + 1 ) % 2;
    } ) );
  },

  odd: function() {
    return this.pushStack( jQuery.grep( this, function( _elem, i ) {
      return i % 2;
    } ) );
  },

  eq: function( i ) {
    var len = this.length,
      j = +i + ( i < 0 ? len : 0 );
    return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
  },

  end: function() {
    return this.prevObject || this.constructor();
  },

  // For internal use only.
  // Behaves like an Array's method, not like a jQuery method.
  push: push,
  sort: arr.sort,
  splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
  var options, name, src, copy, copyIsArray, clone,
    target = arguments[ 0 ] || {},
    i = 1,
    length = arguments.length,
    deep = false;

  // Handle a deep copy situation
  if ( typeof target === "boolean" ) {
    deep = target;

    // Skip the boolean and the target
    target = arguments[ i ] || {};
    i++;
  }

  // Handle case when target is a string or something (possible in deep copy)
  if ( typeof target !== "object" && !isFunction( target ) ) {
    target = {};
  }

  // Extend jQuery itself if only one argument is passed
  if ( i === length ) {
    target = this;
    i--;
  }

  for ( ; i < length; i++ ) {

    // Only deal with non-null/undefined values
    if ( ( options = arguments[ i ] ) != null ) {

      // Extend the base object
      for ( name in options ) {
        copy = options[ name ];

        // Prevent Object.prototype pollution
        // Prevent never-ending loop
        if ( name === "__proto__" || target === copy ) {
          continue;
        }

        // Recurse if we're merging plain objects or arrays
        if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
          ( copyIsArray = Array.isArray( copy ) ) ) ) {
          src = target[ name ];

          // Ensure proper type for the source value
          if ( copyIsArray && !Array.isArray( src ) ) {
            clone = [];
          } else if ( !copyIsArray && !jQuery.isPlainObject( src ) ) {
            clone = {};
          } else {
            clone = src;
          }
          copyIsArray = false;

          // Never move original objects, clone them
          target[ name ] = jQuery.extend( deep, clone, copy );

        // Don't bring in undefined values
        } else if ( copy !== undefined ) {
          target[ name ] = copy;
        }
      }
    }
  }

  // Return the modified object
  return target;
};

jQuery.extend( {

  // Unique for each copy of jQuery on the page
  expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

  // Assume jQuery is ready without the ready module
  isReady: true,

  error: function( msg ) {
    throw new Error( msg );
  },

  noop: function() {},

  isPlainObject: function( obj ) {
    var proto, Ctor;

    // Detect obvious negatives
    // Use toString instead of jQuery.type to catch host objects
    if ( !obj || toString.call( obj ) !== "[object Object]" ) {
      return false;
    }

    proto = getProto( obj );

    // Objects with no prototype (e.g., `Object.create( null )`) are plain
    if ( !proto ) {
      return true;
    }

    // Objects with prototype are plain iff they were constructed by a global Object function
    Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
    return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
  },

  isEmptyObject: function( obj ) {
    var name;

    for ( name in obj ) {
      return false;
    }
    return true;
  },

  // Evaluates a script in a provided context; falls back to the global one
  // if not specified.
  globalEval: function( code, options, doc ) {
    DOMEval( code, { nonce: options && options.nonce }, doc );
  },

  each: function( obj, callback ) {
    var length, i = 0;

    if ( isArrayLike( obj ) ) {
      length = obj.length;
      for ( ; i < length; i++ ) {
        if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
          break;
        }
      }
    } else {
      for ( i in obj ) {
        if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
          break;
        }
      }
    }

    return obj;
  },


  // Retrieve the text value of an array of DOM nodes
  text: function( elem ) {
    var node,
      ret = "",
      i = 0,
      nodeType = elem.nodeType;

    if ( !nodeType ) {

      // If no nodeType, this is expected to be an array
      while ( ( node = elem[ i++ ] ) ) {

        // Do not traverse comment nodes
        ret += jQuery.text( node );
      }
    }
    if ( nodeType === 1 || nodeType === 11 ) {
      return elem.textContent;
    }
    if ( nodeType === 9 ) {
      return elem.documentElement.textContent;
    }
    if ( nodeType === 3 || nodeType === 4 ) {
      return elem.nodeValue;
    }

    // Do not include comment or processing instruction nodes

    return ret;
  },

  // results is for internal usage only
  makeArray: function( arr, results ) {
    var ret = results || [];

    if ( arr != null ) {
      if ( isArrayLike( Object( arr ) ) ) {
        jQuery.merge( ret,
          typeof arr === "string" ?
            [ arr ] : arr
        );
      } else {
        push.call( ret, arr );
      }
    }

    return ret;
  },

  inArray: function( elem, arr, i ) {
    return arr == null ? -1 : indexOf.call( arr, elem, i );
  },

  isXMLDoc: function( elem ) {
    var namespace = elem && elem.namespaceURI,
      docElem = elem && ( elem.ownerDocument || elem ).documentElement;

    // Assume HTML when documentElement doesn't yet exist, such as inside
    // document fragments.
    return !rhtmlSuffix.test( namespace || docElem && docElem.nodeName || "HTML" );
  },

  // Support: Android <=4.0 only, PhantomJS 1 only
  // push.apply(_, arraylike) throws on ancient WebKit
  merge: function( first, second ) {
    var len = +second.length,
      j = 0,
      i = first.length;

    for ( ; j < len; j++ ) {
      first[ i++ ] = second[ j ];
    }

    first.length = i;

    return first;
  },

  grep: function( elems, callback, invert ) {
    var callbackInverse,
      matches = [],
      i = 0,
      length = elems.length,
      callbackExpect = !invert;

    // Go through the array, only saving the items
    // that pass the validator function
    for ( ; i < length; i++ ) {
      callbackInverse = !callback( elems[ i ], i );
      if ( callbackInverse !== callbackExpect ) {
        matches.push( elems[ i ] );
      }
    }

    return matches;
  },

  // arg is for internal usage only
  map: function( elems, callback, arg ) {
    var length, value,
      i = 0,
      ret = [];

    // Go through the array, translating each of the items to their new values
    if ( isArrayLike( elems ) ) {
      length = elems.length;
      for ( ; i < length; i++ ) {
        value = callback( elems[ i ], i, arg );

        if ( value != null ) {
          ret.push( value );
        }
      }

    // Go through every key on the object,
    } else {
      for ( i in elems ) {
        value = callback( elems[ i ], i, arg );

        if ( value != null ) {
          ret.push( value );
        }
      }
    }

    // Flatten any nested arrays
    return flat( ret );
  },

  // A global GUID counter for objects
  guid: 1,

  // jQuery.support is not used in Core but other projects attach their
  // properties to it so it needs to exist.
  support: support
} );

if ( typeof Symbol === "function" ) {
  jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
  function( _i, name ) {
    class2type[ "[object " + name + "]" ] = name.toLowerCase();
  } );

function isArrayLike( obj ) {

  // Support: real iOS 8.2 only (not reproducible in simulator)
  // `in` check used to prevent JIT error (gh-2145)
  // hasOwn isn't used here due to false negatives
  // regarding Nodelist length in IE
  var length = !!obj && "length" in obj && obj.length,
    type = toType( obj );

  if ( isFunction( obj ) || isWindow( obj ) ) {
    return false;
  }

  return type === "array" || length === 0 ||
    typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}


function nodeName( elem, name ) {

  return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

}
var pop = arr.pop;


var sort = arr.sort;


var splice = arr.splice;


var whitespace = "[\\x20\\t\\r\\n\\f]";


var rtrimCSS = new RegExp(
  "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$",
  "g"
);




// Note: an element does not contain itself
jQuery.contains = function( a, b ) {
  var bup = b && b.parentNode;

  return a === bup || !!( bup && bup.nodeType === 1 && (

    // Support: IE 9 - 11+
    // IE doesn't have `contains` on SVG.
    a.contains ?
      a.contains( bup ) :
      a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
  ) );
};




// CSS string/identifier serialization
// https://drafts.csswg.org/cssom/#common-serializing-idioms
var rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g;

function fcssescape( ch, asCodePoint ) {
  if ( asCodePoint ) {

    // U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
    if ( ch === "\0" ) {
      return "\uFFFD";
    }

    // Control characters and (dependent upon position) numbers get escaped as code points
    return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
  }

  // Other potentially-special ASCII characters get backslash-escaped
  return "\\" + ch;
}

jQuery.escapeSelector = function( sel ) {
  return ( sel + "" ).replace( rcssescape, fcssescape );
};




var preferredDoc = document,
  pushNative = push;

( function() {

var i,
  Expr,
  outermostContext,
  sortInput,
  hasDuplicate,
  push = pushNative,

  // Local document vars
  document,
  documentElement,
  documentIsHTML,
  rbuggyQSA,
  matches,

  // Instance-specific data
  expando = jQuery.expando,
  dirruns = 0,
  done = 0,
  classCache = createCache(),
  tokenCache = createCache(),
  compilerCache = createCache(),
  nonnativeSelectorCache = createCache(),
  sortOrder = function( a, b ) {
    if ( a === b ) {
      hasDuplicate = true;
    }
    return 0;
  },

  booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|" +
    "loop|multiple|open|readonly|required|scoped",

  // Regular expressions

  // https://www.w3.org/TR/css-syntax-3/#ident-token-diagram
  identifier = "(?:\\\\[\\da-fA-F]{1,6}" + whitespace +
    "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",

  // Attribute selectors: https://www.w3.org/TR/selectors/#attribute-selectors
  attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +

    // Operator (capture 2)
    "*([*^$|!~]?=)" + whitespace +

    // "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
    "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" +
    whitespace + "*\\]",

  pseudos = ":(" + identifier + ")(?:\\((" +

    // To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
    // 1. quoted (capture 3; capture 4 or capture 5)
    "('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +

    // 2. simple (capture 6)
    "((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +

    // 3. anything else (capture 2)
    ".*" +
    ")\\)|)",

  // Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
  rwhitespace = new RegExp( whitespace + "+", "g" ),

  rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
  rleadingCombinator = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" +
    whitespace + "*" ),
  rdescend = new RegExp( whitespace + "|>" ),

  rpseudo = new RegExp( pseudos ),
  ridentifier = new RegExp( "^" + identifier + "$" ),

  matchExpr = {
    ID: new RegExp( "^#(" + identifier + ")" ),
    CLASS: new RegExp( "^\\.(" + identifier + ")" ),
    TAG: new RegExp( "^(" + identifier + "|[*])" ),
    ATTR: new RegExp( "^" + attributes ),
    PSEUDO: new RegExp( "^" + pseudos ),
    CHILD: new RegExp(
      "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" +
        whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" +
        whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
    bool: new RegExp( "^(?:" + booleans + ")$", "i" ),

    // For use in libraries implementing .is()
    // We use this for POS matching in `select`
    needsContext: new RegExp( "^" + whitespace +
      "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace +
      "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
  },

  rinputs = /^(?:input|select|textarea|button)$/i,
  rheader = /^h\d$/i,

  // Easily-parseable/retrievable ID or TAG or CLASS selectors
  rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

  rsibling = /[+~]/,

  // CSS escapes
  // https://www.w3.org/TR/CSS21/syndata.html#escaped-characters
  runescape = new RegExp( "\\\\[\\da-fA-F]{1,6}" + whitespace +
    "?|\\\\([^\\r\\n\\f])", "g" ),
  funescape = function( escape, nonHex ) {
    var high = "0x" + escape.slice( 1 ) - 0x10000;

    if ( nonHex ) {

      // Strip the backslash prefix from a non-hex escape sequence
      return nonHex;
    }

    // Replace a hexadecimal escape sequence with the encoded Unicode code point
    // Support: IE <=11+
    // For values outside the Basic Multilingual Plane (BMP), manually construct a
    // surrogate pair
    return high < 0 ?
      String.fromCharCode( high + 0x10000 ) :
      String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
  },

  // Used for iframes; see `setDocument`.
  // Support: IE 9 - 11+, Edge 12 - 18+
  // Removing the function wrapper causes a "Permission Denied"
  // error in IE/Edge.
  unloadHandler = function() {
    setDocument();
  },

  inDisabledFieldset = addCombinator(
    function( elem ) {
      return elem.disabled === true && nodeName( elem, "fieldset" );
    },
    { dir: "parentNode", next: "legend" }
  );

// Support: IE <=9 only
// Accessing document.activeElement can throw unexpectedly
// https://bugs.jquery.com/ticket/13393
function safeActiveElement() {
  try {
    return document.activeElement;
  } catch ( err ) { }
}

// Optimize for push.apply( _, NodeList )
try {
  push.apply(
    ( arr = slice.call( preferredDoc.childNodes ) ),
    preferredDoc.childNodes
  );

  // Support: Android <=4.0
  // Detect silently failing push.apply
  // eslint-disable-next-line no-unused-expressions
  arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
  push = {
    apply: function( target, els ) {
      pushNative.apply( target, slice.call( els ) );
    },
    call: function( target ) {
      pushNative.apply( target, slice.call( arguments, 1 ) );
    }
  };
}

function find( selector, context, results, seed ) {
  var m, i, elem, nid, match, groups, newSelector,
    newContext = context && context.ownerDocument,

    // nodeType defaults to 9, since context defaults to document
    nodeType = context ? context.nodeType : 9;

  results = results || [];

  // Return early from calls with invalid selector or context
  if ( typeof selector !== "string" || !selector ||
    nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

    return results;
  }

  // Try to shortcut find operations (as opposed to filters) in HTML documents
  if ( !seed ) {
    setDocument( context );
    context = context || document;

    if ( documentIsHTML ) {

      // If the selector is sufficiently simple, try using a "get*By*" DOM method
      // (excepting DocumentFragment context, where the methods don't exist)
      if ( nodeType !== 11 && ( match = rquickExpr.exec( selector ) ) ) {

        // ID selector
        if ( ( m = match[ 1 ] ) ) {

          // Document context
          if ( nodeType === 9 ) {
            if ( ( elem = context.getElementById( m ) ) ) {

              // Support: IE 9 only
              // getElementById can match elements by name instead of ID
              if ( elem.id === m ) {
                push.call( results, elem );
                return results;
              }
            } else {
              return results;
            }

          // Element context
          } else {

            // Support: IE 9 only
            // getElementById can match elements by name instead of ID
            if ( newContext && ( elem = newContext.getElementById( m ) ) &&
              find.contains( context, elem ) &&
              elem.id === m ) {

              push.call( results, elem );
              return results;
            }
          }

        // Type selector
        } else if ( match[ 2 ] ) {
          push.apply( results, context.getElementsByTagName( selector ) );
          return results;

        // Class selector
        } else if ( ( m = match[ 3 ] ) && context.getElementsByClassName ) {
          push.apply( results, context.getElementsByClassName( m ) );
          return results;
        }
      }

      // Take advantage of querySelectorAll
      if ( !nonnativeSelectorCache[ selector + " " ] &&
        ( !rbuggyQSA || !rbuggyQSA.test( selector ) ) ) {

        newSelector = selector;
        newContext = context;

        // qSA considers elements outside a scoping root when evaluating child or
        // descendant combinators, which is not what we want.
        // In such cases, we work around the behavior by prefixing every selector in the
        // list with an ID selector referencing the scope context.
        // The technique has to be used as well when a leading combinator is used
        // as such selectors are not recognized by querySelectorAll.
        // Thanks to Andrew Dupont for this technique.
        if ( nodeType === 1 &&
          ( rdescend.test( selector ) || rleadingCombinator.test( selector ) ) ) {

          // Expand context for sibling selectors
          newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
            context;

          // We can use :scope instead of the ID hack if the browser
          // supports it & if we're not changing the context.
          // Support: IE 11+, Edge 17 - 18+
          // IE/Edge sometimes throw a "Permission denied" error when
          // strict-comparing two documents; shallow comparisons work.
          // eslint-disable-next-line eqeqeq
          if ( newContext != context || !support.scope ) {

            // Capture the context ID, setting it first if necessary
            if ( ( nid = context.getAttribute( "id" ) ) ) {
              nid = jQuery.escapeSelector( nid );
            } else {
              context.setAttribute( "id", ( nid = expando ) );
            }
          }

          // Prefix every selector in the list
          groups = tokenize( selector );
          i = groups.length;
          while ( i-- ) {
            groups[ i ] = ( nid ? "#" + nid : ":scope" ) + " " +
              toSelector( groups[ i ] );
          }
          newSelector = groups.join( "," );
        }

        try {
          push.apply( results,
            newContext.querySelectorAll( newSelector )
          );
          return results;
        } catch ( qsaError ) {
          nonnativeSelectorCache( selector, true );
        } finally {
          if ( nid === expando ) {
            context.removeAttribute( "id" );
          }
        }
      }
    }
  }

  // All others
  return select( selector.replace( rtrimCSS, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *  property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *  deleting the oldest entry
 */
function createCache() {
  var keys = [];

  function cache( key, value ) {

    // Use (key + " ") to avoid collision with native prototype properties
    // (see https://github.com/jquery/sizzle/issues/157)
    if ( keys.push( key + " " ) > Expr.cacheLength ) {

      // Only keep the most recent entries
      delete cache[ keys.shift() ];
    }
    return ( cache[ key + " " ] = value );
  }
  return cache;
}

/**
 * Mark a function for special use by jQuery selector module
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
  fn[ expando ] = true;
  return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
  var el = document.createElement( "fieldset" );

  try {
    return !!fn( el );
  } catch ( e ) {
    return false;
  } finally {

    // Remove from its parent by default
    if ( el.parentNode ) {
      el.parentNode.removeChild( el );
    }

    // release memory in IE
    el = null;
  }
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
  return function( elem ) {
    return nodeName( elem, "input" ) && elem.type === type;
  };
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
  return function( elem ) {
    return ( nodeName( elem, "input" ) || nodeName( elem, "button" ) ) &&
      elem.type === type;
  };
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

  // Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
  return function( elem ) {

    // Only certain elements can match :enabled or :disabled
    // https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
    // https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
    if ( "form" in elem ) {

      // Check for inherited disabledness on relevant non-disabled elements:
      // * listed form-associated elements in a disabled fieldset
      //   https://html.spec.whatwg.org/multipage/forms.html#category-listed
      //   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
      // * option elements in a disabled optgroup
      //   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
      // All such elements have a "form" property.
      if ( elem.parentNode && elem.disabled === false ) {

        // Option elements defer to a parent optgroup if present
        if ( "label" in elem ) {
          if ( "label" in elem.parentNode ) {
            return elem.parentNode.disabled === disabled;
          } else {
            return elem.disabled === disabled;
          }
        }

        // Support: IE 6 - 11+
        // Use the isDisabled shortcut property to check for disabled fieldset ancestors
        return elem.isDisabled === disabled ||

          // Where there is no isDisabled, check manually
          elem.isDisabled !== !disabled &&
            inDisabledFieldset( elem ) === disabled;
      }

      return elem.disabled === disabled;

    // Try to winnow out elements that can't be disabled before trusting the disabled property.
    // Some victims get caught in our net (label, legend, menu, track), but it shouldn't
    // even exist on them, let alone have a boolean value.
    } else if ( "label" in elem ) {
      return elem.disabled === disabled;
    }

    // Remaining elements are neither :enabled nor :disabled
    return false;
  };
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
  return markFunction( function( argument ) {
    argument = +argument;
    return markFunction( function( seed, matches ) {
      var j,
        matchIndexes = fn( [], seed.length, argument ),
        i = matchIndexes.length;

      // Match elements found at the specified indexes
      while ( i-- ) {
        if ( seed[ ( j = matchIndexes[ i ] ) ] ) {
          seed[ j ] = !( matches[ j ] = seed[ j ] );
        }
      }
    } );
  } );
}

/**
 * Checks a node for validity as a jQuery selector context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
  return context && typeof context.getElementsByTagName !== "undefined" && context;
}

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [node] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
function setDocument( node ) {
  var subWindow,
    doc = node ? node.ownerDocument || node : preferredDoc;

  // Return early if doc is invalid or already selected
  // Support: IE 11+, Edge 17 - 18+
  // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
  // two documents; shallow comparisons work.
  // eslint-disable-next-line eqeqeq
  if ( doc == document || doc.nodeType !== 9 || !doc.documentElement ) {
    return document;
  }

  // Update global variables
  document = doc;
  documentElement = document.documentElement;
  documentIsHTML = !jQuery.isXMLDoc( document );

  // Support: iOS 7 only, IE 9 - 11+
  // Older browsers didn't support unprefixed `matches`.
  matches = documentElement.matches ||
    documentElement.webkitMatchesSelector ||
    documentElement.msMatchesSelector;

  // Support: IE 9 - 11+, Edge 12 - 18+
  // Accessing iframe documents after unload throws "permission denied" errors
  // (see trac-13936).
  // Limit the fix to IE & Edge Legacy; despite Edge 15+ implementing `matches`,
  // all IE 9+ and Edge Legacy versions implement `msMatchesSelector` as well.
  if ( documentElement.msMatchesSelector &&

    // Support: IE 11+, Edge 17 - 18+
    // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
    // two documents; shallow comparisons work.
    // eslint-disable-next-line eqeqeq
    preferredDoc != document &&
    ( subWindow = document.defaultView ) && subWindow.top !== subWindow ) {

    // Support: IE 9 - 11+, Edge 12 - 18+
    subWindow.addEventListener( "unload", unloadHandler );
  }

  // Support: IE <10
  // Check if getElementById returns elements by name
  // The broken getElementById methods don't pick up programmatically-set names,
  // so use a roundabout getElementsByName test
  support.getById = assert( function( el ) {
    documentElement.appendChild( el ).id = jQuery.expando;
    return !document.getElementsByName ||
      !document.getElementsByName( jQuery.expando ).length;
  } );

  // Support: IE 9 only
  // Check to see if it's possible to do matchesSelector
  // on a disconnected node.
  support.disconnectedMatch = assert( function( el ) {
    return matches.call( el, "*" );
  } );

  // Support: IE 9 - 11+, Edge 12 - 18+
  // IE/Edge don't support the :scope pseudo-class.
  support.scope = assert( function() {
    return document.querySelectorAll( ":scope" );
  } );

  // Support: Chrome 105 - 111 only, Safari 15.4 - 16.3 only
  // Make sure the `:has()` argument is parsed unforgivingly.
  // We include `*` in the test to detect buggy implementations that are
  // _selectively_ forgiving (specifically when the list includes at least
  // one valid selector).
  // Note that we treat complete lack of support for `:has()` as if it were
  // spec-compliant support, which is fine because use of `:has()` in such
  // environments will fail in the qSA path and fall back to jQuery traversal
  // anyway.
  support.cssHas = assert( function() {
    try {
      document.querySelector( ":has(*,:jqfake)" );
      return false;
    } catch ( e ) {
      return true;
    }
  } );

  // ID filter and find
  if ( support.getById ) {
    Expr.filter.ID = function( id ) {
      var attrId = id.replace( runescape, funescape );
      return function( elem ) {
        return elem.getAttribute( "id" ) === attrId;
      };
    };
    Expr.find.ID = function( id, context ) {
      if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
        var elem = context.getElementById( id );
        return elem ? [ elem ] : [];
      }
    };
  } else {
    Expr.filter.ID =  function( id ) {
      var attrId = id.replace( runescape, funescape );
      return function( elem ) {
        var node = typeof elem.getAttributeNode !== "undefined" &&
          elem.getAttributeNode( "id" );
        return node && node.value === attrId;
      };
    };

    // Support: IE 6 - 7 only
    // getElementById is not reliable as a find shortcut
    Expr.find.ID = function( id, context ) {
      if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
        var node, i, elems,
          elem = context.getElementById( id );

        if ( elem ) {

          // Verify the id attribute
          node = elem.getAttributeNode( "id" );
          if ( node && node.value === id ) {
            return [ elem ];
          }

          // Fall back on getElementsByName
          elems = context.getElementsByName( id );
          i = 0;
          while ( ( elem = elems[ i++ ] ) ) {
            node = elem.getAttributeNode( "id" );
            if ( node && node.value === id ) {
              return [ elem ];
            }
          }
        }

        return [];
      }
    };
  }

  // Tag
  Expr.find.TAG = function( tag, context ) {
    if ( typeof context.getElementsByTagName !== "undefined" ) {
      return context.getElementsByTagName( tag );

    // DocumentFragment nodes don't have gEBTN
    } else {
      return context.querySelectorAll( tag );
    }
  };

  // Class
  Expr.find.CLASS = function( className, context ) {
    if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
      return context.getElementsByClassName( className );
    }
  };

  /* QSA/matchesSelector
  ---------------------------------------------------------------------- */

  // QSA and matchesSelector support

  rbuggyQSA = [];

  // Build QSA regex
  // Regex strategy adopted from Diego Perini
  assert( function( el ) {

    var input;

    documentElement.appendChild( el ).innerHTML =
      "<a id='" + expando + "' href='' disabled='disabled'></a>" +
      "<select id='" + expando + "-\r\\' disabled='disabled'>" +
      "<option selected=''></option></select>";

    // Support: iOS <=7 - 8 only
    // Boolean attributes and "value" are not treated correctly in some XML documents
    if ( !el.querySelectorAll( "[selected]" ).length ) {
      rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
    }

    // Support: iOS <=7 - 8 only
    if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
      rbuggyQSA.push( "~=" );
    }

    // Support: iOS 8 only
    // https://bugs.webkit.org/show_bug.cgi?id=136851
    // In-page `selector#id sibling-combinator selector` fails
    if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
      rbuggyQSA.push( ".#.+[+~]" );
    }

    // Support: Chrome <=105+, Firefox <=104+, Safari <=15.4+
    // In some of the document kinds, these selectors wouldn't work natively.
    // This is probably OK but for backwards compatibility we want to maintain
    // handling them through jQuery traversal in jQuery 3.x.
    if ( !el.querySelectorAll( ":checked" ).length ) {
      rbuggyQSA.push( ":checked" );
    }

    // Support: Windows 8 Native Apps
    // The type and name attributes are restricted during .innerHTML assignment
    input = document.createElement( "input" );
    input.setAttribute( "type", "hidden" );
    el.appendChild( input ).setAttribute( "name", "D" );

    // Support: IE 9 - 11+
    // IE's :disabled selector does not pick up the children of disabled fieldsets
    // Support: Chrome <=105+, Firefox <=104+, Safari <=15.4+
    // In some of the document kinds, these selectors wouldn't work natively.
    // This is probably OK but for backwards compatibility we want to maintain
    // handling them through jQuery traversal in jQuery 3.x.
    documentElement.appendChild( el ).disabled = true;
    if ( el.querySelectorAll( ":disabled" ).length !== 2 ) {
      rbuggyQSA.push( ":enabled", ":disabled" );
    }

    // Support: IE 11+, Edge 15 - 18+
    // IE 11/Edge don't find elements on a `[name='']` query in some cases.
    // Adding a temporary attribute to the document before the selection works
    // around the issue.
    // Interestingly, IE 10 & older don't seem to have the issue.
    input = document.createElement( "input" );
    input.setAttribute( "name", "" );
    el.appendChild( input );
    if ( !el.querySelectorAll( "[name='']" ).length ) {
      rbuggyQSA.push( "\\[" + whitespace + "*name" + whitespace + "*=" +
        whitespace + "*(?:''|\"\")" );
    }
  } );

  if ( !support.cssHas ) {

    // Support: Chrome 105 - 110+, Safari 15.4 - 16.3+
    // Our regular `try-catch` mechanism fails to detect natively-unsupported
    // pseudo-classes inside `:has()` (such as `:has(:contains("Foo"))`)
    // in browsers that parse the `:has()` argument as a forgiving selector list.
    // https://drafts.csswg.org/selectors/#relational now requires the argument
    // to be parsed unforgivingly, but browsers have not yet fully adjusted.
    rbuggyQSA.push( ":has" );
  }

  rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join( "|" ) );

  /* Sorting
  ---------------------------------------------------------------------- */

  // Document order sorting
  sortOrder = function( a, b ) {

    // Flag for duplicate removal
    if ( a === b ) {
      hasDuplicate = true;
      return 0;
    }

    // Sort on method existence if only one input has compareDocumentPosition
    var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
    if ( compare ) {
      return compare;
    }

    // Calculate position if both inputs belong to the same document
    // Support: IE 11+, Edge 17 - 18+
    // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
    // two documents; shallow comparisons work.
    // eslint-disable-next-line eqeqeq
    compare = ( a.ownerDocument || a ) == ( b.ownerDocument || b ) ?
      a.compareDocumentPosition( b ) :

      // Otherwise we know they are disconnected
      1;

    // Disconnected nodes
    if ( compare & 1 ||
      ( !support.sortDetached && b.compareDocumentPosition( a ) === compare ) ) {

      // Choose the first element that is related to our preferred document
      // Support: IE 11+, Edge 17 - 18+
      // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
      // two documents; shallow comparisons work.
      // eslint-disable-next-line eqeqeq
      if ( a === document || a.ownerDocument == preferredDoc &&
        find.contains( preferredDoc, a ) ) {
        return -1;
      }

      // Support: IE 11+, Edge 17 - 18+
      // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
      // two documents; shallow comparisons work.
      // eslint-disable-next-line eqeqeq
      if ( b === document || b.ownerDocument == preferredDoc &&
        find.contains( preferredDoc, b ) ) {
        return 1;
      }

      // Maintain original order
      return sortInput ?
        ( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
        0;
    }

    return compare & 4 ? -1 : 1;
  };

  return document;
}

find.matches = function( expr, elements ) {
  return find( expr, null, null, elements );
};

find.matchesSelector = function( elem, expr ) {
  setDocument( elem );

  if ( documentIsHTML &&
    !nonnativeSelectorCache[ expr + " " ] &&
    ( !rbuggyQSA || !rbuggyQSA.test( expr ) ) ) {

    try {
      var ret = matches.call( elem, expr );

      // IE 9's matchesSelector returns false on disconnected nodes
      if ( ret || support.disconnectedMatch ||

          // As well, disconnected nodes are said to be in a document
          // fragment in IE 9
          elem.document && elem.document.nodeType !== 11 ) {
        return ret;
      }
    } catch ( e ) {
      nonnativeSelectorCache( expr, true );
    }
  }

  return find( expr, document, null, [ elem ] ).length > 0;
};

find.contains = function( context, elem ) {

  // Set document vars if needed
  // Support: IE 11+, Edge 17 - 18+
  // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
  // two documents; shallow comparisons work.
  // eslint-disable-next-line eqeqeq
  if ( ( context.ownerDocument || context ) != document ) {
    setDocument( context );
  }
  return jQuery.contains( context, elem );
};


find.attr = function( elem, name ) {

  // Set document vars if needed
  // Support: IE 11+, Edge 17 - 18+
  // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
  // two documents; shallow comparisons work.
  // eslint-disable-next-line eqeqeq
  if ( ( elem.ownerDocument || elem ) != document ) {
    setDocument( elem );
  }

  var fn = Expr.attrHandle[ name.toLowerCase() ],

    // Don't get fooled by Object.prototype properties (see trac-13807)
    val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
      fn( elem, name, !documentIsHTML ) :
      undefined;

  if ( val !== undefined ) {
    return val;
  }

  return elem.getAttribute( name );
};

find.error = function( msg ) {
  throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
jQuery.uniqueSort = function( results ) {
  var elem,
    duplicates = [],
    j = 0,
    i = 0;

  // Unless we *know* we can detect duplicates, assume their presence
  //
  // Support: Android <=4.0+
  // Testing for detecting duplicates is unpredictable so instead assume we can't
  // depend on duplicate detection in all browsers without a stable sort.
  hasDuplicate = !support.sortStable;
  sortInput = !support.sortStable && slice.call( results, 0 );
  sort.call( results, sortOrder );

  if ( hasDuplicate ) {
    while ( ( elem = results[ i++ ] ) ) {
      if ( elem === results[ i ] ) {
        j = duplicates.push( i );
      }
    }
    while ( j-- ) {
      splice.call( results, duplicates[ j ], 1 );
    }
  }

  // Clear input after sorting to release objects
  // See https://github.com/jquery/sizzle/pull/225
  sortInput = null;

  return results;
};

jQuery.fn.uniqueSort = function() {
  return this.pushStack( jQuery.uniqueSort( slice.apply( this ) ) );
};

Expr = jQuery.expr = {

  // Can be adjusted by the user
  cacheLength: 50,

  createPseudo: markFunction,

  match: matchExpr,

  attrHandle: {},

  find: {},

  relative: {
    ">": { dir: "parentNode", first: true },
    " ": { dir: "parentNode" },
    "+": { dir: "previousSibling", first: true },
    "~": { dir: "previousSibling" }
  },

  preFilter: {
    ATTR: function( match ) {
      match[ 1 ] = match[ 1 ].replace( runescape, funescape );

      // Move the given value to match[3] whether quoted or unquoted
      match[ 3 ] = ( match[ 3 ] || match[ 4 ] || match[ 5 ] || "" )
        .replace( runescape, funescape );

      if ( match[ 2 ] === "~=" ) {
        match[ 3 ] = " " + match[ 3 ] + " ";
      }

      return match.slice( 0, 4 );
    },

    CHILD: function( match ) {

      /* matches from matchExpr["CHILD"]
        1 type (only|nth|...)
        2 what (child|of-type)
        3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
        4 xn-component of xn+y argument ([+-]?\d*n|)
        5 sign of xn-component
        6 x of xn-component
        7 sign of y-component
        8 y of y-component
      */
      match[ 1 ] = match[ 1 ].toLowerCase();

      if ( match[ 1 ].slice( 0, 3 ) === "nth" ) {

        // nth-* requires argument
        if ( !match[ 3 ] ) {
          find.error( match[ 0 ] );
        }

        // numeric x and y parameters for Expr.filter.CHILD
        // remember that false/true cast respectively to 0/1
        match[ 4 ] = +( match[ 4 ] ?
          match[ 5 ] + ( match[ 6 ] || 1 ) :
          2 * ( match[ 3 ] === "even" || match[ 3 ] === "odd" )
        );
        match[ 5 ] = +( ( match[ 7 ] + match[ 8 ] ) || match[ 3 ] === "odd" );

      // other types prohibit arguments
      } else if ( match[ 3 ] ) {
        find.error( match[ 0 ] );
      }

      return match;
    },

    PSEUDO: function( match ) {
      var excess,
        unquoted = !match[ 6 ] && match[ 2 ];

      if ( matchExpr.CHILD.test( match[ 0 ] ) ) {
        return null;
      }

      // Accept quoted arguments as-is
      if ( match[ 3 ] ) {
        match[ 2 ] = match[ 4 ] || match[ 5 ] || "";

      // Strip excess characters from unquoted arguments
      } else if ( unquoted && rpseudo.test( unquoted ) &&

        // Get excess from tokenize (recursively)
        ( excess = tokenize( unquoted, true ) ) &&

        // advance to the next closing parenthesis
        ( excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length ) ) {

        // excess is a negative index
        match[ 0 ] = match[ 0 ].slice( 0, excess );
        match[ 2 ] = unquoted.slice( 0, excess );
      }

      // Return only captures needed by the pseudo filter method (type and argument)
      return match.slice( 0, 3 );
    }
  },

  filter: {

    TAG: function( nodeNameSelector ) {
      var expectedNodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
      return nodeNameSelector === "*" ?
        function() {
          return true;
        } :
        function( elem ) {
          return nodeName( elem, expectedNodeName );
        };
    },

    CLASS: function( className ) {
      var pattern = classCache[ className + " " ];

      return pattern ||
        ( pattern = new RegExp( "(^|" + whitespace + ")" + className +
          "(" + whitespace + "|$)" ) ) &&
        classCache( className, function( elem ) {
          return pattern.test(
            typeof elem.className === "string" && elem.className ||
              typeof elem.getAttribute !== "undefined" &&
                elem.getAttribute( "class" ) ||
              ""
          );
        } );
    },

    ATTR: function( name, operator, check ) {
      return function( elem ) {
        var result = find.attr( elem, name );

        if ( result == null ) {
          return operator === "!=";
        }
        if ( !operator ) {
          return true;
        }

        result += "";

        if ( operator === "=" ) {
          return result === check;
        }
        if ( operator === "!=" ) {
          return result !== check;
        }
        if ( operator === "^=" ) {
          return check && result.indexOf( check ) === 0;
        }
        if ( operator === "*=" ) {
          return check && result.indexOf( check ) > -1;
        }
        if ( operator === "$=" ) {
          return check && result.slice( -check.length ) === check;
        }
        if ( operator === "~=" ) {
          return ( " " + result.replace( rwhitespace, " " ) + " " )
            .indexOf( check ) > -1;
        }
        if ( operator === "|=" ) {
          return result === check || result.slice( 0, check.length + 1 ) === check + "-";
        }

        return false;
      };
    },

    CHILD: function( type, what, _argument, first, last ) {
      var simple = type.slice( 0, 3 ) !== "nth",
        forward = type.slice( -4 ) !== "last",
        ofType = what === "of-type";

      return first === 1 && last === 0 ?

        // Shortcut for :nth-*(n)
        function( elem ) {
          return !!elem.parentNode;
        } :

        function( elem, _context, xml ) {
          var cache, outerCache, node, nodeIndex, start,
            dir = simple !== forward ? "nextSibling" : "previousSibling",
            parent = elem.parentNode,
            name = ofType && elem.nodeName.toLowerCase(),
            useCache = !xml && !ofType,
            diff = false;

          if ( parent ) {

            // :(first|last|only)-(child|of-type)
            if ( simple ) {
              while ( dir ) {
                node = elem;
                while ( ( node = node[ dir ] ) ) {
                  if ( ofType ?
                    nodeName( node, name ) :
                    node.nodeType === 1 ) {

                    return false;
                  }
                }

                // Reverse direction for :only-* (if we haven't yet done so)
                start = dir = type === "only" && !start && "nextSibling";
              }
              return true;
            }

            start = [ forward ? parent.firstChild : parent.lastChild ];

            // non-xml :nth-child(...) stores cache data on `parent`
            if ( forward && useCache ) {

              // Seek `elem` from a previously-cached index
              outerCache = parent[ expando ] || ( parent[ expando ] = {} );
              cache = outerCache[ type ] || [];
              nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
              diff = nodeIndex && cache[ 2 ];
              node = nodeIndex && parent.childNodes[ nodeIndex ];

              while ( ( node = ++nodeIndex && node && node[ dir ] ||

                // Fallback to seeking `elem` from the start
                ( diff = nodeIndex = 0 ) || start.pop() ) ) {

                // When found, cache indexes on `parent` and break
                if ( node.nodeType === 1 && ++diff && node === elem ) {
                  outerCache[ type ] = [ dirruns, nodeIndex, diff ];
                  break;
                }
              }

            } else {

              // Use previously-cached element index if available
              if ( useCache ) {
                outerCache = elem[ expando ] || ( elem[ expando ] = {} );
                cache = outerCache[ type ] || [];
                nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
                diff = nodeIndex;
              }

              // xml :nth-child(...)
              // or :nth-last-child(...) or :nth(-last)?-of-type(...)
              if ( diff === false ) {

                // Use the same loop as above to seek `elem` from the start
                while ( ( node = ++nodeIndex && node && node[ dir ] ||
                  ( diff = nodeIndex = 0 ) || start.pop() ) ) {

                  if ( ( ofType ?
                    nodeName( node, name ) :
                    node.nodeType === 1 ) &&
                    ++diff ) {

                    // Cache the index of each encountered element
                    if ( useCache ) {
                      outerCache = node[ expando ] ||
                        ( node[ expando ] = {} );
                      outerCache[ type ] = [ dirruns, diff ];
                    }

                    if ( node === elem ) {
                      break;
                    }
                  }
                }
              }
            }

            // Incorporate the offset, then check against cycle size
            diff -= last;
            return diff === first || ( diff % first === 0 && diff / first >= 0 );
          }
        };
    },

    PSEUDO: function( pseudo, argument ) {

      // pseudo-class names are case-insensitive
      // https://www.w3.org/TR/selectors/#pseudo-classes
      // Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
      // Remember that setFilters inherits from pseudos
      var args,
        fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
          find.error( "unsupported pseudo: " + pseudo );

      // The user may use createPseudo to indicate that
      // arguments are needed to create the filter function
      // just as jQuery does
      if ( fn[ expando ] ) {
        return fn( argument );
      }

      // But maintain support for old signatures
      if ( fn.length > 1 ) {
        args = [ pseudo, pseudo, "", argument ];
        return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
          markFunction( function( seed, matches ) {
            var idx,
              matched = fn( seed, argument ),
              i = matched.length;
            while ( i-- ) {
              idx = indexOf.call( seed, matched[ i ] );
              seed[ idx ] = !( matches[ idx ] = matched[ i ] );
            }
          } ) :
          function( elem ) {
            return fn( elem, 0, args );
          };
      }

      return fn;
    }
  },

  pseudos: {

    // Potentially complex pseudos
    not: markFunction( function( selector ) {

      // Trim the selector passed to compile
      // to avoid treating leading and trailing
      // spaces as combinators
      var input = [],
        results = [],
        matcher = compile( selector.replace( rtrimCSS, "$1" ) );

      return matcher[ expando ] ?
        markFunction( function( seed, matches, _context, xml ) {
          var elem,
            unmatched = matcher( seed, null, xml, [] ),
            i = seed.length;

          // Match elements unmatched by `matcher`
          while ( i-- ) {
            if ( ( elem = unmatched[ i ] ) ) {
              seed[ i ] = !( matches[ i ] = elem );
            }
          }
        } ) :
        function( elem, _context, xml ) {
          input[ 0 ] = elem;
          matcher( input, null, xml, results );

          // Don't keep the element
          // (see https://github.com/jquery/sizzle/issues/299)
          input[ 0 ] = null;
          return !results.pop();
        };
    } ),

    has: markFunction( function( selector ) {
      return function( elem ) {
        return find( selector, elem ).length > 0;
      };
    } ),

    contains: markFunction( function( text ) {
      text = text.replace( runescape, funescape );
      return function( elem ) {
        return ( elem.textContent || jQuery.text( elem ) ).indexOf( text ) > -1;
      };
    } ),

    // "Whether an element is represented by a :lang() selector
    // is based solely on the element's language value
    // being equal to the identifier C,
    // or beginning with the identifier C immediately followed by "-".
    // The matching of C against the element's language value is performed case-insensitively.
    // The identifier C does not have to be a valid language name."
    // https://www.w3.org/TR/selectors/#lang-pseudo
    lang: markFunction( function( lang ) {

      // lang value must be a valid identifier
      if ( !ridentifier.test( lang || "" ) ) {
        find.error( "unsupported lang: " + lang );
      }
      lang = lang.replace( runescape, funescape ).toLowerCase();
      return function( elem ) {
        var elemLang;
        do {
          if ( ( elemLang = documentIsHTML ?
            elem.lang :
            elem.getAttribute( "xml:lang" ) || elem.getAttribute( "lang" ) ) ) {

            elemLang = elemLang.toLowerCase();
            return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
          }
        } while ( ( elem = elem.parentNode ) && elem.nodeType === 1 );
        return false;
      };
    } ),

    // Miscellaneous
    target: function( elem ) {
      var hash = window.location && window.location.hash;
      return hash && hash.slice( 1 ) === elem.id;
    },

    root: function( elem ) {
      return elem === documentElement;
    },

    focus: function( elem ) {
      return elem === safeActiveElement() &&
        document.hasFocus() &&
        !!( elem.type || elem.href || ~elem.tabIndex );
    },

    // Boolean properties
    enabled: createDisabledPseudo( false ),
    disabled: createDisabledPseudo( true ),

    checked: function( elem ) {

      // In CSS3, :checked should return both checked and selected elements
      // https://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
      return ( nodeName( elem, "input" ) && !!elem.checked ) ||
        ( nodeName( elem, "option" ) && !!elem.selected );
    },

    selected: function( elem ) {

      // Support: IE <=11+
      // Accessing the selectedIndex property
      // forces the browser to treat the default option as
      // selected when in an optgroup.
      if ( elem.parentNode ) {
        // eslint-disable-next-line no-unused-expressions
        elem.parentNode.selectedIndex;
      }

      return elem.selected === true;
    },

    // Contents
    empty: function( elem ) {

      // https://www.w3.org/TR/selectors/#empty-pseudo
      // :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
      //   but not by others (comment: 8; processing instruction: 7; etc.)
      // nodeType < 6 works because attributes (2) do not appear as children
      for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
        if ( elem.nodeType < 6 ) {
          return false;
        }
      }
      return true;
    },

    parent: function( elem ) {
      return !Expr.pseudos.empty( elem );
    },

    // Element/input types
    header: function( elem ) {
      return rheader.test( elem.nodeName );
    },

    input: function( elem ) {
      return rinputs.test( elem.nodeName );
    },

    button: function( elem ) {
      return nodeName( elem, "input" ) && elem.type === "button" ||
        nodeName( elem, "button" );
    },

    text: function( elem ) {
      var attr;
      return nodeName( elem, "input" ) && elem.type === "text" &&

        // Support: IE <10 only
        // New HTML5 attribute values (e.g., "search") appear
        // with elem.type === "text"
        ( ( attr = elem.getAttribute( "type" ) ) == null ||
          attr.toLowerCase() === "text" );
    },

    // Position-in-collection
    first: createPositionalPseudo( function() {
      return [ 0 ];
    } ),

    last: createPositionalPseudo( function( _matchIndexes, length ) {
      return [ length - 1 ];
    } ),

    eq: createPositionalPseudo( function( _matchIndexes, length, argument ) {
      return [ argument < 0 ? argument + length : argument ];
    } ),

    even: createPositionalPseudo( function( matchIndexes, length ) {
      var i = 0;
      for ( ; i < length; i += 2 ) {
        matchIndexes.push( i );
      }
      return matchIndexes;
    } ),

    odd: createPositionalPseudo( function( matchIndexes, length ) {
      var i = 1;
      for ( ; i < length; i += 2 ) {
        matchIndexes.push( i );
      }
      return matchIndexes;
    } ),

    lt: createPositionalPseudo( function( matchIndexes, length, argument ) {
      var i;

      if ( argument < 0 ) {
        i = argument + length;
      } else if ( argument > length ) {
        i = length;
      } else {
        i = argument;
      }

      for ( ; --i >= 0; ) {
        matchIndexes.push( i );
      }
      return matchIndexes;
    } ),

    gt: createPositionalPseudo( function( matchIndexes, length, argument ) {
      var i = argument < 0 ? argument + length : argument;
      for ( ; ++i < length; ) {
        matchIndexes.push( i );
      }
      return matchIndexes;
    } )
  }
};

Expr.pseudos.nth = Expr.pseudos.eq;

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
  Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
  Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

function tokenize( selector, parseOnly ) {
  var matched, match, tokens, type,
    soFar, groups, preFilters,
    cached = tokenCache[ selector + " " ];

  if ( cached ) {
    return parseOnly ? 0 : cached.slice( 0 );
  }

  soFar = selector;
  groups = [];
  preFilters = Expr.preFilter;

  while ( soFar ) {

    // Comma and first run
    if ( !matched || ( match = rcomma.exec( soFar ) ) ) {
      if ( match ) {

        // Don't consume trailing commas as valid
        soFar = soFar.slice( match[ 0 ].length ) || soFar;
      }
      groups.push( ( tokens = [] ) );
    }

    matched = false;

    // Combinators
    if ( ( match = rleadingCombinator.exec( soFar ) ) ) {
      matched = match.shift();
      tokens.push( {
        value: matched,

        // Cast descendant combinators to space
        type: match[ 0 ].replace( rtrimCSS, " " )
      } );
      soFar = soFar.slice( matched.length );
    }

    // Filters
    for ( type in Expr.filter ) {
      if ( ( match = matchExpr[ type ].exec( soFar ) ) && ( !preFilters[ type ] ||
        ( match = preFilters[ type ]( match ) ) ) ) {
        matched = match.shift();
        tokens.push( {
          value: matched,
          type: type,
          matches: match
        } );
        soFar = soFar.slice( matched.length );
      }
    }

    if ( !matched ) {
      break;
    }
  }

  // Return the length of the invalid excess
  // if we're just parsing
  // Otherwise, throw an error or return tokens
  if ( parseOnly ) {
    return soFar.length;
  }

  return soFar ?
    find.error( selector ) :

    // Cache the tokens
    tokenCache( selector, groups ).slice( 0 );
}

function toSelector( tokens ) {
  var i = 0,
    len = tokens.length,
    selector = "";
  for ( ; i < len; i++ ) {
    selector += tokens[ i ].value;
  }
  return selector;
}

function addCombinator( matcher, combinator, base ) {
  var dir = combinator.dir,
    skip = combinator.next,
    key = skip || dir,
    checkNonElements = base && key === "parentNode",
    doneName = done++;

  return combinator.first ?

    // Check against closest ancestor/preceding element
    function( elem, context, xml ) {
      while ( ( elem = elem[ dir ] ) ) {
        if ( elem.nodeType === 1 || checkNonElements ) {
          return matcher( elem, context, xml );
        }
      }
      return false;
    } :

    // Check against all ancestor/preceding elements
    function( elem, context, xml ) {
      var oldCache, outerCache,
        newCache = [ dirruns, doneName ];

      // We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
      if ( xml ) {
        while ( ( elem = elem[ dir ] ) ) {
          if ( elem.nodeType === 1 || checkNonElements ) {
            if ( matcher( elem, context, xml ) ) {
              return true;
            }
          }
        }
      } else {
        while ( ( elem = elem[ dir ] ) ) {
          if ( elem.nodeType === 1 || checkNonElements ) {
            outerCache = elem[ expando ] || ( elem[ expando ] = {} );

            if ( skip && nodeName( elem, skip ) ) {
              elem = elem[ dir ] || elem;
            } else if ( ( oldCache = outerCache[ key ] ) &&
              oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

              // Assign to newCache so results back-propagate to previous elements
              return ( newCache[ 2 ] = oldCache[ 2 ] );
            } else {

              // Reuse newcache so results back-propagate to previous elements
              outerCache[ key ] = newCache;

              // A match means we're done; a fail means we have to keep checking
              if ( ( newCache[ 2 ] = matcher( elem, context, xml ) ) ) {
                return true;
              }
            }
          }
        }
      }
      return false;
    };
}

function elementMatcher( matchers ) {
  return matchers.length > 1 ?
    function( elem, context, xml ) {
      var i = matchers.length;
      while ( i-- ) {
        if ( !matchers[ i ]( elem, context, xml ) ) {
          return false;
        }
      }
      return true;
    } :
    matchers[ 0 ];
}

function multipleContexts( selector, contexts, results ) {
  var i = 0,
    len = contexts.length;
  for ( ; i < len; i++ ) {
    find( selector, contexts[ i ], results );
  }
  return results;
}

function condense( unmatched, map, filter, context, xml ) {
  var elem,
    newUnmatched = [],
    i = 0,
    len = unmatched.length,
    mapped = map != null;

  for ( ; i < len; i++ ) {
    if ( ( elem = unmatched[ i ] ) ) {
      if ( !filter || filter( elem, context, xml ) ) {
        newUnmatched.push( elem );
        if ( mapped ) {
          map.push( i );
        }
      }
    }
  }

  return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
  if ( postFilter && !postFilter[ expando ] ) {
    postFilter = setMatcher( postFilter );
  }
  if ( postFinder && !postFinder[ expando ] ) {
    postFinder = setMatcher( postFinder, postSelector );
  }
  return markFunction( function( seed, results, context, xml ) {
    var temp, i, elem, matcherOut,
      preMap = [],
      postMap = [],
      preexisting = results.length,

      // Get initial elements from seed or context
      elems = seed ||
        multipleContexts( selector || "*",
          context.nodeType ? [ context ] : context, [] ),

      // Prefilter to get matcher input, preserving a map for seed-results synchronization
      matcherIn = preFilter && ( seed || !selector ) ?
        condense( elems, preMap, preFilter, context, xml ) :
        elems;

    if ( matcher ) {

      // If we have a postFinder, or filtered seed, or non-seed postFilter
      // or preexisting results,
      matcherOut = postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

        // ...intermediate processing is necessary
        [] :

        // ...otherwise use results directly
        results;

      // Find primary matches
      matcher( matcherIn, matcherOut, context, xml );
    } else {
      matcherOut = matcherIn;
    }

    // Apply postFilter
    if ( postFilter ) {
      temp = condense( matcherOut, postMap );
      postFilter( temp, [], context, xml );

      // Un-match failing elements by moving them back to matcherIn
      i = temp.length;
      while ( i-- ) {
        if ( ( elem = temp[ i ] ) ) {
          matcherOut[ postMap[ i ] ] = !( matcherIn[ postMap[ i ] ] = elem );
        }
      }
    }

    if ( seed ) {
      if ( postFinder || preFilter ) {
        if ( postFinder ) {

          // Get the final matcherOut by condensing this intermediate into postFinder contexts
          temp = [];
          i = matcherOut.length;
          while ( i-- ) {
            if ( ( elem = matcherOut[ i ] ) ) {

              // Restore matcherIn since elem is not yet a final match
              temp.push( ( matcherIn[ i ] = elem ) );
            }
          }
          postFinder( null, ( matcherOut = [] ), temp, xml );
        }

        // Move matched elements from seed to results to keep them synchronized
        i = matcherOut.length;
        while ( i-- ) {
          if ( ( elem = matcherOut[ i ] ) &&
            ( temp = postFinder ? indexOf.call( seed, elem ) : preMap[ i ] ) > -1 ) {

            seed[ temp ] = !( results[ temp ] = elem );
          }
        }
      }

    // Add elements to results, through postFinder if defined
    } else {
      matcherOut = condense(
        matcherOut === results ?
          matcherOut.splice( preexisting, matcherOut.length ) :
          matcherOut
      );
      if ( postFinder ) {
        postFinder( null, results, matcherOut, xml );
      } else {
        push.apply( results, matcherOut );
      }
    }
  } );
}

function matcherFromTokens( tokens ) {
  var checkContext, matcher, j,
    len = tokens.length,
    leadingRelative = Expr.relative[ tokens[ 0 ].type ],
    implicitRelative = leadingRelative || Expr.relative[ " " ],
    i = leadingRelative ? 1 : 0,

    // The foundational matcher ensures that elements are reachable from top-level context(s)
    matchContext = addCombinator( function( elem ) {
      return elem === checkContext;
    }, implicitRelative, true ),
    matchAnyContext = addCombinator( function( elem ) {
      return indexOf.call( checkContext, elem ) > -1;
    }, implicitRelative, true ),
    matchers = [ function( elem, context, xml ) {

      // Support: IE 11+, Edge 17 - 18+
      // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
      // two documents; shallow comparisons work.
      // eslint-disable-next-line eqeqeq
      var ret = ( !leadingRelative && ( xml || context != outermostContext ) ) || (
        ( checkContext = context ).nodeType ?
          matchContext( elem, context, xml ) :
          matchAnyContext( elem, context, xml ) );

      // Avoid hanging onto element
      // (see https://github.com/jquery/sizzle/issues/299)
      checkContext = null;
      return ret;
    } ];

  for ( ; i < len; i++ ) {
    if ( ( matcher = Expr.relative[ tokens[ i ].type ] ) ) {
      matchers = [ addCombinator( elementMatcher( matchers ), matcher ) ];
    } else {
      matcher = Expr.filter[ tokens[ i ].type ].apply( null, tokens[ i ].matches );

      // Return special upon seeing a positional matcher
      if ( matcher[ expando ] ) {

        // Find the next relative operator (if any) for proper handling
        j = ++i;
        for ( ; j < len; j++ ) {
          if ( Expr.relative[ tokens[ j ].type ] ) {
            break;
          }
        }
        return setMatcher(
          i > 1 && elementMatcher( matchers ),
          i > 1 && toSelector(

            // If the preceding token was a descendant combinator, insert an implicit any-element `*`
            tokens.slice( 0, i - 1 )
              .concat( { value: tokens[ i - 2 ].type === " " ? "*" : "" } )
          ).replace( rtrimCSS, "$1" ),
          matcher,
          i < j && matcherFromTokens( tokens.slice( i, j ) ),
          j < len && matcherFromTokens( ( tokens = tokens.slice( j ) ) ),
          j < len && toSelector( tokens )
        );
      }
      matchers.push( matcher );
    }
  }

  return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
  var bySet = setMatchers.length > 0,
    byElement = elementMatchers.length > 0,
    superMatcher = function( seed, context, xml, results, outermost ) {
      var elem, j, matcher,
        matchedCount = 0,
        i = "0",
        unmatched = seed && [],
        setMatched = [],
        contextBackup = outermostContext,

        // We must always have either seed elements or outermost context
        elems = seed || byElement && Expr.find.TAG( "*", outermost ),

        // Use integer dirruns iff this is the outermost matcher
        dirrunsUnique = ( dirruns += contextBackup == null ? 1 : Math.random() || 0.1 ),
        len = elems.length;

      if ( outermost ) {

        // Support: IE 11+, Edge 17 - 18+
        // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
        // two documents; shallow comparisons work.
        // eslint-disable-next-line eqeqeq
        outermostContext = context == document || context || outermost;
      }

      // Add elements passing elementMatchers directly to results
      // Support: iOS <=7 - 9 only
      // Tolerate NodeList properties (IE: "length"; Safari: <number>) matching
      // elements by id. (see trac-14142)
      for ( ; i !== len && ( elem = elems[ i ] ) != null; i++ ) {
        if ( byElement && elem ) {
          j = 0;

          // Support: IE 11+, Edge 17 - 18+
          // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
          // two documents; shallow comparisons work.
          // eslint-disable-next-line eqeqeq
          if ( !context && elem.ownerDocument != document ) {
            setDocument( elem );
            xml = !documentIsHTML;
          }
          while ( ( matcher = elementMatchers[ j++ ] ) ) {
            if ( matcher( elem, context || document, xml ) ) {
              push.call( results, elem );
              break;
            }
          }
          if ( outermost ) {
            dirruns = dirrunsUnique;
          }
        }

        // Track unmatched elements for set filters
        if ( bySet ) {

          // They will have gone through all possible matchers
          if ( ( elem = !matcher && elem ) ) {
            matchedCount--;
          }

          // Lengthen the array for every element, matched or not
          if ( seed ) {
            unmatched.push( elem );
          }
        }
      }

      // `i` is now the count of elements visited above, and adding it to `matchedCount`
      // makes the latter nonnegative.
      matchedCount += i;

      // Apply set filters to unmatched elements
      // NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
      // equals `i`), unless we didn't visit _any_ elements in the above loop because we have
      // no element matchers and no seed.
      // Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
      // case, which will result in a "00" `matchedCount` that differs from `i` but is also
      // numerically zero.
      if ( bySet && i !== matchedCount ) {
        j = 0;
        while ( ( matcher = setMatchers[ j++ ] ) ) {
          matcher( unmatched, setMatched, context, xml );
        }

        if ( seed ) {

          // Reintegrate element matches to eliminate the need for sorting
          if ( matchedCount > 0 ) {
            while ( i-- ) {
              if ( !( unmatched[ i ] || setMatched[ i ] ) ) {
                setMatched[ i ] = pop.call( results );
              }
            }
          }

          // Discard index placeholder values to get only actual matches
          setMatched = condense( setMatched );
        }

        // Add matches to results
        push.apply( results, setMatched );

        // Seedless set matches succeeding multiple successful matchers stipulate sorting
        if ( outermost && !seed && setMatched.length > 0 &&
          ( matchedCount + setMatchers.length ) > 1 ) {

          jQuery.uniqueSort( results );
        }
      }

      // Override manipulation of globals by nested matchers
      if ( outermost ) {
        dirruns = dirrunsUnique;
        outermostContext = contextBackup;
      }

      return unmatched;
    };

  return bySet ?
    markFunction( superMatcher ) :
    superMatcher;
}

function compile( selector, match /* Internal Use Only */ ) {
  var i,
    setMatchers = [],
    elementMatchers = [],
    cached = compilerCache[ selector + " " ];

  if ( !cached ) {

    // Generate a function of recursive functions that can be used to check each element
    if ( !match ) {
      match = tokenize( selector );
    }
    i = match.length;
    while ( i-- ) {
      cached = matcherFromTokens( match[ i ] );
      if ( cached[ expando ] ) {
        setMatchers.push( cached );
      } else {
        elementMatchers.push( cached );
      }
    }

    // Cache the compiled function
    cached = compilerCache( selector,
      matcherFromGroupMatchers( elementMatchers, setMatchers ) );

    // Save selector and tokenization
    cached.selector = selector;
  }
  return cached;
}

/**
 * A low-level selection function that works with jQuery's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with jQuery selector compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
function select( selector, context, results, seed ) {
  var i, tokens, token, type, find,
    compiled = typeof selector === "function" && selector,
    match = !seed && tokenize( ( selector = compiled.selector || selector ) );

  results = results || [];

  // Try to minimize operations if there is only one selector in the list and no seed
  // (the latter of which guarantees us context)
  if ( match.length === 1 ) {

    // Reduce context if the leading compound selector is an ID
    tokens = match[ 0 ] = match[ 0 ].slice( 0 );
    if ( tokens.length > 2 && ( token = tokens[ 0 ] ).type === "ID" &&
        context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[ 1 ].type ] ) {

      context = ( Expr.find.ID(
        token.matches[ 0 ].replace( runescape, funescape ),
        context
      ) || [] )[ 0 ];
      if ( !context ) {
        return results;

      // Precompiled matchers will still verify ancestry, so step up a level
      } else if ( compiled ) {
        context = context.parentNode;
      }

      selector = selector.slice( tokens.shift().value.length );
    }

    // Fetch a seed set for right-to-left matching
    i = matchExpr.needsContext.test( selector ) ? 0 : tokens.length;
    while ( i-- ) {
      token = tokens[ i ];

      // Abort if we hit a combinator
      if ( Expr.relative[ ( type = token.type ) ] ) {
        break;
      }
      if ( ( find = Expr.find[ type ] ) ) {

        // Search, expanding context for leading sibling combinators
        if ( ( seed = find(
          token.matches[ 0 ].replace( runescape, funescape ),
          rsibling.test( tokens[ 0 ].type ) &&
            testContext( context.parentNode ) || context
        ) ) ) {

          // If seed is empty or no tokens remain, we can return early
          tokens.splice( i, 1 );
          selector = seed.length && toSelector( tokens );
          if ( !selector ) {
            push.apply( results, seed );
            return results;
          }

          break;
        }
      }
    }
  }

  // Compile and execute a filtering function if one is not provided
  // Provide `match` to avoid retokenization if we modified the selector above
  ( compiled || compile( selector, match ) )(
    seed,
    context,
    !documentIsHTML,
    results,
    !context || rsibling.test( selector ) && testContext( context.parentNode ) || context
  );
  return results;
}

// One-time assignments

// Support: Android <=4.0 - 4.1+
// Sort stability
support.sortStable = expando.split( "" ).sort( sortOrder ).join( "" ) === expando;

// Initialize against the default document
setDocument();

// Support: Android <=4.0 - 4.1+
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert( function( el ) {

  // Should return 1, but returns 4 (following)
  return el.compareDocumentPosition( document.createElement( "fieldset" ) ) & 1;
} );

jQuery.find = find;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.unique = jQuery.uniqueSort;

// These have always been private, but they used to be documented as part of
// Sizzle so let's maintain them for now for backwards compatibility purposes.
find.compile = compile;
find.select = select;
find.setDocument = setDocument;
find.tokenize = tokenize;

find.escape = jQuery.escapeSelector;
find.getText = jQuery.text;
find.isXML = jQuery.isXMLDoc;
find.selectors = jQuery.expr;
find.support = jQuery.support;
find.uniqueSort = jQuery.uniqueSort;

  /* eslint-enable */

} )();


var dir = function( elem, dir, until ) {
  var matched = [],
    truncate = until !== undefined;

  while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
    if ( elem.nodeType === 1 ) {
      if ( truncate && jQuery( elem ).is( until ) ) {
        break;
      }
      matched.push( elem );
    }
  }
  return matched;
};


var siblings = function( n, elem ) {
  var matched = [];

  for ( ; n; n = n.nextSibling ) {
    if ( n.nodeType === 1 && n !== elem ) {
      matched.push( n );
    }
  }

  return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
  if ( isFunction( qualifier ) ) {
    return jQuery.grep( elements, function( elem, i ) {
      return !!qualifier.call( elem, i, elem ) !== not;
    } );
  }

  // Single element
  if ( qualifier.nodeType ) {
    return jQuery.grep( elements, function( elem ) {
      return ( elem === qualifier ) !== not;
    } );
  }

  // Arraylike of elements (jQuery, arguments, Array)
  if ( typeof qualifier !== "string" ) {
    return jQuery.grep( elements, function( elem ) {
      return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
    } );
  }

  // Filtered directly for both simple and complex selectors
  return jQuery.filter( qualifier, elements, not );
}

jQuery.filter = function( expr, elems, not ) {
  var elem = elems[ 0 ];

  if ( not ) {
    expr = ":not(" + expr + ")";
  }

  if ( elems.length === 1 && elem.nodeType === 1 ) {
    return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
  }

  return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
    return elem.nodeType === 1;
  } ) );
};

jQuery.fn.extend( {
  find: function( selector ) {
    var i, ret,
      len = this.length,
      self = this;

    if ( typeof selector !== "string" ) {
      return this.pushStack( jQuery( selector ).filter( function() {
        for ( i = 0; i < len; i++ ) {
          if ( jQuery.contains( self[ i ], this ) ) {
            return true;
          }
        }
      } ) );
    }

    ret = this.pushStack( [] );

    for ( i = 0; i < len; i++ ) {
      jQuery.find( selector, self[ i ], ret );
    }

    return len > 1 ? jQuery.uniqueSort( ret ) : ret;
  },
  filter: function( selector ) {
    return this.pushStack( winnow( this, selector || [], false ) );
  },
  not: function( selector ) {
    return this.pushStack( winnow( this, selector || [], true ) );
  },
  is: function( selector ) {
    return !!winnow(
      this,

      // If this is a positional/relative selector, check membership in the returned set
      // so $("p:first").is("p:last") won't return true for a doc with two "p".
      typeof selector === "string" && rneedsContext.test( selector ) ?
        jQuery( selector ) :
        selector || [],
      false
    ).length;
  }
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

  // A simple way to check for HTML strings
  // Prioritize #id over <tag> to avoid XSS via location.hash (trac-9521)
  // Strict HTML recognition (trac-11290: must start with <)
  // Shortcut simple #id case for speed
  rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

  init = jQuery.fn.init = function( selector, context, root ) {
    var match, elem;

    // HANDLE: $(""), $(null), $(undefined), $(false)
    if ( !selector ) {
      return this;
    }

    // Method init() accepts an alternate rootjQuery
    // so migrate can support jQuery.sub (gh-2101)
    root = root || rootjQuery;

    // Handle HTML strings
    if ( typeof selector === "string" ) {
      if ( selector[ 0 ] === "<" &&
        selector[ selector.length - 1 ] === ">" &&
        selector.length >= 3 ) {

        // Assume that strings that start and end with <> are HTML and skip the regex check
        match = [ null, selector, null ];

      } else {
        match = rquickExpr.exec( selector );
      }

      // Match html or make sure no context is specified for #id
      if ( match && ( match[ 1 ] || !context ) ) {

        // HANDLE: $(html) -> $(array)
        if ( match[ 1 ] ) {
          context = context instanceof jQuery ? context[ 0 ] : context;

          // Option to run scripts is true for back-compat
          // Intentionally let the error be thrown if parseHTML is not present
          jQuery.merge( this, jQuery.parseHTML(
            match[ 1 ],
            context && context.nodeType ? context.ownerDocument || context : document,
            true
          ) );

          // HANDLE: $(html, props)
          if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
            for ( match in context ) {

              // Properties of context are called as methods if possible
              if ( isFunction( this[ match ] ) ) {
                this[ match ]( context[ match ] );

              // ...and otherwise set as attributes
              } else {
                this.attr( match, context[ match ] );
              }
            }
          }

          return this;

        // HANDLE: $(#id)
        } else {
          elem = document.getElementById( match[ 2 ] );

          if ( elem ) {

            // Inject the element directly into the jQuery object
            this[ 0 ] = elem;
            this.length = 1;
          }
          return this;
        }

      // HANDLE: $(expr, $(...))
      } else if ( !context || context.jquery ) {
        return ( context || root ).find( selector );

      // HANDLE: $(expr, context)
      // (which is just equivalent to: $(context).find(expr)
      } else {
        return this.constructor( context ).find( selector );
      }

    // HANDLE: $(DOMElement)
    } else if ( selector.nodeType ) {
      this[ 0 ] = selector;
      this.length = 1;
      return this;

    // HANDLE: $(function)
    // Shortcut for document ready
    } else if ( isFunction( selector ) ) {
      return root.ready !== undefined ?
        root.ready( selector ) :

        // Execute immediately if ready is not present
        selector( jQuery );
    }

    return jQuery.makeArray( selector, this );
  };

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

  // Methods guaranteed to produce a unique set when starting from a unique set
  guaranteedUnique = {
    children: true,
    contents: true,
    next: true,
    prev: true
  };

jQuery.fn.extend( {
  has: function( target ) {
    var targets = jQuery( target, this ),
      l = targets.length;

    return this.filter( function() {
      var i = 0;
      for ( ; i < l; i++ ) {
        if ( jQuery.contains( this, targets[ i ] ) ) {
          return true;
        }
      }
    } );
  },

  closest: function( selectors, context ) {
    var cur,
      i = 0,
      l = this.length,
      matched = [],
      targets = typeof selectors !== "string" && jQuery( selectors );

    // Positional selectors never match, since there's no _selection_ context
    if ( !rneedsContext.test( selectors ) ) {
      for ( ; i < l; i++ ) {
        for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

          // Always skip document fragments
          if ( cur.nodeType < 11 && ( targets ?
            targets.index( cur ) > -1 :

            // Don't pass non-elements to jQuery#find
            cur.nodeType === 1 &&
              jQuery.find.matchesSelector( cur, selectors ) ) ) {

            matched.push( cur );
            break;
          }
        }
      }
    }

    return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
  },

  // Determine the position of an element within the set
  index: function( elem ) {

    // No argument, return index in parent
    if ( !elem ) {
      return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
    }

    // Index in selector
    if ( typeof elem === "string" ) {
      return indexOf.call( jQuery( elem ), this[ 0 ] );
    }

    // Locate the position of the desired element
    return indexOf.call( this,

      // If it receives a jQuery object, the first element is used
      elem.jquery ? elem[ 0 ] : elem
    );
  },

  add: function( selector, context ) {
    return this.pushStack(
      jQuery.uniqueSort(
        jQuery.merge( this.get(), jQuery( selector, context ) )
      )
    );
  },

  addBack: function( selector ) {
    return this.add( selector == null ?
      this.prevObject : this.prevObject.filter( selector )
    );
  }
} );

function sibling( cur, dir ) {
  while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
  return cur;
}

jQuery.each( {
  parent: function( elem ) {
    var parent = elem.parentNode;
    return parent && parent.nodeType !== 11 ? parent : null;
  },
  parents: function( elem ) {
    return dir( elem, "parentNode" );
  },
  parentsUntil: function( elem, _i, until ) {
    return dir( elem, "parentNode", until );
  },
  next: function( elem ) {
    return sibling( elem, "nextSibling" );
  },
  prev: function( elem ) {
    return sibling( elem, "previousSibling" );
  },
  nextAll: function( elem ) {
    return dir( elem, "nextSibling" );
  },
  prevAll: function( elem ) {
    return dir( elem, "previousSibling" );
  },
  nextUntil: function( elem, _i, until ) {
    return dir( elem, "nextSibling", until );
  },
  prevUntil: function( elem, _i, until ) {
    return dir( elem, "previousSibling", until );
  },
  siblings: function( elem ) {
    return siblings( ( elem.parentNode || {} ).firstChild, elem );
  },
  children: function( elem ) {
    return siblings( elem.firstChild );
  },
  contents: function( elem ) {
    if ( elem.contentDocument != null &&

      // Support: IE 11+
      // <object> elements with no `data` attribute has an object
      // `contentDocument` with a `null` prototype.
      getProto( elem.contentDocument ) ) {

      return elem.contentDocument;
    }

    // Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
    // Treat the template element as a regular one in browsers that
    // don't support it.
    if ( nodeName( elem, "template" ) ) {
      elem = elem.content || elem;
    }

    return jQuery.merge( [], elem.childNodes );
  }
}, function( name, fn ) {
  jQuery.fn[ name ] = function( until, selector ) {
    var matched = jQuery.map( this, fn, until );

    if ( name.slice( -5 ) !== "Until" ) {
      selector = until;
    }

    if ( selector && typeof selector === "string" ) {
      matched = jQuery.filter( selector, matched );
    }

    if ( this.length > 1 ) {

      // Remove duplicates
      if ( !guaranteedUnique[ name ] ) {
        jQuery.uniqueSort( matched );
      }

      // Reverse order for parents* and prev-derivatives
      if ( rparentsprev.test( name ) ) {
        matched.reverse();
      }
    }

    return this.pushStack( matched );
  };
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
  var object = {};
  jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
    object[ flag ] = true;
  } );
  return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *  options: an optional list of space-separated options that will change how
 *      the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *  once:      will ensure the callback list can only be fired once (like a Deferred)
 *
 *  memory:      will keep track of previous values and will call any callback added
 *          after the list has been fired right away with the latest "memorized"
 *          values (like a Deferred)
 *
 *  unique:      will ensure a callback can only be added once (no duplicate in the list)
 *
 *  stopOnFalse:  interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

  // Convert options from String-formatted to Object-formatted if needed
  // (we check in cache first)
  options = typeof options === "string" ?
    createOptions( options ) :
    jQuery.extend( {}, options );

  var // Flag to know if list is currently firing
    firing,

    // Last fire value for non-forgettable lists
    memory,

    // Flag to know if list was already fired
    fired,

    // Flag to prevent firing
    locked,

    // Actual callback list
    list = [],

    // Queue of execution data for repeatable lists
    queue = [],

    // Index of currently firing callback (modified by add/remove as needed)
    firingIndex = -1,

    // Fire callbacks
    fire = function() {

      // Enforce single-firing
      locked = locked || options.once;

      // Execute callbacks for all pending executions,
      // respecting firingIndex overrides and runtime changes
      fired = firing = true;
      for ( ; queue.length; firingIndex = -1 ) {
        memory = queue.shift();
        while ( ++firingIndex < list.length ) {

          // Run callback and check for early termination
          if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
            options.stopOnFalse ) {

            // Jump to end and forget the data so .add doesn't re-fire
            firingIndex = list.length;
            memory = false;
          }
        }
      }

      // Forget the data if we're done with it
      if ( !options.memory ) {
        memory = false;
      }

      firing = false;

      // Clean up if we're done firing for good
      if ( locked ) {

        // Keep an empty list if we have data for future add calls
        if ( memory ) {
          list = [];

        // Otherwise, this object is spent
        } else {
          list = "";
        }
      }
    },

    // Actual Callbacks object
    self = {

      // Add a callback or a collection of callbacks to the list
      add: function() {
        if ( list ) {

          // If we have memory from a past run, we should fire after adding
          if ( memory && !firing ) {
            firingIndex = list.length - 1;
            queue.push( memory );
          }

          ( function add( args ) {
            jQuery.each( args, function( _, arg ) {
              if ( isFunction( arg ) ) {
                if ( !options.unique || !self.has( arg ) ) {
                  list.push( arg );
                }
              } else if ( arg && arg.length && toType( arg ) !== "string" ) {

                // Inspect recursively
                add( arg );
              }
            } );
          } )( arguments );

          if ( memory && !firing ) {
            fire();
          }
        }
        return this;
      },

      // Remove a callback from the list
      remove: function() {
        jQuery.each( arguments, function( _, arg ) {
          var index;
          while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
            list.splice( index, 1 );

            // Handle firing indexes
            if ( index <= firingIndex ) {
              firingIndex--;
            }
          }
        } );
        return this;
      },

      // Check if a given callback is in the list.
      // If no argument is given, return whether or not list has callbacks attached.
      has: function( fn ) {
        return fn ?
          jQuery.inArray( fn, list ) > -1 :
          list.length > 0;
      },

      // Remove all callbacks from the list
      empty: function() {
        if ( list ) {
          list = [];
        }
        return this;
      },

      // Disable .fire and .add
      // Abort any current/pending executions
      // Clear all callbacks and values
      disable: function() {
        locked = queue = [];
        list = memory = "";
        return this;
      },
      disabled: function() {
        return !list;
      },

      // Disable .fire
      // Also disable .add unless we have memory (since it would have no effect)
      // Abort any pending executions
      lock: function() {
        locked = queue = [];
        if ( !memory && !firing ) {
          list = memory = "";
        }
        return this;
      },
      locked: function() {
        return !!locked;
      },

      // Call all callbacks with the given context and arguments
      fireWith: function( context, args ) {
        if ( !locked ) {
          args = args || [];
          args = [ context, args.slice ? args.slice() : args ];
          queue.push( args );
          if ( !firing ) {
            fire();
          }
        }
        return this;
      },

      // Call all the callbacks with the given arguments
      fire: function() {
        self.fireWith( this, arguments );
        return this;
      },

      // To know if the callbacks have already been called at least once
      fired: function() {
        return !!fired;
      }
    };

  return self;
};


function Identity( v ) {
  return v;
}
function Thrower( ex ) {
  throw ex;
}

function adoptValue( value, resolve, reject, noValue ) {
  var method;

  try {

    // Check for promise aspect first to privilege synchronous behavior
    if ( value && isFunction( ( method = value.promise ) ) ) {
      method.call( value ).done( resolve ).fail( reject );

    // Other thenables
    } else if ( value && isFunction( ( method = value.then ) ) ) {
      method.call( value, resolve, reject );

    // Other non-thenables
    } else {

      // Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
      // * false: [ value ].slice( 0 ) => resolve( value )
      // * true: [ value ].slice( 1 ) => resolve()
      resolve.apply( undefined, [ value ].slice( noValue ) );
    }

  // For Promises/A+, convert exceptions into rejections
  // Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
  // Deferred#then to conditionally suppress rejection.
  } catch ( value ) {

    // Support: Android 4.0 only
    // Strict mode functions invoked without .call/.apply get global-object context
    reject.apply( undefined, [ value ] );
  }
}

jQuery.extend( {

  Deferred: function( func ) {
    var tuples = [

        // action, add listener, callbacks,
        // ... .then handlers, argument index, [final state]
        [ "notify", "progress", jQuery.Callbacks( "memory" ),
          jQuery.Callbacks( "memory" ), 2 ],
        [ "resolve", "done", jQuery.Callbacks( "once memory" ),
          jQuery.Callbacks( "once memory" ), 0, "resolved" ],
        [ "reject", "fail", jQuery.Callbacks( "once memory" ),
          jQuery.Callbacks( "once memory" ), 1, "rejected" ]
      ],
      state = "pending",
      promise = {
        state: function() {
          return state;
        },
        always: function() {
          deferred.done( arguments ).fail( arguments );
          return this;
        },
        "catch": function( fn ) {
          return promise.then( null, fn );
        },

        // Keep pipe for back-compat
        pipe: function( /* fnDone, fnFail, fnProgress */ ) {
          var fns = arguments;

          return jQuery.Deferred( function( newDefer ) {
            jQuery.each( tuples, function( _i, tuple ) {

              // Map tuples (progress, done, fail) to arguments (done, fail, progress)
              var fn = isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

              // deferred.progress(function() { bind to newDefer or newDefer.notify })
              // deferred.done(function() { bind to newDefer or newDefer.resolve })
              // deferred.fail(function() { bind to newDefer or newDefer.reject })
              deferred[ tuple[ 1 ] ]( function() {
                var returned = fn && fn.apply( this, arguments );
                if ( returned && isFunction( returned.promise ) ) {
                  returned.promise()
                    .progress( newDefer.notify )
                    .done( newDefer.resolve )
                    .fail( newDefer.reject );
                } else {
                  newDefer[ tuple[ 0 ] + "With" ](
                    this,
                    fn ? [ returned ] : arguments
                  );
                }
              } );
            } );
            fns = null;
          } ).promise();
        },
        then: function( onFulfilled, onRejected, onProgress ) {
          var maxDepth = 0;
          function resolve( depth, deferred, handler, special ) {
            return function() {
              var that = this,
                args = arguments,
                mightThrow = function() {
                  var returned, then;

                  // Support: Promises/A+ section 2.3.3.3.3
                  // https://promisesaplus.com/#point-59
                  // Ignore double-resolution attempts
                  if ( depth < maxDepth ) {
                    return;
                  }

                  returned = handler.apply( that, args );

                  // Support: Promises/A+ section 2.3.1
                  // https://promisesaplus.com/#point-48
                  if ( returned === deferred.promise() ) {
                    throw new TypeError( "Thenable self-resolution" );
                  }

                  // Support: Promises/A+ sections 2.3.3.1, 3.5
                  // https://promisesaplus.com/#point-54
                  // https://promisesaplus.com/#point-75
                  // Retrieve `then` only once
                  then = returned &&

                    // Support: Promises/A+ section 2.3.4
                    // https://promisesaplus.com/#point-64
                    // Only check objects and functions for thenability
                    ( typeof returned === "object" ||
                      typeof returned === "function" ) &&
                    returned.then;

                  // Handle a returned thenable
                  if ( isFunction( then ) ) {

                    // Special processors (notify) just wait for resolution
                    if ( special ) {
                      then.call(
                        returned,
                        resolve( maxDepth, deferred, Identity, special ),
                        resolve( maxDepth, deferred, Thrower, special )
                      );

                    // Normal processors (resolve) also hook into progress
                    } else {

                      // ...and disregard older resolution values
                      maxDepth++;

                      then.call(
                        returned,
                        resolve( maxDepth, deferred, Identity, special ),
                        resolve( maxDepth, deferred, Thrower, special ),
                        resolve( maxDepth, deferred, Identity,
                          deferred.notifyWith )
                      );
                    }

                  // Handle all other returned values
                  } else {

                    // Only substitute handlers pass on context
                    // and multiple values (non-spec behavior)
                    if ( handler !== Identity ) {
                      that = undefined;
                      args = [ returned ];
                    }

                    // Process the value(s)
                    // Default process is resolve
                    ( special || deferred.resolveWith )( that, args );
                  }
                },

                // Only normal processors (resolve) catch and reject exceptions
                process = special ?
                  mightThrow :
                  function() {
                    try {
                      mightThrow();
                    } catch ( e ) {

                      if ( jQuery.Deferred.exceptionHook ) {
                        jQuery.Deferred.exceptionHook( e,
                          process.error );
                      }

                      // Support: Promises/A+ section 2.3.3.3.4.1
                      // https://promisesaplus.com/#point-61
                      // Ignore post-resolution exceptions
                      if ( depth + 1 >= maxDepth ) {

                        // Only substitute handlers pass on context
                        // and multiple values (non-spec behavior)
                        if ( handler !== Thrower ) {
                          that = undefined;
                          args = [ e ];
                        }

                        deferred.rejectWith( that, args );
                      }
                    }
                  };

              // Support: Promises/A+ section 2.3.3.3.1
              // https://promisesaplus.com/#point-57
              // Re-resolve promises immediately to dodge false rejection from
              // subsequent errors
              if ( depth ) {
                process();
              } else {

                // Call an optional hook to record the error, in case of exception
                // since it's otherwise lost when execution goes async
                if ( jQuery.Deferred.getErrorHook ) {
                  process.error = jQuery.Deferred.getErrorHook();

                // The deprecated alias of the above. While the name suggests
                // returning the stack, not an error instance, jQuery just passes
                // it directly to `console.warn` so both will work; an instance
                // just better cooperates with source maps.
                } else if ( jQuery.Deferred.getStackHook ) {
                  process.error = jQuery.Deferred.getStackHook();
                }
                window.setTimeout( process );
              }
            };
          }

          return jQuery.Deferred( function( newDefer ) {

            // progress_handlers.add( ... )
            tuples[ 0 ][ 3 ].add(
              resolve(
                0,
                newDefer,
                isFunction( onProgress ) ?
                  onProgress :
                  Identity,
                newDefer.notifyWith
              )
            );

            // fulfilled_handlers.add( ... )
            tuples[ 1 ][ 3 ].add(
              resolve(
                0,
                newDefer,
                isFunction( onFulfilled ) ?
                  onFulfilled :
                  Identity
              )
            );

            // rejected_handlers.add( ... )
            tuples[ 2 ][ 3 ].add(
              resolve(
                0,
                newDefer,
                isFunction( onRejected ) ?
                  onRejected :
                  Thrower
              )
            );
          } ).promise();
        },

        // Get a promise for this deferred
        // If obj is provided, the promise aspect is added to the object
        promise: function( obj ) {
          return obj != null ? jQuery.extend( obj, promise ) : promise;
        }
      },
      deferred = {};

    // Add list-specific methods
    jQuery.each( tuples, function( i, tuple ) {
      var list = tuple[ 2 ],
        stateString = tuple[ 5 ];

      // promise.progress = list.add
      // promise.done = list.add
      // promise.fail = list.add
      promise[ tuple[ 1 ] ] = list.add;

      // Handle state
      if ( stateString ) {
        list.add(
          function() {

            // state = "resolved" (i.e., fulfilled)
            // state = "rejected"
            state = stateString;
          },

          // rejected_callbacks.disable
          // fulfilled_callbacks.disable
          tuples[ 3 - i ][ 2 ].disable,

          // rejected_handlers.disable
          // fulfilled_handlers.disable
          tuples[ 3 - i ][ 3 ].disable,

          // progress_callbacks.lock
          tuples[ 0 ][ 2 ].lock,

          // progress_handlers.lock
          tuples[ 0 ][ 3 ].lock
        );
      }

      // progress_handlers.fire
      // fulfilled_handlers.fire
      // rejected_handlers.fire
      list.add( tuple[ 3 ].fire );

      // deferred.notify = function() { deferred.notifyWith(...) }
      // deferred.resolve = function() { deferred.resolveWith(...) }
      // deferred.reject = function() { deferred.rejectWith(...) }
      deferred[ tuple[ 0 ] ] = function() {
        deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
        return this;
      };

      // deferred.notifyWith = list.fireWith
      // deferred.resolveWith = list.fireWith
      // deferred.rejectWith = list.fireWith
      deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
    } );

    // Make the deferred a promise
    promise.promise( deferred );

    // Call given func if any
    if ( func ) {
      func.call( deferred, deferred );
    }

    // All done!
    return deferred;
  },

  // Deferred helper
  when: function( singleValue ) {
    var

      // count of uncompleted subordinates
      remaining = arguments.length,

      // count of unprocessed arguments
      i = remaining,

      // subordinate fulfillment data
      resolveContexts = Array( i ),
      resolveValues = slice.call( arguments ),

      // the primary Deferred
      primary = jQuery.Deferred(),

      // subordinate callback factory
      updateFunc = function( i ) {
        return function( value ) {
          resolveContexts[ i ] = this;
          resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
          if ( !( --remaining ) ) {
            primary.resolveWith( resolveContexts, resolveValues );
          }
        };
      };

    // Single- and empty arguments are adopted like Promise.resolve
    if ( remaining <= 1 ) {
      adoptValue( singleValue, primary.done( updateFunc( i ) ).resolve, primary.reject,
        !remaining );

      // Use .then() to unwrap secondary thenables (cf. gh-3000)
      if ( primary.state() === "pending" ||
        isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

        return primary.then();
      }
    }

    // Multiple arguments are aggregated like Promise.all array elements
    while ( i-- ) {
      adoptValue( resolveValues[ i ], updateFunc( i ), primary.reject );
    }

    return primary.promise();
  }
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

// If `jQuery.Deferred.getErrorHook` is defined, `asyncError` is an error
// captured before the async barrier to get the original error cause
// which may otherwise be hidden.
jQuery.Deferred.exceptionHook = function( error, asyncError ) {

  // Support: IE 8 - 9 only
  // Console exists when dev tools are open, which can happen at any time
  if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
    window.console.warn( "jQuery.Deferred exception: " + error.message,
      error.stack, asyncError );
  }
};




jQuery.readyException = function( error ) {
  window.setTimeout( function() {
    throw error;
  } );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

  readyList
    .then( fn )

    // Wrap jQuery.readyException in a function so that the lookup
    // happens at the time of error handling instead of callback
    // registration.
    .catch( function( error ) {
      jQuery.readyException( error );
    } );

  return this;
};

jQuery.extend( {

  // Is the DOM ready to be used? Set to true once it occurs.
  isReady: false,

  // A counter to track how many items to wait for before
  // the ready event fires. See trac-6781
  readyWait: 1,

  // Handle when the DOM is ready
  ready: function( wait ) {

    // Abort if there are pending holds or we're already ready
    if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
      return;
    }

    // Remember that the DOM is ready
    jQuery.isReady = true;

    // If a normal DOM Ready event fired, decrement, and wait if need be
    if ( wait !== true && --jQuery.readyWait > 0 ) {
      return;
    }

    // If there are functions bound, to execute
    readyList.resolveWith( document, [ jQuery ] );
  }
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
  document.removeEventListener( "DOMContentLoaded", completed );
  window.removeEventListener( "load", completed );
  jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
  ( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

  // Handle it asynchronously to allow scripts the opportunity to delay ready
  window.setTimeout( jQuery.ready );

} else {

  // Use the handy event callback
  document.addEventListener( "DOMContentLoaded", completed );

  // A fallback to window.onload, that will always work
  window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
  var i = 0,
    len = elems.length,
    bulk = key == null;

  // Sets many values
  if ( toType( key ) === "object" ) {
    chainable = true;
    for ( i in key ) {
      access( elems, fn, i, key[ i ], true, emptyGet, raw );
    }

  // Sets one value
  } else if ( value !== undefined ) {
    chainable = true;

    if ( !isFunction( value ) ) {
      raw = true;
    }

    if ( bulk ) {

      // Bulk operations run against the entire set
      if ( raw ) {
        fn.call( elems, value );
        fn = null;

      // ...except when executing function values
      } else {
        bulk = fn;
        fn = function( elem, _key, value ) {
          return bulk.call( jQuery( elem ), value );
        };
      }
    }

    if ( fn ) {
      for ( ; i < len; i++ ) {
        fn(
          elems[ i ], key, raw ?
            value :
            value.call( elems[ i ], i, fn( elems[ i ], key ) )
        );
      }
    }
  }

  if ( chainable ) {
    return elems;
  }

  // Gets
  if ( bulk ) {
    return fn.call( elems );
  }

  return len ? fn( elems[ 0 ], key ) : emptyGet;
};


// Matches dashed string for camelizing
var rmsPrefix = /^-ms-/,
  rdashAlpha = /-([a-z])/g;

// Used by camelCase as callback to replace()
function fcamelCase( _all, letter ) {
  return letter.toUpperCase();
}

// Convert dashed to camelCase; used by the css and data modules
// Support: IE <=9 - 11, Edge 12 - 15
// Microsoft forgot to hump their vendor prefix (trac-9572)
function camelCase( string ) {
  return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
}
var acceptData = function( owner ) {

  // Accepts only:
  //  - Node
  //    - Node.ELEMENT_NODE
  //    - Node.DOCUMENT_NODE
  //  - Object
  //    - Any
  return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
  this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

  cache: function( owner ) {

    // Check if the owner object already has a cache
    var value = owner[ this.expando ];

    // If not, create one
    if ( !value ) {
      value = {};

      // We can accept data for non-element nodes in modern browsers,
      // but we should not, see trac-8335.
      // Always return an empty object.
      if ( acceptData( owner ) ) {

        // If it is a node unlikely to be stringify-ed or looped over
        // use plain assignment
        if ( owner.nodeType ) {
          owner[ this.expando ] = value;

        // Otherwise secure it in a non-enumerable property
        // configurable must be true to allow the property to be
        // deleted when data is removed
        } else {
          Object.defineProperty( owner, this.expando, {
            value: value,
            configurable: true
          } );
        }
      }
    }

    return value;
  },
  set: function( owner, data, value ) {
    var prop,
      cache = this.cache( owner );

    // Handle: [ owner, key, value ] args
    // Always use camelCase key (gh-2257)
    if ( typeof data === "string" ) {
      cache[ camelCase( data ) ] = value;

    // Handle: [ owner, { properties } ] args
    } else {

      // Copy the properties one-by-one to the cache object
      for ( prop in data ) {
        cache[ camelCase( prop ) ] = data[ prop ];
      }
    }
    return cache;
  },
  get: function( owner, key ) {
    return key === undefined ?
      this.cache( owner ) :

      // Always use camelCase key (gh-2257)
      owner[ this.expando ] && owner[ this.expando ][ camelCase( key ) ];
  },
  access: function( owner, key, value ) {

    // In cases where either:
    //
    //   1. No key was specified
    //   2. A string key was specified, but no value provided
    //
    // Take the "read" path and allow the get method to determine
    // which value to return, respectively either:
    //
    //   1. The entire cache object
    //   2. The data stored at the key
    //
    if ( key === undefined ||
        ( ( key && typeof key === "string" ) && value === undefined ) ) {

      return this.get( owner, key );
    }

    // When the key is not a string, or both a key and value
    // are specified, set or extend (existing objects) with either:
    //
    //   1. An object of properties
    //   2. A key and value
    //
    this.set( owner, key, value );

    // Since the "set" path can have two possible entry points
    // return the expected data based on which path was taken[*]
    return value !== undefined ? value : key;
  },
  remove: function( owner, key ) {
    var i,
      cache = owner[ this.expando ];

    if ( cache === undefined ) {
      return;
    }

    if ( key !== undefined ) {

      // Support array or space separated string of keys
      if ( Array.isArray( key ) ) {

        // If key is an array of keys...
        // We always set camelCase keys, so remove that.
        key = key.map( camelCase );
      } else {
        key = camelCase( key );

        // If a key with the spaces exists, use it.
        // Otherwise, create an array by matching non-whitespace
        key = key in cache ?
          [ key ] :
          ( key.match( rnothtmlwhite ) || [] );
      }

      i = key.length;

      while ( i-- ) {
        delete cache[ key[ i ] ];
      }
    }

    // Remove the expando if there's no more data
    if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

      // Support: Chrome <=35 - 45
      // Webkit & Blink performance suffers when deleting properties
      // from DOM nodes, so set to undefined instead
      // https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
      if ( owner.nodeType ) {
        owner[ this.expando ] = undefined;
      } else {
        delete owner[ this.expando ];
      }
    }
  },
  hasData: function( owner ) {
    var cache = owner[ this.expando ];
    return cache !== undefined && !jQuery.isEmptyObject( cache );
  }
};
var dataPriv = new Data();

var dataUser = new Data();



//  Implementation Summary
//
//  1. Enforce API surface and semantic compatibility with 1.9.x branch
//  2. Improve the module's maintainability by reducing the storage
//    paths to a single mechanism.
//  3. Use the same single mechanism to support "private" and "user" data.
//  4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//  5. Avoid exposing implementation details on user objects (eg. expando properties)
//  6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
  rmultiDash = /[A-Z]/g;

function getData( data ) {
  if ( data === "true" ) {
    return true;
  }

  if ( data === "false" ) {
    return false;
  }

  if ( data === "null" ) {
    return null;
  }

  // Only convert to a number if it doesn't change the string
  if ( data === +data + "" ) {
    return +data;
  }

  if ( rbrace.test( data ) ) {
    return JSON.parse( data );
  }

  return data;
}

function dataAttr( elem, key, data ) {
  var name;

  // If nothing was found internally, try to fetch any
  // data from the HTML5 data-* attribute
  if ( data === undefined && elem.nodeType === 1 ) {
    name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
    data = elem.getAttribute( name );

    if ( typeof data === "string" ) {
      try {
        data = getData( data );
      } catch ( e ) {}

      // Make sure we set the data so it isn't changed later
      dataUser.set( elem, key, data );
    } else {
      data = undefined;
    }
  }
  return data;
}

jQuery.extend( {
  hasData: function( elem ) {
    return dataUser.hasData( elem ) || dataPriv.hasData( elem );
  },

  data: function( elem, name, data ) {
    return dataUser.access( elem, name, data );
  },

  removeData: function( elem, name ) {
    dataUser.remove( elem, name );
  },

  // TODO: Now that all calls to _data and _removeData have been replaced
  // with direct calls to dataPriv methods, these can be deprecated.
  _data: function( elem, name, data ) {
    return dataPriv.access( elem, name, data );
  },

  _removeData: function( elem, name ) {
    dataPriv.remove( elem, name );
  }
} );

jQuery.fn.extend( {
  data: function( key, value ) {
    var i, name, data,
      elem = this[ 0 ],
      attrs = elem && elem.attributes;

    // Gets all values
    if ( key === undefined ) {
      if ( this.length ) {
        data = dataUser.get( elem );

        if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
          i = attrs.length;
          while ( i-- ) {

            // Support: IE 11 only
            // The attrs elements can be null (trac-14894)
            if ( attrs[ i ] ) {
              name = attrs[ i ].name;
              if ( name.indexOf( "data-" ) === 0 ) {
                name = camelCase( name.slice( 5 ) );
                dataAttr( elem, name, data[ name ] );
              }
            }
          }
          dataPriv.set( elem, "hasDataAttrs", true );
        }
      }

      return data;
    }

    // Sets multiple values
    if ( typeof key === "object" ) {
      return this.each( function() {
        dataUser.set( this, key );
      } );
    }

    return access( this, function( value ) {
      var data;

      // The calling jQuery object (element matches) is not empty
      // (and therefore has an element appears at this[ 0 ]) and the
      // `value` parameter was not undefined. An empty jQuery object
      // will result in `undefined` for elem = this[ 0 ] which will
      // throw an exception if an attempt to read a data cache is made.
      if ( elem && value === undefined ) {

        // Attempt to get data from the cache
        // The key will always be camelCased in Data
        data = dataUser.get( elem, key );
        if ( data !== undefined ) {
          return data;
        }

        // Attempt to "discover" the data in
        // HTML5 custom data-* attrs
        data = dataAttr( elem, key );
        if ( data !== undefined ) {
          return data;
        }

        // We tried really hard, but the data doesn't exist.
        return;
      }

      // Set the data...
      this.each( function() {

        // We always store the camelCased key
        dataUser.set( this, key, value );
      } );
    }, null, value, arguments.length > 1, null, true );
  },

  removeData: function( key ) {
    return this.each( function() {
      dataUser.remove( this, key );
    } );
  }
} );


jQuery.extend( {
  queue: function( elem, type, data ) {
    var queue;

    if ( elem ) {
      type = ( type || "fx" ) + "queue";
      queue = dataPriv.get( elem, type );

      // Speed up dequeue by getting out quickly if this is just a lookup
      if ( data ) {
        if ( !queue || Array.isArray( data ) ) {
          queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
        } else {
          queue.push( data );
        }
      }
      return queue || [];
    }
  },

  dequeue: function( elem, type ) {
    type = type || "fx";

    var queue = jQuery.queue( elem, type ),
      startLength = queue.length,
      fn = queue.shift(),
      hooks = jQuery._queueHooks( elem, type ),
      next = function() {
        jQuery.dequeue( elem, type );
      };

    // If the fx queue is dequeued, always remove the progress sentinel
    if ( fn === "inprogress" ) {
      fn = queue.shift();
      startLength--;
    }

    if ( fn ) {

      // Add a progress sentinel to prevent the fx queue from being
      // automatically dequeued
      if ( type === "fx" ) {
        queue.unshift( "inprogress" );
      }

      // Clear up the last queue stop function
      delete hooks.stop;
      fn.call( elem, next, hooks );
    }

    if ( !startLength && hooks ) {
      hooks.empty.fire();
    }
  },

  // Not public - generate a queueHooks object, or return the current one
  _queueHooks: function( elem, type ) {
    var key = type + "queueHooks";
    return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
      empty: jQuery.Callbacks( "once memory" ).add( function() {
        dataPriv.remove( elem, [ type + "queue", key ] );
      } )
    } );
  }
} );

jQuery.fn.extend( {
  queue: function( type, data ) {
    var setter = 2;

    if ( typeof type !== "string" ) {
      data = type;
      type = "fx";
      setter--;
    }

    if ( arguments.length < setter ) {
      return jQuery.queue( this[ 0 ], type );
    }

    return data === undefined ?
      this :
      this.each( function() {
        var queue = jQuery.queue( this, type, data );

        // Ensure a hooks for this queue
        jQuery._queueHooks( this, type );

        if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
          jQuery.dequeue( this, type );
        }
      } );
  },
  dequeue: function( type ) {
    return this.each( function() {
      jQuery.dequeue( this, type );
    } );
  },
  clearQueue: function( type ) {
    return this.queue( type || "fx", [] );
  },

  // Get a promise resolved when queues of a certain type
  // are emptied (fx is the type by default)
  promise: function( type, obj ) {
    var tmp,
      count = 1,
      defer = jQuery.Deferred(),
      elements = this,
      i = this.length,
      resolve = function() {
        if ( !( --count ) ) {
          defer.resolveWith( elements, [ elements ] );
        }
      };

    if ( typeof type !== "string" ) {
      obj = type;
      type = undefined;
    }
    type = type || "fx";

    while ( i-- ) {
      tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
      if ( tmp && tmp.empty ) {
        count++;
        tmp.empty.add( resolve );
      }
    }
    resolve();
    return defer.promise( obj );
  }
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var documentElement = document.documentElement;



  var isAttached = function( elem ) {
      return jQuery.contains( elem.ownerDocument, elem );
    },
    composed = { composed: true };

  // Support: IE 9 - 11+, Edge 12 - 18+, iOS 10.0 - 10.2 only
  // Check attachment across shadow DOM boundaries when possible (gh-3504)
  // Support: iOS 10.0-10.2 only
  // Early iOS 10 versions support `attachShadow` but not `getRootNode`,
  // leading to errors. We need to check for `getRootNode`.
  if ( documentElement.getRootNode ) {
    isAttached = function( elem ) {
      return jQuery.contains( elem.ownerDocument, elem ) ||
        elem.getRootNode( composed ) === elem.ownerDocument;
    };
  }
var isHiddenWithinTree = function( elem, el ) {

    // isHiddenWithinTree might be called from jQuery#filter function;
    // in that case, element will be second argument
    elem = el || elem;

    // Inline style trumps all
    return elem.style.display === "none" ||
      elem.style.display === "" &&

      // Otherwise, check computed style
      // Support: Firefox <=43 - 45
      // Disconnected elements can have computed display: none, so first confirm that elem is
      // in the document.
      isAttached( elem ) &&

      jQuery.css( elem, "display" ) === "none";
  };



function adjustCSS( elem, prop, valueParts, tween ) {
  var adjusted, scale,
    maxIterations = 20,
    currentValue = tween ?
      function() {
        return tween.cur();
      } :
      function() {
        return jQuery.css( elem, prop, "" );
      },
    initial = currentValue(),
    unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

    // Starting value computation is required for potential unit mismatches
    initialInUnit = elem.nodeType &&
      ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
      rcssNum.exec( jQuery.css( elem, prop ) );

  if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

    // Support: Firefox <=54
    // Halve the iteration target value to prevent interference from CSS upper bounds (gh-2144)
    initial = initial / 2;

    // Trust units reported by jQuery.css
    unit = unit || initialInUnit[ 3 ];

    // Iteratively approximate from a nonzero starting point
    initialInUnit = +initial || 1;

    while ( maxIterations-- ) {

      // Evaluate and update our best guess (doubling guesses that zero out).
      // Finish if the scale equals or crosses 1 (making the old*new product non-positive).
      jQuery.style( elem, prop, initialInUnit + unit );
      if ( ( 1 - scale ) * ( 1 - ( scale = currentValue() / initial || 0.5 ) ) <= 0 ) {
        maxIterations = 0;
      }
      initialInUnit = initialInUnit / scale;

    }

    initialInUnit = initialInUnit * 2;
    jQuery.style( elem, prop, initialInUnit + unit );

    // Make sure we update the tween properties later on
    valueParts = valueParts || [];
  }

  if ( valueParts ) {
    initialInUnit = +initialInUnit || +initial || 0;

    // Apply relative offset (+=/-=) if specified
    adjusted = valueParts[ 1 ] ?
      initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
      +valueParts[ 2 ];
    if ( tween ) {
      tween.unit = unit;
      tween.start = initialInUnit;
      tween.end = adjusted;
    }
  }
  return adjusted;
}


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
  var temp,
    doc = elem.ownerDocument,
    nodeName = elem.nodeName,
    display = defaultDisplayMap[ nodeName ];

  if ( display ) {
    return display;
  }

  temp = doc.body.appendChild( doc.createElement( nodeName ) );
  display = jQuery.css( temp, "display" );

  temp.parentNode.removeChild( temp );

  if ( display === "none" ) {
    display = "block";
  }
  defaultDisplayMap[ nodeName ] = display;

  return display;
}

function showHide( elements, show ) {
  var display, elem,
    values = [],
    index = 0,
    length = elements.length;

  // Determine new display value for elements that need to change
  for ( ; index < length; index++ ) {
    elem = elements[ index ];
    if ( !elem.style ) {
      continue;
    }

    display = elem.style.display;
    if ( show ) {

      // Since we force visibility upon cascade-hidden elements, an immediate (and slow)
      // check is required in this first loop unless we have a nonempty display value (either
      // inline or about-to-be-restored)
      if ( display === "none" ) {
        values[ index ] = dataPriv.get( elem, "display" ) || null;
        if ( !values[ index ] ) {
          elem.style.display = "";
        }
      }
      if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
        values[ index ] = getDefaultDisplay( elem );
      }
    } else {
      if ( display !== "none" ) {
        values[ index ] = "none";

        // Remember what we're overwriting
        dataPriv.set( elem, "display", display );
      }
    }
  }

  // Set the display of the elements in a second loop to avoid constant reflow
  for ( index = 0; index < length; index++ ) {
    if ( values[ index ] != null ) {
      elements[ index ].style.display = values[ index ];
    }
  }

  return elements;
}

jQuery.fn.extend( {
  show: function() {
    return showHide( this, true );
  },
  hide: function() {
    return showHide( this );
  },
  toggle: function( state ) {
    if ( typeof state === "boolean" ) {
      return state ? this.show() : this.hide();
    }

    return this.each( function() {
      if ( isHiddenWithinTree( this ) ) {
        jQuery( this ).show();
      } else {
        jQuery( this ).hide();
      }
    } );
  }
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]*)/i );

var rscriptType = ( /^$|^module$|\/(?:java|ecma)script/i );



( function() {
  var fragment = document.createDocumentFragment(),
    div = fragment.appendChild( document.createElement( "div" ) ),
    input = document.createElement( "input" );

  // Support: Android 4.0 - 4.3 only
  // Check state lost if the name is set (trac-11217)
  // Support: Windows Web Apps (WWA)
  // `name` and `type` must use .setAttribute for WWA (trac-14901)
  input.setAttribute( "type", "radio" );
  input.setAttribute( "checked", "checked" );
  input.setAttribute( "name", "t" );

  div.appendChild( input );

  // Support: Android <=4.1 only
  // Older WebKit doesn't clone checked state correctly in fragments
  support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

  // Support: IE <=11 only
  // Make sure textarea (and checkbox) defaultValue is properly cloned
  div.innerHTML = "<textarea>x</textarea>";
  support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

  // Support: IE <=9 only
  // IE <=9 replaces <option> tags with their contents when inserted outside of
  // the select element.
  div.innerHTML = "<option></option>";
  support.option = !!div.lastChild;
} )();


// We have to close these tags to support XHTML (trac-13200)
var wrapMap = {

  // XHTML parsers do not magically insert elements in the
  // same way that tag soup parsers do. So we cannot shorten
  // this by omitting <tbody> or other required elements.
  thead: [ 1, "<table>", "</table>" ],
  col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
  tr: [ 2, "<table><tbody>", "</tbody></table>" ],
  td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

  _default: [ 0, "", "" ]
};

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// Support: IE <=9 only
if ( !support.option ) {
  wrapMap.optgroup = wrapMap.option = [ 1, "<select multiple='multiple'>", "</select>" ];
}


function getAll( context, tag ) {

  // Support: IE <=9 - 11 only
  // Use typeof to avoid zero-argument method invocation on host objects (trac-15151)
  var ret;

  if ( typeof context.getElementsByTagName !== "undefined" ) {
    ret = context.getElementsByTagName( tag || "*" );

  } else if ( typeof context.querySelectorAll !== "undefined" ) {
    ret = context.querySelectorAll( tag || "*" );

  } else {
    ret = [];
  }

  if ( tag === undefined || tag && nodeName( context, tag ) ) {
    return jQuery.merge( [ context ], ret );
  }

  return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
  var i = 0,
    l = elems.length;

  for ( ; i < l; i++ ) {
    dataPriv.set(
      elems[ i ],
      "globalEval",
      !refElements || dataPriv.get( refElements[ i ], "globalEval" )
    );
  }
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
  var elem, tmp, tag, wrap, attached, j,
    fragment = context.createDocumentFragment(),
    nodes = [],
    i = 0,
    l = elems.length;

  for ( ; i < l; i++ ) {
    elem = elems[ i ];

    if ( elem || elem === 0 ) {

      // Add nodes directly
      if ( toType( elem ) === "object" ) {

        // Support: Android <=4.0 only, PhantomJS 1 only
        // push.apply(_, arraylike) throws on ancient WebKit
        jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

      // Convert non-html into a text node
      } else if ( !rhtml.test( elem ) ) {
        nodes.push( context.createTextNode( elem ) );

      // Convert html into DOM nodes
      } else {
        tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

        // Deserialize a standard representation
        tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
        wrap = wrapMap[ tag ] || wrapMap._default;
        tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

        // Descend through wrappers to the right content
        j = wrap[ 0 ];
        while ( j-- ) {
          tmp = tmp.lastChild;
        }

        // Support: Android <=4.0 only, PhantomJS 1 only
        // push.apply(_, arraylike) throws on ancient WebKit
        jQuery.merge( nodes, tmp.childNodes );

        // Remember the top-level container
        tmp = fragment.firstChild;

        // Ensure the created nodes are orphaned (trac-12392)
        tmp.textContent = "";
      }
    }
  }

  // Remove wrapper from fragment
  fragment.textContent = "";

  i = 0;
  while ( ( elem = nodes[ i++ ] ) ) {

    // Skip elements already in the context collection (trac-4087)
    if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
      if ( ignored ) {
        ignored.push( elem );
      }
      continue;
    }

    attached = isAttached( elem );

    // Append to fragment
    tmp = getAll( fragment.appendChild( elem ), "script" );

    // Preserve script evaluation history
    if ( attached ) {
      setGlobalEval( tmp );
    }

    // Capture executables
    if ( scripts ) {
      j = 0;
      while ( ( elem = tmp[ j++ ] ) ) {
        if ( rscriptType.test( elem.type || "" ) ) {
          scripts.push( elem );
        }
      }
    }
  }

  return fragment;
}


var rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
  return true;
}

function returnFalse() {
  return false;
}

function on( elem, types, selector, data, fn, one ) {
  var origFn, type;

  // Types can be a map of types/handlers
  if ( typeof types === "object" ) {

    // ( types-Object, selector, data )
    if ( typeof selector !== "string" ) {

      // ( types-Object, data )
      data = data || selector;
      selector = undefined;
    }
    for ( type in types ) {
      on( elem, type, selector, data, types[ type ], one );
    }
    return elem;
  }

  if ( data == null && fn == null ) {

    // ( types, fn )
    fn = selector;
    data = selector = undefined;
  } else if ( fn == null ) {
    if ( typeof selector === "string" ) {

      // ( types, selector, fn )
      fn = data;
      data = undefined;
    } else {

      // ( types, data, fn )
      fn = data;
      data = selector;
      selector = undefined;
    }
  }
  if ( fn === false ) {
    fn = returnFalse;
  } else if ( !fn ) {
    return elem;
  }

  if ( one === 1 ) {
    origFn = fn;
    fn = function( event ) {

      // Can use an empty set, since event contains the info
      jQuery().off( event );
      return origFn.apply( this, arguments );
    };

    // Use same guid so caller can remove using origFn
    fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
  }
  return elem.each( function() {
    jQuery.event.add( this, types, fn, data, selector );
  } );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

  global: {},

  add: function( elem, types, handler, data, selector ) {

    var handleObjIn, eventHandle, tmp,
      events, t, handleObj,
      special, handlers, type, namespaces, origType,
      elemData = dataPriv.get( elem );

    // Only attach events to objects that accept data
    if ( !acceptData( elem ) ) {
      return;
    }

    // Caller can pass in an object of custom data in lieu of the handler
    if ( handler.handler ) {
      handleObjIn = handler;
      handler = handleObjIn.handler;
      selector = handleObjIn.selector;
    }

    // Ensure that invalid selectors throw exceptions at attach time
    // Evaluate against documentElement in case elem is a non-element node (e.g., document)
    if ( selector ) {
      jQuery.find.matchesSelector( documentElement, selector );
    }

    // Make sure that the handler has a unique ID, used to find/remove it later
    if ( !handler.guid ) {
      handler.guid = jQuery.guid++;
    }

    // Init the element's event structure and main handler, if this is the first
    if ( !( events = elemData.events ) ) {
      events = elemData.events = Object.create( null );
    }
    if ( !( eventHandle = elemData.handle ) ) {
      eventHandle = elemData.handle = function( e ) {

        // Discard the second event of a jQuery.event.trigger() and
        // when an event is called after a page has unloaded
        return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
          jQuery.event.dispatch.apply( elem, arguments ) : undefined;
      };
    }

    // Handle multiple events separated by a space
    types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
    t = types.length;
    while ( t-- ) {
      tmp = rtypenamespace.exec( types[ t ] ) || [];
      type = origType = tmp[ 1 ];
      namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

      // There *must* be a type, no attaching namespace-only handlers
      if ( !type ) {
        continue;
      }

      // If event changes its type, use the special event handlers for the changed type
      special = jQuery.event.special[ type ] || {};

      // If selector defined, determine special event api type, otherwise given type
      type = ( selector ? special.delegateType : special.bindType ) || type;

      // Update special based on newly reset type
      special = jQuery.event.special[ type ] || {};

      // handleObj is passed to all event handlers
      handleObj = jQuery.extend( {
        type: type,
        origType: origType,
        data: data,
        handler: handler,
        guid: handler.guid,
        selector: selector,
        needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
        namespace: namespaces.join( "." )
      }, handleObjIn );

      // Init the event handler queue if we're the first
      if ( !( handlers = events[ type ] ) ) {
        handlers = events[ type ] = [];
        handlers.delegateCount = 0;

        // Only use addEventListener if the special events handler returns false
        if ( !special.setup ||
          special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

          if ( elem.addEventListener ) {
            elem.addEventListener( type, eventHandle );
          }
        }
      }

      if ( special.add ) {
        special.add.call( elem, handleObj );

        if ( !handleObj.handler.guid ) {
          handleObj.handler.guid = handler.guid;
        }
      }

      // Add to the element's handler list, delegates in front
      if ( selector ) {
        handlers.splice( handlers.delegateCount++, 0, handleObj );
      } else {
        handlers.push( handleObj );
      }

      // Keep track of which events have ever been used, for event optimization
      jQuery.event.global[ type ] = true;
    }

  },

  // Detach an event or set of events from an element
  remove: function( elem, types, handler, selector, mappedTypes ) {

    var j, origCount, tmp,
      events, t, handleObj,
      special, handlers, type, namespaces, origType,
      elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

    if ( !elemData || !( events = elemData.events ) ) {
      return;
    }

    // Once for each type.namespace in types; type may be omitted
    types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
    t = types.length;
    while ( t-- ) {
      tmp = rtypenamespace.exec( types[ t ] ) || [];
      type = origType = tmp[ 1 ];
      namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

      // Unbind all events (on this namespace, if provided) for the element
      if ( !type ) {
        for ( type in events ) {
          jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
        }
        continue;
      }

      special = jQuery.event.special[ type ] || {};
      type = ( selector ? special.delegateType : special.bindType ) || type;
      handlers = events[ type ] || [];
      tmp = tmp[ 2 ] &&
        new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

      // Remove matching events
      origCount = j = handlers.length;
      while ( j-- ) {
        handleObj = handlers[ j ];

        if ( ( mappedTypes || origType === handleObj.origType ) &&
          ( !handler || handler.guid === handleObj.guid ) &&
          ( !tmp || tmp.test( handleObj.namespace ) ) &&
          ( !selector || selector === handleObj.selector ||
            selector === "**" && handleObj.selector ) ) {
          handlers.splice( j, 1 );

          if ( handleObj.selector ) {
            handlers.delegateCount--;
          }
          if ( special.remove ) {
            special.remove.call( elem, handleObj );
          }
        }
      }

      // Remove generic event handler if we removed something and no more handlers exist
      // (avoids potential for endless recursion during removal of special event handlers)
      if ( origCount && !handlers.length ) {
        if ( !special.teardown ||
          special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

          jQuery.removeEvent( elem, type, elemData.handle );
        }

        delete events[ type ];
      }
    }

    // Remove data and the expando if it's no longer used
    if ( jQuery.isEmptyObject( events ) ) {
      dataPriv.remove( elem, "handle events" );
    }
  },

  dispatch: function( nativeEvent ) {

    var i, j, ret, matched, handleObj, handlerQueue,
      args = new Array( arguments.length ),

      // Make a writable jQuery.Event from the native event object
      event = jQuery.event.fix( nativeEvent ),

      handlers = (
        dataPriv.get( this, "events" ) || Object.create( null )
      )[ event.type ] || [],
      special = jQuery.event.special[ event.type ] || {};

    // Use the fix-ed jQuery.Event rather than the (read-only) native event
    args[ 0 ] = event;

    for ( i = 1; i < arguments.length; i++ ) {
      args[ i ] = arguments[ i ];
    }

    event.delegateTarget = this;

    // Call the preDispatch hook for the mapped type, and let it bail if desired
    if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
      return;
    }

    // Determine handlers
    handlerQueue = jQuery.event.handlers.call( this, event, handlers );

    // Run delegates first; they may want to stop propagation beneath us
    i = 0;
    while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
      event.currentTarget = matched.elem;

      j = 0;
      while ( ( handleObj = matched.handlers[ j++ ] ) &&
        !event.isImmediatePropagationStopped() ) {

        // If the event is namespaced, then each handler is only invoked if it is
        // specially universal or its namespaces are a superset of the event's.
        if ( !event.rnamespace || handleObj.namespace === false ||
          event.rnamespace.test( handleObj.namespace ) ) {

          event.handleObj = handleObj;
          event.data = handleObj.data;

          ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
            handleObj.handler ).apply( matched.elem, args );

          if ( ret !== undefined ) {
            if ( ( event.result = ret ) === false ) {
              event.preventDefault();
              event.stopPropagation();
            }
          }
        }
      }
    }

    // Call the postDispatch hook for the mapped type
    if ( special.postDispatch ) {
      special.postDispatch.call( this, event );
    }

    return event.result;
  },

  handlers: function( event, handlers ) {
    var i, handleObj, sel, matchedHandlers, matchedSelectors,
      handlerQueue = [],
      delegateCount = handlers.delegateCount,
      cur = event.target;

    // Find delegate handlers
    if ( delegateCount &&

      // Support: IE <=9
      // Black-hole SVG <use> instance trees (trac-13180)
      cur.nodeType &&

      // Support: Firefox <=42
      // Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
      // https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
      // Support: IE 11 only
      // ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
      !( event.type === "click" && event.button >= 1 ) ) {

      for ( ; cur !== this; cur = cur.parentNode || this ) {

        // Don't check non-elements (trac-13208)
        // Don't process clicks on disabled elements (trac-6911, trac-8165, trac-11382, trac-11764)
        if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
          matchedHandlers = [];
          matchedSelectors = {};
          for ( i = 0; i < delegateCount; i++ ) {
            handleObj = handlers[ i ];

            // Don't conflict with Object.prototype properties (trac-13203)
            sel = handleObj.selector + " ";

            if ( matchedSelectors[ sel ] === undefined ) {
              matchedSelectors[ sel ] = handleObj.needsContext ?
                jQuery( sel, this ).index( cur ) > -1 :
                jQuery.find( sel, this, null, [ cur ] ).length;
            }
            if ( matchedSelectors[ sel ] ) {
              matchedHandlers.push( handleObj );
            }
          }
          if ( matchedHandlers.length ) {
            handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
          }
        }
      }
    }

    // Add the remaining (directly-bound) handlers
    cur = this;
    if ( delegateCount < handlers.length ) {
      handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
    }

    return handlerQueue;
  },

  addProp: function( name, hook ) {
    Object.defineProperty( jQuery.Event.prototype, name, {
      enumerable: true,
      configurable: true,

      get: isFunction( hook ) ?
        function() {
          if ( this.originalEvent ) {
            return hook( this.originalEvent );
          }
        } :
        function() {
          if ( this.originalEvent ) {
            return this.originalEvent[ name ];
          }
        },

      set: function( value ) {
        Object.defineProperty( this, name, {
          enumerable: true,
          configurable: true,
          writable: true,
          value: value
        } );
      }
    } );
  },

  fix: function( originalEvent ) {
    return originalEvent[ jQuery.expando ] ?
      originalEvent :
      new jQuery.Event( originalEvent );
  },

  special: {
    load: {

      // Prevent triggered image.load events from bubbling to window.load
      noBubble: true
    },
    click: {

      // Utilize native event to ensure correct state for checkable inputs
      setup: function( data ) {

        // For mutual compressibility with _default, replace `this` access with a local var.
        // `|| data` is dead code meant only to preserve the variable through minification.
        var el = this || data;

        // Claim the first handler
        if ( rcheckableType.test( el.type ) &&
          el.click && nodeName( el, "input" ) ) {

          // dataPriv.set( el, "click", ... )
          leverageNative( el, "click", true );
        }

        // Return false to allow normal processing in the caller
        return false;
      },
      trigger: function( data ) {

        // For mutual compressibility with _default, replace `this` access with a local var.
        // `|| data` is dead code meant only to preserve the variable through minification.
        var el = this || data;

        // Force setup before triggering a click
        if ( rcheckableType.test( el.type ) &&
          el.click && nodeName( el, "input" ) ) {

          leverageNative( el, "click" );
        }

        // Return non-false to allow normal event-path propagation
        return true;
      },

      // For cross-browser consistency, suppress native .click() on links
      // Also prevent it if we're currently inside a leveraged native-event stack
      _default: function( event ) {
        var target = event.target;
        return rcheckableType.test( target.type ) &&
          target.click && nodeName( target, "input" ) &&
          dataPriv.get( target, "click" ) ||
          nodeName( target, "a" );
      }
    },

    beforeunload: {
      postDispatch: function( event ) {

        // Support: Firefox 20+
        // Firefox doesn't alert if the returnValue field is not set.
        if ( event.result !== undefined && event.originalEvent ) {
          event.originalEvent.returnValue = event.result;
        }
      }
    }
  }
};

// Ensure the presence of an event listener that handles manually-triggered
// synthetic events by interrupting progress until reinvoked in response to
// *native* events that it fires directly, ensuring that state changes have
// already occurred before other listeners are invoked.
function leverageNative( el, type, isSetup ) {

  // Missing `isSetup` indicates a trigger call, which must force setup through jQuery.event.add
  if ( !isSetup ) {
    if ( dataPriv.get( el, type ) === undefined ) {
      jQuery.event.add( el, type, returnTrue );
    }
    return;
  }

  // Register the controller as a special universal handler for all event namespaces
  dataPriv.set( el, type, false );
  jQuery.event.add( el, type, {
    namespace: false,
    handler: function( event ) {
      var result,
        saved = dataPriv.get( this, type );

      if ( ( event.isTrigger & 1 ) && this[ type ] ) {

        // Interrupt processing of the outer synthetic .trigger()ed event
        if ( !saved ) {

          // Store arguments for use when handling the inner native event
          // There will always be at least one argument (an event object), so this array
          // will not be confused with a leftover capture object.
          saved = slice.call( arguments );
          dataPriv.set( this, type, saved );

          // Trigger the native event and capture its result
          this[ type ]();
          result = dataPriv.get( this, type );
          dataPriv.set( this, type, false );

          if ( saved !== result ) {

            // Cancel the outer synthetic event
            event.stopImmediatePropagation();
            event.preventDefault();

            return result;
          }

        // If this is an inner synthetic event for an event with a bubbling surrogate
        // (focus or blur), assume that the surrogate already propagated from triggering
        // the native event and prevent that from happening again here.
        // This technically gets the ordering wrong w.r.t. to `.trigger()` (in which the
        // bubbling surrogate propagates *after* the non-bubbling base), but that seems
        // less bad than duplication.
        } else if ( ( jQuery.event.special[ type ] || {} ).delegateType ) {
          event.stopPropagation();
        }

      // If this is a native event triggered above, everything is now in order
      // Fire an inner synthetic event with the original arguments
      } else if ( saved ) {

        // ...and capture the result
        dataPriv.set( this, type, jQuery.event.trigger(
          saved[ 0 ],
          saved.slice( 1 ),
          this
        ) );

        // Abort handling of the native event by all jQuery handlers while allowing
        // native handlers on the same element to run. On target, this is achieved
        // by stopping immediate propagation just on the jQuery event. However,
        // the native event is re-wrapped by a jQuery one on each level of the
        // propagation so the only way to stop it for jQuery is to stop it for
        // everyone via native `stopPropagation()`. This is not a problem for
        // focus/blur which don't bubble, but it does also stop click on checkboxes
        // and radios. We accept this limitation.
        event.stopPropagation();
        event.isImmediatePropagationStopped = returnTrue;
      }
    }
  } );
}

jQuery.removeEvent = function( elem, type, handle ) {

  // This "if" is needed for plain objects
  if ( elem.removeEventListener ) {
    elem.removeEventListener( type, handle );
  }
};

jQuery.Event = function( src, props ) {

  // Allow instantiation without the 'new' keyword
  if ( !( this instanceof jQuery.Event ) ) {
    return new jQuery.Event( src, props );
  }

  // Event object
  if ( src && src.type ) {
    this.originalEvent = src;
    this.type = src.type;

    // Events bubbling up the document may have been marked as prevented
    // by a handler lower down the tree; reflect the correct value.
    this.isDefaultPrevented = src.defaultPrevented ||
        src.defaultPrevented === undefined &&

        // Support: Android <=2.3 only
        src.returnValue === false ?
      returnTrue :
      returnFalse;

    // Create target properties
    // Support: Safari <=6 - 7 only
    // Target should not be a text node (trac-504, trac-13143)
    this.target = ( src.target && src.target.nodeType === 3 ) ?
      src.target.parentNode :
      src.target;

    this.currentTarget = src.currentTarget;
    this.relatedTarget = src.relatedTarget;

  // Event type
  } else {
    this.type = src;
  }

  // Put explicitly provided properties onto the event object
  if ( props ) {
    jQuery.extend( this, props );
  }

  // Create a timestamp if incoming event doesn't have one
  this.timeStamp = src && src.timeStamp || Date.now();

  // Mark it as fixed
  this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
  constructor: jQuery.Event,
  isDefaultPrevented: returnFalse,
  isPropagationStopped: returnFalse,
  isImmediatePropagationStopped: returnFalse,
  isSimulated: false,

  preventDefault: function() {
    var e = this.originalEvent;

    this.isDefaultPrevented = returnTrue;

    if ( e && !this.isSimulated ) {
      e.preventDefault();
    }
  },
  stopPropagation: function() {
    var e = this.originalEvent;

    this.isPropagationStopped = returnTrue;

    if ( e && !this.isSimulated ) {
      e.stopPropagation();
    }
  },
  stopImmediatePropagation: function() {
    var e = this.originalEvent;

    this.isImmediatePropagationStopped = returnTrue;

    if ( e && !this.isSimulated ) {
      e.stopImmediatePropagation();
    }

    this.stopPropagation();
  }
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
  altKey: true,
  bubbles: true,
  cancelable: true,
  changedTouches: true,
  ctrlKey: true,
  detail: true,
  eventPhase: true,
  metaKey: true,
  pageX: true,
  pageY: true,
  shiftKey: true,
  view: true,
  "char": true,
  code: true,
  charCode: true,
  key: true,
  keyCode: true,
  button: true,
  buttons: true,
  clientX: true,
  clientY: true,
  offsetX: true,
  offsetY: true,
  pointerId: true,
  pointerType: true,
  screenX: true,
  screenY: true,
  targetTouches: true,
  toElement: true,
  touches: true,
  which: true
}, jQuery.event.addProp );

jQuery.each( { focus: "focusin", blur: "focusout" }, function( type, delegateType ) {

  function focusMappedHandler( nativeEvent ) {
    if ( document.documentMode ) {

      // Support: IE 11+
      // Attach a single focusin/focusout handler on the document while someone wants
      // focus/blur. This is because the former are synchronous in IE while the latter
      // are async. In other browsers, all those handlers are invoked synchronously.

      // `handle` from private data would already wrap the event, but we need
      // to change the `type` here.
      var handle = dataPriv.get( this, "handle" ),
        event = jQuery.event.fix( nativeEvent );
      event.type = nativeEvent.type === "focusin" ? "focus" : "blur";
      event.isSimulated = true;

      // First, handle focusin/focusout
      handle( nativeEvent );

      // ...then, handle focus/blur
      //
      // focus/blur don't bubble while focusin/focusout do; simulate the former by only
      // invoking the handler at the lower level.
      if ( event.target === event.currentTarget ) {

        // The setup part calls `leverageNative`, which, in turn, calls
        // `jQuery.event.add`, so event handle will already have been set
        // by this point.
        handle( event );
      }
    } else {

      // For non-IE browsers, attach a single capturing handler on the document
      // while someone wants focusin/focusout.
      jQuery.event.simulate( delegateType, nativeEvent.target,
        jQuery.event.fix( nativeEvent ) );
    }
  }

  jQuery.event.special[ type ] = {

    // Utilize native event if possible so blur/focus sequence is correct
    setup: function() {

      var attaches;

      // Claim the first handler
      // dataPriv.set( this, "focus", ... )
      // dataPriv.set( this, "blur", ... )
      leverageNative( this, type, true );

      if ( document.documentMode ) {

        // Support: IE 9 - 11+
        // We use the same native handler for focusin & focus (and focusout & blur)
        // so we need to coordinate setup & teardown parts between those events.
        // Use `delegateType` as the key as `type` is already used by `leverageNative`.
        attaches = dataPriv.get( this, delegateType );
        if ( !attaches ) {
          this.addEventListener( delegateType, focusMappedHandler );
        }
        dataPriv.set( this, delegateType, ( attaches || 0 ) + 1 );
      } else {

        // Return false to allow normal processing in the caller
        return false;
      }
    },
    trigger: function() {

      // Force setup before trigger
      leverageNative( this, type );

      // Return non-false to allow normal event-path propagation
      return true;
    },

    teardown: function() {
      var attaches;

      if ( document.documentMode ) {
        attaches = dataPriv.get( this, delegateType ) - 1;
        if ( !attaches ) {
          this.removeEventListener( delegateType, focusMappedHandler );
          dataPriv.remove( this, delegateType );
        } else {
          dataPriv.set( this, delegateType, attaches );
        }
      } else {

        // Return false to indicate standard teardown should be applied
        return false;
      }
    },

    // Suppress native focus or blur if we're currently inside
    // a leveraged native-event stack
    _default: function( event ) {
      return dataPriv.get( event.target, type );
    },

    delegateType: delegateType
  };

  // Support: Firefox <=44
  // Firefox doesn't have focus(in | out) events
  // Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
  //
  // Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
  // focus(in | out) events fire after focus & blur events,
  // which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
  // Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
  //
  // Support: IE 9 - 11+
  // To preserve relative focusin/focus & focusout/blur event order guaranteed on the 3.x branch,
  // attach a single handler for both events in IE.
  jQuery.event.special[ delegateType ] = {
    setup: function() {

      // Handle: regular nodes (via `this.ownerDocument`), window
      // (via `this.document`) & document (via `this`).
      var doc = this.ownerDocument || this.document || this,
        dataHolder = document.documentMode ? this : doc,
        attaches = dataPriv.get( dataHolder, delegateType );

      // Support: IE 9 - 11+
      // We use the same native handler for focusin & focus (and focusout & blur)
      // so we need to coordinate setup & teardown parts between those events.
      // Use `delegateType` as the key as `type` is already used by `leverageNative`.
      if ( !attaches ) {
        if ( document.documentMode ) {
          this.addEventListener( delegateType, focusMappedHandler );
        } else {
          doc.addEventListener( type, focusMappedHandler, true );
        }
      }
      dataPriv.set( dataHolder, delegateType, ( attaches || 0 ) + 1 );
    },
    teardown: function() {
      var doc = this.ownerDocument || this.document || this,
        dataHolder = document.documentMode ? this : doc,
        attaches = dataPriv.get( dataHolder, delegateType ) - 1;

      if ( !attaches ) {
        if ( document.documentMode ) {
          this.removeEventListener( delegateType, focusMappedHandler );
        } else {
          doc.removeEventListener( type, focusMappedHandler, true );
        }
        dataPriv.remove( dataHolder, delegateType );
      } else {
        dataPriv.set( dataHolder, delegateType, attaches );
      }
    }
  };
} );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
  mouseenter: "mouseover",
  mouseleave: "mouseout",
  pointerenter: "pointerover",
  pointerleave: "pointerout"
}, function( orig, fix ) {
  jQuery.event.special[ orig ] = {
    delegateType: fix,
    bindType: fix,

    handle: function( event ) {
      var ret,
        target = this,
        related = event.relatedTarget,
        handleObj = event.handleObj;

      // For mouseenter/leave call the handler if related is outside the target.
      // NB: No relatedTarget if the mouse left/entered the browser window
      if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
        event.type = handleObj.origType;
        ret = handleObj.handler.apply( this, arguments );
        event.type = fix;
      }
      return ret;
    }
  };
} );

jQuery.fn.extend( {

  on: function( types, selector, data, fn ) {
    return on( this, types, selector, data, fn );
  },
  one: function( types, selector, data, fn ) {
    return on( this, types, selector, data, fn, 1 );
  },
  off: function( types, selector, fn ) {
    var handleObj, type;
    if ( types && types.preventDefault && types.handleObj ) {

      // ( event )  dispatched jQuery.Event
      handleObj = types.handleObj;
      jQuery( types.delegateTarget ).off(
        handleObj.namespace ?
          handleObj.origType + "." + handleObj.namespace :
          handleObj.origType,
        handleObj.selector,
        handleObj.handler
      );
      return this;
    }
    if ( typeof types === "object" ) {

      // ( types-object [, selector] )
      for ( type in types ) {
        this.off( type, selector, types[ type ] );
      }
      return this;
    }
    if ( selector === false || typeof selector === "function" ) {

      // ( types [, fn] )
      fn = selector;
      selector = undefined;
    }
    if ( fn === false ) {
      fn = returnFalse;
    }
    return this.each( function() {
      jQuery.event.remove( this, types, fn, selector );
    } );
  }
} );


var

  // Support: IE <=10 - 11, Edge 12 - 13 only
  // In IE/Edge using regex groups here causes severe slowdowns.
  // See https://connect.microsoft.com/IE/feedback/details/1736512/
  rnoInnerhtml = /<script|<style|<link/i,

  // checked="checked" or checked
  rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,

  rcleanScript = /^\s*<!\[CDATA\[|\]\]>\s*$/g;

// Prefer a tbody over its parent table for containing new rows
function manipulationTarget( elem, content ) {
  if ( nodeName( elem, "table" ) &&
    nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

    return jQuery( elem ).children( "tbody" )[ 0 ] || elem;
  }

  return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
  elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
  return elem;
}
function restoreScript( elem ) {
  if ( ( elem.type || "" ).slice( 0, 5 ) === "true/" ) {
    elem.type = elem.type.slice( 5 );
  } else {
    elem.removeAttribute( "type" );
  }

  return elem;
}

function cloneCopyEvent( src, dest ) {
  var i, l, type, pdataOld, udataOld, udataCur, events;

  if ( dest.nodeType !== 1 ) {
    return;
  }

  // 1. Copy private data: events, handlers, etc.
  if ( dataPriv.hasData( src ) ) {
    pdataOld = dataPriv.get( src );
    events = pdataOld.events;

    if ( events ) {
      dataPriv.remove( dest, "handle events" );

      for ( type in events ) {
        for ( i = 0, l = events[ type ].length; i < l; i++ ) {
          jQuery.event.add( dest, type, events[ type ][ i ] );
        }
      }
    }
  }

  // 2. Copy user data
  if ( dataUser.hasData( src ) ) {
    udataOld = dataUser.access( src );
    udataCur = jQuery.extend( {}, udataOld );

    dataUser.set( dest, udataCur );
  }
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
  var nodeName = dest.nodeName.toLowerCase();

  // Fails to persist the checked state of a cloned checkbox or radio button.
  if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
    dest.checked = src.checked;

  // Fails to return the selected option to the default selected state when cloning options
  } else if ( nodeName === "input" || nodeName === "textarea" ) {
    dest.defaultValue = src.defaultValue;
  }
}

function domManip( collection, args, callback, ignored ) {

  // Flatten any nested arrays
  args = flat( args );

  var fragment, first, scripts, hasScripts, node, doc,
    i = 0,
    l = collection.length,
    iNoClone = l - 1,
    value = args[ 0 ],
    valueIsFunction = isFunction( value );

  // We can't cloneNode fragments that contain checked, in WebKit
  if ( valueIsFunction ||
      ( l > 1 && typeof value === "string" &&
        !support.checkClone && rchecked.test( value ) ) ) {
    return collection.each( function( index ) {
      var self = collection.eq( index );
      if ( valueIsFunction ) {
        args[ 0 ] = value.call( this, index, self.html() );
      }
      domManip( self, args, callback, ignored );
    } );
  }

  if ( l ) {
    fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
    first = fragment.firstChild;

    if ( fragment.childNodes.length === 1 ) {
      fragment = first;
    }

    // Require either new content or an interest in ignored elements to invoke the callback
    if ( first || ignored ) {
      scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
      hasScripts = scripts.length;

      // Use the original fragment for the last item
      // instead of the first because it can end up
      // being emptied incorrectly in certain situations (trac-8070).
      for ( ; i < l; i++ ) {
        node = fragment;

        if ( i !== iNoClone ) {
          node = jQuery.clone( node, true, true );

          // Keep references to cloned scripts for later restoration
          if ( hasScripts ) {

            // Support: Android <=4.0 only, PhantomJS 1 only
            // push.apply(_, arraylike) throws on ancient WebKit
            jQuery.merge( scripts, getAll( node, "script" ) );
          }
        }

        callback.call( collection[ i ], node, i );
      }

      if ( hasScripts ) {
        doc = scripts[ scripts.length - 1 ].ownerDocument;

        // Re-enable scripts
        jQuery.map( scripts, restoreScript );

        // Evaluate executable scripts on first document insertion
        for ( i = 0; i < hasScripts; i++ ) {
          node = scripts[ i ];
          if ( rscriptType.test( node.type || "" ) &&
            !dataPriv.access( node, "globalEval" ) &&
            jQuery.contains( doc, node ) ) {

            if ( node.src && ( node.type || "" ).toLowerCase()  !== "module" ) {

              // Optional AJAX dependency, but won't run scripts if not present
              if ( jQuery._evalUrl && !node.noModule ) {
                jQuery._evalUrl( node.src, {
                  nonce: node.nonce || node.getAttribute( "nonce" )
                }, doc );
              }
            } else {

              // Unwrap a CDATA section containing script contents. This shouldn't be
              // needed as in XML documents they're already not visible when
              // inspecting element contents and in HTML documents they have no
              // meaning but we're preserving that logic for backwards compatibility.
              // This will be removed completely in 4.0. See gh-4904.
              DOMEval( node.textContent.replace( rcleanScript, "" ), node, doc );
            }
          }
        }
      }
    }
  }

  return collection;
}

function remove( elem, selector, keepData ) {
  var node,
    nodes = selector ? jQuery.filter( selector, elem ) : elem,
    i = 0;

  for ( ; ( node = nodes[ i ] ) != null; i++ ) {
    if ( !keepData && node.nodeType === 1 ) {
      jQuery.cleanData( getAll( node ) );
    }

    if ( node.parentNode ) {
      if ( keepData && isAttached( node ) ) {
        setGlobalEval( getAll( node, "script" ) );
      }
      node.parentNode.removeChild( node );
    }
  }

  return elem;
}

jQuery.extend( {
  htmlPrefilter: function( html ) {
    return html;
  },

  clone: function( elem, dataAndEvents, deepDataAndEvents ) {
    var i, l, srcElements, destElements,
      clone = elem.cloneNode( true ),
      inPage = isAttached( elem );

    // Fix IE cloning issues
    if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
        !jQuery.isXMLDoc( elem ) ) {

      // We eschew jQuery#find here for performance reasons:
      // https://jsperf.com/getall-vs-sizzle/2
      destElements = getAll( clone );
      srcElements = getAll( elem );

      for ( i = 0, l = srcElements.length; i < l; i++ ) {
        fixInput( srcElements[ i ], destElements[ i ] );
      }
    }

    // Copy the events from the original to the clone
    if ( dataAndEvents ) {
      if ( deepDataAndEvents ) {
        srcElements = srcElements || getAll( elem );
        destElements = destElements || getAll( clone );

        for ( i = 0, l = srcElements.length; i < l; i++ ) {
          cloneCopyEvent( srcElements[ i ], destElements[ i ] );
        }
      } else {
        cloneCopyEvent( elem, clone );
      }
    }

    // Preserve script evaluation history
    destElements = getAll( clone, "script" );
    if ( destElements.length > 0 ) {
      setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
    }

    // Return the cloned set
    return clone;
  },

  cleanData: function( elems ) {
    var data, elem, type,
      special = jQuery.event.special,
      i = 0;

    for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
      if ( acceptData( elem ) ) {
        if ( ( data = elem[ dataPriv.expando ] ) ) {
          if ( data.events ) {
            for ( type in data.events ) {
              if ( special[ type ] ) {
                jQuery.event.remove( elem, type );

              // This is a shortcut to avoid jQuery.event.remove's overhead
              } else {
                jQuery.removeEvent( elem, type, data.handle );
              }
            }
          }

          // Support: Chrome <=35 - 45+
          // Assign undefined instead of using delete, see Data#remove
          elem[ dataPriv.expando ] = undefined;
        }
        if ( elem[ dataUser.expando ] ) {

          // Support: Chrome <=35 - 45+
          // Assign undefined instead of using delete, see Data#remove
          elem[ dataUser.expando ] = undefined;
        }
      }
    }
  }
} );

jQuery.fn.extend( {
  detach: function( selector ) {
    return remove( this, selector, true );
  },

  remove: function( selector ) {
    return remove( this, selector );
  },

  text: function( value ) {
    return access( this, function( value ) {
      return value === undefined ?
        jQuery.text( this ) :
        this.empty().each( function() {
          if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
            this.textContent = value;
          }
        } );
    }, null, value, arguments.length );
  },

  append: function() {
    return domManip( this, arguments, function( elem ) {
      if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
        var target = manipulationTarget( this, elem );
        target.appendChild( elem );
      }
    } );
  },

  prepend: function() {
    return domManip( this, arguments, function( elem ) {
      if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
        var target = manipulationTarget( this, elem );
        target.insertBefore( elem, target.firstChild );
      }
    } );
  },

  before: function() {
    return domManip( this, arguments, function( elem ) {
      if ( this.parentNode ) {
        this.parentNode.insertBefore( elem, this );
      }
    } );
  },

  after: function() {
    return domManip( this, arguments, function( elem ) {
      if ( this.parentNode ) {
        this.parentNode.insertBefore( elem, this.nextSibling );
      }
    } );
  },

  empty: function() {
    var elem,
      i = 0;

    for ( ; ( elem = this[ i ] ) != null; i++ ) {
      if ( elem.nodeType === 1 ) {

        // Prevent memory leaks
        jQuery.cleanData( getAll( elem, false ) );

        // Remove any remaining nodes
        elem.textContent = "";
      }
    }

    return this;
  },

  clone: function( dataAndEvents, deepDataAndEvents ) {
    dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
    deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

    return this.map( function() {
      return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
    } );
  },

  html: function( value ) {
    return access( this, function( value ) {
      var elem = this[ 0 ] || {},
        i = 0,
        l = this.length;

      if ( value === undefined && elem.nodeType === 1 ) {
        return elem.innerHTML;
      }

      // See if we can take a shortcut and just use innerHTML
      if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
        !wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

        value = jQuery.htmlPrefilter( value );

        try {
          for ( ; i < l; i++ ) {
            elem = this[ i ] || {};

            // Remove element nodes and prevent memory leaks
            if ( elem.nodeType === 1 ) {
              jQuery.cleanData( getAll( elem, false ) );
              elem.innerHTML = value;
            }
          }

          elem = 0;

        // If using innerHTML throws an exception, use the fallback method
        } catch ( e ) {}
      }

      if ( elem ) {
        this.empty().append( value );
      }
    }, null, value, arguments.length );
  },

  replaceWith: function() {
    var ignored = [];

    // Make the changes, replacing each non-ignored context element with the new content
    return domManip( this, arguments, function( elem ) {
      var parent = this.parentNode;

      if ( jQuery.inArray( this, ignored ) < 0 ) {
        jQuery.cleanData( getAll( this ) );
        if ( parent ) {
          parent.replaceChild( elem, this );
        }
      }

    // Force callback invocation
    }, ignored );
  }
} );

jQuery.each( {
  appendTo: "append",
  prependTo: "prepend",
  insertBefore: "before",
  insertAfter: "after",
  replaceAll: "replaceWith"
}, function( name, original ) {
  jQuery.fn[ name ] = function( selector ) {
    var elems,
      ret = [],
      insert = jQuery( selector ),
      last = insert.length - 1,
      i = 0;

    for ( ; i <= last; i++ ) {
      elems = i === last ? this : this.clone( true );
      jQuery( insert[ i ] )[ original ]( elems );

      // Support: Android <=4.0 only, PhantomJS 1 only
      // .get() because push.apply(_, arraylike) throws on ancient WebKit
      push.apply( ret, elems.get() );
    }

    return this.pushStack( ret );
  };
} );
var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var rcustomProp = /^--/;


var getStyles = function( elem ) {

    // Support: IE <=11 only, Firefox <=30 (trac-15098, trac-14150)
    // IE throws on elements created in popups
    // FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
    var view = elem.ownerDocument.defaultView;

    if ( !view || !view.opener ) {
      view = window;
    }

    return view.getComputedStyle( elem );
  };

var swap = function( elem, options, callback ) {
  var ret, name,
    old = {};

  // Remember the old values, and insert the new ones
  for ( name in options ) {
    old[ name ] = elem.style[ name ];
    elem.style[ name ] = options[ name ];
  }

  ret = callback.call( elem );

  // Revert the old values
  for ( name in options ) {
    elem.style[ name ] = old[ name ];
  }

  return ret;
};


var rboxStyle = new RegExp( cssExpand.join( "|" ), "i" );



( function() {

  // Executing both pixelPosition & boxSizingReliable tests require only one layout
  // so they're executed at the same time to save the second computation.
  function computeStyleTests() {

    // This is a singleton, we need to execute it only once
    if ( !div ) {
      return;
    }

    container.style.cssText = "position:absolute;left:-11111px;width:60px;" +
      "margin-top:1px;padding:0;border:0";
    div.style.cssText =
      "position:relative;display:block;box-sizing:border-box;overflow:scroll;" +
      "margin:auto;border:1px;padding:1px;" +
      "width:60%;top:1%";
    documentElement.appendChild( container ).appendChild( div );

    var divStyle = window.getComputedStyle( div );
    pixelPositionVal = divStyle.top !== "1%";

    // Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
    reliableMarginLeftVal = roundPixelMeasures( divStyle.marginLeft ) === 12;

    // Support: Android 4.0 - 4.3 only, Safari <=9.1 - 10.1, iOS <=7.0 - 9.3
    // Some styles come back with percentage values, even though they shouldn't
    div.style.right = "60%";
    pixelBoxStylesVal = roundPixelMeasures( divStyle.right ) === 36;

    // Support: IE 9 - 11 only
    // Detect misreporting of content dimensions for box-sizing:border-box elements
    boxSizingReliableVal = roundPixelMeasures( divStyle.width ) === 36;

    // Support: IE 9 only
    // Detect overflow:scroll screwiness (gh-3699)
    // Support: Chrome <=64
    // Don't get tricked when zoom affects offsetWidth (gh-4029)
    div.style.position = "absolute";
    scrollboxSizeVal = roundPixelMeasures( div.offsetWidth / 3 ) === 12;

    documentElement.removeChild( container );

    // Nullify the div so it wouldn't be stored in the memory and
    // it will also be a sign that checks already performed
    div = null;
  }

  function roundPixelMeasures( measure ) {
    return Math.round( parseFloat( measure ) );
  }

  var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal,
    reliableTrDimensionsVal, reliableMarginLeftVal,
    container = document.createElement( "div" ),
    div = document.createElement( "div" );

  // Finish early in limited (non-browser) environments
  if ( !div.style ) {
    return;
  }

  // Support: IE <=9 - 11 only
  // Style of cloned element affects source element cloned (trac-8908)
  div.style.backgroundClip = "content-box";
  div.cloneNode( true ).style.backgroundClip = "";
  support.clearCloneStyle = div.style.backgroundClip === "content-box";

  jQuery.extend( support, {
    boxSizingReliable: function() {
      computeStyleTests();
      return boxSizingReliableVal;
    },
    pixelBoxStyles: function() {
      computeStyleTests();
      return pixelBoxStylesVal;
    },
    pixelPosition: function() {
      computeStyleTests();
      return pixelPositionVal;
    },
    reliableMarginLeft: function() {
      computeStyleTests();
      return reliableMarginLeftVal;
    },
    scrollboxSize: function() {
      computeStyleTests();
      return scrollboxSizeVal;
    },

    // Support: IE 9 - 11+, Edge 15 - 18+
    // IE/Edge misreport `getComputedStyle` of table rows with width/height
    // set in CSS while `offset*` properties report correct values.
    // Behavior in IE 9 is more subtle than in newer versions & it passes
    // some versions of this test; make sure not to make it pass there!
    //
    // Support: Firefox 70+
    // Only Firefox includes border widths
    // in computed dimensions. (gh-4529)
    reliableTrDimensions: function() {
      var table, tr, trChild, trStyle;
      if ( reliableTrDimensionsVal == null ) {
        table = document.createElement( "table" );
        tr = document.createElement( "tr" );
        trChild = document.createElement( "div" );

        table.style.cssText = "position:absolute;left:-11111px;border-collapse:separate";
        tr.style.cssText = "box-sizing:content-box;border:1px solid";

        // Support: Chrome 86+
        // Height set through cssText does not get applied.
        // Computed height then comes back as 0.
        tr.style.height = "1px";
        trChild.style.height = "9px";

        // Support: Android 8 Chrome 86+
        // In our bodyBackground.html iframe,
        // display for all div elements is set to "inline",
        // which causes a problem only in Android 8 Chrome 86.
        // Ensuring the div is `display: block`
        // gets around this issue.
        trChild.style.display = "block";

        documentElement
          .appendChild( table )
          .appendChild( tr )
          .appendChild( trChild );

        trStyle = window.getComputedStyle( tr );
        reliableTrDimensionsVal = ( parseInt( trStyle.height, 10 ) +
          parseInt( trStyle.borderTopWidth, 10 ) +
          parseInt( trStyle.borderBottomWidth, 10 ) ) === tr.offsetHeight;

        documentElement.removeChild( table );
      }
      return reliableTrDimensionsVal;
    }
  } );
} )();


function curCSS( elem, name, computed ) {
  var width, minWidth, maxWidth, ret,
    isCustomProp = rcustomProp.test( name ),

    // Support: Firefox 51+
    // Retrieving style before computed somehow
    // fixes an issue with getting wrong values
    // on detached elements
    style = elem.style;

  computed = computed || getStyles( elem );

  // getPropertyValue is needed for:
  //   .css('filter') (IE 9 only, trac-12537)
  //   .css('--customProperty) (gh-3144)
  if ( computed ) {

    // Support: IE <=9 - 11+
    // IE only supports `"float"` in `getPropertyValue`; in computed styles
    // it's only available as `"cssFloat"`. We no longer modify properties
    // sent to `.css()` apart from camelCasing, so we need to check both.
    // Normally, this would create difference in behavior: if
    // `getPropertyValue` returns an empty string, the value returned
    // by `.css()` would be `undefined`. This is usually the case for
    // disconnected elements. However, in IE even disconnected elements
    // with no styles return `"none"` for `getPropertyValue( "float" )`
    ret = computed.getPropertyValue( name ) || computed[ name ];

    if ( isCustomProp && ret ) {

      // Support: Firefox 105+, Chrome <=105+
      // Spec requires trimming whitespace for custom properties (gh-4926).
      // Firefox only trims leading whitespace. Chrome just collapses
      // both leading & trailing whitespace to a single space.
      //
      // Fall back to `undefined` if empty string returned.
      // This collapses a missing definition with property defined
      // and set to an empty string but there's no standard API
      // allowing us to differentiate them without a performance penalty
      // and returning `undefined` aligns with older jQuery.
      //
      // rtrimCSS treats U+000D CARRIAGE RETURN and U+000C FORM FEED
      // as whitespace while CSS does not, but this is not a problem
      // because CSS preprocessing replaces them with U+000A LINE FEED
      // (which *is* CSS whitespace)
      // https://www.w3.org/TR/css-syntax-3/#input-preprocessing
      ret = ret.replace( rtrimCSS, "$1" ) || undefined;
    }

    if ( ret === "" && !isAttached( elem ) ) {
      ret = jQuery.style( elem, name );
    }

    // A tribute to the "awesome hack by Dean Edwards"
    // Android Browser returns percentage for some values,
    // but width seems to be reliably pixels.
    // This is against the CSSOM draft spec:
    // https://drafts.csswg.org/cssom/#resolved-values
    if ( !support.pixelBoxStyles() && rnumnonpx.test( ret ) && rboxStyle.test( name ) ) {

      // Remember the original values
      width = style.width;
      minWidth = style.minWidth;
      maxWidth = style.maxWidth;

      // Put in the new values to get a computed value out
      style.minWidth = style.maxWidth = style.width = ret;
      ret = computed.width;

      // Revert the changed values
      style.width = width;
      style.minWidth = minWidth;
      style.maxWidth = maxWidth;
    }
  }

  return ret !== undefined ?

    // Support: IE <=9 - 11 only
    // IE returns zIndex value as an integer.
    ret + "" :
    ret;
}


function addGetHookIf( conditionFn, hookFn ) {

  // Define the hook, we'll check on the first run if it's really needed.
  return {
    get: function() {
      if ( conditionFn() ) {

        // Hook not needed (or it's not possible to use it due
        // to missing dependency), remove it.
        delete this.get;
        return;
      }

      // Hook needed; redefine it so that the support test is not executed again.
      return ( this.get = hookFn ).apply( this, arguments );
    }
  };
}


var cssPrefixes = [ "Webkit", "Moz", "ms" ],
  emptyStyle = document.createElement( "div" ).style,
  vendorProps = {};

// Return a vendor-prefixed property or undefined
function vendorPropName( name ) {

  // Check for vendor prefixed names
  var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
    i = cssPrefixes.length;

  while ( i-- ) {
    name = cssPrefixes[ i ] + capName;
    if ( name in emptyStyle ) {
      return name;
    }
  }
}

// Return a potentially-mapped jQuery.cssProps or vendor prefixed property
function finalPropName( name ) {
  var final = jQuery.cssProps[ name ] || vendorProps[ name ];

  if ( final ) {
    return final;
  }
  if ( name in emptyStyle ) {
    return name;
  }
  return vendorProps[ name ] = vendorPropName( name ) || name;
}


var

  // Swappable if display is none or starts with table
  // except "table", "table-cell", or "table-caption"
  // See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
  rdisplayswap = /^(none|table(?!-c[ea]).+)/,
  cssShow = { position: "absolute", visibility: "hidden", display: "block" },
  cssNormalTransform = {
    letterSpacing: "0",
    fontWeight: "400"
  };

function setPositiveNumber( _elem, value, subtract ) {

  // Any relative (+/-) values have already been
  // normalized at this point
  var matches = rcssNum.exec( value );
  return matches ?

    // Guard against undefined "subtract", e.g., when used as in cssHooks
    Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
    value;
}

function boxModelAdjustment( elem, dimension, box, isBorderBox, styles, computedVal ) {
  var i = dimension === "width" ? 1 : 0,
    extra = 0,
    delta = 0,
    marginDelta = 0;

  // Adjustment may not be necessary
  if ( box === ( isBorderBox ? "border" : "content" ) ) {
    return 0;
  }

  for ( ; i < 4; i += 2 ) {

    // Both box models exclude margin
    // Count margin delta separately to only add it after scroll gutter adjustment.
    // This is needed to make negative margins work with `outerHeight( true )` (gh-3982).
    if ( box === "margin" ) {
      marginDelta += jQuery.css( elem, box + cssExpand[ i ], true, styles );
    }

    // If we get here with a content-box, we're seeking "padding" or "border" or "margin"
    if ( !isBorderBox ) {

      // Add padding
      delta += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

      // For "border" or "margin", add border
      if ( box !== "padding" ) {
        delta += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );

      // But still keep track of it otherwise
      } else {
        extra += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
      }

    // If we get here with a border-box (content + padding + border), we're seeking "content" or
    // "padding" or "margin"
    } else {

      // For "content", subtract padding
      if ( box === "content" ) {
        delta -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
      }

      // For "content" or "padding", subtract border
      if ( box !== "margin" ) {
        delta -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
      }
    }
  }

  // Account for positive content-box scroll gutter when requested by providing computedVal
  if ( !isBorderBox && computedVal >= 0 ) {

    // offsetWidth/offsetHeight is a rounded sum of content, padding, scroll gutter, and border
    // Assuming integer scroll gutter, subtract the rest and round down
    delta += Math.max( 0, Math.ceil(
      elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
      computedVal -
      delta -
      extra -
      0.5

    // If offsetWidth/offsetHeight is unknown, then we can't determine content-box scroll gutter
    // Use an explicit zero to avoid NaN (gh-3964)
    ) ) || 0;
  }

  return delta + marginDelta;
}

function getWidthOrHeight( elem, dimension, extra ) {

  // Start with computed style
  var styles = getStyles( elem ),

    // To avoid forcing a reflow, only fetch boxSizing if we need it (gh-4322).
    // Fake content-box until we know it's needed to know the true value.
    boxSizingNeeded = !support.boxSizingReliable() || extra,
    isBorderBox = boxSizingNeeded &&
      jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
    valueIsBorderBox = isBorderBox,

    val = curCSS( elem, dimension, styles ),
    offsetProp = "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 );

  // Support: Firefox <=54
  // Return a confounding non-pixel value or feign ignorance, as appropriate.
  if ( rnumnonpx.test( val ) ) {
    if ( !extra ) {
      return val;
    }
    val = "auto";
  }


  // Support: IE 9 - 11 only
  // Use offsetWidth/offsetHeight for when box sizing is unreliable.
  // In those cases, the computed value can be trusted to be border-box.
  if ( ( !support.boxSizingReliable() && isBorderBox ||

    // Support: IE 10 - 11+, Edge 15 - 18+
    // IE/Edge misreport `getComputedStyle` of table rows with width/height
    // set in CSS while `offset*` properties report correct values.
    // Interestingly, in some cases IE 9 doesn't suffer from this issue.
    !support.reliableTrDimensions() && nodeName( elem, "tr" ) ||

    // Fall back to offsetWidth/offsetHeight when value is "auto"
    // This happens for inline elements with no explicit setting (gh-3571)
    val === "auto" ||

    // Support: Android <=4.1 - 4.3 only
    // Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
    !parseFloat( val ) && jQuery.css( elem, "display", false, styles ) === "inline" ) &&

    // Make sure the element is visible & connected
    elem.getClientRects().length ) {

    isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

    // Where available, offsetWidth/offsetHeight approximate border box dimensions.
    // Where not available (e.g., SVG), assume unreliable box-sizing and interpret the
    // retrieved value as a content box dimension.
    valueIsBorderBox = offsetProp in elem;
    if ( valueIsBorderBox ) {
      val = elem[ offsetProp ];
    }
  }

  // Normalize "" and auto
  val = parseFloat( val ) || 0;

  // Adjust for the element's box model
  return ( val +
    boxModelAdjustment(
      elem,
      dimension,
      extra || ( isBorderBox ? "border" : "content" ),
      valueIsBorderBox,
      styles,

      // Provide the current computed size to request scroll gutter calculation (gh-3589)
      val
    )
  ) + "px";
}

jQuery.extend( {

  // Add in style property hooks for overriding the default
  // behavior of getting and setting a style property
  cssHooks: {
    opacity: {
      get: function( elem, computed ) {
        if ( computed ) {

          // We should always get a number back from opacity
          var ret = curCSS( elem, "opacity" );
          return ret === "" ? "1" : ret;
        }
      }
    }
  },

  // Don't automatically add "px" to these possibly-unitless properties
  cssNumber: {
    animationIterationCount: true,
    aspectRatio: true,
    borderImageSlice: true,
    columnCount: true,
    flexGrow: true,
    flexShrink: true,
    fontWeight: true,
    gridArea: true,
    gridColumn: true,
    gridColumnEnd: true,
    gridColumnStart: true,
    gridRow: true,
    gridRowEnd: true,
    gridRowStart: true,
    lineHeight: true,
    opacity: true,
    order: true,
    orphans: true,
    scale: true,
    widows: true,
    zIndex: true,
    zoom: true,

    // SVG-related
    fillOpacity: true,
    floodOpacity: true,
    stopOpacity: true,
    strokeMiterlimit: true,
    strokeOpacity: true
  },

  // Add in properties whose names you wish to fix before
  // setting or getting the value
  cssProps: {},

  // Get and set the style property on a DOM Node
  style: function( elem, name, value, extra ) {

    // Don't set styles on text and comment nodes
    if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
      return;
    }

    // Make sure that we're working with the right name
    var ret, type, hooks,
      origName = camelCase( name ),
      isCustomProp = rcustomProp.test( name ),
      style = elem.style;

    // Make sure that we're working with the right name. We don't
    // want to query the value if it is a CSS custom property
    // since they are user-defined.
    if ( !isCustomProp ) {
      name = finalPropName( origName );
    }

    // Gets hook for the prefixed version, then unprefixed version
    hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

    // Check if we're setting a value
    if ( value !== undefined ) {
      type = typeof value;

      // Convert "+=" or "-=" to relative numbers (trac-7345)
      if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
        value = adjustCSS( elem, name, ret );

        // Fixes bug trac-9237
        type = "number";
      }

      // Make sure that null and NaN values aren't set (trac-7116)
      if ( value == null || value !== value ) {
        return;
      }

      // If a number was passed in, add the unit (except for certain CSS properties)
      // The isCustomProp check can be removed in jQuery 4.0 when we only auto-append
      // "px" to a few hardcoded values.
      if ( type === "number" && !isCustomProp ) {
        value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
      }

      // background-* props affect original clone's values
      if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
        style[ name ] = "inherit";
      }

      // If a hook was provided, use that value, otherwise just set the specified value
      if ( !hooks || !( "set" in hooks ) ||
        ( value = hooks.set( elem, value, extra ) ) !== undefined ) {

        if ( isCustomProp ) {
          style.setProperty( name, value );
        } else {
          style[ name ] = value;
        }
      }

    } else {

      // If a hook was provided get the non-computed value from there
      if ( hooks && "get" in hooks &&
        ( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

        return ret;
      }

      // Otherwise just get the value from the style object
      return style[ name ];
    }
  },

  css: function( elem, name, extra, styles ) {
    var val, num, hooks,
      origName = camelCase( name ),
      isCustomProp = rcustomProp.test( name );

    // Make sure that we're working with the right name. We don't
    // want to modify the value if it is a CSS custom property
    // since they are user-defined.
    if ( !isCustomProp ) {
      name = finalPropName( origName );
    }

    // Try prefixed name followed by the unprefixed name
    hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

    // If a hook was provided get the computed value from there
    if ( hooks && "get" in hooks ) {
      val = hooks.get( elem, true, extra );
    }

    // Otherwise, if a way to get the computed value exists, use that
    if ( val === undefined ) {
      val = curCSS( elem, name, styles );
    }

    // Convert "normal" to computed value
    if ( val === "normal" && name in cssNormalTransform ) {
      val = cssNormalTransform[ name ];
    }

    // Make numeric if forced or a qualifier was provided and val looks numeric
    if ( extra === "" || extra ) {
      num = parseFloat( val );
      return extra === true || isFinite( num ) ? num || 0 : val;
    }

    return val;
  }
} );

jQuery.each( [ "height", "width" ], function( _i, dimension ) {
  jQuery.cssHooks[ dimension ] = {
    get: function( elem, computed, extra ) {
      if ( computed ) {

        // Certain elements can have dimension info if we invisibly show them
        // but it must have a current display style that would benefit
        return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

          // Support: Safari 8+
          // Table columns in Safari have non-zero offsetWidth & zero
          // getBoundingClientRect().width unless display is changed.
          // Support: IE <=11 only
          // Running getBoundingClientRect on a disconnected node
          // in IE throws an error.
          ( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
          swap( elem, cssShow, function() {
            return getWidthOrHeight( elem, dimension, extra );
          } ) :
          getWidthOrHeight( elem, dimension, extra );
      }
    },

    set: function( elem, value, extra ) {
      var matches,
        styles = getStyles( elem ),

        // Only read styles.position if the test has a chance to fail
        // to avoid forcing a reflow.
        scrollboxSizeBuggy = !support.scrollboxSize() &&
          styles.position === "absolute",

        // To avoid forcing a reflow, only fetch boxSizing if we need it (gh-3991)
        boxSizingNeeded = scrollboxSizeBuggy || extra,
        isBorderBox = boxSizingNeeded &&
          jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
        subtract = extra ?
          boxModelAdjustment(
            elem,
            dimension,
            extra,
            isBorderBox,
            styles
          ) :
          0;

      // Account for unreliable border-box dimensions by comparing offset* to computed and
      // faking a content-box to get border and padding (gh-3699)
      if ( isBorderBox && scrollboxSizeBuggy ) {
        subtract -= Math.ceil(
          elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
          parseFloat( styles[ dimension ] ) -
          boxModelAdjustment( elem, dimension, "border", false, styles ) -
          0.5
        );
      }

      // Convert to pixels if value adjustment is needed
      if ( subtract && ( matches = rcssNum.exec( value ) ) &&
        ( matches[ 3 ] || "px" ) !== "px" ) {

        elem.style[ dimension ] = value;
        value = jQuery.css( elem, dimension );
      }

      return setPositiveNumber( elem, value, subtract );
    }
  };
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
  function( elem, computed ) {
    if ( computed ) {
      return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
        elem.getBoundingClientRect().left -
          swap( elem, { marginLeft: 0 }, function() {
            return elem.getBoundingClientRect().left;
          } )
      ) + "px";
    }
  }
);

// These hooks are used by animate to expand properties
jQuery.each( {
  margin: "",
  padding: "",
  border: "Width"
}, function( prefix, suffix ) {
  jQuery.cssHooks[ prefix + suffix ] = {
    expand: function( value ) {
      var i = 0,
        expanded = {},

        // Assumes a single number if not a string
        parts = typeof value === "string" ? value.split( " " ) : [ value ];

      for ( ; i < 4; i++ ) {
        expanded[ prefix + cssExpand[ i ] + suffix ] =
          parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
      }

      return expanded;
    }
  };

  if ( prefix !== "margin" ) {
    jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
  }
} );

jQuery.fn.extend( {
  css: function( name, value ) {
    return access( this, function( elem, name, value ) {
      var styles, len,
        map = {},
        i = 0;

      if ( Array.isArray( name ) ) {
        styles = getStyles( elem );
        len = name.length;

        for ( ; i < len; i++ ) {
          map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
        }

        return map;
      }

      return value !== undefined ?
        jQuery.style( elem, name, value ) :
        jQuery.css( elem, name );
    }, name, value, arguments.length > 1 );
  }
} );


function Tween( elem, options, prop, end, easing ) {
  return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
  constructor: Tween,
  init: function( elem, options, prop, end, easing, unit ) {
    this.elem = elem;
    this.prop = prop;
    this.easing = easing || jQuery.easing._default;
    this.options = options;
    this.start = this.now = this.cur();
    this.end = end;
    this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
  },
  cur: function() {
    var hooks = Tween.propHooks[ this.prop ];

    return hooks && hooks.get ?
      hooks.get( this ) :
      Tween.propHooks._default.get( this );
  },
  run: function( percent ) {
    var eased,
      hooks = Tween.propHooks[ this.prop ];

    if ( this.options.duration ) {
      this.pos = eased = jQuery.easing[ this.easing ](
        percent, this.options.duration * percent, 0, 1, this.options.duration
      );
    } else {
      this.pos = eased = percent;
    }
    this.now = ( this.end - this.start ) * eased + this.start;

    if ( this.options.step ) {
      this.options.step.call( this.elem, this.now, this );
    }

    if ( hooks && hooks.set ) {
      hooks.set( this );
    } else {
      Tween.propHooks._default.set( this );
    }
    return this;
  }
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
  _default: {
    get: function( tween ) {
      var result;

      // Use a property on the element directly when it is not a DOM element,
      // or when there is no matching style property that exists.
      if ( tween.elem.nodeType !== 1 ||
        tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
        return tween.elem[ tween.prop ];
      }

      // Passing an empty string as a 3rd parameter to .css will automatically
      // attempt a parseFloat and fallback to a string if the parse fails.
      // Simple values such as "10px" are parsed to Float;
      // complex values such as "rotate(1rad)" are returned as-is.
      result = jQuery.css( tween.elem, tween.prop, "" );

      // Empty strings, null, undefined and "auto" are converted to 0.
      return !result || result === "auto" ? 0 : result;
    },
    set: function( tween ) {

      // Use step hook for back compat.
      // Use cssHook if its there.
      // Use .style if available and use plain properties where available.
      if ( jQuery.fx.step[ tween.prop ] ) {
        jQuery.fx.step[ tween.prop ]( tween );
      } else if ( tween.elem.nodeType === 1 && (
        jQuery.cssHooks[ tween.prop ] ||
          tween.elem.style[ finalPropName( tween.prop ) ] != null ) ) {
        jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
      } else {
        tween.elem[ tween.prop ] = tween.now;
      }
    }
  }
};

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
  set: function( tween ) {
    if ( tween.elem.nodeType && tween.elem.parentNode ) {
      tween.elem[ tween.prop ] = tween.now;
    }
  }
};

jQuery.easing = {
  linear: function( p ) {
    return p;
  },
  swing: function( p ) {
    return 0.5 - Math.cos( p * Math.PI ) / 2;
  },
  _default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
  fxNow, inProgress,
  rfxtypes = /^(?:toggle|show|hide)$/,
  rrun = /queueHooks$/;

function schedule() {
  if ( inProgress ) {
    if ( document.hidden === false && window.requestAnimationFrame ) {
      window.requestAnimationFrame( schedule );
    } else {
      window.setTimeout( schedule, jQuery.fx.interval );
    }

    jQuery.fx.tick();
  }
}

// Animations created synchronously will run synchronously
function createFxNow() {
  window.setTimeout( function() {
    fxNow = undefined;
  } );
  return ( fxNow = Date.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
  var which,
    i = 0,
    attrs = { height: type };

  // If we include width, step value is 1 to do all cssExpand values,
  // otherwise step value is 2 to skip over Left and Right
  includeWidth = includeWidth ? 1 : 0;
  for ( ; i < 4; i += 2 - includeWidth ) {
    which = cssExpand[ i ];
    attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
  }

  if ( includeWidth ) {
    attrs.opacity = attrs.width = type;
  }

  return attrs;
}

function createTween( value, prop, animation ) {
  var tween,
    collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
    index = 0,
    length = collection.length;
  for ( ; index < length; index++ ) {
    if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

      // We're done with this property
      return tween;
    }
  }
}

function defaultPrefilter( elem, props, opts ) {
  var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
    isBox = "width" in props || "height" in props,
    anim = this,
    orig = {},
    style = elem.style,
    hidden = elem.nodeType && isHiddenWithinTree( elem ),
    dataShow = dataPriv.get( elem, "fxshow" );

  // Queue-skipping animations hijack the fx hooks
  if ( !opts.queue ) {
    hooks = jQuery._queueHooks( elem, "fx" );
    if ( hooks.unqueued == null ) {
      hooks.unqueued = 0;
      oldfire = hooks.empty.fire;
      hooks.empty.fire = function() {
        if ( !hooks.unqueued ) {
          oldfire();
        }
      };
    }
    hooks.unqueued++;

    anim.always( function() {

      // Ensure the complete handler is called before this completes
      anim.always( function() {
        hooks.unqueued--;
        if ( !jQuery.queue( elem, "fx" ).length ) {
          hooks.empty.fire();
        }
      } );
    } );
  }

  // Detect show/hide animations
  for ( prop in props ) {
    value = props[ prop ];
    if ( rfxtypes.test( value ) ) {
      delete props[ prop ];
      toggle = toggle || value === "toggle";
      if ( value === ( hidden ? "hide" : "show" ) ) {

        // Pretend to be hidden if this is a "show" and
        // there is still data from a stopped show/hide
        if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
          hidden = true;

        // Ignore all other no-op show/hide data
        } else {
          continue;
        }
      }
      orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
    }
  }

  // Bail out if this is a no-op like .hide().hide()
  propTween = !jQuery.isEmptyObject( props );
  if ( !propTween && jQuery.isEmptyObject( orig ) ) {
    return;
  }

  // Restrict "overflow" and "display" styles during box animations
  if ( isBox && elem.nodeType === 1 ) {

    // Support: IE <=9 - 11, Edge 12 - 15
    // Record all 3 overflow attributes because IE does not infer the shorthand
    // from identically-valued overflowX and overflowY and Edge just mirrors
    // the overflowX value there.
    opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

    // Identify a display type, preferring old show/hide data over the CSS cascade
    restoreDisplay = dataShow && dataShow.display;
    if ( restoreDisplay == null ) {
      restoreDisplay = dataPriv.get( elem, "display" );
    }
    display = jQuery.css( elem, "display" );
    if ( display === "none" ) {
      if ( restoreDisplay ) {
        display = restoreDisplay;
      } else {

        // Get nonempty value(s) by temporarily forcing visibility
        showHide( [ elem ], true );
        restoreDisplay = elem.style.display || restoreDisplay;
        display = jQuery.css( elem, "display" );
        showHide( [ elem ] );
      }
    }

    // Animate inline elements as inline-block
    if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
      if ( jQuery.css( elem, "float" ) === "none" ) {

        // Restore the original display value at the end of pure show/hide animations
        if ( !propTween ) {
          anim.done( function() {
            style.display = restoreDisplay;
          } );
          if ( restoreDisplay == null ) {
            display = style.display;
            restoreDisplay = display === "none" ? "" : display;
          }
        }
        style.display = "inline-block";
      }
    }
  }

  if ( opts.overflow ) {
    style.overflow = "hidden";
    anim.always( function() {
      style.overflow = opts.overflow[ 0 ];
      style.overflowX = opts.overflow[ 1 ];
      style.overflowY = opts.overflow[ 2 ];
    } );
  }

  // Implement show/hide animations
  propTween = false;
  for ( prop in orig ) {

    // General show/hide setup for this element animation
    if ( !propTween ) {
      if ( dataShow ) {
        if ( "hidden" in dataShow ) {
          hidden = dataShow.hidden;
        }
      } else {
        dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
      }

      // Store hidden/visible for toggle so `.stop().toggle()` "reverses"
      if ( toggle ) {
        dataShow.hidden = !hidden;
      }

      // Show elements before animating them
      if ( hidden ) {
        showHide( [ elem ], true );
      }

      /* eslint-disable no-loop-func */

      anim.done( function() {

        /* eslint-enable no-loop-func */

        // The final step of a "hide" animation is actually hiding the element
        if ( !hidden ) {
          showHide( [ elem ] );
        }
        dataPriv.remove( elem, "fxshow" );
        for ( prop in orig ) {
          jQuery.style( elem, prop, orig[ prop ] );
        }
      } );
    }

    // Per-property setup
    propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
    if ( !( prop in dataShow ) ) {
      dataShow[ prop ] = propTween.start;
      if ( hidden ) {
        propTween.end = propTween.start;
        propTween.start = 0;
      }
    }
  }
}

function propFilter( props, specialEasing ) {
  var index, name, easing, value, hooks;

  // camelCase, specialEasing and expand cssHook pass
  for ( index in props ) {
    name = camelCase( index );
    easing = specialEasing[ name ];
    value = props[ index ];
    if ( Array.isArray( value ) ) {
      easing = value[ 1 ];
      value = props[ index ] = value[ 0 ];
    }

    if ( index !== name ) {
      props[ name ] = value;
      delete props[ index ];
    }

    hooks = jQuery.cssHooks[ name ];
    if ( hooks && "expand" in hooks ) {
      value = hooks.expand( value );
      delete props[ name ];

      // Not quite $.extend, this won't overwrite existing keys.
      // Reusing 'index' because we have the correct "name"
      for ( index in value ) {
        if ( !( index in props ) ) {
          props[ index ] = value[ index ];
          specialEasing[ index ] = easing;
        }
      }
    } else {
      specialEasing[ name ] = easing;
    }
  }
}

function Animation( elem, properties, options ) {
  var result,
    stopped,
    index = 0,
    length = Animation.prefilters.length,
    deferred = jQuery.Deferred().always( function() {

      // Don't match elem in the :animated selector
      delete tick.elem;
    } ),
    tick = function() {
      if ( stopped ) {
        return false;
      }
      var currentTime = fxNow || createFxNow(),
        remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

        // Support: Android 2.3 only
        // Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (trac-12497)
        temp = remaining / animation.duration || 0,
        percent = 1 - temp,
        index = 0,
        length = animation.tweens.length;

      for ( ; index < length; index++ ) {
        animation.tweens[ index ].run( percent );
      }

      deferred.notifyWith( elem, [ animation, percent, remaining ] );

      // If there's more to do, yield
      if ( percent < 1 && length ) {
        return remaining;
      }

      // If this was an empty animation, synthesize a final progress notification
      if ( !length ) {
        deferred.notifyWith( elem, [ animation, 1, 0 ] );
      }

      // Resolve the animation and report its conclusion
      deferred.resolveWith( elem, [ animation ] );
      return false;
    },
    animation = deferred.promise( {
      elem: elem,
      props: jQuery.extend( {}, properties ),
      opts: jQuery.extend( true, {
        specialEasing: {},
        easing: jQuery.easing._default
      }, options ),
      originalProperties: properties,
      originalOptions: options,
      startTime: fxNow || createFxNow(),
      duration: options.duration,
      tweens: [],
      createTween: function( prop, end ) {
        var tween = jQuery.Tween( elem, animation.opts, prop, end,
          animation.opts.specialEasing[ prop ] || animation.opts.easing );
        animation.tweens.push( tween );
        return tween;
      },
      stop: function( gotoEnd ) {
        var index = 0,

          // If we are going to the end, we want to run all the tweens
          // otherwise we skip this part
          length = gotoEnd ? animation.tweens.length : 0;
        if ( stopped ) {
          return this;
        }
        stopped = true;
        for ( ; index < length; index++ ) {
          animation.tweens[ index ].run( 1 );
        }

        // Resolve when we played the last frame; otherwise, reject
        if ( gotoEnd ) {
          deferred.notifyWith( elem, [ animation, 1, 0 ] );
          deferred.resolveWith( elem, [ animation, gotoEnd ] );
        } else {
          deferred.rejectWith( elem, [ animation, gotoEnd ] );
        }
        return this;
      }
    } ),
    props = animation.props;

  propFilter( props, animation.opts.specialEasing );

  for ( ; index < length; index++ ) {
    result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
    if ( result ) {
      if ( isFunction( result.stop ) ) {
        jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
          result.stop.bind( result );
      }
      return result;
    }
  }

  jQuery.map( props, createTween, animation );

  if ( isFunction( animation.opts.start ) ) {
    animation.opts.start.call( elem, animation );
  }

  // Attach callbacks from options
  animation
    .progress( animation.opts.progress )
    .done( animation.opts.done, animation.opts.complete )
    .fail( animation.opts.fail )
    .always( animation.opts.always );

  jQuery.fx.timer(
    jQuery.extend( tick, {
      elem: elem,
      anim: animation,
      queue: animation.opts.queue
    } )
  );

  return animation;
}

jQuery.Animation = jQuery.extend( Animation, {

  tweeners: {
    "*": [ function( prop, value ) {
      var tween = this.createTween( prop, value );
      adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
      return tween;
    } ]
  },

  tweener: function( props, callback ) {
    if ( isFunction( props ) ) {
      callback = props;
      props = [ "*" ];
    } else {
      props = props.match( rnothtmlwhite );
    }

    var prop,
      index = 0,
      length = props.length;

    for ( ; index < length; index++ ) {
      prop = props[ index ];
      Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
      Animation.tweeners[ prop ].unshift( callback );
    }
  },

  prefilters: [ defaultPrefilter ],

  prefilter: function( callback, prepend ) {
    if ( prepend ) {
      Animation.prefilters.unshift( callback );
    } else {
      Animation.prefilters.push( callback );
    }
  }
} );

jQuery.speed = function( speed, easing, fn ) {
  var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
    complete: fn || !fn && easing ||
      isFunction( speed ) && speed,
    duration: speed,
    easing: fn && easing || easing && !isFunction( easing ) && easing
  };

  // Go to the end state if fx are off
  if ( jQuery.fx.off ) {
    opt.duration = 0;

  } else {
    if ( typeof opt.duration !== "number" ) {
      if ( opt.duration in jQuery.fx.speeds ) {
        opt.duration = jQuery.fx.speeds[ opt.duration ];

      } else {
        opt.duration = jQuery.fx.speeds._default;
      }
    }
  }

  // Normalize opt.queue - true/undefined/null -> "fx"
  if ( opt.queue == null || opt.queue === true ) {
    opt.queue = "fx";
  }

  // Queueing
  opt.old = opt.complete;

  opt.complete = function() {
    if ( isFunction( opt.old ) ) {
      opt.old.call( this );
    }

    if ( opt.queue ) {
      jQuery.dequeue( this, opt.queue );
    }
  };

  return opt;
};

jQuery.fn.extend( {
  fadeTo: function( speed, to, easing, callback ) {

    // Show any hidden elements after setting opacity to 0
    return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

      // Animate to the value specified
      .end().animate( { opacity: to }, speed, easing, callback );
  },
  animate: function( prop, speed, easing, callback ) {
    var empty = jQuery.isEmptyObject( prop ),
      optall = jQuery.speed( speed, easing, callback ),
      doAnimation = function() {

        // Operate on a copy of prop so per-property easing won't be lost
        var anim = Animation( this, jQuery.extend( {}, prop ), optall );

        // Empty animations, or finishing resolves immediately
        if ( empty || dataPriv.get( this, "finish" ) ) {
          anim.stop( true );
        }
      };

    doAnimation.finish = doAnimation;

    return empty || optall.queue === false ?
      this.each( doAnimation ) :
      this.queue( optall.queue, doAnimation );
  },
  stop: function( type, clearQueue, gotoEnd ) {
    var stopQueue = function( hooks ) {
      var stop = hooks.stop;
      delete hooks.stop;
      stop( gotoEnd );
    };

    if ( typeof type !== "string" ) {
      gotoEnd = clearQueue;
      clearQueue = type;
      type = undefined;
    }
    if ( clearQueue ) {
      this.queue( type || "fx", [] );
    }

    return this.each( function() {
      var dequeue = true,
        index = type != null && type + "queueHooks",
        timers = jQuery.timers,
        data = dataPriv.get( this );

      if ( index ) {
        if ( data[ index ] && data[ index ].stop ) {
          stopQueue( data[ index ] );
        }
      } else {
        for ( index in data ) {
          if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
            stopQueue( data[ index ] );
          }
        }
      }

      for ( index = timers.length; index--; ) {
        if ( timers[ index ].elem === this &&
          ( type == null || timers[ index ].queue === type ) ) {

          timers[ index ].anim.stop( gotoEnd );
          dequeue = false;
          timers.splice( index, 1 );
        }
      }

      // Start the next in the queue if the last step wasn't forced.
      // Timers currently will call their complete callbacks, which
      // will dequeue but only if they were gotoEnd.
      if ( dequeue || !gotoEnd ) {
        jQuery.dequeue( this, type );
      }
    } );
  },
  finish: function( type ) {
    if ( type !== false ) {
      type = type || "fx";
    }
    return this.each( function() {
      var index,
        data = dataPriv.get( this ),
        queue = data[ type + "queue" ],
        hooks = data[ type + "queueHooks" ],
        timers = jQuery.timers,
        length = queue ? queue.length : 0;

      // Enable finishing flag on private data
      data.finish = true;

      // Empty the queue first
      jQuery.queue( this, type, [] );

      if ( hooks && hooks.stop ) {
        hooks.stop.call( this, true );
      }

      // Look for any active animations, and finish them
      for ( index = timers.length; index--; ) {
        if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
          timers[ index ].anim.stop( true );
          timers.splice( index, 1 );
        }
      }

      // Look for any animations in the old queue and finish them
      for ( index = 0; index < length; index++ ) {
        if ( queue[ index ] && queue[ index ].finish ) {
          queue[ index ].finish.call( this );
        }
      }

      // Turn off finishing flag
      delete data.finish;
    } );
  }
} );

jQuery.each( [ "toggle", "show", "hide" ], function( _i, name ) {
  var cssFn = jQuery.fn[ name ];
  jQuery.fn[ name ] = function( speed, easing, callback ) {
    return speed == null || typeof speed === "boolean" ?
      cssFn.apply( this, arguments ) :
      this.animate( genFx( name, true ), speed, easing, callback );
  };
} );

// Generate shortcuts for custom animations
jQuery.each( {
  slideDown: genFx( "show" ),
  slideUp: genFx( "hide" ),
  slideToggle: genFx( "toggle" ),
  fadeIn: { opacity: "show" },
  fadeOut: { opacity: "hide" },
  fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
  jQuery.fn[ name ] = function( speed, easing, callback ) {
    return this.animate( props, speed, easing, callback );
  };
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
  var timer,
    i = 0,
    timers = jQuery.timers;

  fxNow = Date.now();

  for ( ; i < timers.length; i++ ) {
    timer = timers[ i ];

    // Run the timer and safely remove it when done (allowing for external removal)
    if ( !timer() && timers[ i ] === timer ) {
      timers.splice( i--, 1 );
    }
  }

  if ( !timers.length ) {
    jQuery.fx.stop();
  }
  fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
  jQuery.timers.push( timer );
  jQuery.fx.start();
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
  if ( inProgress ) {
    return;
  }

  inProgress = true;
  schedule();
};

jQuery.fx.stop = function() {
  inProgress = null;
};

jQuery.fx.speeds = {
  slow: 600,
  fast: 200,

  // Default speed
  _default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
jQuery.fn.delay = function( time, type ) {
  time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
  type = type || "fx";

  return this.queue( type, function( next, hooks ) {
    var timeout = window.setTimeout( next, time );
    hooks.stop = function() {
      window.clearTimeout( timeout );
    };
  } );
};


( function() {
  var input = document.createElement( "input" ),
    select = document.createElement( "select" ),
    opt = select.appendChild( document.createElement( "option" ) );

  input.type = "checkbox";

  // Support: Android <=4.3 only
  // Default value for a checkbox should be "on"
  support.checkOn = input.value !== "";

  // Support: IE <=11 only
  // Must access selectedIndex to make default options select
  support.optSelected = opt.selected;

  // Support: IE <=11 only
  // An input loses its value after becoming a radio
  input = document.createElement( "input" );
  input.value = "t";
  input.type = "radio";
  support.radioValue = input.value === "t";
} )();


var boolHook,
  attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
  attr: function( name, value ) {
    return access( this, jQuery.attr, name, value, arguments.length > 1 );
  },

  removeAttr: function( name ) {
    return this.each( function() {
      jQuery.removeAttr( this, name );
    } );
  }
} );

jQuery.extend( {
  attr: function( elem, name, value ) {
    var ret, hooks,
      nType = elem.nodeType;

    // Don't get/set attributes on text, comment and attribute nodes
    if ( nType === 3 || nType === 8 || nType === 2 ) {
      return;
    }

    // Fallback to prop when attributes are not supported
    if ( typeof elem.getAttribute === "undefined" ) {
      return jQuery.prop( elem, name, value );
    }

    // Attribute hooks are determined by the lowercase version
    // Grab necessary hook if one is defined
    if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
      hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
        ( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
    }

    if ( value !== undefined ) {
      if ( value === null ) {
        jQuery.removeAttr( elem, name );
        return;
      }

      if ( hooks && "set" in hooks &&
        ( ret = hooks.set( elem, value, name ) ) !== undefined ) {
        return ret;
      }

      elem.setAttribute( name, value + "" );
      return value;
    }

    if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
      return ret;
    }

    ret = jQuery.find.attr( elem, name );

    // Non-existent attributes return null, we normalize to undefined
    return ret == null ? undefined : ret;
  },

  attrHooks: {
    type: {
      set: function( elem, value ) {
        if ( !support.radioValue && value === "radio" &&
          nodeName( elem, "input" ) ) {
          var val = elem.value;
          elem.setAttribute( "type", value );
          if ( val ) {
            elem.value = val;
          }
          return value;
        }
      }
    }
  },

  removeAttr: function( elem, value ) {
    var name,
      i = 0,

      // Attribute names can contain non-HTML whitespace characters
      // https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
      attrNames = value && value.match( rnothtmlwhite );

    if ( attrNames && elem.nodeType === 1 ) {
      while ( ( name = attrNames[ i++ ] ) ) {
        elem.removeAttribute( name );
      }
    }
  }
} );

// Hooks for boolean attributes
boolHook = {
  set: function( elem, value, name ) {
    if ( value === false ) {

      // Remove boolean attributes when set to false
      jQuery.removeAttr( elem, name );
    } else {
      elem.setAttribute( name, name );
    }
    return name;
  }
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( _i, name ) {
  var getter = attrHandle[ name ] || jQuery.find.attr;

  attrHandle[ name ] = function( elem, name, isXML ) {
    var ret, handle,
      lowercaseName = name.toLowerCase();

    if ( !isXML ) {

      // Avoid an infinite loop by temporarily removing this function from the getter
      handle = attrHandle[ lowercaseName ];
      attrHandle[ lowercaseName ] = ret;
      ret = getter( elem, name, isXML ) != null ?
        lowercaseName :
        null;
      attrHandle[ lowercaseName ] = handle;
    }
    return ret;
  };
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
  rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
  prop: function( name, value ) {
    return access( this, jQuery.prop, name, value, arguments.length > 1 );
  },

  removeProp: function( name ) {
    return this.each( function() {
      delete this[ jQuery.propFix[ name ] || name ];
    } );
  }
} );

jQuery.extend( {
  prop: function( elem, name, value ) {
    var ret, hooks,
      nType = elem.nodeType;

    // Don't get/set properties on text, comment and attribute nodes
    if ( nType === 3 || nType === 8 || nType === 2 ) {
      return;
    }

    if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

      // Fix name and attach hooks
      name = jQuery.propFix[ name ] || name;
      hooks = jQuery.propHooks[ name ];
    }

    if ( value !== undefined ) {
      if ( hooks && "set" in hooks &&
        ( ret = hooks.set( elem, value, name ) ) !== undefined ) {
        return ret;
      }

      return ( elem[ name ] = value );
    }

    if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
      return ret;
    }

    return elem[ name ];
  },

  propHooks: {
    tabIndex: {
      get: function( elem ) {

        // Support: IE <=9 - 11 only
        // elem.tabIndex doesn't always return the
        // correct value when it hasn't been explicitly set
        // Use proper attribute retrieval (trac-12072)
        var tabindex = jQuery.find.attr( elem, "tabindex" );

        if ( tabindex ) {
          return parseInt( tabindex, 10 );
        }

        if (
          rfocusable.test( elem.nodeName ) ||
          rclickable.test( elem.nodeName ) &&
          elem.href
        ) {
          return 0;
        }

        return -1;
      }
    }
  },

  propFix: {
    "for": "htmlFor",
    "class": "className"
  }
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
  jQuery.propHooks.selected = {
    get: function( elem ) {

      /* eslint no-unused-expressions: "off" */

      var parent = elem.parentNode;
      if ( parent && parent.parentNode ) {
        parent.parentNode.selectedIndex;
      }
      return null;
    },
    set: function( elem ) {

      /* eslint no-unused-expressions: "off" */

      var parent = elem.parentNode;
      if ( parent ) {
        parent.selectedIndex;

        if ( parent.parentNode ) {
          parent.parentNode.selectedIndex;
        }
      }
    }
  };
}

jQuery.each( [
  "tabIndex",
  "readOnly",
  "maxLength",
  "cellSpacing",
  "cellPadding",
  "rowSpan",
  "colSpan",
  "useMap",
  "frameBorder",
  "contentEditable"
], function() {
  jQuery.propFix[ this.toLowerCase() ] = this;
} );




  // Strip and collapse whitespace according to HTML spec
  // https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
  function stripAndCollapse( value ) {
    var tokens = value.match( rnothtmlwhite ) || [];
    return tokens.join( " " );
  }


function getClass( elem ) {
  return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

function classesToArray( value ) {
  if ( Array.isArray( value ) ) {
    return value;
  }
  if ( typeof value === "string" ) {
    return value.match( rnothtmlwhite ) || [];
  }
  return [];
}

jQuery.fn.extend( {
  addClass: function( value ) {
    var classNames, cur, curValue, className, i, finalValue;

    if ( isFunction( value ) ) {
      return this.each( function( j ) {
        jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
      } );
    }

    classNames = classesToArray( value );

    if ( classNames.length ) {
      return this.each( function() {
        curValue = getClass( this );
        cur = this.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

        if ( cur ) {
          for ( i = 0; i < classNames.length; i++ ) {
            className = classNames[ i ];
            if ( cur.indexOf( " " + className + " " ) < 0 ) {
              cur += className + " ";
            }
          }

          // Only assign if different to avoid unneeded rendering.
          finalValue = stripAndCollapse( cur );
          if ( curValue !== finalValue ) {
            this.setAttribute( "class", finalValue );
          }
        }
      } );
    }

    return this;
  },

  removeClass: function( value ) {
    var classNames, cur, curValue, className, i, finalValue;

    if ( isFunction( value ) ) {
      return this.each( function( j ) {
        jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
      } );
    }

    if ( !arguments.length ) {
      return this.attr( "class", "" );
    }

    classNames = classesToArray( value );

    if ( classNames.length ) {
      return this.each( function() {
        curValue = getClass( this );

        // This expression is here for better compressibility (see addClass)
        cur = this.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

        if ( cur ) {
          for ( i = 0; i < classNames.length; i++ ) {
            className = classNames[ i ];

            // Remove *all* instances
            while ( cur.indexOf( " " + className + " " ) > -1 ) {
              cur = cur.replace( " " + className + " ", " " );
            }
          }

          // Only assign if different to avoid unneeded rendering.
          finalValue = stripAndCollapse( cur );
          if ( curValue !== finalValue ) {
            this.setAttribute( "class", finalValue );
          }
        }
      } );
    }

    return this;
  },

  toggleClass: function( value, stateVal ) {
    var classNames, className, i, self,
      type = typeof value,
      isValidValue = type === "string" || Array.isArray( value );

    if ( isFunction( value ) ) {
      return this.each( function( i ) {
        jQuery( this ).toggleClass(
          value.call( this, i, getClass( this ), stateVal ),
          stateVal
        );
      } );
    }

    if ( typeof stateVal === "boolean" && isValidValue ) {
      return stateVal ? this.addClass( value ) : this.removeClass( value );
    }

    classNames = classesToArray( value );

    return this.each( function() {
      if ( isValidValue ) {

        // Toggle individual class names
        self = jQuery( this );

        for ( i = 0; i < classNames.length; i++ ) {
          className = classNames[ i ];

          // Check each className given, space separated list
          if ( self.hasClass( className ) ) {
            self.removeClass( className );
          } else {
            self.addClass( className );
          }
        }

      // Toggle whole class name
      } else if ( value === undefined || type === "boolean" ) {
        className = getClass( this );
        if ( className ) {

          // Store className if set
          dataPriv.set( this, "__className__", className );
        }

        // If the element has a class name or if we're passed `false`,
        // then remove the whole classname (if there was one, the above saved it).
        // Otherwise bring back whatever was previously saved (if anything),
        // falling back to the empty string if nothing was stored.
        if ( this.setAttribute ) {
          this.setAttribute( "class",
            className || value === false ?
              "" :
              dataPriv.get( this, "__className__" ) || ""
          );
        }
      }
    } );
  },

  hasClass: function( selector ) {
    var className, elem,
      i = 0;

    className = " " + selector + " ";
    while ( ( elem = this[ i++ ] ) ) {
      if ( elem.nodeType === 1 &&
        ( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
        return true;
      }
    }

    return false;
  }
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
  val: function( value ) {
    var hooks, ret, valueIsFunction,
      elem = this[ 0 ];

    if ( !arguments.length ) {
      if ( elem ) {
        hooks = jQuery.valHooks[ elem.type ] ||
          jQuery.valHooks[ elem.nodeName.toLowerCase() ];

        if ( hooks &&
          "get" in hooks &&
          ( ret = hooks.get( elem, "value" ) ) !== undefined
        ) {
          return ret;
        }

        ret = elem.value;

        // Handle most common string cases
        if ( typeof ret === "string" ) {
          return ret.replace( rreturn, "" );
        }

        // Handle cases where value is null/undef or number
        return ret == null ? "" : ret;
      }

      return;
    }

    valueIsFunction = isFunction( value );

    return this.each( function( i ) {
      var val;

      if ( this.nodeType !== 1 ) {
        return;
      }

      if ( valueIsFunction ) {
        val = value.call( this, i, jQuery( this ).val() );
      } else {
        val = value;
      }

      // Treat null/undefined as ""; convert numbers to string
      if ( val == null ) {
        val = "";

      } else if ( typeof val === "number" ) {
        val += "";

      } else if ( Array.isArray( val ) ) {
        val = jQuery.map( val, function( value ) {
          return value == null ? "" : value + "";
        } );
      }

      hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

      // If set returns undefined, fall back to normal setting
      if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
        this.value = val;
      }
    } );
  }
} );

jQuery.extend( {
  valHooks: {
    option: {
      get: function( elem ) {

        var val = jQuery.find.attr( elem, "value" );
        return val != null ?
          val :

          // Support: IE <=10 - 11 only
          // option.text throws exceptions (trac-14686, trac-14858)
          // Strip and collapse whitespace
          // https://html.spec.whatwg.org/#strip-and-collapse-whitespace
          stripAndCollapse( jQuery.text( elem ) );
      }
    },
    select: {
      get: function( elem ) {
        var value, option, i,
          options = elem.options,
          index = elem.selectedIndex,
          one = elem.type === "select-one",
          values = one ? null : [],
          max = one ? index + 1 : options.length;

        if ( index < 0 ) {
          i = max;

        } else {
          i = one ? index : 0;
        }

        // Loop through all the selected options
        for ( ; i < max; i++ ) {
          option = options[ i ];

          // Support: IE <=9 only
          // IE8-9 doesn't update selected after form reset (trac-2551)
          if ( ( option.selected || i === index ) &&

              // Don't return options that are disabled or in a disabled optgroup
              !option.disabled &&
              ( !option.parentNode.disabled ||
                !nodeName( option.parentNode, "optgroup" ) ) ) {

            // Get the specific value for the option
            value = jQuery( option ).val();

            // We don't need an array for one selects
            if ( one ) {
              return value;
            }

            // Multi-Selects return an array
            values.push( value );
          }
        }

        return values;
      },

      set: function( elem, value ) {
        var optionSet, option,
          options = elem.options,
          values = jQuery.makeArray( value ),
          i = options.length;

        while ( i-- ) {
          option = options[ i ];

          /* eslint-disable no-cond-assign */

          if ( option.selected =
            jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
          ) {
            optionSet = true;
          }

          /* eslint-enable no-cond-assign */
        }

        // Force browsers to behave consistently when non-matching value is set
        if ( !optionSet ) {
          elem.selectedIndex = -1;
        }
        return values;
      }
    }
  }
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
  jQuery.valHooks[ this ] = {
    set: function( elem, value ) {
      if ( Array.isArray( value ) ) {
        return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
      }
    }
  };
  if ( !support.checkOn ) {
    jQuery.valHooks[ this ].get = function( elem ) {
      return elem.getAttribute( "value" ) === null ? "on" : elem.value;
    };
  }
} );




// Return jQuery for attributes-only inclusion
var location = window.location;

var nonce = { guid: Date.now() };

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
  var xml, parserErrorElem;
  if ( !data || typeof data !== "string" ) {
    return null;
  }

  // Support: IE 9 - 11 only
  // IE throws on parseFromString with invalid input.
  try {
    xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
  } catch ( e ) {}

  parserErrorElem = xml && xml.getElementsByTagName( "parsererror" )[ 0 ];
  if ( !xml || parserErrorElem ) {
    jQuery.error( "Invalid XML: " + (
      parserErrorElem ?
        jQuery.map( parserErrorElem.childNodes, function( el ) {
          return el.textContent;
        } ).join( "\n" ) :
        data
    ) );
  }
  return xml;
};


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
  stopPropagationCallback = function( e ) {
    e.stopPropagation();
  };

jQuery.extend( jQuery.event, {

  trigger: function( event, data, elem, onlyHandlers ) {

    var i, cur, tmp, bubbleType, ontype, handle, special, lastElement,
      eventPath = [ elem || document ],
      type = hasOwn.call( event, "type" ) ? event.type : event,
      namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

    cur = lastElement = tmp = elem = elem || document;

    // Don't do events on text and comment nodes
    if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
      return;
    }

    // focus/blur morphs to focusin/out; ensure we're not firing them right now
    if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
      return;
    }

    if ( type.indexOf( "." ) > -1 ) {

      // Namespaced trigger; create a regexp to match event type in handle()
      namespaces = type.split( "." );
      type = namespaces.shift();
      namespaces.sort();
    }
    ontype = type.indexOf( ":" ) < 0 && "on" + type;

    // Caller can pass in a jQuery.Event object, Object, or just an event type string
    event = event[ jQuery.expando ] ?
      event :
      new jQuery.Event( type, typeof event === "object" && event );

    // Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
    event.isTrigger = onlyHandlers ? 2 : 3;
    event.namespace = namespaces.join( "." );
    event.rnamespace = event.namespace ?
      new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
      null;

    // Clean up the event in case it is being reused
    event.result = undefined;
    if ( !event.target ) {
      event.target = elem;
    }

    // Clone any incoming data and prepend the event, creating the handler arg list
    data = data == null ?
      [ event ] :
      jQuery.makeArray( data, [ event ] );

    // Allow special events to draw outside the lines
    special = jQuery.event.special[ type ] || {};
    if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
      return;
    }

    // Determine event propagation path in advance, per W3C events spec (trac-9951)
    // Bubble up to document, then to window; watch for a global ownerDocument var (trac-9724)
    if ( !onlyHandlers && !special.noBubble && !isWindow( elem ) ) {

      bubbleType = special.delegateType || type;
      if ( !rfocusMorph.test( bubbleType + type ) ) {
        cur = cur.parentNode;
      }
      for ( ; cur; cur = cur.parentNode ) {
        eventPath.push( cur );
        tmp = cur;
      }

      // Only add window if we got to document (e.g., not plain obj or detached DOM)
      if ( tmp === ( elem.ownerDocument || document ) ) {
        eventPath.push( tmp.defaultView || tmp.parentWindow || window );
      }
    }

    // Fire handlers on the event path
    i = 0;
    while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {
      lastElement = cur;
      event.type = i > 1 ?
        bubbleType :
        special.bindType || type;

      // jQuery handler
      handle = ( dataPriv.get( cur, "events" ) || Object.create( null ) )[ event.type ] &&
        dataPriv.get( cur, "handle" );
      if ( handle ) {
        handle.apply( cur, data );
      }

      // Native handler
      handle = ontype && cur[ ontype ];
      if ( handle && handle.apply && acceptData( cur ) ) {
        event.result = handle.apply( cur, data );
        if ( event.result === false ) {
          event.preventDefault();
        }
      }
    }
    event.type = type;

    // If nobody prevented the default action, do it now
    if ( !onlyHandlers && !event.isDefaultPrevented() ) {

      if ( ( !special._default ||
        special._default.apply( eventPath.pop(), data ) === false ) &&
        acceptData( elem ) ) {

        // Call a native DOM method on the target with the same name as the event.
        // Don't do default actions on window, that's where global variables be (trac-6170)
        if ( ontype && isFunction( elem[ type ] ) && !isWindow( elem ) ) {

          // Don't re-trigger an onFOO event when we call its FOO() method
          tmp = elem[ ontype ];

          if ( tmp ) {
            elem[ ontype ] = null;
          }

          // Prevent re-triggering of the same event, since we already bubbled it above
          jQuery.event.triggered = type;

          if ( event.isPropagationStopped() ) {
            lastElement.addEventListener( type, stopPropagationCallback );
          }

          elem[ type ]();

          if ( event.isPropagationStopped() ) {
            lastElement.removeEventListener( type, stopPropagationCallback );
          }

          jQuery.event.triggered = undefined;

          if ( tmp ) {
            elem[ ontype ] = tmp;
          }
        }
      }
    }

    return event.result;
  },

  // Piggyback on a donor event to simulate a different one
  // Used only for `focus(in | out)` events
  simulate: function( type, elem, event ) {
    var e = jQuery.extend(
      new jQuery.Event(),
      event,
      {
        type: type,
        isSimulated: true
      }
    );

    jQuery.event.trigger( e, null, elem );
  }

} );

jQuery.fn.extend( {

  trigger: function( type, data ) {
    return this.each( function() {
      jQuery.event.trigger( type, data, this );
    } );
  },
  triggerHandler: function( type, data ) {
    var elem = this[ 0 ];
    if ( elem ) {
      return jQuery.event.trigger( type, data, elem, true );
    }
  }
} );


var
  rbracket = /\[\]$/,
  rCRLF = /\r?\n/g,
  rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
  rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
  var name;

  if ( Array.isArray( obj ) ) {

    // Serialize array item.
    jQuery.each( obj, function( i, v ) {
      if ( traditional || rbracket.test( prefix ) ) {

        // Treat each array item as a scalar.
        add( prefix, v );

      } else {

        // Item is non-scalar (array or object), encode its numeric index.
        buildParams(
          prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
          v,
          traditional,
          add
        );
      }
    } );

  } else if ( !traditional && toType( obj ) === "object" ) {

    // Serialize object item.
    for ( name in obj ) {
      buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
    }

  } else {

    // Serialize scalar item.
    add( prefix, obj );
  }
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
  var prefix,
    s = [],
    add = function( key, valueOrFunction ) {

      // If value is a function, invoke it and use its return value
      var value = isFunction( valueOrFunction ) ?
        valueOrFunction() :
        valueOrFunction;

      s[ s.length ] = encodeURIComponent( key ) + "=" +
        encodeURIComponent( value == null ? "" : value );
    };

  if ( a == null ) {
    return "";
  }

  // If an array was passed in, assume that it is an array of form elements.
  if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

    // Serialize the form elements
    jQuery.each( a, function() {
      add( this.name, this.value );
    } );

  } else {

    // If traditional, encode the "old" way (the way 1.3.2 or older
    // did it), otherwise encode params recursively.
    for ( prefix in a ) {
      buildParams( prefix, a[ prefix ], traditional, add );
    }
  }

  // Return the resulting serialization
  return s.join( "&" );
};

jQuery.fn.extend( {
  serialize: function() {
    return jQuery.param( this.serializeArray() );
  },
  serializeArray: function() {
    return this.map( function() {

      // Can add propHook for "elements" to filter or add form elements
      var elements = jQuery.prop( this, "elements" );
      return elements ? jQuery.makeArray( elements ) : this;
    } ).filter( function() {
      var type = this.type;

      // Use .is( ":disabled" ) so that fieldset[disabled] works
      return this.name && !jQuery( this ).is( ":disabled" ) &&
        rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
        ( this.checked || !rcheckableType.test( type ) );
    } ).map( function( _i, elem ) {
      var val = jQuery( this ).val();

      if ( val == null ) {
        return null;
      }

      if ( Array.isArray( val ) ) {
        return jQuery.map( val, function( val ) {
          return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
        } );
      }

      return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
    } ).get();
  }
} );


var
  r20 = /%20/g,
  rhash = /#.*$/,
  rantiCache = /([?&])_=[^&]*/,
  rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

  // trac-7653, trac-8125, trac-8152: local protocol detection
  rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
  rnoContent = /^(?:GET|HEAD)$/,
  rprotocol = /^\/\//,

  /* Prefilters
   * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
   * 2) These are called:
   *    - BEFORE asking for a transport
   *    - AFTER param serialization (s.data is a string if s.processData is true)
   * 3) key is the dataType
   * 4) the catchall symbol "*" can be used
   * 5) execution will start with transport dataType and THEN continue down to "*" if needed
   */
  prefilters = {},

  /* Transports bindings
   * 1) key is the dataType
   * 2) the catchall symbol "*" can be used
   * 3) selection will start with transport dataType and THEN go to "*" if needed
   */
  transports = {},

  // Avoid comment-prolog char sequence (trac-10098); must appease lint and evade compression
  allTypes = "*/".concat( "*" ),

  // Anchor tag for parsing the document origin
  originAnchor = document.createElement( "a" );

originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

  // dataTypeExpression is optional and defaults to "*"
  return function( dataTypeExpression, func ) {

    if ( typeof dataTypeExpression !== "string" ) {
      func = dataTypeExpression;
      dataTypeExpression = "*";
    }

    var dataType,
      i = 0,
      dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

    if ( isFunction( func ) ) {

      // For each dataType in the dataTypeExpression
      while ( ( dataType = dataTypes[ i++ ] ) ) {

        // Prepend if requested
        if ( dataType[ 0 ] === "+" ) {
          dataType = dataType.slice( 1 ) || "*";
          ( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

        // Otherwise append
        } else {
          ( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
        }
      }
    }
  };
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

  var inspected = {},
    seekingTransport = ( structure === transports );

  function inspect( dataType ) {
    var selected;
    inspected[ dataType ] = true;
    jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
      var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
      if ( typeof dataTypeOrTransport === "string" &&
        !seekingTransport && !inspected[ dataTypeOrTransport ] ) {

        options.dataTypes.unshift( dataTypeOrTransport );
        inspect( dataTypeOrTransport );
        return false;
      } else if ( seekingTransport ) {
        return !( selected = dataTypeOrTransport );
      }
    } );
    return selected;
  }

  return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes trac-9887
function ajaxExtend( target, src ) {
  var key, deep,
    flatOptions = jQuery.ajaxSettings.flatOptions || {};

  for ( key in src ) {
    if ( src[ key ] !== undefined ) {
      ( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
    }
  }
  if ( deep ) {
    jQuery.extend( true, target, deep );
  }

  return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

  var ct, type, finalDataType, firstDataType,
    contents = s.contents,
    dataTypes = s.dataTypes;

  // Remove auto dataType and get content-type in the process
  while ( dataTypes[ 0 ] === "*" ) {
    dataTypes.shift();
    if ( ct === undefined ) {
      ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
    }
  }

  // Check if we're dealing with a known content-type
  if ( ct ) {
    for ( type in contents ) {
      if ( contents[ type ] && contents[ type ].test( ct ) ) {
        dataTypes.unshift( type );
        break;
      }
    }
  }

  // Check to see if we have a response for the expected dataType
  if ( dataTypes[ 0 ] in responses ) {
    finalDataType = dataTypes[ 0 ];
  } else {

    // Try convertible dataTypes
    for ( type in responses ) {
      if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
        finalDataType = type;
        break;
      }
      if ( !firstDataType ) {
        firstDataType = type;
      }
    }

    // Or just use first one
    finalDataType = finalDataType || firstDataType;
  }

  // If we found a dataType
  // We add the dataType to the list if needed
  // and return the corresponding response
  if ( finalDataType ) {
    if ( finalDataType !== dataTypes[ 0 ] ) {
      dataTypes.unshift( finalDataType );
    }
    return responses[ finalDataType ];
  }
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
  var conv2, current, conv, tmp, prev,
    converters = {},

    // Work with a copy of dataTypes in case we need to modify it for conversion
    dataTypes = s.dataTypes.slice();

  // Create converters map with lowercased keys
  if ( dataTypes[ 1 ] ) {
    for ( conv in s.converters ) {
      converters[ conv.toLowerCase() ] = s.converters[ conv ];
    }
  }

  current = dataTypes.shift();

  // Convert to each sequential dataType
  while ( current ) {

    if ( s.responseFields[ current ] ) {
      jqXHR[ s.responseFields[ current ] ] = response;
    }

    // Apply the dataFilter if provided
    if ( !prev && isSuccess && s.dataFilter ) {
      response = s.dataFilter( response, s.dataType );
    }

    prev = current;
    current = dataTypes.shift();

    if ( current ) {

      // There's only work to do if current dataType is non-auto
      if ( current === "*" ) {

        current = prev;

      // Convert response if prev dataType is non-auto and differs from current
      } else if ( prev !== "*" && prev !== current ) {

        // Seek a direct converter
        conv = converters[ prev + " " + current ] || converters[ "* " + current ];

        // If none found, seek a pair
        if ( !conv ) {
          for ( conv2 in converters ) {

            // If conv2 outputs current
            tmp = conv2.split( " " );
            if ( tmp[ 1 ] === current ) {

              // If prev can be converted to accepted input
              conv = converters[ prev + " " + tmp[ 0 ] ] ||
                converters[ "* " + tmp[ 0 ] ];
              if ( conv ) {

                // Condense equivalence converters
                if ( conv === true ) {
                  conv = converters[ conv2 ];

                // Otherwise, insert the intermediate dataType
                } else if ( converters[ conv2 ] !== true ) {
                  current = tmp[ 0 ];
                  dataTypes.unshift( tmp[ 1 ] );
                }
                break;
              }
            }
          }
        }

        // Apply converter (if not an equivalence)
        if ( conv !== true ) {

          // Unless errors are allowed to bubble, catch and return them
          if ( conv && s.throws ) {
            response = conv( response );
          } else {
            try {
              response = conv( response );
            } catch ( e ) {
              return {
                state: "parsererror",
                error: conv ? e : "No conversion from " + prev + " to " + current
              };
            }
          }
        }
      }
    }
  }

  return { state: "success", data: response };
}

jQuery.extend( {

  // Counter for holding the number of active queries
  active: 0,

  // Last-Modified header cache for next request
  lastModified: {},
  etag: {},

  ajaxSettings: {
    url: location.href,
    type: "GET",
    isLocal: rlocalProtocol.test( location.protocol ),
    global: true,
    processData: true,
    async: true,
    contentType: "application/x-www-form-urlencoded; charset=UTF-8",

    /*
    timeout: 0,
    data: null,
    dataType: null,
    username: null,
    password: null,
    cache: null,
    throws: false,
    traditional: false,
    headers: {},
    */

    accepts: {
      "*": allTypes,
      text: "text/plain",
      html: "text/html",
      xml: "application/xml, text/xml",
      json: "application/json, text/javascript"
    },

    contents: {
      xml: /\bxml\b/,
      html: /\bhtml/,
      json: /\bjson\b/
    },

    responseFields: {
      xml: "responseXML",
      text: "responseText",
      json: "responseJSON"
    },

    // Data converters
    // Keys separate source (or catchall "*") and destination types with a single space
    converters: {

      // Convert anything to text
      "* text": String,

      // Text to html (true = no transformation)
      "text html": true,

      // Evaluate text as a json expression
      "text json": JSON.parse,

      // Parse text as xml
      "text xml": jQuery.parseXML
    },

    // For options that shouldn't be deep extended:
    // you can add your own custom options here if
    // and when you create one that shouldn't be
    // deep extended (see ajaxExtend)
    flatOptions: {
      url: true,
      context: true
    }
  },

  // Creates a full fledged settings object into target
  // with both ajaxSettings and settings fields.
  // If target is omitted, writes into ajaxSettings.
  ajaxSetup: function( target, settings ) {
    return settings ?

      // Building a settings object
      ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

      // Extending ajaxSettings
      ajaxExtend( jQuery.ajaxSettings, target );
  },

  ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
  ajaxTransport: addToPrefiltersOrTransports( transports ),

  // Main method
  ajax: function( url, options ) {

    // If url is an object, simulate pre-1.5 signature
    if ( typeof url === "object" ) {
      options = url;
      url = undefined;
    }

    // Force options to be an object
    options = options || {};

    var transport,

      // URL without anti-cache param
      cacheURL,

      // Response headers
      responseHeadersString,
      responseHeaders,

      // timeout handle
      timeoutTimer,

      // Url cleanup var
      urlAnchor,

      // Request state (becomes false upon send and true upon completion)
      completed,

      // To know if global events are to be dispatched
      fireGlobals,

      // Loop variable
      i,

      // uncached part of the url
      uncached,

      // Create the final options object
      s = jQuery.ajaxSetup( {}, options ),

      // Callbacks context
      callbackContext = s.context || s,

      // Context for global events is callbackContext if it is a DOM node or jQuery collection
      globalEventContext = s.context &&
        ( callbackContext.nodeType || callbackContext.jquery ) ?
        jQuery( callbackContext ) :
        jQuery.event,

      // Deferreds
      deferred = jQuery.Deferred(),
      completeDeferred = jQuery.Callbacks( "once memory" ),

      // Status-dependent callbacks
      statusCode = s.statusCode || {},

      // Headers (they are sent all at once)
      requestHeaders = {},
      requestHeadersNames = {},

      // Default abort message
      strAbort = "canceled",

      // Fake xhr
      jqXHR = {
        readyState: 0,

        // Builds headers hashtable if needed
        getResponseHeader: function( key ) {
          var match;
          if ( completed ) {
            if ( !responseHeaders ) {
              responseHeaders = {};
              while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
                responseHeaders[ match[ 1 ].toLowerCase() + " " ] =
                  ( responseHeaders[ match[ 1 ].toLowerCase() + " " ] || [] )
                    .concat( match[ 2 ] );
              }
            }
            match = responseHeaders[ key.toLowerCase() + " " ];
          }
          return match == null ? null : match.join( ", " );
        },

        // Raw string
        getAllResponseHeaders: function() {
          return completed ? responseHeadersString : null;
        },

        // Caches the header
        setRequestHeader: function( name, value ) {
          if ( completed == null ) {
            name = requestHeadersNames[ name.toLowerCase() ] =
              requestHeadersNames[ name.toLowerCase() ] || name;
            requestHeaders[ name ] = value;
          }
          return this;
        },

        // Overrides response content-type header
        overrideMimeType: function( type ) {
          if ( completed == null ) {
            s.mimeType = type;
          }
          return this;
        },

        // Status-dependent callbacks
        statusCode: function( map ) {
          var code;
          if ( map ) {
            if ( completed ) {

              // Execute the appropriate callbacks
              jqXHR.always( map[ jqXHR.status ] );
            } else {

              // Lazy-add the new callbacks in a way that preserves old ones
              for ( code in map ) {
                statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
              }
            }
          }
          return this;
        },

        // Cancel the request
        abort: function( statusText ) {
          var finalText = statusText || strAbort;
          if ( transport ) {
            transport.abort( finalText );
          }
          done( 0, finalText );
          return this;
        }
      };

    // Attach deferreds
    deferred.promise( jqXHR );

    // Add protocol if not provided (prefilters might expect it)
    // Handle falsy url in the settings object (trac-10093: consistency with old signature)
    // We also use the url parameter if available
    s.url = ( ( url || s.url || location.href ) + "" )
      .replace( rprotocol, location.protocol + "//" );

    // Alias method option to type as per ticket trac-12004
    s.type = options.method || options.type || s.method || s.type;

    // Extract dataTypes list
    s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

    // A cross-domain request is in order when the origin doesn't match the current origin.
    if ( s.crossDomain == null ) {
      urlAnchor = document.createElement( "a" );

      // Support: IE <=8 - 11, Edge 12 - 15
      // IE throws exception on accessing the href property if url is malformed,
      // e.g. http://example.com:80x/
      try {
        urlAnchor.href = s.url;

        // Support: IE <=8 - 11 only
        // Anchor's host property isn't correctly set when s.url is relative
        urlAnchor.href = urlAnchor.href;
        s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
          urlAnchor.protocol + "//" + urlAnchor.host;
      } catch ( e ) {

        // If there is an error parsing the URL, assume it is crossDomain,
        // it can be rejected by the transport if it is invalid
        s.crossDomain = true;
      }
    }

    // Convert data if not already a string
    if ( s.data && s.processData && typeof s.data !== "string" ) {
      s.data = jQuery.param( s.data, s.traditional );
    }

    // Apply prefilters
    inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

    // If request was aborted inside a prefilter, stop there
    if ( completed ) {
      return jqXHR;
    }

    // We can fire global events as of now if asked to
    // Don't fire events if jQuery.event is undefined in an AMD-usage scenario (trac-15118)
    fireGlobals = jQuery.event && s.global;

    // Watch for a new set of requests
    if ( fireGlobals && jQuery.active++ === 0 ) {
      jQuery.event.trigger( "ajaxStart" );
    }

    // Uppercase the type
    s.type = s.type.toUpperCase();

    // Determine if request has content
    s.hasContent = !rnoContent.test( s.type );

    // Save the URL in case we're toying with the If-Modified-Since
    // and/or If-None-Match header later on
    // Remove hash to simplify url manipulation
    cacheURL = s.url.replace( rhash, "" );

    // More options handling for requests with no content
    if ( !s.hasContent ) {

      // Remember the hash so we can put it back
      uncached = s.url.slice( cacheURL.length );

      // If data is available and should be processed, append data to url
      if ( s.data && ( s.processData || typeof s.data === "string" ) ) {
        cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

        // trac-9682: remove data so that it's not used in an eventual retry
        delete s.data;
      }

      // Add or update anti-cache param if needed
      if ( s.cache === false ) {
        cacheURL = cacheURL.replace( rantiCache, "$1" );
        uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce.guid++ ) +
          uncached;
      }

      // Put hash and anti-cache on the URL that will be requested (gh-1732)
      s.url = cacheURL + uncached;

    // Change '%20' to '+' if this is encoded form body content (gh-2658)
    } else if ( s.data && s.processData &&
      ( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
      s.data = s.data.replace( r20, "+" );
    }

    // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
    if ( s.ifModified ) {
      if ( jQuery.lastModified[ cacheURL ] ) {
        jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
      }
      if ( jQuery.etag[ cacheURL ] ) {
        jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
      }
    }

    // Set the correct header, if data is being sent
    if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
      jqXHR.setRequestHeader( "Content-Type", s.contentType );
    }

    // Set the Accepts header for the server, depending on the dataType
    jqXHR.setRequestHeader(
      "Accept",
      s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
        s.accepts[ s.dataTypes[ 0 ] ] +
          ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
        s.accepts[ "*" ]
    );

    // Check for headers option
    for ( i in s.headers ) {
      jqXHR.setRequestHeader( i, s.headers[ i ] );
    }

    // Allow custom headers/mimetypes and early abort
    if ( s.beforeSend &&
      ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

      // Abort if not done already and return
      return jqXHR.abort();
    }

    // Aborting is no longer a cancellation
    strAbort = "abort";

    // Install callbacks on deferreds
    completeDeferred.add( s.complete );
    jqXHR.done( s.success );
    jqXHR.fail( s.error );

    // Get transport
    transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

    // If no transport, we auto-abort
    if ( !transport ) {
      done( -1, "No Transport" );
    } else {
      jqXHR.readyState = 1;

      // Send global event
      if ( fireGlobals ) {
        globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
      }

      // If request was aborted inside ajaxSend, stop there
      if ( completed ) {
        return jqXHR;
      }

      // Timeout
      if ( s.async && s.timeout > 0 ) {
        timeoutTimer = window.setTimeout( function() {
          jqXHR.abort( "timeout" );
        }, s.timeout );
      }

      try {
        completed = false;
        transport.send( requestHeaders, done );
      } catch ( e ) {

        // Rethrow post-completion exceptions
        if ( completed ) {
          throw e;
        }

        // Propagate others as results
        done( -1, e );
      }
    }

    // Callback for when everything is done
    function done( status, nativeStatusText, responses, headers ) {
      var isSuccess, success, error, response, modified,
        statusText = nativeStatusText;

      // Ignore repeat invocations
      if ( completed ) {
        return;
      }

      completed = true;

      // Clear timeout if it exists
      if ( timeoutTimer ) {
        window.clearTimeout( timeoutTimer );
      }

      // Dereference transport for early garbage collection
      // (no matter how long the jqXHR object will be used)
      transport = undefined;

      // Cache response headers
      responseHeadersString = headers || "";

      // Set readyState
      jqXHR.readyState = status > 0 ? 4 : 0;

      // Determine if successful
      isSuccess = status >= 200 && status < 300 || status === 304;

      // Get response data
      if ( responses ) {
        response = ajaxHandleResponses( s, jqXHR, responses );
      }

      // Use a noop converter for missing script but not if jsonp
      if ( !isSuccess &&
        jQuery.inArray( "script", s.dataTypes ) > -1 &&
        jQuery.inArray( "json", s.dataTypes ) < 0 ) {
        s.converters[ "text script" ] = function() {};
      }

      // Convert no matter what (that way responseXXX fields are always set)
      response = ajaxConvert( s, response, jqXHR, isSuccess );

      // If successful, handle type chaining
      if ( isSuccess ) {

        // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
        if ( s.ifModified ) {
          modified = jqXHR.getResponseHeader( "Last-Modified" );
          if ( modified ) {
            jQuery.lastModified[ cacheURL ] = modified;
          }
          modified = jqXHR.getResponseHeader( "etag" );
          if ( modified ) {
            jQuery.etag[ cacheURL ] = modified;
          }
        }

        // if no content
        if ( status === 204 || s.type === "HEAD" ) {
          statusText = "nocontent";

        // if not modified
        } else if ( status === 304 ) {
          statusText = "notmodified";

        // If we have data, let's convert it
        } else {
          statusText = response.state;
          success = response.data;
          error = response.error;
          isSuccess = !error;
        }
      } else {

        // Extract error from statusText and normalize for non-aborts
        error = statusText;
        if ( status || !statusText ) {
          statusText = "error";
          if ( status < 0 ) {
            status = 0;
          }
        }
      }

      // Set data for the fake xhr object
      jqXHR.status = status;
      jqXHR.statusText = ( nativeStatusText || statusText ) + "";

      // Success/Error
      if ( isSuccess ) {
        deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
      } else {
        deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
      }

      // Status-dependent callbacks
      jqXHR.statusCode( statusCode );
      statusCode = undefined;

      if ( fireGlobals ) {
        globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
          [ jqXHR, s, isSuccess ? success : error ] );
      }

      // Complete
      completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

      if ( fireGlobals ) {
        globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

        // Handle the global AJAX counter
        if ( !( --jQuery.active ) ) {
          jQuery.event.trigger( "ajaxStop" );
        }
      }
    }

    return jqXHR;
  },

  getJSON: function( url, data, callback ) {
    return jQuery.get( url, data, callback, "json" );
  },

  getScript: function( url, callback ) {
    return jQuery.get( url, undefined, callback, "script" );
  }
} );

jQuery.each( [ "get", "post" ], function( _i, method ) {
  jQuery[ method ] = function( url, data, callback, type ) {

    // Shift arguments if data argument was omitted
    if ( isFunction( data ) ) {
      type = type || callback;
      callback = data;
      data = undefined;
    }

    // The url can be an options object (which then must have .url)
    return jQuery.ajax( jQuery.extend( {
      url: url,
      type: method,
      dataType: type,
      data: data,
      success: callback
    }, jQuery.isPlainObject( url ) && url ) );
  };
} );

jQuery.ajaxPrefilter( function( s ) {
  var i;
  for ( i in s.headers ) {
    if ( i.toLowerCase() === "content-type" ) {
      s.contentType = s.headers[ i ] || "";
    }
  }
} );


jQuery._evalUrl = function( url, options, doc ) {
  return jQuery.ajax( {
    url: url,

    // Make this explicit, since user can override this through ajaxSetup (trac-11264)
    type: "GET",
    dataType: "script",
    cache: true,
    async: false,
    global: false,

    // Only evaluate the response if it is successful (gh-4126)
    // dataFilter is not invoked for failure responses, so using it instead
    // of the default converter is kludgy but it works.
    converters: {
      "text script": function() {}
    },
    dataFilter: function( response ) {
      jQuery.globalEval( response, options, doc );
    }
  } );
};


jQuery.fn.extend( {
  wrapAll: function( html ) {
    var wrap;

    if ( this[ 0 ] ) {
      if ( isFunction( html ) ) {
        html = html.call( this[ 0 ] );
      }

      // The elements to wrap the target around
      wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

      if ( this[ 0 ].parentNode ) {
        wrap.insertBefore( this[ 0 ] );
      }

      wrap.map( function() {
        var elem = this;

        while ( elem.firstElementChild ) {
          elem = elem.firstElementChild;
        }

        return elem;
      } ).append( this );
    }

    return this;
  },

  wrapInner: function( html ) {
    if ( isFunction( html ) ) {
      return this.each( function( i ) {
        jQuery( this ).wrapInner( html.call( this, i ) );
      } );
    }

    return this.each( function() {
      var self = jQuery( this ),
        contents = self.contents();

      if ( contents.length ) {
        contents.wrapAll( html );

      } else {
        self.append( html );
      }
    } );
  },

  wrap: function( html ) {
    var htmlIsFunction = isFunction( html );

    return this.each( function( i ) {
      jQuery( this ).wrapAll( htmlIsFunction ? html.call( this, i ) : html );
    } );
  },

  unwrap: function( selector ) {
    this.parent( selector ).not( "body" ).each( function() {
      jQuery( this ).replaceWith( this.childNodes );
    } );
    return this;
  }
} );


jQuery.expr.pseudos.hidden = function( elem ) {
  return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
  return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




jQuery.ajaxSettings.xhr = function() {
  try {
    return new window.XMLHttpRequest();
  } catch ( e ) {}
};

var xhrSuccessStatus = {

    // File protocol always yields status code 0, assume 200
    0: 200,

    // Support: IE <=9 only
    // trac-1450: sometimes IE returns 1223 when it should be 204
    1223: 204
  },
  xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
  var callback, errorCallback;

  // Cross domain only allowed if supported through XMLHttpRequest
  if ( support.cors || xhrSupported && !options.crossDomain ) {
    return {
      send: function( headers, complete ) {
        var i,
          xhr = options.xhr();

        xhr.open(
          options.type,
          options.url,
          options.async,
          options.username,
          options.password
        );

        // Apply custom fields if provided
        if ( options.xhrFields ) {
          for ( i in options.xhrFields ) {
            xhr[ i ] = options.xhrFields[ i ];
          }
        }

        // Override mime type if needed
        if ( options.mimeType && xhr.overrideMimeType ) {
          xhr.overrideMimeType( options.mimeType );
        }

        // X-Requested-With header
        // For cross-domain requests, seeing as conditions for a preflight are
        // akin to a jigsaw puzzle, we simply never set it to be sure.
        // (it can always be set on a per-request basis or even using ajaxSetup)
        // For same-domain requests, won't change header if already provided.
        if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
          headers[ "X-Requested-With" ] = "XMLHttpRequest";
        }

        // Set headers
        for ( i in headers ) {
          xhr.setRequestHeader( i, headers[ i ] );
        }

        // Callback
        callback = function( type ) {
          return function() {
            if ( callback ) {
              callback = errorCallback = xhr.onload =
                xhr.onerror = xhr.onabort = xhr.ontimeout =
                  xhr.onreadystatechange = null;

              if ( type === "abort" ) {
                xhr.abort();
              } else if ( type === "error" ) {

                // Support: IE <=9 only
                // On a manual native abort, IE9 throws
                // errors on any property access that is not readyState
                if ( typeof xhr.status !== "number" ) {
                  complete( 0, "error" );
                } else {
                  complete(

                    // File: protocol always yields status 0; see trac-8605, trac-14207
                    xhr.status,
                    xhr.statusText
                  );
                }
              } else {
                complete(
                  xhrSuccessStatus[ xhr.status ] || xhr.status,
                  xhr.statusText,

                  // Support: IE <=9 only
                  // IE9 has no XHR2 but throws on binary (trac-11426)
                  // For XHR2 non-text, let the caller handle it (gh-2498)
                  ( xhr.responseType || "text" ) !== "text"  ||
                  typeof xhr.responseText !== "string" ?
                    { binary: xhr.response } :
                    { text: xhr.responseText },
                  xhr.getAllResponseHeaders()
                );
              }
            }
          };
        };

        // Listen to events
        xhr.onload = callback();
        errorCallback = xhr.onerror = xhr.ontimeout = callback( "error" );

        // Support: IE 9 only
        // Use onreadystatechange to replace onabort
        // to handle uncaught aborts
        if ( xhr.onabort !== undefined ) {
          xhr.onabort = errorCallback;
        } else {
          xhr.onreadystatechange = function() {

            // Check readyState before timeout as it changes
            if ( xhr.readyState === 4 ) {

              // Allow onerror to be called first,
              // but that will not handle a native abort
              // Also, save errorCallback to a variable
              // as xhr.onerror cannot be accessed
              window.setTimeout( function() {
                if ( callback ) {
                  errorCallback();
                }
              } );
            }
          };
        }

        // Create the abort callback
        callback = callback( "abort" );

        try {

          // Do send the request (this may raise an exception)
          xhr.send( options.hasContent && options.data || null );
        } catch ( e ) {

          // trac-14683: Only rethrow if this hasn't been notified as an error yet
          if ( callback ) {
            throw e;
          }
        }
      },

      abort: function() {
        if ( callback ) {
          callback();
        }
      }
    };
  }
} );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
  if ( s.crossDomain ) {
    s.contents.script = false;
  }
} );

// Install script dataType
jQuery.ajaxSetup( {
  accepts: {
    script: "text/javascript, application/javascript, " +
      "application/ecmascript, application/x-ecmascript"
  },
  contents: {
    script: /\b(?:java|ecma)script\b/
  },
  converters: {
    "text script": function( text ) {
      jQuery.globalEval( text );
      return text;
    }
  }
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
  if ( s.cache === undefined ) {
    s.cache = false;
  }
  if ( s.crossDomain ) {
    s.type = "GET";
  }
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

  // This transport only deals with cross domain or forced-by-attrs requests
  if ( s.crossDomain || s.scriptAttrs ) {
    var script, callback;
    return {
      send: function( _, complete ) {
        script = jQuery( "<script>" )
          .attr( s.scriptAttrs || {} )
          .prop( { charset: s.scriptCharset, src: s.url } )
          .on( "load error", callback = function( evt ) {
            script.remove();
            callback = null;
            if ( evt ) {
              complete( evt.type === "error" ? 404 : 200, evt.type );
            }
          } );

        // Use native DOM manipulation to avoid our domManip AJAX trickery
        document.head.appendChild( script[ 0 ] );
      },
      abort: function() {
        if ( callback ) {
          callback();
        }
      }
    };
  }
} );




var oldCallbacks = [],
  rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
  jsonp: "callback",
  jsonpCallback: function() {
    var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce.guid++ ) );
    this[ callback ] = true;
    return callback;
  }
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

  var callbackName, overwritten, responseContainer,
    jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
      "url" :
      typeof s.data === "string" &&
        ( s.contentType || "" )
          .indexOf( "application/x-www-form-urlencoded" ) === 0 &&
        rjsonp.test( s.data ) && "data"
    );

  // Handle iff the expected data type is "jsonp" or we have a parameter to set
  if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

    // Get callback name, remembering preexisting value associated with it
    callbackName = s.jsonpCallback = isFunction( s.jsonpCallback ) ?
      s.jsonpCallback() :
      s.jsonpCallback;

    // Insert callback into url or form data
    if ( jsonProp ) {
      s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
    } else if ( s.jsonp !== false ) {
      s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
    }

    // Use data converter to retrieve json after script execution
    s.converters[ "script json" ] = function() {
      if ( !responseContainer ) {
        jQuery.error( callbackName + " was not called" );
      }
      return responseContainer[ 0 ];
    };

    // Force json dataType
    s.dataTypes[ 0 ] = "json";

    // Install callback
    overwritten = window[ callbackName ];
    window[ callbackName ] = function() {
      responseContainer = arguments;
    };

    // Clean-up function (fires after converters)
    jqXHR.always( function() {

      // If previous value didn't exist - remove it
      if ( overwritten === undefined ) {
        jQuery( window ).removeProp( callbackName );

      // Otherwise restore preexisting value
      } else {
        window[ callbackName ] = overwritten;
      }

      // Save back as free
      if ( s[ callbackName ] ) {

        // Make sure that re-using the options doesn't screw things around
        s.jsonpCallback = originalSettings.jsonpCallback;

        // Save the callback name for future use
        oldCallbacks.push( callbackName );
      }

      // Call if it was a function and we have a response
      if ( responseContainer && isFunction( overwritten ) ) {
        overwritten( responseContainer[ 0 ] );
      }

      responseContainer = overwritten = undefined;
    } );

    // Delegate to script
    return "script";
  }
} );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
  var body = document.implementation.createHTMLDocument( "" ).body;
  body.innerHTML = "<form></form><form></form>";
  return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
  if ( typeof data !== "string" ) {
    return [];
  }
  if ( typeof context === "boolean" ) {
    keepScripts = context;
    context = false;
  }

  var base, parsed, scripts;

  if ( !context ) {

    // Stop scripts or inline event handlers from being executed immediately
    // by using document.implementation
    if ( support.createHTMLDocument ) {
      context = document.implementation.createHTMLDocument( "" );

      // Set the base href for the created document
      // so any parsed elements with URLs
      // are based on the document's URL (gh-2965)
      base = context.createElement( "base" );
      base.href = document.location.href;
      context.head.appendChild( base );
    } else {
      context = document;
    }
  }

  parsed = rsingleTag.exec( data );
  scripts = !keepScripts && [];

  // Single tag
  if ( parsed ) {
    return [ context.createElement( parsed[ 1 ] ) ];
  }

  parsed = buildFragment( [ data ], context, scripts );

  if ( scripts && scripts.length ) {
    jQuery( scripts ).remove();
  }

  return jQuery.merge( [], parsed.childNodes );
};


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
  var selector, type, response,
    self = this,
    off = url.indexOf( " " );

  if ( off > -1 ) {
    selector = stripAndCollapse( url.slice( off ) );
    url = url.slice( 0, off );
  }

  // If it's a function
  if ( isFunction( params ) ) {

    // We assume that it's the callback
    callback = params;
    params = undefined;

  // Otherwise, build a param string
  } else if ( params && typeof params === "object" ) {
    type = "POST";
  }

  // If we have elements to modify, make the request
  if ( self.length > 0 ) {
    jQuery.ajax( {
      url: url,

      // If "type" variable is undefined, then "GET" method will be used.
      // Make value of this field explicit since
      // user can override it through ajaxSetup method
      type: type || "GET",
      dataType: "html",
      data: params
    } ).done( function( responseText ) {

      // Save response for use in complete callback
      response = arguments;

      self.html( selector ?

        // If a selector was specified, locate the right elements in a dummy div
        // Exclude scripts to avoid IE 'Permission Denied' errors
        jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

        // Otherwise use the full result
        responseText );

    // If the request succeeds, this function gets "data", "status", "jqXHR"
    // but they are ignored because response was set above.
    // If it fails, this function gets "jqXHR", "status", "error"
    } ).always( callback && function( jqXHR, status ) {
      self.each( function() {
        callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
      } );
    } );
  }

  return this;
};




jQuery.expr.pseudos.animated = function( elem ) {
  return jQuery.grep( jQuery.timers, function( fn ) {
    return elem === fn.elem;
  } ).length;
};




jQuery.offset = {
  setOffset: function( elem, options, i ) {
    var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
      position = jQuery.css( elem, "position" ),
      curElem = jQuery( elem ),
      props = {};

    // Set position first, in-case top/left are set even on static elem
    if ( position === "static" ) {
      elem.style.position = "relative";
    }

    curOffset = curElem.offset();
    curCSSTop = jQuery.css( elem, "top" );
    curCSSLeft = jQuery.css( elem, "left" );
    calculatePosition = ( position === "absolute" || position === "fixed" ) &&
      ( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

    // Need to be able to calculate position if either
    // top or left is auto and position is either absolute or fixed
    if ( calculatePosition ) {
      curPosition = curElem.position();
      curTop = curPosition.top;
      curLeft = curPosition.left;

    } else {
      curTop = parseFloat( curCSSTop ) || 0;
      curLeft = parseFloat( curCSSLeft ) || 0;
    }

    if ( isFunction( options ) ) {

      // Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
      options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
    }

    if ( options.top != null ) {
      props.top = ( options.top - curOffset.top ) + curTop;
    }
    if ( options.left != null ) {
      props.left = ( options.left - curOffset.left ) + curLeft;
    }

    if ( "using" in options ) {
      options.using.call( elem, props );

    } else {
      curElem.css( props );
    }
  }
};

jQuery.fn.extend( {

  // offset() relates an element's border box to the document origin
  offset: function( options ) {

    // Preserve chaining for setter
    if ( arguments.length ) {
      return options === undefined ?
        this :
        this.each( function( i ) {
          jQuery.offset.setOffset( this, options, i );
        } );
    }

    var rect, win,
      elem = this[ 0 ];

    if ( !elem ) {
      return;
    }

    // Return zeros for disconnected and hidden (display: none) elements (gh-2310)
    // Support: IE <=11 only
    // Running getBoundingClientRect on a
    // disconnected node in IE throws an error
    if ( !elem.getClientRects().length ) {
      return { top: 0, left: 0 };
    }

    // Get document-relative position by adding viewport scroll to viewport-relative gBCR
    rect = elem.getBoundingClientRect();
    win = elem.ownerDocument.defaultView;
    return {
      top: rect.top + win.pageYOffset,
      left: rect.left + win.pageXOffset
    };
  },

  // position() relates an element's margin box to its offset parent's padding box
  // This corresponds to the behavior of CSS absolute positioning
  position: function() {
    if ( !this[ 0 ] ) {
      return;
    }

    var offsetParent, offset, doc,
      elem = this[ 0 ],
      parentOffset = { top: 0, left: 0 };

    // position:fixed elements are offset from the viewport, which itself always has zero offset
    if ( jQuery.css( elem, "position" ) === "fixed" ) {

      // Assume position:fixed implies availability of getBoundingClientRect
      offset = elem.getBoundingClientRect();

    } else {
      offset = this.offset();

      // Account for the *real* offset parent, which can be the document or its root element
      // when a statically positioned element is identified
      doc = elem.ownerDocument;
      offsetParent = elem.offsetParent || doc.documentElement;
      while ( offsetParent &&
        ( offsetParent === doc.body || offsetParent === doc.documentElement ) &&
        jQuery.css( offsetParent, "position" ) === "static" ) {

        offsetParent = offsetParent.parentNode;
      }
      if ( offsetParent && offsetParent !== elem && offsetParent.nodeType === 1 ) {

        // Incorporate borders into its offset, since they are outside its content origin
        parentOffset = jQuery( offsetParent ).offset();
        parentOffset.top += jQuery.css( offsetParent, "borderTopWidth", true );
        parentOffset.left += jQuery.css( offsetParent, "borderLeftWidth", true );
      }
    }

    // Subtract parent offsets and element margins
    return {
      top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
      left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
    };
  },

  // This method will return documentElement in the following cases:
  // 1) For the element inside the iframe without offsetParent, this method will return
  //    documentElement of the parent window
  // 2) For the hidden or detached element
  // 3) For body or html element, i.e. in case of the html node - it will return itself
  //
  // but those exceptions were never presented as a real life use-cases
  // and might be considered as more preferable results.
  //
  // This logic, however, is not guaranteed and can change at any point in the future
  offsetParent: function() {
    return this.map( function() {
      var offsetParent = this.offsetParent;

      while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
        offsetParent = offsetParent.offsetParent;
      }

      return offsetParent || documentElement;
    } );
  }
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
  var top = "pageYOffset" === prop;

  jQuery.fn[ method ] = function( val ) {
    return access( this, function( elem, method, val ) {

      // Coalesce documents and windows
      var win;
      if ( isWindow( elem ) ) {
        win = elem;
      } else if ( elem.nodeType === 9 ) {
        win = elem.defaultView;
      }

      if ( val === undefined ) {
        return win ? win[ prop ] : elem[ method ];
      }

      if ( win ) {
        win.scrollTo(
          !top ? val : win.pageXOffset,
          top ? val : win.pageYOffset
        );

      } else {
        elem[ method ] = val;
      }
    }, method, val, arguments.length );
  };
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( _i, prop ) {
  jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
    function( elem, computed ) {
      if ( computed ) {
        computed = curCSS( elem, prop );

        // If curCSS returns percentage, fallback to offset
        return rnumnonpx.test( computed ) ?
          jQuery( elem ).position()[ prop ] + "px" :
          computed;
      }
    }
  );
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
  jQuery.each( {
    padding: "inner" + name,
    content: type,
    "": "outer" + name
  }, function( defaultExtra, funcName ) {

    // Margin is only for outerHeight, outerWidth
    jQuery.fn[ funcName ] = function( margin, value ) {
      var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
        extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

      return access( this, function( elem, type, value ) {
        var doc;

        if ( isWindow( elem ) ) {

          // $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
          return funcName.indexOf( "outer" ) === 0 ?
            elem[ "inner" + name ] :
            elem.document.documentElement[ "client" + name ];
        }

        // Get document width or height
        if ( elem.nodeType === 9 ) {
          doc = elem.documentElement;

          // Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
          // whichever is greatest
          return Math.max(
            elem.body[ "scroll" + name ], doc[ "scroll" + name ],
            elem.body[ "offset" + name ], doc[ "offset" + name ],
            doc[ "client" + name ]
          );
        }

        return value === undefined ?

          // Get width or height on the element, requesting but not forcing parseFloat
          jQuery.css( elem, type, extra ) :

          // Set width or height on the element
          jQuery.style( elem, type, value, extra );
      }, type, chainable ? margin : undefined, chainable );
    };
  } );
} );


jQuery.each( [
  "ajaxStart",
  "ajaxStop",
  "ajaxComplete",
  "ajaxError",
  "ajaxSuccess",
  "ajaxSend"
], function( _i, type ) {
  jQuery.fn[ type ] = function( fn ) {
    return this.on( type, fn );
  };
} );




jQuery.fn.extend( {

  bind: function( types, data, fn ) {
    return this.on( types, null, data, fn );
  },
  unbind: function( types, fn ) {
    return this.off( types, null, fn );
  },

  delegate: function( selector, types, data, fn ) {
    return this.on( types, selector, data, fn );
  },
  undelegate: function( selector, types, fn ) {

    // ( namespace ) or ( selector, types [, fn] )
    return arguments.length === 1 ?
      this.off( selector, "**" ) :
      this.off( types, selector || "**", fn );
  },

  hover: function( fnOver, fnOut ) {
    return this
      .on( "mouseenter", fnOver )
      .on( "mouseleave", fnOut || fnOver );
  }
} );

jQuery.each(
  ( "blur focus focusin focusout resize scroll click dblclick " +
  "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
  "change select submit keydown keypress keyup contextmenu" ).split( " " ),
  function( _i, name ) {

    // Handle event binding
    jQuery.fn[ name ] = function( data, fn ) {
      return arguments.length > 0 ?
        this.on( name, null, data, fn ) :
        this.trigger( name );
    };
  }
);




// Support: Android <=4.0 only
// Make sure we trim BOM and NBSP
// Require that the "whitespace run" starts from a non-whitespace
// to avoid O(N^2) behavior when the engine would try matching "\s+$" at each space position.
var rtrim = /^[\s\uFEFF\xA0]+|([^\s\uFEFF\xA0])[\s\uFEFF\xA0]+$/g;

// Bind a function to a context, optionally partially applying any
// arguments.
// jQuery.proxy is deprecated to promote standards (specifically Function#bind)
// However, it is not slated for removal any time soon
jQuery.proxy = function( fn, context ) {
  var tmp, args, proxy;

  if ( typeof context === "string" ) {
    tmp = fn[ context ];
    context = fn;
    fn = tmp;
  }

  // Quick check to determine if target is callable, in the spec
  // this throws a TypeError, but we will just return undefined.
  if ( !isFunction( fn ) ) {
    return undefined;
  }

  // Simulated bind
  args = slice.call( arguments, 2 );
  proxy = function() {
    return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
  };

  // Set the guid of unique handler to the same of original handler, so it can be removed
  proxy.guid = fn.guid = fn.guid || jQuery.guid++;

  return proxy;
};

jQuery.holdReady = function( hold ) {
  if ( hold ) {
    jQuery.readyWait++;
  } else {
    jQuery.ready( true );
  }
};
jQuery.isArray = Array.isArray;
jQuery.parseJSON = JSON.parse;
jQuery.nodeName = nodeName;
jQuery.isFunction = isFunction;
jQuery.isWindow = isWindow;
jQuery.camelCase = camelCase;
jQuery.type = toType;

jQuery.now = Date.now;

jQuery.isNumeric = function( obj ) {

  // As of jQuery 3.0, isNumeric is limited to
  // strings and numbers (primitives or objects)
  // that can be coerced to finite numbers (gh-2662)
  var type = jQuery.type( obj );
  return ( type === "number" || type === "string" ) &&

    // parseFloat NaNs numeric-cast false positives ("")
    // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
    // subtraction forces infinities to NaN
    !isNaN( obj - parseFloat( obj ) );
};

jQuery.trim = function( text ) {
  return text == null ?
    "" :
    ( text + "" ).replace( rtrim, "$1" );
};



// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
  define( "jquery", [], function() {
    return jQuery;
  } );
}




var

  // Map over jQuery in case of overwrite
  _jQuery = window.jQuery,

  // Map over the $ in case of overwrite
  _$ = window.$;

jQuery.noConflict = function( deep ) {
  if ( window.$ === jQuery ) {
    window.$ = _$;
  }

  if ( deep && window.jQuery === jQuery ) {
    window.jQuery = _jQuery;
  }

  return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (trac-7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (trac-13566)
if ( typeof noGlobal === "undefined" ) {
  window.jQuery = window.$ = jQuery;
}




return jQuery;
} );

    

   /* Ende jquery */
   /* Start tracking */
   
    

    

    "use strict";var _paq=_paq||[];function matomoConsentFunction(){var t=$("body").attr("data-tracking-site-id"),e=document.createElement("script");_paq.push(["setConsentGiven"]),/^\d+$/u.test(t)&&0===$("#cmsMatomoScript").length&&(_paq.push(["disableCookies"]),_paq.push(["requireConsent"]),_paq.push(["setDocumentTitle",`${document.domain}/${document.title}`]),_paq.push(["trackPageView"]),_paq.push(["enableLinkTracking"]),_paq.push(["setTrackerUrl","//piwik.itzbund.de/js/"]),_paq.push(["setSiteId",Number(t)]),e.id="cmsMatomoScript",e.type="text/javascript",e.async=!0,e.defer=!0,e.src="//piwik.itzbund.de/js/",document.head.appendChild(e))}function matomoRejectFunction(){_paq.push(["forgetConsentGiven"])}function setConsent(){document.cookie.match(/matomoTracking=true/u)?matomoConsentFunction():matomoRejectFunction()}setConsent(),$("#cookiebanner").on("afterClose",function(){setConsent()});

    

   /* Ende tracking */
   /* Start gsb_aria */
   
    

    

    /* --GSBDocStart
 * @name: @gsb/gsb_aria
 * @version: 1.0.2
 * @description: A toggle mechanism for aria attributes
 * --GSBDocEnd
*/"use strict";
var gsb;
gsb = gsb || {};
(function ($, gsb) {
  // Entry point into lib, is called by module.
  gsb.aria = function aria(el, options, params) {// Creates, initializes and returns an instance of a gsb_aria Module
    var base = Object.create(aria.prototype); // Instance of aria-object is used in.
    base.$el = $(el);
    base.el = el;
    base.moduleName = "gsb.aria";
    base.$el.data(base.moduleName, base);
    base.options = $.extend({}, gsb.aria.defaultOptions, options);
    base.init(el, options, params);
    return base;
  };

  gsb.aria.prototype = {
    /**
     * @method generateID
     * @desc generiert eine ID aus einer Zufallszahl und dessen toString result mit der Basis 36
     */
    generateID: function () {
      // Math.random should be unique because of its seeding algorithm.
      // Convert it to base 36 (numbers + letters), and grab the first 9 characters
      // after the decimal.
      return '_' + Math.random().toString(36).substr(2, 9);
    },

    // Initializes elements with starting values.
    setInitialValues: function () {
      var base = this;

      // Closes every Element in "Types" as default init.
      Object.keys(base.types).forEach(function (typeName) {
        var type = this[typeName];
        base.applyToggle(type, typeName, 1);
        type.prop('gsb_aria_index', function (index) {return index;});
      }, base.types);

      // Applies Initializing Functions, Values as defined in Module "Aria-Initialize-Object" to elements.
      base.initial.forEach(function (statement) {
        var typeName = statement._type,
          type = base.types[typeName];
        Object.keys(statement).forEach(function (attrName) {
          var attrValue = statement[attrName];
          if (attrName === "_type") {

            //ignore
          } else if (attrName === "class") {
            //ignore
          } else if (typeof attrValue === "function") {type.each(function (i, el) {
              $(el).attr(attrName, attrValue.call(base, base, i, attrName)); // <-  If Initialize contains Function on Key, it is called
            }); //      and it's return value assigned to element. (HTML-Tag)
          } else {
            type.attr(attrName, attrValue); // <- Value assigned to element.
          }
        });
      });
    },

    // Sets the Options to the values given by Module.
    init: function (_, __, params) {// Gets "Types" (Class Names), "Initials" (Initial Values) and "Toggles" (Values for 'open' and 'close)
      this.types = params.types;
      this.initial = params.initial;
      this.toggles = params.toggles;
      this.setInitialValues();
    },

    // Gets the by the current toggle value of an element and returns those as object of attributes.
    getToggleValues: function (object, index) {
      var values = {};
      Object.keys(object || {}).forEach(function (key) {
        if (key !== "class" && key !== "style") {
          values[key] = object[key][index];
        }
      });
      return values;
    },

    // Applies the toggle changes defined by the module it is used by.
    applyToggle: function ($elements, typeName, index) {
      var base = this,
        toggles = base.toggles[typeName] || {},
        classes = toggles["class"] || [];
      $elements.attr(base.getToggleValues(toggles, index)); // <- Gets toggle values defined by the gsb_module it is used by and applies them to current element
      $elements.removeClass(classes[index === 0 ? 1 : 0]); // <- Specifically deals with class changes of html elements.
      $elements.addClass(classes[index]); //     Which are treated different than other HTML-Tag properties.
    },

    // Is called when the aria status of an element should be changed/updated.
    updateAria: function (elem, open, singleOpen) {
      var base = this,
        index = elem['gsb_aria_index'];
      if (!open || singleOpen) {
        Object.keys(base.types).forEach(function (typeName) {
          var type = base.types[typeName];
          base.applyToggle($(type[index]), typeName, open ? 0 : 1);
        });
      } else {
        Object.keys(base.types).forEach(function (typeName) {
          var type = base.types[typeName];
          $(type).each(function (idx) {
            if (index === idx) {
              // Toggles Element that should be opened to open, in regard to aria toggle
              base.applyToggle($(type[idx]), typeName, 0);
            } else {
              // Toggles Element that should be closed to closed, in regard to aria toggle
              base.applyToggle($(type[idx]), typeName, 1);
            }
          });
        });
      }
    }
  };

  gsb.aria.defaultOptions = {

    //options
  };})(jQuery, gsb);

    

   /* Ende gsb_aria */
   /* Start gsb_checkDependencies */
   
    

    

    /* --GSBDocStart
 * @name: @gsb/gsb_check_dependencies
 * @version: 1.0.1
 * @description: Lib to execute code that depends on other internal modules - only if that module has already been loaded
 * --GSBDocEnd
*/"use strict";
var gsb;
gsb = gsb || {};
//uses gsb.warn and gsb.error
//needs to be loaded AFTER jquery
(function ($) {
  "use strict";
  function checkDependencies(dependencyNames, callback) {
    var allOK = true;
    dependencyNames.forEach(function (name) {
      var propertyName,
        dependency,
        warning;
      //future-proofing: initially, we will only support GSB Modules
      if (/^gsb\./.test(name)) {
        propertyName = String(name).replace(/\./g, '_');
        dependency = $.fn[propertyName];
        warning = "Callback dependent on module '" + name + "' detected, but module could not be found.";
      }
      if (dependency === undefined || dependency === null) {
        allOK = false;
        if (warning && (typeof gsb_logDependenciesWarning !== 'undefined' ? gsb_logDependenciesWarning : true)) {
          gsb.warn(warning);
        } else if (!warning) {
          gsb.error("Callback dependent on module '" + name + "' detected, but the module's type could not be determined from its name.");
        }
      }
    });
    if (allOK) {
      /* future-proofing: callback 'arguments' and 'this' may be specified whenever
       *                  we decide on a concept that can handle modules which are
       *                  not jQuery-plugins (and ideally, one that can handle both)
       */
      callback.call(null);
    }
  }

  gsb.checkDependencies = checkDependencies;
})(jQuery);

    

   /* Ende gsb_checkDependencies */
   /* Start gsb_jQueryHooks */
   
    

    

    /* --GSBDocStart
 * @name: @gsb/gsb_jQueryHooks
 * @version: 1.0.1
 * @description: A Lib to overwrite the .attr() hook of jQuery, to have more control over which inline-styles external libs can apply.
 * --GSBDocEnd
*/"use strict";
var gsb;
gsb = gsb || {};
(function ($, gsb) {
  "use strict";
  function setStyleAttrHook(whitelist) {
    $.attrHooks.style = {
      set: function set(element, styleString) {
        var dummy = document.createElement('div'),
          dummyStyle = dummy.style,
          validStyles = [];
        dummy.style.cssText = styleString;
        validStyles = validStyles.concat(applyWhitelistedStyles(element, dummyStyle, whitelist));
        validStyles = validStyles.concat(removeWhitelistedStyles(element, dummyStyle, whitelist));
        return validStyles.length ? validStyles.join('; ') : '';
      }
    };
  }
  function applyWhitelistedStyles(el, dummyStyle, whitelist) {
    var elStyle = el.style,
      validStyles = [],
      invalidStyles = {},
      invalidStyleKeys;
    var i, l, name, value;

    for (i = 0, l = dummyStyle.length; i < l; i++) {
      name = dummyStyle[i];
      value = dummyStyle[name];
      if (whitelist[name]) {
        validStyles.push(name + ': ' + value);
        elStyle[name] = value;
      } else {
        invalidStyles[name] = true;
      }
    }
    invalidStyleKeys = Object.keys(invalidStyles);
    if (invalidStyleKeys.length) {
      gsb.warn("Prevented setting the following non-whitelisted CSS-Properties: " + invalidStyleKeys.join(', '));
    }
    return validStyles;
  }
  function removeWhitelistedStyles(el, dummyStyle, whitelist) {
    var elStyle = el.style,
      validStyles = [],
      invalidStyles = {},
      invalidStyleKeys;
    var i, l, name, value;

    for (i = 0, l = elStyle.length; i < l; i++) {
      name = elStyle[i];
      if (dummyStyle[name] === '') {
        if (whitelist[name]) {
          elStyle[name] = '';
        } else {
          value = elStyle[name];
          validStyles.push(name + ': ' + value);
          invalidStyles[name] = true;
        }
      }
    }
    invalidStyleKeys = Object.keys(invalidStyles);
    if (invalidStyleKeys.length) {
      gsb.warn("Prevented removal of the following non-whitelisted CSS-Properties: " + invalidStyleKeys.join(', '));
    }
    return validStyles;
  }
  gsb.jQueryHooks = function jQueryHooks({ styleWhitelist }) {// destructuring options for more helpful tooltips
    var options = $.extend(true, {}, jQueryHooks.defaultOptions, { styleWhitelist });
    setStyleAttrHook(options.styleWhitelist);
  };
  gsb.jQueryHooks.defaultOptions = {
    styleWhitelist: {} //disallow everything
  };
})(jQuery, gsb);

    

   /* Ende gsb_jQueryHooks */
   /* Start gsb_makeGSBModule */
   
    

    

    /* --GSBDocStart
 * @name: @gsb/gsb_makeGSBModule
 * @version: 2.1.0
 * @description: GSB-JS-Modul-Factory
 * --GSBDocEnd
*/"use strict";
var gsb;
gsb = gsb || {};
(function ($, gsb) {

  /* @example
   * function module(){}
   * var $;
   * set($, ['gsb', 'foo', 'bar'], module);
   * $.gsb && $.gsb.foo && $.gsb.foo.bar === module //true
   */
  function set(object, namespace, value) {// Build name space recursively and adds the "module(el, userOptions, ...additionalParameters)"
    var i,l = namespace.length - 1, // function to last ID of given namespace. Skips existing IDs, adds empty object for none existing.
      property,last = namespace[l];
    for (i = 0; i < l; i++) {
      property = namespace[i];
      object[property] = object[property] || {};
      object = object[property];
    }
    object[last] = value;
  }
  /* @example
   * var $ = {
   *   gsb: {
   *     foo: {
   *       bar: function(x){
   *         return x;
   *       }
   *     }
   *   }
   * };
   * apply($, ['gsb', 'foo', 'bar'], ['baz']) === 'baz' //true
   */
  function apply(object, namespace, args) {// Descents recursively through namespace and calls last ID if it contains a function.
    var i,l = namespace.length - 1, // Should be "module(el, userOptions, ...additionalParameters)" function.
      property,last = namespace[l];
    for (i = 0; i < l; i++) {
      property = namespace[i];
      object = object && object[property];
    }
    if (typeof object[last] === "function") {
      object[last].apply(object, args);
    }
  }

  // Adds meta properties to the module template. Currently: eventName and moduleName as identifier.
  function enhance(fullName, namespace, template) {//returns an "enhanced" copy of a template
    return $.extend(true, {
      eventName: namespace.slice().reverse().join('.'),
      moduleName: fullName,
      generateID: function () {
        // Math.random should be unique because of its seeding algorithm.
        // Convert it to base 36 (numbers + letters), and grab the first 9 characters
        // after the decimal.
        return '_' + Math.random().toString(36).substr(2, 9);
      },
      sharedBetweenInstances: {
        instanceCount: 0
      }
    }, template);
  }

  // Is called in each Module respectively. Registers the Modules build process to the jQuery Prototype. Adds a shortcut to execute
  // initialization of module to a list jQuery objects.
  gsb.makeGSBModule = function makeGSBModule(fullName, template) {
    var namespace = fullName.split('.');

    // A function to initialize an instance of a module inside a jQuery object.
    function module(el, userOptions, ...additionalParameters) {
      var base = $.extend({}, template);
      base.el = el;
      base.$el = $(el);
      base.options = $.extend(true, {}, template.defaultOptions, userOptions);
      base.$el.data(namespace.join('.'), base);
      base.sharedBetweenInstances.instanceCount++;
      base.instanceNamespace = '.instance' + base.sharedBetweenInstances.instanceCount + '.' + base.eventName;
      base.init(el, userOptions, ...additionalParameters);
    }

    template = enhance(fullName, namespace, template);

    module.defaultOptions = template.defaultOptions || {};

    set($, namespace, module);

    // Applies the apply function to every jQuery-Element in a list if that element doesn't contain a module already or the given module
    // has the option "force" set to true.
    // Is called in init by "snake_cased" module name. $('.my-selector').gsb_my_module.
    $.fn[namespace.join('_')] = function (userOptions, ...additionalParameters) {
      $(this).each(function (i, el) {
        if (!$(el).data(namespace.join('.')) || userOptions && userOptions.force) {//Is not occupied or is force true?
          apply($, namespace, [el, userOptions, ...additionalParameters]);
        }
      });
      return this;
    };
  };
})(jQuery, gsb);

    

   /* Ende gsb_makeGSBModule */
   /* Start gsb_requireGSBComponent */
   
    

    

    /* --GSBDocStart
 * @name: @gsb/gsb_requireGSBComponent
 * @version: 2.0.1
 * @description: Lib um Javascript-Ressourcen als Bündel nachzuladen wenn diese gebraucht werden. Zielsetzung: Verringerung von Ladezeiten
 * --GSBDocEnd
*/"use strict";
var gsb;
gsb = gsb || {};
(function ($, gsb) {
  const state = {
    instanceCount: 0,
    promises: {}
  };

  function requireGenericGSBComponent(componentName, instanceName) {
    const promiseArray = createScriptTags(gsb.jsComponents.definitions[componentName].scriptList, instanceName);
    return Promise.all(promiseArray);
  }

  function createScriptTags(scriptList, instanceName) {
    const promiseArray = [];
    scriptList.forEach((scriptPath) => {
      promiseArray.push(createScriptTag(scriptPath));
    });
    return promiseArray;
  }

  /**
   * Creates a Script Tag, appends and executes it.
   * While creating a new Promise or waiting for a previou Promise the Script has already been requested.
   *
   * @param scriptPath the Path of the script used for the src Attribute
   * @param instanceName the name of this instance used for logging
   * @returns {Promise<unknown>} a promise that ensures that the Script is ready to use when resolved
   */
  function createScriptTag(scriptPath, instanceName) {
    let promise;
    if (state.promises[scriptPath]) {
      promise = state.promises[scriptPath];
    } else {
      promise = new Promise(function (resolve, reject) {
        const $script = $('<script></script>').attr('src', scriptPath).attr('charSet', 'UTF-8');
        $script.
        prop('async', false).
        on('load', function () {
          resolve({ scriptPath, action: 'DOM load' });
        });
        document.body.appendChild($script[0]);

      });
      state.promises[scriptPath] = promise;
    }
    return promise;
  }

  gsb.requireGSBComponent = function (componentName, $el) {
    const instanceName = 'gsb.requireGSBComponent-' + state.instanceCount++;
    const deferred = $.Deferred();
    let error;

    if (gsb.jsComponents.definitions[componentName]) {
      if (!$el || !$el.length) {
        error = new Error('Elemente nicht im DOM gefunden. GSB-Komponente wird nicht geladen');
        deferred.reject(error);
      } else {
        requireGenericGSBComponent(componentName, instanceName).
        then(() => deferred.resolve($el)).
        catch((err) => {
          deferred.reject(err);
          console.error(instanceName, `GSB-Komponente ${componentName} für Elemente`, $el,
          'konnte nicht eingebunden werden, es gab folgenden Fehler', err);
        });
      }
    } else {
      console.error(instanceName, `GSB-Komponente ${componentName} ist nicht definiert, und kann daher nicht eingebunden werden`);
    }

    return deferred;
  };

})(jQuery, gsb);

    

   /* Ende gsb_requireGSBComponent */
   /* Start gsb_responsiveListener */
   
    

    

    /* --GSBDocStart
 * @name: @gsb/gsb_responsive_listener
 * @version: 2.0.2
 * @description: Diese Bibliothek wird zur Unterstützung von responsiven Breakpoints in GSB Modulen verwendet.
 * --GSBDocEnd
*/"use strict";
(function ($) {
  if (!$.gsb) {
    $.gsb = {};
  }


  $.gsb.responsiveListener = function (pluginBase) {
    var base = this;
    this.base = base;
    this.pluginBase = pluginBase;

    // Add a reverse reference to the DOM object
    this.base.breakpoints = [];
    this.base.breakpointSettings = [];
    this.base.activeBreakpoint = null;
    this.base.windowWidth = 0;

    base.init = function () {
      //Da die Lib keine eigenen Options hat, Options vom Plugin holen
      base.options = pluginBase.options;
      base.originalOptions = base.options;
      this.base.options = base.options;
      this.base.originalOptions = base.originalOptions;
      base.initResponsive();
      base.checkResponsive();
      if (base.options.respondToEvents === true) {
        base.initEvents();
      }
    };


    /**
     * Initialisiert die Events.
     */
    $.gsb.responsiveListener.prototype.initEvents = function () {
      var $window = $(window),
        onResize = function () {
          if ($(window).width() !== base.windowWidth) {
            clearTimeout(base.windowDelay);
            base.windowDelay = window.setTimeout(function () {
              base.windowWidth = $(window).width();
              base.checkResponsive();
            }, 100);
          }
        };
      $window.on('resize', onResize);
      $window.on('orientationchange', function () {
        base.checkResponsive();
      });
    };

    // Run initializer
    base.init();
  };


  /**
   * Initialisiert die Datenstrukturen fuer die responsiven Ueberpruefungen.
   */
  $.gsb.responsiveListener.prototype.initResponsive = function () {
    var breakpoint,
      responsiveSettings = this.base.options.responsive || null;

    if (responsiveSettings && responsiveSettings.length > -1) {
      for (breakpoint in responsiveSettings) {
        if (responsiveSettings.hasOwnProperty(breakpoint)) {
          if (typeof responsiveSettings[breakpoint].breakpoint === 'string') {
            const emBreakPoint = parseInt(responsiveSettings[breakpoint].breakpoint) * (parseInt(window.getComputedStyle($('html')[0], null).getPropertyValue('font-size')) / 0.625);
            this.base.breakpoints.push(emBreakPoint);
            // Save with pixelValue as propertyname and not the original em-string.
            // Computed Properties are used to identify the breakpointSettings for the targetBreakpoint, which is used as the propertyname and is always in Pixel.
            this.base.breakpointSettings[emBreakPoint] = responsiveSettings[breakpoint];
          } else {
            this.base.breakpoints.push(responsiveSettings[breakpoint].breakpoint);
            this.base.breakpointSettings[responsiveSettings[breakpoint].breakpoint] = responsiveSettings[breakpoint];
          }
        }
      }
      this.base.breakpoints.sort(function (a, b) {
        return b - a;
      });
    }
  };


  /**
   * Ueberprueft, ob eine Aenderung der Einstellungen durchgefuehrt werden muss. Dies ist dann der Fall, wenn
   * sich  die Breite des Viewports(window-Objekt) geaendert hat und mindestens einen der angegebenen Breakpoints
   * unterschreitet. Ausschlaggebend fuer die Aenderungen ist der letzte konfigurierte Breakpoint, dessen Breite
   * unterschritten wird.
   *
   */
  $.gsb.responsiveListener.prototype.checkResponsive = function () {
    var breakpoint,
      targetBreakpoint,
      respondToWidth = $(window).width();

    // Case: "responsive : [{...},{...}]" value of the given options is not empty.
    if (this.base.originalOptions.responsive &&
    this.base.originalOptions.responsive.length > -1 &&
    this.base.originalOptions.responsive !== null) {

      targetBreakpoint = null;

      // Resets the options to original if the window width is greater than the greatest breakpoint.
      if (this.base.activeBreakpoint !== null && respondToWidth >= this.base.breakpoints[0]) {
        this.base.activeBreakpoint = null;
        this.pluginBase.options = this.base.originalOptions;
      }

      // Looks for the first breakpoint value greater than the screen width.
      for (breakpoint in this.base.breakpoints) {
        if (this.base.breakpoints.hasOwnProperty(breakpoint)) {
          if (respondToWidth < this.base.breakpoints[breakpoint]) {
            targetBreakpoint = this.base.breakpoints[breakpoint];
            this.base.highestResolution = false;
          }
        }
      }

      // In case no breakpoint value is larger than the current window width, terminate.
      if (this.base.highestResolution) {
        return;
      }

      if (targetBreakpoint !== null) {
        if (this.base.activeBreakpoint !== null) {// Case: targetBreakpoint was found and a breakpoint is already active.
          if (targetBreakpoint !== this.base.activeBreakpoint) {// Merges breakpoint specific options and plugin options to the options that should currently apply.
            this.base.activeBreakpoint = targetBreakpoint;
            this.pluginBase.options = $.extend({},
            this.base.originalOptions,
            this.base.breakpointSettings[targetBreakpoint]);
            this.base.triggerRefresh();
          }
        } else {// Case: targetBreakpoint was found and no breakpoint is active
          this.base.activeBreakpoint = targetBreakpoint;
          this.pluginBase.options = $.extend({},
          this.base.originalOptions,
          this.base.breakpointSettings[targetBreakpoint]);
          this.base.triggerRefresh();
        }
      } else {
        if (this.base.activeBreakpoint !== null) {// Case: targetBreakpoint was NOT found but a breakpoint is active
          this.base.activeBreakpoint = null;
          this.base.options = this.base.originalOptions;
          this.base.triggerRefresh();
        } else {// Case: targetBreakpoint was NOT found and no breakpoint is active
          this.base.highestResolution = true;
          this.base.triggerRefresh();
        }
      }
    } else if (this.base.originalOptions.onRefresh &&
    this.base.originalOptions.onRefresh.length > -1 &&
    this.base.originalOptions.onRefresh !== null) {// Case: Only base options but not the "responsive: [{...},{...}]" Array filled.
      if (this.base.highestResolution) {
        return;
      }
      this.base.triggerRefresh();
      this.base.highestResolution = true;
    }
  };


  /**
   * Loest die Aktualisierung des Scripts aus.
   */
  $.gsb.responsiveListener.prototype.triggerRefresh = function () {
    if (typeof this.pluginBase.options.onRefresh === 'function') {
      this.pluginBase.options.onRefresh.call(this.pluginBase);
    }
  };

  $.fn.gsb_responsiveListener = function (pluginBase) {
    return this.each(function () {
      new $.gsb.responsiveListener(pluginBase);
    });
  };
})(jQuery);

    

   /* Ende gsb_responsiveListener */
   /* Start js.cookie */
   
    

    

    /*! js-cookie v3.0.5 | MIT */
;
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, (function () {
    var current = global.Cookies;
    var exports = global.Cookies = factory();
    exports.noConflict = function () { global.Cookies = current; return exports; };
  })());
})(this, (function () { 'use strict';

  /* eslint-disable no-var */
  function assign (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        target[key] = source[key];
      }
    }
    return target
  }
  /* eslint-enable no-var */

  /* eslint-disable no-var */
  var defaultConverter = {
    read: function (value) {
      if (value[0] === '"') {
        value = value.slice(1, -1);
      }
      return value.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent)
    },
    write: function (value) {
      return encodeURIComponent(value).replace(
        /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
        decodeURIComponent
      )
    }
  };
  /* eslint-enable no-var */

  /* eslint-disable no-var */

  function init (converter, defaultAttributes) {
    function set (name, value, attributes) {
      if (typeof document === 'undefined') {
        return
      }

      attributes = assign({}, defaultAttributes, attributes);

      if (typeof attributes.expires === 'number') {
        attributes.expires = new Date(Date.now() + attributes.expires * 864e5);
      }
      if (attributes.expires) {
        attributes.expires = attributes.expires.toUTCString();
      }

      name = encodeURIComponent(name)
        .replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent)
        .replace(/[()]/g, escape);

      var stringifiedAttributes = '';
      for (var attributeName in attributes) {
        if (!attributes[attributeName]) {
          continue
        }

        stringifiedAttributes += '; ' + attributeName;

        if (attributes[attributeName] === true) {
          continue
        }

        // Considers RFC 6265 section 5.2:
        // ...
        // 3.  If the remaining unparsed-attributes contains a %x3B (";")
        //     character:
        // Consume the characters of the unparsed-attributes up to,
        // not including, the first %x3B (";") character.
        // ...
        stringifiedAttributes += '=' + attributes[attributeName].split(';')[0];
      }

      return (document.cookie =
        name + '=' + converter.write(value, name) + stringifiedAttributes)
    }

    function get (name) {
      if (typeof document === 'undefined' || (arguments.length && !name)) {
        return
      }

      // To prevent the for loop in the first place assign an empty array
      // in case there are no cookies at all.
      var cookies = document.cookie ? document.cookie.split('; ') : [];
      var jar = {};
      for (var i = 0; i < cookies.length; i++) {
        var parts = cookies[i].split('=');
        var value = parts.slice(1).join('=');

        try {
          var found = decodeURIComponent(parts[0]);
          jar[found] = converter.read(value, found);

          if (name === found) {
            break
          }
        } catch (e) {}
      }

      return name ? jar[name] : jar
    }

    return Object.create(
      {
        set,
        get,
        remove: function (name, attributes) {
          set(
            name,
            '',
            assign({}, attributes, {
              expires: -1
            })
          );
        },
        withAttributes: function (attributes) {
          return init(this.converter, assign({}, this.attributes, attributes))
        },
        withConverter: function (converter) {
          return init(assign({}, this.converter, converter), this.attributes)
        }
      },
      {
        attributes: { value: Object.freeze(defaultAttributes) },
        converter: { value: Object.freeze(converter) }
      }
    )
  }

  var api = init(defaultConverter, { path: '/' });
  /* eslint-enable no-var */

  return api;

}));

    

   /* Ende js.cookie */
   /* Start jquery.mark */
   
    

    

    /*!***************************************************
* mark.js v8.11.1
* https://markjs.io/
* Copyright (c) 2014–2018, Julian Kühnel
* Released under the MIT license https://git.io/vwTVl
*****************************************************/
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t(require("jquery")):"function"==typeof define&&define.amd?define(["jquery"],t):e.Mark=t(e.jQuery)}(this,function(e){"use strict";e=e&&e.hasOwnProperty("default")?e.default:e;var t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},n=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o=function(){function e(t){var r=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:5e3;n(this,e),this.ctx=t,this.iframes=r,this.exclude=i,this.iframesTimeout=o}return r(e,[{key:"getContexts",value:function(){var e=[];return(void 0!==this.ctx&&this.ctx?NodeList.prototype.isPrototypeOf(this.ctx)?Array.prototype.slice.call(this.ctx):Array.isArray(this.ctx)?this.ctx:"string"==typeof this.ctx?Array.prototype.slice.call(document.querySelectorAll(this.ctx)):[this.ctx]:[]).forEach(function(t){var n=e.filter(function(e){return e.contains(t)}).length>0;-1!==e.indexOf(t)||n||e.push(t)}),e}},{key:"getIframeContents",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:function(){},r=void 0;try{var i=e.contentWindow;if(r=i.document,!i||!r)throw new Error("iframe inaccessible")}catch(e){n()}r&&t(r)}},{key:"isIframeBlank",value:function(e){var t=e.getAttribute("src").trim();return"about:blank"===e.contentWindow.location.href&&"about:blank"!==t&&t}},{key:"observeIframeLoad",value:function(e,t,n){var r=this,i=!1,o=null,a=function a(){if(!i){i=!0,clearTimeout(o);try{r.isIframeBlank(e)||(e.removeEventListener("load",a),r.getIframeContents(e,t,n))}catch(e){n()}}};e.addEventListener("load",a),o=setTimeout(a,this.iframesTimeout)}},{key:"onIframeReady",value:function(e,t,n){try{"complete"===e.contentWindow.document.readyState?this.isIframeBlank(e)?this.observeIframeLoad(e,t,n):this.getIframeContents(e,t,n):this.observeIframeLoad(e,t,n)}catch(e){n()}}},{key:"waitForIframes",value:function(e,t){var n=this,r=0;this.forEachIframe(e,function(){return!0},function(e){r++,n.waitForIframes(e.querySelector("html"),function(){--r||t()})},function(e){e||t()})}},{key:"forEachIframe",value:function(t,n,r){var i=this,o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:function(){},a=t.querySelectorAll("iframe"),s=a.length,c=0;a=Array.prototype.slice.call(a);var u=function(){--s<=0&&o(c)};s||u(),a.forEach(function(t){e.matches(t,i.exclude)?u():i.onIframeReady(t,function(e){n(t)&&(c++,r(e)),u()},u)})}},{key:"createIterator",value:function(e,t,n){return document.createNodeIterator(e,t,n,!1)}},{key:"createInstanceOnIframe",value:function(t){return new e(t.querySelector("html"),this.iframes)}},{key:"compareNodeIframe",value:function(e,t,n){if(e.compareDocumentPosition(n)&Node.DOCUMENT_POSITION_PRECEDING){if(null===t)return!0;if(t.compareDocumentPosition(n)&Node.DOCUMENT_POSITION_FOLLOWING)return!0}return!1}},{key:"getIteratorNode",value:function(e){var t=e.previousNode();return{prevNode:t,node:null===t?e.nextNode():e.nextNode()&&e.nextNode()}}},{key:"checkIframeFilter",value:function(e,t,n,r){var i=!1,o=!1;return r.forEach(function(e,t){e.val===n&&(i=t,o=e.handled)}),this.compareNodeIframe(e,t,n)?(!1!==i||o?!1===i||o||(r[i].handled=!0):r.push({val:n,handled:!0}),!0):(!1===i&&r.push({val:n,handled:!1}),!1)}},{key:"handleOpenIframes",value:function(e,t,n,r){var i=this;e.forEach(function(e){e.handled||i.getIframeContents(e.val,function(e){i.createInstanceOnIframe(e).forEachNode(t,n,r)})})}},{key:"iterateThroughNodes",value:function(e,t,n,r,i){for(var o,a=this,s=this.createIterator(t,e,r),c=[],u=[],l=void 0,h=void 0;void 0,o=a.getIteratorNode(s),h=o.prevNode,l=o.node;)this.iframes&&this.forEachIframe(t,function(e){return a.checkIframeFilter(l,h,e,c)},function(t){a.createInstanceOnIframe(t).forEachNode(e,function(e){return u.push(e)},r)}),u.push(l);u.forEach(function(e){n(e)}),this.iframes&&this.handleOpenIframes(c,e,n,r),i()}},{key:"forEachNode",value:function(e,t,n){var r=this,i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:function(){},o=this.getContexts(),a=o.length;a||i(),o.forEach(function(o){var s=function(){r.iterateThroughNodes(e,o,t,n,function(){--a<=0&&i()})};r.iframes?r.waitForIframes(o,s):s()})}}],[{key:"matches",value:function(e,t){var n="string"==typeof t?[t]:t,r=e.matches||e.matchesSelector||e.msMatchesSelector||e.mozMatchesSelector||e.oMatchesSelector||e.webkitMatchesSelector;if(r){var i=!1;return n.every(function(t){return!r.call(e,t)||(i=!0,!1)}),i}return!1}}]),e}(),a=function(){function e(t){n(this,e),this.ctx=t,this.ie=!1;var r=window.navigator.userAgent;(r.indexOf("MSIE")>-1||r.indexOf("Trident")>-1)&&(this.ie=!0)}return r(e,[{key:"log",value:function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"debug",r=this.opt.log;this.opt.debug&&"object"===(void 0===r?"undefined":t(r))&&"function"==typeof r[n]&&r[n]("mark.js: "+e)}},{key:"escapeStr",value:function(e){return e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")}},{key:"createRegExp",value:function(e){return"disabled"!==this.opt.wildcards&&(e=this.setupWildcardsRegExp(e)),e=this.escapeStr(e),Object.keys(this.opt.synonyms).length&&(e=this.createSynonymsRegExp(e)),(this.opt.ignoreJoiners||this.opt.ignorePunctuation.length)&&(e=this.setupIgnoreJoinersRegExp(e)),this.opt.diacritics&&(e=this.createDiacriticsRegExp(e)),e=this.createMergedBlanksRegExp(e),(this.opt.ignoreJoiners||this.opt.ignorePunctuation.length)&&(e=this.createJoinersRegExp(e)),"disabled"!==this.opt.wildcards&&(e=this.createWildcardsRegExp(e)),e=this.createAccuracyRegExp(e)}},{key:"createSynonymsRegExp",value:function(e){var t=this.opt.synonyms,n=this.opt.caseSensitive?"":"i",r=this.opt.ignoreJoiners||this.opt.ignorePunctuation.length?"\0":"";for(var i in t)if(t.hasOwnProperty(i)){var o=t[i],a="disabled"!==this.opt.wildcards?this.setupWildcardsRegExp(i):this.escapeStr(i),s="disabled"!==this.opt.wildcards?this.setupWildcardsRegExp(o):this.escapeStr(o);""!==a&&""!==s&&(e=e.replace(new RegExp("("+this.escapeStr(a)+"|"+this.escapeStr(s)+")","gm"+n),r+"("+this.processSynomyms(a)+"|"+this.processSynomyms(s)+")"+r))}return e}},{key:"processSynomyms",value:function(e){return(this.opt.ignoreJoiners||this.opt.ignorePunctuation.length)&&(e=this.setupIgnoreJoinersRegExp(e)),e}},{key:"setupWildcardsRegExp",value:function(e){return(e=e.replace(/(?:\\)*\?/g,function(e){return"\\"===e.charAt(0)?"?":""})).replace(/(?:\\)*\*/g,function(e){return"\\"===e.charAt(0)?"*":""})}},{key:"createWildcardsRegExp",value:function(e){var t="withSpaces"===this.opt.wildcards;return e.replace(/\u0001/g,t?"[\\S\\s]?":"\\S?").replace(/\u0002/g,t?"[\\S\\s]*?":"\\S*")}},{key:"setupIgnoreJoinersRegExp",value:function(e){return e.replace(/[^(|)\\]/g,function(e,t,n){var r=n.charAt(t+1);return/[(|)\\]/.test(r)||""===r?e:e+"\0"})}},{key:"createJoinersRegExp",value:function(e){var t=[],n=this.opt.ignorePunctuation;return Array.isArray(n)&&n.length&&t.push(this.escapeStr(n.join(""))),this.opt.ignoreJoiners&&t.push("\\u00ad\\u200b\\u200c\\u200d"),t.length?e.split(/\u0000+/).join("["+t.join("")+"]*"):e}},{key:"createDiacriticsRegExp",value:function(e){var t=this.opt.caseSensitive?"":"i",n=this.opt.caseSensitive?["aàáảãạăằắẳẵặâầấẩẫậäåāą","AÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÄÅĀĄ","cçćč","CÇĆČ","dđď","DĐĎ","eèéẻẽẹêềếểễệëěēę","EÈÉẺẼẸÊỀẾỂỄỆËĚĒĘ","iìíỉĩịîïī","IÌÍỈĨỊÎÏĪ","lł","LŁ","nñňń","NÑŇŃ","oòóỏõọôồốổỗộơởỡớờợöøō","OÒÓỎÕỌÔỒỐỔỖỘƠỞỠỚỜỢÖØŌ","rř","RŘ","sšśșş","SŠŚȘŞ","tťțţ","TŤȚŢ","uùúủũụưừứửữựûüůū","UÙÚỦŨỤƯỪỨỬỮỰÛÜŮŪ","yýỳỷỹỵÿ","YÝỲỶỸỴŸ","zžżź","ZŽŻŹ"]:["aàáảãạăằắẳẵặâầấẩẫậäåāąAÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÄÅĀĄ","cçćčCÇĆČ","dđďDĐĎ","eèéẻẽẹêềếểễệëěēęEÈÉẺẼẸÊỀẾỂỄỆËĚĒĘ","iìíỉĩịîïīIÌÍỈĨỊÎÏĪ","lłLŁ","nñňńNÑŇŃ","oòóỏõọôồốổỗộơởỡớờợöøōOÒÓỎÕỌÔỒỐỔỖỘƠỞỠỚỜỢÖØŌ","rřRŘ","sšśșşSŠŚȘŞ","tťțţTŤȚŢ","uùúủũụưừứửữựûüůūUÙÚỦŨỤƯỪỨỬỮỰÛÜŮŪ","yýỳỷỹỵÿYÝỲỶỸỴŸ","zžżźZŽŻŹ"],r=[];return e.split("").forEach(function(i){n.every(function(n){if(-1!==n.indexOf(i)){if(r.indexOf(n)>-1)return!1;e=e.replace(new RegExp("["+n+"]","gm"+t),"["+n+"]"),r.push(n)}return!0})}),e}},{key:"createMergedBlanksRegExp",value:function(e){return e.replace(/[\s]+/gim,"[\\s]+")}},{key:"createAccuracyRegExp",value:function(e){var t=this,n=this.opt.accuracy,r="string"==typeof n?n:n.value,i="";switch(("string"==typeof n?[]:n.limiters).forEach(function(e){i+="|"+t.escapeStr(e)}),r){case"partially":default:return"()("+e+")";case"complementary":return"()([^"+(i="\\s"+(i||this.escapeStr("!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~¡¿")))+"]*"+e+"[^"+i+"]*)";case"exactly":return"(^|\\s"+i+")("+e+")(?=$|\\s"+i+")"}}},{key:"getSeparatedKeywords",value:function(e){var t=this,n=[];return e.forEach(function(e){t.opt.separateWordSearch?e.split(" ").forEach(function(e){e.trim()&&-1===n.indexOf(e)&&n.push(e)}):e.trim()&&-1===n.indexOf(e)&&n.push(e)}),{keywords:n.sort(function(e,t){return t.length-e.length}),length:n.length}}},{key:"isNumeric",value:function(e){return Number(parseFloat(e))==e}},{key:"checkRanges",value:function(e){var t=this;if(!Array.isArray(e)||"[object Object]"!==Object.prototype.toString.call(e[0]))return this.log("markRanges() will only accept an array of objects"),this.opt.noMatch(e),[];var n=[],r=0;return e.sort(function(e,t){return e.start-t.start}).forEach(function(e){var i=t.callNoMatchOnInvalidRanges(e,r),o=i.start,a=i.end;i.valid&&(e.start=o,e.length=a-o,n.push(e),r=a)}),n}},{key:"callNoMatchOnInvalidRanges",value:function(e,t){var n=void 0,r=void 0,i=!1;return e&&void 0!==e.start?(r=(n=parseInt(e.start,10))+parseInt(e.length,10),this.isNumeric(e.start)&&this.isNumeric(e.length)&&r-t>0&&r-n>0?i=!0:(this.log("Ignoring invalid or overlapping range: "+JSON.stringify(e)),this.opt.noMatch(e))):(this.log("Ignoring invalid range: "+JSON.stringify(e)),this.opt.noMatch(e)),{start:n,end:r,valid:i}}},{key:"checkWhitespaceRanges",value:function(e,t,n){var r=void 0,i=!0,o=n.length,a=t-o,s=parseInt(e.start,10)-a;return(r=(s=s>o?o:s)+parseInt(e.length,10))>o&&(r=o,this.log("End range automatically set to the max value of "+o)),s<0||r-s<0||s>o||r>o?(i=!1,this.log("Invalid range: "+JSON.stringify(e)),this.opt.noMatch(e)):""===n.substring(s,r).replace(/\s+/g,"")&&(i=!1,this.log("Skipping whitespace only range: "+JSON.stringify(e)),this.opt.noMatch(e)),{start:s,end:r,valid:i}}},{key:"getTextNodes",value:function(e){var t=this,n="",r=[];this.iterator.forEachNode(NodeFilter.SHOW_TEXT,function(e){r.push({start:n.length,end:(n+=e.textContent).length,node:e})},function(e){return t.matchesExclude(e.parentNode)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT},function(){e({value:n,nodes:r})})}},{key:"matchesExclude",value:function(e){return o.matches(e,this.opt.exclude.concat(["script","style","title","head","html"]))}},{key:"wrapRangeInTextNode",value:function(e,t,n){var r=this.opt.element?this.opt.element:"mark",i=e.splitText(t),o=i.splitText(n-t),a=document.createElement(r);return a.setAttribute("data-markjs","true"),this.opt.className&&a.setAttribute("class",this.opt.className),a.textContent=i.textContent,i.parentNode.replaceChild(a,i),o}},{key:"wrapRangeInMappedTextNode",value:function(e,t,n,r,i){var o=this;e.nodes.every(function(a,s){var c=e.nodes[s+1];if(void 0===c||c.start>t){if(!r(a.node))return!1;var u=t-a.start,l=(n>a.end?a.end:n)-a.start,h=e.value.substr(0,a.start),f=e.value.substr(l+a.start);if(a.node=o.wrapRangeInTextNode(a.node,u,l),e.value=h+f,e.nodes.forEach(function(t,n){n>=s&&(e.nodes[n].start>0&&n!==s&&(e.nodes[n].start-=l),e.nodes[n].end-=l)}),n-=l,i(a.node.previousSibling,a.start),!(n>a.end))return!1;t=a.end}return!0})}},{key:"wrapMatches",value:function(e,t,n,r,i){var o=this,a=0===t?0:t+1;this.getTextNodes(function(t){t.nodes.forEach(function(t){t=t.node;for(var i=void 0;null!==(i=e.exec(t.textContent))&&""!==i[a];)if(n(i[a],t)){var s=i.index;if(0!==a)for(var c=1;c<a;c++)s+=i[c].length;t=o.wrapRangeInTextNode(t,s,s+i[a].length),r(t.previousSibling),e.lastIndex=0}}),i()})}},{key:"wrapMatchesAcrossElements",value:function(e,t,n,r,i){var o=this,a=0===t?0:t+1;this.getTextNodes(function(t){for(var s=void 0;null!==(s=e.exec(t.value))&&""!==s[a];){var c=s.index;if(0!==a)for(var u=1;u<a;u++)c+=s[u].length;var l=c+s[a].length;o.wrapRangeInMappedTextNode(t,c,l,function(e){return n(s[a],e)},function(t,n){e.lastIndex=n,r(t)})}i()})}},{key:"wrapRangeFromIndex",value:function(e,t,n,r){var i=this;this.getTextNodes(function(o){var a=o.value.length;e.forEach(function(e,r){var s=i.checkWhitespaceRanges(e,a,o.value),c=s.start,u=s.end;s.valid&&i.wrapRangeInMappedTextNode(o,c,u,function(n){return t(n,e,o.value.substring(c,u),r)},function(t){n(t,e)})}),r()})}},{key:"unwrapMatches",value:function(e){for(var t=e.parentNode,n=document.createDocumentFragment();e.firstChild;)n.appendChild(e.removeChild(e.firstChild));t.replaceChild(n,e),this.ie?this.normalizeTextNode(t):t.normalize()}},{key:"normalizeTextNode",value:function(e){if(e){if(3===e.nodeType)for(;e.nextSibling&&3===e.nextSibling.nodeType;)e.nodeValue+=e.nextSibling.nodeValue,e.parentNode.removeChild(e.nextSibling);else this.normalizeTextNode(e.firstChild);this.normalizeTextNode(e.nextSibling)}}},{key:"markRegExp",value:function(e,t){var n=this;this.opt=t,this.log('Searching with expression "'+e+'"');var r=0,i="wrapMatches";this.opt.acrossElements&&(i="wrapMatchesAcrossElements"),this[i](e,this.opt.ignoreGroups,function(e,t){return n.opt.filter(t,e,r)},function(e){r++,n.opt.each(e)},function(){0===r&&n.opt.noMatch(e),n.opt.done(r)})}},{key:"mark",value:function(e,t){var n=this;this.opt=t;var r=0,i="wrapMatches",o=this.getSeparatedKeywords("string"==typeof e?[e]:e),a=o.keywords,s=o.length,c=this.opt.caseSensitive?"":"i";this.opt.acrossElements&&(i="wrapMatchesAcrossElements"),0===s?this.opt.done(r):function e(t){var o=new RegExp(n.createRegExp(t),"gm"+c),u=0;n.log('Searching with expression "'+o+'"'),n[i](o,1,function(e,i){return n.opt.filter(i,t,r,u)},function(e){u++,r++,n.opt.each(e)},function(){0===u&&n.opt.noMatch(t),a[s-1]===t?n.opt.done(r):e(a[a.indexOf(t)+1])})}(a[0])}},{key:"markRanges",value:function(e,t){var n=this;this.opt=t;var r=0,i=this.checkRanges(e);i&&i.length?(this.log("Starting to mark with the following ranges: "+JSON.stringify(i)),this.wrapRangeFromIndex(i,function(e,t,r,i){return n.opt.filter(e,t,r,i)},function(e,t){r++,n.opt.each(e,t)},function(){n.opt.done(r)})):this.opt.done(r)}},{key:"unmark",value:function(e){var t=this;this.opt=e;var n=this.opt.element?this.opt.element:"*";n+="[data-markjs]",this.opt.className&&(n+="."+this.opt.className),this.log('Removal selector "'+n+'"'),this.iterator.forEachNode(NodeFilter.SHOW_ELEMENT,function(e){t.unwrapMatches(e)},function(e){var r=o.matches(e,n),i=t.matchesExclude(e);return!r||i?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT},this.opt.done)}},{key:"opt",set:function(e){this._opt=i({},{element:"",className:"",exclude:[],iframes:!1,iframesTimeout:5e3,separateWordSearch:!0,diacritics:!0,synonyms:{},accuracy:"partially",acrossElements:!1,caseSensitive:!1,ignoreJoiners:!1,ignoreGroups:0,ignorePunctuation:[],wildcards:"disabled",each:function(){},noMatch:function(){},filter:function(){return!0},done:function(){},debug:!1,log:window.console},e)},get:function(){return this._opt}},{key:"iterator",get:function(){return new o(this.ctx,this.opt.iframes,this.opt.exclude,this.opt.iframesTimeout)}}]),e}();return e.fn.mark=function(e,t){return new a(this.get()).mark(e,t),this},e.fn.markRegExp=function(e,t){return new a(this.get()).markRegExp(e,t),this},e.fn.markRanges=function(e,t){return new a(this.get()).markRanges(e,t),this},e.fn.unmark=function(e){return new a(this.get()).unmark(e),this},e});

    

   /* Ende jquery.mark */
(function gsbJavaScriptModules(){ //prevents "use strict" statement from "leaking"
   /* Start gsb_autosuggest */
   
    

    

    /* --GSBDocStart
 * @name: @gsb/gsb_autosuggest
 * @version: 5.2.1
 * @description: Module for accessible autocompletion in search forms
 * --GSBDocEnd
*/"use strict";
gsb.makeGSBModule("gsb.AutoSuggest", {
  init: function (el, options, actionUrl) {
    const base = this;
    // eslint-disable-next-line no-param-reassign -- Kompatibilität mit alten Aufruf beihalten
    actionUrl = base.$el.attr('data-autosuggest-form') || actionUrl;

    if (!actionUrl) {
      throw new Error("Das Attribut data-autosuggest-form muss auf dem Basis-Element gesetzt werden");
    }

    base.actionUrl = actionUrl;
    // BoxCounter
    base.boxNumber = ++base.allInstances.boxCount;
    // Such-Textfeld
    const selectors = base.options.selectors;
    base.$input = base.$el.find(selectors.input).first();
    base.$submit = base.$el.find(selectors.submit).first();
    if (base.$submit.length === 0) {
      base.$submit = base.$el.find('input[type=image]:first');
    }
    // Aktuelle Anfrage
    base.reqQuery = false;
    // Anfragen Cachen
    base.queries = [];
    // Aktuelle Position
    base.activeIndex = NaN;

    // AutoSuggest-Box vorbereiten und positionieren
    if (base.options.markup.box) {
      base.$box = $(base.options.markup.box).
      insertAfter(base.$input);
      const description = base.$el.attr('data-autosuggest-box-description');
      if (typeof description !== "undefined") {
        const descId = base.generateID();
        $("<span></span>").
        text(description).
        addClass(base.options.classes.description).
        attr({
          id: descId,
          'aria-hidden': true,
          hidden: 'hidden'
        }).
        insertAfter(base.$input);
        base.$box.attr('aria-describedby', descId);
      } else {
        throw new Error("Attribut data-autosuggest-box-description muss auf dem Basis-Element gesetzt werden");
      }
    } else if (base.options.selectors.box) {
      base.$box = base.$el.find(base.options.selectors.box);
    }
    base.$box.
    attr({
      id: base.$box.attr("id") || `searchAutoSuggestBox${base.boxNumber}`,
      hidden: 'hidden'
    });

    // Browser-Auto-Vervollständigung deaktivieren
    base.$input.attr('autocomplete', 'off');

    base.makeAccessible();
    base.bindEvents();
  },
  allInstances: {
    boxCount: 0
  },
  makeAccessible: function () {
    const base = this;

    base.$input.attr({
      'role': base.$input.attr('role') || 'combobox',
      'aria-haspopup': 'listbox',
      'aria-owns': base.$box.attr('id'),
      'aria-expanded': 'false',
      'aria-autocomplete': 'list',
      'aria-activedescendant': null,
      'aria-controls': base.$box.attr('id')
    });

    base.$labels = $(base.$input.prop('labels')).each(function () {
      const $label = $(this);
      $label.attr('id', $label.attr('id') || base.generateID());
    });
    const labelList = base.$labels.toArray().map(function (label) {
      return $(label).attr('id');
    }).join(' ');

    base.$box.attr({
      role: base.$box.attr('role') || 'listbox',
      'aria-labelledby': labelList || null
    });
  },
  bindEvents: function () {
    const base = this;

    // Tastaturbefehle abfangen
    base.$input.on('keydown', base, base.onKeyDown);

    // Bubbling von Mousedown-Event verhindern (Kompatibilität mit gsb_simple_toggle)
    base.$input.on('mousedown', (ev) => ev.stopPropagation());

    // Bei Eingabe von mehr als zwei Zeichen Liste abrufen
    base.$input.on('keyup', base, base.onKeyUp);

    base.$el.on(`close.${base.eventName}`, base, function (ev) {
      ev.stopPropagation();
      ev.data.showSuggestionBox(false);
    });
    base.$el.on(`open.${base.eventName}`, base, function (ev) {
      ev.stopPropagation();
      ev.data.showSuggestionBox(true);
    });

    base.$el.
    on(`notEnoughCharacters.${base.eventName} noResults.${base.eventName}`, base, function (ev) {
      ev.stopPropagation();
      ev.data.$el.trigger(`close.${base.eventName}`, base);
    }).
    on(`showResults.${base.eventName}`, base, function (ev) {
      ev.stopPropagation();
      ev.data.$el.trigger(`open.${base.eventName}`, base);
    });
    base.$el.on(`focusout.${base.eventName}`, base, function (ev) {
      ev.data.$el.trigger(`close.${base.eventName}`, base);
    });
    base.$box.on('mousedown', function (ev) {
      ev.stopPropagation();
      ev.preventDefault();
    });
  },
  onKeyDown: function (ev) {
    const base = ev.data;
    let trigger = false,
      activeOpt,
      link;
    switch (ev.key) {
      case "Enter":
        trigger = true;
        break;
      case "Down": // IE/Edge
      case "ArrowDown":
        ev.preventDefault();
        base.selectNextSuggestion();
        break;
      case "Up": // IE/Edge
      case "ArrowUp":
        ev.preventDefault();
        base.selectPrevSuggestion();
        break;
      case "Esc": // IE/Edge
      case "Escape":
        base.showSuggestionBox(false);
        break;
      default:break;
    }
    if (trigger) {
      activeOpt = base.$box.find('[role=option]').eq(base.activeIndex);
      if (activeOpt.is(`.${base.options.classes.hasLink}`)) {
        ev.preventDefault(); //prevent form submission
        //jQuery does not call the native .click() on <a> elements
        link = activeOpt.find('a')[0];
        if (link && typeof link.click === "function") {
          link.click();
        }
      } else {
        base.triggerSubmit(activeOpt);
      }
    }
  },
  onKeyUp: function (ev) {
    const base = ev.data;
    let go = true;
    switch (ev.key) {
      case "Enter":
        return;
      case "Esc": // IE/Edge
      case "Escape":
        return;
      case "Down": // IE/Edge
      case "ArrowDown":
      case "Up": // IE/Edge
      case "ArrowUp":
        go = !base.$box.is(':visible');
        break;
      default:break;
    }

    if (go) {
      if (base.$input.val().length >= base.options.minInputLength) {
        base.query(base.$input.val());
      } else {
        base.$el.trigger(`notEnoughCharacters.${base.eventName}`, base);
      }
    }
  },
  query: function (value) {
    const base = this;
    base.reqQuery = value;
    if (typeof base.queries[base.reqQuery] === "undefined") {
      $.ajax({
        url: base.actionUrl,
        dataType: 'json',
        data: {
          'userQuery': value
        },
        error: function (jqXHR, textStatus, errorThrown) {
          // eslint-disable-next-line no-console -- Explizite Fehlerausgabe
          console.error(`AutoSuggest.base.query() > error=AJAX Fehler beim Abruf der JSON-Resource ${base.actionUrl}: ${textStatus} :: ${errorThrown}`);
        },
        success: function (data) {
          base.queries[value] = data;
          if (base.reqQuery === value) {
            base.showSuggestions(data);
          }
        }
      });
    } else {
      base.showSuggestions(base.queries[base.reqQuery]);
    }
  },
  showSuggestions: function (data) {
    const base = this;
    let count = 0;
    const createSublist = Boolean(base.options.markup.typedOption);
    base.$box.empty();
    Object.keys(data).forEach(function (typeName) {
      const typeLabel = base.options.typeLabels[typeName],
        typedData = data[typeName] || [];
      let optionContainer,
        optionLabel,
        typedOption,
        dummy;
      if (typeLabel && typedData.length) {
        if (createSublist) {
          dummy = $("<div/>");
          typedOption = $(base.options.markup.typedOption).appendTo(dummy);
          optionLabel = dummy.find(base.options.selectors.typeLabel).
          attr({
            "id": optionLabel ? optionLabel.attr("id") || base.generateID() : base.generateID(),
            "data-gsb-suggestion-type": typeName
          }).
          text(typeLabel);
          optionContainer = dummy.find(base.options.selectors.typedContainer).
          attr({
            'aria-labelledby': optionLabel.attr('id') || null,
            'data-gsb-suggestion-type': typeName
          });

          typedOption.appendTo(base.$box);
        } else {
          optionContainer = base.$el.find(base.options.selectors.typedContainer).
          filter(`[data-gsb-suggestion-type="${typeName}"]`);
          if (data[typeName].length) {
            optionContainer.empty();
          }
        }
      }
      if (!optionContainer || !optionContainer.length) {
        optionContainer = base.$box;
      }
      data[typeName].forEach(function (suggestion, index) {
        let option;
        if (suggestion) {
          count++;
          option = $(base.options.markup.option);
          option.html(base.options.markup.optionInner.call(base, suggestion, base.reqQuery));
          option.attr({
            "data-input": suggestion.name,
            id: option.attr("id") || base.generateID(),
            role: "option"
          });

          if (suggestion.link) {
            option.addClass('has-link');
            option.wrapInner($("<a/>").attr({
              href: suggestion.link,
              tabindex: -1
            }));
          }
          option.on('click', base, base.onSuggestionClick);
          option.appendTo(optionContainer);
        }
      });
    });
    if (count > 0) {
      base.$el.trigger(`showResults.${base.eventName}`, base);
    } else {
      base.$el.trigger(`noResults.${base.eventName}`, base);
    }
  },
  onSuggestionClick: function (ev) {
    const base = ev.data,
      opt = $(ev.currentTarget);
    if (!opt.is(`.${base.options.classes.hasLink}`)) {
      ev.preventDefault(); // if old markup is used (not recommended)
      base.triggerSubmit(opt);
    }
  },
  showSuggestionBox: function (show) {
    const base = this;

    if (show) {
      if (!base.specialTrigger(`beforeShow.${base.eventName}`)) {
        return;
      }
      base.$input.attr("aria-expanded", "true");
      base.$box.add(base.$el.find(base.options.selectors.description)).
      attr({
        hidden: null,
        'aria-hidden': false
      });
      let boxOffsetTop = base.$box.offset().top - $(window).scrollTop();
      base.$box.css({ maxHeight: 'calc(100vh - ' + boxOffsetTop + 'px)', overflow: 'auto' });
    } else {
      if (!base.specialTrigger(`beforeHide.${base.eventName}`)) {
        return;
      }
      base.$input.attr("aria-expanded", "false");
      base.$box.add(base.$el.find(base.options.selectors.description)).
      attr({
        hidden: 'hidden',
        'aria-hidden': true
      });
    }

    base.activeIndex = NaN;
    base.$input.attr("aria-activedescendant", null);
  },
  selectNextSuggestion: function () {
    const base = this,
      n = base.$box.find('[role=option]').length; // the number of suggestions
    if (n > 0) {
      if (isNaN(base.activeIndex) || base.activeIndex >= n - 1) {
        base.activeIndex = 0;
      } else if (base.activeIndex < n - 1) {
        base.activeIndex++;
      }
      base.selectSuggestion();
    }
  },
  selectPrevSuggestion: function () {
    const base = this,
      n = base.$box.find('[role=option]').length;
    if (n > 0) {
      if (isNaN(base.activeIndex) || base.activeIndex <= 0) {
        base.activeIndex = n - 1;
      } else if (base.activeIndex > 0) {
        base.activeIndex--;
      }
      base.selectSuggestion();
    }
  },
  selectSuggestion: function () {
    const base = this,
      suggestions = base.$box.find('[role=option]'),
      activeSuggestion = suggestions.eq(base.activeIndex);
    suggestions.
    removeClass('active').
    attr('aria-selected', 'false');
    activeSuggestion.
    addClass('active').
    attr('aria-selected', 'true');
    base.$input.attr({
      'aria-activedescendant': activeSuggestion.attr('id')
    });

    if (!base.isInVisibleSuggestionBox(activeSuggestion)) {
      $(activeSuggestion)[0].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  },
  isInVisibleSuggestionBox: function (element) {
    const base = this;
    let isInVisibleSuggestionBox;
    const elementHeight = $(element).outerHeight();
    const elementTop = $(element).offset().top;
    const elementBottom = elementTop + elementHeight;
    const boxHeight = base.$box.outerHeight();
    const boxTop = base.$box.offset().top;
    const boxBottom = boxTop + boxHeight;
    if (elementHeight >= boxHeight) {
      isInVisibleSuggestionBox = elementBottom - 1 / 2 * elementHeight < boxBottom && elementTop + 1 / 2 * elementHeight > boxTop;
    } else {
      isInVisibleSuggestionBox = elementBottom < boxBottom && elementTop > boxTop;
    }
    return isInVisibleSuggestionBox;
  },
  triggerSubmit: function (activeSuggestion) {
    const base = this;
    if (activeSuggestion && activeSuggestion.length > 0) {
      base.$input.val(activeSuggestion.first().attr('data-input'));
      base.$submit.click();
    }
  },
  // triggers event on base.$el
  // returns false if event is cancelled
  specialTrigger: function (evStr, ev) {
    const base = this;
    let namespaces = evStr.split('.');
    const type = namespaces.shift();
    namespaces = namespaces.sort();
    // eslint-disable-next-line new-cap -- Event ist Teil von jQuery
    const event = $.Event(type, {
      namespace: namespaces.join('.'),
      relatedEvent: ev || null
    });
    base.$el.trigger(event, base);
    return !event.isDefaultPrevented();
  },
  defaultOptions: {
    minInputLength: 2,
    typeLabels: {},
    selectors: {
      box: null,
      description: '.js-autosuggest-description',
      input: "input[type=text], input[type=search]",
      submit: "input[type=submit], button[type=submit]",
      typeLabel: ".c-autosuggest__headline",
      typedContainer: ".c-autosuggest__sublist"
    },
    markup: {
      box: "<ul class='c-autosuggest__list'></ul>",
      option: "<li class='c-autosuggest__item'></li>",
      optionInner: function (suggestion) {
        return suggestion.name;
      },
      typedOption:
      "<li class='c-autosuggest__item'><h3 class='c-autosuggest__headline'></h3><ul class='c-autosuggest__sublist'></ul></li>"
    },
    classes: {
      description: 'c-autosuggest__description js-autosuggest-description',
      hasLink: 'has-link'
    }
  }
});

    

   /* Ende gsb_autosuggest */
   /* Start gsb_banner */
   
    

    

    /* --GSBDocStart
 * @name: @gsb/gsb_banner
 * @version: 6.1.1
 * @description: Dieses Modul ermöglicht die Darstellung einer Information in Form eines Popup-Banner, welches sich animiert ein- und ausgeblendet. Dieser Banner stellt eine Überschrift, einen Linktext sowie ein Bild,die aus einem Textbaustein (TextFragment) ausgelesen werden, dar. Beim erstmaligen Aufrufen der Seite mit konfiguriertem Banner wird dieser animiert im unteren Bildschirmbereich eingeblendet.
 * --GSBDocEnd
*/"use strict";
gsb.makeGSBModule('gsb.banner', {
  init: function () {
    const base = this;

    base.options.trackingModules = $.extend(true, {
      matomo: {
        consent: base.callConsentCallbacks,
        reject: base.callRejectCallbacks
      }
    }, base.options.trackingModules);

    if (base.options.trackingEnabled && !base.shouldCreateBanner()) {
      base.callRejectCallbacks();
      base.$el.remove();
      return;
    }

    if (base.options.trackingEnabled && Cookies.get(base.options.trackingCookieName)) {
      base.callConsentCallbacks();
    }

    base.setup();

    base.$el.gsb_responsiveListener(base);
  },
  shouldCreateBanner: function () {
    const base = this,
      cookiesEnabled = base.areCookiesEnabled(),
      doNotTrack = base.options.respectDoNotTrack && navigator.doNotTrack === "1";
    return cookiesEnabled && !doNotTrack;
  },
  areCookiesEnabled: function () {
    // TODO: Deliberate whether Modernizr should be used
    /*! adapted from https://github.com/Modernizr/Modernizr/blob/master/feature-detects/cookies.js,
     * Modernizr 3.11.0 | Copyright © 2021 The Modernizr Team | License MIT
     */
    var enabled = false;
    try {
      // create cookie
      document.cookie = 'cookietest=1';
      enabled = document.cookie.indexOf('cookietest=') !== -1;
      // remove cookie
      document.cookie = 'cookietest=1; expires=Thu, 01-Jan-1970 00:00:01 GMT';
      return enabled;
    }
    catch (e) {
      return false;
    }
  },
  callRejectCallbacks: function () {
    const base = this;
    if (typeof matomoRejectFunction !== "undefined") {
      matomoRejectFunction(base);
    }
  },
  callConsentCallbacks: function () {
    const base = this;
    if (typeof matomoConsentFunction !== "undefined") {
      matomoConsentFunction(base);
    }
  },
  onResize: function (ev) {
    const base = ev.data;
  },
  setupLightbox: function () {
    throw new Error(
      "setupLightbox() ist obsolet." +
      " Wenn keine Lightbox gewünscht ist, kann die Option 'makeRestricting' auf false gesetzt werden." +
      " onRefresh() in Breakpoints zu überschreiben ist nicht empfohlen."
    );
  },
  setup: function () {
    const base = this,
      configUrl = base.$el.attr('data-gsb-tracking-config') || base.options.trackingConfigUrl;

    if (typeof configUrl !== "string") {
      base.initialize();
    } else {
      $.ajax({
        url: configUrl,
        complete: base.mergeConfigAndInitialize,
        context: base
      });
    }
  },
  initialize: function () {
    const base = this;
    if (!base.options.trackingEnabled) {
      base.$el.find(base.options.closeButton).first().
      off('click.' + base.eventName).
      on('click.' + base.eventName, base, base.applyChoice);
    } else {
      const structure = $(base.options.trackingMarkup.structure),
        container = structure.find(base.options.trackingSelectors.container),
        trackingList = base.options.trackingList || [],
        trackingModules = base.options.trackingModules || {};

      base.$el.contents().remove();

      container.append(base.buildModules(trackingList));
      container.append(base.buildButtons(trackingModules.buttons));

      base.$el.append(structure);

      if (base.options.restrictAccess) {
        base.makeRestricting();
      }

      base.$el.
      on('rejectAll.' + base.eventName, base, base.unsetAllManagedCookies).
      on('rejectAll.' + base.eventName, base, base.uncheckAll);
      $(document).on('cookieUpdate.gsb', base, base.onCookieUpdate);
      $(window).on("resize", base, base.onResize);
    }
  },
  mergeConfigAndInitialize: function (jqXHR) {
    const base = this,
      data = jqXHR.responseJSON;
    if (data) {
      $.extend(true, base.options.trackingMarkup, data.trackingMarkup);
      $.extend(true, base.options.trackingSelectors, data.trackingSelectors);
      $.extend(true, base.options.trackingModules, data.trackingModules);
      base.options.trackingList = data.trackingList || base.options.trackingList;
    }
    base.initialize();
  },
  makeRestricting: function () {
    const base = this;

    base.$el.
    css("height", "auto").
    addClass(base.options.trackingClasses.restrictive);

    base.$el.gsb_lightbox({
      selectors: {
        toggleHidden: base.options.pageElementsToHide
      },
      opener: $(),
      magnificOptions: {
        items: {
          src: base.$el,
          type: "inline"
        },
        closeOnBgClick: false,
        enableEscapeKey: false,
        showCloseBtn: false,
        callbacks: {
          open: function () {
            $('body').
            addClass(base.options.bodyVisibleClass).
            removeClass(base.options.bodyHiddenClass);
          },
          close: function () {
            $('body').
            addClass(base.options.bodyHiddenClass).
            removeClass(base.options.bodyVisibleClass);
          }
        } }
    }).off('click.magnificPopup'); // like lightbox in gallery mode, remove handler that cancels all click events

    if (!base.options.lightboxHidden && (!base.options.cookieName || !Cookies.get(base.options.cookieName))) {
      base.$el.magnificPopup('open');
    }
  },
  onCookieUpdate: function (ev) {
    const base = ev.data,
      detail = ev.detail,
      cookieName = detail && detail.cookieName,
      isNotRemoval = Boolean(detail && detail.removed),
      isNotSelfReport = Boolean(detail) && detail.moduleName !== base.moduleName,
      trackingModules = base.options.trackingModules || {},
      moduleList = Object.keys(trackingModules);
    if (isNotSelfReport && typeof cookieName === "string") {
      moduleList.forEach(function (id) {
        const module = trackingModules[id],
          binaryCookie = module.binaryCookie;
        let input;
        if (cookieName === binaryCookie) {
          input = base.$el.find(base.options.trackingSelectors.controlElement).filter(`input[name=${id}]`);
          if (isNotRemoval === input.prop('checked')) {
            input.trigger('click');
          }
        }
      });
    }
  },
  buildModules: function (moduleList) {
    const base = this,
      sections = [],
      trackingModules = base.options.trackingModules || {};

    moduleList.forEach(function (item) {
      let id = item.id,
        module = trackingModules[id],
        section = base.createSection(id);
      if (module && id !== "buttons") {
        module.id = id;
        module.subModules = item.subModules;
        sections.push(section[0]);
        if (module.build) {
          module.build.call(base, module, section);
        } else if (module.type === 'html' && module.markup) {
          base.insertMarkup(module, section);
        } else if (module.type === 'structured') {
          base.buildStructured(module, section);
        } else {
          sections.pop();
        }
      }
    });

    return $(sections);
  },
  createSection: function (id) {
    const base = this;
    return $('<div/>').
    addClass(base.options.trackingClasses.section).
    attr('data-gsb-tracking-section', id);
  },
  insertMarkup: function (module, section) {
    const base = this;
    return $(module.markup).appendTo(section);
  },
  buildButtons: function (module, section) {
    const base = this,
      buttonContent = $(base.options.trackingMarkup.buttons),
      confirmSelection = buttonContent.find(base.options.trackingSelectors.confirmSelection),
      consentToAll = buttonContent.find(base.options.trackingSelectors.consentToAll),
      rejectAll = buttonContent.find(base.options.trackingSelectors.rejectAll);
    confirmSelection.
    on('click', base, base.applyChoice).
    on('click', base, base.confirmModules);
    consentToAll.
    on('click', base, base.applyChoice).
    on('click', base, base.checkAll).
    on('click', base, base.setAllManagedCookies);
    rejectAll.
    on('click', base, base.applyChoice).
    on('click', base, base.uncheckAll).
    on('click', base, base.unsetAllManagedCookies);

    return base.createSection('buttons').append(buttonContent);
  },
  checkAll: function (ev) {
    const base = ev ? ev.data : this;

    base.$el.find(base.options.trackingSelectors.controlElement).
    attr("checked", true).
    prop("checked", true).
    trigger('change');
  },
  uncheckAll: function (ev) {
    const base = ev ? ev.data : this;

    base.$el.find(base.options.trackingSelectors.controlElement).
    filter((i, el) => !el.disabled).
    attr("checked", null).
    prop("checked", false).
    trigger('change');
  },
  getTrackingListFlat: function () {
    const base = this,
      trackingList = base.options.trackingList || [];

    return trackingList.reduce(function (list, item) {
      if (!item || !item.subModules || !item.subModules.length) {
        return list.concat(item);
      } else {
        return list.concat(item.subModules);
      }
    }, []);
  },
  confirmModules: function (ev) {
    const base = ev.data,
      trackingModules = base.options.trackingModules || {};

    base.getTrackingListFlat().forEach(function (item) {
      let id = item.id,
        module = trackingModules[id],
        //input = base.$el.find(`input[name=${id}]`),
        input = base.$el.find(base.options.trackingSelectors.controlElement).filter(`input[name=${id}]`),
        moduleConsent = input.length && input.prop('checked'),
        moduleReject = input.length && !input.prop('checked'),
        binaryCookie = module && module.binaryCookie;
      if (module) {
        if (module.required || moduleConsent) {
          if (typeof binaryCookie === "string") {
            if (typeof module.consent !== "function" || module.consent.call(base, module) !== false) {
              base.setBinaryCookie(binaryCookie, module);
            }
          }
        } else if (moduleReject) {
          if (typeof binaryCookie === "string") {
            if (typeof module.reject !== "function" || module.reject.call(base, module) !== false) {
              base.unsetBinaryCookie(binaryCookie, module);
            }
          }
        }
      }
    });
  },
  setAllManagedCookies: function (ev) {
    const base = ev ? ev.data : this,
      trackingModules = base.options.trackingModules || {};

    base.getTrackingListFlat().forEach(function (item) {
      let id = item.id,
        module = trackingModules[id];
      if (module && typeof module.binaryCookie === "string") {
        if (typeof module.consent !== "function" || module.consent.call(base, module) !== false) {
          base.setBinaryCookie(module.binaryCookie, module);
        }
      }
    });
  },
  unsetAllManagedCookies: function (ev) {
    const base = ev ? ev.data : this,
      trackingModules = base.options.trackingModules || {};

    base.getTrackingListFlat().forEach(function (item) {
      let id = item.id,
        module = trackingModules[id];
      if (module && typeof module.binaryCookie === "string") {
        if (typeof module.reject !== "function" || module.reject.call(base, module) !== false) {
          base.unsetBinaryCookie(module.binaryCookie, module);
        }
      }
    });
  },
  setBinaryCookie: function (binaryCookieName, module) {
    const base = this,
      cookieValue = String(true),
      cookieLifeTimeInDays = module && module.cookieLifeTimeInDays || base.options.trackingCookieLifeTimeInDays;
    try {
      Cookies.set(binaryCookieName, cookieValue, {
        expires: cookieLifeTimeInDays,
        path: '/'
      });
      $(document).trigger($.Event('cookieUpdate.gsb', {
        detail: {
          cookieName: binaryCookieName,
          moduleName: base.moduleName,
          value: cookieValue,
          removed: false
        }
      }));
    } catch (e) {
      console.error("Fehler beim Setzen eines Cookies", e);
    }
  },
  unsetBinaryCookie: function (binaryCookieName, module) {
    const base = this;
    try {
      Cookies.remove(binaryCookieName);
      $(document).trigger($.Event('cookieUpdate.gsb', {
        detail: {
          cookieName: binaryCookieName,
          moduleName: base.moduleName,
          value: null,
          removed: true
        }
      }));
    } catch (e) {
      console.error("Fehler beim Löschen eines Cookies", e);
    }
  },
  buildStructured: function (module, section) {
    const base = this,
      hasSubModules = module.subModules && module.subModules.length,
      structure = module.structure,
      title = $(structure.title),
      headingId = title.attr('id') || base.generateID(),
      details = $(structure.details),
      detailsContainer = $('<div/>'),
      detailsId = base.generateID(),
      accordionContainer = $('<div/>');
    let container = $(structure.container).appendTo(section);

    if (!container.length) {
      container = section;
    }

    title.
    addClass(base.options.trackingClasses.sectionTitle).
    attr({
      id: headingId
    });
    if (title.length === 1 && (details.length > 0 || hasSubModules)) {
      detailsContainer.attr('id', detailsId);
      accordionContainer.append(title);
      detailsContainer.append(details);
      if (hasSubModules) {
        detailsContainer.append(base.buildModules(module.subModules));
      }
      accordionContainer.append(detailsContainer);
      container.append(accordionContainer);

      if (module.alwaysShowDetails === false) {
        accordionContainer.gsb_toggle({
          heading: `#${headingId}`, //workaround(gsb_toggle) - jQuery's on() method accepts only strings as delegate targets
          elements: detailsContainer
        });
      }
    } else {
      container.append(title);
      container.append(details);
    }

    if (!hasSubModules) {
      const labelMode = typeof module.labelMode === "string" ? module.labelMode : base.options.moduleLabelMode;
      const labelId = labelMode.includes("title") ? headingId : null;
      container.append(base.createSectionToggle(module, labelId, details.length ? detailsId : null));
    }
  },
  createSectionToggle: function (module, labelId, detailsId) {
    const base = this,
      moduleId = module.id,
      controlId = base.generateID(),
      control = $('<input/>'),
      labelMode = typeof module.labelMode === "string" ? module.labelMode : base.options.moduleLabelMode,
      label = labelMode.includes("labels") ? $('<label/>').addClass(base.options.trackingClasses.controlLabel) : $(),
      controlContainer = $("<div/>"),
      required = Boolean(module.required),
      alreadyActive = module.binaryCookie ? Cookies.get(module.binaryCookie) : false,
      shouldCheck = required || alreadyActive,
      textModuleOff = module.labels && module.labels.moduleOff ? module.labels.moduleOff : base.options.labels.moduleOff,
      textModuleOn = module.labels && module.labels.moduleOn ? module.labels.moduleOn : base.options.labels.moduleOn;
    control.
    addClass(base.options.trackingClasses.controlElement).
    attr({
      id: controlId,
      name: moduleId,
      type: 'checkbox',
      checked: shouldCheck ? 'checked' : null,
      disabled: required ? 'disabled' : null,
      'aria-describedby': detailsId,
      'aria-labelledby': labelId
    }).
    prop('checked', shouldCheck).
    on('change', function (ev) {
      label.text(control.prop('checked') ? textModuleOn : textModuleOff);
    }).
    trigger('change');
    label.
    attr('for', controlId);
    return controlContainer.append(control).append(label);
  },
  show: function () {
    const base = this,
      animationSpeed = base.options.animationSpeed;

    if (base.options.positionRelative) {
      base.showPositionRelative();
    } else if (base.options.animation) {
      if (base.options.position === 'top') {
        base.$el.animate({ top: 0 }, animationSpeed);
      } else {
        base.$el.animate({ bottom: 0 }, animationSpeed);
      }
    } else {
      base.$el.css(base.options.position, 0);
    }
    base.$el.promise().done(function () {
      $('body').
      addClass(base.options.bodyVisibleClass).
      removeClass(base.options.bodyHiddenClass);
    });
  },
  showPositionRelative: function () {
    const base = this;
    if (base.options.position === 'top') {
      base.$el.addClass(base.options.positionRelativeClass);
      var $navSkipList = $(base.options.navSkipListSelector);
      if ($navSkipList.length > 0) {
        $navSkipList.after(base.$el);
      } else {
        console.warn('Das Cookiebanner wird vor dem <header>-Element eingebunden, weil \'' + base.options.navSkipListSelector + '\' nicht gefunden werden konnte.');
        $('header').before(base.$el);
      }
    } else {
      $(base.options.newBannerParentSelector).after(base.$el);
      $('.' + base.options.positionRelativePlaceholderClass).remove();
      $(base.options.newBannerParentSelector).after($('<div>').addClass(base.options.positionRelativePlaceholderClass).css('height', base.bannerHeight));
    }
    if (base.options.animation) {
      base.$el.
      finish().
      css({
        paddingTop: 0,
        paddingBottom: 0,
        height: 0
      }).
      animate({
        height: base.bannerHeight - base.options.topOffset,
        paddingTop: base.bannerPadding.top,
        paddingBottom: base.bannerPadding.bottom
      }, {
        duration: base.options.animationSpeed,
        complete: function () {
          base.$el.css('height', '');
        }
      });
    }
  },
  hide: function (ignoreAnimation) {
    const base = this;

    if (base.bannerHeight && base.options.animation && !ignoreAnimation) {
      if (base.options.position === 'top') {
        if (base.options.positionRelative) {
          base.$el.animate({ height: 0, paddingTop: 0, paddingBottom: 0 }, base.options.animationSpeed, function () {
            base.$el.css('display', 'none');
          });
        } else {
          base.$el.animate({ top: -base.bannerHeight }, base.options.animationSpeed, function () {
            base.$el.css('display', 'none');
          });
        }
      } else {
        base.$el.animate({ bottom: -base.bannerHeight }, base.options.animationSpeed, function () {
          base.$el.css('display', 'none');
          $('.' + base.options.positionRelativePlaceholderClass).remove();
        });
      }
    } else {
      base.$el.css('display', 'none');
    }
    base.$el.promise().done(function () {
      $('body').
      addClass(base.options.bodyHiddenClass).
      removeClass(base.options.bodyVisibleClass);
    });
  },
  createBanner: function () {
    throw new Error(
      "createBanner() ist obsolet." +
      " onRefresh() in Breakpoints zu überschreiben ist nicht empfohlen."
    );
  },
  applyChoice: function (ev) {
    const base = ev.data;
    ev.preventDefault();
    ev.stopPropagation();

    if (base.options.restrictAccess) {
      $.magnificPopup.close();
    } else {
      // hide banner with or without animation
      base.hide();
    }
    base.setCookieClosed();
  },
  handleAnimation: function (triggeredByResponsiveListener) {
    const base = this;

    if (!base.options.restrictAccess) {
      base.prepareState(triggeredByResponsiveListener);
      // hide banner
      base.$el.css(base.options.position, base.options.positionRelative ? 0 : -base.bannerHeight);
      // if no cookie
      if (!base.options.cookieName) {
        base.show();
      } else if (!Cookies.get(base.options.cookieName)) {
        // display banner with or without animation
        base.show();
      } else {
        // hide banner without animation
        base.hide(true);
      }
    }
  },
  setCookieClosed: function () {
    const base = this,
      cookieName = base.options.cookieName;
    if (typeof cookieName === "string") {
      // set cookie with expiredate
      Cookies.set(cookieName, 'closed', {
        expires: base.options.bannerCookieLifeTimeInDays,
        path: '/'
      });
    } else {
      console.error(`${base.moduleName}: cookieName is not a string. Banner will be shown on reload. This is only acceptable for debugging purposes.`);
    }
  },
  prepareState: function prepareState(reset) {
    const base = this;
    if (reset) {
      base.$el.css({
        paddingTop: '',
        paddingBottom: '',
        height: ''
      });
    }
    base.bannerHeight = !reset && base.bannerHeight && base.options.position === 'top' ? base.bannerHeight : base.$el.outerHeight() + base.options.topOffset;
    base.bannerPadding = !reset && base.bannerPadding ? base.bannerPadding : {
      top: base.$el.css('padding-top'),
      bottom: base.$el.css('padding-bottom')
    };
  },
  defaultOptions: {
    animation: false,
    animationSpeed: 1800,
    position: 'bottom',
    topOffset: 20,
    closeButton: '.close',
    bodyVisibleClass: 'banner-visible',
    bodyHiddenClass: 'banner-hidden',
    newBannerParentSelector: "footer",
    positionRelativeClass: 'cookiebanner__relative',
    positionRelativePlaceholderClass: 'cookiebanner__placeholder',
    cookieName: 'gsbbanner',
    trackingCookieName: 'matomoTracking',
    bannerCookieLifeTimeInDays: 30,
    respondToEvents: true,
    positionRelative: true, // make room for the cookiebanner in the dom to not overlay content
    navSkipListSelector: 'ul.navSkip', // used if positionRelative is true
    trackingEnabled: false, // if false, restrictAccess will not be applied
    matomoButtonAddClassParent: 'button-row',
    matomoButtonRemoveClassParent: 'all',
    restrictAccess: false, // start banner in a lightbox, disable all other elements
    lightboxHidden: false,
    pageElementsToHide: '.wrapperInner, .previewhint, .c-preview-hint',
    trackingCookieLifeTimeInDays: 30,
    respectDoNotTrack: false,
    moduleLabelMode: 'labels',
    labels: {
      consent: typeof TRACKING_CONSENT !== "undefined" ? TRACKING_CONSENT : 'Consent',
      reject: typeof TRACKING_DISSENT !== "undefined" ? TRACKING_DISSENT : 'Reject',
      confirmSelection: typeof TRACKING_CONFIRM !== "undefined" ? TRACKING_CONFIRM : 'Auswahl bestätigen',
      moduleOn: typeof TRACKING_MODULE_ON !== "undefined" ? TRACKING_MODULE_ON : 'ausschalten',
      moduleOff: typeof TRACKING_MODULE_OFF !== "undefined" ? TRACKING_MODULE_OFF : 'einschalten'
    },
    onRefresh: function onRefresh() {
      this.handleAnimation(true);
    },
    trackingConfigUrl: null,
    trackingMarkup: {
      structure: '' +
      `<div class="cookiebannerbox">
          <div class="row">
            <div class="column small-12 js-banner__container"></div>
          </div>
        </div>`,
      buttons: '' +
      `<div class="shrink text-right">
          <p class="button-row">
            <button type="button" class="c-button close confirmSelection js-banner-button-confirm-selection">Auswahl bestätigen</button><button type="button" class="c-button close rejectAll js-banner-button-reject-all">Ohne Einwilligung weiter</button><button type="button" class="c-button close consentToAll js-banner-button-consent-to-all">Alle auswählen</button>
          </p>
        </div>`
    },
    trackingSelectors: {
      confirmSelection: '.js-banner-button-confirm-selection',
      consentToAll: '.js-banner-button-consent-to-all',
      container: '.js-banner__container',
      controlElement: '.js-banner-control__element',
      rejectAll: '.js-banner-button-reject-all'
    },
    trackingClasses: {
      controlElement: 'cookiebanner-control__element js-banner-control__element',
      controlLabel: 'cookiebanner-control__label',
      restrictive: 'cookiebanner__restrictive',
      section: 'cookiebanner-section',
      sectionTitle: 'cookiebanner-section__title'
    },
    trackingList: [{
      id: 'preamble'
    }, {
      id: 'necessary'
    }, {
      id: 'matomo'
    }],
    trackingModules: {
      preamble: {
        type: 'html',
        markup: '' +
        `<h1>Hinweis zur Verwendung von Cookies</h1>
           <p>Cookies erleichtern die Bereitstellung unserer Dienste. Mit der Nutzung unserer Dienste erklären Sie sich damit einverstanden,
              dass wir Cookies verwenden. Weitere Informationen zum Datenschutz erhalten Sie über den folgenden Link:
              <a class="RichTextIntLink NavNode" href="/datenschutz" title="Datenschutz">Datenschutz</a>
           </p>`
      },
      necessary: {
        type: 'structured',
        required: true,
        alwaysShowDetails: true,
        structure: {
          title: `<h2>Notwendige Cookies</h2>`,
          details: `<p>Lorem Ipsum dolor sit amet</p>`
        },
        labels: {
          moduleOff: 'kann nicht deaktiviert werden',
          moduleOn: 'immer aktiv'
        }
      },
      matomo: {
        type: 'structured',
        binaryCookie: 'matomoTracking',
        alwaysShowDetails: true,
        structure: {
          title: `<h2>${typeof TRACKING_OPTIONAL !== "undefined" ? TRACKING_OPTIONAL : 'Statistik'}</h2>`,
          details: `<p>${typeof TRACKING_HINT !== "undefined" ? TRACKING_HINT : 'Lorem ipsum Lorem ipsum <a href="#">dolor</a> Lorem ipsum Lorem ipsum Lorem ipsum'}</p>`
        },
        labels: {
          moduleOff: 'Statistik-Tracker einschalten',
          moduleOn: 'Statistik-Tracker ausschalten'
        }
      }
    }
  }
});

    

   /* Ende gsb_banner */
   /* Start gsb_bitv_checker_menu */
   
    

    

    /* --GSBDocStart
 * @name: @gsb/gsb_bitv_checker_menu
 * @version: 3.0.1
 * @description: Bitv-Checker-Menü: GUI zur Bedienung des Bitv-Checkers.
 * --GSBDocEnd
*/"use strict";
gsb.makeGSBModule("gsb.bitv_checker_menu", {
  init: function () {
    let base = this,
      persistedString;

    //consider deleting this after initial testing
    gsb.log("gsb_bitv_checker_menu::init");

    base.body = $(document.body);

    persistedString = localStorage.getItem('bitv-checker');
    base.persisted = persistedString ? JSON.parse(persistedString) : { activeCategories: {} };

    Object.keys(base.persisted.activeCategories).forEach(base.applyPersisted, base);

    base.$el.find(base.options.selectors.opener).on('click', base, base.onClickOpener);
    base.$el.find(base.options.selectors.categoryToggler).on('click', base, base.onClickCategoryToggler);

    if (base.$el.gsb_responsiveListener) {
      base.$el.gsb_responsiveListener(base);
    }
  },
  applyPersisted: function (key) {
    let base = this;
    base.$el.find('[data-bitvclass=' + key + ']').prop('checked', true);
    base.body.
    addClass(base.options.classes.bitvWatch).
    addClass(key);
  },
  onClickOpener: function () {

    //do nothing, for now
  }, onClickCategoryToggler: function (ev) {let base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ev.data;
    var active = $(this).is(':checked'),
      bitvClass = $(this).attr('data-bitvclass');
    if (active) {
      base.body.addClass(bitvClass);
      base.body.addClass(base.options.classes.bitvWatch);
      base.persist(bitvClass, true);
    } else {
      base.body.removeClass(bitvClass);
      if (base.$el.find('[data-bitvclass]:checked').length === 0) {
        base.body.removeClass(base.options.classes.bitvWatch);
      }
      base.persist(bitvClass, false);
    }
    base.body.trigger('gsb-bitvcheck');
  },
  persist: function (bitvClass, isAdd) {let base = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this;
    if (isAdd === true) {
      base.persisted.activeCategories[bitvClass] = true;
    } else if (isAdd === false) {
      delete base.persisted.activeCategories[bitvClass];
    }
    localStorage.setItem('bitv-checker', JSON.stringify(base.persisted));
  },
  defaultOptions: {
    //responsiveListener options
    respondToEvents: true,
    onRefresh: function () {
    },
    responsive: [{
      breakpoint: 480,
      onRefresh: function () {

        //do nothing
      } }],
    selectors: {
      opener: '.js-bitv-checker-menu-opener',
      categoryToggler: '.js-bitv-checker-control'
    },
    classes: {
      bitvWatch: 'bitv-watch'
    }
  }
});

    

   /* Ende gsb_bitv_checker_menu */
   /* Start gsb_fancy_selects */
   
    

    

    /* --GSBDocStart
 * @name: @gsb/gsb_fancy_selects
 * @version: 4.1.3
 * @description: Erzeugt für jedes enthaltene `<select>` ein Widget, welches dieses `<select>` steuert.
 * --GSBDocEnd
*/"use strict";
gsb.makeGSBModule("gsb.fancy_selects", {
  init: function () {
    if (this.arePreconditionsMet()) {
      this.transformSelects();
      this.bindSelectEvents();
      this.bindListEvents();
      this.makeFancy();
      this.makeAccessible();
    }
  },
  arePreconditionsMet() {
    var base = this;
    var conditionsMet = true;
    var multiselectElements = [];
    var optgroupElements = [];
    var messageText;

    base.$el.find(this.options.selectors.select).each(function (i, select) {
      var $select = $(select);
      if ($select.is('[multiple], [aria-multiselectable]') || $select.attr('size') > 1) {
        multiselectElements.push(select);
      }
      if ($select.find('optgroup').length) {
        optgroupElements.push(select);
      }
    });

    if (multiselectElements.length) {
      conditionsMet = false;
      messageText = `${base.moduleName}: Mindestens ein verarbeitetes <select> sieht eine Mehrfachauswahl vor. `;
      messageText += "Diese Eigenschaft wird nicht unterstützt. Die Initialisierung des Moduls wird abgebrochen. ";
      messageText += "Um diesen Fehler zu beheben, muss entweder die Option selectors.select angepasst werden oder ";
      messageText += "die Attribute 'multiple', 'size' und 'aria-multiselectable' von den <select>s entfernt werden.";
      console.error(messageText, multiselectElements);
    }

    if (optgroupElements.length) {
      conditionsMet = false;
      messageText = `${base.moduleName}: Mindestens ein verarbeitetes <select> enthält ein <optgroup> Element. `;
      messageText += "Dieses Element wird nicht unterstützt. Die Initialisierung des Moduls wird abgebrochen. ";
      messageText += "Um diesen Fehler zu beheben, muss entweder die Option selectors.select angepasst werden oder ";
      messageText += "die <optgroup> Elemente entfernt werden.";
      console.error(messageText, optgroupElements);
    }

    return conditionsMet;
  },
  makeAccessible: function () {
    var base = this;
    base.uis.forEach(function (ui) {
      var listId = base.generateID(),
        activeDescendant = ui.opts.filter('[aria-selected=true]');

      ui.opts.each(function () {
        $(this).attr('id', base.generateID());
      });
      ui.errMsg.each(function () {
        $(this).attr('id', $(this).attr('id') || base.generateID());
      });
      $(ui.select.prop('labels')).each(function () {
        $(this).attr('id', $(this).attr('id') || base.generateID());
      });

      if (ui.select.attr('aria-label')) {
        base.addLabelTo(ui.select, ui.select.attr('aria-label'));
        ui.select.attr('aria-label', null);
      }

      ui.list.attr({
        role: "listbox",
        id: listId,
        'aria-labelledby': base.getLabelIDs(ui, null) || null,
        'aria-describedby': base.getDescriptionIDs(ui) || null
      });
      ui.heading.attr({
        role: 'combobox',
        'aria-owns': listId,
        'aria-controls': listId,
        'aria-labelledby': base.getLabelIDs(ui, null) || null,
        'aria-describedby': base.getDescriptionIDs(ui) || null,
        'aria-haspopup': 'listbox',
        'aria-activedescendant': activeDescendant.attr('id') || '',
        'aria-required': typeof ui.select.attr('required') !== "undefined" || Boolean(ui.select.attr('aria-required')),
        'aria-expanded': 'false',
        'title': ui.select.attr('title') || null
      });
    });
    base.$el.trigger('initialized.' + base.eventName);
  },
  addLabelTo: function (controlElem, labelText) {
    var base = this,
      id = base.generateID(),
      labelledby = controlElem.attr('aria-labelledby'),
      ariaLabels = !labelledby ? [] : labelledby.trim().split(/\s+/),
      newlyCreatedLabel;

    newlyCreatedLabel = $("<span/>").
    attr({
      id: id,
      hidden: 'hidden'
    }).
    text(labelText);
    ariaLabels.push(id);

    controlElem.
    attr('aria-labelledby', ariaLabels.join(' ')).
    before(newlyCreatedLabel);
  },
  getLabelIDs: function (ui, activeDescendant) {
    var base = this,
      ids = {},
      labels = $(ui.select.prop('labels')),
      ariaLabels = ui.select.attr('aria-labelledby') || '';
    [].forEach.call(labels.add(activeDescendant), function (label) {
      var labelId = $(label).attr('id');
      if (labelId) {
        ids[labelId.trim()] = true;
      }
    });
    ariaLabels.split('\s+').forEach(function (id) {
      if (id) {
        ids[id] = true;
      }
    });
    return Object.keys(ids).join(' ');
  },
  getDescriptionIDs: function (ui) {
    var base = this,
      ids = {},
      ariaDescriptions = ui.select.attr('aria-describedby') || '';
    ariaDescriptions.split(/\s+/g).forEach(function (id) {
      if (id) {
        ids[id] = true;
      }
    });
    ui.errMsg.filter(':visible').map(function (i, msg) {
      var id = $(msg).attr('id') || base.generateID();
      ids[id] = true;
    });
    return Object.keys(ids).join(' ');
  },
  transformSelects: function () {
    var base = this;
    base.selects = base.$el.find('select');
    base.uis = $.map(base.selects, function (sel) {
      var select = $(sel),
        labels = $(sel.labels),
        originalSelectId = select.attr('id'),
        newSelectId = 'replacedSelect_' + originalSelectId,
        wrapper,heading,list,ui,
        i,count;
      select.
      attr('id', newSelectId).
      addClass(base.options.classes.replacedSelect);
      wrapper = $(base.options.selectors.wrapper, base.el).insertAfter(select);
      list = wrapper.find(base.options.selectors.list);
      count = select.find('option').length;
      for (i = 0; i < count; i++) {
        list.append(base.options.markup.listItem);
      }

      heading = wrapper.find(base.options.selectors.heading);
      ui = {
        select: select,
        wrapper: wrapper,
        heading: heading.attr('id', originalSelectId),
        list: list,
        opts: list.find('li'),
        errMsg: select.siblings(base.options.selectors.errorMessage)
      };
      labels.each(function (i, label) {
        $(label).attr('for', newSelectId);
      });

      base.transformOptions(ui);
      base.updateValidityStatus(ui);
      return ui;
    });
  },
  transformOptions: function (ui) {
    var base = this,
      select = ui.select,
      options = select.find('option'),
      selectedIndex = select.prop('selectedIndex'),
      selectedOption = options.eq(selectedIndex > -1 ? selectedIndex : NaN),
      heading = ui.heading,
      list = ui.list;
    heading.text(selectedOption.text());
    options.each(function (i) {
      var opt = $(this),
        isSelected = opt.is(selectedOption);
      ui.opts.eq(i).
      attr('role', "option").
      attr('aria-disabled', opt.attr('disabled') ? "true" : "false").
      attr('aria-selected', isSelected ? "true" : "false").
      attr('data-value', opt.val()).
      text(opt.text());
    });
  },
  bindListEvents: function () {
    var base = this;
    base.uis.forEach(function (ui) {
      ui.wrapper.
      on('keydown', { base: base, ui: ui }, base.arrowNavigation).
      on('keydown', { base: base, ui: ui }, base.closeOnEscape);
      ui.list.
      on('mousedown', base.preventFocusOut).
      on('mouseup', { base: base, ui: ui }, base.directSelect);
    });
  },
  closeOnEscape: function (ev) {
    if (ev.key === "Escape" || ev.key === "Esc") {
      ev.preventDefault();
      $(this).trigger('close.simple_toggle');
    }
  },
  arrowNavigation: function (ev) {
    var base = ev.data && ev.data.base,
      ui = ev.data && ev.data.ui,
      activeOption = ui.opts.filter('[aria-selected=true]'),
      activeIndex = ui.opts.index(activeOption),
      option;
    switch (ev.key) {
      case "Down":
      case "ArrowDown":
        ui.wrapper.trigger('open.simple_toggle');
        option = base.findOption(ui, activeIndex, 'next');
        break;
      case "Up":
      case "ArrowUp":
        ui.wrapper.trigger('open.simple_toggle');
        option = base.findOption(ui, activeIndex, 'prev');
        break;
      default:
        return;
    }
    if (option && option.length && !option.is(activeOption)) {
      base.selectOption(ui, option);
    }
    ev.preventDefault();
    ev.stopPropagation();
  },
  findOption: function (ui, activeIndex, criterion) {
    var base = this,
      opts = ui.opts,
      opt,
      i,l;
    if (!opts.not('[aria-disabled=true]').length) {
      return $();
    }
    for (i = 1, l = opts.length; i <= l; i++) {
      if (criterion === 'next') {
        opt = opts.eq((activeIndex + i) % l);
      } else if (criterion === 'prev') {
        opt = opts.eq(activeIndex - i);
      }
      if (opt.not('[aria-disabled=true]').length) {
        return opt;
      }
    }
    return $();
  },
  selectOption: function (ui, opt) {
    var base = this,
      option = $(opt),
      optionId = option.attr('id');
    ui.select.
    val(option.attr('data-value')).
    trigger('change');
    base.transformOptions(ui);
    base.scrollBoxTo(ui, option);
    ui.heading.
    attr('aria-activedescendant', optionId).
    focus();
  },
  scrollBoxTo: function (ui, option) {
    const base = this;
    if (ui.list.length && option.length) {
      base.scrollIntoViewOneLevel(ui.list[0], option[0]);
    }
  },
  scrollIntoViewOneLevel: function (scrollContainer, scrollChild) {
    const containerRect = scrollContainer.getBoundingClientRect();
    const childRect = scrollChild.getBoundingClientRect();

    const bottomDiff = childRect.bottom - containerRect.bottom;
    const topDiff = containerRect.top - childRect.top;

    if (bottomDiff > 0) {// child is hidden below container
      scrollContainer.scrollBy(0, bottomDiff);
    }
    if (topDiff > 0) {// child is hidden above container
      scrollContainer.scrollBy(0, -topDiff);
    }
  },
  directSelect: function (ev) {
    var base = ev.data.base,
      ui = ev.data.ui,
      opt = $(ev.target);
    if (opt.is(':not([aria-disabled=true])')) {
      base.selectOption(ui, opt);
    }
  },
  makeFancy: function () {
    var base = this;

    base.uis.forEach(function (ui) {
      ui.wrapper.
      gsb_simple_toggle({
        closer: '',
        opener: ui.heading,
        item: ui.list,
        showClass: 'is-expanded',
        hideClass: 'is-collapsed'
      }).
      on('focusout', base.onFocusOut)
      //as the "parent" widget, we don't want any of these to bubble
      .on('close.simple_toggle.gsb open.simple_toggle.gsb toggle.simple_toggle.gsb', base, base.preventBubbling);
      ui.opts.
      on('mouseup', base.triggerCloseOpt);
      ui.heading.addClass(base.options.classes.isFancy);
    });
  },
  onFocusOut: function (ev) {
    var wrapper = $(this),
      rel = ev.relatedTarget;
    if (!rel || !wrapper.find(rel).length) {
      wrapper.trigger('close.simple_toggle');
    }
  },
  preventBubbling: function (ev) {
    ev.stopPropagation();
  },
  preventFocusOut: function (ev) {
    ev.preventDefault();
  },
  triggerCloseOpt: function (ev) {
    var opt = $(this);
    if (opt.is(':not([aria-disabled=true])')) {
      opt.trigger('close.simple_toggle');
    }
  },
  bindSelectEvents: function () {
    var base = this;
    base.uis.forEach(function (ui) {
      ui.select.on('invalid change', { base: base, ui: ui }, base.validate);
    });
  },
  validate: function (ev) {
    var base = ev.data.base,
      ui = ev.data.ui,
      select = ui.select[0];
    base.updateValidityStatus(ui);
    if (!select.validity.valid) {
      setTimeout(function () {
        var activeElement = $(document.activeElement),
          isActiveElementAfterSelect = select.compareDocumentPosition(activeElement[0]) === Node.DOCUMENT_POSITION_FOLLOWING,
          isActiveElementFancy = activeElement.hasClass(base.options.classes.isFancy),
          isActiveElementSubmit = activeElement.is('[type=submit]');
        if (isActiveElementSubmit || !isActiveElementFancy && isActiveElementAfterSelect) {
          ui.heading.focus();
        }
      }, 0);
    }
  },
  updateValidityStatus: function (ui) {
    var base = this,
      select = ui.select[0],
      errMsgs = ui.select.siblings(base.options.selectors.errorMessage),
      hasStickyErrorMessage;
    if (select.validity.valid) {
      hasStickyErrorMessage = Boolean(errMsgs.filter(base.options.selectors.stickyErrorMessage).length);
      ui.heading.attr('aria-invalid', hasStickyErrorMessage ? null : false);
      errMsgs.not(base.options.selectors.stickyErrorMessage).attr('aria-hidden', true);
    } else {
      ui.heading.attr('aria-invalid', true);
      errMsgs.not(base.options.selectors.stickyErrorMessage).attr('aria-hidden', false);
    }
    ui.heading.attr('aria-describedby', base.getDescriptionIDs(ui) || null);
  },
  defaultOptions: {
    cycle: true,
    selectors: {
      select: 'select',
      wrapper: //Markup der neuen fancy Selectbox
      '<div class=\'c-fancy-selects__select\'>' +
      '<p class=\'c-fancy-selects__heading\' tabindex=\'0\'></p>' +
      '<ul class=\'c-fancy-selects__list\'></ul>' +
      '</div>',
      heading: '.c-fancy-selects__heading', // Selektor des Kopfelementes, in dem der aktuell ausgewählte Eintrag angezeigt wird
      list: '.c-fancy-selects__list', // Selektor der Liste mit Einträgen
      errorMessage: '.formError, .js-clientsidevalidation-errmsg', // Selektor der Fehlermeldungen
      stickyErrorMessage: '.formError' // Selektor der Fehlermeldungen, bei denen aria-hidden Attribut nicht gesetzt wird
    },
    markup: {
      listItem: "<li class='c-fancy-selects__item'/>"
    },
    classes: {
      isFancy: 'js-is-fancy',
      replacedSelect: 'c-fancy-selects__replaced-select'
    }
  }
});

    

   /* Ende gsb_fancy_selects */
   /* Start gsb_responsivetables */
   
    

    

    /* --GSBDocStart
 * @name: @gsb/gsb_responsivetables
 * @version: 6.0.0
 * @description: GSB-Plugin zum Wrappen von Tabellen fuer die mobile Darstellung
 * --GSBDocEnd
*/"use strict";
gsb.makeGSBModule('gsb.responsiveTables', {
  init: function () {
    const base = this;
    gsb.log('gsb_responsivetables.init()');

    base.responsiveTables = base.$el.find('table').map(function () {
      const $table = $(this).wrap('<div class="' + base.options.classes.responsiveTable + '"></div>');
      const $respTable = $table.parent();
      if (base.options.way === 'scroll') {
        $respTable.wrap('<div class="' + base.options.classes.responsiveTableWrapper + '"></div>');
        const $respWrapper = $respTable.parent();
        $respTable.on('scroll.responsivetables.gsb', base, base.handleScroll); // adding scroll listener to responsiveTable
        base.initClasses($respWrapper, $table, base.options.copyClassesFromTableToWrapper);
      }
      base.initClasses($respTable, $table, base.options.copyClassesFromTableToInnerDiv);
      return $respTable[0];
    });
    base.lastResize = Date.now() - base.options.throttle;
    base.onResize();
    $(window).on('resize', base, base.onResize);
  },

  initClasses: function ($element, $table, option) {
    if (option) {
      if (option.include) {
        $element.addClass(option.include);
      }
      if (option.inherit) {
        $element.addClass($table.attr('class'));
      }
      if (option.exclude) {
        $element.removeClass(option.exclude);
      }
    }
  },

  onResize: function (ev) {
    const base = ev ? ev.data : this;
    if (Date.now() >= base.lastResize + base.options.throttle) {
      base.responsiveTables.trigger('scroll.responsivetables.gsb');
      base.lastResize = Date.now();
    }
  },

  // adds classes to <div class="responsiveTableWrapper"></div>
  handleScroll: function (ev) {
    const base = ev.data;
    const respElem = this;
    const $respWrapper = $(respElem).parent();
    const scrollRight = respElem.scrollWidth - respElem.clientWidth - respElem.scrollLeft;
    if (respElem.scrollLeft > 0) {
      $respWrapper.addClass(base.options.classes.scrollLeft);
    } else {
      $respWrapper.removeClass(base.options.classes.scrollLeft);
    }
    if (scrollRight > 0) {
      $respWrapper.addClass(base.options.classes.scrollRight);
    } else {
      $respWrapper.removeClass(base.options.classes.scrollRight);
    }
  },

  defaultOptions: {
    way: 'scroll',
    throttle: 50,
    copyClassesFromTableToInnerDiv: {
      exclude: '',
      include: '',
      inherit: false
    },
    copyClassesFromTableToWrapper: {
      exclude: '',
      include: '',
      inherit: false
    },
    classes: {
      scrollLeft: 'is-scroll-left',
      scrollRight: 'is-scroll-right',
      responsiveTable: 'l-responsive-table__inner',
      responsiveTableWrapper: 'l-responsive-table'
    }
  }
});

    

   /* Ende gsb_responsivetables */
   /* Start gsb_scrollytelling_utils */
   
    

    

    "use strict"; /*!! base
 * --GSBDocStart
 * @module gsb_scrollytelling_utils
 * @version 0.0.2
 * 0.0.2 jelseber: offsetPercentage für hasTopReachedCenterOfViewport hinzugefügt
 * @author jelseber
 * @desc Hilfsobjekt mit widerverwendbaren Funktionen für die scrollytelling Module.
 *
 * @init entfällt
 *
 * @requires {@link external:jQuery}
 *--GSBDocEnd
 *
*/

;(function ($) {
  'use strict';
  if (!$.gsb) {
    $.gsb = {};
  }

  // Extend the jQuery.easing object by an ease function.
  // https://github.com/ai/easings.net/blob/master/vendor/jquery.easing.js
  $.extend($.easing, {
    easeOutQuart: function (x, t, b, c, d) {
      return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    }
  });

  $.gsb.scrollytelling_utils = {
    hasTopReachedTopOfViewport: function hasTOpReachedTopOfViewport($el) {
      const elementTop = $el.offset().top;
      const viewportTop = $(window).scrollTop();
      return elementTop <= viewportTop;
    },
    getPixelOvershotTopAndTopOfViewport: function getPixelOvershotTopAndTopOfViewport($el, offsetPx) {
      const elementTop = $el.offset().top;
      const viewportTop = $(window).scrollTop();
      return viewportTop - elementTop + offsetPx;
    },

    hasTopReachedCenterOfViewport: function hasTopReachedCenterOfViewport($el, offsetPercentage, offsetPx) {
      const elementTop = $el.offset().top;
      const viewportTop = $(window).scrollTop();
      const viewportHeight = $(window).height();
      const viewportCenter = viewportTop + viewportHeight / 2;

      if (offsetPx && offsetPercentage) {
        return elementTop <= viewportCenter + viewportHeight * offsetPercentage / 100 + offsetPx;
      }
      if (offsetPercentage) {
        return elementTop <= viewportCenter + viewportHeight * offsetPercentage / 100;
      } else {
        return elementTop <= viewportCenter;
      }
    },

    getPixelOvershotTopAndCenterOfViewport: function getPixelOvershotTopAndCenterOfViewport($el) {
      const elementTop = $el.offset().top;
      const viewportTop = $(window).scrollTop();
      const viewportHeight = $(window).height();
      const viewportCenter = viewportTop + viewportHeight / 2;
      return viewportCenter - elementTop;
    },

    getPixelOvershotTopAndBottomOfViewport: function getPixelOvershotTopAndBottomOfViewport($el) {
      const elementTop = $el.offset().top;
      const viewportTop = $(window).scrollTop();
      const viewportHeight = $(window).height();
      const viewportBottom = viewportTop + viewportHeight;
      return viewportBottom - elementTop;
    },

    getCenterOfViewport: function getCenterOfViewport() {
      const viewportTop = $(window).scrollTop();
      const viewportHeight = $(window).height();
      return viewportTop + viewportHeight / 2;
    },

    hasContainerBottomReachedCenterOfViewportPlusOffset: function hasContainerBottomReachedCenterOfViewportPlusOffset($container, offset) {
      const containerTop = $container.offset().top;
      const containerHeight = $container.outerHeight(true);
      const containerBottom = containerTop + containerHeight;
      const viewportCenterPlusOffset = offset ? this.getCenterOfViewport() + offset : this.getCenterOfViewport();
      return containerBottom - viewportCenterPlusOffset;
    },

    getHalfViewportHeight: function getHalfViewportHeight() {
      return $(window).height() / 2;
    },

    // https://stackoverflow.com/a/17012745/5571055
    getNextElement: function getNextElement($currentElement, selector) {
      const elements = $(selector);
      const currentIndex = elements.index($currentElement);
      return $(elements[currentIndex + 1]);
    }
  };

})(jQuery);

    

   /* Ende gsb_scrollytelling_utils */
   /* Start gsb_scrollytelling_anchor_nav */
   
    

    

    "use strict"; /*!
 * --GSBDocStart
 * @module scrollytelling_anchor_nav
 * @version 1.0.1
 *  - 1.0.1 jelseber: centerActivationOffsetPercentage Option hinzugefügt
 *  - 1.0.2 jelseber: Da IE sonst zu früh die Ankerposition anscrollt und dann noch js nachlädt, sodass sich Inhalte verändern udn die Scrollposition
 *  nicht mehr stimmt. Wird das Scrollen jetzt direkt von Javascript korregiert nachdem der Browser seinen Ankermechnismus angewendet hat.Hinzufügen der option scrollAnimationDuration
 *
 * @author jelseber
 *
 * @desc Nutzt gsb_stickyscroll zur Positionierung der Anker Navigation. Markiert in der Anker Navigation den gerade im Inhalt sichtbaren Punkt als aktiv.
 *
 * @init Verwendung innerhalb der init beschreiben
 *
 * @requires  gsb_stickyscroll
 *--GSBDocEnd
 *
 */

;(function ($) {
  'use strict';
  if (!$.gsb) {
    $.gsb = {};
  }

  $.gsb.scrollytelling_anchor_nav = function (el, options) {
    const base = {};
    base.$el = $(el);
    base.el = el;
    base.$el.data('gsb.scrollytelling_anchor_nav', base);

    base.init = function () {
      gsb.log('gsb_scrollytelling_anchor_nav.init()');
      base.options = $.extend(true, {}, $.gsb.scrollytelling_anchor_nav.defaultOptions, options);
      base.prepareElements();
      base.prepareState();
      base.initStickyScroll();
      base.handleScrollLinks();
      base.scroll();
      $(window).on('scroll', base.handleScrollLinks);
      $(window).on('hashchange', base.scroll);
    };

    base.prepareElements = function prepareElements() {
      base.$navList = base.$el.find(base.options.selectors.navList);
      base.$navItemLinks = base.$el.find(base.options.selectors.navItemLink);
      base.navItemsContentHs = [];
      base.$navItemLinks.each(function (index, navItemLink) {
        const anchorId = '#' + $(navItemLink).attr('href').split('#').pop();
        base.navItemsContentHs.push($('body').find(anchorId).get(0));
      });
    };

    base.prepareState = function prepareState() {
      base.isMobile = $(window).width < 768; // Ab Medium
    };

    base.initStickyScroll = function initStickyScroll() {
      base.$el.find(base.options.selectors.navToggleButton).on('click', function () {
        if (base.$navList.hasClass(base.options.classes.navToggled)) {
          $('html').css('overflow', '');
        } else {
          $('html').css('overflow', 'hidden');
        }
        base.$navList.toggleClass(base.options.classes.navToggled);
      });
      const stickyscrollStart = base.$navList.offset().top;
      const stickyscrollEnd = base.$el.offset().top + base.$el.outerHeight() - base.$navList.outerHeight();

      // Klebe am oberen Rand des Containers solange das Ende des Containers nicht erreicht ist
      base.$navList.gsb_stickyscroll({
        stickyFrom: stickyscrollStart,
        stickyTo: stickyscrollEnd,
        class: base.options.gsb_stickyscroll1.class
      });

      // Klebe am unteren Rand des Containers wenn das Ende des Containers erreicht ist
      base.$navList.gsb_stickyscroll({
        stickyFrom: stickyscrollEnd,
        class: base.options.gsb_stickyscroll2.class
      });
      base.$navItemLinks.on("click", (e) => {
        base.$navList.filter("." + base.options.classes.navToggled).find(base.options.selectors.navToggleButton).click();
      });
    };

    base.handleScrollLinks = function handleScrollLinks(ev) {
      if (base.$navList.children(':visible').length > 0) {
        base.$el.find('.js-anchor-nav__button').show();
      } else {
        base.$el.find('.js-anchor-nav__button').hide();
      }

      const navItemLinksWhoseContenthHasReachedCenterOfViewport = [];
      base.navItemsContentHs.forEach(function (contentH) {
        const $contentH = $(contentH);
        if ($contentH.length > 0) {
          const hasTopReachedCenterOfViewport = $.gsb.scrollytelling_utils.hasTopReachedCenterOfViewport($contentH, base.options.centerActivationOffsetPercentage);
          if (hasTopReachedCenterOfViewport) {
            const $currentNavItemLink = base.$navItemLinks.filter(function (index, navItemLink) {
              const anchorId = $(navItemLink).attr('href').split('#').pop();
              return $contentH.attr('id') === anchorId;
            });
            navItemLinksWhoseContenthHasReachedCenterOfViewport.push($currentNavItemLink.get(0));
          }
        }
      });
      base.$navItemLinks.parent().removeClass(base.options.classes.navItemActive);
      const lastActiveItem = navItemLinksWhoseContenthHasReachedCenterOfViewport.pop(); // remove and store last item
      $(lastActiveItem).parent().addClass(base.options.classes.navItemActive);

      if ($(lastActiveItem).parent().is(':first-child')) {
        base.$navList.addClass('c-toc__item--first');
      } else {
        base.$navList.removeClass('c-toc__item--first');
      }
    };

    base.scroll = function scroll() {
      const hash = window.location.hash;
      const $elementToScrollTo = $(hash);
      if ($elementToScrollTo.length > 0) {
        console.debug('gsb_scrollytelling_anchor_nav: Scrolling with Animation to element with the id: \'' + hash);
        $('html, body').animate({
          scrollTop: $elementToScrollTo.offset().top - base.getHeight('.c-header')
        }, base.options.scrollAnimationDuration);
      }
    };

    base.getHeight = function (item) {
      let getHeight = $(item).height();
      return getHeight;
    };

    base.init();
  };
  $.gsb.scrollytelling_anchor_nav.defaultOptions = {
    centerActivationOffsetPercentage: 0, // schiebt den Aktivierungspunkt für den aktiven Menupünkt um x% der Höhe des Viewports, ausgehend von der Mitte des Viewports.
    // Sinvolle Werte liegen im Bereich von -50 bis 50
    scrollAnimationDuration: 100, // scroll Animationsdauer (meist nicht wirksam da in den meisten Fällen bereits korrekt per Browser Anker an die passende Postion gesprungen wurde)
    classes: {
      navToggled: 'c-anchor-nav--toggled',
      navItemActive: 'is-active'
    },
    selectors: {
      navList: 'ul.c-anchor-nav__list',
      navToggleButton: '.js-anchor-nav__button',
      navItemLink: '.c-anchor-nav__item > a'
    },
    gsb_stickyscroll1: {
      class: 'js-gsb_stickyscroll-sticky'
    },
    gsb_stickyscroll2: {
      class: 'js-gsb_stickyscroll-stickystop'
    }
  };
  $.fn.gsb_scrollytelling_anchor_nav = function (options) {
    return this.each(function () {
      $.gsb.scrollytelling_anchor_nav(this, options);
    });
  };

})(jQuery);

    

   /* Ende gsb_scrollytelling_anchor_nav */
   /* Start gsb_scroll_control */
   
    

    

    /* --GSBDocStart
 * @name: @gsb/gsb_scroll_control
 * @version: 1.1.2
 * @description: A module that handles scrolling for anchor-links on click and on pageload 
 * --GSBDocEnd
*/"use strict";
gsb.makeGSBModule('gsb.scroll_control', {

  init: function () {
    const base = this;
    if (base.options.scrollOnPageLoad) {
      base.scrollOnPageLoad();
    }
    if (base.options.scrollOnAnchorLinkClick) {
      base.$el.find(base.options.selectors.anchorLinks).on('click', base, base.scrollOnAnchorLinkClick);
    }
  },

  /**
   * Function that triggers on page load and scrolls to the element with the id given in the link, if the url contains
   * an element id.
   **/
  scrollOnPageLoad: function () {
    const base = this;
    if (window.location.hash) {
      const $elementToScrollTo = $('#' + $.escapeSelector(window.location.hash.substring(1))).not(base.options.selectors.excludeFromScrollOnPageLoad);
      if ($elementToScrollTo.length) {
        if (history.scrollRestoration) {
          history.scrollRestoration = 'manual';
        }
        setTimeout(function () {
          base.animatedScroll($elementToScrollTo);
        },
        // if cookiebanner is visible
        $(base.options.selectors.cookiebanner).is(':visible') ? base.options.cookiebannerAnimationDuration + 50 : 0);
      }
    }
  },

  /**
   * Function that that is registered to the click event of selected anchor-links.
   *
   * @param {event} e - Event that is fired on click of an anchor link.
   *
   **/
  scrollOnAnchorLinkClick: function (e) {
    const base = e.data;
    if (this.origin === window.location.origin && this.pathname === window.location.pathname && this.search === window.location.search) {
      e.preventDefault();
      const hash = $(e.currentTarget).attr('href');
      history.pushState({}, '', hash);
      const id = hash.substring(hash.indexOf('#'));
      const $elementToScrollTo = $(id.replaceAll('.', '\\.'));
      base.animatedScroll($elementToScrollTo);
    }
  },

  /**
   * Calculates the height of all overlays, adds them and returns the result.
   *
   * @return {number} height - Height of overlays in pixel.
   *
   **/
  getOverlaysHeight: function () {
    const base = this;
    let height = 0;
    $(base.options.selectors.overlays).each(function (index, element) {
      height = height + $(element).outerHeight(true);
    });
    return height;
  },

  /**
   * Scrolls to the Element $elementToScrollTo including the given offset in options.scrollOffset
   *
   * @param {object} $target - Element that should be scrolled into view.
   *
   **/
  animatedScroll: function ($elementToScrollTo) {
    const base = this;
    const scrollOffset = base.options.scrollOffset;
    let offset = 0;

    if (typeof scrollOffset === 'number') {
      offset = scrollOffset || 0;
    } else if (typeof scrollOffset === 'function') {
      offset = scrollOffset.call(base, $elementToScrollTo) || 0;
    }

    if ($elementToScrollTo.length > 0) {
      base.$el.css('scroll-behavior', 'auto'); // jquery animiertes Scrollen funktioniert nicht korrekt mit scroll-behavior: 'smooth'
      let overlaysHeight = base.getOverlaysHeight() + offset;
      base.$el.clearQueue().stop().animate({
        scrollTop: $elementToScrollTo.offset().top - overlaysHeight
      }, base.options.scrollAnimationDuration, 'linear',

      function () {//erster Callback nach erster Scroll Animation
        // ensure that the last scroll event (used by e.g. gsb_shrinkheader) from the previous scrolling animation has been fired and the overlaysHeight has been properly updated
        requestAnimationFrame(function () {
          overlaysHeight = base.getOverlaysHeight() + offset;
          base.$el.clearQueue().stop().animate({
            // Rescroll um Overlay Änderungen abzufangen
            scrollTop: $elementToScrollTo.offset().top - overlaysHeight
          }, base.options.scrollAnimationDuration / 2, 'linear', function () {
            requestAnimationFrame(function () {// zweiter Callback nach zweiter Scroll Animation
              base.$el.css('scroll-behavior', ''); // Scroll Verhalten Manipulation entfernen
              if (!$elementToScrollTo.is($('[tabindex]'))) {
                $elementToScrollTo.attr('tabindex', -1); // tabindex="-1" hinzufügen um das Element per Javascript fokussierbar zu machen, falls es nicht bereits einen tabindex hat
              }
              $elementToScrollTo[0].focus({ preventScroll: true }); // nicht per Browser scrollen, da wir bereits mit JavaScript an die korrekte Stelle gescrollt haben
            });
          });
        });
      });
    }
  },

  defaultOptions: {
    cookiebannerAnimationDuration: 1800, // same as gsb_banner animationSpeed
    scrollAnimationDuration: 200,
    scrollOnPageLoad: true,
    scrollOnAnchorLinkClick: true,
    scrollOffset: function (referenceElement) {
      return 0;
    },
    selectors: {
      anchorLinks: 'a[href*="#"]:not(.tabs-list a,[href="#"])',
      excludeFromScrollOnPageLoad: '.js-accordion-hashControlled .js-accordion-entry',
      cookiebanner: '', // use valid selector if the cookiebanner is displayed at the top of the page, positioned relative, pushing the contents down during the animation.
      overlays: '.js-header.is-sticky'
    }
  }
});

    

   /* Ende gsb_scroll_control */
   /* Start gsb_shrinkheader */
   
    

    

    /* --GSBDocStart
 * @name: @gsb/gsb_shrinkheader
 * @version: 4.2.1
 * @description: Berechnet die Höhe des Headers und setzt, sobald dieser aus dem sichtbaren Bereich verschwindet, eine CSS Klasse and das base-Element. Anhand der Klasse kann der Header dann neu gestyled werden und ggf. andere Bilder/Logos eingeblendet werden.
 * --GSBDocEnd
*/
'use strict';
gsb.makeGSBModule('gsb.shrinkheader', {
  init: function () {
    const base = this;
    base.$el.gsb_responsiveListener(base);
    base.$el.trigger('init.shrinkheader.gsb');
  },

  /**
   * @method initScrollEvent
   * @desc Initialisierung des Scripts bzw. des Scroll-Events
   */
  initScrollEvent: function () {
    const base = this;
    base.setBaseHeight({});
    base.checkPosition();
    $(window).off('scroll.shrinkheader.gsb').on('scroll.shrinkheader.gsb', function () {
      base.checkPosition();
    });
    base.windowWidth = $(window).width();
    $(window).on('resize', base, base.setBaseHeight);

    if (base.options.showOnlyOnScrollUp) {
      const lastScrollTop = 0;
      $(window).off('scroll.showOnlyOnScrollUp.shrinkheader.gsb', base.showOnlyOnScrollUp).
      on('scroll.showOnlyOnScrollUp.shrinkheader.gsb', { base: base, lastScrollTop: lastScrollTop }, base.showOnlyOnScrollUp);
    } else {
      $(window).off('scroll.showOnlyOnScrollUp.shrinkheader.gsb', base.showOnlyOnScrollUp);
      base.$el.removeClass(base.options.classes.scrollDownClass);
    }
  },


  /**
   * Setzt sie base.height neu.
   * Dies ist notwendig für den Fall, wenn die Seite gezoomed wird und sich durch den Zoom die Höhe verändert.
   * @param e
   */
  setBaseHeight: function (e) {
    const base = e.data || this;
    const isShrunk = base.$el.hasClass(base.options.classes.shrinkCssClass);
    if (base.windowWidth !== $(window).width()) {
      base.windowWidth = $(window).width();    
      if (isShrunk) {// bereits geschrumpft
        // shrinkheader muss kurz voll angezeigt werden, damit die Höhe berechnet werden kann
        base.$el.removeClass(base.options.classes.shrinkCssClass);
        $('body').removeClass(base.options.classes.shrinkBodyClass);

        base.height = base.$el.outerHeight(true); // Höhe entnehmen

        // vorherigen Zustand wieder herstellen
        base.$el.addClass(base.options.classes.shrinkCssClass);
        $('body').addClass(base.options.classes.shrinkBodyClass);
      } else {
        base.height = base.$el.outerHeight(true);
      }
    }
  },

  /**
   * Wenn das angegebene Element nicht sichtbar ist, find das nächst sichtbare.
   * Dies ist ein Fallback für den Fall, wenn die Seite nach dem Laden gezoomed wird, und das Element, welches den Margin bekommen soll nicht mehr sichtbar ist.
   * @param $lastElement
   * @returns {*}
   */
  getFirstVisibleElement: function ($lastElement) {
    const base = this;
    let $nextElement = $lastElement.next();
    if (!$nextElement.is(':visible')) {
      $nextElement = base.getFirstVisibleElement($nextElement);
    }
    return $nextElement;
  },

  /**
   * @method checkPosition
   * @desc Prüft ob die Klasse shrinkCssClass und shrinkBodyClass gesetzt oder entfernt werden muss, fügt am Element elementToAddMarginTo den margin-top hinzu und entfernt, falls konfiguriert, Tabindexe
   */
  checkPosition: function () {
    const base = this;
    base.$el.trigger('beforeCheckPosition.shrinkheader.gsb');
    const distanceY = window.scrollY;
    const isShrunk = base.$el.hasClass(base.options.classes.shrinkCssClass);

    if (!isShrunk) {
      // Im Ausgangszustand ist das Menu nicht zwingend das erste Element im Dom mit einer Höhe, deshalb wird dieser Offset ausgelesen und für spätere Verwendung im verkleinerten Zustand gespeichert.
      base.lastKnownOffset = base.$el.offset().top;
    }
    // Wenn kein Pixelwert in der Option gegeben ist, wird dieser berechnet.
    const shrinkOn = base.options.shrinkOn || base.height + base.lastKnownOffset;

    let $elementToAddMarginTo = $(base.options.selectors.elementToAddMarginTo);
    if (!$elementToAddMarginTo.is(':visible')) {
      // Wenn das Element nicht sichtbar ist, finde das nächste sichtbare Element und nutze dies
      $elementToAddMarginTo = base.getFirstVisibleElement($elementToAddMarginTo);
    }

    if (distanceY > shrinkOn) {
      // Header soll verkleinert dargestellt werden
      if (!isShrunk) {
        $elementToAddMarginTo.css({ marginTop: base.height });
        $('body').addClass(base.options.classes.shrinkBodyClass);
        base.fixA11y(true);
        base.$el.addClass(base.options.classes.shrinkCssClass);
      }
    } else {
      // Header Ausgangszustand
      if (base.$el.hasClass(base.options.classes.shrinkCssClass)) {
        $elementToAddMarginTo.css({ marginTop: '' });
        $('body').removeClass(base.options.classes.shrinkBodyClass);
        base.fixA11y(false);
        base.$el.removeClass(base.options.classes.shrinkCssClass);
      }
    }
    base.$el.trigger('afterCheckPosition.shrinkheader.gsb');
  },

  /**
   * @method fixA11y
   * @desc setzt bei aktivierten shrinkheader den Tabindex bei den selektierten Elementen
   */
  fixA11y: function (shrink) {
    const base = this;
    base.$el.trigger('beforeA11y.shrinkheader.gsb');
    const $elements = $(base.options.selectors.elementsToRemoveFromTabindex);
    if (shrink) {
      $elements.attr('tabindex', -1);
    } else {
      $elements.removeAttr('tabindex');
    }
    base.$el.trigger('afterA11y.shrinkheader.gsb');
  },

  showOnlyOnScrollUp: function (e) {
    const base = e.data.base;
    const scrollTop = $(this).scrollTop();

    if (scrollTop > e.data.lastScrollTop) {
      if (!base.$el.hasClass(base.options.classes.scrollDownClass)) {
        base.$el.addClass(base.options.classes.scrollDownClass);
      }
    } else {
      base.$el.removeClass(base.options.classes.scrollDownClass);
    }

    e.data.lastScrollTop = scrollTop;

    if (scrollTop <= 0) {
      base.$el.removeClass(base.options.classes.scrollDownClass);
    }
  },

  /**
   * @method removeScrollEvent
   * @desc Entfernt das Scroll-Event scroll.shrinkheader
   */
  removeScrollEvent: function () {
    const base = this;
    if (base.$el.hasClass(base.options.classes.shrinkCssClass)) {
      base.$el.removeClass(base.options.classes.shrinkCssClass);
      base.fixA11y(false);
    }
    $(window).off('scroll.shrinkheader');
  },

  defaultOptions: {
    shrinkOn: null,
    showOnlyOnScrollUp: false,
    classes: {
      shrinkBodyClass: 'header-is-sticky',
      shrinkCssClass: 'is-sticky',
      scrollDownClass: 'is-scrolling-down'
    },
    selectors: {
      elementToAddMarginTo: '.main',
      elementsToRemoveFromTabindex: ''
    },
    respondToEvents: true,
    onRefresh: function () {
      this.initScrollEvent();
    },
    responsive: [
    {
      breakpoint: 1024,
      onRefresh: function () {
        this.removeScrollEvent();
      }
    }]

  }
});

    

   /* Ende gsb_shrinkheader */
   /* Start gsb_simple_toggle */
   
    

    

    /* --GSBDocStart
 * @name: @gsb/gsb_simple_toggle
 * @version: 5.2.1
 * @description: Vielfältig einsetzbare Ein- und Ausblendefunktion
 * --GSBDocEnd
*/"use strict";
gsb.makeGSBModule('gsb.simple_toggle', {
  init: function () {
    const base = this;

    base.closer = $(base.options.closer, base.el);
    base.opener = $(base.options.opener, base.el);
    base.openerToFocusOnClose = null;
    base.items = $(base.options.item, base.el);
    base.isOpenInitially = base.opener.hasClass(base.options.activeClass);
    base.isOpen = base.isOpenInitially;
    base.backupAttributes();

    base.$el.gsb_responsiveListener(base);
  },

  initialize: function () {
    const base = this;

    if (!base.options.uninit) {
      base.setupOpenerAndItems();
      base.setupEventListeners();
      base.insertCloser();
    } else {
      base.uninit();
    }
  },

  backupAttributes: function () {
    const base = this;
    const openerListAttr = typeof base.options.openerListAttr === 'string' ? base.options.openerListAttr : '';

    base.items.each(function (i, el) {
      const item = $(el);
      item.attr('data-persistent-role', item.attr('role') || '');
      if (openerListAttr) {
        item.attr('data-persistent-' + openerListAttr, item.attr(openerListAttr) || '');
      }
    });

    base.opener.attr({
      'data-persistent-role': base.opener.attr('role') || '',
      'data-persistent-tabindex': base.opener.attr('tabindex') || '',
      ['data-persistent-' + base.options.openerStatusAttr]: base.opener.attr(base.options.openerStatusAttr) || '',
      ['data-persistent-' + base.options.itemListAttr]: base.opener.attr(base.options.itemListAttr) || ''
    });
  },

  restoreAttributes: function () {
    const base = this;
    const openerListAttr = typeof base.options.openerListAttr === 'string' ? base.options.openerListAttr : '';

    base.items.each(function (i, el) {
      const item = $(el);
      item.attr('role', item.attr('data-persistent-role') || null);
      if (openerListAttr) {
        item.attr(openerListAttr, item.attr('data-persistent-' + openerListAttr) || null);
      }
    });

    base.opener.attr({
      role: base.opener.attr('data-persistent-role') || null,
      tabindex: base.opener.attr('data-persistent-tabindex') || null,
      [base.options.openerStatusAttr]: base.opener.attr('data-persistent-' + base.options.openerStatusAttr) || null,
      'aria-hidden': null,
      [base.options.itemListAttr]: base.opener.attr('data-persistent-' + base.options.itemListAttr) || null
    });
  },

  setupOpenerAndItems: function () {
    const base = this;
    const openerListAttr = typeof base.options.openerListAttr === 'string' ? base.options.openerListAttr : '';
    const useAriaLabelledBy = openerListAttr.toLowerCase() === 'aria-labelledby';
    $().add(base.opener).add(base.items).each(function () {
      $(this).attr('id', $(this).attr('id') || base.generateID());
    });
    base.items.each(function (i, el) {
      const item = $(el);
      item.attr('role', item.attr('role') || 'region');

      if (base.isOpen) {
        $(this).addClass(base.options.showClass);
        $(this).removeClass(base.options.hideClass);
      } else {
        $(this).addClass(base.options.hideClass);
        $(this).removeClass(base.options.showClass);
      }

      if (!useAriaLabelledBy || !item.attr('aria-label')) {
        base.addIdsToAttr(item, openerListAttr, base.opener);
      }
    });

    if (!base.opener.is('button')) {
      base.opener.attr('role', 'button').attr('tabindex', base.opener.attr('tabindex') || 0);
    }
    base.opener.attr(base.options.openerStatusAttr, base.isOpen);
    base.opener.addClass(base.isOpen ? base.options.activeClass : base.options.inactiveClass);
    base.items.attr('aria-hidden', !base.isOpen);
    base.addIdsToAttr(base.opener, base.options.itemListAttr, base.items);

    if (base.opener.length && !$('body').find(base.opener).length) {
      base.$el[base.options.openerInsert](base.opener);
    }
  },

  setupEventListeners: function () {
    const base = this;
    const namespace = base.eventName;
    base.$el.on(`open.${namespace}`, base, base.open);
    base.$el.on(`toggle.${namespace}`, base, base.openerHandler);
    base.$el.on(`close.${namespace}`, base, base.close);
    $().add(base.opener).add(base.closer).add(base.items).on(`keydown.${namespace}`, base, base.escapeHandler);
    base.closer.on(`click.${namespace} keydown.${namespace}`, base, base.closerHandler);
    base.opener.on(`click.${namespace} keydown.${namespace}`, base, base.openerHandler);
    if (base.options.closeOnFocusout) {
      base.opener.add(base.items).on(`mousedown.${namespace} focusout.${namespace}`, base, base.focusoutHandler);
    }
  },

  insertCloser: function () {
    const base = this;
    if (base.closer.length && !$('body').find(base.closer).length) {
      if (base.items.length < 2) {
        base.items[base.options.closerInsert](base.closer);
      } else if (typeof base.options.closer === 'string') {
        base.items[base.options.closerInsert](base.options.closer);
      } else {
        base.$el[base.options.closerInsert](base.closer);
      }
    }
  },

  addIdsToAttr: function ($elem, attrName, addElems) {
    const val = attrName ? $elem.attr(attrName) : '';
    const oldIds = val ? val.trim().split(/\s+/g) : [];
    const ids = {};
    if (attrName) {
      oldIds.forEach(function (id) {
        ids[id] = true;
      });
      addElems.each(function () {
        ids[$(this).attr('id')] = true;
      });
      $elem.attr(attrName, Object.keys(ids).join(' '));
    }
  },

  openerHandler: function (ev) {
    const base = ev.data;
    if (!ev.key || ev.key === 'Spacebar' || ev.key === ' ' || ev.key === 'Enter') {
      ev.preventDefault();
      if (base.opener.hasClass(base.options.activeClass)) {
        base.close(ev);
      } else {
        base.open(ev);
        if ($(ev.target).is(base.opener)) {
          base.openerToFocusOnClose = ev.target;
        }
      }
    }
  },

  closerHandler: function (ev) {
    const base = ev.data;
    if (!ev.key || ev.key === 'Spacebar' || ev.key === ' ' || ev.key === 'Enter') {
      ev.preventDefault();
      base.close(ev);
    }
  },

  focusoutHandler: function (ev) {
    const base = ev ? ev.data : this;
    if (ev.type === 'mousedown') {
      // When the mousedown event occurs a focusout event follows.
      // If the mousedown event occurs on a non-focusable element, the new activeElement will be <body> which is outside the $box.
      ev.preventDefault(); // Kill all focusout events following the mousedown event to avoid closing the toggle item when mousedowning inside.
      // The suppressed possible focus change needs to be handled manually.
      const $closestOpener = $(ev.target).closest(base.opener);
      if ($closestOpener.length) {
        // If the clicked Element is focusable but inside the opener
        $closestOpener.trigger('focus'); // Set the focus on the opener
      } else {
        $(ev.target).trigger('focus'); // Set the focus to the element clicked.
      }
      // If the clicked element is focusable, it will trigger a focusout event where the new activeElement is inside opened menu.
      // This will be handled correctly for the focusout event.
      // If the clicked element is not focusable, then the focus will stay where it is and no unwanted focusout event will be triggered.
    } else {
      setTimeout(function () {
        if (!$(document.activeElement).closest(base.items.add(base.opener)).length) {
          // new activeElement is not inside the base.items
          base.close(null, true);
        }
      }, 0);
    }
  },

  escapeHandler: function (ev) {
    const base = ev ? ev.data : this;
    switch (ev.key) {
      case 'Esc': // IE/Edge
      case 'Escape': // W3C
        ev.preventDefault();
        if (base.$el.find(base.items).hasClass(base.options.showClass)) {
          base.close(ev);
        }
        break;
    }
  },

  open: function (ev) {
    const base = ev ? ev.data : this;
    if (ev) {
      ev.preventDefault();
      ev.stopPropagation();
    }
    if (base.specialTrigger('beforeOpen.simple_toggle.gsb', ev)) {
      base.isOpen = true;
      base.opener.
      addClass(base.options.activeClass).
      removeClass(base.options.inactiveClass).
      attr(base.options.openerStatusAttr, 'true');
      base.items.
      addClass(base.options.showClass).
      removeClass(base.options.hideClass).
      attr('aria-hidden', 'false');
      base.specialTrigger('afterOpen.simple_toggle.gsb', ev);
    }
  },

  close: function (ev, preventFocusingOpener) {
    const base = ev ? ev.data : this;
    if (ev) {
      ev.preventDefault();
      ev.stopPropagation();
    }
    if (base.specialTrigger('beforeClose.simple_toggle.gsb', ev)) {
      base.isOpen = false;
      base.opener.
      addClass(base.options.inactiveClass).
      removeClass(base.options.activeClass).
      attr(base.options.openerStatusAttr, 'false');
      base.items.
      addClass(base.options.hideClass).
      removeClass(base.options.showClass).
      attr('aria-hidden', 'true');
      if (base.openerToFocusOnClose) {
        if (!preventFocusingOpener) {
          $(base.openerToFocusOnClose).trigger('focus');
        }
        base.openerToFocusOnClose = null;
      }
      base.specialTrigger('afterClose.simple_toggle.gsb', ev);
    }
  },

  specialTrigger: function (evStr, ev) {
    var base = this,
      namespaces = evStr.split('.'),
      type = namespaces.shift(),
      event;
    namespaces = namespaces.sort();
    event = $.Event(type, {
      namespace: namespaces.join('.'),
      relatedEvent: ev || null
    });
    base.$el.trigger(event, base);
    return !event.isDefaultPrevented();
  },

  uninit: function () {
    const base = this;

    base.isOpen = base.isOpenInitially;

    base.restoreAttributes();

    base.items.
    removeClass(base.options.hideClass).
    removeClass(base.options.showClass);

    base.opener.
    removeClass(base.options.activeClass).
    removeClass(base.options.inactiveClass);

    const apiEvents = ['open', 'toggle', 'close'];
    base.$el.off(apiEvents.map((s) => s + '.' + base.eventName).join(' '));

    const nativeEvents = ['click', 'mousedown', 'keydown', 'focusout'];
    const nativeEventsStr = nativeEvents.map((s) => s + '.' + base.eventName).join(' ');
    base.opener.off(nativeEventsStr);
    base.items.off(nativeEventsStr);
    base.closer.off(nativeEventsStr);
  },

  defaultOptions: {
    uninit: false,
    item: '.js-simple-toggle-item',
    openerListAttr: 'aria-labelledby',
    showClass: 'is-shown',
    hideClass: 'is-hidden',
    opener: '.js-simple-toggle-opener',
    openerInsert: 'prepend',
    openerStatusAttr: 'aria-expanded',
    itemListAttr: 'aria-controls',
    activeClass: 'active-control',
    inactiveClass: 'inactive-control',
    closer: '.js-simple-toggle-closer', //can also be html
    closerInsert: 'append',
    closeOnFocusout: false,
    respondToEvents: true,
    onRefresh: function () {
      this.initialize();
    }
  }
});

    

   /* Ende gsb_simple_toggle */
   /* Start gsb_stickyscroll */
   
    

    

    "use strict"; /*!!
 * @module gsb_stickyscroll
 * @version: 2.0.0
 * 1.0.1 jelseber: Auslagern von handleScroll und einmaliges, initiales Ausführen von handleScroll bei Modulinitialisierung um sicherzustellen, dass das Menü auch vor dem ersten scrollen richtig
 * dargestellt wird.
 * 2.0.0 rkrusenb: Nutzung von gsb_makeGSBModule
 * @author jtran
 * @desc Setzt Klassen an das base-Element, wenn bis einer bestimmten Höhe gescrolled wird.
 *
 * @example
 * $('#header').gsb_stickyscroll({options})
 *
 * @requires  jQuery >= 1.11.1
 *
 * */
gsb.makeGSBModule('gsb.stickyscroll', {
  init: function () {
    var base = this;
    base.allInstances.instCount++;
    base.instNS = '.inst' + base.allInstances.instCount + '.stickyscroll.gsb';
    base.preInit();
    base.handleScroll();
    $(window).on('scroll' + base.instNS, base, base.handleScroll);
  },
  preInit: function () {
    var base = this;
    if (base.options.stickyFrom === -1) {
      base.options.stickyFrom = base.$el.offset().top; // absolute px-distanz des Elements nach oben
    }
  },
  handleScroll: function (ev) {
    var base = ev ? ev.data : this,
      windowTop = $(window).scrollTop(),
      stickyFrom = base.calcStickyFrom(),
      stickyTo = base.calcStickyTo(); // gegenwärtige scroll distanz
    if (windowTop < stickyFrom) {
      base.$el.removeClass(base.options.class);
      //console.debug(`windowTop[${windowTop}] < stickyFrom[${stickyFrom}]`);
    } else if (windowTop >= stickyFrom && (windowTop <= stickyTo || stickyTo === -1)) {
      base.$el.addClass(base.options.class);
      //console.debug(`stickyFrom[${stickyFrom}] <= windowTop[${windowTop}] && windowTop[${windowTop}] <= stickyTo[${stickyTo}]`);
    } else if (stickyTo > -1 && windowTop > stickyTo) {
      base.$el.removeClass(base.options.class);
      //console.debug(`windowTop[${windowTop}] > stickyTo[${stickyTo}]`);
    }
  },
  calcStickyFrom: function () {
    var base = this,
      stickyFrom = base.options.stickyFrom;
    if (typeof stickyFrom === "function") {
      return stickyFrom.call(base);
    } else {
      return stickyFrom;
    }
  },
  calcStickyTo: function () {
    var base = this,
      stickyTo = base.options.stickyTo;
    if (typeof stickyTo === "function") {
      return stickyTo.call(base);
    } else {
      return stickyTo;
    }
  },
  allInstances: {
    instCount: 0
  },
  defaultOptions: {
    class: '',
    stickyFrom: -1,
    stickyTo: -1
  }
});

    

   /* Ende gsb_stickyscroll */
   /* Start gsb_toggle */
   
    

    

    /* --GSBDocStart
 * @name: @gsb/gsb_toggle
 * @version: 5.7.2
 * @description: Dieses Modul erstellt in der Default-Konfiguration ein Akkordeon in small und ein Tab-Modul in large
 * --GSBDocEnd
*/"use strict";
gsb.makeGSBModule('gsb.toggle', {

  init: function () {
    const base = this;

    base.validateOptions();
    base.activeMode = base.options.mode;

    if (base.options.richtext) {
      base.addRichtextContainer();
    } else {
      if (base.$el.data('href')) {
        $.get(base.$el.data('href'), function (data) {
          base.$el.html(data);
          base.onMarkupComplete();
        });
      } else {
        base.onMarkupComplete();
      }
    }
  },

  validateOptions: function () {
    const base = this,
      breakpointOptions = base.options.responsive || [];

    [base.options].concat(breakpointOptions).forEach((options) => {
      if ('accordion' in options) {
        throw new Error(
          "Die Option 'accordion' ist obsolet." +
          " Stattdessen muss die Option 'mode' mit Wert 'accordion' gesetzt werden." +
          " Diese Option ist auch in Breakpoints erlaubt."
        );
      }
      if ('tab' in options) {
        throw new Error(
          "Die Option 'tab' ist obsolet." +
          " Stattdessen muss die Option 'mode' mit Wert 'tabs' gesetzt werden." +
          " Diese Option ist auch in Breakpoints erlaubt."
        );
      }
    });
  },

  findAllUsedModes: function () {
    const base = this,
      modes = {},
      breakpointOptions = base.options.responsive || [];

    [base.options].concat(breakpointOptions).forEach((options) => {
      if (options.mode) {
        modes[options.mode] = true;
      }
    });

    return Object.keys(modes);
  },

  /**
   * @method onMarkupComplete
   * @desc Initialisierung des Scripts
   */
  onMarkupComplete: function () {
    const base = this;

    if (!base.$el.hasClass('gsb-toggle')) {
      if (base.activeMode !== 'none') {
        base.reinitToggle();
      }

      base.$el.gsb_responsiveListener(base);
    }
  },

  reinitToggle: function () {
    const base = this;

    if (!base.$el.hasClass('gsb-toggle')) {
      base.$el.addClass('gsb-toggle');
      base.addClasses();
      base.addClickfunction();
      base.makeAccessible();
      base.accKeyboardCtrl();

      if (base.options.hashControlled) {
        base.addHashHandler();
      }
    }
  },

  switchAccordingToMode: function () {
    const base = this;

    base.$el.attr('data-togglemode', base.options.mode);

    if (base.activeMode === 'none' && base.options.mode !== 'none') {
      base.reinitToggle();
    }
    base.activeMode = base.options.mode;

    if (base.options.autoplay && !base.autoplayInitialized) {
      base.autoplay();
    }

    if (base.options.autoplay) {
      base.autoplayStart();
    } else {
      base.autoplayStop();
    }

    if (base.options.mode === 'accordion') {
      base.switchToAccordion();
    } else if (base.options.mode === 'tabs') {
      base.switchToTabs();
    } else if (base.options.mode === 'none') {
      base.switchToNone();
    }
  },



  /**
   * @method addClasses
   * @desc Zugehörigkeit der Überschriften festlegen
   */
  addClasses: function () {
    var base = this;

    let tabControls = base.$el.find(base.options.tabControls);
    if (tabControls.length) {
      let activeTabControl = tabControls.filter('.active-control');
      let activeTabIndex = $.inArray(activeTabControl[0], tabControls);
      if (activeTabIndex === -1) {
        activeTabIndex = 0;
      }
      tabControls.each(function (index) {
        $(this).addClass(base.options.switchPanelClass + index);

        if (index === activeTabIndex) {
          $(this).addClass('active-control');
        } else {
          $(this).addClass('inactive-control');
        }
      });
      base.$el.find(base.options.elements).each(function (index) {
        $(this).addClass(base.options.switchPanelClass + index);

        if (index === activeTabIndex) {
          $(this).addClass(base.options.panelOpenedClass);
        } else {
          $(this).addClass(base.options.panelClosedClass);
        }
      });
    }

    // Accordion hat bei start geöffnete Elemente
    var hasOpendElements = false;

    if (base.$el.find(base.options.heading).filter('.active-control').length > 0) {
      hasOpendElements = true;
    }

    base.$el.find(base.options.heading).each(function () {
      if (!$(this).is('button') || !$(this).is('a')) {
        if (base.options.accordionPanelHeight) {
          var height = 0;
          $(this).next().find('>').each(function () {
            height += $(this).outerHeight(true);
          });
          $(this).next().height(height);
        }

        if (base.options.allOpen && base.options.mode === 'accordion') {//TODO: Genauer prüfen
          base.show($(this).next());
          $(this).addClass('active-control');
        } else if (hasOpendElements) {
          if (!$(this).hasClass('active-control')) {
            $(this).addClass('inactive-control');
            base.hide($(this).next());
          } else {
            base.show($(this).next());
          }
        } else {
          $(this).addClass('inactive-control');
          base.hide($(this).next());
        }
      }

      base.changeAccordionHeadingTitle($(this));
    });
  },

  /**
   * @method addClickfunction
   * @desc Click Events hinzufügen
   */
  addClickfunction: function () {
    var base = this; // Accordion

    base.$el.on('click.gsb_toggle keydown.gsb_toggle', base.options.heading, function (e) {
      if (e.type === 'click' || e.which === 13) {
        e.preventDefault();
        e.stopPropagation();
        base.clickedElem = $(this);
        base.changeStateAccordion();
        base.clickedElem = null;
      }
    }).find(base.options.accordionElementsStopPropagation).on('click.gsb_toggle keydown.gsb_toggle', function (e) {
      e.stopPropagation();
    });

    base.$el.on('activateTab.gsb_toggle', base.options.tabControls, function () {
      base.clickedElem = $(this);
      base.changeStateTab();
      $(this).focus();
    }); // Autoplay muss deaktiviert sein, da die Events focusin und focusout im Firefox derzeit nocht nicht implementiert
    // sind bzw. noch bugs enthalten

    if (base.options.changeOnHover && !base.options.autoplay) {
      base.$el.on('mouseenter.gsb_toggle touchend.gsb_toggle', base.options.tabControls, function () {
        $(this).trigger('activateTab');
      }).on('click.gsb_toggle', base.options.tabControls, function (e) {
        e.preventDefault();
        e.stopPropagation();
      });
    } else {
      base.$el.on('click.gsb_toggle', base.options.tabControls, function (ev) {
        ev.preventDefault();
        ev.stopPropagation();
        $(this).trigger('activateTab');
      }).on('focusin.gsb_toggle', base.options.tabControls, function (ev, stop) {
        if (ev.relatedTarget && !base.$el.find(ev.relatedTarget).length) {
          ev.stopPropagation();
          $(this).trigger('activateTab');
        }
      });
    }
  },

  addHashHandler: function () {
    var base = this,
      initialHash = location.hash || '#',
      hashedElemIndex;

    if (history.scrollRestoration) {
      history.scrollRestoration = 'manual';
    }

    base.initialTabControl = base.$el.find(base.options.tabControls).filter('.active-control');
    if (!base.initialTabControl.length) {
      base.initialTabControl = base.initialTabControl.end().first();
    }
    base.initialAccordionHeadings = base.$el.find(base.options.heading).filter('.active-control');

    if (initialHash !== '#') {
      hashedElemIndex = base.contentPanels.index(base.contentPanels.filter(initialHash));
      if (hashedElemIndex !== -1) {
        base.initialTabControl = base.tabs.eq(hashedElemIndex);
        base.initialAccordionHeadings = base.headings.eq(hashedElemIndex);
      }
    }

    base.initialStatus = base.initialAccordionHeadings.length ? 'initiallyOpen' : 'closed';
    base.initialHash = initialHash;
    base.lastHash = base.initialHash;
    base.lastStatus = base.initialStatus;
    base.initialState = $.extend({}, history.state, {
      status: base.initialStatus,
      hash: base.initialHash
    });
    history.replaceState(base.initialState, document.title);
    $(window).on('gsb-hash-push.gsb_toggle', function (ev, who, hash, status) {
      if (base !== who && (base.lastStatus !== status || base.lastHash !== hash)) {
        base.onPopState(status);
        base.lastStatus = status;
        base.lastHash = hash;
      }
    }).on('popstate.gsb_toggle', function (ev) {
      var state = history.state,
        status = state && state.status,
        hash = location.hash,
        hashIsValidSelector = hash && hash !== '#',
        contentElement;
      base.clickedElem = null;

      if (hashIsValidSelector) {
        contentElement = base.contentPanels.filter(hash);
        if (contentElement.length) {
          base.show(contentElement);
        }
        if (status === 'closed' || status === 'opened' || status === 'initiallyOpen') {
          status = state.status;
          base.onPopState(status);
          base.lastStatus = status;
          base.lastHash = hash || '#';
        }
      }
    }).on('hashchange.gsb_toggle', function (ev) {
      var url = ev.originalEvent && ev.originalEvent.newURL || '',
        hash = '#' + (url.split('#')[1] || '');

      if (hash !== base.lastHash) {
        let contentElement = base.contentPanels.filter(hash);
        if (contentElement.length) {
          if (hash !== '#' && contentElement.is('[hidden]')) {
            base.changeStateHash(hash, 'opened', true);
            base.onPopState('opened');
            base.lastHash = hash;
          } else if (base.options.mode === 'tabs' || base.options.accordionCloseOther) {
            base.changeStateHash(base.lastHash, 'closed', true);
            base.onPopState('closed');
            base.lastHash = hash;
          }
        }
      }
    });
  },

  getHeadingFromHash: function (hash) {
    var base = this,
      hashIsValidSelector = hash && hash !== '#',
      contentElement = hashIsValidSelector ? base.contentPanels.filter(hash) : $(),
      index = contentElement.prop('gsb_aria_index');
    return index > -1 ? base.headings.eq(index) : $();
  },

  getTabFromHash: function (hash) {
    var base = this,
      hashIsValidSelector = hash && hash !== '#',
      contentElement = hashIsValidSelector ? base.contentPanels.filter(hash) : $(),
      index = contentElement.prop('gsb_aria_index');
    return index > -1 ? base.tabs.eq(index) : $();
  },

  getHashFromLink: function (link) {
    var id = String(link.attr('href')).split('#')[1] || '';
    return '#' + id;
  },

  scrollToElement: function ($elementToScrollTo) {
    const base = this;
    const $html = $('html');
    let offset = 0;

    const scrollOffset = base.options.scrolling.scrollOffset;

    if (typeof scrollOffset === 'number') {
      offset = scrollOffset || 0;
    } else if (typeof scrollOffset === 'function') {
      offset = scrollOffset.call(base, $elementToScrollTo) || 0;
    }

    if ($elementToScrollTo.length > 0) {
      $html.css('scroll-behavior', 'auto'); // jquery animiertes Scrollen funktioniert nicht korrekt mit scroll-behavior: 'smooth'
      let overlaysHeight = base.getOverlaysHeight() + offset;

      $html.clearQueue().stop().animate({
        scrollTop: $elementToScrollTo.offset().top - overlaysHeight
      }, base.options.scrolling.scrollAnimationDuration, 'linear',

      function () {//erster Callback nach erster Scroll Animation
        // ensure that the last scroll event (used by e.g. gsb_shrinkheader) from the previous scrolling animation has been fired and the overlaysHeight has been properly updated
        requestAnimationFrame(function () {
          overlaysHeight = base.getOverlaysHeight() + offset;
          $html.clearQueue().stop().animate({
            // Rescroll um Overlay Änderungen abzufangen
            scrollTop: $elementToScrollTo.offset().top - overlaysHeight
          }, base.options.scrolling.scrollAnimationDuration / 2, 'linear', function () {
            requestAnimationFrame(function () {// zweiter Callback nach zweiter Scroll Animation
              $html.css('scroll-behavior', ''); // Scroll Verhalten Manipulation entfernen
              if (!$elementToScrollTo.is($(base.options.tabbables))) {
                $elementToScrollTo.attr('tabindex', -1); // tabindex="-1" hinzufügen um das Element per Javascript fokussierbar zu machen, falls es nicht bereits einen tabindex hat
              }
              $elementToScrollTo[0].focus({ preventScroll: true }); // nicht per Browser scrollen, da wir bereits mit JavaScript an die korrekte Stelle gescrollt haben
            });
          });
        });
      });
    }
  },

  getOverlaysHeight: function () {
    const base = this;
    let height = 0;
    $(base.options.scrolling.scrollOverlaySelector).each(function (index, element) {
      height = height + $(element).outerHeight();
    });
    return height;
  },


  onPopState: function (status) {
    var base = this,
      clickedElem = base.clickedElem || $(),
      hash,
      prevStatus;
    hash = history.state.hash;
    prevStatus = history.state.status;
    base.popStateTriggered = true;

    if (base.options.mode === 'tabs') {
      if (status === 'opened' && hash !== '#') {
        clickedElem = base.getTabFromHash(hash);
      } else if (status === 'initiallyOpen' || hash === '#') {
        clickedElem = base.initialTabControl;
      }
      /* else {
      //do nothing if status === "closed" && hash !== "#"
      }*/


      if (clickedElem.length) {
        base.clickedElem = clickedElem;
        base.changeStateTab(Boolean(base.$el.find(document.activeElement).length));
      }
    } else if (base.options.mode === 'accordion') {
      if (status === 'initiallyOpen') {
        //only possible on first load
        //TODO: Open ALL initial headings, not just the first
        clickedElem = base.initialAccordionHeadings;
      } else if (status === 'opened') {
        if (prevStatus !== 'initiallyOpen' || !base.hasActiveTab(hash)) {
          clickedElem = base.getHeadingFromHash(hash);
        }
      }

      if (clickedElem.length) {
        base.clickedElem = clickedElem;
        base.changeStateAccordion('opened');
        if (!base.options.scrolling.scrollToControlElementAfterOpen && base.options.hashControlled) {
          // scroll per JS when hashControlled when it is not automatically scrolling after opening
          setTimeout(function () {
            // wait for other accordions to properly close first, if accordionCloseOther is true
            base.scrollToElement(clickedElem.is('button, a') ? clickedElem : clickedElem.find(base.buttons));
          }, base.options.accordionCloseOther ? base.options.accordionAnimationDuration : 0);
        }
      }
    }

    base.popStateTriggered = false;
  },

  changeStateHash: function (newHash, status, replace) {
    var base = this,
      hash = location.hash || '#',
      hashLess = location.href.split('#')[0],
      newStatus,
      globalState;
    // backwards compatibility; not strictly necessary as outside code isn't supposed to call this
    if (typeof newHash !== 'string' && $(newHash).is('[href]')) {
      base.changeStateHash(base.getHashFromLink(newHash), ...[].slice.call(arguments, 1));
      return;
    }

    globalState = $.extend({}, history.state);
    globalState.hash = newHash;
    globalState.status = status;

    if (!base.popStateTriggered && !replace) {
      if (base.options.mode === 'tabs') {
        if (hash !== newHash) {
          history.pushState(globalState, document.title, hashLess + newHash);
          $(window).trigger('gsb-hash-push', [base, newHash, status]);
          base.lastHash = newHash;
          base.lastStatus = status;
        }
      } else if (base.options.mode === 'accordion') {
        if (status === 'closed') {
          history.pushState(globalState, document.title, hashLess + '#');
          $(window).trigger('gsb-hash-push', [base, '#', status]);
          base.lastHash = '#';
          base.lastStatus = status;
        } else {
          history.pushState(globalState, document.title, hashLess + newHash);
          $(window).trigger('gsb-hash-push', [base, newHash, status]);
          base.lastHash = newHash;
          base.lastStatus = status;
        }
      }
    } else if (replace) {
      history.replaceState(globalState, document.title);
    }
  },

  hasActiveTab: function (hash) {
    var base = this,
      tab = base.getTabFromHash(hash);
    return Boolean(tab.filter('.active-control').length);
  },

  /**
   * @method changeStateAccordion
   * @param {Object} elem - Geklicktes Element
   * @desc Passt den title des headingElements je Status an (geöffnet/geschlossen)
   */
  changeAccordionHeadingTitle: function (elem) {
    var base = this;

    if (elem.hasClass('active-control') && base.options.accordionHeadingTitleOpened) {
      elem.attr('title', base.options.accordionHeadingTitleOpened);
    } else if (!elem.hasClass('active-control') && base.options.accordionHeadingTitleClosed) {
      elem.attr('title', base.options.accordionHeadingTitleClosed);
    }
  },

  /**
   * @method changeStateAccordion
   * @desc Open-/Close-States Accordion
   */
  changeStateAccordion: function (targetStatus) {
    var base = this,
      contentElement,
      button,
      singleOpen,
      status;

    if (base.options.accordionElementToOpen) {
      contentElement = $(base.options.accordionElementToOpen);
    } else {
      contentElement = base.clickedElem.next();
    }

    button = base.buttons.eq(contentElement.prop('gsb_aria_index'))[0];
    singleOpen = !base.options.accordionCloseOther;

    if (base.clickedElem.hasClass('inactive-control') || targetStatus === 'opened') {
      if (base.options.accordionCloseOther && !base.options.accordionElementToOpen) {
        var activeControl = base.$el.find(base.options.heading).not(base.clickedElem).filter('.active-control');
        base.animationAccordion(activeControl.next(), 'close', function () {
          if (base.options.scrolling.scrollToControlElementAfterOpen) {
            base.scrollToElement($(button));
          }
        });
        activeControl.removeClass('active-control').addClass('inactive-control');
      }
      if (base.clickedElem.hasClass('inactive-control')) {
        base.clickedElem.removeClass('inactive-control').addClass('active-control');
        base.animationAccordion(contentElement, 'open', function () {
          base.aria.updateAria(button, true, singleOpen);
        });
      }
      if (!base.options.accordionCloseOther && !base.options.accordionElementToOpen) {
        if (base.options.scrolling.scrollToControlElementAfterOpen) {
          base.scrollToElement($(button));
        }
      }

      status = 'opened';
    } else if (!base.options.accordionCloseOther || !base.options.accordionNoClose || targetStatus === 'closed') {
      base.clickedElem.removeClass('active-control').addClass('inactive-control');
      base.animationAccordion(contentElement, 'close', function () {
        base.aria.updateAria(button, false, singleOpen);
      });
      status = 'closed';
    }

    if (base.options.hashControlled) {
      if (contentElement.attr('id')) {
        base.changeStateHash('#' + contentElement.attr('id'), status, false);
      } else {
        console.error(base.module, 'contentElement', contentElement, 'without id inside a hash-controlled Accordion');
      }
    }

    base.changeAccordionHeadingTitle(base.clickedElem);

  },

  /**
   * @method changeStateTab
   * @desc Open-/Close-States Tab
   */
  changeStateTab: function (hasFocus) {
    var base = this,
      panelToOpen = base.$el.find(base.options.tabContainer).find('.' + base.getSwitchPanelClass(base.clickedElem)),
      panelToClose;

    if (base.clickedElem.hasClass('inactive-control')) {
      panelToClose = base.$el.find('.' + base.options.panelOpenedClass);
      base.aria.updateAria(base.clickedElem[0], true, false);
      panelToClose.removeClass(base.options.panelOpenedClass).addClass(base.options.panelClosedClass);
      base.$el.find(base.options.tabControls).filter('.active-control').removeClass('active-control').addClass('inactive-control');
      panelToOpen.removeClass(base.options.panelClosedClass).addClass(base.options.panelOpenedClass);
      base.clickedElem.removeClass('inactive-control').addClass('active-control');
      base.animationTab(panelToClose, panelToOpen);
      if (base.options.hashControlled) {
        base.changeStateHash('#' + panelToOpen.attr('id'), 'opened');
      }
    }

    if (hasFocus) {
      base.clickedElem.focus();
    }
  },

  show: function ($elements) {
    var base = this,
      customShow = base.options.show;

    if (typeof customShow !== 'function') {
      $elements.show();
    } else {
      $elements.toArray().forEach(customShow);
    }
  },

  hide: function ($elements) {
    var base = this,
      customHide = base.options.hide;

    if (typeof customHide !== 'function') {
      $elements.hide();
    } else {
      $elements.toArray().forEach(customHide);
    }
  },

  /**
   * @method animationAccordion
   * @desc Animation für OpenClose des Accordions
   *
   * @param elem {Object} Element welches animiert werden soll
   * @param type Art der Animation - {string} open / close
   */
  animationAccordion: function (elem, type, callback) {
    var base = this;

    if (type === 'open') {
      elem.hide().animate({ height: 'toggle' }, { duration: base.options.accordionAnimationDuration }).promise().done(callback, function () {
        base.show(this);

        if (base.options.accordionElementToOpen) {
          base.addA11y(elem);
        }
        base.$el.trigger('afterAnimationOpen.toggle.gsb', $(elem).prev());
      });
    } else {
      elem.show().animate({ height: 'toggle' }, { duration: base.options.accordionAnimationDuration }).promise().done(callback, function () {
        base.hide(this);
        base.$el.trigger('afterAnimationClose.toggle.gsb', $(elem).prev());
      });
    }
  },

  /**
   * @method animationTab
   * @desc Animation für OpenClose des Tabs
   *
   * @param panelToClose {Object} Element welches animiert werden soll (ausblenden)
   * @param panelToOpen {Object} Element welches animiert werden soll (einblenden)
   */
  animationTab: function (panelToClose, panelToOpen) {
    var base = this;

    if (base.options.animateTab) {
      panelToClose.fadeOut('slow', function () {
        panelToOpen.fadeIn('slow', function () {
          base.show(this);
        });
      });
    } else {
      base.hide(panelToClose);
      base.show(panelToOpen);

      if (typeof base.options.afterChange === 'function') {
        base.options.afterChange.call($(this), base.$el);
      }
    }
  },

  /**
   * @method autoplay
   * @desc Autoplay
   */
  autoplay: function () {
    var base = this;

    if (base.$el.find('> button').length === 0) {
      var button = document.createElement('button');
      button.className = 'paused';
      var image = document.createElement('img');
      image.src = base.options.playButtonImagePlaying;
      image.alt = base.options.playButtonAltTextPlaying; // playbutton = base.$el.append($(button).append(image));
    }

    base.playbutton = base.$el.find('button.paused');
    base.playbutton.on('click autoplayStart', function (e) {
      e.preventDefault();
      e.stopPropagation();

      if (base.playbutton.hasClass('paused')) {
        $(this).removeClass('paused').addClass('played');
        base.autoplayStart();
        base.changeStatePlayPause(base.options.playButtonImagePlaying, base.options.playButtonAltTextPlaying);
        base.isPaused = false;

        if (e.type !== 'autoplayStart') {
          //Damit nach Starten des Autoplays nicht nochmal autoplayStart von mouseleave aufgerufen wir
          base.isClicked = true;
        }
      } else {
        $(this).addClass('paused').removeClass('played');
        base.autoplayStop();
        base.changeStatePlayPause(base.options.playButtonImagePaused, base.options.playButtonAltTextPaused);
        base.isPaused = true;
      }
    });

    // Stop bei Hover
    if (base.options.pauseOnHover) {
      base.$el.on('mouseenter mouseleave', function (e) {
        if (!base.isPaused) {
          if (e.type === 'mouseenter') {
            base.autoplayStop();
          } else {
            if (base.playbutton.hasClass('played') && !base.isClicked) {
              base.autoplayStart();
            }

            base.isClicked = false;
          }
        }
      });
    }

    //play bei start
    if (base.options.playOnLoad) {
      base.playbutton.trigger('autoplayStart');
    }

    base.autoplayInitialized = true;
  },

  /**
   * @method autoplayStart
   * @desc Autoplay start
   */
  autoplayStart: function () {
    var base = this;
    base.rotation = setInterval(function () {
      var tabControls = base.$el.find(base.options.tabControls),
        activeTab = tabControls.find('active-control'),
        activeIndex = tabControls.index(activeTab),
        lastIndex = tabControls.length - 1; //Wenn letzter Tab, wieder beim ersten anfangen

      if (activeIndex >= lastIndex) {
        tabControls.first().click();
      } else {
        tabControls.eq(activeIndex + 1).click();
      }
    }, base.options.autoSpeed);
  },

  /**
   * @method autoplayStop
   * @desc Autoplay stop
   */
  autoplayStop: function () {
    var base = this;
    clearInterval(base.rotation);
  },

  makeAccessible: function () {
    var base = this,
      tabControlContainer,
      tabListHeading,
      tabs,
      headings,
      clonedHeadings,
      buttons,
      contentPanels;

    if (!base.aria) {
      tabControlContainer = base.$el.find(base.options.tabControlContainer);
      tabListHeading = base.$el.find(base.options.tabListHeading);

      if (!tabListHeading.length) {
        tabListHeading = tabControlContainer.prev(base.options.semanticHeading);
      }

      tabs = base.$el.find(base.options.tabControls);
      headings = base.$el.find(base.options.heading);
      contentPanels = base.$el.find(base.options.elements);

      if (base.findAllUsedModes().includes('tabs')) {
        clonedHeadings = headings.filter(base.options.semanticHeading).map(function (i, originalHeading) {
          const clonedHeading = $(document.createElement(originalHeading.tagName));
          clonedHeading.
          html($(originalHeading).html()).
          addClass(base.options.clonedHeadingClass).
          prependTo(contentPanels.eq(i));
          return clonedHeading[0];
        });
      } else {
        clonedHeadings = $();
      }

      buttons = headings.map(function () {
        var heading = $(this),
          links,
          button;

        if (!heading.is('button, a')) {
          links = heading.find('a');
          if (links.length) {
            button = links.first().
            attr('role', 'button');
          } else {
            button = $('<button/>').append(heading.contents());
            heading.append(button);
            heading.attr('data-transformedbytoggle', 'true');
          }
        } else {
          button = heading;
        }

        return button[0];
      });
      base.tabs = tabs;
      base.headings = headings;
      base.clonedHeadings = clonedHeadings;
      base.contentPanels = contentPanels;
      base.buttons = buttons;
      base.aria = gsb.aria(base.el, {}, $.extend({}, base.ariaParams, {
        types: {
          tabListHeading: tabListHeading,
          tabControlContainer: tabControlContainer,
          button: buttons,
          content: contentPanels,
          tab: tabs
        }
      }));

      headings.each(function (i) {
        if ($(this).hasClass('active-control')) {
          base.aria.updateAria(buttons[i], true, true);
          base.show(contentPanels.eq(i));
        }
      });
      tabs.each(function (i) {
        if ($(this).hasClass('active-control')) {
          base.aria.updateAria(tabs[i], true, true);
          base.show(contentPanels.eq(i));
        }
      });

      tabs.parentsUntil(tabControlContainer).attr('role', 'none');
    }
  },

  ariaParams: {
    initial: [{
      _type: 'tabListHeading',
      id: function id(base) {
        return base.generateID();
      }
    }, {
      _type: 'tabControlContainer',
      role: 'tablist',
      'aria-labelledby': function ariaLabelledby(base) {
        if (base.types['tabControlContainer'].eq(0).attr('aria-label')) {
          return null; //delete labelledby
        } else if (base.types['tabControlContainer'].eq(0).attr('aria-labelledby')) {
          return undefined; //do nothing
        } else {
          return base.types['tabListHeading'].eq(0).attr('id') || null;
        }
      }
    }, {
      _type: 'content',
      role: function role(base, index) {
        return base.types['content'].eq(index).attr('role') || 'tabpanel';
      },
      id: function id(base, index) {
        return base.types['content'].eq(index).attr('id') || base.generateID();
      }
    }, {
      _type: 'tab',
      role: 'tab',
      id: function id(base) {
        return base.generateID();
      },
      'aria-controls': function ariaControls(base, index) {
        return base.types['content'].eq(index).attr('id');
      },
      'href': function href(base, index) {
        var tab = base.types['tab'].eq(index),
          contId = base.types['content'].eq(index).attr('id'),
          hashLess = location.href.split('#')[0];
        if (tab.is('a')) {
          return tab.attr('href') || hashLess + '#' + contId;
        } else {
          return null;
        }
      }
    }, {
      _type: 'button',
      id: function id(base) {
        return base.generateID();
      },
      'aria-controls': function ariaControls(base, index) {
        return base.types['content'].eq(index).attr('id');
      }
    }, {
      _type: 'content',
      'aria-labelledby': function ariaLabelledby(base, index) {
        return base.types['tab'].eq(index).attr('id') || base.types['button'].eq(index).attr('id');
      }
    }],
    toggles: {
      tab: {
        'aria-selected': ['true', 'false'],
        tabindex: [0, -1]
      },
      button: {
        'aria-expanded': ['true', 'false']
      },
      content: {
        hidden: [null, 'hidden']
      }
    }
  },

  //focuses next tabbable element outside the widget
  focusNextTabbable: function () {
    var base = this,
      allTabbables = $(base.options.tabbables).not('[tabindex=-1]'),
      lastIndex = allTabbables.length - 1,
      tabbablesInside = base.$el.find(base.options.tabbables).not('[tabindex=-1]'),
      firstIndexOutside = allTabbables.index(tabbablesInside.last()) + 1;
    allTabbables.eq(firstIndexOutside > lastIndex ? 0 : firstIndexOutside).focus();
  },

  //focuses previous tabbable element outside the widget
  focusPrevTabbable: function () {
    var base = this,
      allTabbables = $(base.options.tabbables).not('[tabindex=-1]'),
      tabbablesInside = base.$el.find(base.options.tabbables).not('[tabindex=-1]'),
      firstIndexOutside = allTabbables.index(tabbablesInside.first()) - 1;
    allTabbables.eq(firstIndexOutside < 0 ? -1 : firstIndexOutside).focus();
  },

  activatePrevTab: function () {
    var base = this,
      tabs = base.tabs,
      activeTab = tabs.filter('.active-control'),
      activeIndex = tabs.index(activeTab);

    if (activeIndex - 1 > -1) {
      tabs.eq(activeIndex - 1).trigger('activateTab');
    } else {
      tabs.last().trigger('activateTab');
    }
  },

  activateNextTab: function () {
    var base = this,
      tabs = base.tabs,
      activeTab = tabs.filter('.active-control'),
      activeIndex = tabs.index(activeTab);

    if (activeIndex + 1 < tabs.length) {
      tabs.eq(activeIndex + 1).trigger('activateTab');
    } else {
      tabs.first().trigger('activateTab');
    }
  },

  onKeyTab: function (ev) {
    var base = ev.data;
    base.tabs = base.$el.find(base.options.tabControls);

    switch (ev.key) {
      case 'ArrowLeft':
      case 'Left':
        // IE/Edge
        base.activatePrevTab();
        break;

      case 'ArrowRight':
      case 'Right':
        // IE/Edge
        base.activateNextTab();
        break;

      case 'Home':
        base.tabs.first().trigger('activateTab');
        break;

      case 'End':
        base.tabs.last().trigger('activateTab');
        break;

      default:
        //skip preventDefault etc.
        return;
    }

    ev.stopPropagation();
    ev.preventDefault();
  },

  tabKeyboardCtrl: function () {
    var base = this,
      eventString = 'keydown.gsb_toggle';
    base.$el.off(eventString, base.onKeyAcc);
    base.$el.on(eventString, base, base.onKeyTab);
  },

  refreshTab: function () {
    throw new Error(
      "refreshTab() ist obsolet." +
      " onRefresh() zu überschreiben ist nicht mehr nötig, um den Typ des Toggles festzulegen." +
      " Dies geschieht jetzt über die Option 'mode' (mit Wert 'tabs' für Tabs)." +
      " Diese Option ist auch in Breakpoints erlaubt."
    );
  },

  /**
   * @method switchToTabs
   * @desc Switch to tabs mode
   */
  switchToTabs: function () {
    var base = this,
      activeTab;

    base.contentPanels.attr('role', 'tabpanel');
    base.tabKeyboardCtrl();

    if (base.options.hashControlled) {
      base.onPopState('opened');
    } else {
      activeTab = base.tabs.filter('[aria-selected=true]');
      if (activeTab.length) {
        base.clickedElem = activeTab;
        base.changeStateTab();
      }
    }

    base.$el.find(base.options.heading).each(function () {
      $(this).removeAttr('aria-expanded');
    }); // Autoplay muss deaktiviert sein, da die Events focusin und focusout im Firefox derzeit nocht nicht implementiert
    // sind bzw. noch bugs enthalten

    if (base.options.changeOnHover && !base.options.autoplay) {
      base.$el.on('mouseenter focus', base.options.tabControls, function (e) {
        base.clickedElem = $(this);
        base.changeStateTab();
      });
    }

    base.hide(base.$el.find('.' + base.options.panelClosedClass));
    base.show(base.$el.find('.' + base.options.panelOpenedClass));
  },

  focusPrevHeading: function () {
    var base = this,
      buttons = base.buttons,
      activeButton = buttons.filter(document.activeElement),
      activeIndex = buttons.index(activeButton);

    if (activeIndex - 1 > -1) {
      buttons.eq(activeIndex - 1).focus();
    } else {
      buttons.last().focus();
    }
  },

  focusNextHeading: function () {
    var base = this,
      buttons = base.buttons,
      activeButton = buttons.filter(document.activeElement),
      activeIndex = buttons.index(activeButton);

    if (activeIndex + 1 < buttons.length) {
      buttons.eq(activeIndex + 1).focus();
    } else {
      buttons.first().focus();
    }
  },

  onKeyAcc: function (ev) {
    var base = ev.data;

    if (!base.options.accordionDisableKeyboardCtrl) {
      switch (ev.key) {
        case 'ArrowUp':
        case 'Up':
          // IE/Edge
          base.focusPrevHeading();
          break;

        case 'ArrowDown':
        case 'Down':
          // IE/Edge
          base.focusNextHeading();
          break;

        case 'Home':
          base.buttons.first().focus();
          break;

        case 'End':
          base.buttons.last().focus();
          break;

        default:
          //skip preventDefault etc.
          return;
      }

      ev.preventDefault();
    }
  },

  accKeyboardCtrl: function () {
    var base = this,
      eventString = 'keydown.gsb_toggle';
    base.$el.off(eventString, base.onKeyTab); // remove listener for tabs
    base.$el.off(eventString, base.onKeyAcc); // avoid duplicate listener
    base.$el.on(eventString, base, base.onKeyAcc);
  },

  refreshAccordion: function () {
    throw new Error(
      "refreshAccordion() ist obsolet." +
      " onRefresh() zu überschreiben ist nicht mehr nötig um den Typ des Toggles festzulegen." +
      " Dies geschieht jetzt über die Option 'mode' (mit Wert 'accordion' für Akkordeon)." +
      " Der Default-Modus in allen Größen ist 'accordion'." +
      " Diese Option ist auch in Breakpoints erlaubt."
    );
  },

  /**
   * @method switchToAccordion
   * @desc  Switch to accordion mode
   */
  switchToAccordion: function () {
    var base = this;

    if (base.contentPanels.is('div') || base.contentPanels.is('span')) {
      base.contentPanels.attr('role', 'region');
    }
    base.accKeyboardCtrl();
    base.$el.find(base.options.elements).each(function () {
      var $elem = $(this);

      if ($elem.is('[hidden]')) {
        $elem.prev('.active-control').removeClass('active-control').addClass('inactive-control');
      } else {
        $elem.prev('.inactive-control').removeClass('inactive-control').addClass('active-control');
      }
    });

    if (base.options.hashControlled) {
      base.onPopState('opened');
    }

    base.$el.find(base.options.heading).each(function () {
      if ($(this).hasClass('inactive-control')) {
        base.hide($(this).next());
      }
    });

    let activeDescendant = base.$el.find(document.activeElement);
    if (activeDescendant.length > 0) {
      base.tabs.each(function (i, el) {
        let tab = $(el);
        if (tab.is(activeDescendant) || tab.find(activeDescendant).length) {
          base.buttons.eq(tab.prop('gsb_aria_index')).focus();
        }
      });
    }
  },

  /**
   * @method changeStatePlayPause
   * @param {string} imgsrc - Imagesource-Link
   * @param {string} alt - Alt-Text des Images
   * @desc Bild tauschen für Play/Pausebutton
   */
  changeStatePlayPause: function (imgsrc, imgalt) {
    var base = this;
    var image = base.playbutton.find('img');
    image.prop('alt', imgalt).prop('src', imgsrc);
  },

  /**
   * @method getSwitchPanelClass
   * @param {Object} elem - geklicktes Element (durchgereicht von changeState oder autoplayStart)
   * @desc Liefert die switch-panel Klasse des geklickten Elements
   */
  getSwitchPanelClass: function (elem) {
    return $.grep(elem.prop('class').split(' '), function (value) {
      return value.indexOf('switch-panel') > -1;
    });
  },

  uninitAccordion: function () {
    throw new Error(
      "uninitAccordion() ist obsolet." +
      " uninitAccordion() aufzurufen ist nicht mehr nötig um den Typ des Toggles festzulegen." +
      " Dies geschieht jetzt über die Option 'mode' (mit Wert 'none' für kein Toggle)."
    );
  },

  /**
   * @method switchToNone
   * @desc Soll den Großteil der DOM-Änderungen durch das Modul rückgängig machen.
   *       Die Klassen active-control und inactive-control sind davon ausgenommen.
   */
  switchToNone: function () {
    var base = this;

    if (base.$el.hasClass('gsb-toggle')) {
      base.$el.removeClass('gsb-toggle');
      base.$el.off('.gsb_toggle'); //entfernt nur namespace='.gsb_toggle' Events

      base.headings.filter(function () {
        return $(this).attr('data-transformedbytoggle') === 'true';
      }).each(function (i) {
        var contents = base.buttons.eq(i).contents();
        $(this).empty().append(contents);
      });
      base.show(base.contentPanels);
      base.contentPanels.removeAttr('hidden role aria-labelledby');
      base.$el.find(base.options.tabControlContainer).removeAttr('role');
      base.tabs.removeAttr('role aria-selected tabindex');
      base.buttons.removeAttr('aria-expanded');
      base.clonedHeadings.remove();
      base.contentPanels.removeClass(base.options.panelOpenedClass + ' ' + base.options.panelClosedClass);
      base.contentPanels.removeClass(function (index, className) {
        return className.match(base.options.switchPanelClass + "\\d*", "g");
      });
      base.aria.$el.data('gsb.aria', null);
      base.aria = null;
    }
  },

  destroyWidget: function () {
    throw new Error(
      "destroyWidget() ist obsolet." +
      " destroyWidget() nicht mehr unterstützt." +
      " Vermutlich genügt es die Option 'mode' (mit Wert 'none' für kein Toggle) zu setzen." +
      " Ein \"echtes\" destroy ist dies jedoch nicht, die Modulinstanz bleibt erhalten."
    );
  },

  /**
   * @method addA11y
   * @desc  setzt den focus auf das erste fokussierbare Element
   * @param elem {jQuery} Element welches nach fokussierbaren Elementen durchsucht wird. Ist mindestens ein Element vorhanden,
   * wird der Fokus gesetzt
   * @param tabPanel {jQuery} Element auf welches gesprungen werden soll, wenn im TabContainer keiner fokussierbaren Element vorhanden sind
   */
  addA11y: function (elem, tabPanel) {
    var base = this;
    elem = elem || base.$el;
    var focusElements = elem.find('input,textarea,select,a,button').not(':hidden');

    if (focusElements.length) {
      focusElements[0].focus();
      focusElements.last().keydown(function (e) {
      });
    }
  },

  /**
   * @method addRichtextContainer
   * @desc Sucht in base.el nach Elementen mit den Klasse startaccordion, endaccordion und accordionheadline (konfigurierbar)
   * und baut die für gsb_toggle benötigte Struktur um diese Elemente herum.
   *
   * Wenn alle benötigten Elemente eingebaut wurden, ruft sich das Script nochmal selbst auf; dann mit der Option richtext := false
   */
  addRichtextContainer: function () {
    var base = this,
      containers;
    containers = base.$el.find(base.options.richtextStart).map(function () {
      var startAcc = $(this),
        rtAccContainer = $(base.options.richtextAccordionContainer, base.el).insertBefore(startAcc),
        rtTabContainer = $(base.options.richtextTabControlContainer, base.el).insertBefore(startAcc),
        headings,
        wrapper;
      startAcc.
      add(startAcc.nextUntil(base.options.richtextEnd)).
      add(startAcc.nextAll(base.options.richtextEnd).first()).
      appendTo(rtAccContainer);
      headings = rtAccContainer.find(base.options.richtextStart).add(rtAccContainer.find(base.options.richtextControl));
      headings.addClass('heading').each(function (i) {
        var heading = $(this),
          nextHeading = headings.eq(i + 1);
        rtTabContainer.append($(base.options.richtextTabControlContainerItem).append($('<a/>').html(heading.html())));
        if (nextHeading.length) {
          heading.nextUntil(nextHeading).wrapAll('<div/>');
        }
      });
      rtAccContainer.find('.heading').last().nextUntil(base.options.richtextEnd).add(rtAccContainer.find(base.options.richtextEnd)).wrapAll('<div/>');
      wrapper = $(base.options.richtextWrapper, base.el).insertBefore(rtTabContainer);

      let usedModes = base.findAllUsedModes();
      if (usedModes.includes('tabs')) {
        wrapper.append(rtTabContainer);
      } else {
        rtTabContainer.remove();
      }
      if (usedModes.includes('accordion')) {
        wrapper.append(rtAccContainer);
      } else {
        headings.remove();
      }
      return wrapper[0];
    });
    base.$el.removeData('gsb.toggle');
    containers.gsb_toggle($.extend({}, base.options, {
      richtext: false
    }));
  },

  defaultOptions: {
    mode: 'accordion', //Möglichkeiten: accordion, tabs, none
    richtext: false,
    richtextWrapper: '<div class="richtext-accordion"/>',
    richtextStart: '.startaccordion',
    richtextControl: '.accordionheadline',
    richtextEnd: '.endaccordion',
    tabContainer: '> .tabs-container',
    tabControls: '> .tabs-list > li a',
    tabControlContainer: '> .tabs-list',
    richtextTabControlContainer: '<ul class="tabs-list"/>',
    richtextTabControlContainerItem: '<li></li>',
    tabListHeading: '',
    elements: '> .tabs-container > div',
    heading: '> .tabs-container > .heading',
    clonedHeadingClass: 'cloned-heading',
    switchPanelClass: 'switch-panel',
    panelOpenedClass: 'panel-opened',
    panelClosedClass: 'panel-closed',
    richtextAccordionContainer: '<div class="tabs-container"/>',
    semanticHeading: 'h1,h2,h3,h4,h5,h6',
    tabbables: 'a[href], area, input, button, select, textarea, audio, video, [tabindex]',
    accordionAnimationDuration: 400,
    accordionCloseOther: true,
    accordionNoClose: false,
    accordionDisableKeyboardCtrl: false,
    accordionPanelHeight: false,
    accordionElementToOpen: null,
    accordionElementsStopPropagation: '',
    hashControlled: false,
    autoplay: false,
    playButtonImagePaused: null,
    playButtonImagePlaying: null,
    playButtonAltTextPaused: typeof PLAY === 'undefined' ? 'Animation starten' : PLAY,
    playButtonAltTextPlaying: typeof PAUSE === 'undefined' ? 'Animation stoppen' : PAUSE,
    accordionHeadingTitleClosed: null,
    accordionHeadingTitleOpened: null,
    autoSpeed: '5000',
    playOnLoad: false,
    pauseOnHover: true,
    changeOnHover: false,
    allOpen: false,
    animateTab: false,
    respondToEvents: true,
    scrolling: {
      scrollOffset: function (referenceElement) {
        return NaN;
      },
      scrollToControlElementAfterOpen: true,
      scrollAnimationDuration: 300,
      scrollOverlaySelector: '.js-header.is-sticky'
    },
    onRefresh: function () {
      this.switchAccordingToMode();
    },
    responsive: []
  }
});

    

   /* Ende gsb_toggle */
   /* Start gsb_tree_navigation */
   
    

    

    /* --GSBDocStart
 * @name: @gsb/gsb_tree_navigation
 * @version: 5.0.2
 * @description: Modul für konfigurierbare Cookiebanner
 * --GSBDocEnd
*/"use strict";
gsb.makeGSBModule('gsb.tree_navigation', {

  init: function init() {
    const base = this;
    base.preInit();
    base.initButtonHandlers();
    base.initCustomEventHandlers();
    base.registerMetaFixerInitialized();
  },

  registerMetaFixerInitialized: function registerMetaFixerInitialized() {
    const base = this;
    base.$el.on('gsb_meta_fixer_initialized', base, base.onMetaFixerInitialized);
  },

  adjustFocus: function adjustFocus($anchor) {
    const base = this;
    base.$el.find('.' + base.options.classes.anchor).find('a, button').not('.' + base.options.buttonClasses.toggle).attr('tabindex', -1);

    if (base.$el.hasClass(base.options.classes.show)) {
      // only make anything tabable when the menu is shown
      if ($anchor.length) {
        const $navigatedBackFrom = $anchor.prevObject;
        // add sibling on the same level, to allow multiple 'ul' on the same level
        $anchor = $anchor.add($anchor.siblings('.' + base.options.cssClasses.anchor_current));
        // only make the currently opened sub menu's links and it's siblings tabable
        const $currentOpenedSubMenuLinks = $anchor.find('a, button').filter((i, e) => !$(e).closest('.' + base.options.classes.anchor).hasClass(base.options.cssClasses.anchor_closed));
        $currentOpenedSubMenuLinks.attr('tabindex', 0);

        // set focus
        if ($navigatedBackFrom) {
          // focus the previously opened menu opener, which opened the menu navigating back from
          $navigatedBackFrom.find('> button').first().attr('tabindex', 0).trigger('focus');
        } else {
          if (window.getComputedStyle($anchor[0]).transitionDuration !== '0s') {
            // if navigateToInner makes the menu slide in, using CSS transition
            // wait for the transition to end and then focus the first menu entry to avoid scrolling
            $anchor.one('transitionend transitioncancel', function () {
              $anchor.find('button,a').first().trigger('focus');
            });
          } else {
            $anchor.find('button,a').first().trigger('focus');
          }
        }

        // fix Meta Navigation
        if (base.options.classes.metaNav) {
          const $metaMenuButtons = base.$el.find(`:not(.${base.options.classes.anchor_closed})`).find('.' + base.options.classes.metaNav).find('a, button');
          if ($metaMenuButtons.length) {
            // metaMenuButtons are visible and should be tabable
            $metaMenuButtons.attr('tabindex', '0');
          } else {
            base.$el.find('.' + base.options.classes.metaNav).find('a, button').attr('tabindex', '-1');
          }
        }

      } else {
        // make everything tabbable
        const $allButtonsAndLinks = base.$el.find('a, button');

        $allButtonsAndLinks.filter('[tabindex="-1"]').
        attr('tabindex', 0);

        $allButtonsAndLinks.
        first().trigger('focus');

      }
    } else {
      const nodes = base.$el.find('.' + base.options.classes.node);
      nodes.find('> button[disabled]').
      removeAttr('disabled');
      nodes.siblings().
      removeClass(base.options.cssClasses.anchor_closed);

      base.$el.find('.' + base.options.classes.anchor).
      css('height', '');
    }
  },

  adjustHeight: function adjustHeight(anchor, button) {
    const base = this;
    if (base.options.mode === 'overlay') {
      let $anchor = $(anchor);
      const $openedUls = base.$el.find('.' + base.options.classes.anchor + '.' + base.options.cssClasses.anchor_opened + ':visible');

      // If navigating back, switch to next ul parent
      if ($(button).length < 1) {
        $anchor = $anchor.parent().closest('.' + base.options.classes.anchor);
      }

      let maxHeight = 0;
      // Find maximal natural height of an element
      $openedUls.css({ height: 'auto' });
      $openedUls.each(function () {
        if ($(this).outerHeight(true) > maxHeight) {
          maxHeight = $(this).outerHeight(true);
        }
      });

      $openedUls.each(function () {
        $(this).css({
          height: maxHeight,
          overflow: 'hidden'
        });
      });
      base.adjustFocus($anchor);
      base.$el.trigger('height_adjusted.tree_navigation.gsb');
    }
  },


  onMetaFixerInitialized: function onMetaFixerInitialized(ev) {
    const base = ev.data;
    const nnId = $('body').data('nn');
    var $openElement = $(`#nn-${nnId}`);
    if ($openElement.length > 0) {
      const $uls = $openElement.parents('ul');
      const buttons = [];
      $uls.each(function () {
        let button = $(this).prev('button');
        if (button.length < 1) {
          button = $(this).closest(`.${base.options.classes.node}`).find('button')[0];
        }
        buttons.unshift(button);
      });

      if (base.options.openSubNavForCurrentNode) {
        const button = $openElement.find('button').first();
        buttons.unshift(button);
      }

      for (let i = 0; i < buttons.length; i++) {
        const currentButton = buttons[i];
        base.navigateToInner(currentButton);
      }
      base.$el.trigger('gsb_tree_navigation_open_node', buttons[buttons.length]);
    }
    return $openElement;
  },

  preInit: function preInit() {
    const base = this;
    const tnOptions = base.options;
    base.$el.gsb_responsiveListener(base);

    // initial state
    const initialOpen = tnOptions.states.initStateOpen;
    base.toggleMenuSet(initialOpen, false);

    base.resetState();

    if (tnOptions.optional.setMaxAnchorHeight) {
      let height = 0;
      base.$el.find('.' + tnOptions.classes.anchor).each(function (i, element) {
        const currHeight = $(element).outerHeight(true);
        if (currHeight > height) {
          height = currHeight;
        }
      });
      base.$el.find('.' + tnOptions.classes.anchor).each(function (i, element) {
        $(element).css({ height: height });
      });
    }

    // set initial aria-expanded for toggle to open the menu
    base.$el.find('.' + tnOptions.buttonClasses.toggle).first().attr('aria-expanded', initialOpen);
  },


  initButtonHandlers: function initButtonHandlers() {
    const base = this;
    const tnOptions = base.options;

    // handle menu
    {
      // display
      base.$el.find('.' + tnOptions.buttonClasses.toggleOn).first().on('click', function (e) {
        base.toggleMenuSet(true);
        base.toggleClass(base.$el.find('.' + tnOptions.buttonClasses.toggle).first(), true, tnOptions.cssClasses.toggleClass_opened, tnOptions.cssClasses.toggleClass_closed);
        base.$el.find('.' + tnOptions.buttonClasses.toggle).first().attr('aria-expanded', true);
      });

      // hide
      base.$el.find('.' + tnOptions.buttonClasses.toggleOff).first().on('click', function (e) {
        base.toggleMenuSet(false);
        base.toggleClass(base.$el.find('.' + tnOptions.buttonClasses.toggle).first(), false, tnOptions.cssClasses.toggleClass_opened, tnOptions.cssClasses.toggleClass_closed);
        base.$el.find('.' + tnOptions.buttonClasses.toggle).first().attr('aria-expanded', false);
      });

      // toggle
      base.$el.find('.' + tnOptions.buttonClasses.toggle).first().on('click.toggle.tree_navigation.gsb', function (e) {
        const setOpen = $(base.el).hasClass(tnOptions.classes.hide);
        base.toggleMenuSet(setOpen);
        base.toggleClassesIf(base.el, tnOptions.classes.show, this, tnOptions.cssClasses.toggleClass_opened, tnOptions.cssClasses.toggleClass_closed);
        $(this).attr('aria-expanded', setOpen);
      });
    }
    // navigate to inner level
    base.$el.find('.' + tnOptions.buttonClasses.navigateToInner).on('click', function (e) {
      base.navigateToInner(this);
    });

    if (tnOptions.states.navBackButton) {
      // go back one level
      base.$el.find('.' + tnOptions.buttonClasses.navigateBack).on('click', function (e) {
        base.navigateBack(this);
      });
    }
  },

  initCustomEventHandlers: function initCustomEventHandlers(base = this) {
    // close toggle (triggered when gsb_mobile_nav_service_search is opened)
    $(document).on('close.toggle.tree_navigation.gsb', base, function (ev, base = ev.data) {
      base.toggleMenuSet(false);
      base.toggleClassesIf(base.el, false, base.$el.find('.' + base.options.buttonClasses.toggle).first(), base.options.cssClasses.toggleClass_opened, base.options.cssClasses.toggleClass_closed);
      base.$el.find('.' + base.options.buttonClasses.toggle).first().attr('aria-expanded', false);
    });
  },

  // ---------------------------------------------------

  resetState: function resetState() {
    const base = this;
    const tnOptions = base.options;
    base.hideAllAnchorsButFirstLevel();
    // hide all nodes
    $(base.el).find('.' + tnOptions.classes.node).each(function (i, node) {
      $(node).removeClass(tnOptions.cssClasses.node_opened);
      $(node).addClass(tnOptions.cssClasses.node_closed);
      $(node).find('button').not('.' + tnOptions.buttonClasses.navigateBack).attr('aria-expanded', false); // set initial aria-expanded to false
    });
    // set all navigateToInner buttons -> closed
    $(base.el).find('.' + tnOptions.buttonClasses.navigateToInner).each(function (i, button) {
      $(button).removeClass(tnOptions.cssClasses.navigateToInner_opened);
      $(button).addClass(tnOptions.cssClasses.navigateToInner_closed);
    });
  },

  hideAllAnchorsButFirstLevel: function hideAllAnchorsButFirstLevel() {
    const base = this;
    const tnOptions = base.options;
    const $firstLevelAnchors = $(base.el).find('.' + tnOptions.classes.anchor).filter(function (index, anchor) {
      return $(anchor).parent().closest('.' + tnOptions.classes.anchor).length === 0;
    });
    const $deeperLevelAnchors = $(base.el).find('.' + tnOptions.classes.anchor).not($firstLevelAnchors);
    $firstLevelAnchors.addClass(tnOptions.cssClasses.anchor_opened).removeClass(tnOptions.cssClasses.anchor_closed);
    base.setAnchorCurrentClass($firstLevelAnchors, true); // only overlay mode
    $deeperLevelAnchors.addClass(tnOptions.cssClasses.anchor_closed).removeClass(tnOptions.cssClasses.anchor_opened);
  },

  trapFocus: function trapFocus() {
    const base = this;
    base.focusTrapIsEngaged = true;
    $(base.$el).add('.' + base.options.buttonClasses.toggle).on('focusout', { base }, function (e) {
      const base = e.data.base;
      setTimeout(() => {
        const toggleIsFocused = $(e.target).hasClass(base.options.buttonClasses.toggle) || $(e.target).hasClass(base.options.buttonClasses.toggleOff);

        if (base.focusTrapIsEngaged) {
          if (toggleIsFocused) {
            if ($(e.target).next().find(e.relatedTarget).length === 0) {
              base.focusTrapIsEngaged = false;
            }
          }
          const $focusedElement = $(document.activeElement);
          if ($focusedElement.closest(base.$el).length || $focusedElement[0] === base.$el.find('.' + base.options.buttonClasses.toggle).first()[0]) {
          } else {
            base.$el.find('.' + base.options.buttonClasses.toggle).first()[0].focus();
          }
        } else {
          if ($(e.target).next().find(e.relatedTarget).length > 0) {
            base.focusTrapIsEngaged = true;
          }
        }
      }, 0);
    });
  },

  openNode: function openNode(open, anchor, button, node) {
    const base = this;

    base.setAnchor(anchor, open);
    base.setButton(button, open);
    base.setNode(node, open);
    base.$el.trigger('gsb_tree_navigation_open_node', button);
  },
  navigateToInner: function navigateToInner(button) {
    const base = this;
    const tnOptions = base.options;
    let open = tnOptions.states.navOpenOnly;

    const anchor = $(button).siblings('.' + tnOptions.classes.anchor);
    const node = $(button).parents('.' + tnOptions.classes.node).first();

    if (!tnOptions.states.navOpenOnly) {
      open = $(node).hasClass(tnOptions.cssClasses.node_closed);
    }

    if (tnOptions.mode === 'overlay') {
      node.siblings().addClass(tnOptions.cssClasses.anchor_closed);
    }

    base.openNode(open, anchor, button, node);
    base.adjustHeight(anchor, button);
  },
  navigateBack: function navigateBack(backButton) {
    const base = this;
    const tnOptions = base.options;

    const anchor = $(backButton).parents('.' + tnOptions.classes.anchor).first();
    const button = $(backButton).siblings('.' + tnOptions.buttonClasses.navigateToInner);
    const node = $(backButton).parents('.' + tnOptions.classes.node).first();
    base.$el.trigger('gsb_tree_navigation_navigate_back', backButton);

    base.setAnchor(anchor, false);
    base.setButton(button, false);
    base.setButton(anchor.siblings('button'), false);
    if (tnOptions.mode === 'overlay') {
      node.siblings().removeClass(tnOptions.cssClasses.anchor_closed);
    }
    base.setNode(node, false);
    base.adjustHeight(anchor, button);
  },
  toggleMenuSet: function toggleMenuSet(open, adjustFocus = true) {
    const base = this;
    const tnOptions = base.options;
    if (open) {
      base.resetState();
      base.$el.trigger('beforeOpen.tree_navigation.gsb', base);
      $('body').removeClass(tnOptions.classes.bodyMenuClosed).addClass(tnOptions.classes.bodyMenuOpened);
      base.trapFocus(); // engage focus trap
      base.toggleClass($(base.el), open, tnOptions.classes.show, tnOptions.classes.hide); // show menu

      const $anchor = base.$el.find(' > .' + base.options.classes.anchor);
      const $node = $anchor.find(' > .' + base.options.classes.node);
      base.adjustHeight($anchor, $node); // needed if the menu has been opened and navigated before
      base.$el.trigger('afterOpen.tree_navigation.gsb', base);
    } else {
      base.$el.trigger('beforeClose.tree_navigation.gsb', base);
      $('body').removeClass(tnOptions.classes.bodyMenuOpened).addClass(tnOptions.classes.bodyMenuClosed);
      base.hideAllAnchorsButFirstLevel();

      // disengage focus trap
      base.focusTrapIsEngaged = false;
      $(base.$el).add('.' + base.options.buttonClasses.toggle).off('focusout');

      base.toggleClass($(base.el), open, tnOptions.classes.show, tnOptions.classes.hide);
      base.$el.trigger('afterClose.tree_navigation.gsb', base);
    }
    if (adjustFocus) {
      const $openElement = base.onMetaFixerInitialized({ data: base });
      if (base.options.mode === 'overlay') {
        const $focusElement = $openElement ? $openElement.closest('ul') : $(base.$el.find('.' + base.options.classes.anchor).first());
        base.adjustFocus($focusElement);
      }
    }
  },

  setAnchorCurrentClass: function setAnchorCurrentClass(element, open) {
    const base = this;
    const tnOptions = base.options;
    if (tnOptions.mode === 'overlay') {
      base.$el.find('.' + tnOptions.classes.anchor).removeClass(tnOptions.cssClasses.anchor_current);
      if (open) {
        const $siblings = element.siblings('.' + tnOptions.classes.anchor);
        element.add($siblings).addClass(tnOptions.cssClasses.anchor_current);
      } else {
        const $parentAnchor = element.parent().closest('.' + tnOptions.classes.anchor);
        const $siblingAnchors = $parentAnchor.siblings('.' + tnOptions.classes.anchor);
        $parentAnchor.add($siblingAnchors).addClass(tnOptions.cssClasses.anchor_current);
      }
    }
  },

  setAnchor: function setAnchor(element, open) {
    const base = this;
    const tnOptions = base.options;
    base.setAnchorCurrentClass(element, open); // only overlay mode
    base.toggleClass(element, open, tnOptions.cssClasses.anchor_opened, tnOptions.cssClasses.anchor_closed);
  },
  setButton: function setButton(button, open) {
    const base = this;
    const tnOptions = base.options;
    base.toggleClass(button, open, tnOptions.cssClasses.navigateToInner_opened, tnOptions.cssClasses.navigateToInner_closed);
    const $button = $(button);

    $button.attr('aria-expanded', open);

    if (tnOptions.mode === 'overlay') {
      if ($button.attr('disabled')) {
        $button.removeAttr('disabled');
      } else {
        $button.attr('disabled', 'true');
      }
    }
  },
  setNode: function setNode(node, open) {
    const base = this;
    const tnOptions = base.options;
    base.toggleClass(node, open, tnOptions.cssClasses.node_opened, tnOptions.cssClasses.node_closed);
  },
  toggleClassesIf: function toggleClassesIf(element, hasClass, thenElement, addClass, removeClass) {
    const base = this;
    base.toggleClass(thenElement, $(element).hasClass(hasClass), addClass, removeClass);
  },

  // --------------------- methods ---------------------
  toggleClass: function toggleClass(element, condition, addClass, removeClass) {
    const base = this;
    if (condition) {
      base.setClass(element, condition, addClass, removeClass);
    } else {
      base.setClass(element, !condition, removeClass, addClass);
    }
  },
  setClass: function setClass(element, condition, addClass, removeClass) {
    if (condition) {
      $(element).addClass(addClass);
      $(element).removeClass(removeClass);
    }
  },

  defaultOptions: {
    mode: 'explorer', // Der Modus in welchem das Modul laufen soll. Entweder 'explorer' oder 'overlay'
    openSubNavForCurrentNode: true, // Gibt an ob ein Navigationspunkt dessen Seite gerade angezeigt wird und welcher weitere Unterpunkte hat diese aufklappen soll
    // classes to set
    cssClasses: {
      toggleClass_opened: 'is-opened', // Klasse, die dem Menü-Trigger einer Menüebene hinzugefügt wird, wenn die Ebene sichtbar ist
      toggleClass_closed: 'is-closed', // Klasse, die dem Menü-Trigger einer Menüebene hinzugefügt wird, wenn die Ebene ausgeblendet ist
      navigateToInner_opened: 'is-opened', // Klasse, die den Buttons innerhalb von `classes.node` hinzugefügt wird, wenn die Ebene sichtbar ist
      navigateToInner_closed: 'is-closed', // Klasse, die den Buttons innerhalb von `classes.node` hinzugefügt wird, wenn die Ebene ausgeblendet ist
      node_opened: 'is-opened', // Klasse, die `classes.node` hinzugefügt wird, wenn die Ebene sichtbar ist
      node_closed: 'is-closed', // Klasse, die `classes.node` hinzugefügt wird, wenn die Ebene ausgeblendet ist
      anchor_opened: 'is-visible', // Klasse, die `classes.anchor` hinzugefügt wird, wenn die Ebene sichtbar ist
      anchor_closed: 'is-invisible', // Klasse, die `classes.anchor` hinzugefügt wird, wenn die Ebene ausgeblendet ist
      anchor_current: 'is-current' // Klasse, die `classes.anchor` hinzugefügt wird, wenn die Ebene im 'overlay' `mode` die gerade sichtbare Ebene ist
    },
    // dom nodes
    classes: {
      show: 'js-nav-mobile__visible', // Klasse, die base.$el hinzugefügt wird, wenn das Menü geöffnet ist
      hide: 'js-nav-mobile__hidden', // Klasse, die base.$el hinzugefügt wird, wenn das Menü geschlossen ist
      anchor: 'js-nav-mobile__list', // Menüebene (Liste)
      node: 'js-nav-mobile__node', // Einzelne Einträge einer Menüebene
      bodyMenuOpened: 'mobile-menu-opened', // Klasse, die body hinzugefügt wird, wenn das Menü geöffnet ist
      bodyMenuClosed: 'mobile-menu-closed', // Klasse, die body hinzugefügt wird, wenn das Menü geschlossen ist
      metaNav: 'js-meta-nav' // Selektor für die ul der metaNavigation im 'overlay' `mode`
    },
    buttonClasses: {
      toggle: 'js-nav-mobile__toggle', // Button zum Anzeigen/Ausblenden von dem Menü
      toggleOn: 'js-nav-mobile__toggleOn', // Button zum Anzeigen von dem Menü
      toggleOff: 'js-nav-mobile__toggleOff', // Button zum Ausblenden von dem Menü
      navigateToInner: 'js-nav-mobile__navigateToInner', // Button zum Navigieren zur nächsten Menüebene
      navigateBack: 'js-nav-mobile__back' // / Button zum Navigieren eine Menüebene zurück
    },
    states: {
      initStateOpen: false,
      navBackButton: true,
      navOpenOnly: false
    },
    path: {
      indicator: 'body',
      indicatorAttr: 'data-nn',
      nodePrefix: '#tn-'
    },
    optional: {
      setMaxAnchorHeight: false,
      anchorWrapper: '' // Selektor, falls `classes.anchor` kein direktes Kind vom `base.$el` ist muss diese Klasse auf den direkten parent von `classes.anchor` zeigen
    }
  }
});

    

   /* Ende gsb_tree_navigation */
   /* Start gsb_retrieveChartData */
   
    

    

    /*!
 * --GSBDocStart
 * @module gsb_retrieveChartData
 * @version 1.0.0
 * @see {@link http://semver.org|Semantic Versioning}
 * @author rkrusenb
 *
 * @desc Holt die Tabellen-Darstellung eines Diagramms ab und gibt eine Repräsentation als JS-Objekt zurück
 *
 * @requires jQuery >= 1.11.1, gsb_chartLib_cd3
 *
 * Übernommen von https://gitlab-gsbos.materna.de/frontend/customers/destatisweb/blob/master/src/assets/js/modules/gsb_retrieveChartData.js
 *
 *--GSBDocEnd
 */"use strict";

(function ($) {
  $.gsb.retrieveChartData = function retrieveChartData(el, options) {
    var base = Object.create(retrieveChartData.prototype);
    base.options = $.extend({}, $.gsb.retrieveChartData.defaultOptions, options);
    base.init();
  };
  $.gsb.retrieveChartData.prototype = {
    init: function () {
      var base = this;
      $.ajax({
        url: base.options.url,
        success: function () {
          base.onSuccess.apply(base, arguments);
        },
        error: function () {
          base.onError.apply(base, arguments);
        }
      });
    },
    onSuccess: function (html) {
      gsb.log('retrieveChartData :: success');
      var base = this,
        div = $("<div/>").html(html),
        table = div.find(base.options.tableSelector),
        data;
      data = {
        column_headings: [],
        row_headings: [],
        values: []
      };
      table.find('thead tr td, thead tr th').each(function (i) {
        data.column_headings[i] = $(this).text() || null;
      }).length;
      table.find('tbody tr').each(function (i) {
        var row = $(this),
          row_head = $(this).find('th'),
          row_values = [];
        data.row_headings[i] = row_head.text() || null;
        row.find('td').each(function () {
          var cleanValue = $(this).html().replace(/(&nbsp;|\s)/g, "");
          cleanValue = cleanValue.replace(/,/g, ".");
          row_values.push(cleanValue.match(/([^\s])/) ? Number(cleanValue) : null);
        });
        data.values.push(row_values);
      }).length;
      base.options.success && base.options.success(data);
    },
    onError: function () {
      var base = this;
      gsb.log('retrieveChartData :: error');
      base.options.error && base.options.error.apply(this, arguments);
    }
  };
  $.gsb.retrieveChartData.defaultOptions = {
    tableSelector: 'table:eq(0)'
  };

  $.fn.gsb_retrieveChartData = function (options) {
    return this.each(function () {
      $.gsb.retrieveChartData(this, options);
    });
  };
})(jQuery);

    

   /* Ende gsb_retrieveChartData */
   /* Start gsb_wohngeldrechner2025 */
   
    

    

    /**
* @name gsb_wohngeldrechner25
* @version 0.0.1
* @author dhoppius & flbruegg
*
* @desc Wohngeldrechner für das Bundesministerium für Wohnen,Stadtentwicklung und Bauwesen
*
* @requires  {@link external:jQuery}
*
* @example
* Beispielaufruf (TODO)
*
*
* // TODO initial bei aufgeklappt
*/
"use strict";
gsb.makeGSBModule('gsb.wohngeldrechner2025', {
  init: function () {
    var base = this;
    base.initRentLevelMapping();
    if (base.makeAdditionalFields()) {
      $('.js-wohngeldrechner__householdMembers').find('input').on('input', base.updateAdditionalFields);
      $('.js-wohngeldrechner__housingbenefitRecipients').find('input').on('input', base.updateAdditionalFields);
      base.updateAdditionalFields();
    }
    base.$rent = $('[name=rent]');
    base.$rentlevel = $('[name=rentLevel]');
    base.$homeResident = $('[name=homeResident]').on('change', base, base.wohngeldrechnerHandleHouseholdMembers);
    base.$householdMembers = $('[name=householdMembers]');
    base.$housingbenefitRecipients = $('[name=housingbenefitRecipients]');
    base.$singleParent = $('[value=singleParent]');
    base.$childsupport = $('[name=childsupport]');
    base.$disabledHouseholdMembers = $('[name=disabledHouseholdMembers]');
    base.$result = $('[name=result]');
    base.$incomeMembers = [];
    for (let i = 1; i < 13; i++) {
      let $current = $(`#wohngeldrechner-additionalfield-${i}`);
      base.$incomeMembers.push({
        $income: $current.find(`[name=income]`),
        $pension: $current.find(`[value=pension]`),
        $deductions: $current.find(`[name=deductions]`),
        $incometax: $($current.find(`[name=incometax]`)[0]),
        $healthInsurance: $($current.find(`[name=incometax]`)[1]),
        $pensionInsurance: $($current.find(`[name=incometax]`)[2]),
        $workingUnderageChild: $($current.find('[value=workingUnderageChild]'))
      });
    }
    $(base.el).data('base', base);
    base.wohngeldrechnerHandleHouseholdMembers(base);
    $(base.el).on('submit', base.calculateWohngeld);

  },
  calculateWohngeld: function (event) {
    event.preventDefault();
    var base = $(event.target).data('base');
    const calc = base.options.calculationVariables;
    const totalHouseholdMembers = base.localizedParseInt(base.$householdMembers.val());
    const eligibleHouseholdMembers = base.localizedParseInt(base.$householdMembers.val()) - base.localizedParseInt(base.$housingbenefitRecipients.val());
    const rentLevel = base.$rentlevel.val();
    var monthlyTotalIncome = 0;
    for (var i = 0; i < eligibleHouseholdMembers; i++) {
      const value = base.$incomeMembers[i];
      const pension = value.$pension.is(":checked") ? value.$income.val() : 0;
      const percentageDeduction = 1 - 0.1 * value.$incometax.is(':checked') - 0.1 * value.$healthInsurance.is(':checked') - 0.1 * value.$pensionInsurance.is(':checked');
      const pensionDeduction = pension < 100 ? pension : base.min(100 + (pension - 100) * 0.3, calc.rentenAbzuege.regelbedarfsstufe1 * 0.5);
      const workingUnderageChild = value.$workingUnderageChild.is(':checked');
      const monthlyIncome = (base.localizedParseFloat(value.$income.val()) - base.localizedParseFloat(value.$deductions.val())) * percentageDeduction - pensionDeduction;
      monthlyTotalIncome += workingUnderageChild ? monthlyIncome < calc.erwerbstaetigeKinderFreibetrag ? 0 : monthlyIncome - calc.erwerbstaetigeKinderFreibetrag : monthlyIncome;
    }

    monthlyTotalIncome = monthlyTotalIncome - calc.behindertenPauschbetrag * base.$disabledHouseholdMembers.val() - base.$singleParent.is(':checked') * calc.alleinerziehendenPauschbetrag - base.localizedParseFloat(base.$childsupport.val());
    monthlyTotalIncome = base.max(monthlyTotalIncome, 0);

    let $totalHouseholdMembers = $('.js-wohngeldrechner__householdMembers');
    let $totalHouseholdMembersInput = $totalHouseholdMembers.find('input');

    if (totalHouseholdMembers === 0) {
      if ($totalHouseholdMembers.find('.formField .formError').length === 0) {
        $totalHouseholdMembers.find('.formField').prepend('<div class="formError">\n' +
        '            <span id="errorMsg-totalHouseholdNumbers">Pflichtfeld nicht ausgefüllt.</span>\n' +
        '          </div>');
      }

      $totalHouseholdMembersInput.attr('aria-describedby', 'errorMsg-totalHouseholdNumbers');
      $('html, body').animate({
        scrollTop: $totalHouseholdMembers.find('label').offset().top - 20
      }, 800);
      $totalHouseholdMembersInput.focus();
    } else {
      $totalHouseholdMembersInput.removeAttr('aria-describedby');
      $totalHouseholdMembers.find('.formField .formError').remove();

      const maximumValue = totalHouseholdMembers < 6 ? calc.hoechstbetrag[totalHouseholdMembers][rentLevel] + calc.klimakomponente[totalHouseholdMembers] : calc.hoechstbetrag[5][rentLevel] + calc.klimakomponente[totalHouseholdMembers] + calc.hoechstbetrag.mehrAlsFuenf[rentLevel] * (totalHouseholdMembers - 5);
      const rent = base.$homeResident.is(':checked') ? maximumValue : base.localizedParseFloat(base.$rent.val());
      const monthlyTotalExpenditure = (rent < maximumValue ? rent : maximumValue) * eligibleHouseholdMembers / totalHouseholdMembers;
      const a = calc.a[eligibleHouseholdMembers];
      const b = calc.b[eligibleHouseholdMembers];
      const c = calc.c[eligibleHouseholdMembers];
      const M = base.max(monthlyTotalExpenditure + calc.heizkostenEntlastung[totalHouseholdMembers] * eligibleHouseholdMembers / totalHouseholdMembers, calc.M[totalHouseholdMembers]);
      const Y = base.max(monthlyTotalIncome, calc.Y[eligibleHouseholdMembers]);
      //Fix rounding
      const massiveNumber = 100000000;
      const z1 = massiveNumber * a + massiveNumber * b * M + massiveNumber * c * Y;
      const z2 = z1 / massiveNumber * Y;
      const z3 = M - z2;
      const z4 = 1.15 * z3;
      const result = Math.round(z4);
      base.$result.val(result < 10 ? 0 : result);
      base.$result.focus();
    }
  },
  min: function (a, b) {
    return a < b ? a : b;
  },
  max: function (a, b) {
    return a < b ? b : a;
  },
  localizedParseFloat: function (str) {
    return isNaN(parseFloat(str)) ? 0 : parseFloat(str);
  },
  localizedParseInt: function (str) {
    return isNaN(parseInt(str)) ? 0 : parseInt(str);
  },
  makeAdditionalFields: function () {
    let base = this;
    let $additionalFields = $(base.options.selectors.additionalFields);
    let $additionalFieldTemplate = $(base.options.selectors.additionalFieldTemplate);
    if ($additionalFieldTemplate.length !== 1) {
      gsb.error('GSB_Wohngeldrechner: Kein Template oder mehrere Templates für zusätzliche Felder gefunden');
      return false;
    }
    base.additionalFieldTemplate = $additionalFieldTemplate[0].innerHTML;
    $additionalFieldTemplate.attr('hidden', 'true');
    for (let i = 1; i < 13; i++) {
      let field = document.createElement("div");
      field.innerHTML = base.additionalFieldTemplate.replaceAll('{NUMMER}', i);
      field.className = $additionalFieldTemplate[0].className;
      field.setAttribute('id', `wohngeldrechner-additionalfield-${i}`);
      field.setAttribute('role', 'group');
      field.setAttribute('aria-label', WOHNGELDRECHNER_HAUSHALTSMITGLIED_LABEL + ` ${i}`);
      $additionalFields.append(field);
      $(field).find('input').not('[type=hidden]').each(function (j) {
        $(this).attr('id', $(this).attr('id') + `${i}${j}`);
      }
      );
      $(field).find('label').each(function (j) {
        $(this).attr('for', $(this).attr('for') + `${i}${j}`);
      }
      );
    }
    $('#wohngeldrechner-additionalfield-1').addClass('js-wohngeldrechner__show');
    return true;
  },
  updateAdditionalFields: function (event) {
    var householdMembers = $('.js-wohngeldrechner__householdMembers').find('input').val();
    var housingbenefitRecipients = $('.js-wohngeldrechner__housingbenefitRecipients').find('input').val();
    for (var i = 1; i < 13; i++) {
      if (i <= householdMembers - housingbenefitRecipients) {
        $(`#wohngeldrechner-additionalfield-${i}`).addClass('js-wohngeldrechner__show');
      } else {
        $(`#wohngeldrechner-additionalfield-${i}`).removeClass('js-wohngeldrechner__show');
      }
    }
    if (householdMembers > 0) {
      $('.js-wohngeldrechner-hint').show();
    } else
    {
      $('.js-wohngeldrechner-hint').hide();
    }
  },
  initRentLevelMapping: function () {
    var base = this;
    const $rentLevelLink = $('.c-rentlevelmapping__link');
    base.rentLevelMappingMap = null;
    if ($rentLevelLink) {
      const asyncLink = $rentLevelLink.html();
      if (asyncLink !== "") {
        fetch(asyncLink).
        then((response) => response.json()).
        then((data) => base.initWohngeldrechnerZIPCodeMapper(data, base));
      }
    }
  },
  initWohngeldrechnerZIPCodeMapper: function initWohngeldrechnerZIPCodeMapper(rentLevelMappingJSON, base) {
    this.rentLevelMappingMap = new Map(Object.entries(rentLevelMappingJSON));
    $('.c-rentlevelmapping__zipcode, .c-rentlevelmapping__levels, .c-rentlevelmapping__town').data('base', base).find('input, select').data('base', base);
    $('.c-rentlevelmapping__zipcode, .c-rentlevelmapping__levels').addClass('js-is-active');
    $('.c-rentlevelmapping__zipcode').on('input', base.wohngeldrechnerZIPCodeListener);
    $('.c-rentlevelmapping__town').on('input', base.wohngeldrechnerTownListener);
  },
  wohngeldrechnerZIPCodeListener: function (event) {
    var base = $(event.target).data('base');
    const mapping = base.rentLevelMappingMap.get(event.target.value);
    if (mapping) {
      if (mapping.length > 2) {
        base.wohngeldrechnerAddTownSelector(mapping, base);
      } else {
        $('.c-rentlevelmapping__town').removeClass('js-is-active');
        base.wohngeldrechnerSetRentlevel(mapping[1]);
      }
    } else {
      $('.c-rentlevelmapping__town').removeClass('js-is-active');
    }
  },

  wohngeldrechnerHandleHouseholdMembers: function (base) {
    var base = base.data !== undefined ? base.data : base;
    var $rent = $('.js-wohngeldrechner__rent');
    if (base.$homeResident.is(":checked")) {
      base.$rent.attr("disabled", "disabled");
      $rent.addClass('js-is-active').find('input').trigger('input');
      $rent.find(".c-content-accordion button").attr("tabindex", "-1");
    } else {
      base.$rent.removeAttr("disabled");
      $rent.removeClass('js-is-active').find('input').trigger('input');
      $rent.find(".c-content-accordion button").removeAttr("tabindex");
    }
  },

  wohngeldrechnerAddTownSelector: function (mapping, base) {
    const $rentlevelTown = $('.c-rentlevelmapping__town');
    const $rentlevelTownSelector = $rentlevelTown.find('select');
    $rentlevelTown.addClass('js-is-active');
    $rentlevelTownSelector.empty();
    var concat = '';
    for (let i = 0; i < mapping.length; i = i + 2) {
      concat += `<option title="${mapping[i]}" value="${mapping[i + 1]}">${mapping[i]} (Stufe ${base.romanize(mapping[i + 1])})</option>`;
    }
    $rentlevelTownSelector.append(concat);
    $rentlevelTown.val(mapping[1]).trigger('input');
  },

  wohngeldrechnerTownListener: function (event) {
    var base = $(event.target).data('base');
    base.wohngeldrechnerSetRentlevel(event.target.value);
  },
  wohngeldrechnerSetRentlevel: function (value) {
    $('.c-rentlevelmapping__levels').find('input, select').val(value);
  },
  romanize: function romanize(num) {
    if (isNaN(num)) {
      return NaN;
    }
    var digits = String(+num).split(""),
      key = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM",
      "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC",
      "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"],
      roman = "",
      i = 3;
    while (i--) {
      roman = (key[+digits.pop() + i * 10] || '') + roman;
    }
    return Array(+digits.join("") + 1).join("M") + roman;
  },
  defaultOptions: {
    currentNumberOfFields: 0,
    selectors: {
      additionalFieldTemplate: '.js-wohngeldrechner__additionalfieldtemplate',
      additionalFields: '.js-wohngeldrechner__additionalfields'
    },
    calculationVariables: {
      hoechstbetrag: {
        1: {
          1: 361,
          2: 408,
          3: 456,
          4: 511,
          5: 562,
          6: 615,
          7: 677
        },
        2: {
          1: 437,
          2: 493,
          3: 551,
          4: 619,
          5: 680,
          6: 745,
          7: 820
        },
        3: {
          1: 521,
          2: 587,
          3: 657,
          4: 737,
          5: 809,
          6: 887,
          7: 975
        },
        4: {
          1: 608,
          2: 686,
          3: 766,
          4: 858,
          5: 946,
          6: 1035,
          7: 1139
        },
        5: {
          1: 694,
          2: 782,
          3: 875,
          4: 982,
          5: 1080,
          6: 1183,
          7: 1302
        },
        mehrAlsFuenf: {
          1: 82,
          2: 94,
          3: 106,
          4: 119,
          5: 129,
          6: 149,
          7: 163
        }
      },
      klimakomponente: {
        1: 19.20,
        2: 24.80,
        3: 29.60,
        4: 34.40,
        5: 39.20,
        6: 44,
        7: 48.8,
        8: 53.6,
        9: 58.4,
        10: 63.2,
        11: 68,
        12: 72.8
      },
      heizkostenEntlastung: {
        1: 110.40,
        2: 142.60,
        3: 170.20,
        4: 197.80,
        5: 225.40,
        6: 253,
        7: 280.6,
        8: 308.2,
        9: 335.8,
        10: 363.4,
        11: 391,
        12: 418.6
      },
      rentenAbzuege: {
        regelbedarfsstufe1: 563
      },
      behindertenPauschbetrag: 150,
      alleinerziehendenPauschbetrag: 110,
      erwerbstaetigeKinderFreibetrag: 100,
      a: {
        1: 0.04,
        2: 0.03,
        3: 0.02,
        4: 0.01,
        5: 0,
        6: -0.01,
        7: -0.02,
        8: -0.03,
        9: -0.04,
        10: -0.06,
        11: -0.09,
        12: -0.12
      },
      b: {
        1: 0.0004797,
        2: 0.0003571,
        3: 0.0002917,
        4: 0.0002163,
        5: 0.0001907,
        6: 0.0001722,
        7: 0.0001592,
        8: 0.0001583,
        9: 0.0001376,
        10: 0.0001249,
        11: 0.0001141,
        12: 0.0001107
      },
      c: {
        1: 0.00004080,
        2: 0.00003040,
        3: 0.00002450,
        4: 0.00001760,
        5: 0.00001720,
        6: 0.00001660,
        7: 0.00001650,
        8: 0.00001650,
        9: 0.00001660,
        10: 0.00001660,
        11: 0.00001960,
        12: 0.00002210
      },
      M: {
        1: 54,
        2: 67,
        3: 79,
        4: 92,
        5: 103,
        6: 103,
        7: 115,
        8: 128,
        9: 140,
        10: 152,
        11: 187,
        12: 298
      },
      Y: {
        1: 396,
        2: 679,
        3: 906,
        4: 1132,
        5: 1358,
        6: 1585,
        7: 1811,
        8: 2037,
        9: 2264,
        10: 2490,
        11: 2717,
        12: 2943
      },
      additionalEurosPerMemberExceedingTwelve: 65
    }
  }
});

    

   /* Ende gsb_wohngeldrechner2025 */
   /* Start gsb_search */
   
    

    

    "use strict";gsb.makeGSBModule('gsb.search', {
  init: function () {
    const base = this;
    base.$searchField = $(`
      <div class="l-form-wrapper c-accordion__search-wrapper">
        <label for="accordion-search-input">${INSTANT_SEARCH_LABEL}</label>
        <input id="accordion-search-input" type="text" class="${base.options.selectors.input.replace('.', '')}" placeholder="${INSTANT_SEARCH_PLACEHOLDER}">
        <label class="${base.options.selectors.searchLabel.replace('.', '')}" hidden="hidden">
          <span class="${base.options.selectors.searchHits.replace('.', '')}">0</span>/<span class="${base.options.selectors.searchTotal.replace('.', '')}">0</span>
          ${base.options.label.labelText} "<span class="${base.options.selectors.searchTerm.replace('.', '')}"></span>"
        </label>
      </div>
    `);
    if (base.options.html.searchField) base.$searchField = $(base.options.html.searchField);
    $(base.options.selectors.prependTo).first().before(base.$searchField);
    base.$searchField.on('input change', base, base.search);
  },
  search: function (e) {
    const base = e.data;
    base.$searchField.find(base.options.selectors.input).each((index, input) => {
      const searchTerm = input.value.toLowerCase();
      $(base.options.selectors.searchTerm).text(searchTerm);
      const $containers = $(base.options.selectors.searchContainer);
      $(base.options.selectors.searchTotal).text($containers.length);
      const $hideFields = $(base.options.selectors.hideFields);
      if (searchTerm.length) {
        $(base.options.selectors.searchLabel).show();
        let toOpen = [];
        let toClose = [];
        $containers.each((index, container) => {
          const $container = $(container);
          const $searchFields = $container.find(base.options.selectors.searchFields);
          if ($searchFields.text().toLowerCase().includes(searchTerm)) {
            toOpen.push($container);
          } else {
            toClose.push($container);
          }
        });
        $(base.options.selectors.searchHits).text(toOpen.length);
        if (toOpen.length) {
          $hideFields.hide();
          toClose.forEach(($container) => {
            $container.hide();
            const $opener = $container.find(base.options.selectors.accordionOpener);
            $opener.removeAttr('aria-expanded').addClass('inactive-control').removeClass('active-control');
            $(`#${$opener.find('[aria-controls]').attr('aria-controls')}`).hide();
          });
          toOpen.reverse().forEach(($container) => {
            $container.show();
            const $opener = $container.find(base.options.selectors.accordionOpener);
            $opener.removeAttr('aria-expanded').removeClass('inactive-control').addClass('active-control');
            $(`#${$opener.find('[aria-controls]').attr('aria-controls')}`).show();
          });
          $containers.parents(base.options.selectors.parents).css('margin-bottom', '0');
          base.mark(base, searchTerm);
        } else {
          $hideFields.hide();
          toClose.forEach(($container) => {
            $container.hide();
            const $opener = $container.find(base.options.selectors.accordionOpener);
            $opener.removeAttr('aria-expanded').addClass('inactive-control').removeClass('active-control');
            $(`#${$opener.find('[aria-controls]').attr('aria-controls')}`).hide();
          });
          $containers.parents(base.options.selectors.parents).css('margin-bottom', '0');
          base.unmark(base);
        }

      } else {
        $(base.options.selectors.searchLabel).hide();
        $(base.options.selectors.searchHits).text("0");
        $(base.options.selectors.searchTerm).text("");
        base.unmark(base);
        $hideFields.show();
        $containers.show();
        $containers.find(base.options.selectors.accordionOpener).each((index, opener) => {
          const $opener = $(opener);
          $opener.removeAttr('aria-expanded').addClass('inactive-control').removeClass('active-control');
          $(`#${$opener.find('[aria-controls]').attr('aria-controls')}`).hide();
        });
        $containers.parents(base.options.selectors.parents).css('margin-bottom', '');
      }
    });
  },
  mark: function (base, searchTerm) {
    base.unmark(base);
    $(base.options.selectors.searchContainer).find(base.options.selectors.searchFields).
    mark(searchTerm);
  },
  unmark: function (base) {
    $(base.options.selectors.searchContainer).find(base.options.selectors.searchFields).unmark();
  },
  defaultOptions: {
    selectors: {
      input: '.c-accordion__search-input',
      parents: '.l-module-wrapper, .c-accordion__list',
      searchContainer: '.c-accordion__item',
      searchFields: '.js-accordion-opener, .js-accordion-entry',
      hideFields: '.c-accordion__text-wrapper, .c-accordion__toggle-all-wrapper, .c-accordion__link-wrapper',
      accordionOpener: '.js-accordion-opener',
      prependTo: '.js-accordion-toggle-all',
      searchLabel: '.js-search-label',
      searchHits: '.js-search-hits',
      searchTotal: '.js-search-total',
      searchTerm: '.js-search-term'
    },
    html: {
      searchField: ''
    },
    label: {
      labelText: `${INSTANT_SEARCH_AMOUNT}`
    }
  }
});

    

   /* Ende gsb_search */
   /* Start gsb_scrollytelling_anchor_nav_timeline */
   
    

    

    "use strict"; /*!
 * --GSBDocStart
 * @module scrollytelling_anchor_nav_timeline
 * @version 1.0.1
 *  - 1.0.1 jelseber: centerActivationOffsetPercentage Option hinzugefügt
 *  - 1.0.2 jelseber: Da IE sonst zu früh die Ankerposition anscrollt und dann noch js nachlädt, sodass sich Inhalte verändern udn die Scrollposition
 *  nicht mehr stimmt. Wird das Scrollen jetzt direkt von Javascript korregiert nachdem der Browser seinen Ankermechnismus angewendet hat.Hinzufügen der option scrollAnimationDuration
 *
 * @author jelseber
 *
 * @desc Nutzt gsb_stickyscroll zur Positionierung der Anker Navigation. Markiert in der Anker Navigation den gerade im Inhalt sichtbaren Punkt als aktiv.
 *
 * @init Verwendung innerhalb der init beschreiben
 *
 * @requires  gsb_stickyscroll
 *--GSBDocEnd
 *
 */

;(function ($) {
  'use strict';
  if (!$.gsb) {
    $.gsb = {};
  }

  $.gsb.scrollytelling_anchor_nav_timeline = function (el, options) {
    const base = {};
    base.$el = $(el);
    base.el = el;
    base.$el.data('gsb.scrollytelling_anchor_nav_timeline', base);

    base.init = function () {
      gsb.log('gsb_scrollytelling_anchor_nav_timeline.init()');
      base.options = $.extend(true, {}, $.gsb.scrollytelling_anchor_nav_timeline.defaultOptions, options);
      base.prepareElements();
      base.prepareState();
      base.initStickyScroll();
      if (!base.isMobile) {
        base.handleScrollLinks();
        base.scroll();
        $(window).on('scroll', base.handleScrollLinks);
      }
      base.$el.find(base.options.selectors.navItemLink).on("click", base.scroll);
      base.$el.find(base.options.selectors.navIconLink).on("click", base.iconScroll);
    };

    base.setProgress = function setProgress(value, max) {
      $(base.options.selectors.progressBar).css("width", value / max * 100 + "vw");
    };

    base.prepareElements = function prepareElements() {
      base.$navList = base.$el.find(base.options.selectors.navList);
      base.$navItemLinks = base.$el.find(base.options.selectors.navItemLink);
      if (base.options.markSiblings) {
        base.$navItemLinks.parent().addClass("c-timeline-controls__item--nonarrow");
      }
      if (base.options.selectors.progressBar) {
        base.setProgress(1, $("html").outerHeight());
      }
      base.navItemsContentHs = [];

      const offset = $.gsb.scrollytelling_utils.getPixelOvershotTopAndTopOfViewport($(base.options.selectors.container));

      if (base.options.fading) {
        base.$navList.parent().gsb_scrollytelling_simple_fadein({
          checkOvershotOn: $(base.options.selectors.container),
          scrollFadeDistance: base.$navList.parent().height() * 1,
          scrollFadeOutDistance: base.$navList.parent().height() * 3
        });
      }

      base.$navItemLinks.each(function (index, navItemLink) {
        if (!base.options.anchorsExist) {
          const anchorId = `time[datetime=${navItemLink.innerText}]`;
          $(anchorId).closest("article").attr("id", `c-timeline-anchor-${index}`);
          $(navItemLink).attr("href", `#c-timeline-anchor-${index}`);
          base.navItemsContentHs.push($('body').find(`#c-timeline-anchor-${index}`));
        } else {
          base.navItemsContentHs.push($('body').find(`#${$(navItemLink).attr("href").split('#')[1]}`));
        }
        if (base.options.markSiblings) {
          if (index === 0) {
            $(navItemLink).parent().addClass(base.options.classes.navItemActive);
          } else if (index < 3) {
            $(navItemLink).parent().addClass(base.options.classes.navItemSibling);
          }
        }
      });


      if (base.options.arrowsPresent) {
        $(base.options.selectors.first).attr("href", base.$navItemLinks.first().attr("href"));
        $(base.options.selectors.last).attr("href", base.$navItemLinks.last().attr("href"));
      }
    };

    base.prepareState = function prepareState() {
      base.isMobile = $(window).width < 768; // Ab Medium
    };

    base.initStickyScroll = function initStickyScroll() {
      base.$el.find(base.options.selectors.navToggleButton).on('click', function () {
        if (base.$el.hasClass(base.options.classes.navToggled)) {
          $('html').css('overflow', '');
        } else {
          $('html').css('overflow', 'hidden');
        }
        base.$el.toggleClass(base.options.classes.navToggled);
      });
      const stickyscrollStart = base.$navList.offset().top;
      const stickyscrollEnd = base.$el.offset().top + base.$el.outerHeight() - base.$navList.outerHeight();

      // Klebe am oberen Rand des Containers solange das Ende des Containers nicht erreicht ist
      base.$navList.gsb_stickyscroll({
        stickyFrom: stickyscrollStart,
        stickyTo: stickyscrollEnd,
        class: base.options.gsb_stickyscroll1.class
      });

      // Klebe am unteren Rand des Containers wenn das Ende des Containers erreicht ist
      base.$navList.gsb_stickyscroll({
        stickyFrom: stickyscrollEnd,
        class: base.options.gsb_stickyscroll2.class
      });
    };

    base.handleScrollLinks = function handleScrollLinks() {
      const navItemLinksWhoseContenthHasReachedCenterOfViewport = [];

      base.navItemsContentHs.forEach(function (contentH) {
        const $contentH = $(contentH);
        if ($contentH.length > 0) {
          const hasTopReachedCenterOfViewport = $.gsb.scrollytelling_utils.hasTopReachedCenterOfViewport($contentH, base.options.centerActivationOffsetPercentage, base.options.scrollingOffset);
          if (hasTopReachedCenterOfViewport) {
            const $currentNavItemLink = base.$navItemLinks.filter(function (index, navItemLink) {
              const anchorId = $(navItemLink).attr('href').split('#').pop();
              return $contentH.attr('id') === anchorId;
            });
            navItemLinksWhoseContenthHasReachedCenterOfViewport.push($currentNavItemLink.get(0));
          }
        }
      });

      if (base.options.selectors.progressBar) {
        base.setProgress($(window).scrollTop(), $("html").outerHeight() - $(window).height());
      }

      if (!navItemLinksWhoseContenthHasReachedCenterOfViewport.length)
      return;

      base.$navItemLinks.parent().removeClass(base.options.classes.navItemActive);
      base.$navItemLinks.removeAttr("aria-current");
      base.$navItemLinks.parent().removeClass(base.options.classes.navItemSibling);

      const lastActiveItem = navItemLinksWhoseContenthHasReachedCenterOfViewport.pop(); // remove and store last item
      $(lastActiveItem).parent().addClass(base.options.classes.navItemActive);
      $(base.options.selectors.navToggleButton).find(".button-text").text(lastActiveItem.innerText);
      $(lastActiveItem).attr("aria-current", "true");


      if (base.options.markSiblings) {
        $(lastActiveItem).parent().next().addClass(base.options.classes.navItemSibling);

        if (!$(lastActiveItem).parent().next().length && navItemLinksWhoseContenthHasReachedCenterOfViewport.length > 1) {
          $(lastActiveItem).parent().prev().prev().addClass(base.options.classes.navItemSibling);
        }
        if (navItemLinksWhoseContenthHasReachedCenterOfViewport.length) {
          $(lastActiveItem).parent().prev().addClass(base.options.classes.navItemSibling);
        } else {
          $(lastActiveItem).parent().next().next().addClass(base.options.classes.navItemSibling);
        }
      }


      if (base.options.arrowsPresent) {
        if (navItemLinksWhoseContenthHasReachedCenterOfViewport.length) {
          $(base.options.selectors.prev).attr("href", $(base.$navItemLinks.get(navItemLinksWhoseContenthHasReachedCenterOfViewport.length - 1)).attr("href"));
          $(base.options.selectors.first).attr("href", base.$navItemLinks.first().attr("href"));
        } else {
          $(base.options.selectors.prev).removeAttr("href");
          $(base.options.selectors.first).removeAttr("href");
        }

        if ($(lastActiveItem).parent().next().length) {
          $(base.options.selectors.next).attr("href", $(lastActiveItem).parent().next().find("a").attr("href"));
          $(base.options.selectors.last).attr("href", base.$navItemLinks.last().attr("href"));
        } else {
          $(base.options.selectors.next).removeAttr("href");
          $(base.options.selectors.last).removeAttr("href");
        }
      }
    };

    base.scroll = function scroll() {
      const hash = window.location.hash;
      const $elementToScrollTo = $(hash);
      if ($elementToScrollTo.length > 0) {
        console.debug('gsb_scrollytelling_anchor_nav_timeline: Scrolling with Animation to element with the id: \'' + hash);
        $('html, body').animate({
          scrollTop: $elementToScrollTo.offset().top - base.options.scrollingOffset
        }, base.options.scrollAnimationDuration);
      }
    };

    base.iconScroll = function iconScroll(ev) {
      ev.preventDefault();
      const hash = $(this).prop("hash");
      const $elementToScrollTo = $(hash);
      if ($elementToScrollTo.length > 0) {
        $('html, body').animate({
          scrollTop: $elementToScrollTo.offset().top - base.options.iconClickScrollingOffset
        }, base.options.iconClickScrollAnimationDuration, function () {
          setTimeout(function () {
            $elementToScrollTo.attr("tabindex", "-1").focus();
          }, 100);
        });
      }
      window.location.hash = $(this).prop("hash");
    };

    base.init();
  };
  $.gsb.scrollytelling_anchor_nav_timeline.defaultOptions = {
    centerActivationOffsetPercentage: -30, // schiebt den Aktivierungspunkt für den aktiven Menupünkt um x% der Höhe des Viewports, ausgehend von der Mitte des Viewports.
    // Sinvolle Werte liegen im Bereich von -50 bis 50
    scrollAnimationDuration: 100, // scroll Animationsdauer (meist nicht wirksam da in den meisten Fällen bereits korrekt per Browser Anker an die passende Postion gesprungen wurde)
    iconClickScrollAnimationDuration: 650,
    classes: {
      navToggled: 'c-timeline-controls--toggled',
      navItemActive: 'c-timeline-controls__item--active',
      navItemSibling: 'c-timeline-controls__item--sibling'
    },
    selectors: {
      navList: '.c-timeline-controls__list',
      navToggleButton: '.c-timeline-controls__toggle-button',
      navItemLink: '.c-timeline-controls__item > a:not(.c-timeline-controls__link--icon)',
      navIconLink: '.c-timeline-controls__item > .c-timeline-controls__link--icon',
      container: '.l-timeline',
      first: ".c-timeline-controls__item--first > a",
      last: ".c-timeline-controls__item--last > a",
      prev: ".c-timeline-controls__item--prev > a",
      next: ".c-timeline-controls__item--next > a",
      progressBar: null
    },
    anchorsExist: false,
    arrowsPresent: true,
    markSiblings: true,
    fading: false,
    scrollingOffset: 0,
    iconClickScrollingOffset: 150,
    gsb_stickyscroll1: {
      class: 'gsb_stickyscroll-sticky'
    },
    gsb_stickyscroll2: {
      class: 'gsb_stickyscroll-stickystop'
    }

  };
  $.fn.gsb_scrollytelling_anchor_nav_timeline = function (options) {
    return this.each(function () {
      $.gsb.scrollytelling_anchor_nav_timeline(this, options);
    });
  };

})(jQuery);

    

   /* Ende gsb_scrollytelling_anchor_nav_timeline */
})();
   /* Start init */
   
    

    

    "use strict"; // noinspection ES6ConvertVarToLetConst, JSUnusedGlobalSymbols
// eslint-disable-next-line no-redeclare,no-useless-assignment,no-var,no-use-before-define -- Benutzt von matomo
var _paq = _paq || [];
$(function () {
  const $body = $("body"),
    $content = $(".content"),
    $headerSticky = $(".js-header");

  const minBreakpoint = 1,
    mediumBreakpoint = 768,
    largeBreakpoint = 1026,
    xLargeBreakpoint = 1280,
    xxLargeBreakpoint = 1440;


  // Deaktivierung von Animationen für automatisierte Tests (Backstop, Cypress, ...)
  if (typeof Cookies !== "undefined" && Cookies.get && Cookies.get("testmode")) {
    $.fx.off = true;
    $body.addClass("no-transition");
  }

  $body.addClass("js-on").removeClass("js-off");

  // BITV: Alle Flyouts, die über hover angezeigt werden, müssen
  // anderweitig (hier: über Esc) schließbar sein
  $body.on("keydown", function (ev) {
    const key = ev.key;
    if (key === "Esc" || key === "Escape") {
      $body.trigger("closeAllFlyouts.gsb");
    }
  });
  $body.on("closeAllFlyouts.gsb", function () {
    $body.find(".mejs__captions-selector").not(".mejs__offscreen").
    addClass("mejs__offscreen");
    $body.find(".mejs__volume-slider").not(":hidden").
    hide();
  });

  $content.gsb_responsiveTables();

  /* Scroll check for tables. */
  const responsiveTableClass = '.l-responsive-table';
  const tableContainers = document.querySelectorAll(responsiveTableClass);

  // Add wrapper element
  function create_responsive_table_wrapper(table_container) {
    const wrapper_div = document.createElement('div');
    wrapper_div.classList.add('l-responsive-table__wrapper');

    const scroll_clone_div = document.createElement('div');
    scroll_clone_div.classList.add('responsiveTableScrollClone');
    scroll_clone_div.setAttribute('tabindex', '-1');
    wrapper_div.appendChild(scroll_clone_div);

    const table_clone_div = document.createElement('div');
    table_clone_div.classList.add('responsiveTableClone');
    table_clone_div.style.width = `${table_container.querySelector('table').getBoundingClientRect().width}px`;
    scroll_clone_div.appendChild(table_clone_div);

    // Erstellen Sie eine Kopie des table_container, bevor Sie es entfernen
    const table_container_copy = table_container.cloneNode(true);
    wrapper_div.appendChild(table_container_copy);

    // Ersetzen Sie das ursprüngliche table_container durch das wrapper_div
    table_container.parentNode.replaceChild(wrapper_div, table_container);

    return wrapper_div;
  }

  function syncScroll(element1, element2) {
    function scrollHandler(event) {
      if (event.target === element1) {
        element2.scrollTo(element1.scrollLeft, 0);
      } else {
        element1.scrollTo(element2.scrollLeft, 0);
      }
    }

    $(element1).on('scroll', scrollHandler);
    $(element2).on('scroll', scrollHandler);
  }

  function scrollState(containerSelector) {
    const containers = document.querySelectorAll(containerSelector);
    containers.forEach((element) => {
      if (element.scrollWidth <= element.clientWidth) {
        element.classList.remove('is-scroll-right', 'is-scroll-left');
      } else if (element.scrollLeft === 0) {
        element.classList.remove('is-scroll-left');
        element.classList.add('is-scroll-right');
      } else if (element.scrollLeft + element.clientWidth >= element.scrollWidth) {
        element.classList.remove('is-scroll-right');
        element.classList.add('is-scroll-left');
      } else {
        element.classList.add('is-scroll-left', 'is-scroll-right');
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    scrollState(responsiveTableClass);
  });
  window.addEventListener('resize', () => {
    scrollState(responsiveTableClass);
  });

  // Erstelle Wrapper und synchronisiere den Scroll für jede Tabelle
  tableContainers.forEach((table_container) => {
    const wrapper = create_responsive_table_wrapper(table_container);
    const scroll_clone = wrapper.querySelector('.responsiveTableScrollClone');
    const table = wrapper.querySelector('.l-responsive-table');
    syncScroll(scroll_clone, table);

    table.addEventListener('scroll', () => {
      scrollState(responsiveTableClass);
    });
  });


  let scrollSlider = $(".js-scroll-table");

  scrollSlider.on("input change", function () {
    let panel = $(this).parent().find(".l-responsive-table__inner")[0];
    let sliderValue = $(this).find("input[type='range']").val();

    let total = panel.scrollWidth - panel.offsetWidth;
    panel.scrollLeft = total * (sliderValue / 100);
  });

  // c-video ohne consent-wrapper
  const $noConsent = $("video").filter((index, el) => $(el).find('source[type|="video/mp4"]').length > 0);

  gsb.requireGSBComponent("bundle_multimedia", $noConsent).done(function ($media) {
    $media.gsb_Multimedia({
      settings: {
        mediaelementplayerOptions: {
          iconSpritePathA11y: image_url_mejs_a11y_icons
        }
      }
    });
  });

  // c-video mit consent-wrapper
  gsb.requireGSBComponent("bundle_multimedia", $("video")).done(function ($media) {
    $media.gsb_Multimedia({
      settings: {
        mediaelementplayerOptions: {
          features: '',
          iconSpritePathA11y: image_url_mejs_a11y_icons
        }
      },
      consentCheckbox: true,
      markup: {
        consentContent: `<p>${CONSENT_TEXT}</p>`,
        consentButton: '<button type="button" class="c-button is-secondary" />',
        consentCheckbox:
        '<form>' +
        '<input class="c-multimedia-consent__checkbox js-multimedia-consent-checkbox" name="gsb_multimedia_thirdPartyConsent" type="checkbox">' +
        '<label class="c-multimedia-consent__checkbox-label js-multimedia-consent-checkbox-label"></label>' +
        '</form>'
      },
      labels: {
        consentCheckboxText: CONSENT_CHECKBOX_LABEL
      }
    });
  });

  // c-audio
  gsb.requireGSBComponent('bundle_multimedia', $('audio')).done(function ($media) {
    $media.gsb_Multimedia({
      settings: {
        mediaelementplayerOptions: {
          iconSpritePathA11y: image_url_mejs_a11y_icons
        }
      }
    });
  });

  const $globalCookieBannerOpener = $('.js-banner-opener');
  //Initiiere CookieBanner nur wenn Cookie nicht gesetzt ist oder auf Seite mit Öffner
  if (!document.cookie.match(/gsbbanner=closed/u) || $globalCookieBannerOpener.length) {
    const $cookiebanner = $('#c-cookiebanner[data-banner-mode="extended"]');
    gsb.requireGSBComponent('bundle_lightbox', $cookiebanner).done(function () {
      $cookiebanner.gsb_banner({
        closeButton: '.close',
        lightboxHidden: typeof $cookiebanner.attr('data-banner-hidden') === "string",
        navSkipListSelector: '.c-navskip',
        position: "top",
        restrictAccess: true,
        trackingConfigUrl: $cookiebanner.attr("data-banner-extended-config"),
        trackingEnabled: true,
        trackingClasses: {
          controlElement: 'c-cookiebanner-control__element js-banner-control__element',
          controlLabel: 'c-cookiebanner-control__label',
          restrictive: 'c-cookiebanner__relative',
          section: 'c-cookiebanner-section',
          sectionTitle: 'c-cookiebanner-section__title'
        }
      });
    });
    $globalCookieBannerOpener.on('click', function () {
      $cookiebanner.magnificPopup('open');
      $(".l-page-wrapper").attr("inert", true);
    });

    $(document).on('cookieUpdate.gsb', function () {
      $(".l-page-wrapper").removeAttr("inert");
    });

    if (!Cookies.get("gsbbanner")) {
      $(".l-page-wrapper").attr("inert", true);
    }
  }

  // sticky navigation
  $headerSticky.on('init.shrinkheader.gsb afterCheckPosition.shrinkheader.gsb', function () {
    window.requestAnimationFrame(() => {
      this.style.setProperty('--header-height', `${$(this).outerHeight()}px`);
      $body.css('--header-height', `${$(this).outerHeight()}px`);
    });
  }).gsb_shrinkheader({
    selectors: {
      elementToAddMarginTo: "main"
    },
    onRefresh: function onRefresh() {
      this.initScrollEvent();
    },
    responsive: [{
      breakpoint: largeBreakpoint,
      selectors: {
        elementToAddMarginTo: "main"
      },
      onRefresh: function onRefresh() {
        this.initScrollEvent();
      }
    }, {
      breakpoint: minBreakpoint,
      selectors: {
        elementToAddMarginTo: "#content"
      },
      showOnlyOnScrollUp: true,
      onRefresh: function onRefresh() {
        this.initScrollEvent();
      }
    }]
  });

  // Tree-Navigation
  $('.js-tree-navigation').gsb_tree_navigation({
    initStateOpen: true
  });

  $('.c-navigation__link--button.c-navigation__link--level1').on('click', function () {
    if ($(this).hasClass('is-opened')) {
      $('.c-navigation__link--level1.is-opened').not(this).click();
    }

    if ($('.c-navigation__link--button.c-navigation__link--level1.is-opened').length > 0 && $(window).innerWidth() >= 1026) {
      $('body').addClass('menu-opened');
    } else {
      $('body').removeClass('menu-opened');
    }
  });

  $('.c-navigation__link--button.c-navigation__link--level2').on('click', function () {
    if ($(this).hasClass('is-opened')) {
      $('.c-navigation__link--level2.is-opened').not(this).click();
    }
  });

  $('.c-navigation__link--button.c-navigation__link--level3').on('click', function () {
    if ($(this).hasClass('is-opened')) {
      $('.c-navigation__link--level3.is-opened').not(this).click();
    }
  });

  $('.c-navigation-subsite__link--button.c-navigation-subsite__link--level1').on('click', function () {
    if ($(this).hasClass('is-opened')) {
      $('.c-navigation-subsite__link--level1.is-opened').not(this).click();
    }

    if ($('.c-navigation-subsite__link--button.c-navigation-subsite__link--level1.is-opened').length > 0 && $(window).innerWidth() >= 1026) {
      $('body').addClass('menu-opened');
    } else {
      $('body').removeClass('menu-opened');
    }
  });

  $('.c-navigation-subsite__link--button.c-navigation-subsite__link--level2').on('click', function () {
    if ($(this).hasClass('is-opened')) {
      $('.c-navigation-subsite__link--level2.is-opened').not(this).click();
    }
  });

  $('.c-navigation-subsite__link--button.c-navigation-subsite__link--level3').on('click', function () {
    if ($(this).hasClass('is-opened')) {
      $('.c-navigation-subsite__link--level3.is-opened').not(this).click();
    }
  });

  $('.js-nav-mobile__back').on('click', function () {
    $(this).parent().parent().parent().removeClass('is-opened').addClass('is-closed');
  });

  // Sidebar-Shrink
  const $shrinkButton = $('.js-navigation-shrinker');
  $shrinkButton.on('click', function () {
    $body.toggleClass('s-shrinked-sidebar');
  });
  // NavSkip: Suche
  const $searchFlyout = $('.js-flyout-search'); // TODO: Selektor bitte austauschen, da wir kein Flyout verwenden

  // navSkip öffnet die Suche in der Primärnavigation und fokussiert das Eingabefeld
  $('.js-navskip-search').on('click', function (ev) {
    ev.preventDefault();
    $searchFlyout.find('input[type="search"]').trigger('focus'); // TODO: Selektor bitte austauschen, da wir kein Flyout verwenden
  });

  // scroll service nav into view
  $('.c-nav-service-meta a').on('focusin', function () {
    if ($('.js-header').hasClass('is-sticky')) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  // Richtext-Accordion
  $('#content').gsb_toggle({
    richtext: true,
    richtextWrapper: "<div class='c-richtext-accordion'/>",
    richtextStart: ".js-richtext-accordion-start",
    richtextEnd: ".js-richtext-accordion-end",
    richtextControl: ".c-richtext-accordion__opener",
    heading: ".c-richtext-accordion__opener",
    responsive: null
  });

  // richtext-tab-accordion
  $('#content').gsb_toggle({
    mode: 'tabs',
    richtext: true,
    richtextWrapper: "<div class='c-richtext-tab-accordion'/>",
    richtextStart: ".js-richtext-tab-accordion-start",
    richtextEnd: ".js-richtext-tab-accordion-end",
    richtextControl: ".js-richtext-tab-accordion__opener",
    richtextTabControlContainerItem: "<li class='c-richtext-tab-accordion__item'></li>",
    richtextTabControlContainer: "<ul class='c-richtext-tab-accordion__list tabs-list'></ul>",
    responsive: [{
      breakpoint: 1023,
      mode: 'accordion'
    }]
  });

  // Accordions (z.B. Glossar)
  $('.js-accordion').gsb_toggle({
    accordionCloseOther: false,
    elements: '.js-accordion-entry',
    heading: '.js-accordion-opener',
    accordionContainer: '.js-accordion-container'
  });

  // Accordion (Öffnen/Schließen multipler Entries gleichzeitig)
  /* Alles auf- & einklappen Button */
  const jsAccordion = $('.js-accordion-toggle-all');
  let jsAllButton =
  '<button class="c-accordion__toggle-all-button js-accordion-button is-plus-link">' +
  '<span class="c-accordion__toggle-all-button-text-wrapper js-accordion-button-text-wrapper">' +
  '<span class="c-accordion__toggle-all-button-text js-accordion-button-text">' +
  ALL_SHOW +
  '</span>' +
  '</span>' +
  '<span class="c-accordion__toggle-all-button-icon js-accordion-button-icon">' +
  '</span>' +
  '</button>';

  setTimeout(() => {
    jsAccordion.find('.js-accordion-button-wrapper').each(function () {
      $(this).prepend(jsAllButton);
    });

    $body.on('click', '.js-accordion-button', function () {
      if ($(this).hasClass("is-plus-link")) {
        $(this).toggleClass("is-plus-link is-minus-link");
        $(this).find('.js-accordion-button-text').text(ALL_HIDE);
        $(this).closest(jsAccordion).find('.js-accordion-opener').each(function () {
          $(this).removeClass('inactive-control').addClass('active-control');
        });
        $(this).closest(jsAccordion).find('.js-accordion-entry').each(function () {
          if ($(this).prop("style")["display"] === 'none') {
            $(this).animate({ height: 'toggle' }, { duration: 400 });
          }
        });
      } else {
        $(this).toggleClass("is-minus-link is-plus-link");
        $(this).find('.js-accordion-button-text').text(ALL_SHOW);
        $(this).closest(jsAccordion).find('.js-accordion-opener').each(function () {
          $(this).removeClass('active-control').addClass('inactive-control');
        });
        $(this).closest(jsAccordion).find('.js-accordion-entry').each(function () {
          if ($(this).prop("style")["display"] === 'block') {
            $(this).animate({ height: 'toggle' }, { duration: 400 });
          }
        });
      }
    });
  }, 500);

  // HashControlled-Accordions (z.B. FAQList)
  $('.js-accordion-hashControlled').gsb_toggle({
    hashControlled: true,
    accordionCloseOther: false,
    elements: '.js-accordion-entry',
    heading: '.js-accordion-opener',
    accordionContainer: '.js-accordion-container'
  });

  // gsb_toggle without hashControl
  $(".js-tabs").gsb_toggle({
    mode: 'tabs',
    tabControls: '> .tabs-list > li button',
    responsive: [{
      breakpoint: mediumBreakpoint,
      mode: 'accordion'
    }],
    accordionCloseOther: false
  });

  let jsTabs = document.querySelector('.js-tabs');

  if (jsTabs !== null) {
    let observer = new MutationObserver(function (mutations) {
      let $headings = $('.c-tab-accordion__heading:has([aria-expanded="false"])');

      $('.js-tabs').find('.active-control[aria-selected="false"]').removeClass("active-control").addClass("inactive-control");
      if ($headings.length) {
        $headings.removeClass("active-control").addClass("inactive-control");
      }
    });
    observer.observe(jsTabs, {
      attributes: true,
      attributeFilter: ['data-togglemode']
    });
  }


  //Richtext-Accordion mit OpenGraphTags versehen
  $('.c-richtext-accordion').each(function (i, accordion) {
    const $accordion = $(accordion);
    $accordion.attr('itemscope', '').attr('itemtype', 'https://schema.org/FAQPage');
    $accordion.find('.c-richtext-accordion__opener').each(function (j, el) {
      const question = $(el);
      question.find('button').attr('itemprop', 'name');
      question.next('div').attr('itemscope', '').attr('itemprop', 'acceptedAnswer').attr('itemtype', 'https://schema.org/Answer').
      find('p').first().attr('itemprop', 'text');
      const content = question.nextUntil('.c-richtext-accordion__opener').add(question);
      content.wrapAll('<div itemScope itemProp="mainEntity" itemType="https://schema.org/Question"></div>');
    });
  });

  // Drucken
  $(".js-print").on("click", function (e) {
    e.preventDefault();
    window.print();
  });

  // Share
  $('.js-share').gsb_simple_toggle({
    opener: '.js-share-button',
    item: '.js-share-box',
    showClass: 'visible',
    hideClass: 'invisible',
    closeOnFocusout: true
  });

  // Toc
  $('.js-toc').gsb_simple_toggle({
    opener: '.js-toc-button',
    item: '.js-toc-wrapper',
    closeOnFocusout: true
  });

  // AutoSuggest
  $('.js-autosuggest').gsb_AutoSuggest();

  // Suche - Facetten & Sortierung
  $('.js-facet, .js-sort').gsb_simple_toggle();

  // Tools
  $('.js-tools').gsb_simple_toggle();

  // Fany-Selects
  $('.js-fancy-selects').gsb_fancy_selects();

  // Lightboxes - muss vor der gsb_slideshow eingebunden werden!
  const $glossarEntry = $('.GlossarEntry[data-lightbox-href]'),
    $jsLoupe = $('.js-loupe'),
    $cGalleryNumbers = $('.c-gallery .js-slider-numbers');

  gsb.requireGSBComponent("bundle_lightbox", $glossarEntry).done(function () {
    $glossarEntry.gsb_lightbox();
  });

  gsb.requireGSBComponent("bundle_lightbox", $jsLoupe).done(function () {
    $jsLoupe.not('.c-gallery *').gsb_lightbox();
  });

  gsb.requireGSBComponent("bundle_lightbox", $cGalleryNumbers).done(function () {
    $cGalleryNumbers.gsb_lightbox({
      lightboxType: 'multiple',
      preloadImages: false,
      element: '.js-slide',
      opener: '.js-loupe',
      // eslint-disable-next-line no-undef --
      imagePrev: image_url_back,
      // eslint-disable-next-line no-undef --
      imageNext: image_url_next
    });
  });


  // Slick Slider
  gsb.requireGSBComponent('bundle_slideshow', $('.js-slider-numbers')).
  done(function ($slider) {

    function getSlickSettings({ slides, scroll, breakpoint }) {
      if (slides === 'unslick') {
        return {
          breakpoint: breakpoint,
          settings: 'unslick'
        };
      }
      if (typeof slides === 'undefined' || slides < 1) {
        return {};
      }
      return {
        breakpoint: breakpoint,
        settings: {
          slidesToShow: slides,
          slidesToScroll: scroll
        }
      };
    }

    // Slideshow Navigation - Numbers und Dots
    $slider.each(function () {
      const smallSlides = $(this).data('small-slides') || 1,
        mediumSlides = $(this).data('medium-slides'),
        largeSlides = $(this).data('large-slides'),
        xLargeSlides = $(this).data('xlarge-slides'),
        xxLargeSlides = $(this).data('xxlarge-slides'),
        smallScroll = $(this).data('small-slides') || 1,
        mediumScroll = $(this).data('medium-slides'),
        largeScroll = $(this).data('large-slides'),
        xLargeScroll = $(this).data('xlarge-slides'),
        xxLargeScroll = $(this).data('xxlarge-slides'),
        infinite = Boolean($(this).data('infinite')) && $(this).data('infinite') === 1,
        autoplay = Boolean($(this).data('autoplay')) && $(this).data('autoplay') === 1,
        ariaRole = $(this).data('aria-role') || '';

      const settingsArray = [
      { slides: smallSlides, scroll: smallScroll, breakpoint: minBreakpoint },
      { slides: mediumSlides, scroll: mediumScroll, breakpoint: mediumBreakpoint },
      { slides: largeSlides, scroll: largeScroll, breakpoint: largeBreakpoint },
      { slides: xLargeSlides, scroll: xLargeScroll, breakpoint: xLargeBreakpoint },
      { slides: xxLargeSlides, scroll: xxLargeScroll, breakpoint: xxLargeBreakpoint }];


      const finalSettings = settingsArray.
      map(getSlickSettings).
      filter((value) => Object.keys(value).length !== 0);

      $(this).gsb_slideshow_numbers({
        ariaRole: ariaRole,
        selectors: {},
        classes: {
          initialized: 'is-initialized'
        },
        slickOptions: {
          rows: 0,
          // https://github.com/kenwheeler/slick#settings verfügbare Optionen und Defaults
          slide: '.js-slide',
          infinite: infinite,
          autoplay: autoplay,
          dots: false,
          arrows: true,
          slidesToShow: smallSlides,
          mobileFirst: true,
          responsive: finalSettings
        }
      });
    });
  });


  // scroll-control
  $('html').gsb_scroll_control({
    cookiebannerAnimationDuration: 900, // gsb_banner.options.animationSpeed ist auch 900
    scrollAnimationDuration: 600,
    scrollOnPageLoad: true,
    scrollOnAnchorLinkClick: true,
    scrollOffset: function () {
      return 100;
    },
    selectors: {
      anchorLinks: 'a[href*="#"]:not([href="#"]):not(.hash-controlled)',
      cookiebanner: '#c-cookiebanner' // Berücksichtigen des cookiebanners, verwendet cookiebannerAnimationDuration
    }
  });

  gsb.requireGSBComponent('bundle_map', $('.js-map')).done(function () {
    $content.find('.js-map').on('afterMapInit', function () {
      $('.js-map__filter-reset').trigger("click");
    }).gsb_region_map({});

    $('.js-map__jump-link').on('click', function () {
      $('html, body').animate({
        scrollTop: $("#map-list").offset().top
      }, 2000);
    });

    $('.js-map__filter-reset').on('click', function () {
      $('.c-map__filter-element.c-map__filter-element--checked').click();
      $('.js-map-filter-container .c-search-field__input input').val("");
      $('.js-map-filter-text-button button').click();
    });

    $('.js-autosuggest-map').gsb_AutoSuggest({
      minInputLength: 3
    }).on('open.AutoSuggest.gsb', function () {

      $('.js-map-filter-text input').on('change', function () {
        $('.js-map-filter-text-button button').click();
        $('.js-autosuggest-map').trigger('close.AutoSuggest.gsb');
      });

      $('.js-autosuggest-map .c-autosuggest__item').on('click', function () {
        $('.js-map-filter-text-button button').click();
        $('.js-autosuggest-map').trigger('close.AutoSuggest.gsb');
      });
    });

    let lastClickedMap;

    $('.js-map-filter-fullscreen').on('click', function () {
      if ($(window).innerWidth() <= 1280) {
        lastClickedMap = $(this).closest('.c-map');
        lastClickedMap.find('.js-map-filter-container').addClass('is-visible').prependTo('body > .l-page-wrapper');

        if ($('body > .l-page-wrapper .c-map__filter-list-container .c-map__filter-inner-container[aria-expanded="false"]').length > 0) {
          $('body > .l-page-wrapper .c-map__filter-list-container .c-map__filter-inner-container').click();
        }

        $('body').addClass('menu-opened');
        $('body > .l-page-wrapper > .js-map-filter-container').find('.c-map__filter-exit-fullscreen').focus();
      }
    });

    $('.js-map-filter-exit-fullscreen').on('click keyup', function (event) {
      $('body').removeClass('menu-opened');

      if (event.key === "Enter" && event.type === "keyup") {
        $(this).parent().appendTo(lastClickedMap).removeClass('is-visible');
      } else {
        if (event.type === "click") {
          $(this).parent().appendTo(lastClickedMap).removeClass('is-visible');
        }
      }
    });
  });

  // Formular - bei Fehlern im Formular zum ersten Fehlerlink springen
  const $formErrors = $('.js-error-list');
  if ($formErrors.length > 0) {
    setTimeout(function () {
      $formErrors.first().get(0).scrollIntoView();
      $($formErrors.find('a').first()).focus().select();
    });
  }

  // toggle for footer - small
  $('.js-smallAccordion').gsb_toggle({
    tabContainer: '.js-smallAccordion__container',
    heading: '.js-smallAccordion__toggle',
    elements: '.js-smallAccordion__toggle + ul',
    mode: 'none',
    responsive: [{
      breakpoint: mediumBreakpoint,
      mode: 'accordion'
    }]
  });

  // Gesetzgebungsverfahren
  const $processSlideshow = $('.js-process-slider');
  gsb.requireGSBComponent("bundle_slideshow", $processSlideshow).done(function () {
    function getSlickSettings({ slides, scroll, breakpoint }) {
      if (slides === "unslick") {
        return {
          breakpoint: breakpoint,
          settings: 'unslick'
        };
      }
      if (typeof slides === "undefined" || slides < 1) {
        return {};
      }
      return {
        breakpoint: breakpoint,
        settings: {
          slidesToShow: slides,
          slidesToScroll: scroll
        }
      };
    }

    function showDescription(slider) {
      if (slider) {
        let activeSlickElement = $(slider).find('.slick-current').attr('data-slick-index');
        $(slider).siblings('.js-process-details').removeClass('is-active');
        $(slider).siblings('.js-process-details[data-process-item-id="' + activeSlickElement + '"]').addClass('is-active');
      } else {
        let activeSlickElement = $('.js-process-slider').find('.slick-current').attr('data-slick-index');
        $('.js-process-details').removeClass('is-active');
        $('.js-process-details[data-process-item-id="' + activeSlickElement + '"]').addClass('is-active');
      }
    }

    const settingsArray = [
    { slides: 1, scroll: 1, breakpoint: minBreakpoint }];


    const finalSettings = settingsArray.
    map(getSlickSettings).
    filter((value) => Object.keys(value).length !== 0);

    $processSlideshow.gsb_slideshow_numbers({
      selectors: {},
      classes: {
        initialized: 'is-initialized'
      },
      slickOptions: {
        rows: 0,
        slide: '.js-process-slide',
        dots: true,
        arrows: true,
        slidesToShow: finalSettings.slides,
        mobileFirst: true,
        responsive: finalSettings
      }
    }).on('afterChange.slick', function () {
      showDescription(this);

      if ($(this).find('.js-slideshow-navigation-prev').attr('disabled')) {
        $(this).find('.js-slideshow-navigation-fast-prev').attr('disabled', 'disabled');
      } else {
        $(this).find('.js-slideshow-navigation-fast-prev').removeAttr('disabled');
      }

      if ($(this).find('.js-slideshow-navigation-next').attr('disabled')) {
        $(this).find('.js-slideshow-navigation-fast-next').attr('disabled', 'disabled');
      } else {
        $(this).find('.js-slideshow-navigation-fast-next').removeAttr('disabled');
      }
    });

    showDescription(this);

    let lastClickedProcessSlider;

    $('.c-process__step').on('click', function (ev) {
      ev.preventDefault();

      let slideNumber;

      if ($(this).closest('.js-process-fullscreen.is-visible').length === 0) {
        slideNumber = $(this).parent().data('slick-index');
        $(this).closest('.js-process-slider').slick('slickGoTo', slideNumber);
      } else {
        slideNumber = $(this).parent().data('process-item-id');
        lastClickedProcessSlider.find('.js-process-slider').slick('slickGoTo', slideNumber);
        $('body').removeClass('menu-opened');
        $(this).closest('.js-process-fullscreen').find('.js-process-exit-fullscreen').click();
      }
    });

    $('.js-slideshow-navigation-fast-prev').on('click', function () {
      $(this).closest('.js-process-slider').slick('slickGoTo', 0);
    });

    $('.js-slideshow-navigation-fast-next').on('click', function () {
      const slideNumber = $('.js-process-slide').last().attr('data-slick-index');
      $(this).closest('.js-process-slider').slick('slickGoTo', slideNumber);
    });

    $('.js-slideshow-navigation-fullscreen').on('click', function () {
      lastClickedProcessSlider = $(this).closest('.c-process');
      lastClickedProcessSlider.find('.js-process-fullscreen').addClass('is-visible').prependTo('body > .l-page-wrapper');
      lastClickedProcessSlider.find('.js-process-fullscreen').find('.js-process__button').removeClass('slick-current');
      lastClickedProcessSlider.find('.js-process-fullscreen').find('.js-process-details').removeClass('is-active');
      $('body').addClass('menu-opened');
      $('body > .l-page-wrapper > .js-process-fullscreen').find('.js-process-exit-fullscreen').focus();
    });

    $('.js-process-exit-fullscreen').on('click', function () {
      let activeElement = lastClickedProcessSlider.find('.js-process-slider .slick-current').attr('data-slick-index');
      lastClickedProcessSlider.find('.js-process-slider').slick('slickGoTo', activeElement).removeClass('is-visible');
      $(this).parent().parent().parent().appendTo(lastClickedProcessSlider).removeClass('is-visible');
      $('body').removeClass('menu-opened');

      setTimeout(function () {
        lastClickedProcessSlider.find('.js-process-slider .slick-current button').focus();
      }, 100);
    });
  });

  // // .c-anchor-nav
  const $jsAnchorNav = $('.js-toc-scrolly');
  if ($jsAnchorNav.length > 0) {
    $('.content').gsb_scrollytelling_anchor_nav({
      selectors: {
        navList: ".js-toc-scrolly",
        navItemLink: ".js-toc__link"
      }
    });
    $(window).on('orientationchange', function () {
      $('.content').gsb_scrollytelling_anchor_nav({
        selectors: {
          navList: ".js-toc-scrolly",
          navItemLink: ".js-toc__link"
        }
      });
    });
  }

  // toggle default
  $('.js-simple-toggle').gsb_simple_toggle({
    showClass: 'is-shown',
    hideClass: 'is-hidden'
  });

  $('.js-simple-toggle-filter').gsb_simple_toggle({
    showClass: 'is-shown',
    hideClass: 'is-hidden',
    item: '.js-simple-toggle-item-filter',
    opener: '.js-simple-toggle-opener-filter'
  });

  // toggle Akkordeon Wohngeldrechner
  $(".c-content-accordion").gsb_toggle({
    mode: 'accordion',
    heading: "> .tabs-container > .c-content-accordion__item > .heading",
    elements: "> .tabs-container .c-content-accordion__item > div"
  });


  $('[name=wohngeldrechner2025]').gsb_wohngeldrechner2025({});
  // Scroll to wohngeldrechner
  if ($('form[name="wohngeldrechner*"]').length) {
    if ($('input[name="result"]').val() !== '') {
      setTimeout(function () {
        $('html, body').animate({ scrollTop: $('form[name="wohngeldrechner*"] h2').first().offset().top }, 1000);
      }, 200);
    }
  }

  $('.js-timeline-controls').gsb_scrollytelling_anchor_nav_timeline({ anchorsExist: true });

  //echarts
  function eChartInit() {
    if (gsb.chartConfigs) {
      gsb.requireGSBComponent('bundle_echarts', $('.js-chart')).done(function ($charts) {
        $charts.each((i, el) => {
          const $chart = $(el);
          const variant = $chart.attr('data-chart-variant');
          const theme = $chart.attr('data-chart-theme');
          const themeDark = theme + '-dark';

          if (gsb.chartConfigs[variant]) {
            $chart.gsb_echarts({
              libConfig: gsb.chartConfigs[variant],
              themes: {
                default: theme,
                darkMode: themeDark
              }
            });
          } else {
            throw Error(
              `Keine Konfig für die Diagramm-Variante '${variant}' gefunden. Bitte prüfe,` +
              ' ob die Konfiguration im Browser geladen wird und' +
              ' ob der "Glue"-Code um den Beispiel-Code herum (a) vorhanden ist und (b) korrekt ist'
            );
          }
        });
      });
    }
  }

  eChartInit();

  //Akkordion-Filter
  $('body[data-instant-faq-search-enabled]').find('.js-accordion-toggle-all').first().gsb_search();

});

// eslint-disable-next-line @eslint-community/eslint-comments/disable-enable-pair -- Unterdrücke, dass no-console nicht wieder aktiviert wird
/* eslint-disable no-console -- Das Ziel ist es Konsolen-Ausgaben zu machen */
$(function () {
  // Prüfe, ob Aria-describedby und labelled-by passende IDs und zugehörige Elemente haben
  if (typeof ISPREVIEW === 'undefined' ? false : ISPREVIEW) {
    const $body = $('body');
    let aria = new Set();
    let ids = new Set();
    const arrAria = [...$body.html().matchAll(/<[^<]*(aria-labelledby="([^"]*)"|aria-describedby="([^"]*)")[^>]*>/gmu)];
    arrAria.forEach((el) => {
      if (!aria.has(el[2]) && !aria.has(el[3])) {
        aria.add(el[2]);
        aria.add(el[3]);
        aria.delete(undefined);
      } else {
        console.log(`ID bereits vergeben: ${el[0]} . Das ist erlaubt! Bitte aber auf copy-paste-Fehler prüfen.`);
      }
    });
    const arrId = [...$body.html().matchAll(/<[^<]* id="([^"]*)"[^>]*>/gmu)];
    arrId.forEach((el) => {
      if (!ids.has(el[1])) {
        ids.add(el[1]);
      } else {
        console.log(`ID doppelt: ${el[0]}`);
      }
    });

    function splitArr(arr) {
      const splits = [];
      const newSet = new Set();
      arr.forEach((el) => {
        splits.push(el.split(" "));
      });
      splits.forEach((array) => {
        array.forEach((el) => {
          newSet.add(el);
        });
      });
      newSet.delete("");
      return newSet;
    }

    aria = splitArr(aria);
    ids = splitArr(ids);

    const missingIds = new Set();
    aria.forEach((el) => {
      if (!ids.has(el)) {
        missingIds.add(el);
      }
    });

    if (missingIds.size > 0) {
      const additionalHTML = 'Folgende Aria-Ids haben kein Ziel: ';
      missingIds.forEach((el) => console.log(additionalHTML + el));
    }
  }
});

    

   /* Ende init */
jQuery(document).ready(function (jQuery){
  // Autosuggest
  var searchforms = [];
  if(searchforms.length > 0){
    $(searchforms).each(function(index){
      var valueObj = searchforms[index],form;
      if(valueObj !== undefined){
        form = jQuery('form[name="'+ valueObj.name +'"]');
        if(form.length > 0){
          form.gsb_AutoSuggest({}, valueObj.action);
        }
      }
    });
  }
});
