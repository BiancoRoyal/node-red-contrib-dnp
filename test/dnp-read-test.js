/**
 * Original Work Copyright 2014 IBM Corp.
 * node-red
 *
 * Copyright (c) 2017, Klaus Landsdorf (http://bianco-royal.de/)
 * All rights reserved.
 * node-red-contrib-dnp - The BSD 3-Clause License
 *
 **/

'use strict'

var clientNode = require('../../src/dnp-client.js')
var serverNode = require('../../src/dnp-server.js')
var readNode = require('../../src/dnp-read.js')
var helper = require('../helper.js')

describe('Read node Testing', function () {
  before(function (done) {
    helper.startServer(done)
  })

  afterEach(function () {
    helper.unload()
  })

  describe('Node', function () {
    it('simple read node should be loaded', function (done) {
      helper.load([clientNode, serverNode, readNode], [], function () {
        var dnpServer = helper.getNode('e54529b9.952ea8')
        dnpServer.should.have.property('name', 'dnpServer')

        var dnpClient = helper.getNode('dc764ad7.580238')
        dnpClient.should.have.property('name', 'dnpClient')

        var dnpRead = helper.getNode('b9cf4e9c.4d53a')
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
