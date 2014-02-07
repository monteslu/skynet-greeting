

function Plugin(messager, options){
  this.messager = messager;
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
    this.messager.send({devices: data.fromUuid, message: {greeting: this.options.greetingPrefix + ' back atcha'}});
  }

};


module.exports = Plugin;
