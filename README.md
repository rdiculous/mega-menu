# RYZE Digital Mega Menu

![Run linter(s) workflow status](https://github.com/ryze-digital/mega-menu/actions/workflows/run-lint.yml/badge.svg)

## Install

```sh
npm i @ryze-digital/mega-menu
```

## Usage

### HTML

The styles and scripts require a specific HTML structure. Class names can be modified if really needed (but we do not
recommend deviate from default). Comments added for easier understanding - please do not deploy them into production.

<details>
<summary>Show code example</summary>

```html
<nav id="nav-main" class="mega-menu" data-mega-menu aria-label="Main">
    <!-- The value of aria-controls needs to match the id of the related nav tag -->
    <button type="button" class="toggle" aria-expanded="false" aria-controls="nav-main" data-mega-menu-toggle>
        <span class="visually-hidden">Show main navigation</span>
        <span class="hamburger-icon">☰</span>
    </button>
    <div class="level-wrapper" inert>
        <ul>
            <!-- Add is-active class, when user is currently on this page (must be done on every level) -->
            <li class="is-active">
                <button type="button" aria-expanded="false">
                    <span class="visually-hidden">Opens the submenu:</span>
                    <span>About us</span>
                </button>
                <div class="level-wrapper" inert>
                    <!-- Teaser is optional -->
                    <div class="teaser">
                        <h2 class="h2 headline">About us</h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
                            Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur
                            ridiculus mus.
                        </p>
                        <a href="#" class="button">Go to about us</a>
                    </div>
                    <ul>
                        <!-- Add a back button as first-child to every sublevel -->
                        <li class="back">
                            <button type="button" data-back>
                                <span>Back to overview</span>
                            </button>
                        </li>
                        <!-- Add is-active class, when user is currently on this page (must be done on every level) -->
                        <li class="title is-active">
                            <!-- Add aria-current="page" attribute, when user is currently on this page -->
                            <a href="#" aria-current="page">
                                <span>About us</span>
                            </a>
                        </li>
                        <li>
                            <button type="button" aria-expanded="false">
                                <span class="visually-hidden">Opens the submenu:</span>
                                <span>History</span>
                            </button>
                            <div class="level-wrapper" inert>
                                <ul>
                                    <li class="back">
                                        <button type="button" data-back>
                                            <span>Back to overview</span>
                                        </button>
                                    </li>
                                    <li class="title">
                                        <a href="#">
                                            <span>History</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <span>1995</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <span>2005</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <span>2009</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <span>2016</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <span>2022</span>
                                        </a>
                                    </li>
                                    <!-- Add a close menu button as last-child to every sublevel (only visible for keyboard users) -->
                                    <li class="close">
                                        <button type="button" class="visually-hidden" data-close>
                                            <span>Close menu</span>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li>
                            <a href="#">
                                <span>Team</span>
                            </a>
                        </li>
                        <li class="close">
                            <button type="button" class="visually-hidden" data-close>
                                <span>Close menu</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </li>
            <li>
                <button type="button" aria-expanded="false">
                    <span class="visually-hidden">Opens the submenu:</span>
                    <span>Products</span>
                </button>
                <div class="level-wrapper" inert>
                    <ul>
                        <li class="back">
                            <button type="button" data-back>
                                <span>Back to overview</span>
                            </button>
                        </li>
                        <li class="title">
                            <a href="#">
                                <span>Products</span>
                            </a>
                        </li>
                        <li>
                            <button type="button" aria-expanded="false">
                                <span class="visually-hidden">Opens the submenu:</span>
                                <span>Materials</span>
                            </button>
                            <div class="level-wrapper" inert>
                                <ul>
                                    <li class="back">
                                        <button type="button" data-back>
                                            <span>Back to overview</span>
                                        </button>
                                    </li>
                                    <li class="title">
                                        <a href="#">
                                            <span>Materials</span>
                                        </a>
                                    </li>
                                    <li>
                                        <button type="button" aria-expanded="false">
                                            <span class="visually-hidden">Opens the submenu:</span>
                                            <span>Wood</span>
                                        </button>
                                        <div class="level-wrapper" inert>
                                            <ul>
                                                <li class="back">
                                                    <button type="button" data-back>
                                                        <span>Back to overview</span>
                                                    </button>
                                                </li>
                                                <li class="title">
                                                    <a href="#">
                                                        <span>Wood</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        <span>Maple</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        <span>Oak</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        <span>Chestnut</span>
                                                    </a>
                                                </li>
                                                <li class="close">
                                                    <button type="button" class="visually-hidden" data-close>
                                                        <span>Close menu</span>
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li>
                                        <button type="button" aria-expanded="false">
                                            <span class="visually-hidden">Opens the submenu:</span>
                                            <span>Steal</span>
                                        </button>
                                        <div class="level-wrapper" inert>
                                            <ul>
                                                <li class="back">
                                                    <button type="button" data-back>
                                                        <span>Back to overview</span>
                                                    </button>
                                                </li>
                                                <li class="title">
                                                    <a href="#">
                                                        <span>Steal</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        <span>Alloyed</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        <span>Unalloyed</span>
                                                    </a>
                                                </li>
                                                <li class="close">
                                                    <button type="button" class="visually-hidden" data-close>
                                                        <span>Close menu</span>
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <span>Aluminum</span>
                                        </a>
                                    </li>
                                    <li>
                                        <button type="button" aria-expanded="false">
                                            <span class="visually-hidden">Opens the submenu:</span>
                                            <span>Plastic</span>
                                        </button>
                                        <div class="level-wrapper" inert>
                                            <ul>
                                                <li class="back">
                                                    <button type="button" data-back>
                                                        <span>Back to overview</span>
                                                    </button>
                                                </li>
                                                <li class="title">
                                                    <a href="#">
                                                        <span>Plastic</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        <span>Thermoplastics</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        <span>Elastomers</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        <span>Thermosets</span>
                                                    </a>
                                                </li>
                                                <li class="close">
                                                    <button type="button" class="visually-hidden" data-close>
                                                        <span>Close menu</span>
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li class="close">
                                        <button type="button" class="visually-hidden" data-close>
                                            <span>Close menu</span>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li>
                            <button type="button" aria-expanded="false">
                                <span class="visually-hidden">Opens the submenu:</span>
                                <span>Coating</span>
                            </button>
                            <div class="level-wrapper" inert>
                                <ul>
                                    <li class="back">
                                        <button type="button" data-back>
                                            <span>Back to overview</span>
                                        </button>
                                    </li>
                                    <li class="title">
                                        <a href="#">
                                            <span>Coating</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <span>Varnish</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <span>Synthetic substance</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <span>Carbon</span>
                                        </a>
                                    </li>
                                    <li class="close">
                                        <button type="button" class="visually-hidden" data-close>
                                            <span>Close menu</span>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li>
                            <button type="button" aria-expanded="false">
                                <span class="visually-hidden">Opens the submenu:</span>
                                <span>Liquids</span>
                            </button>
                            <div class="level-wrapper" inert>
                                <ul>
                                    <li class="back">
                                        <button type="button" data-back>
                                            <span>Back to overview</span>
                                        </button>
                                    </li>
                                    <li class="title">
                                        <a href="#">
                                            <span>Liquids</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <span>Distilled water</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <span>Hydrogen peroxide</span>
                                        </a>
                                    </li>
                                    <li class="close">
                                        <button type="button" class="visually-hidden" data-close>
                                            <span>Close menu</span>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li class="close">
                            <button type="button" class="visually-hidden" data-close>
                                <span>Close menu</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </li>
            <li>
                <a href="#">
                    <span>Contact</span>
                </a>
                <!-- You do not need a sublevel on every menu item -->
            </li>
            <li class="close">
                <button type="button" class="visually-hidden" data-close>
                    <span>Close menu</span>
                </button>
            </li>
        </ul>
    </div>
</nav>
```
</details>

### Scss

```scss
@use "@ryze-digital/mega-menu";
```

Use the provided configure mixin to define your Mega Menu defaults.

```scss
@include mega-menu.configure(...);
```

<details>
<summary>List of available configure options</summary>

| Option                                          | Type              | Default                              | Description                                                                                                    |
|-------------------------------------------------|-------------------|--------------------------------------|----------------------------------------------------------------------------------------------------------------|
| breakpoint                                      | String (Quoted)   | <code>"large"</code>                 | The breakpoint at which the menu should switch from mobile to desktop layout                                   |
| transition                                      | Map               |                                      | Default values for all used transitions                                                                        |
| transition.duration                             | Number            | <code>200ms</code>                   |                                                                                                                |
| icons                                           | Map               |                                      | Configure which icons from your icon font should be used                                                       |
| icons.back                                      | Map               |                                      |                                                                                                                |
| icons.back.icon                                 | String (Quoted)   | <code>null</code>                    | The UTF-8 character for the icon used on the back button                                                       |
| icons.back.spacing                              | Number            | <code>null</code>                    | Add extra inline padding to the anchor containing the icon, so the text cannot run behind/under the icon       |
| icons.has-sub-level                             | Map               |                                      |                                                                                                                |
| icons.has-sub-level.icon                        | String (Quoted)   | <code>null</code>                    | The UTF-8 character for the icon to be shown, if a menu item has a sub level                                   |
| icons.has-sub-level.spacing                     | Number            | <code>null</code>                    | Add extra inline padding to the anchor containing the icon, so the text cannot run behind/under the icon       |
| icons.close                                     | Map               |                                      |                                                                                                                |
| icons.close.icon                                | String (Quoted)   | <code>null</code>                    | The UTF-8 character for the icon used on the close menu button (only visible for keyboard users)               |
| icons.close.spacing                             | Number            | <code>null</code>                    | Add extra inline padding to the anchor containing the icon, so the text cannot run behind/under the icon       |
| active-font-weight                              | String (Unquoted) | <code>bold</code>                    | The font-weight used for active (currently viewed) menu items                                                  |
| mobile                                          | Map               |                                      | Configuration options, that are mostly relevant for the mobile view                                            |
| mobile.position                                 | String (Unquoted) | <code>fixed</code>                   |                                                                                                                |
| mobile.background-color                         | Color             | <code>#ffffff</code>                 |                                                                                                                |
| mobile.spacing                                  | Map               |                                      |                                                                                                                |
| mobile.spacing.block-start                      | Number            | <code>scss-utilities.rem-calc(50)</code>  | The distance the mobile menu should have to the top of the viewport (in most cases the mobile header height)   |
| mobile.spacing.block-end                        | Number            | <code>0</code>                       | The distance the mobile menu should have to the bottom of the viewport                                         |
| mobile.padding                                  | Map               |                                      | The overall padding around the whole menu                                                                      |
| mobile.padding.block-start                      | Number            | <code>scss-utilities.rem-calc(20)</code>  |                                                                                                                |
| mobile.padding.block-end                        | Number            | <code>scss-utilities.rem-calc(20)</code>  |                                                                                                                |
| mobile.padding.inline-start                     | Number            | <code>scss-utilities.rem-calc(20)</code>  |                                                                                                                |
| mobile.padding.inline-end                       | Number            | <code>scss-utilities.rem-calc(20)</code>  |                                                                                                                |
| mobile.anchor                                   | Map               |                                      |                                                                                                                |
| mobile.anchor.padding                           | Map               |                                      | The padding used on all links inside menu                                                                      |
| mobile.anchor.padding.block-start               | Number            | <code>scss-utilities.rem-calc(12)</code>  |                                                                                                                |
| mobile.anchor.padding.block-end                 | Number            | <code>scss-utilities.rem-calc(12)</code>  |                                                                                                                |
| mobile.anchor.padding.inline-start              | Number            | <code>scss-utilities.rem-calc(16)</code>  |                                                                                                                |
| mobile.anchor.padding.inline-end                | Number            | <code>scss-utilities.rem-calc(16)</code>  |                                                                                                                |
| desktop                                         | Map               |                                      | Configuration options, that are mostly relevant for the desktop view                                           |
| desktop.background-color                        | Map               | <code>#ffffff</code>                 |                                                                                                                |
| desktop.spacing                                 | Map               |                                      |                                                                                                                |
| desktop.spacing.block-start                     | Number            | <code>scss-utilities.rem-calc(100)</code> | The distance the desktop menu should have to the top of the viewport (in most cases the desktop header height) |
| desktop.spacing.block-end                       | Number            | <code>unset</code>                   | The distance the desktop menu should have to the bottom of the viewport                                        |
| desktop.wrapper                                 | Map               |                                      | Contains styles for the "real Mega Menu" (the multi-column flyout on desktop)                                  |
| desktop.wrapper.padding                         | Map               |                                      |                                                                                                                |
| desktop.wrapper.padding.block-start             | Number            | <code>scss-utilities.rem-calc(20)</code>  |                                                                                                                |
| desktop.wrapper.padding.block-end               | Number            | <code>scss-utilities.rem-calc(20)</code>  |                                                                                                                |
| desktop.wrapper.padding.inline                  | Number            | <code>scss-utilities.rem-calc(20)</code>  |                                                                                                                |
| desktop.wrapper.max-inline-size                 | Number            | <code>95ch</code>                    | The maximum width of the "real Mega Menu" (in most cases the max-width of your page layout)                    |
| desktop.columns                                 | Number            | <code>3</code>                       | The amount of (sub-level) columns that are shown, without the need to click to view further                    |
| desktop.first-level                             | Map               |                                      | Configuration options especially for the top level (the menu items, that are always visible on desktop)        |
| desktop.first-level.gap                         | Number            | <code>0</code>                       | Spacing between top level menu items (there is already a visual gap coming from the anchor padding)            |
| desktop.first-level.anchor                      | Map               |                                      |                                                                                                                |
| desktop.first-level.anchor.padding              | Map               |                                      | The padding used for top level links                                                                           |
| desktop.first-level.anchor.padding.block-start  | Number            | <code>scss-utilities.rem-calc(4)</code>   |                                                                                                                |
| desktop.first-level.anchor.padding.block-end    | Number            | <code>scss-utilities.rem-calc(4)</code>   |                                                                                                                |
| desktop.first-level.anchor.padding.inline-start | Number            | <code>scss-utilities.rem-calc(20)</code>  |                                                                                                                |
| desktop.first-level.anchor.padding.inline-end   | Number            | <code>scss-utilities.rem-calc(20)</code>  |                                                                                                                |
| desktop.sub-level                               | Map               |                                      | Configuration options for all desktop sub levels                                                               |
| desktop.sub-level.anchor                        | Map               |                                      |                                                                                                                |
| desktop.sub-level.anchor.padding                | Map               |                                      | The padding used for all sub level links                                                                       |
| desktop.sub-level.anchor.padding.block-start    | Number            | <code>scss-utilities.rem-calc(8)</code>   |                                                                                                                |
| desktop.sub-level.anchor.padding.block-end      | Number            | <code>scss-utilities.rem-calc(8)</code>   |                                                                                                                |
| desktop.sub-level.anchor.padding.inline-start   | Number            | <code>scss-utilities.rem-calc(13)</code>  |                                                                                                                |
| desktop.sub-level.anchor.padding.inline-end     | Number            | <code>scss-utilities.rem-calc(13)</code>  |                                                                                                                |
| classes                                         | Map               |                                      | Selectors that are used inside our mixins                                                                      |
| classes.sub-level-open                          | String (Quoted)   | <code>"open"</code>                  |                                                                                                                |
| classes.sub-level-headline                      | String (Quoted)   | <code>"title"</code>                 |                                                                                                                |
| classes.close-sub-level-button                  | String (Quoted)   | <code>"back"</code>                  |                                                                                                                |
| classes.close-menu-li                           | String (Quoted)   | <code>"close"</code>                 |                                                                                                                |

Check out [the actual configure mixin](src/styles/_config.scss) for better understanding.
</details>

There is a separate mixin for each element in the Mega Menu. You need to copy the following code block to include all
styles that are needed for the functionality. The Mega Menu itself can then be styled in any way you like.

<details>
<summary>Show mixin integration</summary>

```scss
.mega-menu {
    .toggle {
        @include mega-menu.toggle();
    }
    .level-wrapper {
        @include mega-menu.level-wrapper();
    }
    a:not(.button),
    button:not(.toggle) {
        @include mega-menu.links();
    }
    ul {
        li {
            &:has(ul) > button {
                @include mega-menu.button-has-sub-level() { 
                    // your icon styles (@content)
                }
            }
            &.is-active {
                > {
                    a,
                    button {
                        @include mega-menu.list-item-active();   
                    }
                }
            }
        }
    }
    .back {
        button  {
            @include mega-menu.button-back() {
                // your icon styles (@content)
            }
        }
    }
    .close {
        button {
            @include mega-menu.button-close() {
                // your icon styles (@content)
            }
        }
    }
    .teaser {
        @include mega-menu.teaser();
    }
    > .level-wrapper {
        @include mega-menu.level-wrapper-level-1();
        > ul {
            @include mega-menu.list-level-1();
            ul {
                @include mega-menu.list-level-1-sub-lists();
                @include mega-menu.invert-title-and-back(); // optional, use it only if the back button is below your sublevel title 
                a,
                button {
                    @include mega-menu.links-level-1-sub-levels();
                }
            }
            > li {
                > {
                    a,
                    button {
                        @include mega-menu.links-level-1();
                    }
                }
                > .level-wrapper {
                    @include mega-menu.level-wrapper-level-2();
                    .level-wrapper {
                        @include mega-menu.level-wrapper-level-2-sub-levels();
                    }
                }
            }
        }
    }
}

// The following could maybe be already be integrated (doesn`t belong to the mega menu itself)
.visually-hidden {
    @include scss-utilities.visually-hidden();
}
```
</details>

### JavaScript

```js
import { MegaMenu } from '@ryze-digital/mega-menu';

