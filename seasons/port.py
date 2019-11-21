import sys
import os
import json

entries = []
for cmd in sys.argv[1:]:
    seasonFile = open(
        cmd, 'r+', encoding=('utf-8-sig' if os.name == 'nt' else 'utf-8'))
    season = []
    for line in seasonFile.readlines():
        records = line.split('_')
        season.append({
            "master": records[0],
            "movie_id": records[1],
            "members": records[2].split(),
            "date": records[3],
            "offers": (records[4][:-1] if len(records) > 4 else ""),
        })
    entries.append(season)
seasonFile.close
with open('output', 'w') as output:
    output.write(json.dumps(entries, ensure_ascii=False))
