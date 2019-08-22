# Vonal

Vonal is an electron based launcher app for linux like rofi, albert, hain, etc... 

## Why? 

I really wanted to make a launcher that not requires low level languages to write plugins and allows to make plugins as easily as it possible.
Here it is an example:

```jsx
// ~/.config/vonal/plugins/example-vonal-plugin/index.js
export default (query) => {

    if (query.match(/keyword to trigger/))
        return <div className="row">
            triggered
        </div>

    return null

}
```

## Installation & Usage

### Preparation 
Make sure you, you've installed one of npm, or yarn

### 1. install dependencies
Clone this repository, and go to the cloned project folder 

```bash
npm i # to install dependencies
```

### 2. do a test run

```bash
# you have to make a FIFO pipe that you can use to send commands to Vonal
mkfifo VONALPIPE # It's a bit unique design, but this way you can use your choosen keyboard daemon

npm start pipe ./VONALPIPE # to build & run the application with pipe LOCATION_OF_PIPE

# once you've built the application, 
# you will able to use `electron . pipe LOCATION_OF_PIPE` to run. 
# this way you don't need to pack the code (you could skip STEP 3)

# now the application is running, you can start sending commands
echo 'show' > ./VONALPIPE # to show the launcher. You can use your keyboard daemon to set a shortcut for this operation.
echo 'hide' > ./VONALPIPE # to hide the launcher. Possible to send hide command, but ESC or ENTER will hide it.
echo 'quit' > ./VONALPIPE # to quit the launcher
```

### 3. create a package for linux

```bash
npm run package-linux # to create a package for linux
# when you've got any type of executable you need to pass 'pipe' LOCATION_OF_PIPE
# in the same way described in STEP 2.
```

### 4. install plugins

By default, Vonal is just a textbox and it won't show any results.
To install plugins make this folder: `~/.config/vonal/plugins`.

Currently plugins are actively developed but here is an example:
https://github.com/vonal-project/example-vonal-plugin
Clone this plugin into `~/.config/vonal/plugins` and follow the installation steps described in the repository.



## Contributing

Feel free to open any issues.  
Pull requests are welcoming.  

```bash
npm run dev # for development
```
