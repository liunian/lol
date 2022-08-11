//
//  json.swift
//  lol
//
//  Created by neal on 2022/8/11.
//

import Foundation

func json(from object:Any, options: JSONSerialization.WritingOptions = []) -> String? {
    guard let data = try? JSONSerialization.data(withJSONObject: object, options: options) else {
        return nil
    }
    return String(data: data, encoding: .utf8)
}
