# ListModule

ListModule is a graphical user interface  for listing the git projects of a user.

# ListModule: Development #

## Prerequisites ##

### Required skills/expertise ###

* Experience of webapplication development
* Understanding of JavaScript, CSS, HTML
* Familiarity with Node.js & npm
* Familiarity with angularjs

### Setting up workstation ###

Make sure you have `git`, `nodejs`, `npm` installed in your system, along with your favorite code-editor & browser with devtools (latest Mozilla Firefox or Google Chrome recommended).

Follow your platform's own process to set these up. On a Fedora PC, you'll use

```sh
$ sudo dnf install -y git nodejs npm
```

## How to Deploy ##

Clone the ListModule repository.

```sh
$ git clone git@github.com:gnehapk/ListModule.git
$ cd ListModule

Within the git cloned source directory, run the following commands to build the app.

```sh
$ sudo npm install -g gulp
$ npm install
$ gulp
```
Upon success of all the steps, you should have the build artifacts in `./dist/` subdirectory.

Running gulp will open http://127.0.0.1:8000 in your browser. You can browse all the views.

You can also run `gulp dev` command. It will add watchers to all files and accordingly dist folder will be updated continuosly. Its required basically for development mode.

`gulp` will also run all the unit tests of the app.
