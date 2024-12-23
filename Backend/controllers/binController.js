const Bin = require('../models/Bin');

// Update bin status
const updateBin = async (req, res) => {
  try {
    const { binId, fillLevel } = req.body; // binId and fillLevel from IoT sensor
    const updatedBin = await Bin.findByIdAndUpdate(
      binId,
      { fillLevel },
      { new: true }
    );
    res.status(200).json({ message: 'Bin updated successfully', updatedBin });
  } catch (error) {
    res.status(500).json({ message: 'Error updating bin', error });
  }
};

// Get list of bins
const getBins = async (req, res) => {
  try {
    const bins = await Bin.find();
    res.status(200).json({ bins });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bins', error });
  }
};

module.exports = { updateBin, getBins };
