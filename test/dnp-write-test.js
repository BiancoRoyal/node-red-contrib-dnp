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

var injectNode = require('node-red/nodes/core/core/20-inject.js')
var clientNode = require('../../src/dnp-client.js')
var serverNode = require('../../src/dnp-server.js')
var writeNode = require('../../src/dnp-write.js')
var helper = require('../helper.js')

describe('Write node Testing', function () {
  before(function (done) {
    helper.startServer(done)
  })

  afterEach(function () {
    helper.unload()
  })

  describe('Node', function () {
    it('simple write node should be loaded', function (done) {
      helper.load([injectNode, clientNode, serverNode, writeNode], [], function () {
        var inject = helper.getNode('67dded7e.025904')
        inject.should.have.property('name', 'injectTrue')

        var dnpServer = helper.getNode('e54529b9.952ea8')
        dnpServer.should.have.property('name', 'dnpServer')

        var dnpClient = helper.getNode('dc764ad7.580238')
        dnpClient.should.have.property('name', 'dnpClient')

        var dnpWrite = helper.getNode('8ad2951c.2df708')
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
