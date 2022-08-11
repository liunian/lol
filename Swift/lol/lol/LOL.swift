//
//  LOL.swift
//  lol
//
//  Created by neal on 2022/8/11.
//

import Foundation
import System
import SwiftSoup

struct Match {
    var date: String
    var time: String
    var teamA: String
    var teamB: String
    // 0:0, 2:0, 0:2, 1:2, 2:1
    var score: String
}

struct MatchSelectors {
    var match: String
    var dateTime: String
    var teamA: String
    var teamB: String
    var score: String
}

struct Config: Codable {
    var targetPath: String
    var url: String
    var match: String
    var dateTime: String
    var teamA: String
    var teamB: String
    var score: String
}

struct LOL {
    let configFile = "download.config.json"
    
    var absoluteConfigFilePath: FilePath {
        let configFilePath = FilePath(configFile)
        if configFilePath.isRelative {
            return FilePath(Bundle.main.bundlePath).appending(configFile)
        }
        return configFilePath
    }
    
    func fetchHTML(from url: String) async -> String? {
        guard let url = URL(string: url) else {
            return nil
        }
        
        print("Fetching html...")
        do {
            let (data, response) = try await URLSession.shared.data(from: url)
            guard let httpResponse = response as? HTTPURLResponse,
                  (200...299).contains(httpResponse.statusCode) else {
                return nil
            }
            
            if let html = String(data: data, encoding: .utf8) {
                return html
            } else {
                return nil
            }
        } catch {
            print(error.localizedDescription)
            return nil
        }
    }
    
    // extract matches data from html
    func extractMatches(from html: String, by selectors: MatchSelectors) -> [Match] {
        print("Extract matches...")
        var matches: [Match] = []
        
        do {
            let doc: Document = try SwiftSoup.parse(html)
            let matchEles: Elements = try doc.select(selectors.match)
            
            let dateTimeFormatter = DateFormatter()
            dateTimeFormatter.dateFormat = "yyyy,M,d,HH,mm"
            dateTimeFormatter.timeZone = TimeZone(abbreviation: "GMT+0")
            
            let beijingTimeZone = TimeZone(abbreviation: "GMT+8")
            
            let dateFormatter = DateFormatter()
            dateFormatter.dateFormat = "yyyy-MM-dd"
            dateFormatter.timeZone = beijingTimeZone
            
            let timeFormatter = DateFormatter()
            timeFormatter.dateFormat = "HH:mm"
            timeFormatter.timeZone = beijingTimeZone
            
            for match in matchEles {
                let childCount: Int = match.children().count
                let isPending: Bool = childCount == 3
                
                let teamA = try match.select(selectors.teamA).text().uppercased()
                let teamB = try match.select(selectors.teamB).text().uppercased()
                
                // 2:0, 2:1, 1:2, 0:2, empty for pending match
                var score = ""
                var date = ""
                var time = ""
                
                if let dateTime = dateTimeFormatter.date(from: try match.select(selectors.dateTime).text()) {
                    date = dateFormatter.string(from: dateTime)
                    time = timeFormatter.string(from: dateTime)
                }
                
                if !isPending {
                    let scoreEles = try match.select(selectors.score)
                    score = "\(try scoreEles[0].text()):\(try scoreEles[1].text())"
                }
                
                matches.append(Match(date: date, time: time, teamA: teamA, teamB: teamB, score: score))
            }
        } catch Exception.Error(_, let message) {
            print(message)
        } catch {
            print("error")
        }
        
        return matches
    }
    
    // write matches data to file
    func writeMatches(matches: [Match], to targetPath: String) {
        print("writeMatches to \(targetPath)")
        
        var matchList: [[String]] = []
        for i in matches {
            matchList.append([i.teamA, i.teamB, i.date, i.time, i.score])
        }
        let dataStr = "const RAW_MATCH_DATA = \(json(from: matchList, options: [.prettyPrinted]) ?? "[]")"
        
        do {
            try dataStr.write(toFile: targetPath, atomically: true, encoding: .utf8)
            print("Done")
        } catch {
            print(error)
        }
    }
    
    func run(_ config: Config) async {
        let selectors = MatchSelectors(
            match: config.match,
            dateTime: config.dateTime,
            teamA: config.teamA,
            teamB: config.teamB,
            score: config.score
        )
        
        let html = await fetchHTML(from: config.url)
        if let html = html {
            let matches = extractMatches(from: html, by: selectors)
            var targetPath = FilePath(config.targetPath)
            if targetPath.isRelative {
                // relative to configFile
                targetPath = absoluteConfigFilePath.removingLastComponent().appending(config.targetPath)
            }
            
            writeMatches(matches: matches, to: targetPath.lexicallyNormalized().string)
        } else {
            print("No Valid data from \(config.url)")
        }
    }
    
    func runAll(_ config: [Config]) async {
        // run in parallel
        await withTaskGroup(of: Void.self) { taskGroup in
            for c in config {
                taskGroup.addTask {
                    await run(c)
                }
            }
        }
    }
    
    func start() async {
        
        let configUrl = URL(fileURLWithPath: absoluteConfigFilePath.string)
        let configData: Data
        
        do {
            configData = try Data(contentsOf: configUrl)
        } catch {
            fatalError("Could not find download.config.json because of \(error)")
        }
        
        let decorder = JSONDecoder()
        let config: Config
        do {
            config = try decorder.decode(Config.self, from: configData)
        } catch {
            fatalError("\(error)")
        }
        
        await run(config)
        //        await runAll([config])
    }
}



