export default function ConvertHandler() {
  const validUnits = {
    gal: { returnUnit: 'L', spellOut: 'gallons', factor: 3.78541 },
    l: { returnUnit: 'gal', spellOut: 'liters', factor: 1 / 3.78541 },
    mi: { returnUnit: 'km', spellOut: 'miles', factor: 1.60934 },
    km: { returnUnit: 'mi', spellOut: 'kilometers', factor: 1 / 1.60934 },
    lbs: { returnUnit: 'kg', spellOut: 'pounds', factor: 0.453592 },
    kg: { returnUnit: 'lbs', spellOut: 'kilograms', factor: 1 / 0.453592 },
  };

  this.getNum = function (input) {
    const numRegex = /^[\d./]+/;
    const match = input.match(numRegex);

    if (!match) return 1; // Default to 1 if no number is provided

    const numStr = match[0];
    const slashCount = (numStr.match(/\//g) || []).length;

    if (slashCount > 1) return null; // Invalid number if multiple slashes

    try {
      return eval(numStr); // Evaluate the number or fraction
    } catch (e) {
      return null; // Invalid if evaluation fails
    }
  };

  this.getUnit = function (input) {
    const unitRegex = /[a-zA-Z]+$/;
    const match = input.match(unitRegex);
    if (!match) return null;

    const unit = match[0].toLowerCase();
    return validUnits[unit] ? unit : null; // Return as lowercase for consistency
  };

  this.getReturnUnit = function (initUnit) {
    const normalizedUnit = initUnit.toLowerCase();
    return validUnits[normalizedUnit]?.returnUnit || null;
  };

  this.spellOutUnit = function (unit) {
    const normalizedUnit = unit.toLowerCase();
    return validUnits[normalizedUnit]?.spellOut || null;
  };

  this.convert = function (initNum, initUnit) {
    const normalizedUnit = initUnit.toLowerCase();
    const factor = validUnits[normalizedUnit]?.factor;

    if (!factor) return null; // Return null for invalid unit

    return parseFloat((initNum * factor).toFixed(5)); // Round to 5 decimal places
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    const initUnitString = this.spellOutUnit(initUnit);
    const returnUnitString = this.spellOutUnit(returnUnit);

    return `${initNum} ${initUnitString} converts to ${returnNum} ${returnUnitString}`;
  };
}
