/******/ var __webpack_modules__ = ({

/***/ "./node_modules/@ryze-digital/js-utilities/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@ryze-digital/js-utilities/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Base: () => (/* reexport safe */ _src_Base_js__WEBPACK_IMPORTED_MODULE_0__.Base),
/* harmony export */   BreakpointProvider: () => (/* reexport safe */ _src_BreakpointProvider_js__WEBPACK_IMPORTED_MODULE_1__.BreakpointProvider),
/* harmony export */   DateToInputConverter: () => (/* reexport safe */ _src_DateToInputConverter_js__WEBPACK_IMPORTED_MODULE_2__.DateToInputConverter),
/* harmony export */   DetectSticky: () => (/* reexport safe */ _src_DetectSticky_js__WEBPACK_IMPORTED_MODULE_3__.DetectSticky),
/* harmony export */   FontVerification: () => (/* reexport safe */ _src_FontVerification_js__WEBPACK_IMPORTED_MODULE_4__.FontVerification),
/* harmony export */   ReduceFunctionCalls: () => (/* reexport safe */ _src_ReduceFunctionCalls_js__WEBPACK_IMPORTED_MODULE_5__.ReduceFunctionCalls),
/* harmony export */   Selectors: () => (/* reexport safe */ _src_Selectors_js__WEBPACK_IMPORTED_MODULE_6__.Selectors)
/* harmony export */ });
/* harmony import */ var _src_Base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/Base.js */ "./node_modules/@ryze-digital/js-utilities/src/Base.js");
/* harmony import */ var _src_BreakpointProvider_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/BreakpointProvider.js */ "./node_modules/@ryze-digital/js-utilities/src/BreakpointProvider.js");
/* harmony import */ var _src_DateToInputConverter_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./src/DateToInputConverter.js */ "./node_modules/@ryze-digital/js-utilities/src/DateToInputConverter.js");
/* harmony import */ var _src_DetectSticky_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/DetectSticky.js */ "./node_modules/@ryze-digital/js-utilities/src/DetectSticky.js");
/* harmony import */ var _src_FontVerification_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./src/FontVerification.js */ "./node_modules/@ryze-digital/js-utilities/src/FontVerification.js");
/* harmony import */ var _src_ReduceFunctionCalls_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./src/ReduceFunctionCalls.js */ "./node_modules/@ryze-digital/js-utilities/src/ReduceFunctionCalls.js");
/* harmony import */ var _src_Selectors_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./src/Selectors.js */ "./node_modules/@ryze-digital/js-utilities/src/Selectors.js");










/***/ }),

/***/ "./node_modules/@ryze-digital/js-utilities/src/Base.js":
/*!*************************************************************!*\
  !*** ./node_modules/@ryze-digital/js-utilities/src/Base.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Base: () => (/* binding */ Base)
/* harmony export */ });
/**
 * Basis-Klasse zur einheitlichen Verwendung von Events und Optionen.
 * Jede Adventure-Komponente leitet von dieser Basis-Klasse ab.
 *
 * @example
 * export class Example extends adventure.Base {
 *     constructor () {
 *          const element = document.querySelector('.example');
 *
 *          this.on(element, 'click', (event) => {...});
 *     }
 * }
 */
class Base {
    /**
     * @param {object} defaultOptions
     * @param {object} options
     */
    constructor(defaultOptions, options) {
        this._defaultOptions = defaultOptions;
        this._options = options;
        this._eventListeners = new Map();
    }

    /**
     * @returns {object}
     */
    get options() {
        return {
            ...this._defaultOptions,
            ...this._options
        };
    }

    /**
     * @private
     * @param {object} selector
     * @returns {boolean}
     */
    _isNodeList(selector) {
        // eslint-disable-next-line
        return NodeList.prototype.isPrototypeOf(selector);
    }

    /**
     * @private
     * @param {Node} element
     * @param {string} eventName
     * @param {Function} callback
     */
    _attachEvent(element, eventName, callback) {
        if (this._eventListeners.has(element)) {
            this._eventListeners.get(element).push({
                [eventName]: callback
            });
        } else {
            this._eventListeners.set(element, [{
                [eventName]: callback
            }]);
        }
        element.addEventListener(eventName, callback);
    }

    /**
     * @private
     * @param {Node} element
     * @param {string} eventName
     * @param {Function} callback
     * @param {number} eventIndex - Es können gleichzeitig mehrere Listener für den gleichen eventName registriert sein.
     */
    _detachEvent(element, eventName, callback, eventIndex) {
        element.removeEventListener(eventName, callback);
        this._eventListeners.get(element).splice(eventIndex, 1);
    }

