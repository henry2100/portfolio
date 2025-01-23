const express = require('express');
const router = express.Router();
const {
    getAllContactMssgs,
    getContactMssg,
    saveContactRequest,
    updateContactMssg,
    deleteContactMssg
} = require('../controllers/contactMssgController');
const authSession = require('../middlewares/authSession');
const roleManager = require('../middlewares/roleManager');

router.get('/', getAllContactMssgs);
router.get('/message/:id', getContactMssg);
router.post('/save_req', saveContactRequest);
router.put('/update_req/:id', updateContactMssg);
router.delete('/remove_req/:id', deleteContactMssg);

module.exports = router;