/**
 * Original Work Copyright 2014 IBM Corp.
 * node-red
 *
 * Copyright (c) 2022 Klaus Landsdorf (http://node-red.plus/)
 * All rights reserved.
 * node-red-contrib-dnp - The BSD 3-Clause License
 *
 **/

'use strict'

var injectNode = require('@node-red/nodes/core/common/20-inject.js')
var clientNode = require('../src/dnp-client.js')
var serverNode = require('../src/dnp-server.js')
var writeNode = require('../src/dnp-write.js')

var helper = require('node-red-node-test-helper')
helper.init(require.resolve('node-red'))

describe('Write node Testing', function () {
  beforeEach(function (done) {
    helper.startServer(function () {
      done()
    })
  })

  afterEach(function (done) {
    helper.unload().then(function () {
      helper.stopServer(function () {
        done()
      })
    }).catch(function () {
      helper.stopServer(function () {
        done()
      })
    })
  })

  describe('Node', function () {
    it('simple write node should be loaded', function (done) {
      helper.load([serverNode, writeNode, injectNode, clientNode], [
        {
          "id": "1bf6dfe7.a8473",
          "type": "DNP-Server",
          "z": "11c6703a.132f6",
          "name": "dnpServer",
          "x": 330,
          "y": 190,
          "wires": [
            []
          ]
        },
        {
          "id": "a6e51b5e.a116d8",
          "type": "DNP-Write",
          "z": "11c6703a.132f6",
          "name": "dnpWrite",
          "server": "7576cb96.0fe7a4",
          "x": 330,
          "y": 250,
          "wires": [
            []
          ]
        },
        {
          "id": "4d910d12.b6bbf4",
          "type": "inject",
          "z": "11c6703a.132f6",
          "name": "injectTrue",
          "topic": "",
          "payload": "true",
          "payloadType": "bool",
          "repeat": "",
          "crontab": "",
          "once": false,
          "x": 180,
          "y": 250,
          "wires": [
            [
              "a6e51b5e.a116d8"
            ]
          ]
        },
        {
          "id": "7576cb96.0fe7a4",
          "type": "DNP-Client",
          "z": "",
          "name": "dnpClient"
        }
      ], function () {
        var inject = helper.getNode('4d910d12.b6bbf4')
        inject.should.have.property('name', 'injectTrue')

        var dnpServer = helper.getNode('1bf6dfe7.a8473')
        dnpServer.should.have.property('name', 'dnpServer')

        var dnpClient = helper.getNode('7576cb96.0fe7a4')
        dnpClient.should.have.property('name', 'dnpClient')

        var dnpWrite = helper.getNode('a6e51b5e.a116d8')
        dnpWrite.should.have.property('name', 'dnpWrite')

        done()
      }, function () {
        helper.log('function callback')
      })
    })
  })

  describe('post', function () {
    it('should fail for invalid node', function (done) {
      helper.request().post('/dnp-write/invalid').expect(404).end(done)
    })
  })
})
