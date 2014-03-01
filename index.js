

function Plugin(messenger, options){
  this.messenger = messenger;
  this.options = options;
  return this;
}

var optionsSchema = {
  'type': 'object',
  'properties': {
    'greetingPrefix': {
      'type': 'string',
      'required': true
    }
  }
};

var messageSchema = {
  'type': 'object',
  'properties': {
    'text': {
      'type': 'string',
      'required': true
    }
  }
};

Plugin.prototype.onMessage = function(data){
  console.log(this.options.greetingPrefix + ', ' + data.fromUuid);
  if(data.fromUuid){
    this.messenger.send({devices: data.fromUuid, message: {greeting: this.options.greetingPrefix + ' back atcha: ' + data.text}});
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