new MegaMenu({...}).init();
```

<details>
<summary>List of available parameters for MegaMenu class</summary>

| Option             | Type        | Default                                                                                                                                      | Description                                                                 |
|--------------------|-------------|----------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------|
| el                 | HTMLElement | <code>document.querySelector('[data-mega-menu]')</code>                                                                                      | Container to which the library should be bound                              |
| menuToggle         | HTMLElement | <code>document.querySelector('[data-mega-menu-toggle]')</code>                                                                               | Element used to toggle visibility of mobile menu                            |
| breakpoint         | string      | <code>'large'</code>                                                                                                                         | Breakpoint at which to switch from mobile to desktop menu                   |
| openActiveSubLevel | boolean     | <code>true</code>                                                                                                                            | Open the sub level inside Mega Menu that you are currently on to            |
| classes            | object      | <pre>{<br>&nbsp;&nbsp;levelWrapper: 'level-wrapper',<br>&nbsp;&nbsp;subLevelOpen: 'open',<br>&nbsp;&nbsp;activeItems: 'is-active'<br>}</pre> | Selectors that are used internally or states that will be added to elements |
</details>

## Demos

Check out this repository to run the demos in a browser.

- [Basic use case](/demos/basic.html)
- [Viewed on a subpage](/demos/subpage.html)
