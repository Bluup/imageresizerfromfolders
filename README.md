# imageresizerfromfolders

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

imageresizerfromfolders is a simple script that reduce the size of .jpg and .png of all images from a root folder.

### Install

imageresizerfromfolders requires [Node.js](https://nodejs.org/) v4+ to run.

In your app folder open a terminal and write.

```sh
$ npm i imageresizerfromfolders -D
```
### Usage
```sh
const resize = require("imageresizerfromfolders");
resize("C:/Users/YourUser/Pictures/");
```

### Terminal Output
```sh
Initializing
Reading folder structure, this might take a while...
A total of 5 images are going to be processed
Optimizing...
Finalized Successfully
```


License
----

MIT
