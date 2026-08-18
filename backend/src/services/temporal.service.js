'use strict';

/**
 * Manejo de atributos temporales (6FN).
 *
 * Un atributo mutable nunca se hace UPDATE: se cierra el registro vigente
 * (`valid_to = now`) y se abre uno nuevo. Así queda historia completa.
 */

/**
 * Inserta una nueva versión vigente del atributo.
 * @param {import('sequelize').ModelStatic<any>} Model
 * @param {string} pkField columna que referencia la entidad (ej: 'persona_id')
 * @param {string} pkValue
 * @param {string} attrField columna del valor (ej: 'nombre')
 * @param {any} attrValue
 * @param {import('sequelize').Transaction} [t]
 */
async function crearAtributo(Model, pkField, pkValue, attrField, attrValue, t) {
  return Model.create(
    { [pkField]: pkValue, valid_from: new Date(), [attrField]: attrValue },
    { transaction: t }
  );
}

/** Cierra la versión vigente del atributo (no borra historia). */
async function cerrarVigente(Model, pkField, pkValue, t) {
  return Model.update(
    { valid_to: new Date() },
    { where: { [pkField]: pkValue, valid_to: null }, transaction: t }
  );
}

/** Cierra el valor vigente y abre uno nuevo: el "update" de 6FN. */
async function actualizarAtributo(Model, pkField, pkValue, attrField, nuevoValor, t) {
  await cerrarVigente(Model, pkField, pkValue, t);
  return crearAtributo(Model, pkField, pkValue, attrField, nuevoValor, t);
}

/**
 * Aplica `actualizarAtributo` sólo a los atributos informados.
 * @param {Array<[import('sequelize').ModelStatic<any>, string, any]>} cambios
 *        tuplas [Modelo, columnaValor, nuevoValor]
 * @param {string} pkField
 * @param {string} pkValue
 * @param {import('sequelize').Transaction} t
 */
async function actualizarAtributos(cambios, pkField, pkValue, t) {
  for (const [Model, attrField, valor] of cambios) {
    if (valor === undefined || valor === null || valor === '') continue;
    await actualizarAtributo(Model, pkField, pkValue, attrField, valor, t);
  }
}

module.exports = { crearAtributo, cerrarVigente, actualizarAtributo, actualizarAtributos };
