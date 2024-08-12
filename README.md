# Virtual Fit
Life's better when your clothes fit.

### Prerequisites
Check [Digital Ocean](https://www.digitalocean.com/) site for installing the following prerequisites :
* Install npm
* Install node (preferably, version - 8.12.0)
* Install MongoDB

### Installation
* Clone/download this repository.
* Go to the project root directory in terminal.
* Install the dependencies :
    ```
    $ npm install
    ```
* Copy contents of file `config/config.example.js` to a new file `config/index.js` :
    * `sessionSecret : 'Insert some random secret string here'`
    * `dbURI: 'Insert your MongoDB URI here'`
    * `python_version: 'Insert python2 or python3 here, which is to used to run the model'`
* Setting up python model files :
    * Create a directory `python` in the project root folder.
    * Copy all the model files to the directory created `python`.
    * Install all required python packages.
    * Make sure `python_version` in `config/index.js` is compatible with the model.
    
### How to run :
* Clone/download this repository.
* [Install](#Installation) the application. 
* Run the application :
    ```
    $ nodemon
    ```
* Open up your browser. Type [http://localhost:3000/](http://localhost:3000/) as the URL.


### Troubleshooting :
* If you face node version incompatibilites or getting some weird errors, try installing the packages again and run the application using node version `8.12.0` .
* Use `nvm` if you want to switch to different `node` version.
* If `nodemon` is not working, try running the application using the command - `node app` .

### ResNet Deep Learning Model :
The ResNet-Model folder in the repository contains the code and the datasets used to train the Deep Learning model using a simple ResNet18 Residual Neural Network. To know more about the architecture, check the corresponding paper - https://arxiv.org/abs/1512.03385