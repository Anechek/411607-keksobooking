'use strict';

window.synchronizeFields = function (firstField, secondField, firstFieldArray, secondFieldArray, process) {
  process(secondField, secondFieldArray[firstFieldArray.indexOf(firstField.value)]);
};
