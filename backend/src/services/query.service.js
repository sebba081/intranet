'use strict';

/**
 * Acceso de sólo lectura a las vistas del schema 6FN.
 *
 * Las lecturas siempre pasan por las vistas `v_*` (que ya resuelven el
 * atributo vigente de cada entidad); las escrituras van por los modelos.
 */

const { QueryTypes } = require('sequelize');
const { sequelize } = require('../config/db');

/**
 * Ejecuta un SELECT parametrizado y devuelve filas planas.
 * @param {string} sql
 * @param {Array<any>} [replacements]
 * @returns {Promise<Array<Record<string, any>>>}
 */
async function queryVista(sql, replacements = []) {
  return sequelize.query(sql, { replacements, type: QueryTypes.SELECT });
}

/** Igual que `queryVista` pero devuelve sólo la primera fila (o undefined). */
async function queryUna(sql, replacements = []) {
  const [fila] = await queryVista(sql, replacements);
  return fila;
}

/**
 * Arma `WHERE a = ? AND b = ?` a partir de los filtros informados.
 * @param {string} sqlBase
 * @param {Record<string, any>} filtros
 */
function aplicarFiltros(sqlBase, filtros = {}) {
  const condiciones = [];
  const params = [];

  for (const [columna, valor] of Object.entries(filtros)) {
    if (valor === undefined || valor === null || valor === '') continue;
    condiciones.push(`${columna} = ?`);
    params.push(valor);
  }

  const sql = condiciones.length ? `${sqlBase} WHERE ${condiciones.join(' AND ')}` : sqlBase;
  return { sql, params };
}

module.exports = { queryVista, queryUna, aplicarFiltros };
