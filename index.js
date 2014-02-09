

function Plugin(messenger, options){
  this.messenger = messenger;
  this.options = options;
  return this;
}

Plugin.getOptionsSchema = function(){
  return {
    'type': 'object',
    'properties': {
      'greetingPrefix': {
        'type': 'string',
        'required': true
      }
    }
  };
};

Plugin.prototype.onMessage = function(data){
  console.log(this.options.greetingPrefix + ', ' + data.fromUuid);
  if(data.fromUuid){
    this.messenger.send({devices: data.fromUuid, message: {greeting: this.options.greetingPrefix + ' back atcha'}});
  }

};

Plugin.prototype.destroy = function(){
  //clean up
  console.log('destroying.', this.options);
};


module.exports = Plugin;
