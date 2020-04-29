export const required = value => value ? undefined : '不能为空';

const Validator = { version: '3.14.1' };

let email = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/
  , url = /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;

let alpha = /^[a-zA-Z]+$/
  , alphanumeric = /^[a-zA-Z0-9]+$/
  , numeric = /^-?[0-9]+$/
  , int = /^(?:-?(?:0|[1-9][0-9]*))$/
  , isSixNum = /^\d{6}$/
  , positiveInteger = /^[1-9]\d*$/
  , float = /^(?:-?(?:[0-9]+))?(?:\.[0-9]*)?(?:[eE][\+\-]?(?:[0-9]+))?$/
  , hexadecimal = /^[0-9a-fA-F]+$/
  , letternumber = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/
  , hexcolor = /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
let chinese = /^[\u4e00-\u9fa5]+$/
  , phonenumber = /^0?(13|14|15|16|17|18|19)[0-9]{9}$/
  , taxnumber = /^[a-zA-Z0-9]{15}$/
  , businessnumber = /^[a-zA-Z0-9]+$/
  , card = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  , tel = /^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/
  , date = /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$|^(?:(?:(?:0?[13578]|1[02])(\/|-)31)|(?:(?:0?[1,3-9]|1[0-2])(\/|-)(?:29|30)))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^(?:(?:0?[1-9]|1[0-2])(\/|-)(?:0?[1-9]|1\d|2[0-8]))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^(0?2(\/|-)29)(\/|-)(?:(?:0[48]00|[13579][26]00|[2468][048]00)|(?:\d\d)?(?:0[48]|[2468][048]|[13579][26]))$/
  , idcard = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i
  , zipcode = /^\d{6}$/
  , realname = /^[A-Za-z0-9\u4e00-\u9fa5]+$/
  , special = /^(([^\^\.<>%&',;+=\-\*?$"':#@!~\]\[{}\\/`\|])*)$/
  , identityCard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  ;

Validator.toString = (value) => {
  if (typeof value === 'object' && value !== null && value.toString) {
    value = value.toString();
  } else if (value === null || typeof value === 'undefined' || (isNaN(value) && !value.length)) {
    value = '';
  } else if (typeof value !== 'string') {
    value += '';
  }

  return value;
};

Validator.equals = (value, comparison) => value === Validator.toString(comparison);

Validator.isEmail = (value) => email.test(value);

Validator.isUrl = (value) => url.test(value);

Validator.isInteger = (value) => int.test(value);

Validator.isPositiveInteger = (value) => positiveInteger.test(value);

Validator.isNumeric = (value) => numeric.test(value);

Validator.isAlpha = (value) => alpha.test(value);

Validator.isSix = (value) => isSixNum.test(value);//6位数字

Validator.isAlphanumeric = (value) => letternumber.test(value);//6-20位数字+字母组合

Validator.isAlphaOrNumber = (value) => alphanumeric.test(value);//数字或字母组合

Validator.isHexadecimal = (value) => hexadecimal.test(value);

Validator.isHexColor = (value) => hexcolor.test(value);

Validator.isLowercase = (value) => value === value.toLowerCase();

Validator.isUppercase = (value) => value === value.toUpperCase();

Validator.isChinese = (value) => chinese.test(value);

Validator.isPhoneNumber = (value) => phonenumber.test(value);

Validator.isTel = (value) => tel.test(value);

Validator.isRealName = (value) => realname.test(value);

Validator.isBusinessNumber = (value) => businessnumber.test(value);

Validator.isCard = (value) => card.test(value);

Validator.isIdcard = (value) => idcard.test(value);

Validator.isTaxNumber = (value) => taxnumber.test(value);

Validator.isSpecial = (value) => special.test(value);
Validator.isIdentityCard = (value) => identityCard.test(value);

Validator.required = value => value ? true : false;
Validator.isEmptyObject = obj => {
  if (obj == null) return false;
  return Object.keys(obj).length === 0;
};

export default Validator;
