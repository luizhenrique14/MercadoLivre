exports.getFreight = async (req, res) => {
  try {
    const { option, totalValue } = req.body;

    // Converter totalValue para número
    let totalValueNumber = parseFloat(totalValue);
    if (isNaN(totalValueNumber)) {
      return res.status(400).json({ error: 'O valor total deve ser um número válido.' });
    }

    let freightValue = 0;

    switch (option) {
      case 'sedex':
        freightValue = (totalValueNumber * 0.03) + 10;
        break;
      case 'correios':
        freightValue = 10;
        break;
      case 'retireNaLoja':
        freightValue = 0;
        this.totalValueNumber = parseFloat(totalValue);
        break;
      default:
        return res.status(400).json({ error: 'Opção inválida' });
    }

    let valorFinal = totalValueNumber + freightValue;
    res.json({
      freightValue: freightValue.toFixed(2),
      totalValue: totalValueNumber.toFixed(2),
      endValue: valorFinal.toFixed(2)
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
