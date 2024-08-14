import * as utils from '@ryze-digital/js-utilities';
import { HeightEqualizer } from './HeightEqualizer.js';

export class MegaMenu extends utils.Base {
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
     * @param {HTMLElement} [options.el=document.querySelector('[data-mega-menu]')]
     * @param {HTMLElement} [options.menuToggle=document.querySelector('[data-mega-menu-toggle]')]
     * @param {string} [options.breakpoint='large']
     * @param {object} [options.classes]
     * @param {string} [options.classes.levelWrapper='level-wrapper']
     * @param {string} [options.classes.subLevelOpen='open']
     * @param {string} [options.classes.activeItems='is-active']
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
        this.#breakpointProvider = new utils.BreakpointProvider();
        this.#breakpoint = window.matchMedia(`(min-width: ${this.#breakpointProvider.breakpoints[this.options.breakpoint]})`);
        this.#heightEqualizer = new HeightEqualizer(this.options, this.#breakpointProvider, this.#breakpoint);
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
    }

    /**
     *
     * @param {HTMLElement} parent
     */
    #closeAllSubLevels(parent = this.options.el) {
        parent.querySelectorAll(`.${this.options.classes.subLevelOpen}`).forEach((openElement) => {
            this.#closeSubLevel(openElement);
        });
    }

    /**
     *
     * @param {HTMLElement} clickedElement
     */
    #closeSiblingSubLevels(clickedElement) {
        const li = clickedElement.closest('li');

        utils.Selectors.siblings(li).forEach((sibling) => {
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