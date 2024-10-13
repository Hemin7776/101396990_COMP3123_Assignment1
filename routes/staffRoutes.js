const express = require('express');
const { getAllStaff, addStaff, getStaffById, updateStaff, removeStaff } = require('../controllers/staffController');
const router = express.Router();

router.get('/staff', getAllStaff);
router.post('/staff', addStaff);
router.get('/staff/:id', getStaffById);
router.put('/staff/:id', updateStaff);
router.delete('/staff', removeStaff);

module.exports = router;
