//
//  Action.js
//  CreateNote
//
//  Created by Brian Douglas on 12/31/15.
//  Copyright © 2015 Facebook. All rights reserved.
//

var Action = function() {};

Action.prototype = {
  
run: function(arguments) {
  
  arguments.completionFunction({"content": document.body.innerHTML});
},
  
finalize: function(arguments) {
  document.body.innerHTML = arguments["content"];
}
  
};

var ExtensionPreprocessingJS = new Action