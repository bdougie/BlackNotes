//
//  ActionRequestHandler.swift
//  CreateNote
//
//  Created by Brian Douglas on 12/31/15.
//  Copyright © 2015 Facebook. All rights reserved.
//

import UIKit
import MobileCoreServices

class ActionRequestHandler: NSObject, NSExtensionRequestHandling {

    var extensionContext: NSExtensionContext?
    
    func beginRequestWithExtensionContext(context: NSExtensionContext) {
      print("hello")
        // Do not call super in an Action extension with no user interface
        self.extensionContext = context
        
        var found = false
        
        // Find the item containing the results from the JavaScript preprocessing.
        outer:
            for item: AnyObject in context.inputItems {
                let extItem = item as! NSExtensionItem
                if let attachments = extItem.attachments {
                    for itemProvider: AnyObject in attachments {
                        if itemProvider.hasItemConformingToTypeIdentifier(String(kUTTypePropertyList)) {
                            itemProvider.loadItemForTypeIdentifier(String(kUTTypePropertyList), options: nil, completionHandler: { (item, error) in
                                let dictionary = item as! [String: AnyObject]
                                NSOperationQueue.mainQueue().addOperationWithBlock {
                                    self.itemLoadCompletedWithPreprocessingResults(dictionary[NSExtensionJavaScriptPreprocessingResultsKey] as! [NSObject: AnyObject])
                                }
                                found = true
                            })
                            if found {
                                break outer
                            }
                        }
                    }
                }
        }
        
        if !found {
            self.doneWithResults(nil)
        }
    }
    
    func itemLoadCompletedWithPreprocessingResults(javaScriptPreprocessingResults: [NSObject: AnyObject]) {
        // Here, do something, potentially asynchronously, with the preprocessing
        // results.
      
        let note: AnyObject? = javaScriptPreprocessingResults["content"]
        if note != nil ||  note! as! String != "" {
          // creates note
          let url = NSURL(string: "https://blacknotes.firebaseio.com/testUser.json")
          
          post(url!, params: note!)
          
          self.doneWithResults(note)
        } else {
          print("no note text provided")
        }
    }
    
    func doneWithResults(resultsForJavaScriptFinalizeArg: AnyObject?) {
        if let resultsForJavaScriptFinalize = resultsForJavaScriptFinalizeArg {
            // Construct an NSExtensionItem of the appropriate type to return our
            // results dictionary in.
            
            // These will be used as the arguments to the JavaScript finalize()
            // method.
            
            let resultsDictionary = [NSExtensionJavaScriptFinalizeArgumentKey: resultsForJavaScriptFinalize]
            
            let resultsProvider = NSItemProvider(item: resultsDictionary, typeIdentifier: String(kUTTypePropertyList))
            
            let resultsItem = NSExtensionItem()
            resultsItem.attachments = [resultsProvider]
            
            // Signal that we're complete, returning our results.
            self.extensionContext!.completeRequestReturningItems([resultsItem], completionHandler: nil)
        } else {
            // We still need to signal that we're done even if we have nothing to
            // pass back.
            self.extensionContext!.completeRequestReturningItems([], completionHandler: nil)
        }
        
        // Don't hold on to this after we finished with it.
        self.extensionContext = nil
    }
  
  func post(url: NSURL, params: AnyObject) {
    let params = String(params);
    let request = NSMutableURLRequest(URL: url);
    request.HTTPMethod = "POST"
    request.HTTPBody = params.dataUsingEncoding(NSUTF8StringEncoding)
    
    let task = NSURLSession.sharedSession().dataTaskWithRequest(request) {
      data, response, error in
      
      //in case of error
      if error != nil {
        return
      }
    }
    task.resume();
  }

}
