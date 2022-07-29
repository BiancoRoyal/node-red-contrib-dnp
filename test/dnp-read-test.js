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

var clientNode = require('../src/dnp-client.js')
var serverNode = require('../src/dnp-server.js')
var readNode = require('../src/dnp-read.js')

var helper = require('node-red-node-test-helper')
helper.init(require.resolve('node-red'))

describe('Read node Testing', function () {
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
    it('simple read node should be loaded', function (done) {
      helper.load([readNode, serverNode, clientNode], [
        {
          "id": "8482fcf8.62d6c",
          "type": "DNP-Read",
          "z": "11c6703a.132f6",
          "name": "dnpRead",
          "server": "7576cb96.0fe7a4",
          "x": 220,
          "y": 130,
          "wires": [
            []
          ]
        },
        {
          "id": "1bf6dfe7.a8473",
          "type": "DNP-Server",
          "z": "11c6703a.132f6",
          "name": "dnpServer",
          "x": 230,
          "y": 190,
          "wires": [
            []
          ]
        },
        {
          "id": "7576cb96.0fe7a4",
          "type": "DNP-Client",
          "z": "",
          "name": "dnpClient"
        }
      ], function () {
        var dnpServer = helper.getNode('1bf6dfe7.a8473')
        dnpServer.should.have.property('name', 'dnpServer')

        var dnpClient = helper.getNode('7576cb96.0fe7a4')
        dnpClient.should.have.property('name', 'dnpClient')

        var dnpRead = helper.getNode('8482fcf8.62d6c')
        dnpRead.should.have.property('name', 'dnpRead')

        done()
      }, function () {
        helper.log('function callback')
      })
    })
  })

  describe('post', function () {
    it('should fail for invalid node', function (done) {
      helper.request().post('/dnp-read/invalid').expect(404).end(done)
    })
  })
})
