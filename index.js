

function Plugin(messenger, options){
  this.messenger = messenger;
  this.options = options;
  return this;
}

var optionsSchema = {
  type: 'object',
  properties: {
    greetingPrefix: {
      type: 'string',
      required: true
    }
  }
};

var messageSchema = {
  type: 'object',
  properties: {
    text: {
      type: 'string',
      required: true
    }
  }
};

Plugin.prototype.onMessage = function(message, fn){
  var data = message.message || message.payload;
  console.log(this.options.greetingPrefix + ', ' + message.fromUuid);

  var resp = {greeting: this.options.greetingPrefix + ' back atcha: ' + data.text};

  if(message.fromUuid && fn){
    resp.withCallback = true;
    fn(resp);
  }else if(message.fromUuid){
    this.messenger.send({devices: message.fromUuid, payload: resp});
  }

};

Plugin.prototype.destroy = function(){
  //clean up
  console.log('destroying.', this.options);
};


module.exports = {
  Plugin: Plugin,
  optionsSchema: optionsSchema,
  messageSchema: messageSchema
};