    /**
     * @private
     * @param {Node} element
     * @param {string} eventName
     */
    _detachEvents(element, eventName) {
        const allListenersForElement = this._eventListeners.get(element);

        allListenersForElement.forEach((listener, index) => {
            if (eventName === '') {
                this._detachEvent(element, Object.keys(listener)[0], Object.values(listener)[0], index);
            } else {
                const callback = listener[eventName];

                if (typeof callback === 'function') {
                    this._detachEvent(element, eventName, callback, index);
                }
            }
        });

        if (this._eventListeners.get(element).length === 0) {
            this._eventListeners.delete(element);
        }
    }

    /**
     * @param {string} name
     * @param {object} [data={}]
     * @param {Element} el
     */
    emitEvent(name = '', data = {}, el = this.options.el) {
        const event = new CustomEvent(name, {
            detail: data
        });

        el.dispatchEvent(event);
    }

    /**
     * Fügt einem oder mehreren Elementen ein Event hinzu.
     *
     * @param {Node|NodeList} selector
     * @param {string} eventName
     * @param {Function} callback
     */
    on(selector, eventName, callback) {
        // Todo: ermögliche Übergabe von Options (wie passive: true) für addEventlistener

        if (this._isNodeList(selector)) {
            selector.forEach((element) => {
                this._attachEvent(element, eventName, callback);
            });
        } else {
            this._attachEvent(selector, eventName, callback);
        }
    }

    /**
     * Entfernt einem Element oder mehreren Elementen das übergebene Event.
     *
     * @param {Node|NodeList} selector
     * @param {string} [eventName] - Kann ausgelassen werden, um alle Events zu entfernen.
     */
    off(selector, eventName = '') {
        if (this._isNodeList(selector)) {
            selector.forEach((element) => {
                this._detachEvents(element, eventName);
            });
        } else {
            this._detachEvents(selector, eventName);
        }
    }

    /**
     * Entfernt alle registrierten Events.
     */
    offAll() {
        this._eventListeners.forEach((allListenersForElement, element) => {
            this._detachEvents(element, '');
        });
    }
}

/***/ }),

/***/ "./node_modules/@ryze-digital/js-utilities/src/BreakpointProvider.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@ryze-digital/js-utilities/src/BreakpointProvider.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BreakpointProvider: () => (/* binding */ BreakpointProvider)
/* harmony export */ });
/**
 * Stellt in adventure-scss definierte Breakpoints im JavaScript zur Verfügung
 *
 * @example
 * const {breakpoints} = new adventure.BreakpointProvider();
 *
 * window.matchMedia(`(min-width: ${breakpoints.large})`).addListener(() => {...});
 */
class BreakpointProvider {
    /**
     * @param {HTMLElement} el
     * @param {string} pseudoElement
     */
    constructor(el = document.querySelector('html'), pseudoElement = 'after') {
        this._el = el;
        this._pseudoElement = pseudoElement;
        this._breakpoints = this._getBreakpoints();
    }

    /**
     * @private
     * @returns {string}
     */
    _getContentValue() {
        return window.getComputedStyle(this._el, `::${this._pseudoElement}`).getPropertyValue('content').replace(/['"]/g, '');
    }

    /**
     * @private
     * @returns {object}
     */
    _getBreakpoints() {
        const breakpointsString = this._getContentValue();
        const breakpoints = {};

        breakpointsString.split(',').forEach((keyValuePair) => {
            const breakpoint = keyValuePair.split(':');

            breakpoints[breakpoint[0]] = breakpoint[1];
        });

        return breakpoints;
    }

    /**
     * @returns {object}
     */
    get breakpoints() {
        return this._breakpoints;
    }
}

/***/ }),

/***/ "./node_modules/@ryze-digital/js-utilities/src/DateToInputConverter.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@ryze-digital/js-utilities/src/DateToInputConverter.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DateToInputConverter: () => (/* binding */ DateToInputConverter)
/* harmony export */ });
/**
 * Konvertiert ein Date-Objekt zur Verwendung mit input[type="date"] und input[type="time"]
 *
 * @example
 * const dateToInputConverter = new adventure.DateToInputConverter();
 *
 * document.querySelector('input[type="date"]').value = dateToInputConverter.date;
 */
class DateToInputConverter {
    constructor() {
        // eslint-disable-next-line prefer-rest-params
        this.dateObj = new Date(...arguments);
    }

