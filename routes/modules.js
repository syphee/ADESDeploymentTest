// See https://expressjs.com/en/guide/routing.html for routing

const express = require('express');
const { EMPTY_RESULT_ERROR, DUPLICATE_ENTRY_ERROR, TABLE_ALREADY_EXISTS_ERROR } = require('../errors');
const modulesModel = require('../models/modules');

const router = express.Router();

router.post('/table', function (req, res) {
    return modulesModel
        .initTable()
        .then(function () {
            return res.sendStatus(201);
        })
        .catch(function (error) {
            console.error(error);
            if (error instanceof TABLE_ALREADY_EXISTS_ERROR) {
                return res.status(400).json({ error: error.message });
            }
            return res.status(500).json({ error: 'Unknown Error' });
        });
});

router.post('/', function (req, res) {
    const code = req.body.code;
    const name = req.body.name;
    const credit = req.body.credit;

    return modulesModel
        .create(code, name, credit)
        .then(function () {
            return res.sendStatus(201);
        })
        .catch(function (error) {
            console.error(error);
            if (error instanceof DUPLICATE_ENTRY_ERROR) {
                return res.status(400).json({ error: error.message });
            }
            return res.status(500).json({ error: 'Unknown Error' });
        });
});

// Question: This needs to be before GET /modules/:code, why?
router.get('/bulk', function (req, res) {
    const codesCsv = req.query.codes; // query parameters are strings
    const codes = codesCsv.split(',');
    return modulesModel
        .retrieveBulk(codes)
        .then(function (result) {
            return res.json(result);
        })
        .catch(function (error) {
            console.log(error);
            return res.status(500).json({ error: 'Unknown Error!' });
        });
});

router.get('/:code', function (req, res) {
    const code = req.params.code;

    return modulesModel
        .retrieveByCode(code)
        .then(function (module) {
            return res.json({ module: module });
        })
        .catch(function (error) {
            console.error(error);
            if (error instanceof EMPTY_RESULT_ERROR) {
                return res.status(404).json({ error: error.message });
            }
            return res.status(500).json({ error: 'Unknown Error' });
        });
});

router.delete('/:code', function (req, res) {
    // TODO: Implement Delete module by Code
    const deleteModule = req.params.code
    console.log(deleteModule)
    return modulesModel
    .deleteByCode()
    .then(function(data){
        
        
        return res.status(200).json(data)

    })
    .catch(function (error) {
        console.error(error);
        if (error instanceof EMPTY_RESULT_ERROR) {
            return res.status(404).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Unknown Error' });
    });
    
});

router.put('/:code', function (req, res) {
    // TODO: Implement Update module by Code
    //      You can decide where you want to put the Credit in the Request
    
});

router.get('/retrieve/all', function (req, res) {
    // TODO: Implement Get all modules

    console.log("Retrieving all modules..")
    return modulesModel
    .retrieveAll()
    .then(function(data){
        
        
        return res.status(200).json(data)

    })
    .catch(function (error) {
        console.error(error);
        if (error instanceof EMPTY_RESULT_ERROR) {
            return res.status(404).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Unknown Error' });
    });
});

module.exports = router;
