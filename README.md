# Gravit Designer Plugin Architecture
This project contains everything you need to create your own plugins for Gravit Designer.

## Getting Started
The following instructions will help you set up the development environment on your local machine, and also will introduce the basic concepts of creating a Gravit Designer plugin.

### Prerequisites
Make sure your machine matches the following specifications:
```
- Node.JS installed
- Windows/MacOS/Linux
- Internet connection
```

### Installing
You can either clone this repository, fork it or just acquire the files needed. The two files that are required to set up the environment are:
```
- package.json (default configuration file of Node.JS projects which contains all dependencies the project needs)
- gulpfile.js (entry point to start Gravit Designer)
```

After you acquire the project files, run
```
npm install
```
with the command line on the folder that contains your package.json file. Wait for the installation of dependencies (which contains a ~10MB zip downloaded from Gravit's website with Gravit Designer's code) and you're all set!

### Running
After instaling all the dependencies, you're ready to start Gravit Designer. You can start it using
```
gulp start
```
and Gravit Designer will be started. It's a electron-based app, exactly the same as the one Gravit provides for free for their users.

## Creating plugins
Now that you already have a working and running development environment, you can start creating plugins. This version of Gravit Designer, on start, always check on your project folder if you have the file
```
src/main.js
```
This file is the starting point of the plugin, and as long as it exists, Gravit Designer will try to load it to the application. Some important thoughts about it:

- All js/html/css files inside /src are being watched. It means that, when changes on any of these files are detected, Gravit Designer will reload itself to update the plugin.
- If the plugin code encounters any errors, no exception will be thrown. You can open the Developer Console by pressing CTRL + SHIFT + F12 (Linux and Windows) or COMMAND + SHIFT + F12 (on Mac).

### Main.js
As mentioned above, main.js is the entry point of the plugin. It always must have the same template:
```
module.exports = {
    init: function (gravit) {
    },

    start: function () {
    }
};

```
Apart from it, the main.js file can have any code you want, but it's required to export the functions 'init' and 'start'. These functions are loaded in different times and should be used for different purposes.

#### init()
The init function is executed right after the plugin is loaded into the application. It receives a argument called 'gravit', which is a global variable used to store actions, properties, sidebars, tools and more! If you want to register, I.E., a new action on the task bar, you should do it here.

#### start()
The start function is called after the init function is called, and is called after the UI is built, so if there's any configuration or code that should be run by the plugin that does not depends on user input/action, I.E., append custom html to page, it should be done here.

### GravitDesigner variable
All Gravit Designer functions you can use on your plugins are available within the global variable "GravitDesigner". You can call this variable anywhere in your plugin without the need of importing any code. I.E., if you want to use the GAction interface to register a new action, all you have to do is call "GravitDesigner.GAction" and you're all set!

### Debugging
Like any other web-based application, any plugin can be debugged using the Developer Tools. The plugin files will be loaded into the application, allowing developers to debug it the same way they would if the plugin was a part of Gravit Designer.

### Important Gravit Designer variables

#### gDesigner
Global variable that contains all extensions Gravit Designer loads. It's also the easiest way to acquire your current document, pages, elements and everything related to the design.

#### gravit
Global variable that contains the extensions Gravit Designer loads. Currently, it stores actions, sidebars, panels, tools, properties and plugins. It's also the variable that the plugins init() functions receive as parameter.

#### gContainer
Gravit Designer's global variable that contains functions specific for every version of Gravit Designer. I. E., the browser version of
Gravit Designer implements gContainer in a certain way, while Desktop version implements in other way that best fits it's needs.

#### GDocument
Class that represents the documents of Gravit Designer. The documents currently opened by Gravit Designer can be easily retrieved using gDesigner.

## Publishing
In future, Gravit will provide a way to share and publish your plugins. Stay tuned for news!