    /**
     * @private
     * @param {number} number
     * @returns {string}
     */
    _prependLeadingZero(number) {
        let numberAsString = number.toString();

        if (number < 10) {
            numberAsString = `0${number}`;
        }

        return numberAsString;
    }

    /**
     * @returns {string}
     */
    get date() {
        return this.dateObj.toISOString().substr(0, 10);
    }

    /**
     * @returns {string}
     */
    get hours() {
        const hours = this.dateObj.getHours();

        return this._prependLeadingZero(hours);
    }

    /**
     * @returns {string}
     */
    get minutes() {
        const minutes = this.dateObj.getMinutes();

        return this._prependLeadingZero(minutes);
    }

    /**
     * @returns {string}
     */
    get time() {
        return `${this.hours}:${this.minutes}`;
    }
}

/***/ }),

/***/ "./node_modules/@ryze-digital/js-utilities/src/DetectSticky.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@ryze-digital/js-utilities/src/DetectSticky.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DetectSticky: () => (/* binding */ DetectSticky)
/* harmony export */ });
/**
 * Setzt Klasse während ein Element "sticky" ist
 *
 * @see https://davidwalsh.name/detect-sticky
 * @example
 * const element = document.getElementById('id');
 *
 * new adventure.DetectSticky(element);
 */
class DetectSticky {
    /**
     * @param {HTMLElement} el
     */
    constructor(el) {
        this._el = el;
        this._observer = this._getObserver();

        this._el.style.top = '-1px';

        this._observer.observe(this._el);
    }

    /**
     * @private
     * @returns {IntersectionObserver}
     */
    _getObserver() {
        return new IntersectionObserver(([{ target, intersectionRatio }]) => {
            target.classList.toggle('is-sticky', intersectionRatio < 1);
        }, {
            threshold: [1]
        });
    }

    /**
     * @returns {IntersectionObserver}
     */
    get observer() {
        return this._observer;
    }
}

/***/ }),

/***/ "./node_modules/@ryze-digital/js-utilities/src/FontVerification.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@ryze-digital/js-utilities/src/FontVerification.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FontVerification: () => (/* binding */ FontVerification)
/* harmony export */ });
/**
 * Verifiziert ein Fonts.net Projekt asynchron
 *
 * @example
 * new adventure.FontVerification('your fonts.net project ID');
 */
class FontVerification {
    /**
     * @param {string} projectId
     * @param {string} baseUrl
     */
    constructor(projectId, baseUrl = 'fast.fonts.net/t/1.css?apiType=css&projectid=') {
        this._projectId = projectId;
        this._baseUrl = baseUrl;

        if (document.readyState !== 'loading') {
            this._createVerificationTag();

            return;
        }

        document.addEventListener('DOMContentLoaded', this._createVerificationTag);
    }

    /**
     *  @private
     */
    _createVerificationTag() {
        const linkTag = document.createElement('link');
        const url = `https://${this._baseUrl}${this._projectId}`;

        linkTag.rel = 'stylesheet';
        linkTag.media = 'all';
        linkTag.href = url;

        document.body.appendChild(linkTag);
    }
}

/***/ }),

/***/ "./node_modules/@ryze-digital/js-utilities/src/ReduceFunctionCalls.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@ryze-digital/js-utilities/src/ReduceFunctionCalls.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ReduceFunctionCalls: () => (/* binding */ ReduceFunctionCalls)
/* harmony export */ });
/**
 * Reduziert Funktionsaufrufe
 *
 * @example
 * window.addEventListener('resize', adventure.ReduceFunctionCalls.throttle(() => {...}));
 */
class ReduceFunctionCalls {
    /**
     * @param {Function} callback
     * @param {number} delay
     * @param {object} scope
     * @param {Array} args
     * @returns {Function}
     * @see https://codeburst.io/throttling-and-debouncing-in-javascript-b01cad5c8edf
     */
    static throttle(callback, delay = 250, scope = this, ...args) {
        let timeout;
        let lastRan;

        return () => {
            if (!lastRan) {
                callback.apply(scope, args);
                lastRan = Date.now();
            } else {
                clearTimeout(timeout);

                timeout = setTimeout(() => {
                    if ((Date.now() - lastRan) >= delay) {
                        callback.apply(scope, args);
                        lastRan = Date.now();
                    }
                }, delay - (Date.now() - lastRan));
            }
        };
    }

