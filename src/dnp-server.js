/*
 The BSD 3-Clause License

 Copyright (c) 2017 - Klaus Landsdorf (http://bianco-royal.de/)
 All rights reserved.
 node-red-contrib-dnp
 */
'use strict'

module.exports = function (RED) {
  function DNPServer (config) {
    RED.nodes.createNode(this, config)
    this.name = config.name

    let node = this

    node.status({fill: 'blue', shape: 'ring', text: 'not ready to use'})

    node.on('input', function (msg) {
      node.send(msg)
    })
  }

  RED.nodes.registerType('DNP-Server', DNPServer)
}
