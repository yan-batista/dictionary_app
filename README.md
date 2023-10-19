# Frontend Mentor - Dictionary Solution

This is a solution to the Multi-step form challenge on Frontend Mentor. Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- Search for words using the input field
- See the Free Dictionary API's response for the searched word
- See a form validation message when trying to submit a blank form
- Play the audio file for a word when it's available
- Switch between serif, sans serif, and monospace fonts
- Switch between light and dark themes
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page
- Bonus: Have the correct color scheme chosen for them based on their computer preferences. Hint: Research prefers-color-scheme in CSS.

### Screenshot

<p align="center" >
    <img src="./public/home-lg.png" />
    <img src="./public/not-found-lg.png" />
    <img src="./public/hello-lg.png" />
    <img src="./public/home-sm.png" />
    <img src="./public/not-found-sm.png" />
    <img src="./public/hello-sm.png" />
</p>

### Links

- [Live Site](https://dictionary-app-nu-nine.vercel.app/)

## My process

### Built with

- [React](https://reactjs.org/) - JS library
- [Tailwindcss](https://tailwindcss.com/) - For styles
- Typescript

### What I learned

#### Tailwindcss behavior with list and bullet customization

In tailwindcss, you can add the bullets to the bullet list using the class `"list-disc"` on the `ul` tag, but you can't control the color of the bullet through the list.

The `"list-disc"` will generate a `::marker` pseudo-element, which is something that can be accessed through tailwindcss to change the color of the bullet.
`className="list-disc marker:text-accent-1"`

#### Group Styling

You can style an element based on the parent style using the `group` keyword on the parent and add your style with `group-*` on the child.

```html
<button className="group bg-accent-2 hover:bg-accent-1">
  <svg className="fill-accent-1 group-hover:fill-white"></svg>
</button>
```

Read More: [tailwind docs](https://tailwindcss.com/docs/hover-focus-and-other-states#styling-based-on-parent-state)

#### Custom Themes

You can create variables on your default css file for the project that will be used by the tailwindcss colors on `tailwind.config.css`

global.css:

```css
@layer base {
  :root {
    --color-bg: 0deg 0% 2%;
    --color-accent1: 274deg 82% 60%;
    --color-accent2: 274deg 50% 16%;
    --color-accent3: 274deg 100% 88%;
    --color-search_bar: 0deg 0% 12%;
    --color-text_gray: 0deg 0% 46%;
    --color-text: 0deg 0% 100%;
    --color-divider: 0deg 0% 91%;
    --color-shadow: 274deg 82% 60% / 75%;
  }
  :root[data-theme="light"] {
    --color-bg: 0deg 100% 100%;
    --color-accent1: 274deg 82% 60%;
    --color-accent2: 274deg 81% 90%;
    --color-search_bar: 0deg 0% 96%;
    --color-text_gray: 0deg 0% 46%;
    --color-text: 0deg 0% 18%;
    --color-divider: 0deg 0% 91%;
    --color-shadow: 0deg 0% 0% / 30%;
  }
}
```

tailwind.config.js

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx", "./index.html"],
  theme: {
    extend: {
      colors: {
        bg: "hsl( var(--color-bg) / <alpha-value>)",
        accent: {
          1: "hsl( var(--color-accent1) / <alpha-value>)",
          2: "hsl( var(--color-accent2) / <alpha-value>)",
          3: "hsl( var(--color-accent3) / <alpha-value>)",
        },
        search_bar: "hsl( var(--color-search_bar) / <alpha-value>)",
        text: {
          normal: "hsl( var(--color-text) / <alpha-value>)",
          gray: "hsl( var(--color-text_gray) / <alpha-value>)",
        },
        divider: "hsl( var(--color-divider) / <alpha-value>)",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        lora: ["Lora", "serif"],
        inconsolata: ["Inconsolata", "monospace"],
      },
    },
  },
  plugins: [],
};
```

This way, whenever you change themes, you'll be changing the variable. Because of that you can use only one class for the color that will work for all your themes.

## Author

- Frontend Mentor - [@yan-batista](https://www.frontendmentor.io/profile/yan-batista-1326)
- Github - [@yan-batista](https://github.com/yan-batista)
