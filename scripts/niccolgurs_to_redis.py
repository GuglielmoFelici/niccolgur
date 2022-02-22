import json
from manager import Manager
import os
import sys


if len(sys.argv) != 2 or sys.argv[1] != "yes":
    print("WARNING: this script imports all the data in niccolgurs.json in redis. Do NOT use it if you already have niccolgurs data. "\
        +"Run the script again as \"<script_name> yes\" to proceed.")
    exit(1)

idMap = {
    "dano" : 1,
    "ceccherini" : 2,
    "caciotta" : 3,
    "sanchez" : 4,
    "jala" : 5,
    "pogre" : 6,
    "iroli" : 7,
    "fosq" : 8,
    "paglia" : 9
}

manager = Manager()
manager.load(1)
nic_id = 0
for idx, season in enumerate(manager.allSeasons):
    set_ssn_number = "hset season:" + str(idx+1) + " number " + str(idx+1)
    for niccolgur in season:
        nic_id += 1
        set_nic = "hset niccolgur:" + str(nic_id) + " master " + str(idMap[niccolgur["master"]]) + " movie " + niccolgur["movie_id"]\
            + " date " + niccolgur["date"]
        set_nic_members = "sadd participants:" + str(nic_id) + " "+ " ".join([str(idMap[x]) for x in niccolgur["members"] if x in manager.get_members()])
        add_nic_to_ssn = "rpush season:" + str(idx+1) + " " + str(nic_id)
        os.system("/opt/redis/src/redis-cli " + set_nic)
        os.system("/opt/redis/src/redis-cli " + set_nic_members)
        os.system("/opt/redis/src/redis-cli " + add_nic_to_ssn)
incr_nic = "set next_niccolgur_id " + str(nic_id + 1)
incr_ssn = "set next_season_id " + str(idx + 2)
os.system("/opt/redis/src/redis-cli " + incr_nic)
os.system("/opt/redis/src/redis-cli " + incr_ssn)
