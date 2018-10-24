// -- imports
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const findRemoveSync = require('find-remove');

// app.use is middleware
// -- declare variables
const app = express();
const port = 3001;
const router = express.Router();
let out_data;

const pyCryptNoteScript = './resources/backend/pyCryptNote.py';
const pyOpenNoteScript = './resources/backend/pyOpenNote.py';
const pyTest = './resources/backend/pyTest.py';

// -- setup views
app.set('view engine', 'pug')
app.set('views', './resources/views')

// -- define root direcs
app.use('/htmlroot', express.static(path.join(__dirname, '/resources/frontend/')));
app.use('/test', express.static(path.join(__dirname, '/test')));
app.use('/temp', express.static(path.join(__dirname, '/temp')));
app.use('/resources/notes', express.static(path.join(__dirname, '/resources/notes')));
app.use('/htmlresources', express.static(path.join(__dirname, '/resources/frontend/htmlresources')));

// -- route traffic
app.get('/cryptonote', landing)             
app.get('/note', note)
app.get('/test', test)
app.get('/crypter', crypter);       

function test(req,res) {
    const spawn = require("child_process").spawn; 
    const pyProcess = spawn('python', [
        pyTest,         // script location
        req.query.input,     // input pass
    ]);
    //receive python
    pyProcess.stdout.on('data', (data) => {
        data = data.toString()
        data = data.replace(/\'/g, '"');
        data = JSON.parse(data);
        out_data = data;
        // render
        res.render('note', {
            title: 'CryptoNote',
            splash: 'Here is your note:',
            message: out_data.note
        })
    })
}

// -- route functions
function note(req, res) {
    // begin python
    const spawn = require("child_process").spawn; 
    const pyProcess = spawn('python', [
        pyOpenNoteScript,         // script location
        req.query.hash,     // input pass
    ]);
    //receive python
    pyProcess.stdout.on('data', (data) => {
        data = data.toString()
        data = data.replace(/\'/g, '"');
        data = JSON.parse(data);
        out_data = data;
        // render
        res.render('note', {
            title: 'CryptoNote',
            splash: 'Here is your note:',
            message: out_data.note
        })
    })

}

function landing(req, res) {  
    var result = findRemoveSync('/temp', {extensions: ['.bak', '.log']})
    console.log(result.length)

    res.render('landing', {
        title: 'CryptoNote',
        splash: 'Type in a message to send. If message is opened or 12 hours pass, it is deleted from the server. Check out the source code below.'
    });
}

function crypter(req, res) {
    const spawn = require("child_process").spawn; // spawn the python script

    const hash = crypto.randomBytes(20).toString('hex'); // generate hash

    const pyProcess = spawn('python', [
        pyCryptNoteScript,          // script location
        req.query.inputMessage,     // input pass
        hash
    ]);

    pyProcess.stdout.on('data', (data) => {
        data = data.toString()
        data = data.replace(/\'/g, '"');
        data = JSON.parse(data);
        out_data = data;

        // render
        res.render('crypter', {
            title: 'CryptoNote',
            splash: 'Message successfully encrypted. Copy the link below and send it over to your friend to have it automatically deleted.',
            hash: out_data.hash
        })
    })
}























































// -- test
app.listen(port, () => console.log(`My butt is hosted on ${port}!`))
