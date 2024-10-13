const Staff = require('../models/staffModel');

// Get All Staff Members
exports.getAllStaff = async (req, res) => {
    try {
        const staffMembers = await Staff.find();
        res.status(200).json(staffMembers);
    } catch (error) {
        res.status(500).json({ message: 'Server encountered an issue', error });
    }
};

// Add New Staff Member
exports.addStaff = async (req, res) => {
    const { firstName, lastName, email, role, pay, startDate, team } = req.body;

    try {
        const newStaff = new Staff({ firstName, lastName, email, role, pay, startDate, team });
        await newStaff.save();
        res.status(201).json({ message: 'Staff member successfully added', staffId: newStaff._id });
    } catch (error) {
        res.status(500).json({ message: 'Server encountered an issue', error });
    }
};

// Get Staff Member by ID
exports.getStaffById = async (req, res) => {
    const { id } = req.params;

    try {
        const staff = await Staff.findById(id);
        if (!staff) return res.status(404).json({ message: 'Staff member not found' });
        res.status(200).json(staff);
    } catch (error) {
        res.status(500).json({ message: 'Server encountered an issue', error });
    }
};

// Update Staff Member Info
exports.updateStaff = async (req, res) => {
    const { id } = req.params;
    const { role, pay } = req.body;

    try {
        const updatedStaff = await Staff.findByIdAndUpdate(id, { role, pay }, { new: true });
        if (!updatedStaff) return res.status(404).json({ message: 'Staff member not found' });
        res.status(200).json({ message: 'Staff member updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server encountered an issue', error });
    }
};

// Remove Staff Member
exports.removeStaff = async (req, res) => {
    const { id } = req.query;

    try {
        await Staff.findByIdAndDelete(id);
        res.status(204).json({ message: 'Staff member successfully removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server encountered an issue', error });
    }
};