    /**
     * @param {Function} callback
     * @param {number} delay
     * @param {object} scope
     * @param {Array} args
     * @returns {Function}
     * @see https://davidwalsh.name/javascript-debounce-function
     */
    static debounce(callback, delay = 250, scope = this, ...args) {
        let timeout;

        return () => {
            const debouncedCallback = () => {
                timeout = null;

                callback.apply(scope, args);
            };

            clearTimeout(timeout);

            timeout = setTimeout(debouncedCallback, delay);
        };
    }
}

/***/ }),

/***/ "./node_modules/@ryze-digital/js-utilities/src/Selectors.js":
/*!******************************************************************!*\
  !*** ./node_modules/@ryze-digital/js-utilities/src/Selectors.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Selectors: () => (/* binding */ Selectors)
/* harmony export */ });
/**
 * DOM-Zugriffe, die nicht mit CSS möglich sind
 *
 * @example
 * document.querySelector('button').addEventListener('click', (event) => {
 *     const siblings = adventure.Selectors.siblings(event.target);
 * });
 */
class Selectors {
    /**
     *
     * @param {HTMLElement} element
     * @returns {Array}
     */
    static siblings(element) {
        return [...element.parentElement.children].filter((siblings) => {
            return siblings !== element;
        });
    }
}

/***/ }),

/***/ "./src/scripts/HeightEqualizer.js":
/*!****************************************!*\
  !*** ./src/scripts/HeightEqualizer.js ***!
  \****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HeightEqualizer: () => (/* binding */ HeightEqualizer)
/* harmony export */ });
/* harmony import */ var _ryze_digital_js_utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ryze-digital/js-utilities */ "./node_modules/@ryze-digital/js-utilities/index.js");


class HeightEqualizer {
    /**
     * @type {boolean}
     */
    #observe = false;

    /**
     * @type {object}
     */
    #options;

    /**
     * @type {NodeList}
     */
    #secondLevels;

    /**
     * @type {MediaQueryList}
     */
    #breakpoint;

    /**
     *
     * @param {object} options
     * @param {MediaQueryList} breakpoint
     */
    constructor(options, breakpoint) {
        this.#options = options;
        this.#breakpoint = breakpoint;
        this.#secondLevels = this.#options.el.querySelectorAll('.level-wrapper:is(nav > .level-wrapper) > ul > li > .level-wrapper');

        this.#breakpoint.addListener(() => {
            if (this.#breakpoint.matches) {
                this.#resetHeights('0px');
            } else {
                this.stop();
            }
        });

        window.addEventListener('resize', _ryze_digital_js_utilities__WEBPACK_IMPORTED_MODULE_0__.ReduceFunctionCalls.throttle(this.equalize.bind(this)));
    }

    start() {
        this.#observe = true;
    }

    stop() {
        this.#observe = false;

        if (this.#breakpoint.matches) {
            this.#resetHeights('0px');
        } else {
            this.#resetHeights();
        }
    }

    equalize() {
        if (this.#observe === false) {
            return;
        }

        const highestListHeight = this.#getHighestListHeight();

        this.#secondLevels.forEach((secondLevel) => {
            window.setTimeout(() => {
                secondLevel.style.height = `${highestListHeight}px`;
            }, 0);
        });
    }

    /**
     *
     * @returns {number}
     */
    #getHighestListHeight() {
        const openLists = this.#options.el.querySelectorAll(`.${this.#options.classes.subLevelOpen} > ul`);
        const heights = [];
        const currentHeight = this.#secondLevels[0].getBoundingClientRect().height;

        this.#resetHeights();

        openLists.forEach((list) => {
            heights.push(list.getBoundingClientRect().height);
        });

        this.#secondLevels.forEach((secondLevel) => {
            secondLevel.style.height = `${currentHeight}px`;
        });

        return Math.max(...heights);
    }

    /**
     *
     * @param {string} height
     */
    #resetHeights(height = 'auto') {
        this.#secondLevels.forEach((secondLevel) => {
            secondLevel.style.height = height;
        });
    }
}

/***/ }),

/***/ "./src/scripts/MegaMenu.js":
/*!*********************************!*\
  !*** ./src/scripts/MegaMenu.js ***!
  \*********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MegaMenu: () => (/* binding */ MegaMenu)
/* harmony export */ });
/* harmony import */ var _ryze_digital_js_utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ryze-digital/js-utilities */ "./node_modules/@ryze-digital/js-utilities/index.js");
/* harmony import */ var _HeightEqualizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./HeightEqualizer.js */ "./src/scripts/HeightEqualizer.js");



