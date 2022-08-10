//
//  main.swift
//  lol
//
//  Created by neal on 2022/8/7.
//
//

import Foundation
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

let dispatchGroup = DispatchGroup()

func fetchHTML(from url: String, complete: @escaping (String?) -> Void) {
    guard let url = URL(string: url) else {
        complete(nil)
        return
    }
    
    dispatchGroup.enter()
    
    print("Fetching html...")
    let task = URLSession.shared.dataTask(with: url) { (data, response, error) in
        if error != nil {
            print(error!.localizedDescription)
            dispatchGroup.leave()
            complete(nil)
            return
        }
        
        guard let httpResponse = response as? HTTPURLResponse,
              (200...299).contains(httpResponse.statusCode) else {
            dispatchGroup.leave()
            complete(nil)
            return
        }
        
        if let data = data,
           let html = String(data: data, encoding: .utf8) {
            complete(html)
        }
        
        dispatchGroup.leave()
    }
    
    task.resume()
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
func writeMatches(matches: [Match], to url: String) {
    print("writeMatches to \(url)")
    // todo
    var matchList: [[String]] = []
    for i in matches {
        matchList.append([i.teamA, i.teamB, i.date, i.time, i.score])
    }
    let dataStr = "const RAW_MATCH_DATA = \(matchList)"
    do {
        try dataStr.write(toFile: url, atomically: true, encoding: .utf8)
        print("Done")
    } catch {
        print(error)
    }
}

func run(_ config: Config) -> Void {
    let selectors = MatchSelectors(
        match: config.match,
        dateTime: config.dateTime,
        teamA: config.teamA,
        teamB: config.teamB,
        score: config.score
    )
    
    fetchHTML(from: config.url) { html in
        if let html = html {
            let matches = extractMatches(from: html, by: selectors)
            writeMatches(matches: matches, to: config.targetPath)
        } else {
            print("No Valid data from \(config.url)")
        }
    }
}

func runAll(_ config: [Config]) -> Void {
    for c in config {
        run(c)
    }
}

func start() -> Void {
    let configUrl = URL(fileURLWithPath: "download.config.json")
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
    
    run(config)
}

start()

// notify exit
dispatchGroup.notify(queue: DispatchQueue.main) {
    exit(EXIT_SUCCESS)
}
// wait async task complete
dispatchMain()
