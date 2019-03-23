const express = require('express');
// const db = require('./data/dbConfig.js');
const projects = require('./data/helpers/projectModel');
const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const project = await projects.get();
        res.status(200).json(project);
      } catch (error) {
        // log error to database
        console.log(error);
        res.status(500).json({
          message: `Error retrieving project`,
        });
      }
  
    // projects.get()
    //     .then( users => res.status(200).json(users))
    //     .catch( error => res.status(500).json( { message: "Server Error." } ))

}) // end get

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    console.log('id is ', id);

    try {
        const project = await projects.get(id);
        res.status(200).json(project);
      } catch (error) {
        // log error to database
        console.log(error);
        res.status(500).json({
          message: 'Error retrieving project',
        });
      }

} ) // end get for specific id's

router.get('/:id/actions', async (req, res) => {
  const id = req.params.id;
  console.log('id is ', id);

  try {
      const project = await projects.get(id);
      res.status(200).json(project.actions);
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving project',
      });
    }

} ) // end get for specific id's
router.post('/', async (req, res) => {
        //read user data from body
    const newProject = req.body;



    try {
        const project = await projects.insert(newProject);
        res.status(201).json(project);
      } catch (error) {
        // log error to database
        console.log(error);
        res.status(500).json({
          message: 'could not post new project to server',
        });
      }

    // projects.insert(userInfo)
    //     .then( user => {
    //         res.status(201).json(user);
    //     })
    //     .catch( error => {
    //         res.status(500).json( { error: "The post information could not be retrieved." })
    //     })
}) // end post

router.delete('/:id', async (req, res ) => {
    const id = req.params.id;

    try {
        const deleted = await projects.remove(id);
        if (deleted > 0 ){
            res.status(200).json({ message: '1 project removed' });
        } else {
            res.status(404).json({ message: "project not found. No projects removed"})
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error while trying to remove project" })

    }
}) // end delete

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    newProject = req.body;
    console.log('id is ', id);


        
    try {
        const updated = projects.update(id, newProject);
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
