import { ReduceFunctionCalls } from '@ryze-digital/js-utilities';

export class HeightEqualizer {
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
     * @type {object}
     */
    #breakpointProvider;

    /**
     * @type {MediaQueryList}
     */
    #breakpoint;

    /**
     *
     * @param {object} options
     * @param {object} breakpointProvider
     * @param {MediaQueryList} breakpoint
     */
    constructor(options, breakpointProvider, breakpoint) {
        this.#options = options;
        this.#breakpointProvider = breakpointProvider;
        this.#breakpoint = breakpoint;
        this.#secondLevels = this.#options.el.querySelectorAll('.level-wrapper:is(nav > .level-wrapper) > ul > li > .level-wrapper');

        this.#breakpoint.addListener(() => {
            if (this.#breakpoint.matches) {
                this.#resetHeights('0px');
            } else {
                this.stop();
            }
        });

        window.addEventListener('resize', ReduceFunctionCalls.throttle(this.equalize.bind(this)));
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