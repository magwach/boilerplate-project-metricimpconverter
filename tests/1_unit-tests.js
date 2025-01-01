import { suite, test } from 'mocha';
import { assert } from 'chai';
import ConvertHandler from '../controllers/convertHandler.js';

let convertHandler = new ConvertHandler();

function compareNumbers(a, b, tolerance = 1e-5) {
  return Math.abs(a - b) < tolerance;
}

suite('Unit Tests', function() {

  test('convertHandler should correctly read a whole number input', function() {
    assert.equal(convertHandler.getNum('3gal'), 3);
  });

  test('convertHandler should correctly read a decimal number input', function() {
    assert.equal(convertHandler.getNum('3.5gal'), 3.5);
  });

  test('convertHandler should correctly read a fractional input', function() {
    assert.equal(convertHandler.getNum('3/4gal'), 0.75);
  });

  test('convertHandler should correctly read a fractional input with a decimal', function() {
    assert.isTrue(compareNumbers(convertHandler.getNum('2.5/3gal'), 0.83333));
  });

  test('convertHandler should correctly return an error on a double-fraction', function() {
    assert.isNull(convertHandler.getNum('3/2/3gal'));
  });

  test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided', function() {
    assert.equal(convertHandler.getNum('gal'), 1);
  });

  test('convertHandler should correctly read each valid input unit', function() {
    assert.equal(convertHandler.getUnit('3gal'), 'gal');
    assert.equal(convertHandler.getUnit('3L'), 'l');
    assert.equal(convertHandler.getUnit('3mi'), 'mi');
    assert.equal(convertHandler.getUnit('3km'), 'km');
    assert.equal(convertHandler.getUnit('3lbs'), 'lbs');
    assert.equal(convertHandler.getUnit('3kg'), 'kg');
  });

  test('convertHandler should correctly return an error for an invalid input unit', function() {
    assert.isNull(convertHandler.getUnit('3abc'));
  });

  test('convertHandler should return the correct return unit for each valid input unit', function() {
    assert.equal(convertHandler.getReturnUnit('gal'), 'L');
    assert.equal(convertHandler.getReturnUnit('L'), 'gal');
    assert.equal(convertHandler.getReturnUnit('mi'), 'km');
    assert.equal(convertHandler.getReturnUnit('km'), 'mi');
    assert.equal(convertHandler.getReturnUnit('lbs'), 'kg');
    assert.equal(convertHandler.getReturnUnit('kg'), 'lbs');
  });

  test('convertHandler should correctly return the spelled-out string unit for each valid input unit', function() {
    assert.equal(convertHandler.spellOutUnit('gal'), 'gallons');
    assert.equal(convertHandler.spellOutUnit('L'), 'liters');
    assert.equal(convertHandler.spellOutUnit('mi'), 'miles');
    assert.equal(convertHandler.spellOutUnit('km'), 'kilometers');
    assert.equal(convertHandler.spellOutUnit('lbs'), 'pounds');
    assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms');
  });

  test('convertHandler should correctly convert gal to L', function() {
    assert.isTrue(compareNumbers(convertHandler.convert(3, 'gal'), 11.35623));
  });

  test('convertHandler should correctly convert L to gal', function() {
    assert.isTrue(compareNumbers(convertHandler.convert(3, 'L'), 0.792516));
  });

  test('convertHandler should correctly convert mi to km', function() {
    assert.isTrue(compareNumbers(convertHandler.convert(3, 'mi'), 4.82802));
  });

  test('convertHandler should correctly convert km to mi', function() {
    assert.isTrue(compareNumbers(convertHandler.convert(3, 'km'), 1.86412));
  });

  test('convertHandler should correctly convert lbs to kg', function() {
    assert.isTrue(compareNumbers(convertHandler.convert(3, 'lbs'), 1.360776));
  });

  test('convertHandler should correctly convert kg to lbs', function() {
    assert.isTrue(compareNumbers(convertHandler.convert(3, 'kg'), 6.61387));
  });
});

