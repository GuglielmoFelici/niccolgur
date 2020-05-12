import redis

r = redis.Redis()

def decode_dict(dic):
    ret = {}
    for key in dic.keys():
        ret[key.decode("utf-8") ] = dic[key].decode("utf-8") 
    return ret

def get_members():
    return [decode_dict(
        r.hgetall("user:" + str(x))) for x in 
            [ int(y) for y in r.lrange("queue", 0, -1) ]
    ]

print(get_members())