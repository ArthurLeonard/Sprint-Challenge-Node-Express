const express = require('express');
// const db = require('./data/dbConfig.js');
const actions = require('./data/helpers/actionModel');
const router = express.Router();



router.get('/', async (req, res) => {
    try {
                const action = await actions.get();
                res.status(200).json(action);
    } catch (error) {
                // log error to database
                console.log(error);
                res.status(500).json({ message: `Error retrieving actions` });
    }
          
            // actions.get()
            //     .then( users => res.status(200).json(users))
            //     .catch( error => res.status(500).json( { message: "Server Error." } ))
        
}) // end get
        
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    console.log('id is ', id);
    try {
        const action = await actions.get(id);
        res.status(200).json(action);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error retrieving action' });
    }
  // actions.get(id)
  // .then( user => {
  //     console.log(user)
  //     if (user === null)
  //         res.status(404).json( { message: "The action with the specified ID does not exist." } )
  //     else    
  //         res.status(200).json( { user })
  // })
  // .catch( error => res.status(500).json( { error: "The post information could not be retrieved." } ))
}) // end get for specific id's
        


router.post('/', async (req, res) => {
    //read user data from body
    const newaction = req.body;

    try {
        const action = await actions.insert(newaction);
        res.status(201).json(action);
    } catch (error) {
        // log error to database
        console.log(error);
        res.status(500).json({ message: 'could not post new action to server' });
  }

}) // end post

router.delete('/:id', async (req, res ) => {
    const id = req.params.id;

    try {
        const deleted = await actions.remove(id);
        if (deleted > 0 ){
             res.status(200).json({ message: '1 action removed' });
        } else {
            res.status(404).json({ message: "action not found. No actions removed"})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error while trying to remove action" })
    }
}) // end delete

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    newaction = req.body;
    console.log('id is ', id);

    try {
        const updated = actions.update(id, newaction);
        if (updated === null)
            res.status(404).json( { message: "That object was not found"})
        else 
            res.status(200).json( { message: 'Object updated'}) 

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error while trying to update"});
    }

}) // end put

module.exports = router;
