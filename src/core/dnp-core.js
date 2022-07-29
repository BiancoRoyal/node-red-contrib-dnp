/*
 The BSD 3-Clause License

 Copyright (c) 2017 - Klaus Landsdorf (http://bianco-royal.de/)
 All rights reserved.
 node-red-contrib-dnp
 */
'use strict'

// eslint-disable-next-line no-var
var de = de || { biancoroyal: { dnp: { core: {} } } } // eslint-disable-line no-use-before-define
de.biancoroyal.dnp.core.internalDebugLog = de.biancoroyal.dnp.core.internalDebugLog || require('debug')('opcuaIIoT:core') // eslint-disable-line no-use-before-define
de.biancoroyal.dnp.core.detailDebugLog = de.biancoroyal.dnp.core.detailDebugLog || require('debug')('opcuaIIoT:core:details') // eslint-disable-line no-use-before-define
de.biancoroyal.dnp.core.specialDebugLog = de.biancoroyal.dnp.core.specialDebugLog || require('debug')('opcuaIIoT:core:special') // eslint-disable-line no-use-before-define

module.exports = de.biancoroyal.dnp.core
