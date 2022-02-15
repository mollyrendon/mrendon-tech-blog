/*Required Connections*/

const router = require('express').Router();
const { User, Post, Comment} = require('../../models');

/*Find All Users Function:
This code is used to find all of the users in the database and return them to the user.  
*/

router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['[password'] }
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


/*Find One User Function:
This code is used to find a user with a specified id.  If there is not user with the specific id then a 404 error message is sent back.  If the user with that id is found then it is returned to the user.
*/
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        },
        include: [{
            model: Post,
            attributes: ['id', 'title', 'content', 'created_at']
        },
        {
            model: Post,
            attributes: ['title'],
        }
    ]
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'There is not a user with this id' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

/*Create User Function:
This code is used to create a user.  The code first checks to see if there is already a user with the username and password provided.  If there is not it creates the new user.  
*/

router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password
    })
    .then(dbUserData => {
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;
            // console.log(dbUserData);
            // console.log(dbUserData.id);
            console.log("hello");

            res.json(dbUserData);
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


/*Login Function:
This code is used to allow the user to login to the site.  It first checks to see if there is a user that already exists with that username and password.  If there is not a user with that username and password then a 404 error message appears.  If there is a user with that correct info and
the user enters their valid password then they are logged in.  
*/

router.post('/login', (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(400).json({ message: 'There is not a user with that username' });
            return;
        }
        const validPassword = dbUserData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'This is an incorrect password'});
            return;
        }
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;
            res.json({ user: dbUserData, message: 'You have successfully logged in' });
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

/*Logout Function:
This code is used to allow the user to logout of the site, destroying the session.  
*/

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});


/*Update User:
This code is used to update a user.  The code first checks to see if there is already a user with a specific id.  If there is not user with that specific id then a 404 error message appears. If there is a user that matches that specific id then the user is then updated. 
*/


router.put('/:id', (req, res) => {
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData[0]) {
            res.status(404).json({ message: 'There is not a user with this id' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


/*Delete User:
This code is used to delete a user.  The code first checks to see if there is already a user with a specific id.  If there is not user with that specific id then a 404 error message appears.  If there is a user that matches that id then the user is deleted. 
*/

router.delete('/:id', (req, res) => {
    User.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'There is not a user with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;

