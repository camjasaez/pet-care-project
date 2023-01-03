'use strict';
import { createStandaloneToast } from '@chakra-ui/toast';

const { toast } = createStandaloneToast();

/**
 * @typedef Toast
 * @property {Object}
 */

/**
 * @name respondSuccess
 * @param {String} description A toast's description
 * @param {String} title A toast's title
 * @returns {Toast} A toast container
 */
export function respondSuccess(description, title) {
  return toast({
    title: title || 'Excelente!',
    description: description || 'Todo bien',
    status: 'success',
    duration: 2000,
    isClosable: true,
  });
}

/**
 * @name respondError
 * @param {String} description A toast's description
 * @param {String} title A toast's title
 * @returns {Toast} A toast container
 */
export function respondError(description, title) {
  return toast({
    title: title || 'Error!',
    description: description || 'A ocurrido un error!',
    status: 'error',
    duration: 2000,
    isClosable: true,
  });
}

/**
 * @name respondInfo
 * @param {String} description A toast's description
 * @param {String} title A toast's title
 * @returns {Toast} A toast container
 */
export function respondInfo(description, title) {
  return toast({
    title: title || 'Atencion!',
    description: description || 'A ocurrido algo!',
    status: 'info',
    duration: 2000,
    isClosable: true,
  });
}

/**
 * @name respondWarning
 * @param {String} description A toast's description
 * @param {String} title A toast's title
 * @returns {Toast} A toast container
 */
export function respondWarning(description, title) {
  return toast({
    title: title || 'Atencion!',
    description: description || 'A ocurrido algo!',
    status: 'warning',
    duration: 2000,
    isClosable: true,
  });
}
