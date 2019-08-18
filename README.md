# Vonal

Vonal is an electron based launcher app for linux like rofi, albert, hain, etc... 

## Why? 

I really wanted to make a launcher that not requires low level languages to write plugins and allows to make plugins as easily as it possible.
Here it is an example:

```jsx
// ~/.config/vonal/plugins/example-vonal-plugin/index.js
export default (query) => {

    if (query.match(/keyword to trigger/)) {
        return <div className="row">
            triggered
        </div>

    return null

}
```

## Installation

```bash
npm i 
npm run start # for doing a test run
npm run package-linux # to create a package for linux
```

## Contributing

Feel free to open any issues.  
Pull requests are welcoming.  

```bash
npm run dev # for development
```