class MegaMenu extends _ryze_digital_js_utilities__WEBPACK_IMPORTED_MODULE_0__.Base {
    /**
     * @type {NodeList}
     */
    #subLevelTriggers;

    /**
     * @type {utils.BreakpointProvider}
     */
    #breakpointProvider;

    /**
     * @type {MediaQueryList}
     */
    #breakpoint;

    /**
     * {HeightEqualizer}
     */
    #heightEqualizer;

    /**
     * @type {NodeList}
     */
    #activeItems;

    /**
     *
     * @param {object} options
     * @param {HTMLElement} [options.el]
     * @param {HTMLElement} [options.menuToggle]
     * @param {string} [options.breakpoint]
     * @param {object} [options.classes]
     * @param {string} [options.classes.levelWrapper]
     * @param {string} [options.classes.subLevelOpen]
     * @param {string} [options.classes.activeItems]
     */
    constructor(options) {
        super({
            el: document.querySelector('[data-mega-menu]'),
            menuToggle: document.querySelector('[data-mega-menu-toggle]'),
            breakpoint: 'large',
            openActiveSubLevel: true,
            classes: {
                levelWrapper: 'level-wrapper',
                subLevelOpen: 'open',
                activeItems: 'is-active'
            }
        }, options);

        this.#subLevelTriggers = this.options.el.querySelectorAll('li:has(ul) > button');
        this.#breakpointProvider = new _ryze_digital_js_utilities__WEBPACK_IMPORTED_MODULE_0__.BreakpointProvider();
        this.#breakpoint = window.matchMedia(`(min-width: ${this.#breakpointProvider.breakpoints[this.options.breakpoint]})`);
        this.#heightEqualizer = new _HeightEqualizer_js__WEBPACK_IMPORTED_MODULE_1__.HeightEqualizer(this.options, this.#breakpoint);
        this.#activeItems = this.options.el.querySelectorAll(`.${this.options.classes.activeItems}`);
    }

