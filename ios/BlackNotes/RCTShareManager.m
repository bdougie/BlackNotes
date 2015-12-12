//
//  RCTShareManager.m
//  BlackNotes
//
//  Created by Brian Douglas on 12/12/15.
//  Copyright © 2015 Facebook. All rights reserved.
//

#import "RCTShareManager.h"
@import UIKit;

@implementation RCTShareManager

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(note:(NSString *)note)
{
  NSArray *objectsToShare = @[note];
  UIActivityViewController *activityVC = [[UIActivityViewController alloc] initWithActivityItems:objectsToShare applicationActivities:nil];
  
  UIViewController *rootController = UIApplication.sharedApplication.delegate.window.rootViewController;
  
  dispatch_async(dispatch_get_main_queue(), ^{
    [rootController presentViewController:activityVC animated:YES completion:nil];
  });
}

@end
