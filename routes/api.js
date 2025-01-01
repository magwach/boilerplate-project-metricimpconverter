'use strict';

import ConvertHandler from '../controllers/convertHandler.js';

export default function (app) {
  const convertHandler = new ConvertHandler();

  app.get('/api/convert', (req, res) => {
    const input = req.query.input.toLowerCase();

    if (!input) {
      return res.status(400).json({ error: 'no input' });
    }

    const num = convertHandler.getNum(input);
    let unit = convertHandler.getUnit(input);
    console.log(unit, num)
    // Validate the unit and number
    const validUnits = ['gal', 'L', 'km', 'mi', 'kg', 'lbs', 'l']; // List of valid units

    // Case 1: Invalid number and unit
    if (num === null && !validUnits.includes(unit)) {
      return res.json({ error: 'invalid number and unit' });
    }

    // Case 2: Invalid number
    if (num === null) {
      return res.json({ error: 'invalid number' });
    }

    // Case 3: Invalid unit
    if (!validUnits.includes(unit)) {
      return res.json({ error: 'invalid unit' });
    } else{
      
    // Perform the conversion
    const returnUnit = convertHandler.getReturnUnit(unit);
    const returnNum = convertHandler.convert(num, unit);
    const string = convertHandler.getString(num, unit, returnNum, returnUnit);
    // Return the conversion result
    res.json({
      initNum: num,
      initUnit: unit == 'l'? 'L': unit,
      returnNum: returnNum,
      returnUnit: returnUnit,
      string: string,
    });
    }

  });
}