    init() {
        let outsideClickBound = false;
        const topLevelWrapper = this.options.el.querySelector('.level-wrapper');

        this.options.menuToggle.addEventListener('click', () => {
            this.#toggleSubLevel(this.options.el.querySelector(`.${this.options.classes.levelWrapper}`));
        });

        this.#subLevelTriggers.forEach((trigger) => {
            trigger.addEventListener('click', ({ target }) => {
                this.#closeSiblingSubLevels(target);
                this.#toggleSubLevel(target.closest('button').nextElementSibling);

                if (this.#getParents(trigger, '.level-wrapper').length === 1 && outsideClickBound === false) {
                    this.#bindOutsideClick();
                    outsideClickBound = true;
                }
            });
        });

        this.options.el.querySelectorAll('[data-back]').forEach((backButton) => {
            backButton.addEventListener('click', this.#back);
        });

        this.options.el.querySelectorAll('[data-close]').forEach((closeButton) => {
            closeButton.addEventListener('click', () => {
                this.#closeAllSubLevels();
            });
        });

        if (this.#breakpoint.matches) {
            this.#setInert(topLevelWrapper, false);
        }

        this.#breakpoint.addListener(() => {
            this.#closeAllSubLevels();

            if (this.#breakpoint.matches) {
                this.#setInert(topLevelWrapper, false);
            } else {
                this.#setInert(topLevelWrapper, true);
            }
        });

        if (this.options.openActiveSubLevel) {
            this.#openActiveSubLevel();
        }

        document.addEventListener ('keydown', (event) => {
            if (event.key === 'Escape') {
                const openSubLevel = this.options.el.querySelector(`.${this.options.classes.subLevelOpen}`);

                if (openSubLevel === null) {
                    return;
                }

                this.#closeSubLevel(openSubLevel);
            }
        });
    }

    #back = ({ target }) => {
        const subLevel = target.closest(`.${this.options.classes.subLevelOpen}`);

        this.#closeSubLevel(subLevel);
    };

    /**
     *
     * @param {HTMLDivElement} subLevel
     */
    #toggleSubLevel(subLevel) {
        if (subLevel.classList.contains(this.options.classes.subLevelOpen)) {
            this.#closeSubLevel(subLevel);
        } else {
            this.#openSubLevel(subLevel);
        }

        this.#heightEqualizer.equalize(subLevel);
    }

    /**
     *
     * @param {HTMLDivElement} subLevel
     */
    #openSubLevel(subLevel) {
        const parentLevels = this.#getParents(subLevel, '.level-wrapper').length;
        const subLevelTrigger = subLevel.previousElementSibling;

        if (parentLevels === 1 && this.#breakpoint.matches) {
            this.#heightEqualizer.start();
        }

        if (parentLevels > 0 && !this.#breakpoint.matches) {
            const directParentLevel = this.#getParents(subLevel, '.level-wrapper')[0];

            if (directParentLevel.querySelector('ul').offsetHeight > subLevel.querySelector('ul').offsetHeight) {
                subLevel.style.transform = `translateY(${directParentLevel.scrollTop}px)`;
            }
        }

        subLevel.classList.add(this.options.classes.subLevelOpen);
        this.#setInert(subLevel, false);

        if (subLevelTrigger !== null) {
            subLevelTrigger.ariaExpanded = 'true';
        }

        if (parentLevels === 0) {
            this.options.menuToggle.ariaExpanded = 'true';
        }
    }

    /**
     *
     * @param {HTMLDivElement} subLevel
     */
    #closeSubLevel(subLevel) {
        const parentLevels = this.#getParents(subLevel, '.level-wrapper').length;
        const subLevelTrigger = subLevel.previousElementSibling;

        subLevel.classList.remove(this.options.classes.subLevelOpen);
        this.#setInert(subLevel, true);

        if (subLevelTrigger !== null) {
            subLevelTrigger.ariaExpanded = 'false';
        }

        if (parentLevels === 0) {
            this.options.menuToggle.ariaExpanded = 'false';
        }

        if(parentLevels === 1) {
            this.#heightEqualizer.stop();
        }

        if (parentLevels > 0 && !this.#breakpoint.matches) {
            const handleTransitionEnd = (event) => {
                if (event.propertyName === 'transform') {
                    subLevel.style.transform = '';
                    subLevel.removeEventListener('transitionend', handleTransitionEnd);
                }
            };

            subLevel.addEventListener('transitionend', handleTransitionEnd);
        }
    }

    /**
     *
     * @param {HTMLElement} parent
     */
    #closeAllSubLevels(parent = this.options.el) {
        parent.querySelectorAll(`.${this.options.classes.subLevelOpen}`).forEach((openElement) => {
            this.#closeSubLevel(openElement);
            openElement.style.removeProperty('transform');
        });
    }

    /**
     *
     * @param {HTMLElement} clickedElement
     */
    #closeSiblingSubLevels(clickedElement) {
        const li = clickedElement.closest('li');

        _ryze_digital_js_utilities__WEBPACK_IMPORTED_MODULE_0__.Selectors.siblings(li).forEach((sibling) => {
            this.#closeAllSubLevels(sibling);
        });
    }

    /**
     *
     * @param {HTMLElement} element
     * @param {string} selector
     * @returns {Array}
     */
    #getParents(element, selector) {
        const parents = [];

        while ((element = element.parentElement) && element !== document) {
            if (!selector || element.matches(selector)) {
                parents.push(element);
            }
        }

        return parents;
    }

    #openActiveSubLevel() {
        this.#activeItems.forEach((activeItem, level) => {
            const levelWrapper = activeItem.querySelector(`.${this.options.classes.levelWrapper}`);

            if (this.#breakpoint.matches && level === 0) {
                return;
            }

            if (levelWrapper === null) {
                return;
            }

            this.#openSubLevel(levelWrapper);
        });
    }

    #bindOutsideClick() {
        document.addEventListener('click', (event) => {
            if (this.#breakpoint.matches && !this.options.el.contains(event.target) && this.options.el.querySelector(`.${this.options.classes.subLevelOpen}`) !== null) {
                this.#closeSubLevel(this.options.el.querySelector(`.${this.options.classes.subLevelOpen}`));
            }
        });
    }

    /**
     *
     * @param {HTMLDivElement} levelWrapper
     * @param {boolean} inert
     */
    #setInert(levelWrapper, inert) {
        levelWrapper.inert = inert;
    }
}

/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/******/ /* webpack/runtime/make namespace object */
/******/ (() => {
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ })();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!******************!*\
  !*** ./index.js ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MegaMenu: () => (/* reexport safe */ _src_scripts_MegaMenu_js__WEBPACK_IMPORTED_MODULE_0__.MegaMenu)
/* harmony export */ });
/* harmony import */ var _src_scripts_MegaMenu_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/scripts/MegaMenu.js */ "./src/scripts/MegaMenu.js");



})();

var __webpack_exports__MegaMenu = __webpack_exports__.MegaMenu;
export { __webpack_exports__MegaMenu as MegaMenu };
