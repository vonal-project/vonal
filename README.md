# Lightweight Electron React Boilerplate

This is a lightweight electron-react boilerplate without unnecessary libraries, if you want to see an overcomplicated solution please take a look at here: https://github.com/electron-react-boilerplate/electron-react-boilerplate

## When to use

If you like to use simple but powerful solutions, this is for you.

## Scripts

```bash
npm run dev # for development
npm run start # for build and run
npm run package-linux # for create package for linux and you can easily add platforms
```

## If you want ES6 import syntax for main process 
However I don't think that it's a good idea, because `__dirname` is different when it's bundled. But you can add multiple targets in webpack.config.js and you can change the main entry (in package.json) to the built one.

## Contributing
Feel free to open any issue.
