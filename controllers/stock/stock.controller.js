

const StockController = {
  async stocks(req, res) {
    try {
      return res.status(200).json({
        status: true,
        message: "User login successful",
      });
    } catch (error) {
      return res.json({ message: error.message, status: false });
    }
  },
};

export default StockController;
