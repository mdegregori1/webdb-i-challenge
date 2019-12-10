const express = require('express');

const db = require("../dbConfig"); 
const router = express.Router(); 

router.use(express.json());

//get
router.get('/', (req, res) => {
    db.select('*').from('accounts')
    .then( accounts => {
        res.status(200).json(accounts)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({errorMessage: "Error getting the accounts"})
    })
})

//get by ID 
router.get('/:id', (req, res) => {
    const id = req.params.id;
    db.select('*').from('accounts').where({id:id}).first()
    .then(id => {
        if(id){
            res.status(200).json(id)
        } else {
            res.status(404).json({message: "the account with the specific id was not found "})
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({errorMessage: "Error retrieving the account "})
    })
})

// put by ID
router.put('/:id', (req, res ) => {
    const id = req.params.id;
    const edit = req.body;
    if (edit.name || edit.budget) {
        db('accounts')
         .where({id})
         .update(edit)
         .then(count => {
             if(count > 0){
                 res.status(200).json({message: `${count} account(s) updated`})
             } else {
                 res.status(404).json({message: "account not found"})
             }
         })
         .catch(error => {
             console.log(error)
             res.status(500).json({errorMessage:"Error editing the account "})
         })
    } else {
        res.status(400).json({message: "please add either a name or a budget"})
    }
})

// post 
router.post('/', (req, res ) => {
    const accountData = req.body
    if (accountData.name && accountData.budget){
        db("accounts")
        .insert(accountData, "id")
        .then(e => {
            const id = e[0];
            return db("accounts")
            .where({id})
            .first()
            .then(account => {
                res.status(201).json(account)
            })
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({errorMessage: "Error adding the account "})
        })
    } else {
        res.status(400).json({message: "Please add both a name and a budget"})
    }
})

// delete 
router.delete('/:id', (req, res)=> {
    const id = req.params.id;
    db.del().from('accounts').where({id: id})
    .then(id => {
        if(id){
            res.status(200).json({message: "account deleted"})
        } else {
            res.status(404).json({message: "the account with the specific id was not found"})
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({errorMessage: "Error retrieving the account "})
    })
    
})




module.exports = router;
