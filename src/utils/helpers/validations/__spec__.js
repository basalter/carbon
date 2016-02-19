import I18n from "i18n-js";
import Helper from './validations';

describe('Validations Helper', () => {

  beforeEach(() => {
    I18n.translations = {
      en: {
        validations: {
          decimal: "Must be a valid decimal",
          custom: "Must be a ${foo} bar"
        }
      }
    };
  });

  describe('validationMessage', () => {
    describe('when a message is provided', () => {
      it('returns the provided message', () => {
        expect(Helper.validationMessage('Simple Message', 'validations.decimal')).toEqual('Simple Message');
      });
    });

    describe('when a message is not provided', () => {
      it('returns the message provided through i18n', () => {
        expect(Helper.validationMessage(null, 'validations.decimal')).toEqual('Must be a valid decimal');
      });

      describe('when i18n options are provided', () => {
        it('returns the message provided through i18n', () => {
          expect(Helper.validationMessage(null, 'validations.decimal', { foo: 'foo' })).toEqual('Must be a valid decimal');
        });
      });
    });
  });

  describe('Comparison Type', () => {
    describe('when params contains is', () => {
      it('returns Exact', () => {
        expect(Helper.comparisonType({is: 'foo'})).toEqual('Exact');
      });
    });

    describe('when params contains max', () => {
      it('returns Less', () => {
        expect(Helper.comparisonType({max: 2})).toEqual('Less');
      });
    });

    describe('when params contains min', () => {
      it('returns Greater', () => {
        expect(Helper.comparisonType({min: 2})).toEqual('Greater');
      });
    });

    describe('when params contains max and min', () => {
      it('returns Range', () => {
        expect(Helper.comparisonType({min: 1, max: 2})).toEqual('Range');
      });
    });

    describe('when params is empty', () => {
      it('throws an error', () => {
        expect(function() {Helper.comparisonType({})}).toThrow();
      });
    });
  });
});
