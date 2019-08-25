# PLUGINS

## How it works? (SIMPLE STUPID)

Every plugin will be loaded from `~/.config/vonal/plugins/`  
Make this directory and place your plugins there, 
so Vonal will be able to reach `~/.config/vonal/plugins/your-plugin/package.json`

Vonal will read the plugin's **package.json** file, and will get the value of the `main` key.   
If the **package.json**'s content is `{ main: 'index.js' }` , Vonal will **require** the **index.js** file. 

This case, **index.js** should export a function for returning result like this:
```js
module.exports = q => {
    if(q.match(/text to trigger result/))
        return "I'm triggered"
    return null
}
```

## Seeing it a bit more deeply

Vonal is an electron based application, which uses React frontend framework and it allows us to use React components in results. (See [React](https://reactjs.org/).)

The code above works because a text is a valid React component. But if you would like to return `<div>I'm triggered</div>` it would shows the div as text.

To render div as div and not as text, you can use React.createElement:
```js
module.exports = q => {
    if(q.match(/text to trigger result/))
        return React.createElement('div',null,["I'm triggered"])
    return null
}
```
Since React is already imported in Vonal you don't need to import it again.

However it is not too convenient, so I reacommend using JSX with a project bundler. This way you will be able to write div like as a native html element:
```jsx
export default q => {
    if(q.match(/text to trigger result/))
        return <div>I'm triggered</div>
    return null
}
```
The easiest way to set this up, is cloning this repository : https://github.com/vonal-project/example-vonal-plugin

## RESULTS

Plugins can return an array instead of a single element. The array will be determined as multiple results.   
You can navigate between results by UpArrrow and DownArrow keys. If the result is wrappered by a `<div className='row'></div>` element, the result will formatted by Vonal (with default stlyes like highlight, and paddings). 

## ACTIONS

Vonal will see the `<button>` elements in the results.   
One result can have more buttons.  
You can navigate between buttons in a result by LeftArrrow and RightArrow keys.  
Enter key will trigger the button's onClick event, but you can still use your mouse. 

For an example, see this repository: https://github.com/vonal-project/example-vonal-plugin .

## EVENTS

Plugins can emit and listen the following events:

| EventName | Args | Description | 
| --- | --- | --- |
| query:clear || clears the textbox |
| query:mutate | Function | mutates the content of the textbox |
| window:hide || hides the GUI |
| window:show || shows the GUI |
| window:resize || On every query change, the window will be resized to the resulted content, but if your content changes you should send this event |
| app:quit || quits Vonal |
| app:restart || restarts Vonal |

Event examples: 
```js

// You can listen events by:
global.PluginEventHandler.on('query:clear', () => {
    console.log('query is cleared')
})

// Or it's more likely to send by:
global.PluginEventHandler.send('query:clear')

// The same can be done when you use query:mutate
global.PluginEventHandler.send('query:mutate', query => '')

```