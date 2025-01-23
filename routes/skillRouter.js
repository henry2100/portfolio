const express = require('express');
const router = express.Router();
const {
    addSkill,
    getAllSkills,
    getSkill,
    updateSkill,
    deleteSkill
} = require('../controllers/skillController');
const authSession = require('../middlewares/authSession');
const roleManager = require('../middlewares/roleManager');

router.get('/', getAllSkills);
router.get('/skill/:id', getSkill);
router.post('/add_skill', addSkill);
router.put('/update_skill/:id', updateSkill);
router.post('/remove_skill/:id', deleteSkill);

module.exports = router;