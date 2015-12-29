//
//  RCTURLHandler.m
//  BlackNotes
//
//  Created by Brian Douglas on 12/29/15.
//  Copyright © 2015 Facebook. All rights reserved.
//

#import "RCTURLHandler.h"
@import UIKit;

@implementation RCTURLHandler

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(open:(NSString *)url)
{
  UIApplication *app = [UIApplication sharedApplication];
  NSURL *URL = [NSURL URLWithString:url];
  
  dispatch_async(dispatch_get_main_queue(), ^{
    [app openURL:URL];
  });
}


@end
